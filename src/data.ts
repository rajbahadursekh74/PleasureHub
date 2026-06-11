import { Product, Coupon, Review, CategoryId } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'toys', name: 'Adult Toys', icon: 'Activity' },
  { id: 'couples', name: 'Couples Products', icon: 'Users' },
  { id: 'massagers', name: 'Personal Massagers', icon: 'Flame' },
  { id: 'lubricants', name: 'Lubricants', icon: 'Droplet' },
  { id: 'lingerie', name: 'Lingerie', icon: 'Heart' },
  { id: 'men', name: "Men's Collection", icon: 'TrendingUp' },
  { id: 'women', name: "Women's Collection", icon: 'Eye' },
  { id: 'accessories', name: 'Accessories', icon: 'Compass' }
];

export const PRODUCTS: Product[] = [
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

export const MOCK_REVIEWS: Review[] = [
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

export const MOCK_COUPONS: Coupon[] = [
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

export const INITIAL_ADMIN_LOGS = [
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
