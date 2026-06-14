import React from 'react';
import { ShieldCheck, Lock, Gift, HelpCircle, FileText, Landmark } from 'lucide-react';
import { CategoryId } from '../../types';
import { CURRENCIES, CurrencyConfig } from '../../utils/currency';

interface FooterProps {
  setSelectedCategory: (cat: CategoryId) => void;
  setActiveView: (view: string) => void;
  discreetBillingName: string;
  activeCurrency: CurrencyConfig;
  setActiveCurrency: (curr: CurrencyConfig) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setSelectedCategory,
  setActiveView,
  discreetBillingName,
  activeCurrency,
  setActiveCurrency,
}) => {
  const handleCategoryClick = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimpleNavigation = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="w-full bg-[#050505] text-zinc-300 border-t border-white/10 font-sans">
      {/* Elegance Trust Pillars Strip */}
      <div id="footer-trust-strip" className="border-b border-zinc-900 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="p-3 rounded-full bg-amber-955/40 text-amber-500">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-zinc-200 font-serif font-semibold text-sm mb-1">Premium Gift Wrapping</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hand-wrapped in bespoke matte-black presentation boxes with luxurious silk ribbons. Perfect for gifting.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="p-3 rounded-full bg-amber-955/40 text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-zinc-200 font-serif font-semibold text-sm mb-1">Certified Secure Checkout</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full 256-bit card encryption and secure bank transfers, carrying the standard descriptor: &quot;<span className="font-mono text-zinc-300 font-bold">{discreetBillingName}</span>&quot;.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="p-3 rounded-full bg-amber-955/40 text-amber-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-zinc-200 font-serif font-semibold text-sm mb-1">Authenticity Guaranteed</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                100% genuine designer items, directly from prestigious, ethical global partner ateliers and weavers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Layout */}
      <div id="footer-directory-grid" className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Block */}
        <div id="col-brand-about" className="col-span-2 md:col-span-1 space-y-4">
          <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
            FeshtaWish
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            A premium fashion boutique dedicated to curated elegance for both men and women. We merge high-fashion craftsmanship with modern styles for a confidence-inspiring wardrobe.
          </p>
          <div className="flex gap-4 pt-1">
            <span className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors hover:border-amber-600">
              fb
            </span>
            <span className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors hover:border-amber-600">
              𝕏
            </span>
            <span className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors hover:border-amber-600">
              ig
            </span>
          </div>

          {/* Quick Country/Currency Picker */}
          <div className="pt-2 text-[11px]">
            <label className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 block mb-1 font-mono">
              🌍 Global Priority Shipping
            </label>
            <div className="relative inline-block text-left w-full max-w-[200px]">
              <select
                value={activeCurrency.code}
                onChange={(e) => {
                  const found = CURRENCIES.find(c => c.code === e.target.value);
                  if (found) setActiveCurrency(found);
                }}
                className="w-full bg-[#111] text-[#D1D5DB] border border-zinc-800 hover:bg-amber-955/20 hover:border-amber-605 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer font-mono text-[11px]"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr.code} value={curr.code} className="bg-[#0f0f12] text-zinc-200">
                    {curr.flag} {curr.name} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Experience Shop block */}
        <div id="col-footer-collections" className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100 flex items-center gap-1.5 font-mono">
            <Gift className="w-3.5 h-3.5 text-amber-550" /> Curated Collections
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleCategoryClick('men')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                Men's Wear
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick('women')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                Women's Wear
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick('footwear')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                Designer Footwear
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick('outerwear')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                Luxe Outerwear
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick('accessories')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                Bespoke Accessories
              </button>
            </li>
          </ul>
        </div>

        {/* Assistance Block */}
        <div id="col-footer-assistance" className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100 flex items-center gap-1.5 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> Client Care
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleSimpleNavigation('dashboard')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Track My Order
              </button>
            </li>
            <li>
              <button className="hover:text-amber-400 transition-colors text-left font-sans">
                Shipping & Delivery Guide
              </button>
            </li>
            <li>
              <button className="hover:text-amber-400 transition-colors text-left font-sans">
                Hassle-Free Returns
              </button>
            </li>
            <li>
              <button className="hover:text-amber-400 transition-colors text-left font-sans">
                Style Consultation Care
              </button>
            </li>
            <li>
              <button className="hover:text-amber-400 transition-colors text-left font-sans">
                Frequently Asked Questions
              </button>
            </li>
          </ul>
        </div>

        {/* Policies and Guidelines block */}
        <div id="col-footer-privacy" className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100 flex items-center gap-1.5 font-mono">
            <FileText className="w-3.5 h-3.5 text-amber-500" /> Compliance & Legal
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button className="hover:text-amber-400 transition-colors text-left">
                Terms of Service
              </button>
            </li>
            <li>
              <button className="hover:text-amber-400 transition-colors text-left">
                Privacy Policy
              </button>
            </li>
            <li>
              <button className="hover:text-amber-400 transition-colors text-left">
                Responsible Sourcing
              </button>
            </li>
            <li>
              <button className="hover:text-amber-400 transition-colors text-left">
                Refunds & Exchanges
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Credit card trust logos and terms warning */}
      <div id="final-footer-sub-strip" className="bg-[#030303] py-8 border-t border-zinc-950 text-[10.5px] leading-relaxed text-zinc-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1.5">
            <p id="footer-licensing-warning">
              © 2026 FeshtaWish Boutique. All rights reserved. Delivering premier wardrobe luxury globally.
            </p>
            <p id="footer-coppa-compliance">
              All transactions are encrypted with full 256-bit SSL protocols. Dynamic tokenized billing secures user account logs.
            </p>
          </div>
          {/* Card gateways */}
          <div id="payments-provider-logos" className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#0c0c0f] border border-zinc-900 font-mono tracking-wider text-zinc-400 font-bold uppercase text-[9px]">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded bg-[#0c0c0f] border border-zinc-900 font-mono tracking-wider text-zinc-400 font-bold uppercase text-[9px]">
              MC
            </span>
            <span className="px-2.5 py-1 rounded bg-[#0c0c0f] border border-zinc-900 font-mono tracking-wider text-zinc-400 font-bold uppercase text-[9px]">
              AMEX
            </span>
            <span className="px-2.5 py-1 rounded bg-[#0c0c0f] border border-zinc-900 font-mono tracking-wider text-orange-400 font-bold uppercase text-[9px]">
              BITCOIN
            </span>
            <span className="px-2.5 py-1 rounded bg-[#0c0c0f] border border-zinc-900 font-mono tracking-wider text-emerald-400 font-bold uppercase text-[9px]">
              USDT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
