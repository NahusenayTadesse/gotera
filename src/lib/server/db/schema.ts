import {
	mysqlTable,
	varchar,
	text,
	boolean,
	int,
	decimal,
	mysqlEnum,
	json,
	date,
	unique,
	index,
	timestamp
} from 'drizzle-orm/mysql-core';
import { secureFields, user } from './auth.schema';

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
	category: mysqlEnum('category', ['spice', 'sauce', 'pantry', 'kit']),
	pricePence: int('price_pence').notNull(),
	imageUrl: text('image_url'),
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
		quantity: int('quantity').default(1).notNull(),
		

		...secureFields
	},
	(table) => [index('idx_plans_kind').on(table.kind), index('idx_plans_active').on(table.active)]
);


