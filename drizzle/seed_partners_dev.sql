-- DEV ONLY — sample partners & suppliers at every stage of the flow, for trying the
-- /dashboard/partners screens locally. Do NOT run against production.
-- Re-runnable: every seeded id starts with 5eed…, and those rows are wiped first
-- (deliveries go with them via ON DELETE CASCADE).

DELETE FROM partner_applications WHERE id LIKE '5eed%';

INSERT INTO partner_applications
	(id, type, business_name, contact_name, email, phone, website, city, postcode, category, message, status, created_at)
VALUES
-- ── Fresh applications (status: new) ──
('5eed0000-0000-4000-8000-000000000001', 'partner', 'Addis Events Catering', 'Selam Haile', 'selam@addisevents.example', '07700 900101', 'https://addisevents.example', 'London', 'N7 8QT', 'caterer',
 'We cater Ethiopian and Eritrean weddings and christenings across North London — usually 2–3 events a month for 150–400 guests. Looking for a reliable injera supplier who can handle large one-off orders with a week''s notice.',
 'new', '2026-10-16 09:12:00'),
('5eed0000-0000-4000-8000-000000000002', 'supplier', 'GreenBox Packaging', 'Tom Clarke', 'tom@greenbox.example', '020 7946 0102', 'https://greenbox.example', 'Leicester', 'LE1 3RQ', 'packaging',
 'We make compostable, food-safe boxes and liners. Our insulated 40cm round box would suit injera rolls and keeps produce fresh for 48h. Happy to send samples.',
 'new', '2026-10-17 14:40:00'),

-- ── In conversation (status: contacted) ──
('5eed0000-0000-4000-8000-000000000003', 'partner', 'St Mary''s Ethiopian Community Centre', 'Abba Gebre', 'office@stmaryscc.example', '07700 900103', NULL, 'London', 'SE15 4RB', 'community',
 'Our community centre hosts a Sunday lunch for around 120 people after service. We would like a weekly standing order of injera, with extra for holy days.',
 'contacted', '2026-10-02 11:05:00'),

-- ── Approved partners (we deliver injera to them) ──
('5eed0000-0000-4000-8000-000000000004', 'partner', 'Habesha Kitchen Peckham', 'Meron Tesfaye', 'meron@habeshakitchen.example', '07700 900104', 'https://habeshakitchen.example', 'London', 'SE15 5DQ', 'restaurant',
 'Family-run Ethiopian restaurant, 40 covers, open six days. We currently make our own injera but cannot keep up at weekends — need around 150 pieces twice a week.',
 'approved', '2026-07-21 10:30:00'),
('5eed0000-0000-4000-8000-000000000005', 'partner', 'Merkato Foods', 'Yonas Alemu', 'yonas@merkatofoods.example', '020 7946 0105', NULL, 'London', 'N15 4QL', 'shop',
 'Ethiopian grocery in Tottenham. Customers ask for fresh injera every day — we would like to stock packs of 5 and 10 on a weekly delivery.',
 'approved', '2026-08-04 16:20:00'),

-- ── Approved suppliers (they deliver to us) ──
('5eed0000-0000-4000-8000-000000000006', 'supplier', 'Abyssinia Grains Ltd', 'Dawit Bekele', 'orders@abyssiniagrains.example', '01632 960106', 'https://abyssiniagrains.example', 'Birmingham', 'B9 4AA', 'teff',
 'Importer of Ethiopian-grown ivory and brown teff, milled in the UK. Soil Association certified. Can supply 100–500 kg a month on 30-day terms.',
 'approved', '2026-06-10 09:00:00'),
('5eed0000-0000-4000-8000-000000000007', 'supplier', 'Mitmita Spice Co', 'Hanna Girma', 'hanna@mitmitaspice.example', '07700 900107', 'https://mitmitaspice.example', 'London', 'E8 3PN', 'spices',
 'Small-batch berbere, mitmita and shiro made to family recipes. We already supply three London restaurants and would love to be part of your add-ons.',
 'approved', '2026-07-01 13:15:00'),

