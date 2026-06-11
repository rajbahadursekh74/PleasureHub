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
    id: 'sona-2-cruise',
    name: 'Sona 2 Cruise',
    price: 189.00,
    rating: 4.8,
    reviewCount: 1240,
    description: 'Discover the depth of clitoral sensory stimulation. Utilizing sonic waves to reach 75% more volume without direct contact, the Sona 2 Cruise offers deep, rumbling vibrations with intelligent Cruise Control speed monitoring.',
    category: 'toys',
    images: ['sona_purple_1', 'sona_purple_2', 'sona_purple_3'],
    specs: {
      'Material': 'Medical-grade Silicone, ABS Polymer',
      'Waterproofness': 'IPX7 Waterproof (up to 1m)',
      'Vibration Modes': '12 Sonic Pleasure Settings',
      'Battery Life': 'Up to 2 Hours',
      'Charging Time': '1.5 Hours via USB',
      'Sound Level': 'Ultra-Quiet < 45dB'
    },
    materials: ['Medical Silicone', 'ABS Polymer'],
    brand: 'Sona Tech',
    isBestSeller: true,
    stock: 24,
    discreetShipping: true
  },
  {
    id: 'enigma-wave',
    name: 'Enigma Wave',
    price: 219.00,
    rating: 4.9,
    reviewCount: 854,
    description: 'The definitive sonic massager designed for simultaneous dual stimulation. Gently targeting coordinates through subtle pressure waves while matching internal rhythms with an undulating ergonomic shaft.',
    category: 'toys',
    images: ['enigma_gold_1', 'enigma_gold_2'],
    specs: {
      'Material': 'Medical-grade Silicone, Gold-plated Alloy',
      'Dual Stimulation': 'Sonic clitoral + G-spot waves',
      'Waterproofness': '100% Waterproof',
      'Speeds': '10 customizable frequencies',
      'Sound Level': 'Silent operation < 50dB'
    },
    materials: ['Medical Silicone', 'Metallic'],
    brand: 'Lelo',
    isBestSeller: true,
    stock: 12,
    discreetShipping: true
  },
  {
    id: 'aria-premium',
    name: 'Aria Premium',
    price: 345.00,
    originalPrice: 395.00,
    rating: 4.9,
    reviewCount: 321,
    description: 'Indulge in the crown jewel of intimate engineering. The Aria Premium combines responsive smart biosensors with premium obsidian finishes to sync vibrations to your biological temperature and heart rate.',
    category: 'toys',
    images: ['aria_black_1', 'aria_black_2'],
    specs: {
      'Material': 'Obsidian Surgical-grade Bio-Silicone',
      'Key Tech': 'Heart-rate bio feedback pacing',
      'Waterproofness': 'IPX7 rated',
      'Battery': 'Integrated rechargeable polymer',
      'Exclusive': 'Limited Editon Case included'
    },
    materials: ['Medical Silicone', 'Glass', 'Metallic'],
    brand: 'Aria Luxe',
    isLimited: true,
    stock: 5,
    discreetShipping: true
  },
  {
    id: 'luna-silk-ii',
    name: 'Luna Silk II',
    price: 129.00,
    originalPrice: 149.00,
    rating: 4.7,
    reviewCount: 2420,
    description: 'Perfect, sleek, and pocketable pebble massager. Coated with organic velvet soft silicone, featuring micro-resonance motors designed to concentrate pleasure precisely where you desire.',
    category: 'massagers',
    images: ['luna_silk_1', 'luna_silk_2'],
    specs: {
      'Size': '85 x 42 x 30 mm',
      'Material': 'Satin-textured medical silicone',
      'Modulation': 'Continuous variable slider',
      'Charging': 'Wireless charging dock'
    },
    materials: ['Medical Silicone'],
    brand: 'Luna Intime',
    isBestSeller: true,
    stock: 45,
    discreetShipping: true
  },
  {
    id: 'solitaire-aura',
    name: 'Solitaire Aura',
    price: 189.00,
    rating: 4.6,
    reviewCount: 145,
    description: 'A masterpiece of sleek silhouette. The Solitaire Aura features internal dual-pulse resonance designed for elegant pelvic floor toning and muscle-deep release with whisper-quiet frequency tuning.',
    category: 'toys',
    images: ['aura_blue_1'],
    specs: {
      'Material': 'Liquid silicone formulation',
      'Modes': '8 deep pulse sequences',
      'Connectivity': 'Bluetooth Smart App integration'
    },
    materials: ['Medical Silicone'],
    brand: 'Sona Tech',
    isNewArrival: true,
    stock: 18,
    discreetShipping: true
  },
  {
    id: 'midnight-bloom',
    name: 'Midnight Bloom Set',
    price: 75.00,
    rating: 4.8,
    reviewCount: 92,
    description: 'Prepare your chambers for sensory transformation. This set includes dynamic botanical massage candles that melt at body temperature, blended with organic black orchid and sandalwood oils.',
    category: 'accessories',
    images: ['candles_purple_1'],
    specs: {
      'Wax Type': 'Organic Low-melt Soy and Coconut',
      'Scent Notes': 'Black Orchid, Sandalwood, Warm Amber',
      'Pouring Volume': '3 x 150ml premium jars',
      'Safe Temperature': 'Melt trigger at exactly 38°C (100°F)'
    },
    materials: ['Glass', 'Medical Silicone'],
    brand: 'Aura Bloom',
    isNewArrival: true,
    stock: 30,
    discreetShipping: true
  },
  {
    id: 'ethereal-air',
    name: 'Ethereal Air',
    price: 210.00,
    rating: 4.7,
    reviewCount: 64,
    description: 'An ethereal sensation from the future. Ethereal Air leverages hyper-fast air micro-vibrations to create custom waveforms that recreate the sensation of weightlessness and warm air-flows.',
    category: 'toys',
    images: ['ethereal_purple_1'],
    specs: {
      'Technology': 'Aerodynamic micro-waves',
      'Material': 'Ultralight medical silicone',
      'Battery': 'Sustained 3-hour operation'
    },
    materials: ['Medical Silicone', 'ABS Polymer'],
    brand: 'Aria Luxe',
    isNewArrival: true,
    stock: 15,
    discreetShipping: true
  },
  {
    id: 'velvet-nectar-duo',
    name: 'Velvet Nectar Duo',
    price: 48.00,
    rating: 4.5,
    reviewCount: 118,
    description: 'The duo set of premium, pH-balanced intimacy formulas. Formulated derived entirely from organic extracts, simulating natural lubrication perfectly with non-sticky, completely discreet residue.',
    category: 'lubricants',
    images: ['nectar_pink_1'],
    specs: {
      'Base': 'Ultra purity water-based formula',
      'Volume': '2 x 100ml satin-pump dispensers',
      'Compatibility': '100% Condom and Toy Safe',
      'Key Ingredient': 'Soothing aloe-vera and lotus extracts'
    },
    materials: ['ABS Polymer'],
    brand: 'Nectar Care',
    isNewArrival: true,
    stock: 80,
    discreetShipping: true
  },
  {
    id: 'provocateur-lace',
    name: 'Provocateur Silk & Lace',
    price: 135.00,
    rating: 4.9,
    reviewCount: 220,
    description: 'Intricately engineered luxury lingerie set. Structured with micro-mesh support webs, premium mulberry silk bands, and sheer floral laces designed to contour seamlessly around standard anatomical proportions.',
    category: 'lingerie',
    images: ['lingerie_black_1'],
    specs: {
      'Material': '85% Mulberry Silk, 15% Elastane',
      'Weaving': 'Handcrafted French lace overlays',
      'Closure': 'Secure 24-carat gold-plated hook closures',
      'Care': 'Delicate hand-wash only'
    },
    materials: ['Metallic'],
    brand: 'Couture Intimate',
    isBestSeller: true,
    stock: 8,
    discreetShipping: true
  }
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'sona-2-cruise',
    userName: 'Sarah J.',
    rating: 5,
    date: '2026-05-15',
    comment: 'Absolutely mind-blowing. The sonic cruise control features work exactly as advertised, adjusting dynamically to direct touch. Packed in completely plain brown cardboard wrapping with no logo, which was wonderful!',
    verified: true
  },
  {
    id: 'rev-2',
    productId: 'sona-2-cruise',
    userName: 'Marcus K.',
    rating: 5,
    date: '2026-05-28',
    comment: 'The absolute premium quality is palpable. Easy to clean, charges extremely fast, and the purple color looks exceptionally rich. Recommended by our couples therapist.',
    verified: true
  },
  {
    id: 'rev-3',
    productId: 'enigma-wave',
    userName: 'Eliza L.',
    rating: 5,
    date: '2026-06-01',
    comment: 'Bought this together with my fiancé, design-wise it is like a piece of high-tech audio gear. Whisper quiet too! Perfect secure transaction labeled as "PH-Services" on card statements.',
    verified: true
  },
  {
    id: 'rev-4',
    productId: 'aria-premium',
    userName: 'Devon W.',
    rating: 5,
    date: '2026-06-04',
    comment: 'A true investment in personal pleasure. The biological biosubstance syncing feels extremely organic. Package arrived completely sealed.',
    verified: true
  }
];

