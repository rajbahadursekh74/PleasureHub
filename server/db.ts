import fs from 'fs';
import path from 'path';
import { Product, Review, Coupon, AdminLog, WebSettings, SeoSettings, User, Order } from './types_db';

// Define DB file path
const DB_FILE = path.join(process.cwd(), 'db_store.json');

// Mirror core types to avoid import path mismatches in server space
export interface DbData {
  products: Product[];
  users: User[];
  orders: Order[];
  coupons: Coupon[];
  reviews: Review[];
  logs: AdminLog[];
  webSettings: WebSettings;
  seoSettings: SeoSettings;
  adminCredentials: {
    owner: string;
    admin: string;
    staff: string;
  };
}

// Default initial data for seeding
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'classy-oxford-shoes',
    name: 'Classy Italian Oxford Shoes',
    price: 145.00,
    originalPrice: 195.00,
    rating: 4.8,
    reviewCount: 384,
    description: 'Impeccably crafted from genuine full-grain Italian leather, these Oxford shoes feature classic closed-lacing architecture. Built with memory foam insoles for unrivaled comfort and a hand-painted antique patina finish.',
    category: 'footwear',
    images: ['oxford_brown_1', 'oxford_brown_2'],
    specs: {
      'Sole Material': 'Durable Vulcanized Rubber',
      'Construction': 'Premium Blake Stitching',
      'Lining': 'Breathable Calfskin Leather',
      'Insole': 'Cushioned Memory Foam Pad',
      'Width': 'Standard (Medium D)'
    },
    materials: ['Full-Grain Italian Leather', 'Calfskin', 'Rubber'],
    brand: 'Aura Elegance',
    isBestSeller: true,
    stock: 45,
    discreetShipping: false
  },
  {
    id: 'luxe-trench-coat',
    name: 'Luxe Double-Breasted Trench Coat',
    price: 210.00,
    rating: 4.9,
    reviewCount: 156,
    description: 'An iconic silhouette for all weather conditions. Impeccably tailored from water-repellent organic cotton gabardine, incorporating storm flaps, a detachable belt buckle, dynamic throat latches, and bespoke jacquard silk interior linwork.',
    category: 'outerwear',
    images: ['trench_beige_1', 'trench_beige_2'],
    specs: {
      'Fabric Weight': 'Medium Weight (340 GSM)',
      'Waterproofness': 'DWR (Durable Water Repellent) Finish',
      'Pockets': 'Dual Outer Welt, Internal Security Pocket',
      'Fit': 'Tailored / Standard Fit'
    },
    materials: ['Organic Cotton Gabardine', 'Bespoke Jacquard Silk'],
    brand: 'VogueNest',
    isNewArrival: true,
    stock: 18,
    discreetShipping: false
  },
  {
    id: 'leather-tote-bag',
    name: 'Bespoke Saffiano Shoulder Tote Bag',
    price: 189.00,
    rating: 4.7,
    reviewCount: 220,
    description: 'The quintessential minimalist leather accessory for work, travel, and leisure. Finished in durable cross-grain Saffiano leather, structured with gold-toned metal zippers, a dedicated tablet compartment, and hand-stitched handles.',
    category: 'bags',
    images: ['tote_black_1', 'tote_black_2'],
    specs: {
      'Leather Type': 'Premium Saffiano Cross-Grain',
      'Hardware': '24k Gold-Plated Heavy-Duty Zinc Alloy',
      'Dimensions': '38 x 28 x 14 cm',
      'Capacity': 'Fits up to 14" Laptop & Tablet'
    },
    materials: ['Saffiano Leather', 'Gold-Plated Alloy', 'Canvas Lining'],
    brand: 'Sarto Italian',
    isBestSeller: true,
    stock: 22,
    discreetShipping: false
  },
  {
    id: 'silk-mididress',
    name: 'Athenian Floral Cowl Midi Dress',
    price: 135.00,
    rating: 4.9,
    reviewCount: 412,
    description: 'Turn heads at any gather with this stunning cowl-neck slip midi dress. Cut on the bias from luxurious mulberry silk, it hugs natural proportions gracefully with a delicate floral print and an open crossover back detail.',
    category: 'women',
    images: ['dress_floral_1', 'dress_floral_2'],
    specs: {
      'Material': '100% Organic Mulberry Silk (19 Momme)',
      'Weaving': 'Luminous Satin Slip Finish',
      'Closure': 'Concealed Side YKK Slide Zipper',
      'Length': 'Midi-length Silhouette'
    },
    materials: ['Mulberry Silk', 'Satin'],
    brand: 'Feshta Studio',
    isBestSeller: true,
    stock: 14,
    discreetShipping: false
  },
  {
    id: 'slimfit-wool-suit',
    name: 'Imperial Two-Piece Slim Wool Suit',
    price: 345.00,
    originalPrice: 395.00,
    rating: 4.9,
    reviewCount: 92,
    description: 'Exemplify sharp tailoring in this impeccable two-piece suit. Half-canvassed construction from ultra-fine Australian Merino wool. The blazer features elegant notch lapels and natural shoulders, paired with flat-front trousers.',
    category: 'men',
    images: ['suit_navy_1', 'suit_navy_2'],
    specs: {
      'Weave Type': 'Super 120s Australian Merino Wool',
      'Canvassing': 'Half-Canvas Construction',
      'Lining': 'Bemberg Breathable Cupro Mesh',
      'Lapels': 'Modern Notch Lapel (7.5 cm width)'
    },
    materials: ['Merino Wool', 'Bemberg Cupro'],
    brand: 'Dapper Craft',
    isLimited: true,
    stock: 8,
    discreetShipping: false
  },
  {
    id: 'linen-casual-shirt',
    name: 'Riviera Casual Linen Button-Down',
    price: 75.00,
    rating: 4.6,
    reviewCount: 310,
    description: 'Perfect for warm coastal breezes and relaxed office work. Woven from 100% natural organic French flax linen, pre-washed for extraordinary softness and styled with structured button-down collars.',
    category: 'men',
    images: ['shirt_white_1', 'shirt_white_2'],
    specs: {
      'Fabric Style': '100% Pure French Flax Linen',
      'Collar Type': 'Casual Button-Down Style',
      'Cuffs': 'Adjustable Mitred Barrel Cuffs',
      'Washing': 'Garment-washed for zero shrinkage'
    },
    materials: ['French Flax Linen'],
    brand: 'Dapper Craft',
    isNewArrival: true,
    stock: 60,
    discreetShipping: false
  },
  {
    id: 'athleisure-tech-jogger',
    name: 'Velocity Tech Athleisure Joggers',
    price: 89.00,
    rating: 4.7,
    reviewCount: 145,
    description: 'High-performance joggers designed to transition effortlessly from urban exploration to high-intensity gym routines. Engineered with dry-fit four-way stretch fiber tech, water-resistant zip pockets, and tapered cuffs.',
    category: 'activewear',
    images: ['jogger_grey_1'],
    specs: {
      'Fabric formulation': '88% Drifit Nylon, 12% Spandex Blend',
      'Elasticity': '4-Way Highly Responsive Stretch',
      'Pockets': 'Dual Zippered Side Pockets, Hidden Phone Card Pocket'
    },
    materials: ['Nylon', 'Spandex'],
    brand: 'Aero Fit',
    isNewArrival: true,
    stock: 40,
    discreetShipping: false
  },
  {
    id: 'designer-kurtiset',
    name: 'Adorned Georgette Festive Kurti Set',
    price: 129.00,
    rating: 4.8,
    reviewCount: 205,
    description: 'Celebrate high heritage with this stunning georgette Kurti. Embroidered with delicate traditional Chikankari white-thread work, framed by a soft inner lining, and paired with loose-fitting elegant palazzo trousers and a sheer chiffon dupatta.',
    category: 'ethnic',
    images: ['ethnic_mint_1', 'ethnic_mint_2'],
    specs: {
      'Embroidery': 'Exquisite Handmade Chikankari Thread Overlay',
      'Occasions': 'Festive / Wedding Guest / Celebratory',
      'Lining': 'Hypoallergenic Organic Cambric Cotton',
      'Package Includes': '1 Kurti Top, 1 Palazzo Bottom, 1 Chiffon Dupatta'
    },
    materials: ['Georgette', 'Chiffon', 'Cambric Cotton'],
    brand: 'Utsav Legacy',
    isNewArrival: true,
    stock: 15,
    discreetShipping: false
  },
  {
    id: 'minimalist-aviator-glasses',
    name: 'Titanium Aviator Sunglasses',
    price: 48.00,
    rating: 4.5,
    reviewCount: 184,
    description: 'Sleek, lightweight titanium frames in a classic aviator frame. Features certified polarized shatterproof UV400 lenses with anti-reflective back coatings for ultimate daytime vision comfort.',
    category: 'accessories',
    images: ['aviator_gold_1'],
    specs: {
      'Frame Composition': '100% Medical-Grade Pure Titanium',
      'Lens Protection': 'Polarized TAC, UV400 Rating (100% UVA/UVB Block)',
      'Dimensions': 'Lens Width 58mm, Bridge 14mm, Temples 142mm'
    },
    materials: ['Pure Titanium', 'Polarized TAC Lenses'],
    brand: 'Spec Frame',
    isNewArrival: false,
    stock: 50,
    discreetShipping: false
  }
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'classy-oxford-shoes',
    userName: 'Aarav S.',
    rating: 5,
    date: '2026-05-15',
    comment: 'Exceptional craftsmanship. The Blake stitching is beautiful, and the antique hand-painted patina looks outstanding. Fits like secondary skin right out of the box!',
    verified: true
  },
  {
    id: 'rev-2',
    productId: 'classy-oxford-shoes',
    userName: 'Michael R.',
    rating: 5,
    date: '2026-05-28',
    comment: 'The full-grain leather is incredibly rich and sturdy. Unbeatable value compared to high-street designer labels. Delivered in a beautiful matte-black presentation pull-drawer box with silk shoe bags!',
    verified: true
  },
  {
    id: 'rev-3',
    productId: 'silk-mididress',
    userName: 'Sophia L.',
    rating: 5,
    date: '2026-06-01',
    comment: 'A true investment in elegant evening attire. The cowl neckline drape is incredibly high-quality, and the genuine satin mulberry silk feels absolute luxury against the skin.',
    verified: true
  },
  {
    id: 'rev-4',
    productId: 'slimfit-wool-suit',
    userName: 'Johnathan D.',
    rating: 5,
    date: '2026-06-04',
    comment: 'Absolutely stunning formal silhouette. The half-canvas drape is incredibly sophisticated and breaths perfectly. Received dozens of compliments at my gala evening.',
    verified: true
  }
];

