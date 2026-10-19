import {
	mysqlTable,
	varchar,
	text,
	boolean,
	int,
	decimal,
	mysqlEnum,
	date,
	unique,
	index,
	timestamp,
	datetime
} from 'drizzle-orm/mysql-core';
import { secureFields, user } from './auth.schema';
// Not drizzle's `json`: this one parses on read, which MariaDB needs (see ./json).
import { json } from './json';
import { ADDON_AVAILABILITY, ADDON_CATEGORIES } from '../../addons';

export * from './auth.schema';

export const subscribers = mysqlTable('subscribers', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: varchar('user_id', { length: 36 }).unique(),
	email: varchar('email', { length: 255 }).notNull(),
	fullName: varchar('full_name', { length: 255 }),
	phone: varchar('phone', { length: 40 }),
	stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
	marketingOptIn: boolean('marketing_opt_in').default(true).notNull(),
	...secureFields
});

// NEW: one row per plan the person subscribes to
export const subscriptions = mysqlTable('subscriptions', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	subscriberId: varchar('subscriber_id', { length: 36 })
		.notNull()
		.references(() => subscribers.id, { onDelete: 'cascade' }),
	planId: varchar('plan_id', { length: 36 })
		.notNull()
		.references(() => plans.id),
	
	stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
	status: mysqlEnum('status', ['pending', 'active', 'paused', 'cancelled']).default('pending').notNull(),
	currentPeriodEnd: timestamp('current_period_end'),
	cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
	pendingPlanId: varchar('pending_plan_id', { length: 36 }).references(() => plans.id),
	pendingPlanAt: timestamp('pending_plan_at'),
	quantity: int('quantity').default(1).notNull(),
	addressId: varchar('address_id', { length: 36 }).references(() => addresses.id),
	// What Stripe is actually billing this subscription, mirrored by the webhook's
	// `syncSubscription`. A customer who joined before a price change stays on their old
	// Stripe Price, so `plans.pricePence` (today's price) is not what they pay. NULL on
	// rows the webhook hasn't touched since this column was added — fall back to the
	// plan's price (see `subscriptionUnitPrice` in $lib/server/plans).
	stripePriceId: varchar('stripe_price_id', { length: 255 }),
	unitPricePence: int('unit_price_pence'),
	...secureFields
});

// ── Addresses ──
export const addresses = mysqlTable(
	'addresses',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		subscriberId: varchar('subscriber_id', { length: 36 })
			.references(() => subscribers.id, { onDelete: 'cascade' }),
	
		label: varchar('label', { length: 255 }),
		phone: varchar('phone', { length: 50}),
		line1: varchar('line1', { length: 255 }).notNull(),
		line2: varchar('line2', { length: 255 }),
		city: varchar('city', { length: 255 }).default('London').notNull(),
		postcode: varchar('postcode', { length: 32 }).notNull(),
		isPrimary: boolean('is_primary').default(false).notNull(),

		// Postcode centroid from postcodes.io, used by the delivery route planner to
		// order the Saturday run. Nullable on purpose: geocoding is best-effort and must
		// never block checkout, so an address whose postcode we couldn't resolve is a
		// perfectly normal address that the planner lists separately for manual fixing.
		// `mode: 'number'` so these read back as numbers rather than decimal strings.
		latitude: decimal('latitude', { precision: 9, scale: 6, mode: 'number' }),
		longitude: decimal('longitude', { precision: 9, scale: 6, mode: 'number' }),
		// When the lookup last succeeded — lets the backfill script skip rows it has
		// already done, and distinguishes "never tried" from "tried, no match".
		geocodedAt: timestamp('geocoded_at'),
		...secureFields
	},
	(table) => [index('idx_addresses_subscriber_id').on(table.subscriberId)]
);

