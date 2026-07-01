import {
	mysqlTable,
	varchar,
	text,
	boolean,
	int,
	mysqlEnum,
	json,
	date,
	unique,
	index
} from 'drizzle-orm/mysql-core';
import { secureFields, user } from './auth.schema';

export * from './auth.schema';

// ── Subscribers (Linked to Better Auth User) ──
export const subscribers = mysqlTable(
	'subscribers',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: varchar('user_id', { length: 36 })
			.notNull()
			.unique()
			.references(() => user.id, { onDelete: 'cascade' }),
		email: varchar('email', { length: 255 }).notNull().unique(),
		fullName: varchar('full_name', { length: 255 }),
		phone: varchar('phone', { length: 32 }),
		plan: mysqlEnum('plan', ['starter', 'regular']).notNull(),
		status: mysqlEnum('status', ['active', 'paused', 'cancelled']).default('active').notNull(),
		marketingOptIn: boolean('marketing_opt_in').default(true).notNull(),
		stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).unique(),
		stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }).unique(),
		...secureFields
	},
	(table) => [index('idx_subscribers_stripe_customer_id').on(table.stripeCustomerId)]
);

// ── Addresses ──
export const addresses = mysqlTable(
	'addresses',
	{
		id: varchar('id', { length: 36 })
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		subscriberId: varchar('subscriber_id', { length: 36 })
			.notNull()
			.references(() => subscribers.id, { onDelete: 'cascade' }),
		label: varchar('label', { length: 255 }),
		line1: varchar('line1', { length: 255 }).notNull(),
		line2: varchar('line2', { length: 255 }),
		city: varchar('city', { length: 255 }).default('London').notNull(),
		postcode: varchar('postcode', { length: 32 }).notNull(),
		isPrimary: boolean('is_primary').default(false).notNull(),
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
		addonId: varchar('addon_id', { length: 36 })
			.notNull()
			.references(() => addons.id),
		quantity: int('quantity').default(1).notNull(),
		...secureFields
	},
	(table) => [unique('subscriber_addon_uniq').on(table.subscriberId, table.addonId)]
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
		addressId: varchar('address_id', { length: 36 })
			.notNull()
			.references(() => addresses.id),
		scheduledDate: date('scheduled_date').notNull(),
		status: mysqlEnum('status', ['scheduled', 'dispatched', 'delivered', 'skipped', 'failed'])
			.default('scheduled')
			.notNull(),
		...secureFields
	},
	(table) => [
		index('idx_deliveries_subscriber_id').on(table.subscriberId),
		index('idx_deliveries_scheduled_date').on(table.scheduledDate)
	]
);

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
	quantity: int('quantity').default(1).notNull()
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