const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FESTIVE20',
    discountType: 'percentage',
    value: 20,
    minPurchase: 100,
    description: '20% Off on purchases of $100 or more'
  },
  {
    code: 'FESHTAWISH10',
    discountType: 'fixed',
    value: 10,
    minPurchase: 50,
    description: '$10 Off on your first checkout of $50+'
  },
  {
    code: 'AURASTYLE',
    discountType: 'percentage',
    value: 15,
    minPurchase: 0,
    description: '15% Off across all Collections, no minimum'
  }
];

const INITIAL_LOGS: AdminLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-06-07 10:15:22',
    adminName: 'Admin Staff',
    action: 'Inventory Update',
    details: 'Increased stock of Classy Italian Oxford Shoes (+15)',
    ip: '192.168.1.53'
  },
  {
    id: 'log-2',
    timestamp: '2026-06-07 11:42:01',
    adminName: 'Admin Staff',
    action: 'Security Policy Checked',
    details: 'Verified SSL bindings, updated storefront configuration',
    ip: '192.168.1.53'
  },
  {
    id: 'log-3',
    timestamp: '2026-06-07 13:10:05',
    adminName: 'Admin Staff',
    action: 'Coupon Issued',
    details: 'Created coupon code "FESTIVE20"',
    ip: '192.168.1.53'
  }
];