// ── Addons (Catalogue) ──
export const addons = mysqlTable('addons', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	// "Type" in the dashboard. Values live in $lib/addons so the shop and editor agree.
	category: mysqlEnum('category', ADDON_CATEGORIES),
	// Whether it can be bought on its own from /addons, only alongside injera, or both.
	availability: mysqlEnum('availability', ADDON_AVAILABILITY).default('both').notNull(),
	pricePence: int('price_pence').notNull(),
	// An uploaded file name (served from /files), or a full URL on older rows.
	imageUrl: text('image_url'),
	// Pack size shown on the card, e.g. "250 g jar".
	unitLabel: varchar('unit_label', { length: 64 }),
	// Short ribbon such as "New" or "Bestseller".
	badge: varchar('badge', { length: 32 }),
	// Dietary / flavour tags from ADDON_TAGS, as a JSON string array.
	tags: json('tags').$type<string[]>(),
	spiceLevel: int('spice_level').default(0).notNull(),
	ingredients: text('ingredients'),
	isFeatured: boolean('is_featured').default(false).notNull(),
	sortOrder: int('sort_order').default(0),
	// No `stripePriceId` here on purpose: add-on line items are priced inline from
	// `pricePence` at checkout (see `addonLineItems` in /subscribe). A stored Stripe Price
	// is either recurring or one-time, but add-ons sell through both modes — and it would
	// drift from the price the customer is shown. `plans` still stores one; add-ons don't.
	...secureFields
});

// ── Subscriber Addons (Recurring) ──
export const subscriberAddons = mysqlTable(
	'subscriber_addons',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		subscriberId: varchar('subscriber_id', { length: 36 })
			.notNull()
			.references(() => subscribers.id, { onDelete: 'cascade' }),
		subscriptionId: varchar('subscription_id', { length: 36 })
			.notNull()
			.references(() => subscriptions.id, { onDelete: 'cascade' }),
		addonId: varchar('addon_id', { length: 36 })
			.notNull()
			.references(() => addons.id),
		quantity: int('quantity').default(1).notNull(),
		...secureFields
	},
	// Scoped to the subscription, not the subscriber: a person holding two plans can
	// legitimately have the same recurring add-on on each, and the per-subscription
	// pricing on the account page assumes exactly that.
	(table) => [unique('subscriber_addon_uniq').on(table.subscriptionId, table.addonId)]
);

// ── Deliveries ──
export const deliveries = mysqlTable(
	'deliveries',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		subscriberId: varchar('subscriber_id', { length: 36 })
			.notNull()
			.references(() => subscribers.id, { onDelete: 'cascade' }),
		subscriptionId: varchar('subscription_id', { length: 36 })
			.notNull()
			.references(() => subscriptions.id, { onDelete: 'cascade' }),
		addressId: varchar('address_id', { length: 36 })
			.notNull()
			.references(() => addresses.id),
		scheduledDate: date('scheduled_date').notNull(),
		status: mysqlEnum('status', ['scheduled', 'dispatched', 'delivered', 'skipped', 'failed'])
			.default('scheduled')
			.notNull(),
		// Unguessable capability token for the "add extras" link in the pre-delivery
		// reminder email — lets a customer reach /addons/[token] with no login. Minted
		// lazily (on first reminder send) rather than at delivery-creation time, and
		// distinct from `id` so an admin-facing URL leaking this delivery's id (e.g. the
		// dashboard's `?manageAddons=`) can't be used to reach the customer page.
		addonAccessToken: varchar('addon_access_token', { length: 64 }).unique(),
		// The Stripe invoice that paid for this delivery. Unique, so a retried
		// `checkout.session.completed` / `invoice.paid` webhook can't book a second
		// delivery for the same payment — the insert fails and the retry is a no-op.
		stripeInvoiceId: varchar('stripe_invoice_id', { length: 255 }).unique(),
		// Main-product units this delivery currently holds in `stock`, and the date they
		// are held against. Lets skipping, failing, rescheduling or deleting a delivery
		// give back exactly what it took (see `syncDeliveryStock` in stock.ts).
		stockUnits: int('stock_units').default(0).notNull(),
		stockDate: date('stock_date'),
		// What this delivery was, frozen when it was booked: the plan, its pack count, how
		// many the customer had, and the unit price they were billed. Without these, order
		// history re-derives everything from today's plan and subscription, so a later
		// price change or plan switch rewrites what past deliveries appear to have been.
		// NULL only on rows booked before these columns existed and not backfilled.
		planId: varchar('plan_id', { length: 36 }), // -> plans.id (no FK: see planPrices)
		packs: int('packs'),
		quantity: int('quantity'),
		unitPricePence: int('unit_price_pence'),
		...secureFields
	},
	(table) => [
		index('idx_deliveries_subscriber_id').on(table.subscriberId),
		index('idx_deliveries_scheduled_date').on(table.scheduledDate)
	]
);

