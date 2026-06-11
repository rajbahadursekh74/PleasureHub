import React from 'react';
import { ShieldCheck, Lock, Gift, HelpCircle, FileText, Landmark, Globe } from 'lucide-react';
import { CategoryId } from '../types';
import { CURRENCIES, CurrencyConfig } from '../utils/currency';

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
    <footer id="app-footer" className="w-full bg-[#06040A] text-[#9CA3AF] border-t border-violet-950/50">
      {/* Intimacy Trust Pillars Strip */}
      <div id="footer-trust-strip" className="border-b border-violet-950/30 bg-[#0A0713]">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-xl hover:bg-violet-950/10 transition-colors">
            <div className="p-3 rounded-full bg-violet-950/40 text-violet-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-zinc-200 font-serif font-semibold text-sm mb-1">Discreet Packaging</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Plain brown cardboard boxes with absolutely no branding, product names, or logos. Your privacy is our highest priority.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-xl hover:bg-violet-950/10 transition-colors">
            <div className="p-3 rounded-full bg-violet-950/40 text-fuchsia-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-zinc-200 font-serif font-semibold text-sm mb-1">Secure & Private Billing</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bank statements will show generic, non-suggestive descriptors: &quot;<span className="font-mono text-zinc-300 font-bold">{discreetBillingName}</span>&quot;.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-xl hover:bg-violet-950/10 transition-colors">
            <div className="p-3 rounded-full bg-violet-950/40 text-rose-400">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-zinc-200 font-serif font-semibold text-sm mb-1">Expert Consultation</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Whisper-quiet smart tech engineered for body-safe exploration. Free secure shipping on order segments of $150 or more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Layout */}
      <div id="footer-directory-grid" className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Block */}
        <div id="col-brand-about" className="col-span-2 md:col-span-1 space-y-4">
          <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            PleasureHub
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            A premium, body-positive sanctuary of luxury adult novelties and wellness formulas. Bridging revolutionary biomedical technology with high-fashion, elegant structural design.
          </p>
          <div className="flex gap-4 pt-1">
            <span className="w-8 h-8 rounded-full bg-zinc-900 border border-violet-950 flex items-center justify-center text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors hover:border-violet-600">
              f
            </span>
            <span className="w-8 h-8 rounded-full bg-zinc-900 border border-violet-950 flex items-center justify-center text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors hover:border-violet-600">
              𝕏
            </span>
            <span className="w-8 h-8 rounded-full bg-zinc-900 border border-violet-950 flex items-center justify-center text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors hover:border-violet-600">
              ig
            </span>
          </div>

          {/* Quick Country/Currency Picker */}
          <div className="pt-2 text-[11px]">
            <label className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 block mb-1 font-mono">
              🌍 Ships Internationally
            </label>
            <div className="relative inline-block text-left w-full max-w-[200px]">
              <select
                value={activeCurrency.code}
                onChange={(e) => {
                  const found = CURRENCIES.find(c => c.code === e.target.value);
                  if (found) setActiveCurrency(found);
                }}
                className="w-full bg-[#0b0816] text-[#D1D5DB] border border-violet-950 hover:bg-violet-955/20 hover:border-violet-600 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer font-mono text-[11px]"
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
            <Gift className="w-3.5 h-3.5 text-violet-400" /> Shop Collections
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleCategoryClick('toys')} className="hover:text-fuchsia-400 transition-colors cursor-pointer text-left">
                Adult Toys
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick('couples')} className="hover:text-fuchsia-400 transition-colors cursor-pointer text-left">
                Couples Intimacy
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick('massagers')} className="hover:text-fuchsia-400 transition-colors cursor-pointer text-left">
                Personal Massagers
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick('lubricants')} className="hover:text-fuchsia-400 transition-colors cursor-pointer text-left">
                Botanicals & Oils
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick('lingerie')} className="hover:text-fuchsia-400 transition-colors cursor-pointer text-left">
                Intimate Apparel
              </button>
            </li>
          </ul>
        </div>

        {/* Assistance Block */}
        <div id="col-footer-assistance" className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100 flex items-center gap-1.5 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-fuchsia-400" /> Assistance
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleSimpleNavigation('dashboard')} className="hover:text-fuchsia-400 transition-colors cursor-pointer">
                Track My Order
              </button>
            </li>
            <li>
              <button className="hover:text-fuchsia-400 transition-colors text-left">
                Discreet Delivery Details
              </button>
            </li>
            <li>
              <button className="hover:text-fuchsia-400 transition-colors text-left">
                Returns & Hygiene Policy
              </button>
            </li>
            <li>
              <button className="hover:text-fuchsia-400 transition-colors text-left">
                Frequently Asked Questions
              </button>
            </li>
            <li>
              <button className="hover:text-fuchsia-400 transition-colors text-left">
                Customer Care Desk
              </button>
            </li>
          </ul>
        </div>

        {/* Policies and Guidelines block */}
        <div id="col-footer-privacy" className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-100 flex items-center gap-1.5 font-mono">
            <FileText className="w-3.5 h-3.5 text-rose-400" /> Compliance & Legal
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button className="hover:text-fuchsia-400 transition-colors text-left">
                Privacy & Cookie Policy
              </button>
            </li>
            <li>
              <button className="hover:text-fuchsia-400 transition-colors text-left">
                User License and Agreement
              </button>
            </li>
            <li>
              <button className="hover:text-fuchsia-400 transition-colors text-left">
                FDA Material Compliance
              </button>
            </li>
            <li>
              <button className="hover:text-fuchsia-400 transition-colors text-left">
                Refunds & Exchanges
              </button>
            </li>
            <li>
              <button onClick={() => handleSimpleNavigation('admin')} className="hover:text-rose-400 font-semibold transition-colors duration-200 uppercase tracking-widest text-[10px] text-zinc-400 flex items-center gap-1">
                <Landmark className="w-3 h-3 text-red-400" /> Staff Login
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Credit card trust logos and terms warning */}
      <div id="final-footer-sub-strip" className="bg-[#030206] py-8 border-t border-violet-950/25 text-[10.5px] leading-relaxed text-zinc-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1.5">
            <p id="footer-licensing-warning">
              © 2026 PleasureHub Boutique. All rights reserved. Must be 18 years of age or older to purchase. Underage users are legally blocked.
            </p>
            <p id="footer-coppa-compliance">
              All transactions are encrypted with full 256-bit SSL protocols. Dynamic tokenized bank billing protects card descriptors.
            </p>
          </div>
          {/* Card gateways */}
          <div id="payments-provider-logos" className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#090611] border border-zinc-900 font-mono tracking-wider text-zinc-400 font-bold uppercase text-[9px]">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded bg-[#090611] border border-zinc-900 font-mono tracking-wider text-zinc-400 font-bold uppercase text-[9px]">
              MC
            </span>
            <span className="px-2.5 py-1 rounded bg-[#090611] border border-zinc-900 font-mono tracking-wider text-zinc-400 font-bold uppercase text-[9px]">
              AMEX
            </span>
            <span className="px-2.5 py-1 rounded bg-[#090611] border border-zinc-900 font-mono tracking-wider text-orange-400 font-bold uppercase text-[9px]">
              BITCOIN
            </span>
            <span className="px-2.5 py-1 rounded bg-[#090611] border border-zinc-900 font-mono tracking-wider text-emerald-400 font-bold uppercase text-[9px]">
              USDT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