const INITIAL_USERS: User[] = [
  {
    email: 'customer@gmail.com',
    name: 'Robin Jenkins',
    status: 'Active',
    addresses: [
      {
        name: 'Robin Jenkins',
        street: '1248 Amethyst Parkway, Suite 10b',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94103',
        country: 'United States'
      }
    ],
    wishlist: ['classy-oxford-shoes', 'silk-mididress'],
    orders: []
  },
  {
    email: 'spammer_dan@gmail.com',
    name: 'Dan Spammer',
    status: 'Blocked',
    addresses: [],
    wishlist: [],
    orders: []
  }
];

const DEFAULT_WEB_SETTINGS: WebSettings = {
  siteName: 'FeshtaWish Premium Fashion',
  siteLogo: '✨',
  theme: 'light',
  appIcon: '👔',
  enabled: true,
  maintenanceMode: false,
  newsletterPromo: 'Join our exclusive style newsletter for 15% off!',
  smtpServer: 'smtp.feshtawish.com',
  smsGateway: 'sms.feshtawish.com',
  twoFactorEnabled: true,
  language: 'EN',
  discreetName: 'FeshtaWish Fashion',
  upiId: 'feshtawish@ybl',
  upiName: 'FeshtaWish Private Limited',
  upiQrCodeUrl: ''
};