// ── Stock (capacity per delivery date) ──
// One row per (Saturday, item). `addonId` NULL means the main product; otherwise the row
// tracks that add-on's capacity for the same date. `used` is incremented when a delivery
// is booked, so "full" is `used >= capacity` and the booking logic rolls to the next
// Saturday rather than overselling.
//
// `scopeKey` exists only to make the uniqueness constraint work: MySQL treats NULLs as
// distinct in a unique index, so unique(delivery_date, addon_id) would happily allow two
// main-product rows for the same date. `scopeKey` is 'main' or the addon's id, and is
// what actually carries the constraint — `addonId` is kept for the foreign key and joins.
export const stock = mysqlTable(
	'stock',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		deliveryDate: date('delivery_date').notNull(),
		addonId: varchar('addon_id', { length: 36 }).references(() => addons.id, {
			onDelete: 'cascade'
		}),
		scopeKey: varchar('scope_key', { length: 36 }).notNull(),
		capacity: int('capacity').notNull(),
		used: int('used').default(0).notNull(),
		// Remaining <= this turns the dashboard header indicator red.
		lowThreshold: int('low_threshold').default(10).notNull(),
		// Remaining <= this also emails SMTP_USER, once per crossing.
		criticalThreshold: int('critical_threshold').default(3).notNull(),
		// Set when the critical alert has been sent, so a second booking at the same low
		// level doesn't re-send. Cleared whenever capacity is raised back above it.
		criticalAlertSentAt: timestamp('critical_alert_sent_at'),
		...secureFields
	},
	(table) => [
		unique('stock_date_scope_uniq').on(table.deliveryDate, table.scopeKey),
		index('idx_stock_delivery_date').on(table.deliveryDate)
	]
);

// ── Stock Changes (audit trail) ──
// Every movement, whether an admin editing capacity or a booking consuming a unit.
// `valueAfter` is stored alongside `delta` so the history reads correctly even if rows
// are ever inserted out of order, and `createdBy` (from secureFields) records which admin
// made a manual change — it stays NULL for automatic consumption.
export const stockChanges = mysqlTable(
	'stock_changes',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		stockId: varchar('stock_id', { length: 36 })
			.notNull()
			.references(() => stock.id, { onDelete: 'cascade' }),
		field: mysqlEnum('field', ['capacity', 'used']).notNull(),
		delta: int('delta').notNull(),
		valueAfter: int('value_after').notNull(),
		reason: varchar('reason', { length: 255 }),
		...secureFields
	},
	(table) => [index('idx_stock_changes_stock_id').on(table.stockId)]
);

// ── Notifications (in-app, per subscriber) ──
// Recorded events shown as banners on /account — currently "your delivery moved to a
// later Saturday because the next one was full", but deliberately generic so payment
// failures and skips can reuse it.
export const notifications = mysqlTable(
	'notifications',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		subscriberId: varchar('subscriber_id', { length: 36 })
			.notNull()
			.references(() => subscribers.id, { onDelete: 'cascade' }),
		kind: varchar('kind', { length: 64 }).notNull(),
		title: varchar('title', { length: 255 }).notNull(),
		body: text('body'),
		readAt: timestamp('read_at'),
		...secureFields
	},
	(table) => [index('idx_notifications_subscriber_id').on(table.subscriberId)]
);

// ── Push Subscriptions ──
// One row per browser/device a signed-in user has allowed notifications on. The
// endpoint is the push service URL and is unique per device, so re-subscribing the
// same browser updates the row instead of duplicating it.
export const pushSubscriptions = mysqlTable(
	'push_subscriptions',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: varchar('user_id', { length: 36 })
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		endpoint: varchar('endpoint', { length: 512 }).notNull().unique(),
		p256dh: varchar('p256dh', { length: 255 }).notNull(),
		auth: varchar('auth', { length: 255 }).notNull(),
		...secureFields
	},
	(table) => [index('idx_push_subscriptions_user_id').on(table.userId)]
);

