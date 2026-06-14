import React from 'react';
import { Search, Heart, ShoppingBag, User, ShieldCheck, Lock, ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';
import { CategoryId } from '../../types';
import { CURRENCIES, CurrencyConfig } from '../../utils/currency';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  setSelectedCategory: (category: CategoryId) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenCart: () => void;
  userEmail: string | null;
  onLogout: () => void;
  language: string;
  setLanguage: (lang: 'EN' | 'ES' | 'FR' | 'DE') => void;
  discreetBillingName: string;
  activeCurrency: CurrencyConfig;
  setActiveCurrency: (curr: CurrencyConfig) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  cartCount,
  wishlistCount,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  onOpenCart,
  userEmail,
  onLogout,
  language,
  setLanguage,
  discreetBillingName,
  activeCurrency,
  setActiveCurrency,
  theme,
  onThemeToggle,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [langDropdown, setLangDropdown] = React.useState(false);
  const [currencyDropdown, setCurrencyDropdown] = React.useState(false);

  // Hidden 5-tap admin activation state
  const [logoClicks, setLogoClicks] = React.useState(0);
  const [lastLogoClick, setLastLogoClick] = React.useState(0);
  const [cartBagClicks, setCartBagClicks] = React.useState(0);
  const [lastCartBagClick, setLastCartBagClick] = React.useState(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (activeView !== 'category') {
      setActiveView('category');
    }
  };

  const navigateToCategory = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setActiveView('category');
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    const now = Date.now();
    const isQuick = now - lastLogoClick < 3000;
    const nextCount = isQuick ? logoClicks + 1 : 1;
    setLogoClicks(nextCount);
    setLastLogoClick(now);

    if (nextCount >= 5) {
      setLogoClicks(0);
      setActiveView('admin');
      setMenuOpen(false);
    } else {
      setSearchTerm('');
      setActiveView('home');
      setMenuOpen(false);
    }
  };

  const handleCartBagClick = () => {
    const now = Date.now();
    const isQuick = now - lastCartBagClick < 3000;
    const nextCount = isQuick ? cartBagClicks + 1 : 1;
    setCartBagClicks(nextCount);
    setLastCartBagClick(now);

    if (nextCount >= 5) {
      setCartBagClicks(0);
      setActiveView('admin');
      setMenuOpen(false);
    } else {
      onOpenCart();
    }
  };

  return (
    <header id="app-wide-header" className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-white/10 text-zinc-100">
      {/* Premium Statement Ticker Bar */}
      <div id="top-discreet-alert" className="w-full bg-[#0a0a0c] text-[10px] md:text-xs py-1.5 px-4 flex justify-between items-center text-gray-450 font-sans border-b border-white/5">
        <span id="discreet-shipping-notice" className="flex items-center gap-1.5 text-gray-450 text-[11px]">
          <ShieldCheck id="ico-header-alert" className="w-3.5 h-3.5 text-amber-500" />
          Premium gift packaging, expedited courier delivery
        </span>
        <span id="discreet-billing-notice" className="hidden sm:flex items-center gap-1 text-gray-400 text-[11px]">
          <Lock id="ico-header-lock" className="w-3 h-3 text-amber-500" />
          Secure billing label: <strong className="text-zinc-250 font-mono text-[11px] ml-1">{discreetBillingName}</strong>
        </span>
        <div className="flex items-center gap-3.5">
          {/* Dynamic Currency / Country Selector */}
          <div id="currency-switcher" className="relative">
            <button
              id="currency-selector-btn"
              onClick={() => {
                setCurrencyDropdown(!currencyDropdown);
                setLangDropdown(false);
              }}
              className="flex items-center gap-1.5 text-[10.5px] font-bold cursor-pointer hover:text-amber-400 text-gray-400 transition-colors uppercase font-mono"
            >
              <span className="text-xs shrink-0">{activeCurrency.flag}</span>
              <span className="tracking-wide">{activeCurrency.code} ({activeCurrency.symbol})</span>
              <ChevronDown className="w-3 h-3 text-zinc-555" />
            </button>
            {currencyDropdown && (
              <div id="currency-dropdown-box" className="absolute right-0 mt-1.5 bg-[#0f0f12] border border-white/10 rounded-xl shadow-2xl py-2 z-50 text-[10px] font-mono w-44">
                <span className="px-3 py-1 text-[8px] uppercase text-zinc-500 block font-sans font-extrabold tracking-wider">Select Currency</span>
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setActiveCurrency(curr);
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-white/5 hover:text-amber-500 cursor-pointer ${activeCurrency.code === curr.code ? 'text-amber-400 font-bold bg-white/5' : 'text-zinc-300'}`}
                  >
                    <span className="text-sm shrink-0">{curr.flag}</span>
                    <span className="flex-grow">{curr.name}</span>
                    <span className="text-zinc-500 font-normal">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-[1px] h-3.5 bg-white/10 shrink-0" />

          {/* Language Switcher */}
          <div id="language-switcher" className="relative">
            <button
              id="lang-selector-btn"
              onClick={() => {
                setLangDropdown(!langDropdown);
                setCurrencyDropdown(false);
              }}
              className="flex items-center gap-1 text-[10px] uppercase font-semibold cursor-pointer hover:text-amber-400 text-gray-400"
            >
              {language} <ChevronDown className="w-3 h-3" />
            </button>
            {langDropdown && (
              <div id="lang-dropdown-box" className="absolute right-0 mt-1 bg-[#0f0f12] border border-white/10 rounded-lg shadow-2xl py-1 z-50 text-[10.5px] uppercase font-mono w-16">
                {(['EN', 'ES', 'FR', 'DE'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangDropdown(false);
                    }}
                    className="w-full text-left px-2 py-1 hover:bg-white/5 hover:text-amber-500 cursor-pointer"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand Core Container */}
      <div id="header-main-nav" className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Burger Button for Mobile view */}
        <button
          id="mobile-navigation-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-450 hover:text-white focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Typo Logo */}
        <div
          id="brand-logo-container"
          onClick={handleLogoClick}
          className="cursor-pointer select-none py-1 flex items-center gap-2"
        >
          <div className="relative w-9 h-10 flex items-center justify-center flex-shrink-0">
            {/* Bag handle */}
            <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-4.5 h-5 border-2 border-amber-400 rounded-t-full" />
            {/* Bag body */}
            <div className="absolute bottom-[2px] w-8 h-7.5 bg-gradient-to-b from-amber-500 to-yellow-600 rounded-lg shadow-lg flex items-center justify-center text-white font-black text-sm pt-[2px]">
              F
            </div>
          </div>
          <span id="brand-emblem-logo" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
            Feshta<span className="text-amber-500">Wish</span>
          </span>
        </div>

        {/* Desktop Anchor Navigation Linkage */}
        <nav id="desktop-routing-links" className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-gray-400">
          <button
            onClick={handleLogoClick}
            className={`cursor-pointer hover:text-amber-400 transition-colors duration-200 ${activeView === 'home' ? 'text-amber-500 font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => navigateToCategory('all')}
            className={`cursor-pointer hover:text-amber-400 transition-colors duration-200 ${activeView === 'category' ? 'text-amber-500 font-bold' : ''}`}
          >
            Collections
          </button>
          <button
            onClick={() => navigateToCategory('men')}
            className="cursor-pointer hover:text-amber-400 transition-colors duration-200"
          >
            Men
          </button>
          <button
            onClick={() => navigateToCategory('women')}
            className="cursor-pointer hover:text-amber-400 transition-colors duration-200"
          >
            Women
          </button>
        </nav>

        {/* Real-time Filtered Search widget */}
        <div id="search-input-wrapper" className="hidden sm:relative sm:flex items-center flex-1 max-w-xs md:max-w-sm">
          <Search id="ico-header-search" className="absolute left-3.5 w-4 h-4 text-gray-500" />
          <input
            id="input-header-search"
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#111] text-xs py-2 px-10 rounded-xl border border-white/10 focus:border-amber-500 focus:outline-none placeholder-gray-500 focus:bg-[#151515] text-zinc-100 transition-all duration-300"
          />
        </div>

        {/* User Interaction Icons Tray */}
        <div id="user-actions-tray" className="flex items-center gap-3.5 md:gap-5 text-gray-400">
          {/* User Account / Login trigger */}
          <button
            id="btn-nav-to-dashboard"
            onClick={() => setActiveView('dashboard')}
            className={`hover:text-amber-400 cursor-pointer relative p-1.5 rounded-full hover:bg-white/5 transition-all duration-300 ${activeView === 'dashboard' ? 'text-amber-400' : ''}`}
            title="User Dashboard"
          >
            <User className="w-5 h-5" />
            {userEmail && (
              <span id="active-user-dot" className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-lg" />
            )}
          </button>

          {/* Wishlist Link with dynamic badge */}
          <button
            id="btn-nav-to-wishlist"
            onClick={() => {
              setActiveView('dashboard');
            }}
            className="hover:text-amber-400 cursor-pointer relative p-1.5 rounded-full hover:bg-white/5 transition-all duration-300"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span id="wishlist-badge" className="absolute top-0 right-0 bg-amber-600 text-white font-sans text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>
          {/* Day / Night Theme Mood Toggle */}
          <button
            id="btn-toggle-theme"
            onClick={onThemeToggle}
            className="hover:text-amber-500 cursor-pointer p-1.5 rounded-full hover:bg-white/5 transition-all duration-300 relative text-gray-400"
            title={theme === 'dark' ? 'Switch to Day Mood' : 'Switch to Night Mood'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-800 fill-zinc-800" />
            )}
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button
            id="btn-trigger-cart"
            onClick={handleCartBagClick}
            className="hover:text-amber-400 cursor-pointer relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10 transition-all duration-300"
            title="Open Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span id="cart-item-badge" className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white font-sans text-[9.5px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-[0_2px_8px_rgba(245,158,11,0.5)]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Embedded Mobile Slide-down Navigation drawer */}
      {menuOpen && (
        <div id="mobile-routing-drawer" className="md:hidden bg-[#0f0f12] border-t border-white/10 px-4 py-6 space-y-4 flex flex-col justify-start pb-8">
          {/* Mobile search bar */}
          <div id="mobile-search-wrapper" className="relative flex items-center mb-4">
            <Search className="absolute left-3 w-4 h-4 text-zinc-500" />
            <input
              id="input-mobile-search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#111] text-xs py-2.5 px-10 rounded-xl border border-white/10 focus:outline-none placeholder-zinc-500"
            />
          </div>

          <button
            onClick={handleLogoClick}
            className="text-left font-sans text-lg py-1.5 border-b border-white/5 hover:text-amber-400 text-zinc-100"
          >
            Home
          </button>
          <button
            onClick={() => navigateToCategory('all')}
            className="text-left font-sans text-lg py-1.5 border-b border-white/5 hover:text-amber-400 text-zinc-100"
          >
            Collections
          </button>
          <button
            onClick={() => navigateToCategory('men')}
            className="text-left font-sans text-lg py-1.5 border-b border-white/5 hover:text-amber-400 text-zinc-100"
          >
            Men's Wear
          </button>
          <button
            onClick={() => navigateToCategory('women')}
            className="text-left font-sans text-lg py-1.5 border-b border-white/5 hover:text-amber-400 text-zinc-100"
          >
            Women's Wear
          </button>
          <button
            onClick={() => navigateToCategory('ethnic')}
            className="text-left font-sans text-lg py-1.5 border-b border-white/5 hover:text-amber-400 text-zinc-100"
          >
            Ethnic Wear
          </button>

          {/* Day / Night Theme Mood Toggle for Mobile */}
          <div className="border-t border-white/5 pt-4 flex items-center justify-between">
            <span className="text-sm font-sans font-semibold text-zinc-350">
              {theme === 'dark' ? 'Night Mood (Dark)' : 'Day Mood (Light)'}
            </span>
            <button
              id="btn-toggle-theme-mobile"
              onClick={onThemeToggle}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10 transition-all font-mono text-xs uppercase font-bold tracking-wider cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" /> Day Mood
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-zinc-700" /> Night Mood
                </>
              )}
            </button>
          </div>

          {/* User management options */}
          <div id="mobile-drawer-footer" className="pt-6 flex flex-col gap-3">
            {userEmail ? (
              <div className="flex justify-between items-center bg-[#1a1a1e] rounded-xl p-3 border border-white/10">
                <span className="text-[11px] truncate text-zinc-400 font-mono">{userEmail}</span>
                <button onClick={onLogout} className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setActiveView('dashboard');
                  setMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Sign In / Join Store
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
