import React from 'react';
import { User as UserIcon, MapPin, Heart, ShieldCheck, ClipboardCheck, ArrowRight, X, Trash2, KeyRound } from 'lucide-react';
import { User, Address, Product, Order } from '../types';
import { ProductIllustration } from './ProductIllustration';
import { CurrencyConfig, formatPriceWithCurrency } from '../utils/currency';

interface UserDashboardViewProps {
  userProfile: User | null;
  onLogin: (email: string, name: string) => void;
  onLogout: () => void;
  onUpdateAddresses: (addresses: Address[]) => void;
  onRemoveWishlistItem: (productId: string) => void;
  products: Product[];
  setSelectedProduct: (product: Product) => void;
  setActiveView: (view: string) => void;
  activeCurrency: CurrencyConfig;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  userProfile,
  onLogin,
  onLogout,
  onUpdateAddresses,
  onRemoveWishlistItem,
  products,
  setSelectedProduct,
  setActiveView,
  activeCurrency,
}) => {
  // Login input states
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginName, setLoginName] = React.useState('');

  // Address editing states
  const [editingAddrIdx, setEditingAddrIdx] = React.useState<number | null>(null);
  const [addrName, setAddrName] = React.useState('');
  const [addrStreet, setAddrStreet] = React.useState('');
  const [addrCity, setAddrCity] = React.useState('');
  const [addrState, setAddrState] = React.useState('');
  const [addrZip, setAddrZip] = React.useState('');

  const [activeTab, setActiveTab] = React.useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  const handleDemoLogin = () => {
    onLogin('rajbahadursekh754@gmail.com', 'Raj Bahadur');
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim() && loginName.trim()) {
      onLogin(loginEmail, loginName);
    }
  };

  const handleAddNewAddress = () => {
    const defaultNew: Address = {
      name: userProfile?.name || 'Robin Jenkins',
      street: '1248 Amethyst Parkway',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'United States'
    };
    const current = userProfile?.addresses || [];
    onUpdateAddresses([...current, defaultNew]);
    setEditingAddrIdx(current.length);
    setAddrName(defaultNew.name);
    setAddrStreet(defaultNew.street);
    setAddrCity(defaultNew.city);
    setAddrState(defaultNew.state);
    setAddrZip(defaultNew.zipCode);
  };

  const handleSaveAddress = (idx: number) => {
    if (!userProfile) return;
    const updated: Address = {
      name: addrName,
      street: addrStreet,
      city: addrCity,
      state: addrState,
      zipCode: addrZip,
      country: 'United States'
    };
    const nextList = [...userProfile.addresses];
    nextList[idx] = updated;
    onUpdateAddresses(nextList);
    setEditingAddrIdx(null);
  };

  const handleDeleteAddress = (idx: number) => {
    if (!userProfile) return;
    const nextList = userProfile.addresses.filter((_, i) => i !== idx);
    onUpdateAddresses(nextList);
    setEditingAddrIdx(null);
  };

  const handleWishlistProductClick = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      setActiveView('product');
    }
  };

  // Get wishlist products
  const wishlistItems = products.filter(p => userProfile?.wishlist.includes(p.id));

  return (
    <div id="user-dashboard-view" className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-zinc-100 bg-[#0B0813]">
      
      {/* 1. GUEST LOGIN CARD WALL IF LOGGED OUT */}
      {!userProfile ? (
        <div id="login-wall-container" className="max-w-md mx-auto bg-[#130E26]/60 border border-violet-950 p-8 md:p-10 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-black text-white tracking-tight">Access Your Sanctuary</h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Log in to view secure order history, manage plain cardboard shipping details, or access your intimate wishlist.
            </p>
          </div>

          <form id="custom-login-form" onSubmit={handleCustomLogin} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 font-bold uppercase">Customer Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Raj Bahadur"
                value={loginName}
                onChange={e => setLoginName(e.target.value)}
                className="w-full bg-[#0E091D] border border-violet-950 py-3 px-4 rounded-xl text-zinc-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 font-bold uppercase">Discreet Email:</label>
              <input
                type="email"
                required
                placeholder="e.g. raj@discreet.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full bg-[#0E091D] border border-violet-950 py-3 px-4 rounded-xl text-zinc-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 hover:opacity-90 text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Sign In Privately
            </button>
          </form>

          <div id="divider-or-demo" className="flex items-center gap-3 text-[10px] uppercase font-mono text-zinc-600 justify-center">
            <div className="h-px bg-zinc-800 flex-1" />
            <span>Or Demo Login</span>
            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          <button
            id="demo-login-preset"
            onClick={handleDemoLogin}
            className="w-full py-3 border border-violet-950 bg-violet-950/20 hover:bg-violet-900/30 text-fuchsia-300 rounded-full font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer duration-300"
          >
            <KeyRound className="w-4 h-4" /> Autologin Raj Bahadur
          </button>
        </div>
      ) : (
        /* 2. DYNAMIC PROFILE OVERVIEW AND TABS GRID */
        <div id="logged-dashboard-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Dashboard Left Rail Menu */}
          <div className="lg:col-span-3 space-y-6">
            <div id="user-avatar-badge" className="p-6 rounded-2xl bg-[#140F27]/30 border border-violet-955/25 text-center space-y-3 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-serif font-black text-2xl shadow-lg shadow-fuchsia-500/10">
                {userProfile.name[0]}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-serif font-bold text-zinc-100">{userProfile.name}</h3>
                <span className="text-[10px] font-mono text-zinc-500 block truncate max-w-[200px]">{userProfile.email}</span>
              </div>
              <button
                onClick={onLogout}
                className="py-1 px-4 rounded-full border border-red-950/60 hover:bg-red-950/20 text-red-400 text-[10px] font-mono uppercase tracking-wider cursor-pointer duration-300"
              >
                Log Out
              </button>
            </div>

            {/* Navigational Tabs List */}
            <div id="dashboard-tab-rail" className="flex flex-col gap-1 text-xs font-mono">
              {[
                { id: 'orders', label: 'Order History', icon: ClipboardCheck },
                { id: 'wishlist', label: 'Personal Wishlist', icon: Heart },
                { id: 'addresses', label: 'Discreet Addresses', icon: MapPin },
                { id: 'profile', label: 'Client Profile', icon: UserIcon }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left py-3 px-4 rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#18112C] border border-violet-950 text-fuchsia-400 font-bold'
                        : 'text-zinc-400 hover:bg-[#120D23]/50 hover:text-white border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dashboard Right Main Screen */}
          <div className="lg:col-span-9 bg-[#120F24]/20 border border-violet-955/20 rounded-3xl p-6 md:p-8">
            
            {/* TAB 1: ORDER TRACKER HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div id="dashboard-section-header" className="flex justify-between items-center border-b border-violet-950/20 pb-4 mb-4">
                  <h3 className="text-lg font-serif font-bold text-white">Confidential Invoice History</h3>
                  <span className="text-[10px] text-zinc-500 font-mono">Active tracking records</span>
                </div>

                {userProfile.orders.length === 0 ? (
                  <div id="no-orders-dashboard" className="text-center py-16 space-y-4">
                    <span className="text-3xl block opacity-60">📦</span>
                    <h4 className="text-sm font-serif font-semibold text-zinc-300">No active shipments in transit</h4>
                    <p className="text-xs text-zinc-550 max-w-xs mx-auto">
                      Explore our collections to place your first discreet order. Packaging is entirely unmarked cardboard boxes.
                    </p>
                    <button
                      onClick={() => setActiveView('category')}
                      className="cursor-pointer py-2 px-5 bg-violet-900 hover:bg-violet-850 rounded-full font-mono text-xs uppercase text-white font-bold transition-all"
                    >
                      Shop Catalogs
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userProfile.orders.map((or) => (
                      <div
                        key={or.id}
                        id={`order-invoice-${or.id}`}
                        className="p-5 bg-[#140F27]/30 border border-violet-955 rounded-2xl space-y-4"
                      >
                        {/* Upper row details */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono gap-2 border-b border-violet-950/10 pb-3">
                          <div>
                            <span className="text-[10px] text-zinc-500">INVOICE ORDER:</span>
                            <span className="font-bold text-zinc-200 block">{or.id}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-500">PLACED ON:</span>
                            <span className="text-zinc-200 block">{or.date}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-500">TOTAL CLEARED:</span>
                            <span className="text-fuchsia-400 font-bold block">{formatPriceWithCurrency(or.total, activeCurrency)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-500">BILLING VALUE:</span>
                            <span className="text-slate-400 italic font-serif block">PH-Intimate-Svc</span>
                          </div>
                        </div>

                        {/* Order physical products row */}
                        <div className="space-y-2">
                          {or.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center text-xs">
                              <div className="w-8 h-8 bg-black rounded border border-zinc-900 flex items-center justify-center p-0.5">
                                <ProductIllustration productId={item.productId} />
                              </div>
                              <span className="text-zinc-300 truncate max-w-md">{item.name} <strong className="text-zinc-500">×{item.quantity}</strong></span>
                              <span className="font-mono text-zinc-400 block ml-auto">{formatPriceWithCurrency(item.price * item.quantity, activeCurrency)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Interactive Transit Nodes Tracker Exactly Echoing User Specifications */}
                        <div className="pt-4 border-t border-violet-950/10">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 font-mono block mb-3 pl-1">Transit Tracker</span>
                          <div className="grid grid-cols-4 gap-2 text-center text-[9.5px] font-mono leading-tight max-w-xl mx-auto relative py-2">
                            {/* Tracker Lines */}
                            <div className="absolute top-5 left-1/8 right-1/8 h-1 bg-zinc-800 pointer-events-none z-0" />
                            <div className="absolute top-5 left-1/8 w-2/3 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 pointer-events-none z-0" />

                            {[
                              { label: 'Compiled', active: true },
                              { label: 'Merchant Clear', active: true },
                              { label: 'Dispatched', active: or.status !== 'Pending' },
                              { label: 'Courier Route', active: or.status === 'Completed' || or.status === 'Shipped' }
                            ].map((node, nIdx) => (
                              <div key={nIdx} className="space-y-1.5 flex flex-col items-center z-10">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center border font-bold text-[10px] ${
                                  node.active
                                    ? 'bg-gradient-to-tr from-violet-600 to-fuchsia-500 border-violet-500 text-white shadow-md'
                                    : 'bg-zinc-950 border-zinc-800 text-zinc-650'
                                }`}>
                                  {nIdx+1}
                                </span>
                                <span className={node.active ? 'text-zinc-200 font-bold' : 'text-zinc-500'}>
                                  {node.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-violet-950/20 pb-4 mb-4">
                  <h3 className="text-lg font-serif font-bold text-white font-serif">Personal Wishlist</h3>
                  <span className="text-xs text-zinc-500 font-mono">({wishlistItems.length}) bookmarked novelties</span>
                </div>

                {wishlistItems.length === 0 ? (
                  <p className="text-zinc-505 italic text-sm text-center py-12">Your wishlist is currently blank. Explore product specifications to bookmark items.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(item => (
                      <div
                        key={item.id}
                        className="bg-[#140F24]/30 border border-violet-955 rounded-2xl p-4 flex flex-col justify-between hover:border-violet-600 transition-all text-center relative group"
                      >
                        {/* Remove trash */}
                        <button
                          onClick={() => onRemoveWishlistItem(item.id)}
                          className="absolute top-4 right-4 p-1.5 rounded bg-zinc-950/60 border border-zinc-900 text-zinc-500 hover:text-red-400 cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center bg-black/40 rounded-lg">
                          <ProductIllustration productId={item.id} />
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-xs font-serif font-bold text-zinc-200 capitalize truncate">{item.name}</h4>
                          <span className="text-xs font-mono font-bold text-zinc-400 block">{formatPriceWithCurrency(item.price, activeCurrency)}</span>
                        </div>

                        <button
                          onClick={() => handleWishlistProductClick(item.id)}
                          className="w-full mt-4 cursor-pointer py-1.5 rounded-lg border border-violet-850 hover:bg-violet-950/30 text-violet-300 font-mono text-[10px] uppercase font-bold tracking-widest transition-colors duration-300"
                        >
                          View Intimacy details
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SAVED ANONYMOUS ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-violet-950/20 pb-4 mb-4">
                  <h3 className="text-lg font-serif font-black text-white font-serif">Shipping Registry</h3>
                  <button
                    onClick={handleAddNewAddress}
                    className="py-1 px-3.5 bg-violet-900 hover:bg-violet-800 text-white rounded font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-colors"
                  >
                    + Add New Destination
                  </button>
                </div>

                <div className="space-y-4">
                  {userProfile.addresses.map((addr, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-zinc-950/40 border border-violet-955 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-6"
                    >
                      {editingAddrIdx === idx ? (
                        <div id="address-editing-grid" className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="col-span-2 space-y-1.5">
                            <label className="text-[9.5px] uppercase font-bold text-zinc-500">Recipient Name / Alias:</label>
                            <input
                              type="text"
                              required
                              value={addrName}
                              onChange={e => setAddrName(e.target.value)}
                              className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded-lg"
                            />
                          </div>
                          
                          <div className="col-span-2 space-y-1.5">
                            <label className="text-[9.5px] uppercase font-bold text-zinc-500">Street & Suite:</label>
                            <input
                              type="text"
                              required
                              value={addrStreet}
                              onChange={e => setAddrStreet(e.target.value)}
                              className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded-lg"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9.5px] uppercase font-bold text-zinc-500">City:</label>
                            <input
                              type="text"
                              required
                              value={addrCity}
                              onChange={e => setAddrCity(e.target.value)}
                              className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded-lg"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-center text-xs">
                            <div className="space-y-1.5">
                              <label className="text-[9.5px] uppercase font-bold text-zinc-500">State:</label>
                              <input
                                type="text"
                                maxLength={2}
                                required
                                value={addrState}
                                onChange={e => setAddrState(e.target.value)}
                                className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-2 rounded-lg text-center uppercase"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9.5px] uppercase font-bold text-zinc-500">Zip Code:</label>
                              <input
                                type="text"
                                required
                                value={addrZip}
                                onChange={e => setAddrZip(e.target.value)}
                                className="w-full bg-[#0E091D] border border-violet-950 py-1.5 px-3 rounded-lg text-center"
                              />
                            </div>
                          </div>
                          
                          <div className="col-span-2 pt-2 flex gap-2 justify-end">
                            <button
                              onClick={() => setEditingAddrIdx(null)}
                              className="py-1 px-3 border border-zinc-800 text-zinc-400 rounded hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveAddress(idx)}
                              className="py-1 px-4 bg-emerald-900 border border-emerald-800 text-emerald-300 rounded hover:bg-emerald-850"
                            >
                              Save Address
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <span className="font-serif font-black text-zinc-200 block text-sm">{addr.name}</span>
                            <p className="text-zinc-400 font-sans leading-relaxed">
                              {addr.street} <br />
                              {addr.city}, {addr.state} {addr.zipCode}
                            </p>
                          </div>
                          
                          <div className="flex gap-2.5">
                            <button
                              onClick={() => {
                                setEditingAddrIdx(idx);
                                setAddrName(addr.name);
                                setAddrStreet(addr.street);
                                setAddrCity(addr.city);
                                setAddrState(addr.state);
                                setAddrZip(addr.zipCode);
                              }}
                              className="py-1.5 px-3 text-fuchsia-400 hover:text-fuchsia-300 border border-violet-955 rounded hover:bg-violet-955/20 block cursor-pointer transition-colors"
                            >
                              Revise
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(idx)}
                              className="py-1.5 px-3 text-red-500 hover:text-red-400 border border-zinc-900 rounded hover:bg-zinc-900/60 block cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CLIENT PROFILE METADATA */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-violet-950/20 pb-4 mb-4">
                  <h3 className="text-lg font-serif font-bold text-white font-serif">Client Identity Protocols</h3>
                  <span className="text-xs text-zinc-500 font-mono font-bold">Secure profile</span>
                </div>

                <div className="p-5 bg-violet-950/15 border border-violet-955 rounded-2xl text-xs space-y-4 font-mono leading-relaxed text-zinc-450">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-violet-400">Biological Confidentiality</h4>
                  <p className="text-zinc-400 font-sans">
                    PleasureHub maintains strict non-disclosure covenants over intimate data vectors. None of your browsing habits, specs ratings, or shipping registers are shared or published beyond internal logistics operations.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
                    <div className="bg-black/30 p-4 border border-zinc-900 rounded-xl space-y-1">
                      <span className="text-[10px] text-zinc-500 text-slate-500">DATA POLICY:</span>
                      <strong className="block text-emerald-400 uppercase font-bold text-[10.5px]">Compliant SSL Guard</strong>
                    </div>

                    <div className="bg-black/30 p-4 border border-zinc-900 rounded-xl space-y-1">
                      <span className="text-[10px] text-zinc-500 text-slate-500">DELIVERY WRAP:</span>
                      <strong className="block text-fuchsia-400 uppercase font-bold text-[10.5px]">discreet plain cardboard</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