// ── Delivery Skip Dates ──
// A Saturday the company isn't delivering (bank holiday, etc). The rest of the app
// computes "next delivery date" as the next Saturday not in this table, so admins
// only ever manage exceptions — not a calendar of every future Saturday.
export const deliverySkipDates = mysqlTable('delivery_skip_dates', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	date: date('date').notNull().unique(),
	reason: varchar('reason', { length: 255 }),
	...secureFields
});

// ── Delivery Addons (One-off) ──
export const deliveryAddons = mysqlTable('delivery_addons', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	deliveryId: varchar('delivery_id', { length: 36 })
		.notNull()
		.references(() => deliveries.id, { onDelete: 'cascade' }),
	addonId: varchar('addon_id', { length: 36 })
		.notNull()
		.references(() => addons.id),
	quantity: int('quantity').default(1).notNull(),
	...secureFields
});

// ── Delivery Addon Purchases (paid one-off add-ons bought from the reminder email) ──
// A payment record distinct from `deliveryAddons` (which is just "what's currently
// included in this delivery" and covers admin-added freebies too). This table exists
// so the Stripe webhook can dedupe retried `checkout.session.completed` events by
// `stripePaymentIntentId` before it bumps `deliveryAddons` quantities — without it, a
// webhook retry would double-add what the customer paid for once.
export const deliveryAddonPurchases = mysqlTable('delivery_addon_purchases', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	deliveryId: varchar('delivery_id', { length: 36 })
		.notNull()
		.references(() => deliveries.id, { onDelete: 'cascade' }),
	stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }).unique(),
	amountPence: int('amount_pence').notNull(),
	items: json('items').$type<{ id: string; name: string; pricePence: number; quantity: number }[]>().notNull(),
	...secureFields
});

// ── Referrals ──
export const referrals = mysqlTable('referrals', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	referrerId: varchar('referrer_id', { length: 36 })
		.notNull()
		.references(() => subscribers.id, { onDelete: 'cascade' }),
	referredEmail: varchar('referred_email', { length: 255 }).notNull(),
	status: mysqlEnum('status', ['pending', 'subscribed', 'credited']).default('pending').notNull(),
	creditPence: int('credit_pence').default(500),
	quantity: int('quantity').default(1).notNull(),
	...secureFields
});

// ── Gift Orders ──
export const giftOrders = mysqlTable('gift_orders', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	buyerEmail: varchar('buyer_email', { length: 255 }).notNull(),
	buyerName: varchar('buyer_name', { length: 255 }),
	recipientName: varchar('recipient_name', { length: 255 }).notNull(),
	recipientAddress: json('recipient_address').notNull(),
	giftMessage: text('gift_message'),
	durationMonths: int('duration_months').default(1).notNull(),
	stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }).unique(),
	status: mysqlEnum('status', ['pending', 'paid', 'fulfilled']).default('pending').notNull(),
	quantity: int('quantity').default(1).notNull(),
	// Snapshot of the add-ons bought with this order — [{ id, name, pricePence, quantity }].
	// One-off orders never get a `delivery_addons` row (there's no `deliveries` row at all
	// for gift/guest orders), so this is the only record of what was purchased, and the
	// only thing the dashboard and packing slips can read.
	addons: json('addons').$type<{ id: string; name: string; pricePence: number; quantity: number }[]>(),
	// The Saturday the order was booked onto when it was paid, and the main-product units
	// it reserved in `stock` for that date (released again if the order is deleted).
	deliveryDate: date('delivery_date'),
	stockUnits: int('stock_units').default(0).notNull(),
	// Which plan was bought and at what price, written at checkout; `amountPence` is the
	// total Stripe actually charged (plan + add-ons), written by the webhook on payment.
	// NULL on orders placed before these columns existed.
	planId: varchar('plan_id', { length: 36 }), // -> plans.id (no FK: see planPrices)
	unitPricePence: int('unit_price_pence'),
	amountPence: int('amount_pence'),
	...secureFields
});