const DEFAULT_SEO_SETTINGS: SeoSettings = {
  metaTitle: 'FeshtaWish | Premium Fashion Clothing & Designer Accessories',
  metaDescription: 'Explore elegant men\'s suits, silk shirts, designer women\'s midi dresses, stylish footwear, and luxury leather accessories at FeshtaWish.',
  keywords: 'fashion apparel, designer suits, luxury accessories, ethnic clothing, premium footwear, mens wear, womens wear',
  ogImage: 'https://feshtawish.com/images/meta-og.png'
};

const DEFAULT_ADMIN_CREDENTIALS = {
  owner: 'owner123',
  admin: 'admin123',
  staff: 'staff123'
};

class LocalDatabase {
  private cache: DbData;

  constructor() {
    this.cache = this.loadFromFile();
  }

  private loadFromFile(): DbData {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        // Ensure all required fields are filled out
        return {
          products: parsed.products || INITIAL_PRODUCTS,
          users: parsed.users || INITIAL_USERS,
          orders: parsed.orders || [],
          coupons: parsed.coupons || INITIAL_COUPONS,
          reviews: parsed.reviews || INITIAL_REVIEWS,
          logs: parsed.logs || INITIAL_LOGS,
          webSettings: parsed.webSettings || DEFAULT_WEB_SETTINGS,
          seoSettings: parsed.seoSettings || DEFAULT_SEO_SETTINGS,
          adminCredentials: parsed.adminCredentials || DEFAULT_ADMIN_CREDENTIALS
        };
      }
    } catch (e) {
      console.error('Failed to load DB file, using memory storage:', e);
    }

    const defaultDb: DbData = {
      products: INITIAL_PRODUCTS,
      users: INITIAL_USERS,
      orders: [],
      coupons: INITIAL_COUPONS,
      reviews: INITIAL_REVIEWS,
      logs: INITIAL_LOGS,
      webSettings: DEFAULT_WEB_SETTINGS,
      seoSettings: DEFAULT_SEO_SETTINGS,
      adminCredentials: DEFAULT_ADMIN_CREDENTIALS
    };

    this.saveToFile(defaultDb);
    return defaultDb;
  }

  private saveToFile(data: DbData) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write DB file:', e);
    }
  }

  public getData(): DbData {
    return this.cache;
  }

  public getProducts(): Product[] {
    return this.cache.products;
  }

  public setProducts(products: Product[]) {
    this.cache.products = products;
    this.saveToFile(this.cache);
  }

  public getUsers(): User[] {
    return this.cache.users;
  }

  public setUsers(users: User[]) {
    this.cache.users = users;
    this.saveToFile(this.cache);
  }

  public getOrders(): Order[] {
    return this.cache.orders;
  }

  public setOrders(orders: Order[]) {
    this.cache.orders = orders;
    this.saveToFile(this.cache);
  }

  public getCoupons(): Coupon[] {
    return this.cache.coupons;
  }

  public setCoupons(coupons: Coupon[]) {
    this.cache.coupons = coupons;
    this.saveToFile(this.cache);
  }

  public getReviews(): Review[] {
    return this.cache.reviews;
  }

  public setReviews(reviews: Review[]) {
    this.cache.reviews = reviews;
    this.saveToFile(this.cache);
  }

  public getLogs(): AdminLog[] {
    return this.cache.logs;
  }

  public setLogs(logs: AdminLog[]) {
    this.cache.logs = logs;
    this.saveToFile(this.cache);
  }

  public getWebSettings(): WebSettings {
    return this.cache.webSettings;
  }

  public setWebSettings(settings: WebSettings) {
    this.cache.webSettings = settings;
    this.saveToFile(this.cache);
  }

  public getSeoSettings(): SeoSettings {
    return this.cache.seoSettings;
  }

  public setSeoSettings(settings: SeoSettings) {
    this.cache.seoSettings = settings;
    this.saveToFile(this.cache);
  }

  public getAdminCredentials() {
    return this.cache.adminCredentials;
  }

  public setAdminCredentials(creds: { owner: string; admin: string; staff: string }) {
    this.cache.adminCredentials = creds;
    this.saveToFile(this.cache);
  }
}

export const dbInst = new LocalDatabase();
