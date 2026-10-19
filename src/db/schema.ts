import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID or campus identifier
  email: text('email').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('mahasiswa'), // 'mahasiswa', 'dosen', 'kantin', 'superadmin'
  phone: text('phone'),
  npm: text('npm'),
  jurusan: text('jurusan'),
  prodi: text('prodi'),
  isDriver: boolean('is_driver').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Canteens table
export const canteens = pgTable('canteens', {
  id: text('id').primaryKey(), // 'mbak-sri', 'dapur-tani', 'bu-tutik'
  name: text('name').notNull(),
  location: text('location').notNull(),
  subLocation: text('sub_location').notNull(),
  rating: text('rating').notNull().default('4.8'),
  reviewCount: integer('review_count').notNull().default(120),
  deliveryTime: text('delivery_time').notNull().default('10-15 mnt'),
  isOpen: boolean('is_open').notNull().default(true),
  image: text('image').notNull(),
  isVerified: boolean('is_verified').notNull().default(true),
  qrisNmid: text('qris_nmid').default('ID10203491823'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Menu items table
export const menuItems = pgTable('menu_items', {
  id: text('id').primaryKey(),
  canteenId: text('canteen_id')
    .references(() => canteens.id)
    .notNull(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  discountPercent: integer('discount_percent'),
  description: text('description'),
  image: text('image').notNull(),
  category: text('category').notNull().default('makanan'),
  isFavorite: boolean('is_favorite').default(false),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  customerName: text('customer_name').notNull(),
  customerRole: text('customer_role').notNull().default('Mahasiswa'),
  customerPhone: text('customer_phone').notNull(),
  canteenId: text('canteen_id').notNull(),
  canteenName: text('canteen_name').notNull(),
  deliveryMethod: text('delivery_method').notNull().default('delivery'), // 'delivery' | 'pickup'
  building: text('building').notNull(),
  room: text('room').notNull(),
  landmarkNote: text('landmark_note').notNull(),
  itemsJson: text('items_json').notNull(), // Serialized JSON array of ordered items
  subtotal: integer('subtotal').notNull(),
  deliveryFee: integer('delivery_fee').notNull().default(3000),
  serviceFee: integer('service_fee').notNull().default(1000),
  total: integer('total').notNull(),
  paymentMethod: text('payment_method').notNull().default('QRIS'),
  paymentStatus: text('payment_status').notNull().default('Menunggu Verifikasi'),
  status: text('status').notNull().default('verifikasi'), // 'verifikasi', 'dimasak', 'siap_ambil', 'diantar', 'selesai', 'dibatalkan'
  driverName: text('driver_name'),
  receiptImage: text('receipt_image'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Campus buildings table
export const campusBuildings = pgTable('campus_buildings', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  faculty: text('faculty').notNull(),
  floors: integer('floors').notNull().default(3),
  roomsCount: integer('rooms_count').notNull().default(12),
  status: text('status').notNull().default('Aktif'),
  detail: text('detail').notNull(),
});