export const guestOrders = mysqlTable('guest_orders', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	buyerEmail: varchar('buyer_email', { length: 255 }),
	buyerName: varchar('buyer_name', { length: 255 }),
	recipientName: varchar('recipient_name', { length: 255 }),
	recipientAddress: json('recipient_address').notNull(),
	stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }).unique(),
	status: mysqlEnum('status', ['pending', 'paid', 'fulfilled']).default('pending').notNull(),
		addressId: varchar('address_id', { length: 36 }).references(() => addresses.id),
		quantity: int('quantity').default(1).notNull(),
		addons: json('addons').$type<{ id: string; name: string; pricePence: number; quantity: number }[]>(),
		// See giftOrders.deliveryDate / stockUnits.
		deliveryDate: date('delivery_date'),
		stockUnits: int('stock_units').default(0).notNull(),
		// See giftOrders.planId / unitPricePence / amountPence. `planId` stays NULL for
		// add-on-only orders from /addons, which have no plan.
		planId: varchar('plan_id', { length: 36 }), // -> plans.id (no FK: see planPrices)
		unitPricePence: int('unit_price_pence'),
		amountPence: int('amount_pence'),

	...secureFields
});

// ── Honey Orders ──
export const honeyOrders = mysqlTable('honey_orders', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	subscriberId: varchar('subscriber_id', { length: 36 }).references(() => subscribers.id),
	buyerEmail: varchar('buyer_email', { length: 255 }).notNull(),
	variant: mysqlEnum('variant', ['forest', 'white']).notNull(),
	purchaseType: mysqlEnum('purchase_type', ['once', 'subscription']).notNull(),
	frequency: mysqlEnum('frequency', ['monthly', 'bi_monthly']),
	amountPence: int('amount_pence').notNull(),
	stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }),
	stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
	status: mysqlEnum('status', ['pending', 'paid', 'active', 'cancelled'])
		.default('pending')
		.notNull(),
	...secureFields
});



export const plans = mysqlTable(
	'plans',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),

		// App-level identifier used everywhere ('one-off', 'regular', 'single-gift'…).
		slug: varchar('slug', { length: 64 }).notNull().unique(),

		// ── Shown on the subscribe page ──
		name: varchar('name', { length: 120 }).notNull(), // "Regular"
		subtitle: varchar('subtitle', { length: 255 }), // "Our core plan."
		pricePence: int('price_pence').notNull(), // 2400  (£24.00)
		freqLabel: varchar('freq_label', { length: 120 }), // "Monthly · 4 packs"
		bullets: json('bullets').$type<string[]>().default([]), // ["Best value","Most popular"]
		featured: boolean('featured').default(false).notNull(),

		// ── Used by the server ──
		// billing period — one_time for one-off/gifts, monthly for subscriptions
		interval: mysqlEnum('interval', ['one_time', 'monthly', 'bi_monthly']).notNull(),
		packs: int('packs').default(1).notNull(), // pack count (order history + display)
		// how the checkout treats it: order = one-off (needs orders table),
		// subscription = recurring, gift = giftOrders row
		kind: mysqlEnum('kind', ['order', 'subscription', 'gift']).notNull(),
		stripePriceId: varchar('stripe_price_id', { length: 255 }), // Stripe Price ID for checkout

		// ── Admin controls ──
		active: boolean('active').default(true).notNull(), // hide without deleting
		sortOrder: int('sort_order').default(0).notNull(),
		// Shown as "Default quantity" in the dashboard; nothing reads it yet. The quantity
		// a customer actually buys lives on the subscription / order, not here.
		quantity: int('quantity').default(1).notNull(),

		// ── Product definition ──
		// Injera in one pack. `packs` × this × the order quantity = injera delivered.
		injeraPerPack: int('injera_per_pack').default(3).notNull(),
		// ISO 4217, lowercase as Stripe writes it. Everything is GBP today; stored so a
		// second currency doesn't need a migration of every price-bearing table.
		currency: varchar('currency', { length: 3 }).default('gbp').notNull(),
		// Optional sale window (seasonal / limited plans). NULL = no limit on that side.
		availableFrom: datetime('available_from'),
		availableUntil: datetime('available_until'),
		// Most a customer can order at once. NULL = the checkout's own cap applies.
		maxQuantity: int('max_quantity'),

		// ── Translations ──
		// Per-locale overrides of the customer-facing text, e.g.
		// { am: { name, subtitle, freqLabel, bullets } }. Anything missing falls back to the
		// English columns above (see `localizePlan` in $lib/server/plans).
		translations: json('translations').$type<PlanTranslations>(),

		...secureFields
	},
	(table) => [index('idx_plans_kind').on(table.kind), index('idx_plans_active').on(table.active)]
);

