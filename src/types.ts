export type AppTab = 'beranda' | 'driver' | 'kantin' | 'profil';

export type UserRole = 'mahasiswa' | 'dosen' | 'kantin';

export interface MenuItem {
  id: string;
  name: string;
  canteenId: string;
  canteenName: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  image: string;
  category: 'makanan' | 'minuman' | 'snack' | 'sehat';
  isFavorite?: boolean;
  isAvailable: boolean;
}

export interface Canteen {
  id: string;
  name: string;
  location: string;
  subLocation: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  isOpen: boolean;
  closingTime?: string;
  image: string;
  isVerified: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  spiceLevel?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerRole: 'Mahasiswa' | 'Dosen' | 'Tendik';
  customerPhone: string;
  canteenName: string;
  canteenStand: string;
  deliveryMethod: 'delivery' | 'pickup';
  building: string;
  room: string;
  landmarkNote: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Menunggu Verifikasi' | 'Lunas QRIS' | 'Bayar Tunai';
  status: 'verifikasi' | 'dimasak' | 'siap_ambil' | 'diantar' | 'selesai' | 'dibatalkan';
  driverName?: string;
  driverPhone?: string;
  createdAt: string;
  timeAgo: string;
  receiptImage?: string;
}

export interface DriverJob {
  id: string;
  orderId: string;
  timeAgo: string;
  fee: number;
  canteenName: string;
  pickupLocation: string;
  dropoffLocation: string;
  landmarkNote: string;
  distanceNote?: string;
}

export interface CampusBuilding {
  id: string;
  name: string;
  faculty: string;
  floors: number;
  roomsCount: number;
  status: 'Aktif' | 'Perbaikan';
  detail: string;
}
