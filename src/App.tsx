import React from 'react';
import { AgeVerification } from './components/AgeVerification';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { UserDashboardView } from './components/UserDashboardView';
import { AdminPanel } from './components/AdminPanel';
import { LiveChat } from './components/LiveChat';
import { Footer } from './components/Footer';

import { Product, Order, Coupon, AdminLog, WebSettings, SeoSettings, CartItem, Review, User, CategoryId, Address } from './types';
import { PRODUCTS, MOCK_REVIEWS, MOCK_COUPONS, INITIAL_ADMIN_LOGS } from './data';
import { detectUserCurrency, CurrencyConfig } from './utils/currency';

export default function App() {
  // 1. Age Verification Session state
  const [isVerified, setIsVerified] = React.useState(false);

  // 2. Navigation Routing states
  const [activeView, setActiveView] = React.useState<string>('home'); // home, category, product, checkout, dashboard, admin
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryId>('all');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // 2.5 Currency settings state
  const [activeCurrency, setActiveCurrency] = React.useState<CurrencyConfig>(() => detectUserCurrency());

  // 3. Database Collection states
  const [dbProducts, setDbProducts] = React.useState<Product[]>(PRODUCTS);
  const [dbCoupons, setDbCoupons] = React.useState<Coupon[]>(MOCK_COUPONS);
  const [dbReviews, setDbReviews] = React.useState<Review[]>(MOCK_REVIEWS);
  const [dbOrders, setDbOrders] = React.useState<Order[]>([]);
  const [dbLogs, setDbLogs] = React.useState<AdminLog[]>(INITIAL_ADMIN_LOGS);

  // 4. Cart management states
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = React.useState<Coupon | null>(null);

  // 5. Customer Profile state
  const [userProfile, setUserProfile] = React.useState<User | null>(null);

  // Administrative customized login credentials
  const [adminCredentials, setAdminCredentials] = React.useState({
    owner: 'owner123',
    admin: 'admin123',
    staff: 'staff123'
  });

  // Users database list to support suspension
  const [dbUsers, setDbUsers] = React.useState<User[]>([
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
  ]);

  const triggerStateSync = async () => {
    try {
      const response = await fetch('/api/db-state');
      if (response.ok) {
        const data = await response.json();
        setDbProducts(data.products);
        setDbCoupons(data.coupons);
        setDbReviews(data.reviews);
        setDbOrders(data.orders);
        setDbLogs(data.logs);
        setDbUsers(data.users);
        setWebSettings(data.webSettings);
        setSeoSettings(data.seoSettings);
        setAdminCredentials(data.adminCredentials);
        if (userProfileOpenRef.current) {
          const updatedUser = data.users.find((u: User) => u.email.toLowerCase() === userProfileOpenRef.current?.email.toLowerCase());
          if (updatedUser) {
            if (updatedUser.status === 'Blocked') {
              setUserProfile(null);
              userProfileOpenRef.current = null;
              setActiveView('home');
              localStorage.removeItem('ph_user_email');
              localStorage.removeItem('ph_user_name');
              alert('⚠️ Your customer access has been restricted by administration.');
            } else {
              setUserProfile(updatedUser);
              userProfileOpenRef.current = updatedUser;
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to sync state:', e);
    }
  };

  const userProfileOpenRef = React.useRef<User | null>(userProfile);
  React.useEffect(() => {
    userProfileOpenRef.current = userProfile;
  }, [userProfile]);

  // Load state on mount
  React.useEffect(() => {
    const fetchOnLoad = async () => {
      try {
        const response = await fetch('/api/db-state');
        if (response.ok) {
          const data = await response.json();
          setDbProducts(data.products);
          setDbCoupons(data.coupons);
          setDbReviews(data.reviews);
          setDbOrders(data.orders);
          setDbLogs(data.logs);
          setDbUsers(data.users);
          setWebSettings(data.webSettings);
          setSeoSettings(data.seoSettings);
          setAdminCredentials(data.adminCredentials);

          // Restore session
          const storedEmail = localStorage.getItem('ph_user_email');
          const storedName = localStorage.getItem('ph_user_name');
          if (storedEmail && storedName) {
            const activeUser = data.users.find((u: User) => u.email.toLowerCase() === storedEmail.toLowerCase());
            if (activeUser) {
              if (activeUser.status === 'Blocked') {
                localStorage.removeItem('ph_user_email');
                localStorage.removeItem('ph_user_name');
              } else {
                setUserProfile(activeUser);
                userProfileOpenRef.current = activeUser;
              }
            }
          }
        }
      } catch (e) {
        console.error('Initial state load failed', e);
      }
    };
    fetchOnLoad();
  }, []);

  const handleToggleBlockUser = async (email: string) => {
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(email)}/status`, {
        method: 'PUT'
      });
      if (response.ok) {
        await triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 6. Global Administration Settings states
  const [webSettings, setWebSettings] = React.useState<WebSettings>({
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
    discreetName: 'PH-Intimate-Svc'
  });

  const [seoSettings, setSeoSettings] = React.useState<SeoSettings>({
    metaTitle: 'PleasureHub | Premium Discreet Wellness Store',
    metaDescription: 'Explore designer sexual wellness devices, anatomical contour guides, and certified organic intimate formulations with Plain Cardboard shipping privacy.',
    keywords: 'adult toys, luxury wellness, intimate cosmetics, sexual health, discrete delivery',
    ogImage: 'https://pleasurehub.secure/images/meta-og.png'
  });

  const handleUpdateWebSettings = async (nextSettings: WebSettings) => {
    try {
      const response = await fetch('/api/settings/web', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextSettings)
      });
      if (response.ok) {
        setWebSettings(nextSettings);
        await triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateSeoSettings = async (nextSettings: SeoSettings) => {
    try {
      const response = await fetch('/api/settings/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextSettings)
      });
      if (response.ok) {
        setSeoSettings(nextSettings);
        await triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateAdminCredentials = async (nextCreds: typeof adminCredentials) => {
    try {
      const response = await fetch('/api/settings/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextCreds)
      });
      if (response.ok) {
        setAdminCredentials(nextCreds);
        await triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Check verification on start
  React.useEffect(() => {
    const sessionVerified = localStorage.getItem('ph_verified_18') === 'confirmed';
    if (sessionVerified) {
      setIsVerified(true);
    }
  }, []);

  const handleVerifyAge = () => {
    localStorage.setItem('ph_verified_18', 'confirmed');
    setIsVerified(true);
  };

  // Add search query submit link
  const handleTriggerSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
    setActiveView('category');
  };

  // Web statistics logs trigger helper
  const handleAddAdminLog = async (action: string, details: string) => {
    const newLog: AdminLog = {
      id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
      action,
      adminName: 'Admin User',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '107.15.228.18',
      details
    };
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog)
      });
      await triggerStateSync();
    } catch (e) {
      console.error(e);
    }
  };

  // CART WORKFLOW COMPILERS
  const handleAddToCart = (product: Product, quantity: number, color?: string) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.selectedColor === color);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity = Math.min(product.stock, next[existingIdx].quantity + quantity);
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: color || 'Royal Amethyst' }];
      }
    });
    setCartOpen(true);
    handleAddAdminLog('Basket expanded', `Add item ${product.name} (Qty: ${quantity}, Finish: ${color || 'Standard'})`);
  };

  const handleUpdateCartQty = (productId: string, qty: number) => {
    if (qty < 1) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const handleBuyNow = (product: Product, quantity: number, color?: string) => {
    // Clear and override cart instantly with this single selection
    setCartItems([{ product, quantity, selectedColor: color || 'Royal Amethyst' }]);
    setCartOpen(false);
    setActiveView('checkout');
  };

  // USER PROFILE INTERACTIONS
  const handleUserLogin = async (email: string, name: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
        userProfileOpenRef.current = data.user;
        localStorage.setItem('ph_user_email', email);
        localStorage.setItem('ph_user_name', name);
        setActiveView('dashboard');
        await triggerStateSync();
      } else {
        const err = await response.json();
        alert(`⚠️ ${err.error || 'Login Failed.'}`);
      }
    } catch (e) {
      console.error(e);
      alert('⚠️ Database login server node offline. Try again.');
    }
  };

  const handleUserLogout = () => {
    setUserProfile(null);
    userProfileOpenRef.current = null;
    localStorage.removeItem('ph_user_email');
    localStorage.removeItem('ph_user_name');
    setActiveView('home');
  };

  const handleUpdateAddresses = async (nextAddresses: Address[]) => {
    if (!userProfile) return;
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(userProfile.email)}/addresses`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresses: nextAddresses })
      });
      if (response.ok) {
        setUserProfile({ ...userProfile, addresses: nextAddresses });
        userProfileOpenRef.current = { ...userProfile, addresses: nextAddresses };
        triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveWishlistItem = async (productId: string) => {
    if (!userProfile) return;
    const next = (userProfile.wishlist || []).filter(id => id !== productId);
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(userProfile.email)}/wishlist`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishlist: next })
      });
      if (response.ok) {
        setUserProfile({ ...userProfile, wishlist: next });
        userProfileOpenRef.current = { ...userProfile, wishlist: next };
        triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleWishlist = async (productOrId: Product | string) => {
    if (!userProfile) {
      setActiveView('dashboard');
      return;
    }
    const productId = typeof productOrId === 'string' ? productOrId : productOrId.id;
    const exists = (userProfile.wishlist || []).includes(productId);
    let next: string[] = [];
    if (exists) {
      next = (userProfile.wishlist || []).filter(id => id !== productId);
    } else {
      next = [...(userProfile.wishlist || []), productId];
    }

    try {
      const response = await fetch(`/api/users/${encodeURIComponent(userProfile.email)}/wishlist`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishlist: next })
      });
      if (response.ok) {
        setUserProfile({ ...userProfile, wishlist: next });
        userProfileOpenRef.current = { ...userProfile, wishlist: next };
        triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddOrderToProfile = async (order: Order) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (response.ok) {
        await triggerStateSync();
      } else {
        const err = await response.json();
        alert(`⚠️ Order placement failed: ${err.error || 'Server error'}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ADMIN OPERATIONS LINKAGE
  const handleAddProduct = async (p: Product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p)
      });
      if (response.ok) {
        await triggerStateSync();
      } else {
        const err = await response.json();
        alert(`⚠️ Failed to add product: ${err.error}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditProduct = async (p: Product) => {
    try {
      const response = await fetch(`/api/products/${encodeURIComponent(p.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p)
      });
      if (response.ok) {
        await triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${encodeURIComponent(productId)}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        await triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddCoupon = async (c: Coupon) => {
    try {
      const response = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(c)
      });
      if (response.ok) {
        await triggerStateSync();
      } else {
        const err = await response.json();
        alert(`⚠️ Failed to add coupon: ${err.error}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCoupon = async (code: string) => {
    try {
      const response = await fetch(`/api/coupons/${encodeURIComponent(code)}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await triggerStateSync();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filter products by active categories and queries
  const visibleProducts = dbProducts.filter(p => {
    const catMatch = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const queryMatch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && queryMatch;
  });

  const handleAddReview = async (draft: { productId: string; userName: string; rating: number; comment: string; verified: boolean }) => {
    try {
      const completeReview: Review = {
        id: `REV-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        ...draft
      };
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeReview)
      });
      if (response.ok) {
        await triggerStateSync();
        // Update selected product reference to fetch updated rating/reviews count
        const newestProductsResponse = await fetch('/api/products');
        if (newestProductsResponse.ok) {
          const updatedProds: Product[] = await newestProductsResponse.json();
          const target = updatedProds.find(p => p.id === draft.productId);
          if (target) {
            setSelectedProduct(target);
          }
        }
      }
    } catch (e) {
      console.error('Failed to post review:', e);
    }
  };


  return (
    <div id="application-scaffold" className="min-h-screen bg-[#06040A] text-zinc-100 selection:bg-fuchsia-600 selection:text-white flex flex-col justify-between">
      
      {/* Age verification screen blocks entrance initially */}
      {!isVerified && <AgeVerification onVerify={handleVerifyAge} />}

      {/* Main header navbar - stays visible for unified layout */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={userProfile?.wishlist?.length || 0}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchQuery}
        setSearchTerm={setSearchQuery}
        onOpenCart={() => setCartOpen(true)}
        userEmail={userProfile?.email || null}
        onLogout={handleUserLogout}
        language={webSettings.language}
        setLanguage={(lang) => setWebSettings(prev => ({ ...prev, language: lang }))}
        discreetBillingName={webSettings.discreetName}
        activeCurrency={activeCurrency}
        setActiveCurrency={setActiveCurrency}
      />

      {/* VIEWPORT SWITCH CONTAINER */}
      <main className="flex-grow pt-16 animate-fade-in">
        
        {(!webSettings.enabled || webSettings.maintenanceMode) && activeView !== 'admin' ? (
          <div className="min-h-[70vh] bg-[#06040A] text-zinc-100 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#18112C] border border-violet-550/30 rounded-3xl flex items-center justify-center text-fuchsia-400 text-3xl animate-pulse">
              ⚙️
            </div>
            <h2 className="text-2xl md:text-3.5xl font-serif font-black uppercase text-white tracking-tight">
              {!webSettings.enabled ? 'Platform Under System Hold' : 'Platform Under Maintenance'}
            </h2>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-mono">
              {!webSettings.enabled
                ? 'Storefront operations have been frozen temporarily by the Platform Owner. Please verify system updates or clear cache.'
                : 'Our logistics node is currently undergoing maintenance for database optimization. Secure clearances are preserved.'}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setActiveView('admin');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 rounded-full font-mono text-[10.5px] uppercase font-bold text-white tracking-widest cursor-pointer duration-200"
              >
                🔓 Staff Login Unlock Gate
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeView === 'home' && (
              <HomeView
                products={dbProducts}
                setSelectedCategory={(cat) => {
                  setSelectedCategory(cat);
                  setSearchQuery('');
                  window.scrollTo({ top: 0 });
                }}
                setActiveView={setActiveView}
                setSelectedProduct={setSelectedProduct}
                wishlist={userProfile?.wishlist || []}
                toggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                activeCurrency={activeCurrency}
              />
            )}

            {activeView === 'category' && (
              <CategoryView
                products={visibleProducts}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSelectedProduct={(p) => {
                  setSelectedProduct(p);
                  setActiveView('product');
                  window.scrollTo({ top: 0 });
                }}
                setActiveView={setActiveView}
                wishlist={userProfile?.wishlist || []}
                toggleWishlist={handleToggleWishlist}
                searchTerm={searchQuery}
                activeCurrency={activeCurrency}
              />
            )}

        {activeView === 'product' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            allReviews={dbReviews}
            onAddReview={handleAddReview}
            relatedProducts={dbProducts.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
            setSelectedProduct={setSelectedProduct}
            setActiveView={setActiveView}
            activeCurrency={activeCurrency}
          />
        )}

        {activeView === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            appliedCoupon={appliedCoupon}
            onClearCart={handleClearCart}
            userEmail={userProfile?.email || null}
            onAddOrderToProfile={handleAddOrderToProfile}
            setActiveView={setActiveView}
            discreetBillingName={webSettings.discreetName}
            upiId={webSettings.upiId}
            upiName={webSettings.upiName}
            upiQrCodeUrl={webSettings.upiQrCodeUrl}
            activeCurrency={activeCurrency}
          />
        )}

        {activeView === 'dashboard' && (
          <UserDashboardView
            userProfile={userProfile}
            onLogin={handleUserLogin}
            onLogout={handleUserLogout}
            onUpdateAddresses={handleUpdateAddresses}
            onRemoveWishlistItem={handleRemoveWishlistItem}
            products={dbProducts}
            setSelectedProduct={setSelectedProduct}
            setActiveView={setActiveView}
            activeCurrency={activeCurrency}
          />
        )}

        {activeView === 'admin' && (
          <AdminPanel
            products={dbProducts}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            orders={dbOrders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            coupons={dbCoupons}
            onAddCoupon={handleAddCoupon}
            onDeleteCoupon={handleDeleteCoupon}
            adminLogs={dbLogs}
            onAddAdminLog={handleAddAdminLog}
            webSettings={webSettings}
            onUpdateWebSettings={handleUpdateWebSettings}
            seoSettings={seoSettings}
            onUpdateSeoSettings={handleUpdateSeoSettings}
            usersList={dbUsers}
            onToggleBlockUser={handleToggleBlockUser}
            adminCredentials={adminCredentials}
            onUpdateAdminCredentials={handleUpdateAdminCredentials}
          />
        )}

          </>
        )}

      </main>

      {/* SLIDE-OUT DRAWER OVERLAY ELEMENTS */}
      <CartView
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setActiveView('checkout');
        }}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
        activeCurrency={activeCurrency}
      />

      {/* FLOAT CONCIERGE HELP SYSTEM */}
      <LiveChat />

      {/* SHARED LOGISTICS PRIVACY FOOTERS */}
      <Footer setActiveView={setActiveView} activeCurrency={activeCurrency} setActiveCurrency={setActiveCurrency} />

    </div>
  );
}