const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'PLEASURE20',
    discountType: 'percentage',
    value: 20,
    minPurchase: 100,
    description: '20% Off on purchases of $100 or more'
  },
  {
    code: 'DISCREET10',
    discountType: 'fixed',
    value: 10,
    minPurchase: 50,
    description: '$10 Off on your first checkout of $50+'
  },
  {
    code: 'LUNALUXE',
    discountType: 'percentage',
    value: 15,
    minPurchase: 0,
    description: '15% Off across all Products, no minimum'
  }
];

const INITIAL_LOGS: AdminLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-06-07 10:15:22',
    adminName: 'Admin User',
    action: 'Inventory Update',
    details: 'Increased stock of Sona 2 Cruise (+10)',
    ip: '192.168.1.53'
  },
  {
    id: 'log-2',
    timestamp: '2026-06-07 11:42:01',
    adminName: 'Admin User',
    action: 'Security Policy Checked',
    details: 'Verified SSL bindings, enabled 2FA guidelines',
    ip: '192.168.1.53'
  },
  {
    id: 'log-3',
    timestamp: '2026-06-07 13:10:05',
    adminName: 'Admin User',
    action: 'Coupon Issued',
    details: 'Created coupon code "PLEASURE20"',
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
    wishlist: ['sona-2-cruise', 'aria-premium'],
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
  siteName: 'PleasureHub Intimate Logistics',
  siteLogo: '🔮',
  theme: 'dark',
  appIcon: '🧸',
  enabled: true,
  maintenanceMode: false,
  newsletterPromo: 'Join our body-positive mailing circular for 15% off!',
  smtpServer: 'smtp.pleasurehub.internal',
  smsGateway: 'sms.pleasurehub.internal',
  twoFactorEnabled: true,
  language: 'EN',
  discreetName: 'PH-Intimate-Svc',
  upiId: 'pleasurehub@ybl',
  upiName: 'PleasureHub Logistics Private Limited',
  upiQrCodeUrl: ''
};

const DEFAULT_SEO_SETTINGS: SeoSettings = {
  metaTitle: 'PleasureHub | Premium Discreet Wellness Store',
  metaDescription: 'Explore designer sexual wellness devices, anatomical contour guides, and certified organic intimate formulations with Plain Cardboard shipping privacy.',
  keywords: 'adult toys, luxury wellness, intimate cosmetics, sexual health, discrete delivery',
  ogImage: 'https://pleasurehub.secure/images/meta-og.png'
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
