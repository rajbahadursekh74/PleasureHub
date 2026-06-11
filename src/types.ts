export type CategoryId =
  | 'all'
  | 'toys'
  | 'couples'
  | 'massagers'
  | 'lubricants'
  | 'lingerie'
  | 'men'
  | 'women'
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  category: CategoryId;
  subCategory?: string;
  images: string[];
  specs: { [key: string]: string };
  materials: string[];
  brand: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isLimited?: boolean;
  isFlashSale?: boolean;
  stock: number;
  discreetShipping: boolean;
  tags?: string[];
  variants?: string[]; // e.g. ["Deep Purple", "Satin Black", "Royal Silver"]
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  description: string;
  status?: 'active' | 'expired';
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shippingAddress: Address;
  paymentMethod: string; // 'credit_card' | 'crypto' | 'upi_qr'
  status: 'Pending' | 'Processing' | 'Shipped' | 'Completed' | 'Cancelled' | 'Delivered' | 'Returned' | 'Refunded';
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  trackingNumber?: string;
  paymentScreenshot?: string; // Base64 or mock file path
  paymentVerificationStatus?: 'Pending Verification' | 'Approved' | 'Rejected' | 'Not Required' | 'Refunded';
  orderNotes?: string;
  upiReferenceId?: string;
}

export interface User {
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[]; // Product ids
  orders: Order[];
  status: 'Active' | 'Blocked';
  registeredDate?: string;
}

export interface Staff {
  id: string;
  name: string;
  username: string;
  role: 'owner' | 'admin' | 'staff';
  status: 'Active' | 'Blocked';
  email: string;
  taskCount: number;
}

export interface AdminLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  details: string;
  ip: string;
  device?: string; // Device tracking
}

export interface WebSettings {
  siteName: string;
  siteLogo: string; // Dynamic site logo
  theme: 'dark' | 'light'; // Light/Dark theme configuration
  appIcon: string; // URL or dynamic logo emoji
  enabled: boolean; // Enable/Disable status for website
  maintenanceMode: boolean; // Maintenance Mode Toggle
  newsletterPromo: string;
  smtpServer: string;
  smsGateway: string;
  twoFactorEnabled: boolean;
  language: 'EN' | 'ES' | 'FR' | 'DE';
  discreetName: string; // The name that appears on bank statements
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}