export type PlanTranslation = {
	name?: string;
	subtitle?: string;
	freqLabel?: string;
	bullets?: string[];
};
export type PlanTranslations = Partial<Record<string, PlanTranslation>>;

// ── Plan price history ──
// Every Stripe Price a plan has ever sold at. Stripe Prices are immutable, so changing a
// plan's price means a new Price ID — but customers who subscribed earlier keep being
// billed on the old one. `plans.stripePriceId` is only the price NEW checkouts use; this
// table is how a webhook carrying an older Price ID is still matched to its plan.
// `activeTo` NULL = the plan's current price. Maintained by `syncPlanPrices`.
export const planPrices = mysqlTable(
	'plan_prices',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		// -> plans.id. Deliberately not a DB foreign key, like the other `plan_id` snapshot
		// columns added with it: `plans.id` has a different charset from these tables on
		// some databases (MariaDB then refuses the constraint), and plans are archived,
		// never deleted, so there's nothing for the constraint to protect against.
		planId: varchar('plan_id', { length: 36 }).notNull(),
		stripePriceId: varchar('stripe_price_id', { length: 255 }).notNull().unique(),
		pricePence: int('price_pence').notNull(),
		currency: varchar('currency', { length: 3 }).default('gbp').notNull(),
		activeFrom: timestamp('active_from').defaultNow().notNull(),
		activeTo: timestamp('active_to'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [index('idx_plan_prices_plan_id').on(table.planId)]
);



// ── Partner / supplier applications (public /partners form) ──
export const partnerApplications = mysqlTable(
	'partner_applications',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		type: mysqlEnum('type', ['partner', 'supplier']).notNull(),
		businessName: varchar('business_name', { length: 255 }).notNull(),
		contactName: varchar('contact_name', { length: 255 }).notNull(),
		email: varchar('email', { length: 255 }).notNull(),
		phone: varchar('phone', { length: 40 }),
		website: varchar('website', { length: 255 }),
		city: varchar('city', { length: 120 }),
		postcode: varchar('postcode', { length: 16 }),
		// Partner: restaurant / shop / caterer / community … — Supplier: teff / spices / packaging …
		category: varchar('category', { length: 60 }).notNull(),
		message: text('message').notNull(),
		status: mysqlEnum('status', ['new', 'contacted', 'approved', 'declined']).default('new').notNull(),
		...secureFields
	},
	(t) => [index('partner_applications_status_idx').on(t.status)]
);

// One row per hand-over with an approved partner/supplier. For suppliers it's goods we
// received from them; for partners it's injera we delivered to them — the partner's
// `type` decides how the dashboard words it, the columns are the same.
export const partnerDeliveries = mysqlTable(
	'partner_deliveries',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		partnerId: varchar('partner_id', { length: 36 })
			.notNull()
			.references(() => partnerApplications.id, { onDelete: 'cascade' }),
		deliveredOn: date('delivered_on', { mode: 'string' }).notNull(),
		location: varchar('location', { length: 255 }).notNull(),
		items: varchar('items', { length: 500 }).notNull(),
		// decimal: suppliers deal in kg as often as whole units. mysql2 returns a string.
		quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
		unit: varchar('unit', { length: 20 }).notNull(),
		valuePence: int('value_pence'),
		reference: varchar('reference', { length: 100 }),
		status: mysqlEnum('status', ['scheduled', 'delivered', 'cancelled']).default('delivered').notNull(),
		notes: text('notes'),
		...secureFields
	},
	(t) => [index('partner_deliveries_partner_idx').on(t.partnerId, t.deliveredOn)]
);

