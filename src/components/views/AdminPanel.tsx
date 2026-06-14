import React from 'react';
import {
  Landmark,
  ClipboardList,
  Settings,
  ShieldAlert,
  BadgePlus,
  Trash2,
  Edit3,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Mail,
  Sliders,
  Users,
  FileText,
  BarChart3,
  HelpCircle,
  Lock,
  Download,
  Upload,
  AlertTriangle,
  Play,
  RefreshCw,
  Send,
  Check,
  X,
  Shield,
  Phone,
  Search,
  Eye,
  Percent,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Copy,
  Plus,
  Activity,
  Menu
} from 'lucide-react';
import { Product, Order, Coupon, AdminLog, WebSettings, SeoSettings, CategoryId, Staff, User } from '../../types';
import { CATEGORIES } from '../../data';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  coupons: Coupon[];
  onAddCoupon: (c: Coupon) => void;
  onDeleteCoupon: (code: string) => void;
  adminLogs: AdminLog[];
  onAddAdminLog: (action: string, details: string) => void;
  webSettings: WebSettings;
  onUpdateWebSettings: (ws: WebSettings) => void;
  seoSettings: SeoSettings;
  onUpdateSeoSettings: (ss: SeoSettings) => void;
  // Let's declare user profiles so we can manage/block them
  usersList?: User[];
  onToggleBlockUser?: (email: string) => void;
  adminCredentials?: {
    owner: string;
    admin: string;
    staff: string;
  };
  onUpdateAdminCredentials?: (creds: { owner: string; admin: string; staff: string }) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  coupons,
  onAddCoupon,
  onDeleteCoupon,
  adminLogs,
  onAddAdminLog,
  webSettings,
  onUpdateWebSettings,
  seoSettings,
  onUpdateSeoSettings,
  usersList = [],
  onToggleBlockUser,
  adminCredentials,
  onUpdateAdminCredentials
}) => {
  const credentials = adminCredentials || {
    owner: 'owner123',
    admin: 'admin123',
    staff: 'staff123'
  };

  const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(false);
  const [adminUsername, setAdminUsername] = React.useState('');
  const [adminPassword, setAdminPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [backofficeRole, setBackofficeRole] = React.useState<'owner' | 'admin' | 'staff'>('admin');

  // Currently active tab state
  const [activeTab, setActiveTab] = React.useState<
    'dashboard' | 'inventory' | 'orders' | 'customers' | 'coupons' | 'settings' | 'reports' | 'staff' | 'security'
  >('dashboard');

  // Product Creator state
  const [newProdName, setNewProdName] = React.useState('');
  const [newProdPrice, setNewProdPrice] = React.useState(129.00);
  const [newProdCategory, setNewProdCategory] = React.useState<CategoryId>('footwear');
  const [newProdBrand, setNewProdBrand] = React.useState('Aura Elegance');
  const [newProdDescription, setNewProdDescription] = React.useState('');
  const [newProdStock, setNewProdStock] = React.useState(25);
  const [newProdTags, setNewProdTags] = React.useState('sartorial, premium, tailored');
  const [newProdVariants, setNewProdVariants] = React.useState('Midnight Black, Espresso Brown, Antique Tan');
  const [selectedSubCategory, setSelectedSubCategory] = React.useState('Formal Footwear');
  const [isFlashSale, setIsFlashSale] = React.useState(false);
  const [isBestSeller, setIsBestSeller] = React.useState(false);
  const [specialPromoBadge, setSpecialPromoBadge] = React.useState('');
  
  // Custom 6-7 image upload strings (initialized with elegant defaults)
  const [newProdPhotos, setNewProdPhotos] = React.useState<string[]>([
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400',
    '', '', '', '', '', ''
  ]);

  // Selected Order for detail / Invoice view modal
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [orderNotes, setOrderNotes] = React.useState('');

  // Coupon Creator state
  const [newCouponCode, setNewCouponCode] = React.useState('');
  const [newCouponVal, setNewCouponVal] = React.useState(15);
  const [newCouponMin, setNewCouponMin] = React.useState(75);
  const [newCouponDesc, setNewCouponDesc] = React.useState('15% Secret Discount');

  // Marketing broadcast indicators
  const [marketingType, setMarketingType] = React.useState<'email' | 'whatsapp' | 'sms'>('email');
  const [broadcastSubject, setBroadcastSubject] = React.useState('');
  const [broadcastMessage, setBroadcastMessage] = React.useState('');
  const [broadcastStatus, setBroadcastStatus] = React.useState<'idle' | 'sending' | 'sent'>('idle');

  // Interactive Analytics timeframe selector
  const [salesTimeframe, setSalesTimeframe] = React.useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Backup / Restore simulations
  const [backupStatus, setBackupStatus] = React.useState('');
  const [restoreMessage, setRestoreMessage] = React.useState('');

  // Staff registry
  const [staffList, setStaffList] = React.useState<Staff[]>([
    { id: 'S1', name: 'Alina Mercer', username: 'alina_mercer', role: 'admin', status: 'Active', email: 'alina@feshtawish.com', taskCount: 8 },
    { id: 'S2', name: 'Jack Vane', username: 'jackv', role: 'staff', status: 'Active', email: 'jack@feshtawish.com', taskCount: 14 },
    { id: 'S3', name: 'Sarah Finch', username: 'sarah_f', role: 'staff', status: 'Blocked', email: 'sarah@feshtawish.com', taskCount: 0 }
  ]);
  const [newStaffName, setNewStaffName] = React.useState('');
  const [newStaffUser, setNewStaffUser] = React.useState('');
  const [newStaffRole, setNewStaffRole] = React.useState<'admin' | 'staff'>('staff');
  const [newStaffEmail, setNewStaffEmail] = React.useState('');

  // Kundenservice support simulated tickets list
  const [supportTickets, setSupportTickets] = React.useState([
    { id: 'TCK-481', customer: 'Robin J.', message: 'Can I customize the collar cuff stitches? Is premium gift wrapping included?', date: '1 hour ago', status: 'Unresolved', reply: '' },
    { id: 'TCK-232', customer: 'Dana K.', message: 'I sent UPI from my Google Pay app but the screen closed. Here is reference ID: UPI830...', date: '3 hours ago', status: 'Replied', reply: 'UPI payment verified and style order approved.' },
    { id: 'TCK-191', customer: 'Alex T.', message: 'Hello, looking forward to rapid global shipping. Thank you for wonderful services.', date: 'Yesterday', status: 'Resolved', reply: 'Delivered in standard gift pack.' }
  ]);
  const [activeTicketReply, setActiveTicketReply] = React.useState('');

  // Security Simulator values
  const [ddosBlocks, setDdosBlocks] = React.useState(184);
  const [sqlFiltersCount, setSqlFiltersCount] = React.useState(542);
  const [isWafActive, setIsWafActive] = React.useState(true);

  // Auto filling helper for quick testing
  const handleAutofillLogin = (role: 'owner' | 'admin' | 'staff') => {
    setAdminUsername(role);
    setAdminPassword(
      role === 'owner' ? credentials.owner :
      role === 'admin' ? credentials.admin :
      credentials.staff
    );
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'owner' && adminPassword === credentials.owner) {
      setIsAdminLoggedIn(true);
      setBackofficeRole('owner');
      setLoginError('');
      onAddAdminLog('Owner Session Authorized', 'Full-access cryptographic operational key authorized from control node IP');
    } else if (adminUsername === 'admin' && adminPassword === credentials.admin) {
      setIsAdminLoggedIn(true);
      setBackofficeRole('admin');
      setLoginError('');
      onAddAdminLog('Administrator Session Authorized', 'Standard catalog and logs visibility authorized');
    } else if (adminUsername === 'staff' && adminPassword === credentials.staff) {
      setIsAdminLoggedIn(true);
      setBackofficeRole('staff');
      setLoginError('');
      onAddAdminLog('Staff Session Authorized', 'Support portal, queue verification, and limited inventory clearing granted');
    } else {
      setLoginError('Cryptographic security credentials match failed. Please enter correct credentials.');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUsername('');
    setAdminPassword('');
    onAddAdminLog('Privilege Downgrade', 'Administrative terminal disconnected safely.');
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    // Filter valid image slots to build 6-7 items array
    const validImages = newProdPhotos.filter(img => img.trim() !== '');
    const finalImages = validImages.length > 0 ? validImages : ['sona_purple_1', 'sona_purple_2'];

    const newProd: Product = {
      id: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newProdName,
      price: newProdPrice,
      rating: 4.9,
      reviewCount: 1,
      description: newProdDescription || 'Masterpiece sensory experience with pristine body layout.',
      category: newProdCategory,
      subCategory: selectedSubCategory,
      images: finalImages,
      specs: {
        'Material': 'Medical-grade Premium Bio-Silicone',
        'Waterproofness': 'IPX7 certified waterproof',
        'Speed Modulation': 'Continuously variable sliders',
        'Sound Emission': 'Ultra whisper quiet'
      },
      materials: ['Medical-grade Silicone', 'ABS Polymer'],
      brand: newProdBrand,
      stock: newProdStock,
      discreetShipping: true,
      isFlashSale: isFlashSale,
      isBestSeller: isBestSeller,
      tags: newProdTags.split(',').map(t => t.trim()),
      variants: newProdVariants.split(',').map(v => v.trim())
    };

    onAddProduct(newProd);
    onAddAdminLog('Item Database Inserted', `Created product "${newProd.name}" in category ${newProd.category}`);
    
    // reset form
    setNewProdName('');
    setNewProdPrice(129.00);
    setNewProdDescription('');
    setNewProdStock(20);
    setNewProdPhotos([
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400',
      '', '', '', '', '', ''
    ]);
  };

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newCp: Coupon = {
      code: newCouponCode.toUpperCase().replace(/\s+/g, ''),
      discountType: 'percentage',
      value: newCouponVal,
      minPurchase: newCouponMin,
      description: newCouponDesc
    };

    onAddCoupon(newCp);
    onAddAdminLog('Marketing Coupon Issued', `Promo code ${newCp.code} ($${newCp.value}% off) inserted dynamically`);
    
    setNewCouponCode('');
    setNewCouponVal(15);
    setNewCouponMin(75);
    setNewCouponDesc('15% Secret Discount');
  };

  const handleBroadcastMarketingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setBroadcastStatus('sending');
    setTimeout(() => {
      setBroadcastStatus('sent');
      onAddAdminLog('Bulk Broadcast Dispatched', `Broadcasted ${marketingType.toUpperCase()} marketing alert to subscribers`);
      setTimeout(() => {
        setBroadcastStatus('idle');
        setBroadcastSubject('');
        setBroadcastMessage('');
      }, 3000);
    }, 2000);
  };

  const handleAddStaffAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffUser.trim()) return;

    const ns: Staff = {
      id: `S${staffList.length + 1}`,
      name: newStaffName,
      username: newStaffUser,
      role: newStaffRole,
      status: 'Active',
      email: newStaffEmail || `${newStaffUser}@feshtawish.com`,
      taskCount: 0
    };

    setStaffList([...staffList, ns]);
    onAddAdminLog('Credential Node Created', `Authorized role: ${newStaffRole.toUpperCase()} for ${newStaffName}`);
    
    setNewStaffName('');
    setNewStaffUser('');
    setNewStaffEmail('');
  };

  const handleToggleStaffStatus = (id: string) => {
    setStaffList(staffList.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'Blocked' : 'Active';
        onAddAdminLog('Staff Authority Modified', `Changed staff account status to ${nextStatus} for ${s.name}`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleRemoveStaffNode = (id: string, name: string) => {
    setStaffList(staffList.filter(s => s.id !== id));
    onAddAdminLog('Credential Node Deleted', `Revoked system privileges for security account ${name}`);
  };

  const handleReplyTicket = (id: string) => {
    if (!activeTicketReply.trim()) return;
    setSupportTickets(supportTickets.map(t => {
      if (t.id === id) {
        return { ...t, status: 'Replied' as any, reply: activeTicketReply };
      }
      return t;
    }));
    onAddAdminLog('Support Communication Dispatched', `Dispatched official helpdesk ticket resolution response to Robin`);
    setActiveTicketReply('');
  };

  const handleDownloadBackup = () => {
    const backupObj = {
      products,
      orders,
      coupons,
      webSettings,
      seoSettings,
      meta: {
        timestamp: new Date().toISOString(),
        author: 'FeshtaWish Systems Secure Node',
        version: '1.4'
      }
    };
    
    const tokenStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupObj, null, 2))}`;
    const trigger = document.createElement('a');
    trigger.setAttribute('href', tokenStr);
    trigger.setAttribute('download', `feshtawish_backup_${Date.now()}.json`);
    document.body.appendChild(trigger);
    trigger.click();
    trigger.remove();
    
    setBackupStatus('Successful download. JSON database backup downloaded successfully.');
    onAddAdminLog('Database Snapshot Downloaded', 'Complete operational backup downloaded as encrypted local JSON document');
  };

  const handleTriggerMockWafClean = () => {
    setDdosBlocks(prev => prev + 4);
    setSqlFiltersCount(prev => prev + 9);
    onAddAdminLog('WAF Shield Purge', 'Flushed firewall isolation pools. Quarantined IP nodes cleared.');
  };

  // Helper calculation for beautiful interactive analytics
  const subtotalSum = orders.reduce((acc, current) => acc + current.subtotal, 0);
  const revenueTotal = orders.reduce((acc, current) => acc + current.total, 0);
  const salesCount = orders.length;
  const shippingCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  return (
    <div id="admin-panel" className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-zinc-100 bg-[#0B0813]">
      
      {!isAdminLoggedIn ? (
        /* CARD-SHAPED LUXURY ROLE AND AUTHENTICATION WALL */
        <div id="admin-gate-card" className="max-w-md mx-auto bg-gradient-to-br from-[#120D25] to-[#0A0717] border border-violet-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />

          <div className="text-center space-y-3 mb-8 relative">
            <div className="w-12 h-12 bg-violet-955/40 border border-violet-500/30 rounded-2xl flex items-center justify-center mx-auto text-fuchsia-400">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-black text-white tracking-tight uppercase">Security Gate</h2>
            <p className="text-[11px] text-zinc-400 leading-normal max-w-xs mx-auto">
              This terminal provides administrative access to FeshtaWish Storefront settings, inventory databases, and dispatch systems.
            </p>
          </div>

          {/* Quick-Access Autofill helpers */}
          <div className="mb-6 p-4 bg-violet-950/20 border border-violet-900/35 rounded-xl space-y-3">
            <span className="text-[9.5px] font-mono font-bold tracking-widest uppercase text-violet-400 block text-center">
              🔐 Operational Autofill Nodes
            </span>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
              <button
                type="button"
                onClick={() => handleAutofillLogin('owner')}
                className="py-1.5 px-2 bg-[#21163F] border border-violet-800 hover:border-violet-500 rounded text-zinc-300 transition-all font-bold"
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => handleAutofillLogin('admin')}
                className="py-1.5 px-2 bg-[#21163F] border border-violet-800 hover:border-violet-500 rounded text-zinc-300 transition-all font-bold"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleAutofillLogin('staff')}
                className="py-1.5 px-2 bg-[#21163F] border border-violet-800 hover:border-violet-500 rounded text-zinc-300 transition-all font-bold"
              >
                Staff
              </button>
            </div>
            <span className="text-[8.5px] text-zinc-500 text-center block leading-relaxed">
              * Click any role node to populate the keys below, then tap Verify Credentials.
            </span>
          </div>

          <form id="admin-access-form" onSubmit={handleAdminAuthSubmit} className="space-y-4 font-mono text-xs">
            {loginError && (
              <div className="p-3 bg-rose-950/20 border border-rose-900/50 text-rose-400 text-[10px] rounded-lg tracking-wide leading-relaxed">
                ⚠️ {loginError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-bold text-zinc-400">Node Operator User:</label>
              <input
                type="text"
                required
                placeholder="e.g. owner"
                value={adminUsername}
                onChange={e => setAdminUsername(e.target.value)}
                className="w-full bg-[#130E26]/50 border border-violet-950 py-3 px-4 rounded-xl text-zinc-200 focus:outline-none focus:border-violet-500 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-bold text-zinc-400">Biological Cryptography Pass Key:</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                className="w-full bg-[#130E26]/50 border border-violet-955 py-3 px-4 rounded-xl text-zinc-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              id="verify-cryptography-btn"
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 font-mono text-[11px] uppercase font-black tracking-widest text-center text-white rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Verify Dynamic credentials
            </button>
          </form>
        </div>
      ) : (
        /* AUTHENTICATED MULTI-ROLE MASTER INTERFACE */
        <div id="authorized-control-center" className="space-y-8 animate-fade-in">
          
          {/* Header row with role tag */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#140F27]/30 border border-violet-955/20 p-5 rounded-3xl relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-950 border border-violet-500/50 rounded-xl flex items-center justify-center text-fuchsia-400">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-xl font-serif font-black text-white uppercase tracking-wider">
                    {webSettings.siteName} Hub Console
                  </h1>
                </div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                  Master Control • Secure Backstage Node
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px]">
              <div className="bg-violet-950/60 border border-violet-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300 font-bold">Role: </span>
                <span className="text-fuchsia-400 uppercase font-black">{backofficeRole}</span>
              </div>
              <button
                onClick={handleLogout}
                className="py-1.5 px-3 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900 text-rose-400 rounded-full font-bold transition-all cursor-pointer"
              >
                Log Out Terminal
              </button>
            </div>
          </div>

          {/* BACKSTAGE MASTER INTERFACES GRID */}
          <div id="backstage-control-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Admin Left tab rail (Responsive and Role-Aware) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Sidebar list */}
              <div className="p-4 bg-zinc-950/40 border border-violet-955/25 rounded-2xl flex flex-col gap-1 text-[11px] font-mono text-zinc-400 text-left">
                <span className="text-[9.5px] font-bold text-violet-400 uppercase tracking-widest mb-3 px-2">Navigation Channels</span>
                
                {/* 1. Dashboard (All roles) */}
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'dashboard' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>Operations Intelligence</span>
                </button>

                {/* 2. Inventory (All roles - staff has view/stock capabilities) */}
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'inventory' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Product Logistics</span>
                </button>

                {/* 3. Secure dispatch (All roles - staff verification queue) */}
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'orders' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Secure Dispatches</span>
                </button>

                {/* 4. Customer suspended/block database (Owner / Admin only) */}
                {(backofficeRole === 'owner' || backofficeRole === 'admin') && (
                  <button
                    onClick={() => setActiveTab('customers')}
                    className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'customers' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>User Suspension</span>
                  </button>
                )}

                {/* 5. Pricing Coupons (Owner / Admin only) */}
                {(backofficeRole === 'owner' || backofficeRole === 'admin') && (
                  <button
                    onClick={() => setActiveTab('coupons')}
                    className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'coupons' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                    }`}
                  >
                    <BadgePlus className="w-4 h-4 text-amber-400" />
                    <span>Marketing Channels</span>
                  </button>
                )}

                {/* 6. Advanced Customizer Adjusters (Owner / Admin only) */}
                {(backofficeRole === 'owner' || backofficeRole === 'admin') && (
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'settings' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                    }`}
                  >
                    <Settings className="w-4 h-4 text-violet-400" />
                    <span>Control Panel</span>
                  </button>
                )}

                {/* 7. Comprehensive Interactive Reports (Owner / Admin only) */}
                {(backofficeRole === 'owner' || backofficeRole === 'admin') && (
                  <button
                    onClick={() => setActiveTab('reports')}
                    className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'reports' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-pink-400" />
                    <span>Reports & Audits</span>
                  </button>
                )}

                {/* 8. Staff Node Directory (Owner / Admin only) */}
                {(backofficeRole === 'owner' || backofficeRole === 'admin') && (
                  <button
                    onClick={() => setActiveTab('staff')}
                    className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'staff' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                    }`}
                  >
                    <Sliders className="w-4 h-4 text-lime-400" />
                    <span>Staff Node Directory</span>
                  </button>
                )}

                {/* 9. Cryptographic Audit Shield Logs (Owner only) */}
                {backofficeRole === 'owner' && (
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'security' ? 'bg-[#18112C] border border-violet-900 text-fuchsia-400 font-bold' : 'hover:bg-zinc-900/40 hover:text-white'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-450 text-rose-400" />
                    <span>Cyber Ops Shield</span>
                  </button>
                )}
              </div>
              
              {/* Quick statistics badge inside dispatch sidebar */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#120D25] to-[#0D091D]/40 border border-violet-900/30 text-left space-y-3 font-mono">
                <span className="text-[8.5px] font-bold text-violet-400 uppercase tracking-widest block">System Status Matrix</span>
                <span className="text-[12.5px] font-bold block text-white select-none">Hub Node #A-184</span>
                <div className="space-y-1.5 text-[10px] text-zinc-400">
                  <div className="flex justify-between">
                    <span>Active Gateway:</span>
                    <span className="text-emerald-400 font-bold">nominal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Inv:</span>
                    <span className="text-zinc-200">{pendingCount} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivered count:</span>
                    <span className="text-zinc-200">{deliveredCount} units</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Right screen dashboard */}
            <div className="lg:col-span-9 space-y-8 bg-[#120F24]/10 border border-violet-955/15 rounded-3xl p-6 md:p-8">
              
              {/* E1. DASHBOARD OVERVIEW tab (Nominal for all roles) */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8 animate-fade-in text-left">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-violet-950/20 pb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-serif font-black text-white uppercase tracking-wider">Operations Dashboard</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">Physical intimate product logistics, demand tracking, and traffic indicators</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-emerald-950/30 border border-emerald-900 text-emerald-400 font-mono text-[9px] uppercase px-3 py-1 rounded">SSL Crypt Active</span>
                      <span className="bg-indigo-950/30 border border-indigo-900 text-indigo-400 font-mono text-[9px] uppercase px-3 py-1 rounded">2FA Shield On</span>
                    </div>
                  </div>

                  {/* Operational Stats row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-zinc-400">
                    <div className="p-6 rounded-2xl bg-[#140F27]/90 border border-violet-955 flex flex-col justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-xl animate-pulse" />
                      <span className="text-[9px] text-[#A78BFA] font-bold">TOTAL REGISTERED INVENTORIES</span>
                      <strong className="block text-2xl font-serif font-black text-white mt-1.5">${revenueTotal.toFixed(2)}</strong>
                      <span className="block text-[9px] text-emerald-400 tracking-wide font-sans mt-1">+14.2% demand index this cycle</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#140F27]/90 border border-violet-955 flex flex-col justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-600/5 rounded-full blur-xl animate-pulse" />
                      <span className="text-[9px] text-fuchsia-400 font-bold">ACTIVE SYSTEM INVOICES</span>
                      <strong className="block text-2xl font-serif font-black text-white mt-1.5">{salesCount} Invoices</strong>
                      <span className="block text-[9px] text-fuchsia-300 tracking-wide font-sans mt-1">{products.length} listed SKUs</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#140F27]/90 border border-violet-955 flex flex-col justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full blur-xl animate-pulse" />
                      <span className="text-[9px] text-indigo-400 font-bold">ACTIVE ACCOUNT REGISTRIES</span>
                      <strong className="block text-2xl font-serif font-black text-white mt-1.5">{Math.max(8, usersList.length + 5)} Users</strong>
                      <span className="block text-[9px] text-indigo-300 tracking-wide font-sans mt-1">Full IP shielding active</span>
                    </div>
                  </div>

                  {/* Selectable Sales interactive custom SVG plot graphs */}
                  <div className="p-6 bg-[#0E0A1E] rounded-2xl border border-violet-950/60 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h4 className="text-xs font-mono font-bold tracking-widest text-[#FBBF24] uppercase">Live Sales Intelligence Metrics</h4>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Physical units and monetary clearing updates</p>
                      </div>
                      
                      {/* Timeframe indicators */}
                      <div className="flex p-1 bg-zinc-950/60 rounded-lg border border-violet-950 font-mono text-[9px]">
                        {(['daily', 'weekly', 'monthly'] as const).map(tf => (
                          <button
                            key={tf}
                            onClick={() => setSalesTimeframe(tf)}
                            className={`px-3 py-1 rounded-md uppercase font-bold transition-all ${
                              salesTimeframe === tf ? 'bg-[#291752] text-fuchsia-400' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Highly responsive custom vector graphics SVG line chart */}
                    <div className="w-full h-44 relative bg-black/10 border border-zinc-900 rounded-xl p-2 font-mono">
                      <svg viewBox="0 0 500 100" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chart-area" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Area Fill */}
                        {salesTimeframe === 'weekly' ? (
                          <path d="M 0 90 L 50 65 L 100 80 L 150 40 L 200 65 L 250 25 L 300 35 L 350 15 L 400 30 L 450 12 L 500 5 L 500 100 L 0 100 Z" fill="url(#chart-area)" />
                        ) : salesTimeframe === 'daily' ? (
                          <path d="M 0 80 L 80 50 L 160 85 L 240 60 L 320 20 L 400 35 L 500 10 L 500 100 L 0 100 Z" fill="url(#chart-area)" />
                        ) : (
                          <path d="M 0 95 L 100 85 L 200 60 L 300 40 L 400 15 L 500 5 L 500 100 L 0 100 Z" fill="url(#chart-area)" />
                        )}

                        {/* Line */}
                        {salesTimeframe === 'weekly' ? (
                          <path d="M 0 90 L 50 65 L 100 80 L 150 40 L 200 65 L 250 25 L 300 35 L 350 15 L 400 30 L 450 12 L 500 5" fill="none" stroke="#EC4899" strokeWidth="2.5" />
                        ) : salesTimeframe === 'daily' ? (
                          <path d="M 0 80 L 80 50 L 160 85 L 240 60 L 320 20 L 400 35 L 500 10" fill="none" stroke="#EC4899" strokeWidth="2.5" />
                        ) : (
                          <path d="M 0 95 L 100 85 L 200 60 L 300 40 L 400 15 L 500 5" fill="none" stroke="#EC4899" strokeWidth="2.5" />
                        )}

                        <circle cx="250" cy="25" r="4.5" fill="#f43f5e" />
                        <circle cx="500" cy="5" r="4.5" fill="#f43f5e" />
                      </svg>

                      <div className="absolute inset-x-4 bottom-1.5 flex justify-between text-[8px] uppercase font-bold text-zinc-500">
                        {salesTimeframe === 'weekly' ? (
                          <><span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span></>
                        ) : salesTimeframe === 'daily' ? (
                          <><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></>
                        ) : (
                          <><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Support tickets (All roles) & Dispatch review queue */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Support inquiries list (Kundenservice) */}
                    <div className="p-6 bg-[#140F27]/30 border border-violet-955 rounded-3xl text-left space-y-4">
                      <h4 className="text-xs tracking-widest font-bold text-violet-400 font-mono uppercase flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-orange-400 animate-pulse" /> Support Queries Queue (Staff/Admin/Owner)
                      </h4>

                      <div className="space-y-4 max-h-72 overflow-y-auto">
                        {supportTickets.map(t => (
                          <div key={t.id} className="p-4 bg-zinc-950/40 border border-violet-955/40 rounded-xl space-y-2 text-[11px] font-mono select-none">
                            <div className="flex justify-between items-center text-zinc-500">
                              <span className="font-bold text-zinc-300">{t.id} • {t.customer}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase ${t.status === 'Resolved' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40' : t.status === 'Replied' ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-900/40' : 'bg-rose-950/45 text-rose-400 border border-rose-900/40'}`}>{t.status}</span>
                            </div>
                            <p className="text-zinc-300 italic mb-2">&ldquo;{t.message}&rdquo;</p>
                            
                            {t.reply ? (
                              <div className="bg-[#110B24] p-2.5 rounded-lg border border-violet-950 text-zinc-400">
                                <span className="font-bold text-violet-400">Resolution Reply:</span> {t.reply}
                              </div>
                            ) : (
                              <div className="space-y-2 pt-2">
                                <input
                                  type="text"
                                  placeholder="Type response parameters..."
                                  onChange={e => setActiveTicketReply(e.target.value)}
                                  className="w-full bg-[#130E26]/50 border border-violet-950 py-1.5 px-2.5 rounded text-[10.5px] select-all focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleReplyTicket(t.id)}
                                  className="px-3 py-1 bg-violet-900 hover:bg-violet-800 text-white rounded text-[10px] font-bold uppercase transition-all"
                                >
                                  Dispatch Resolve Reply
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dispatch quick statistics */}
                    <div className="p-6 bg-[#140F27]/30 border border-violet-955 rounded-3xl text-left space-y-4">
                      <h4 className="text-xs tracking-widest font-bold text-[#FBBF24] font-mono uppercase flex items-center gap-1.5 text-amber-400">
                        <Activity className="w-4 h-4 text-fuchsia-400" /> Administrative Audit logs
                      </h4>
                      <div className="space-y-2.5 divide-y divide-zinc-900/40 max-h-72 overflow-y-auto font-mono text-[10px] text-zinc-400">
                        {adminLogs.slice(-6).reverse().map(l => (
                          <div key={l.id} className="pt-2 text-left space-y-0.5">
                            <div className="flex justify-between text-zinc-550">
                              <span>{l.timestamp}</span>
                              <span className="text-zinc-400 font-bold uppercase">{l.adminName || 'Node'}</span>
                            </div>
                            <p className="text-zinc-200">
                              <span className="text-fuchsia-400 font-black">{l.action}: </span>
                              {l.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* E2. PRODUCTLOGISTICS (INVENTORY CATALOGUE CONTROLLER) */}
              {activeTab === 'inventory' && (
                <div className="space-y-8 animate-fade-in text-left text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-violet-955/35 pb-4">
                    <div>
                      <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wide">Category & Inventory adjustments</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Control items parameters, variants, description lines, prices, and stock numbers</p>
                    </div>
                  </div>

                  {/* Sub-form: Create item (Restricted to owner & admin) */}
                  {(backofficeRole === 'owner' || backofficeRole === 'admin') ? (
                    <form onSubmit={handleCreateProductSubmit} className="p-5 bg-[#140F27]/35 border border-violet-955 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <span className="text-[11px] font-bold text-fuchsia-400 uppercase tracking-widest block col-span-full border-b border-violet-950/20 pb-1 flex items-center gap-1.5 text-violet-400">
                        <Sliders className="w-4 h-4" /> Insert New Intimacies SKU Catalogue
                      </span>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Intimacy Title:</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sona 3 Cruise"
                          value={newProdName}
                          onChange={e => setNewProdName(e.target.value)}
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-zinc-300 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Retail price ($USD):</label>
                        <input
                          type="number"
                          required
                          value={newProdPrice}
                          onChange={e => setNewProdPrice(parseFloat(e.target.value) || 0)}
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-center text-zinc-200 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Platform Category:</label>
                        <select
                          value={newProdCategory}
                          onChange={e => setNewProdCategory(e.target.value as any)}
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-[#EC4899] font-bold focus:outline-none"
                        >
                          {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Initial Stock Ledger:</label>
                        <input
                          type="number"
                          required
                          value={newProdStock}
                          onChange={e => setNewProdStock(parseInt(e.target.value) || 0)}
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-center text-zinc-200 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Sub-Category Tag:</label>
                        <input
                          type="text"
                          value={selectedSubCategory}
                          onChange={e => setSelectedSubCategory(e.target.value)}
                          placeholder="e.g. Clitoral G-Spot Stim"
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Brand Provider Label:</label>
                        <input
                          type="text"
                          value={newProdBrand}
                          onChange={e => setNewProdBrand(e.target.value)}
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Product Tags (comma split):</label>
                        <input
                          type="text"
                          value={newProdTags}
                          onChange={e => setNewProdTags(e.target.value)}
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Product Variants (comma split):</label>
                        <input
                          type="text"
                          value={newProdVariants}
                          onChange={e => setNewProdVariants(e.target.value)}
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded focus:outline-none"
                        />
                      </div>

                      <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#110B24] p-3.5 rounded-xl border border-violet-950 my-2">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isFlashSale}
                            onChange={() => setIsFlashSale(!isFlashSale)}
                            className="accent-fuchsia-500"
                          />
                          <span className="text-[10px] font-bold text-zinc-300">⚡ Flash Sale Promo</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isBestSeller}
                            onChange={() => setIsBestSeller(!isBestSeller)}
                            className="accent-fuchsia-500"
                          />
                          <span className="text-[10px] font-bold text-[#FBBF24]">🔥 Best Seller Badge</span>
                        </label>
                      </div>

                      <div className="col-span-full space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500">Overview brief Description:</label>
                        <input
                          type="text"
                          placeholder="Type details regarding pulse motors, silicone formulations, and charge speeds..."
                          value={newProdDescription}
                          onChange={e => setNewProdDescription(e.target.value)}
                          className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded focus:outline-none text-zinc-200"
                        />
                      </div>

                      {/* Dynamic Carousel Photos Setup (6-7 slots) */}
                      <div className="col-span-full border border-dashed border-violet-955/60 p-4 rounded-xl bg-violet-955/5 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest block">
                            🖼️ Set Product Gallery Photos (Setup up to 7 image links/assets)
                          </span>
                          <span className="text-[9px] text-zinc-500">Allows adding up to 7 beautiful photo carousel records</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {newProdPhotos.map((photo, pIdx) => (
                            <div key={pIdx} className="space-y-1">
                              <label className="text-[8px] text-zinc-400 uppercase">
                                Photo Slot {pIdx + 1} {pIdx === 0 && <span className="text-[#EC4899] font-bold">(Hero Main)</span>}:
                              </label>
                              <input
                                type="text"
                                placeholder={pIdx === 0 ? "e.g. Host/image.jpg" : `e.g. Gallery side photo ${pIdx + 1}`}
                                value={photo}
                                onChange={(e) => {
                                  const copy = [...newProdPhotos];
                                  copy[pIdx] = e.target.value;
                                  setNewProdPhotos(copy);
                                }}
                                className="w-full bg-[#0E091D] border border-violet-950 py-1 px-2.5 rounded focus:outline-none text-zinc-300 font-mono text-[10px]"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-full text-right">
                        <button
                          type="submit"
                          className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-mono uppercase font-black text-[10px] tracking-widest cursor-pointer duration-300 shadow-md"
                        >
                          Commit SKU registries
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-4 bg-orange-950/15 border border-orange-900/35 text-orange-400 text-[10px] rounded-xl flex items-center gap-3">
                      <AlertOctagon className="w-5 h-5 flex-shrink-0 text-orange-400" />
                      <p>
                        <strong>ReadOnly Clearance.</strong> Your Staff user session is authorized to adjust stocks levels in real-time, but full catalogs CRUD operations are restricted to Administrators and system Owners.
                      </p>
                    </div>
                  )}

                  {/* Existing inventory log sheets */}
                  <div id="existent-inventory-ledger" className="space-y-4">
                    <h4 className="text-xs uppercase font-serif font-black tracking-widest text-[#FBBF24]">Currently Listed SKUs</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {products.map(p => (
                        <div
                          key={p.id}
                          className="p-4 bg-zinc-950/40 border border-violet-955 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
                        >
                          <div className="flex-1 min-w-0 space-y-1 text-left">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[9px] text-[#A78BFA] uppercase font-bold bg-[#1C143B] px-2 py-0.5 rounded border border-violet-900">{p.brand}</span>
                              <span className="text-[9px] text-zinc-550 uppercase font-bold">{p.category}</span>
                              {p.isBestSeller && <span className="text-[8.5px] bg-yellow-950/30 text-yellow-500 px-1.5 rounded uppercase font-black font-mono">Bestseller</span>}
                              {p.isFlashSale && <span className="text-[8.5px] bg-fuchsia-950/30 text-fuchsia-400 px-1.5 rounded uppercase font-black font-mono">Flash Sale</span>}
                            </div>
                            <h5 className="font-serif font-black text-sm text-zinc-105 text-zinc-100 uppercase tracking-wide truncate">{p.name}</h5>
                            <p className="text-[10.5px] text-zinc-400 italic line-clamp-1 leading-normal">&ldquo;{p.description}&rdquo;</p>
                            
                            {p.variants && p.variants.length > 0 && (
                              <div className="flex gap-1.5 flex-wrap pt-1 font-mono text-[9px] text-zinc-500">
                                <span>Variants:</span>
                                {p.variants.map((v, idx) => (
                                  <span key={idx} className="text-zinc-450 border-r border-zinc-800 pr-1">{v}</span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Price and Stock Adjustments */}
                          <div className="flex items-center justify-between md:justify-end gap-6 text-center border-t md:border-t-0 border-zinc-900 pt-3 md:pt-0">
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase block font-bold">STOCK CONTROLS</span>
                              <div className="flex items-center bg-[#0C0819] border border-violet-950 rounded px-2.5 py-1 mt-1">
                                <button
                                  onClick={() => onEditProduct({ ...p, stock: Math.max(0, p.stock - 1) })}
                                  className="px-1 text-zinc-500 hover:text-white font-bold"
                                >
                                  -
                                </button>
                                <span className={`px-2 font-black w-7 text-[11px] font-mono ${p.stock < 10 ? 'text-rose-400 animate-pulse' : 'text-zinc-200'}`}>{p.stock}</span>
                                <button
                                  onClick={() => onEditProduct({ ...p, stock: p.stock + 1 })}
                                  className="px-1 text-zinc-500 hover:text-white font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase block font-bold">RETAIL PRICE</span>
                              <span className="font-black block text-zinc-250 text-fuchsia-400 py-1 text-[12px] font-mono">${p.price.toFixed(2)}</span>
                            </div>

                            {/* Delete Button (Restricted to owner & admin) */}
                            {(backofficeRole === 'owner' || backofficeRole === 'admin') && (
                              <button
                                type="button"
                                onClick={() => {
                                  onDeleteProduct(p.id);
                                  onAddAdminLog('Product Deleted', `Removed SKU item ${p.name} from global databases`);
                                }}
                                className="p-2.5 text-zinc-650 hover:text-red-400 bg-red-950/10 hover:bg-red-950/30 rounded border border-transparent hover:border-red-900/30 cursor-pointer duration-250 self-center"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* E3. SECURE DISPATCH ORDER REGISTERS with UPI/Screenshot Verification & Invoice Generator */}
              {activeTab === 'orders' && (
                <div className="space-y-8 animate-fade-in text-xs font-mono text-left">
                  <div className="flex justify-between items-center border-b border-violet-955/35 pb-4">
                    <div>
                      <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wide">Secure Dispatch order records</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Approve payments screenshot verification queues, issue custom dispatches, and review invoices</p>
                    </div>
                  </div>

                  {/* Queue Alert for UPI Payments needing Verification */}
                  <div className="p-4 bg-violet-950/20 border border-violet-900/40 rounded-2xl space-y-3">
                    <span className="text-[9.5px] font-bold text-violet-400 uppercase tracking-widest block flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> UPI QR manual payment verification queue
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                      Standard orders utilizing Credit Cards are immediately cleared via SSL logic. However, UPI/QR code payment receipts and manual screenshot submissions require physical operator audit below. Compare reference numbers and check Base64 files.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <p className="text-zinc-505 italic text-center py-24 border border-dashed border-violet-950 rounded-2xl">No transaction invoices recorded on this checkout session yet.</p>
                    ) : (
                      orders.map(or => {
                        const isUpiPayment = or.paymentMethod.toLowerCase().includes('upi') || or.upiReferenceId;
                        return (
                          <div
                            key={or.id}
                            className={`p-5 rounded-2xl border transition-all text-left space-y-4 ${
                              or.paymentVerificationStatus === 'Pending Verification'
                                ? 'bg-[#18112C] border-[#EC4899]/40'
                                : 'bg-[#140F27]/30 border-violet-955/40'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-3 text-zinc-400 gap-2">
                              <div>
                                <span className="text-[9.5px] text-zinc-550 block uppercase">SYSTEM INVOICE ID:</span>
                                <strong className="text-zinc-200 font-bold uppercase">{or.id}</strong>
                              </div>

                              <div>
                                <span className="text-[9.5px] text-zinc-550 block uppercase">SHIPPING TRACK:</span>
                                <span className="text-zinc-300 font-mono">{or.trackingNumber || 'UNASSIGNED'}</span>
                              </div>

                              <div>
                                <span className="text-[9.5px] text-zinc-550 block uppercase">GATEWAY ROUTE:</span>
                                <span className="text-fuchsia-400 font-bold italic font-serif leading-none">{or.paymentMethod}</span>
                              </div>
                            </div>

                            {/* Addresses detail & Verification */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase font-bold text-zinc-500 block">Recipient Courier Target</span>
                                <p className="text-zinc-300 font-sans text-[11px] leading-relaxed">
                                  <strong>{or.shippingAddress.name}</strong> <br />
                                  {or.shippingAddress.street}, {or.shippingAddress.city}, {or.shippingAddress.state} <br />
                                  {or.shippingAddress.zipCode}, {or.shippingAddress.country}
                                </p>
                              </div>

                              <div className="space-y-2">
                                <span className="text-[9px] uppercase font-bold text-zinc-500 block">Status Adjuster</span>
                                <select
                                  value={or.status}
                                  onChange={e => onUpdateOrderStatus(or.id, e.target.value as any)}
                                  className="w-full bg-[#090611] border border-violet-850 hover:border-violet-600 rounded-lg py-2 px-3 focus:outline-none font-bold text-zinc-300 text-[10.5px] uppercase"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="Returned">Returned</option>
                                  <option value="Refunded">Refunded</option>
                                </select>
                                <span className="text-[9.5px] text-zinc-500 block pl-1">Modify active delivery state</span>
                              </div>

                              {/* Manual UPI Screenshot verification controller */}
                              <div className="p-3 bg-zinc-950/40 border border-violet-955 rounded-xl text-left space-y-2.5">
                                <span className="text-[9px] uppercase font-bold text-violet-400 block">Manual Payments Verification</span>
                                
                                {isUpiPayment ? (
                                  <div className="space-y-1.5 text-[10.5px]">
                                    <div className="flex justify-between">
                                      <span className="text-zinc-450">UPI Reference ID:</span>
                                      <span className="text-zinc-200 font-bold select-all">{or.upiReferenceId || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-zinc-450">Screenshot Status:</span>
                                      <span className={`font-bold ${or.paymentVerificationStatus === 'Approved' ? 'text-emerald-400' : or.paymentVerificationStatus === 'Rejected' ? 'text-rose-400' : 'text-amber-400 animate-pulse'}`}>{or.paymentVerificationStatus || 'Pending Verified'}</span>
                                    </div>

                                    {/* Action buttons to Approve / Reject Screenshots */}
                                    {or.paymentVerificationStatus === 'Pending Verification' && (
                                      <div className="flex gap-2 pt-1">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            or.paymentVerificationStatus = 'Approved';
                                            or.status = 'Processing';
                                            onUpdateOrderStatus(or.id, 'Processing');
                                            onAddAdminLog('Screenshot Approved', `Manually cleared payment screenshot for invoice ${or.id}. Ref: ${or.upiReferenceId}`);
                                          }}
                                          className="flex-1 py-1 px-2 text-[9.5px] bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 font-bold rounded flex items-center justify-center gap-1 cursor-pointer"
                                        >
                                          <Check className="w-3 h-3" /> APPRV
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            or.paymentVerificationStatus = 'Rejected';
                                            onAddAdminLog('Screenshot Rejected', `Invalid screenshot for invoice ${or.id}. Recipient alerted.`);
                                          }}
                                          className="flex-1 py-1 px-2 text-[9.5px] bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-bold rounded flex items-center justify-center gap-1 cursor-pointer"
                                        >
                                          <X className="w-3 h-3" /> REJECT
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-[10px] text-zinc-500 italic">SSL Digital verification, no screenshot audit required.</p>
                                )}
                              </div>
                            </div>

                            {/* View Invoice trigger */}
                            <div className="flex justify-between items-center border-t border-zinc-900 pt-3">
                              <span className="text-[10px] text-zinc-500 block">Confidential total: <strong className="text-fuchsia-400 text-[11px] font-black">${or.total.toFixed(2)}</strong></span>
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(or)}
                                className="flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-400 hover:text-white cursor-pointer duration-200"
                              >
                                <FileText className="w-3.5 h-3.5" /> Render Dynamic invoice Document
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* invoice Document Modal Renderer */}
              {selectedOrder && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-[#130E26] border border-violet-900 rounded-3xl max-w-lg w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto text-left relative font-mono text-zinc-300">
                    
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="absolute top-5 right-5 p-1 bg-zinc-900/60 text-zinc-400 hover:text-white rounded-full cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="text-center pb-4 border-b border-zinc-900 space-y-1">
                      <span className="text-lg">🔮</span>
                      <h4 className="font-serif font-black text-white text-base uppercase tracking-wider">OFFICIAL RECIPIENT INVOICE</h4>
                      <p className="text-[9.5px] text-zinc-500 uppercase tracking-widest">FeshtaWish Secure Logistics Node</p>
                    </div>

                    <div className="space-y-3 text-[10.5px]">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase font-bold">Document ID:</span>
                        <span className="text-zinc-100 font-bold uppercase">{selectedOrder.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase font-bold">Logistics Courier:</span>
                        <span className="text-zinc-100 font-bold uppercase">Discreet Ground Box</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase font-bold">Bank entries show as:</span>
                        <span className="text-fuchsia-400 font-bold italic font-serif select-none">&ldquo;{webSettings.discreetName}&rdquo;</span>
                      </div>
                    </div>

                    {/* Invoice items layout */}
                    <div className="space-y-2 border-t border-zinc-900 pt-4">
                      <span className="text-[9px] uppercase font-black text-zinc-500 block">Acquired intimate goods</span>
                      {selectedOrder.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-[11px] py-1">
                          <span className="text-zinc-300 max-w-[200px] truncate uppercase tracking-wide">{it.name} x {it.quantity}</span>
                          <span className="text-zinc-100">${(it.price * it.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Invoice notes boxes */}
                    <div className="p-3 bg-zinc-950/50 rounded-xl space-y-1">
                      <label className="text-[8.5px] uppercase font-black text-violet-400 block">Operator Log Notes:</label>
                      <span className="text-[10px] italic text-zinc-400 leading-normal block">
                        {selectedOrder.orderNotes || "Package compiled under standard confidentiality rules. No brand description attached."}
                      </span>
                    </div>

                    <div className="space-y-2 border-t border-zinc-900 pt-4 text-xs font-mono">
                      <div className="flex justify-between">
                        <span>Goods Subtotal:</span>
                        <span>${selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-400">
                        <span>Marketing Discount:</span>
                        <span>-${selectedOrder.discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Courier Shipping:</span>
                        <span>${selectedOrder.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold border-t border-zinc-900 pt-2 text-sm">
                        <span>Tax/Discreet clearance:</span>
                        <span className="text-[#EC4899]">${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Dynamic print trigger */}
                    <button
                      type="button"
                      onClick={() => alert('Invoice PDF dispatch compiled! Simulated file downloaded successfully.')}
                      className="w-full py-2.5 bg-[#1C143B] hover:bg-[#2A1E59] border border-violet-850 rounded-xl text-center text-[10px] font-bold uppercase text-fuchsia-400 tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Download Official Invoice File (.PDF)
                    </button>
                  </div>
                </div>
              )}

              {/* E4. CUSTOMER BLOCKED LIST MATRIX (OWNER/ADMINS ONLY) */}
              {activeTab === 'customers' && (
                <div className="space-y-8 animate-fade-in text-left text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-violet-955/35 pb-4">
                    <div>
                      <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wide">Client Access Matrix (Owner/Admin)</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Toggle customer profile status between Active, Quarantined, or Suspension Blocks</p>
                    </div>
                  </div>

                  {/* Matrix list table styled nicely */}
                  <div className="bg-zinc-950/40 border border-violet-955 rounded-3xl p-6 space-y-4">
                    <span className="text-[10px] uppercase font-bold text-violet-400 block tracking-widest">
                      Registered Customer Ledgers
                    </span>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {usersList.length === 0 ? (
                        <p className="text-zinc-500 italic py-6 text-center text-[11.5px]">
                          No client profiles registered. Simulated logins: "customer@gmail.com".
                        </p>
                      ) : (
                        usersList.map((usr, i) => (
                          <div key={usr.email || i} className="p-4 bg-zinc-900/35 border border-violet-955/50 rounded-2xl flex items-center justify-between gap-6">
                            <div className="space-y-1 select-none">
                              <h5 className="font-bold text-white text-[12.5px] uppercase tracking-wide">{usr.name}</h5>
                              <span className="text-[10px] text-zinc-400 block select-all">{usr.email}</span>
                              <span className="text-[9.5px] text-zinc-550 block">Invoices Cleared: {usr.orders?.length || 0} orders</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                usr.status === 'Active'
                                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40'
                                  : 'bg-rose-950/60 text-rose-400 border border-rose-900/60 animate-pulse'
                              }`}>
                                {usr.status || 'Active'}
                              </span>

                              {onToggleBlockUser && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onToggleBlockUser(usr.email);
                                    onAddAdminLog(
                                      usr.status === 'Active' ? 'Client Access Quarantined' : 'Client Access Reinstated',
                                      `Authorized database suspension for profile ${usr.email}`
                                    );
                                  }}
                                  className={`py-1.5 px-3 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                                    usr.status === 'Active'
                                      ? 'bg-rose-950/30 hover:bg-rose-955/50 text-rose-300 border border-rose-900/30'
                                      : 'bg-emerald-950/30 hover:bg-emerald-955/50 text-emerald-300 border border-emerald-900/30'
                                  }`}
                                >
                                  {usr.status === 'Active' ? 'Block Access' : 'Unblock Access'}
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* E5. COUPONS AND BRANDING MARKETING (OWNER/ADMINS ONLY) */}
              {activeTab === 'coupons' && (
                <div className="space-y-8 animate-fade-in text-xs font-mono text-left">
                  <div className="flex justify-between items-center border-b border-violet-955/35 pb-4">
                    <div>
                      <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wide">Marketing Tools & Broadcasts</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Control pricing promo codes and dispatch newsletters or simulated marketing campaigns</p>
                    </div>
                  </div>

                  {/* Sub-form: Create Coupon */}
                  <form onSubmit={handleCreateCouponSubmit} className="p-5 bg-[#140F27]/30 border border-violet-955 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <span className="text-[11px] font-bold text-fuchsia-400 uppercase tracking-widest block col-span-full border-b border-violet-950/20 pb-1 text-violet-400">
                      Design Dynamic Checkout Coupon
                    </span>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500">COUPON CODE (UPPERCASE):</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SANCTUARY30"
                        value={newCouponCode}
                        onChange={e => setNewCouponCode(e.target.value)}
                        className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded focus:outline-none placeholder-zinc-700 text-zinc-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500">VALUE (% OFF):</label>
                      <input
                        type="number"
                        required
                        value={newCouponVal}
                        onChange={e => setNewCouponVal(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-center text-zinc-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500">MIN PURCHASE ($):</label>
                      <input
                        type="number"
                        required
                        value={newCouponMin}
                        onChange={e => setNewCouponMin(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-center text-zinc-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500">RETAIL DESCRIPTOR BOX:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 15% Off on intimacy items"
                        value={newCouponDesc}
                        onChange={e => setNewCouponDesc(e.target.value)}
                        className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded focus:outline-none text-zinc-200"
                      />
                    </div>

                    <div className="col-span-full text-right">
                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-mono uppercase font-black text-[10px] tracking-widest cursor-pointer shadow-md"
                      >
                        Authorize Coupon Code
                      </button>
                    </div>
                  </form>

                  {/* Newsletter Circular/Marketing Channel dispatch */}
                  <div className="p-6 bg-[#140F27]/30 border border-violet-955 rounded-3xl space-y-4">
                    <h4 className="text-xs uppercase font-bold text-violet-400 tracking-widest flex items-center gap-1.5 font-mono">
                      <Mail className="w-4 h-4 text-fuchsia-500 animate-pulse" /> Dispatch Promotional Broadcasts (Audience: 4,500)
                    </h4>

                    {broadcastStatus === 'sent' ? (
                      <div className="bg-emerald-950/20 border border-emerald-800 text-emerald-400 p-6 rounded-2xl text-center space-y-2">
                        <span className="text-2xl block">📬</span>
                        <h5 className="font-bold uppercase tracking-wider text-xs">Circular Distributed Successfully</h5>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Decentralized mailing server successfully dispatched bulk materials.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleBroadcastMarketingSubmit} className="space-y-4 text-[10.5px]">
                        <div className="flex gap-4">
                          {(['email', 'whatsapp', 'sms'] as const).map(ch => (
                            <button
                              key={ch}
                              type="button"
                              onClick={() => setMarketingType(ch)}
                              className={`flex-1 py-1.5 border rounded-lg uppercase tracking-wider font-bold ${
                                marketingType === ch ? 'bg-violet-900 border-violet-500 text-white animate-pulse' : 'bg-[#0E0A1E] border-violet-955 text-zinc-500'
                              }`}
                            >
                              {ch} Mode
                            </button>
                          ))}
                        </div>

                        {marketingType === 'email' && (
                          <div className="space-y-1.5 text-left">
                            <label className="text-zinc-400 font-bold uppercase block text-[9.5px]">Email Subject:</label>
                            <input
                              type="text"
                              placeholder="e.g. Restock Alert: Sona 2 Premium models arrive!"
                              value={broadcastSubject}
                              onChange={e => setBroadcastSubject(e.target.value)}
                              className="w-full bg-[#130E26] border border-violet-950 py-2 s-px px-3 rounded text-zinc-200 focus:outline-none"
                            />
                          </div>
                        )}

                        <div className="space-y-1.5 text-left">
                          <label className="text-zinc-400 font-bold uppercase block text-[9.5px]">Campaign Broadcaster Body Message:</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Type circular campaign message..."
                            value={broadcastMessage}
                            onChange={e => setBroadcastMessage(e.target.value)}
                            className="w-full bg-[#130E26] border border-violet-955 p-3 rounded font-sans text-xs text-zinc-200 focus:outline-none leading-relaxed"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={broadcastStatus === 'sending'}
                          className="w-full py-2.5 bg-violet-650 hover:bg-violet-600 text-white rounded font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                        >
                          {broadcastStatus === 'sending' ? 'Broadcasting now...' : `Send Simulated bulk ${marketingType.toUpperCase()}`}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* E6. SETTINGS PANELS FOR BRAND CUSTOMIZER (OWNER/ADMINS) */}
              {activeTab === 'settings' && (
                <div className="space-y-8 animate-fade-in text-xs font-mono text-left">
                  
                  <div className="flex justify-between items-center border-b border-violet-955/35 pb-4">
                    <div>
                      <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wide">Adjuster Controls Panel</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Configure platform branding identifiers, custom logos, SMTP properties, and backup options</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Platform Brand */}
                    <div className="p-6 bg-zinc-950/40 border border-violet-955 rounded-3xl space-y-4">
                      <h4 className="text-xs uppercase font-serif font-black tracking-wider text-violet-400 flex items-center gap-1.5">
                        <Lock className="w-4 h-4 text-fuchsia-400" /> Platform Brand Customizer
                      </h4>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-zinc-500">Website Name:</label>
                          <input
                            type="text"
                            value={webSettings.siteName}
                            onChange={e => onUpdateWebSettings({ ...webSettings, siteName: e.target.value })}
                            className="w-full bg-[#0E091D] border border-violet-950 py-2 px-3 rounded focus:outline-none text-zinc-200 font-bold select-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-zinc-500">Website Logo string / Emoji:</label>
                          <input
                            type="text"
                            value={webSettings.siteLogo}
                            onChange={e => onUpdateWebSettings({ ...webSettings, siteLogo: e.target.value })}
                            className="w-full bg-[#0E091D] border border-violet-950 py-2 px-3 rounded focus:outline-none text-fuchsia-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-zinc-500">Website Theme Setting:</label>
                          <select
                            value={webSettings.theme}
                            onChange={e => onUpdateWebSettings({ ...webSettings, theme: e.target.value as any })}
                            className="w-full bg-[#0E091D] border border-violet-950 py-2 px-3 rounded focus:outline-none"
                          >
                            <option value="dark">Professional Obsidian Polish (Dark)</option>
                            <option value="light">Crisp Editorial Canvas (Light)</option>
                          </select>
                        </div>

                        {/* Enable/Disable & Maintenance mode togglers (Owner/Admin only) */}
                        <div className="bg-[#110B24] p-3.5 rounded-xl border border-violet-950 space-y-3.5">
                          <span className="text-[9px] uppercase font-bold text-violet-400 block tracking-widest">
                            Storefront Global Visibilities
                          </span>
                          
                          <label className="flex items-center justify-between cursor-pointer select-none">
                            <span className="text-[10px] font-bold text-zinc-400">Enable Website (Online)</span>
                            <input
                              type="checkbox"
                              checked={webSettings.enabled}
                              onChange={() => onUpdateWebSettings({ ...webSettings, enabled: !webSettings.enabled })}
                              className="accent-fuchsia-500 w-4 h-4 cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between cursor-pointer select-none">
                            <span className="text-[10px] font-bold text-[#FBBF24]">Maintenance Overlay Status</span>
                            <input
                              type="checkbox"
                              checked={webSettings.maintenanceMode}
                              onChange={() => onUpdateWebSettings({ ...webSettings, maintenanceMode: !webSettings.maintenanceMode })}
                              className="accent-fuchsia-500 w-4 h-4 cursor-pointer"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Change Admin/Staff/Owner Passwords section */}
                    <div className="p-6 bg-zinc-950/40 border border-violet-955 rounded-3xl space-y-4">
                      <h4 className="text-xs uppercase font-serif font-black tracking-wider text-fuchsia-400 flex items-center gap-1.5">
                        <Lock className="w-4 h-4 text-fuchsia-400" /> Administrative Access Passwords
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        Alter credentials needed to access standard admin roles dynamically. Saves changes immediately.
                      </p>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-500 block">Owner Access Password:</label>
                          <input
                            type="text"
                            value={credentials.owner}
                            onChange={(e) => {
                              onUpdateAdminCredentials?.({ ...credentials, owner: e.target.value });
                            }}
                            className="w-full bg-[#0E091D] border border-violet-955 py-1.5 px-3 rounded focus:outline-none text-rose-400 font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-500 block">Admin Access Password:</label>
                          <input
                            type="text"
                            value={credentials.admin}
                            onChange={(e) => {
                              onUpdateAdminCredentials?.({ ...credentials, admin: e.target.value });
                            }}
                            className="w-full bg-[#0E091D] border border-violet-955 py-1.5 px-3 rounded focus:outline-none text-violet-400 font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-zinc-500 block">Staff Access Password:</label>
                          <input
                            type="text"
                            value={credentials.staff}
                            onChange={(e) => {
                              onUpdateAdminCredentials?.({ ...credentials, staff: e.target.value });
                            }}
                            className="w-full bg-[#0E091D] border border-violet-955 py-1.5 px-3 rounded focus:outline-none text-emerald-400 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* UPI QR Code Customizer Portal (Owner/Admin) */}
                    <div className="p-6 bg-zinc-950/40 border border-emerald-900/30 rounded-3xl space-y-4 col-span-full">
                      <h4 className="text-xs uppercase font-serif font-black tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <Landmark className="w-4 h-4 text-emerald-400" /> UPI Gateway & QR Asset Customizer
                      </h4>
                      <p className="text-[11px] text-zinc-450">
                        Configure the UPI receiver VPA and visual QR parameters loaded inside the Checkout flow interface.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-zinc-500">Merchant UPI Address (VPA):</label>
                          <input
                            type="text"
                            placeholder="e.g. business@ybl"
                            value={webSettings.upiId || ''}
                            onChange={e => onUpdateWebSettings({ ...webSettings, upiId: e.target.value })}
                            className="w-full bg-[#0E091D] border border-violet-950 py-2 px-3 rounded focus:outline-none text-emerald-400 font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-zinc-500">Merchant Name:</label>
                          <input
                            type="text"
                            placeholder="e.g. FeshtaWish Fashion Pvt Ltd"
                            value={webSettings.upiName || ''}
                            onChange={e => onUpdateWebSettings({ ...webSettings, upiName: e.target.value })}
                            className="w-full bg-[#0E091D] border border-violet-950 py-2 px-3 rounded focus:outline-none text-zinc-200"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-zinc-500">Custom QR URL (Optional image link):</label>
                          <input
                            type="text"
                            placeholder="e.g. https://domain.me/qr.png"
                            value={webSettings.upiQrCodeUrl || ''}
                            onChange={e => onUpdateWebSettings({ ...webSettings, upiQrCodeUrl: e.target.value })}
                            className="w-full bg-[#0E091D] border border-violet-950 py-2 px-3 rounded focus:outline-none text-zinc-350 text-xs"
                          />
                        </div>
                      </div>

                      {/* Display Preview */}
                      <div className="bg-[#111A1B] p-4 rounded-xl border border-emerald-950/40 flex flex-col sm:flex-row gap-4 items-center">
                        <div className="w-16 h-16 bg-white p-0.5 rounded-lg flex items-center justify-center flex-shrink-0">
                          {webSettings.upiQrCodeUrl ? (
                            <img src={webSettings.upiQrCodeUrl} className="w-full h-full object-contain" alt="QR" referrerPolicy="no-referrer" />
                          ) : (
                            <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] text-black">
                              <rect x="0" y="0" width="100" height="100" fill="#000" />
                              <rect x="10" y="10" width="20" height="20" fill="#FFF" />
                              <rect x="15" y="15" width="10" height="10" fill="#000" />
                              <rect x="70" y="10" width="20" height="20" fill="#FFF" />
                              <rect x="10" y="70" width="20" height="20" fill="#FFF" />
                              <rect x="40" y="40" width="20" height="20" fill="#FFF" />
                              <rect x="45" y="45" width="10" height="10" fill="#000" />
                              <rect x="75" y="75" width="15" height="15" fill="#FFF" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 text-[11px] text-zinc-400">
                          <span className="font-bold text-emerald-400 block text-[9px] uppercase tracking-widest">Active QR configurations live preview</span>
                          <p>
                            VPA Account: <strong className="text-zinc-200 font-mono">{webSettings.upiId || 'Not Configured (Using Default)'}</strong> <br />
                            Display Name: <strong className="text-zinc-200">{webSettings.upiName || 'FeshtaWish Fashion (Fallback)'}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DB Backup Snapshot & Restore Simulation */}
                    <div className="p-6 bg-zinc-950/40 border border-violet-955 rounded-3xl space-y-4">
                      <h4 className="text-xs uppercase font-serif font-black tracking-wider text-violet-400 flex items-center gap-1.5">
                        <Download className="w-4 h-4 text-[#FBBF24]" /> Platform database backup simulation and restore
                      </h4>

                      <div className="space-y-4 pt-1 text-[11px] font-mono leading-relaxed text-zinc-400">
                        <p>
                          Export FeshtaWish fashion database (active inventory, catalog lists, and coupon rulesets) into a standardized, structured `.JSON` backup snapshot document below.
                        </p>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleDownloadBackup}
                            className="flex-1 py-3 px-4 bg-violet-950 hover:bg-violet-900 border border-violet-800 rounded-xl font-bold flex items-center justify-center gap-2 tracking-wide cursor-pointer text-zinc-200"
                          >
                            <Download className="w-4 h-4 text-fuchsia-400" /> Export Database JSON
                          </button>
                        </div>

                        {backupStatus && (
                          <div className="p-3 bg-emerald-950/20 border border-emerald-900 text-emerald-400 rounded-md text-[10px] tracking-wide leading-relaxed">
                            ✔️ {backupStatus}
                          </div>
                        )}

                        <div className="border-t border-zinc-900/60 pt-4 space-y-2">
                          <span className="text-[9px] uppercase font-bold text-zinc-500 block">Restore Databases from Backups</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              accept=".json"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setRestoreMessage(`File "${e.target.files[0].name}" successfully parsed. Simulation database updated!`);
                                  onAddAdminLog('Database snapshot restored', `Injected backup model sequence from local JSON`);
                                }
                              }}
                              className="text-[9.5px] cursor-pointer text-zinc-500"
                            />
                          </div>
                          {restoreMessage && (
                            <p className="text-[10px] text-emerald-400 animate-pulse">{restoreMessage}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* E7. COMPREHENSIVE PERIODIC REPORTS INDEX (OWNER/ADMINS) */}
              {activeTab === 'reports' && (
                <div className="space-y-8 animate-fade-in text-xs font-mono text-left">
                  
                  <div className="flex justify-between items-center border-b border-violet-955/35 pb-4">
                    <div>
                      <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wide">Interactive Analytics Center</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Physical product demand reports, profit margins calculations, and period exports</p>
                    </div>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-[#140F27]/30 border border-violet-955 rounded-2xl p-4">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 block">Accrued Profit</span>
                      <strong className="text-base text-zinc-200 block mt-1">${(revenueTotal * 0.75).toFixed(2)}</strong>
                    </div>
                    <div className="bg-[#140F27]/30 border border-violet-955 rounded-2xl p-4">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 block">Profit Margin %</span>
                      <strong className="text-base text-emerald-400 block mt-1">75.0% NPV</strong>
                    </div>
                    <div className="bg-[#140F27]/30 border border-violet-955 rounded-2xl p-4">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 block">Avg Cart Value</span>
                      <strong className="text-base text-zinc-200 block mt-1">${salesCount > 0 ? (revenueTotal / salesCount).toFixed(2) : '0.00'}</strong>
                    </div>
                    <div className="bg-[#140F27]/30 border border-violet-955 rounded-2xl p-4">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 block">Suspended Profiles</span>
                      <strong className="text-base text-zinc-200 block mt-1">
                        {usersList.filter(u => u.status === 'Blocked').length || 0} users
                      </strong>
                    </div>
                  </div>

                  {/* Period micro-reports table representation */}
                  <div className="bg-zinc-950/40 border border-violet-955 rounded-3xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-violet-400 block tracking-widest">
                        Periodic Profit Ledgers (Daily / Monthly)
                      </span>
                      
                      <button
                        type="button"
                        onClick={() => alert('Excel ledger exported and downloaded!')}
                        className="py-1 px-3 bg-violet-950/60 hover:bg-violet-900 border border-violet-850 rounded text-[9px] font-bold uppercase transition-all tracking-wider text-zinc-300"
                      >
                        Export CSV Ledger
                      </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px] font-mono leading-relaxed text-zinc-400">
                        <thead className="border-b border-zinc-900 text-zinc-500 font-bold uppercase">
                          <tr>
                            <th className="py-2.5">Interval Block</th>
                            <th>Total Sales Logged</th>
                            <th>Avg Net Clearing</th>
                            <th>Gross Cash Accrued</th>
                            <th>Fictional Yield %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/60 pt-2 text-zinc-300 select-none">
                          <tr>
                            <td className="py-3 font-bold text-zinc-100">Daily Clearing Units</td>
                            <td>{salesCount}</td>
                            <td>$156.40</td>
                            <td>${revenueTotal.toFixed(2)}</td>
                            <td>98.5%</td>
                          </tr>
                          <tr className="text-zinc-450">
                            <td className="py-3 font-bold">Previous cycle</td>
                            <td>42 orders</td>
                            <td>$131.20</td>
                            <td>$5,510.40</td>
                            <td>97.1%</td>
                          </tr>
                          <tr className="text-zinc-450">
                            <td className="py-3 font-bold">Aggregated Year Block</td>
                            <td>310 orders</td>
                            <td>$149.80</td>
                            <td>$46,438.00</td>
                            <td>99.2%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* E8. STAFF NODE DIRECTORY TAB (OWNER & ADMIN ONLY) */}
              {activeTab === 'staff' && (
                <div className="space-y-8 animate-fade-in text-xs font-mono text-left">
                  
                  <div className="flex justify-between items-center border-b border-violet-955/35 pb-4">
                    <div>
                      <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wide">Staff and Operations Directory</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Provision auxiliary staff operational profiles, audit tasks counts, and alter permissions limits</p>
                    </div>
                  </div>

                  {/* Create staff node form */}
                  <form onSubmit={handleAddStaffAccount} className="p-5 bg-[#140F27]/30 border border-violet-955 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <span className="text-[11px] font-bold text-fuchsia-400 uppercase tracking-widest block col-span-full border-b border-violet-950/20 pb-1 text-violet-400">
                      Issue Staff Operational Account Key
                    </span>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500">Full Name:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alina Mercer"
                        value={newStaffName}
                        onChange={e => setNewStaffName(e.target.value)}
                        className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-zinc-200 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500">Security Operator Username:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. alina_mercer"
                        value={newStaffUser}
                        onChange={e => setNewStaffUser(e.target.value)}
                        className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-zinc-200 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500">System Permission Role:</label>
                      <select
                        value={newStaffRole}
                        onChange={e => setNewStaffRole(e.target.value as any)}
                        className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded focus:outline-none placeholder-zinc-700 text-zinc-200"
                      >
                        <option value="admin">Administrator (Inventory, Coupons)</option>
                        <option value="staff">Associate Support Staff (Inquiries, Verification)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500">Encrypted Email Address:</label>
                      <input
                        type="email"
                        placeholder="e.g. alina@pleasurehub.com"
                        value={newStaffEmail}
                        onChange={e => setNewStaffEmail(e.target.value)}
                        className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded text-zinc-200 focus:outline-none"
                      />
                    </div>

                    <div className="col-span-full text-right">
                      <button
                        type="submit"
                        className="py-2 px-6 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-serif uppercase font-semibold text-[10px] tracking-widest cursor-pointer shadow-md rounded-lg transition-all"
                      >
                        Provision Operator account
                      </button>
                    </div>
                  </form>

                  {/* Active staff tables */}
                  <div className="bg-zinc-950/40 border border-violet-955 rounded-3xl p-6 space-y-4">
                    <span className="text-[10px] uppercase font-bold text-violet-400 block tracking-widest">
                      Active Operating Nodes Directory
                    </span>

                    <div className="space-y-3 max-h-72 overflow-y-auto">
                      {staffList.map(st => (
                        <div key={st.id} className="p-4 bg-zinc-900/35 border border-violet-955/50 rounded-xl flex items-center justify-between gap-6">
                          <div className="space-y-0.5 select-none text-left">
                            <h5 className="font-bold text-white text-xs uppercase tracking-wide">
                              {st.name} <span className="text-[9px] text-[#A78BFA] font-mono lowercase">@{st.username}</span>
                            </h5>
                            <span className="text-[10px] text-zinc-400 block">{st.email}</span>
                            <span className="text-[9px] text-zinc-550 block">Privileges: {st.role.toUpperCase()} • Tasks cleared: {st.taskCount} operations</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              st.status === 'Active' ? 'bg-emerald-950/40 text-emerald-400' : 'bg-rose-950/45 text-rose-450'
                            }`}>
                              {st.status}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleToggleStaffStatus(st.id)}
                              className="py-1 px-2 text-[9px] bg-zinc-900 hover:bg-zinc-855 rounded border hover:border-violet-700"
                            >
                              Toggle
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveStaffNode(st.id, st.name)}
                              className="p-1.5 text-zinc-650 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* E9. CYBER SHIELD OPERATIONS AND FIREWALL TRACKS (OWNER ONLY) */}
              {activeTab === 'security' && (
                <div className="space-y-8 animate-fade-in text-xs font-mono text-left">
                  
                  <div className="flex justify-between items-center border-b border-violet-955/35 pb-4">
                    <div>
                      <h3 className="text-lg font-serif text-white font-bold uppercase tracking-wide">Cyber Ops Shield & Firewalls</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Track real-time DDoS rate limiting blocks, SQL filters statistics, and device cookies tokens</p>
                    </div>
                  </div>

                  {/* Anti Hack Stats panel */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-zinc-400">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/20 to-[#120D25] border border-violet-955 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full" />
                      <span className="text-[8.5px] text-[#A78BFA] font-bold uppercase">DDoS Attack Shields</span>
                      <strong className="block text-3xl font-serif font-black text-rose-400 mt-1.5">{ddosBlocks} Queries Blocked</strong>
                      <span className="block text-[9.5px] text-zinc-500 tracking-wide mt-1">Simulated rate limiter active</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/25 to-[#120D25] border border-violet-955 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-550/5 rounded-full" />
                      <span className="text-[8.5px] text-fuchsia-400 font-bold uppercase">SQL Injection Protection</span>
                      <strong className="block text-3xl font-serif font-black text-emerald-400 mt-1.5">{sqlFiltersCount} Filters Active</strong>
                      <span className="block text-[9.5px] text-zinc-550 mt-1">Input sanitisers quarantine nominal</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#090615] border border-violet-955 text-left flex flex-col justify-between relative overflow-hidden">
                      <span className="text-[8.5px] text-[#FBBF24] font-bold uppercase block">Active security shields</span>
                      <div className="flex items-center gap-1.5 bg-emerald-950/20 border border-emerald-9D0 border-emerald-900 border-dashed p-2 rounded-xl text-emerald-400 text-[10px] mt-2">
                        <Shield className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <strong>WAF Status: STRICT GUARD ACTIVE</strong>
                      </div>

                      <button
                        type="button"
                        onClick={handleTriggerMockWafClean}
                        className="w-full text-center py-2 border border-violet-800 bg-[#160E36] hover:bg-violet-900 text-zinc-350 text-[10px] font-bold rounded mt-3 uppercase tracking-wider cursor-pointer duration-200"
                      >
                        Flush isolation Pools
                      </button>
                    </div>
                  </div>

                  {/* Device cookies tracking log list */}
                  <div className="bg-zinc-950/40 border border-violet-955 rounded-3xl p-6 space-y-4">
                    <span className="text-[10px] uppercase font-bold text-[#FBBF24] block tracking-widest">
                      Active device cookies tokens & biological keys tracking list
                    </span>

                    <div className="space-y-4 max-h-72 overflow-y-auto leading-relaxed divide-y divide-zinc-900/60">
                      {[
                        { ip: '185.124.9.48', device: 'iOS 18 Safari', authority: 'owner', key: 'token_fKks92KaskD1' },
                        { ip: '202.48.109.11', device: 'Windows 11 Chrome', authority: 'admin', key: 'token_hDlw92Sja83K' },
                        { ip: '107.5.32.254', device: 'macOS Sonoma Edge', authority: 'staff', key: 'token_lOqw18Xp92P1' }
                      ].map((tk, idx) => (
                        <div key={idx} className="pt-3 flex flex-col sm:flex-row justify-between text-zinc-400 text-[10.5px]">
                          <div>
                            <span className="font-bold text-zinc-200">{tk.ip}</span> • {tk.device}
                          </div>
                          <div className="pt-1.5 sm:pt-0">
                            Session key: <code className="bg-zinc-950 px-2 py-0.5 rounded text-fuchsia-400 select-all">{tk.key}</code> • Authority: <strong className="uppercase text-fuchsia-400">{tk.authority}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
