import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ShieldCheck, HelpCircle } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { MOCK_COUPONS } from '../data';
import { ProductIllustration } from './ProductIllustration';
import { CurrencyConfig, formatPriceWithCurrency } from '../utils/currency';

interface CartViewProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  setAppliedCoupon: (coupon: Coupon | null) => void;
  activeCurrency: CurrencyConfig;
}

export const CartView: React.FC<CartViewProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  setAppliedCoupon,
  activeCurrency,
}) => {
  const [couponCodeInput, setCouponCodeInput] = React.useState('');
  const [couponError, setCouponError] = React.useState('');
  const [shippingMethod, setShippingMethod] = React.useState<'ground' | 'air'>('ground');

  if (!isOpen) return null;

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Calculate coupon rate
  let discount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minPurchase) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = subtotal * (appliedCoupon.value / 100);
      } else {
        discount = appliedCoupon.value;
      }
    } else {
      // Disqualify
      setAppliedCoupon(null);
    }
  }

  // Shipping
  const shipping = subtotal > 150 ? 0 : shippingMethod === 'ground' ? 4.99 : 14.99;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    
    const code = couponCodeInput.trim().toUpperCase();
    const foundCoupon = MOCK_COUPONS.find(c => c.code === code);

    if (!foundCoupon) {
      setCouponError('Invalid coupon identifier.');
      return;
    }

    if (subtotal < foundCoupon.minPurchase) {
      setCouponError(`Requires minimum purchase of ${formatPriceWithCurrency(foundCoupon.minPurchase, activeCurrency)}.`);
      return;
    }

    setAppliedCoupon(foundCoupon);
    setCouponCodeInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Slide-out Drawer Panel */}
      <div id="cart-drawer-sheet" className="relative w-full max-w-md bg-[#0F0A1E] h-full shadow-[0_0_50px_rgba(0,0,0,0.8)] border-l border-violet-950/60 flex flex-col justify-between text-zinc-100 z-10 animate-slide-in-right">
        
        {/* TOP: Header */}
        <div className="p-6 border-b border-violet-950/30 flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-fuchsia-400" />
            Shopping Bag ({cartItems.length})
          </h3>
          <button
            id="btn-close-cart"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MIDDLE: List of Cart Items (Scrollable) */}
        <div id="cart-items-scroller" className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div id="cart-empty-fallout" className="text-center py-24 space-y-4">
              <span className="text-4xl block opacity-60">🛍️</span>
              <h4 className="text-sm font-serif font-bold text-zinc-300">Your bag is currently empty</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Explore our premium design innovations and secure your intimacies safely. Free plain packaging on all shipments.
              </p>
              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-full bg-violet-900/40 text-violet-300 border border-violet-850 hover:bg-violet-800/40 hover:text-white font-mono text-xs uppercase tracking-widest cursor-pointer mt-2"
              >
                Close Drawer
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${idx}`}
                id={`cart-item-${item.product.id}`}
                className="p-3 bg-[#150F28]/40 border border-violet-950/50 rounded-xl flex gap-4 items-center justify-between"
              >
                {/* Media icon */}
                <div className="w-16 h-16 bg-[#090614] rounded-lg border border-violet-950 flex items-center justify-center p-1.5 flex-shrink-0">
                  <ProductIllustration productId={item.product.id} interactive={false} />
                </div>

                {/* Text attributes */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-serif font-semibold text-zinc-100 truncate uppercase tracking-wide">
                    {item.product.name}
                  </h4>
                  {item.selectedColor && (
                    <span className="text-[10px] font-mono text-fuchsia-400 capitalize block max-w-xs truncate">
                      Finish: {item.selectedColor}
                    </span>
                  )}
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    {formatPriceWithCurrency(item.product.price, activeCurrency)} each
                  </span>

                  {/* Quantity and controls */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-zinc-900 cursor-pointer text-zinc-400 hover:text-white scale-90"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold px-2">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-zinc-900 cursor-pointer text-zinc-400 hover:text-white scale-90"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Sub Total and item trash handler */}
                <div className="text-right space-y-2 pl-2">
                  <span className="text-xs font-mono font-black text-zinc-200 block">
                    {formatPriceWithCurrency(item.product.price * item.quantity, activeCurrency)}
                  </span>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 cursor-pointer block ml-auto hover:bg-red-950/20 rounded"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* BOTTOM: Financial pricing ledger, coupon code triggers, checkout */}
        {cartItems.length > 0 && (
          <div id="cart-ledger-desk" className="p-6 bg-[#0B0716] border-t border-violet-950/50 space-y-4">
            
            {/* Coupon Code Entry Form */}
            {appliedCoupon ? (
              <div id="coupon-active-sticker" className="flex items-center justify-between bg-violet-950/30 border border-violet-800/40 rounded-xl px-3.5 py-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#FBBF24]">
                  <Tag className="w-3.5 h-3.5" />
                  <span className="font-mono font-bold">{appliedCoupon.code} Applied</span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-[10px] uppercase font-mono font-bold text-rose-400 hover:text-rose-300 cursor-pointer pl-2"
                >
                  [Remove]
                </button>
              </div>
            ) : (
              <form id="drawer-coupon-form" onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="CONFIDENTIAL COUPON"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 bg-[#150F28] border border-violet-950/80 rounded-xl py-2 px-3 text-xs focus:outline-none placeholder-zinc-600 focus:border-violet-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-violet-900 hover:bg-violet-800 text-zinc-200 text-xs font-mono uppercase font-bold tracking-widest transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <span className="text-[10px] text-rose-400 block pl-1">{couponError}</span>
                )}
                {/* Micro hint on coupons */}
                <span className="text-[9.5px] text-zinc-500 block pl-1">
                  Try <strong className="text-zinc-400 uppercase">PLEASURE20</strong> (20%), <strong className="text-zinc-400 uppercase">DISCREET10</strong> ($10 off), or <strong className="text-zinc-400 uppercase">LUNALUXE</strong>.
                </span>
              </form>
            )}

            {/* Shipping selection switches */}
            <div id="drawer-shipping-selector" className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400 font-serif">Packaging & Delivery Speed:</span>
                <HelpCircle className="w-3.5 h-3.5 text-zinc-500 cursor-help" title="Plain labels on plain cargo boxes." />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono leading-tight">
                <button
                  onClick={() => setShippingMethod('ground')}
                  className={`p-2 rounded-lg border text-left cursor-pointer ${
                    shippingMethod === 'ground' ? 'border-fuchsia-500 bg-fuchsia-950/15' : 'border-zinc-800 bg-[#160E2A]/20'
                  }`}
                >
                  <span className="font-bold text-zinc-200 block uppercase">Confidential Ground</span>
                  <span className="text-zinc-500 block">3-7 business days</span>
                </button>

                <button
                  onClick={() => setShippingMethod('air')}
                  className={`p-2 rounded-lg border text-left cursor-pointer ${
                    shippingMethod === 'air' ? 'border-fuchsia-500 bg-fuchsia-950/15' : 'border-zinc-800 bg-[#160E2A]/20'
                  }`}
                >
                  <span className="font-bold text-zinc-200 block uppercase">Discreet Air Courier</span>
                  <span className="text-zinc-500 block">Next-Day Overnight</span>
                </button>
              </div>
            </div>

            {/* Price lines */}
            <div id="cart-ledger-items" className="space-y-1.5 border-t border-violet-950/20 pt-3 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal:</span>
                <span className="text-zinc-300 font-bold">{formatPriceWithCurrency(subtotal, activeCurrency)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Secret Savings:</span>
                  <span>-{formatPriceWithCurrency(discount, activeCurrency)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-zinc-500">Discreet Shipping:</span>
                <span className="text-zinc-300">
                  {shipping === 0 ? <strong className="text-emerald-400 uppercase">FREE OVER {formatPriceWithCurrency(150, activeCurrency)}</strong> : formatPriceWithCurrency(shipping, activeCurrency)}
                </span>
              </div>

              <div className="flex justify-between text-sm pt-2 border-t border-violet-950/20">
                <span className="text-zinc-100 font-serif font-black">Confidential Total:</span>
                <span className="text-fuchsia-400 font-serif font-black text-base">{formatPriceWithCurrency(total, activeCurrency)}</span>
              </div>
            </div>

            {/* Checkouts call to action */}
            <button
              id="cart-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full cursor-pointer py-4 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 font-mono text-xs uppercase font-black tracking-widest text-white text-center shadow-lg transition-all flex items-center justify-center gap-2 shadow-fuchsia-500/10"
            >
              <ShieldCheck className="w-4 h-4" /> Secure Discreet Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