// ── Traceability: batches ──
// A lot of product — injera we baked, or an add-on we made or bought in. Every unit we
// ship is allocated to a batch (`batchAllocations`), so any delivery traces back to a
// batch, and a batch to its source: "in house", or the supplier/partner it came from.
export const batches = mysqlTable(
	'batches',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		// Human batch number printed on packs, e.g. INJ-261018-01 / ADD-BER-261018-01.
		code: varchar('code', { length: 40 }).notNull().unique(),
		product: mysqlEnum('product', ['injera', 'addon']).notNull(),
		addonId: varchar('addon_id', { length: 36 }).references(() => addons.id),
		source: mysqlEnum('source', ['in_house', 'external']).default('in_house').notNull(),
		// Set when `source` is external: the approved supplier/partner it came from.
		sourcePartnerId: varchar('source_partner_id', { length: 36 }).references(
			() => partnerApplications.id,
			{ onDelete: 'restrict' }
		),
		// The supply receipt it arrived on, and the supplier's own lot number.
		sourceDeliveryId: varchar('source_delivery_id', { length: 36 }).references(
			() => partnerDeliveries.id,
			{ onDelete: 'set null' }
		),
		supplierLotRef: varchar('supplier_lot_ref', { length: 100 }),
		producedOn: date('produced_on', { mode: 'string' }).notNull(),
		bestBefore: date('best_before', { mode: 'string' }),
		// Units this batch can fill — packs for injera, units for add-ons.
		quantity: int('quantity').notNull(),
		unit: varchar('unit', { length: 20 }).default('packs').notNull(),
		status: mysqlEnum('status', ['active', 'quarantined', 'recalled', 'depleted'])
			.default('active')
			.notNull(),
		notes: text('notes'),
		...secureFields
	},
	(t) => [
		index('batches_product_idx').on(t.product, t.addonId, t.status),
		index('batches_source_partner_idx').on(t.sourcePartnerId)
	]
);

// Ingredient lineage for batches we make in house: which supplier receipts (teff lot,
// spice delivery…) went into it. Lets a supplier recall walk forward to customers.
export const batchInputs = mysqlTable(
	'batch_inputs',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		batchId: varchar('batch_id', { length: 36 })
			.notNull()
			.references(() => batches.id, { onDelete: 'cascade' }),
		partnerDeliveryId: varchar('partner_delivery_id', { length: 36 })
			.notNull()
			.references(() => partnerDeliveries.id, { onDelete: 'restrict' }),
		...secureFields
	},
	(t) => [unique('batch_inputs_uniq').on(t.batchId, t.partnerDeliveryId)]
);

// What actually shipped from which batch. One row per (shipment line, batch) — a line
// can be split across two batches when the first runs out. Exactly one of the shipment
// FKs is set, matching `shipmentType`; `lineKey` ('subscription:<id>:injera' or
// '…:<addonId>') carries the uniqueness, since MySQL unique indexes ignore NULLs.
export const batchAllocations = mysqlTable(
	'batch_allocations',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		batchId: varchar('batch_id', { length: 36 })
			.notNull()
			.references(() => batches.id, { onDelete: 'restrict' }),
		shipmentType: mysqlEnum('shipment_type', ['subscription', 'guest', 'gift', 'partner']).notNull(),
		deliveryId: varchar('delivery_id', { length: 36 }).references(() => deliveries.id, {
			onDelete: 'cascade'
		}),
		guestOrderId: varchar('guest_order_id', { length: 36 }).references(() => guestOrders.id, {
			onDelete: 'cascade'
		}),
		giftOrderId: varchar('gift_order_id', { length: 36 }).references(() => giftOrders.id, {
			onDelete: 'cascade'
		}),
		partnerDeliveryId: varchar('partner_delivery_id', { length: 36 }).references(
			() => partnerDeliveries.id,
			{ onDelete: 'cascade' }
		),
		addonId: varchar('addon_id', { length: 36 }).references(() => addons.id),
		lineKey: varchar('line_key', { length: 120 }).notNull(),
		quantity: int('quantity').notNull(),
		// 'auto' (FEFO) or 'manual' (admin picked it) — manual picks are never overwritten.
		method: mysqlEnum('method', ['auto', 'manual']).default('auto').notNull(),
		...secureFields
	},
	(t) => [
		unique('batch_allocations_line_batch_uniq').on(t.lineKey, t.batchId),
		index('batch_allocations_batch_idx').on(t.batchId),
		index('batch_allocations_line_idx').on(t.lineKey)
	]
);