-- ── Ended / declined ──
('5eed0000-0000-4000-8000-000000000008', 'partner', 'Blue Nile Café', 'Samuel Worku', 'sam@bluenilecafe.example', '07700 900108', NULL, 'London', 'SW9 8LF', 'restaurant',
 'Café in Brixton serving breakfast ful and firfir. Need about 60 injera a week.',
 'declined', '2026-05-12 12:00:00'),
('5eed0000-0000-4000-8000-000000000009', 'supplier', 'QuickVan Logistics', 'Lee Turner', 'lee@quickvan.example', '0300 555 0109', 'https://quickvan.example', 'Croydon', 'CR0 2RB', 'logistics',
 'Same-day van courier covering all London postcodes. We offer chilled vans and fixed weekly routes.',
 'declined', '2026-09-20 15:45:00');

INSERT INTO partner_deliveries
	(id, partner_id, delivered_on, location, items, quantity, unit, value_pence, reference, status, notes)
VALUES
-- Habesha Kitchen: twice-weekly injera, one cancelled, next one scheduled
('5eed1000-0000-4000-8000-000000000001', '5eed0000-0000-4000-8000-000000000004', '2026-09-05', '112 Rye Lane, London SE15 5DQ', 'Injera — large (teff blend)', 150, 'pcs', 13500, 'HK-0901', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000002', '5eed0000-0000-4000-8000-000000000004', '2026-09-12', '112 Rye Lane, London SE15 5DQ', 'Injera — large (teff blend)', 150, 'pcs', 13500, 'HK-0902', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000003', '5eed0000-0000-4000-8000-000000000004', '2026-09-19', '112 Rye Lane, London SE15 5DQ', 'Injera — large (teff blend)', 180, 'pcs', 16200, 'HK-0903', 'delivered', 'Extra 30 for Meskel weekend'),
('5eed1000-0000-4000-8000-000000000004', '5eed0000-0000-4000-8000-000000000004', '2026-09-26', '112 Rye Lane, London SE15 5DQ', 'Injera — large (teff blend)', 150, 'pcs', 13500, 'HK-0904', 'cancelled', 'Restaurant closed for kitchen repairs'),
('5eed1000-0000-4000-8000-000000000005', '5eed0000-0000-4000-8000-000000000004', '2026-10-03', '112 Rye Lane, London SE15 5DQ', 'Injera — large (teff blend)', 150, 'pcs', 13500, 'HK-1001', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000006', '5eed0000-0000-4000-8000-000000000004', '2026-10-10', '112 Rye Lane, London SE15 5DQ', 'Injera — large (teff blend)', 150, 'pcs', 13500, 'HK-1002', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000007', '5eed0000-0000-4000-8000-000000000004', '2026-10-10', '112 Rye Lane, London SE15 5DQ', 'Injera — 100% teff', 40, 'pcs', 4800, 'HK-1002', 'delivered', 'Trial of the pure-teff range'),
('5eed1000-0000-4000-8000-000000000008', '5eed0000-0000-4000-8000-000000000004', '2026-10-17', '112 Rye Lane, London SE15 5DQ', 'Injera — large (teff blend)', 150, 'pcs', 13500, 'HK-1003', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000009', '5eed0000-0000-4000-8000-000000000004', '2026-10-24', '112 Rye Lane, London SE15 5DQ', 'Injera — large (teff blend)', 150, 'pcs', 13500, 'HK-1004', 'scheduled', NULL),

-- Merkato Foods: weekly retail packs
('5eed1000-0000-4000-8000-000000000010', '5eed0000-0000-4000-8000-000000000005', '2026-09-22', '23 West Green Rd, London N15 4QL', 'Injera pack of 5', 40, 'packs', 16000, 'MF-38', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000011', '5eed0000-0000-4000-8000-000000000005', '2026-09-29', '23 West Green Rd, London N15 4QL', 'Injera pack of 5', 40, 'packs', 16000, 'MF-39', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000012', '5eed0000-0000-4000-8000-000000000005', '2026-10-06', '23 West Green Rd, London N15 4QL', 'Injera pack of 5', 50, 'packs', 20000, 'MF-40', 'delivered', 'Sold out last week — upped order'),
('5eed1000-0000-4000-8000-000000000013', '5eed0000-0000-4000-8000-000000000005', '2026-10-06', '23 West Green Rd, London N15 4QL', 'Injera pack of 10', 15, 'packs', 11250, 'MF-40', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000014', '5eed0000-0000-4000-8000-000000000005', '2026-10-13', '23 West Green Rd, London N15 4QL', 'Injera pack of 5', 50, 'packs', 20000, 'MF-41', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000015', '5eed0000-0000-4000-8000-000000000005', '2026-10-20', '23 West Green Rd, London N15 4QL', 'Injera pack of 5', 50, 'packs', 20000, 'MF-42', 'scheduled', NULL),

-- Abyssinia Grains: monthly teff into our kitchen
('5eed1000-0000-4000-8000-000000000016', '5eed0000-0000-4000-8000-000000000006', '2026-07-01', 'GOTERA kitchen, Unit 4, London SE1', 'Teff flour — ivory', 250, 'kg', 112500, 'INV-AG-2207', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000017', '5eed0000-0000-4000-8000-000000000006', '2026-08-01', 'GOTERA kitchen, Unit 4, London SE1', 'Teff flour — ivory', 250, 'kg', 112500, 'INV-AG-2231', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000018', '5eed0000-0000-4000-8000-000000000006', '2026-08-01', 'GOTERA kitchen, Unit 4, London SE1', 'Teff flour — brown', 100, 'kg', 42000, 'INV-AG-2231', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000019', '5eed0000-0000-4000-8000-000000000006', '2026-09-01', 'GOTERA kitchen, Unit 4, London SE1', 'Teff flour — ivory', 300, 'kg', 135000, 'INV-AG-2266', 'delivered', 'Two bags damp — credited £45'),
('5eed1000-0000-4000-8000-000000000020', '5eed0000-0000-4000-8000-000000000006', '2026-10-01', 'GOTERA kitchen, Unit 4, London SE1', 'Teff flour — ivory', 300, 'kg', 135000, 'INV-AG-2290', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000021', '5eed0000-0000-4000-8000-000000000006', '2026-10-01', 'GOTERA kitchen, Unit 4, London SE1', 'Teff flour — brown', 120, 'kg', 50400, 'INV-AG-2290', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000022', '5eed0000-0000-4000-8000-000000000006', '2026-11-02', 'GOTERA kitchen, Unit 4, London SE1', 'Teff flour — ivory', 300, 'kg', 135000, NULL, 'scheduled', NULL),

-- Mitmita Spice Co: spices for add-ons
('5eed1000-0000-4000-8000-000000000023', '5eed0000-0000-4000-8000-000000000007', '2026-08-14', 'GOTERA kitchen, Unit 4, London SE1', 'Berbere', 12.5, 'kg', 37500, 'MSC-114', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000024', '5eed0000-0000-4000-8000-000000000007', '2026-08-14', 'GOTERA kitchen, Unit 4, London SE1', 'Mitmita', 4, 'kg', 16000, 'MSC-114', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000025', '5eed0000-0000-4000-8000-000000000007', '2026-09-18', 'GOTERA kitchen, Unit 4, London SE1', 'Berbere', 15, 'kg', 45000, 'MSC-131', 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000026', '5eed0000-0000-4000-8000-000000000007', '2026-09-18', 'GOTERA kitchen, Unit 4, London SE1', 'Shiro powder', 10, 'kg', 22000, 'MSC-131', 'delivered', 'First order of shiro'),

-- Blue Nile Café: partnership ended, history kept
('5eed1000-0000-4000-8000-000000000027', '5eed0000-0000-4000-8000-000000000008', '2026-06-03', '8 Atlantic Rd, London SW9 8LF', 'Injera — large (teff blend)', 60, 'pcs', 5400, NULL, 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000028', '5eed0000-0000-4000-8000-000000000008', '2026-06-10', '8 Atlantic Rd, London SW9 8LF', 'Injera — large (teff blend)', 60, 'pcs', 5400, NULL, 'delivered', NULL),
('5eed1000-0000-4000-8000-000000000029', '5eed0000-0000-4000-8000-000000000008', '2026-06-17', '8 Atlantic Rd, London SW9 8LF', 'Injera — large (teff blend)', 60, 'pcs', 5400, NULL, 'cancelled', 'Café closed — partnership ended');
