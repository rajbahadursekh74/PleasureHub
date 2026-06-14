import React from 'react';
import { ShieldCheck, Lock, CreditCard, Landmark, CheckCircle2, ShoppingBag, ArrowLeft, Loader2, QrCode, Upload } from 'lucide-react';
import { CartItem, Coupon, Address, Order } from '../../types';
import { ProductIllustration } from '../common/ProductIllustration';
import { CurrencyConfig, formatPriceWithCurrency } from '../../utils/currency';

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onClearCart: () => void;
  userEmail: string | null;
  onAddOrderToProfile: (order: Order) => void;
  setActiveView: (view: string) => void;
  discreetBillingName: string;
  upiId?: string;
  upiName?: string;
  upiQrCodeUrl?: string;
  activeCurrency: CurrencyConfig;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  appliedCoupon,
  onClearCart,
  userEmail,
  onAddOrderToProfile,
  setActiveView,
  discreetBillingName,
  upiId: propUpiId,
  upiName: propUpiName,
  upiQrCodeUrl: propUpiQrCodeUrl,
  activeCurrency,
}) => {
  const [step, setStep] = React.useState<'forms' | 'loading' | 'receipt'>('forms');
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'crypto' | 'upi'>('card');
  const [upiId, setUpiId] = React.useState('');
  const [upiRef, setUpiRef] = React.useState('');
  const [upiScreenshot, setUpiScreenshot] = React.useState<string | null>(null);
  
  // Form input states
  const [name, setName] = React.useState('');
  const [emailBox, setEmailBox] = React.useState(userEmail || '');
  const [phoneBox, setPhoneBox] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [stateAbbr, setStateAbbr] = React.useState('');
  const [zip, setZip] = React.useState('');

  // Card information states
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCvv, setCardCvv] = React.useState('');

  const [shippingSpeed, setShippingSpeed] = React.useState<'ground' | 'air'>('ground');

  // Completed Order Details hook
  const [placedOrder, setPlacedOrder] = React.useState<Order | null>(null);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minPurchase) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = subtotal * (appliedCoupon.value / 100);
    } else {
      discount = appliedCoupon.value;
    }
  }

  const shipping = subtotal > 150 ? 0 : shippingSpeed === 'ground' ? 4.99 : 14.99;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !emailBox || !street || !city || !stateAbbr || !zip) return;

    setStep('loading');

    // Simulate 2 seconds backend delay for SSL confirmation and bank gateway communication
    setTimeout(() => {
      const shippingAddress: Address = {
        name,
        street,
        city,
        state: stateAbbr,
        zipCode: zip,
        country: 'United States'
      };

      const newOrder: Order = {
        id: `PH-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString().split('T')[0],
        items: cartItems.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0]
        })),
        shippingAddress,
        paymentMethod: paymentMethod === 'card' 
          ? 'Visa / credit card' 
          : paymentMethod === 'crypto'
            ? 'USDT TRC20 Decentralized'
            : `UPI Transfer - Ref: ${upiRef || 'Pending Proof'} (VPA: ${upiId || 'not-disclosed'})`,
        status: 'Processing',
        subtotal,
        shipping,
        discount,
        total,
        trackingNumber: `TRACK-${Math.floor(1000000 + Math.random() * 9000000)}`
      };

      setPlacedOrder(newOrder);
      onAddOrderToProfile(newOrder);
      onClearCart();
      setStep('receipt');
    }, 2400);
  };

  return (
    <div id="checkout-view" className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-zinc-100 bg-[#0B0813]">
      
      {/* Step 1: Forms & Review */}
      {step === 'forms' && (
        <div id="checkout-split-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form side */}
          <form id="checkout-shipping-form" onSubmit={handleSubmitCheckout} className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveView('category')}
                className="flex items-center gap-1 text-[10px] font-mono tracking-widest text-zinc-500 hover:text-white uppercase cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to bag
              </button>
              <h2 className="text-2xl md:text-3.5xl font-serif font-black text-white tracking-tight">Secure Checkouts</h2>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Guest registration checkouts are allowed. All communication is secured via 256-bit SSL protocols. Packaging is clean brown cardboard.
              </p>
            </div>

            {/* Address fields */}
            <div className="space-y-4">
              <h3 className="text-sm font-serif font-bold text-amber-500 uppercase tracking-widest border-b border-zinc-900 pb-2">
                1. Discreet Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Fictional / Recipient Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robin Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500 text-zinc-200"
                  />
                  <span className="text-[9px] text-zinc-500 block pl-1">You may use an alias or nickname to protect your identity.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Communication Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="robin@discreet.com"
                    value={emailBox}
                    onChange={(e) => setEmailBox(e.target.value)}
                    className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Plain Telephone:</label>
                  <input
                    type="tel"
                    required
                    placeholder="(415) 555-0199"
                    value={phoneBox}
                    onChange={(e) => setPhoneBox(e.target.value)}
                    className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Delivery Street & Suite:</label>
                  <input
                    type="text"
                    required
                    placeholder="1248 Amethyst Parkway, Suite 10b"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">City:</label>
                  <input
                    type="text"
                    required
                    placeholder="San Francisco"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">State:</label>
                    <input
                      type="text"
                      required
                      placeholder="CA"
                      maxLength={2}
                      value={stateAbbr}
                      onChange={(e) => setStateAbbr(e.target.value)}
                      className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-xs text-center focus:outline-none focus:border-amber-500 uppercase font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Zip:</label>
                    <input
                      type="text"
                      required
                      placeholder="94103"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-xs text-center focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery choices */}
            <div className="space-y-4">
              <h3 className="text-sm font-serif font-bold text-amber-500 uppercase tracking-widest border-b border-zinc-900 pb-2">
                2. Shipping Speed Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setShippingSpeed('ground')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between h-24 transition-all cursor-pointer ${
                    shippingSpeed === 'ground' ? 'border-amber-500 bg-amber-950/10' : 'border-zinc-800 bg-zinc-900/30'
                  }`}
                >
                  <div>
                    <span className="font-bold text-zinc-100 block uppercase">Confidential Ground</span>
                    <span className="text-[11px] text-zinc-500 block">Plain cardboard cardboard boxes via standard couriers</span>
                  </div>
                  <span className="text-amber-500 font-bold self-end">{shipping === 0 ? 'FREE' : formatPriceWithCurrency(4.99, activeCurrency)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingSpeed('air')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between h-24 transition-all cursor-pointer ${
                    shippingSpeed === 'air' ? 'border-amber-500 bg-amber-950/10' : 'border-zinc-800 bg-zinc-900/30'
                  }`}
                >
                  <div>
                    <span className="font-bold text-zinc-100 block uppercase">Overnight Express</span>
                    <span className="text-[11px] text-zinc-500 block">Express dispatch in bubble envelopes. Total priority security</span>
                  </div>
                  <span className="text-amber-500 font-bold self-end">{formatPriceWithCurrency(14.99, activeCurrency)}</span>
                </button>
              </div>
            </div>

            {/* Payment Method panel selectors */}
            <div className="space-y-4">
              <h3 className="text-sm font-serif font-bold text-amber-500 uppercase tracking-widest border-b border-zinc-900 pb-2">
                3. Secure Payment Options
              </h3>

              <div className="flex flex-wrap gap-2 md:grid md:grid-cols-3 gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 px-4 border rounded-xl flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'card' ? 'border-amber-500 bg-amber-950/10' : 'border-zinc-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-500" /> Card Gateway
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`flex-1 py-3 px-4 border rounded-xl flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'crypto' ? 'border-amber-500 bg-amber-950/10' : 'border-zinc-800'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-orange-400" /> Cryptocurrency
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 py-3 px-4 border rounded-xl flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'upi' ? 'border-amber-500 bg-amber-950/10' : 'border-zinc-800'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-400" /> UPI Swap / QR
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div id="card-form-grid" className="p-5 bg-[#111]/30 border border-zinc-800 rounded-2xl grid grid-cols-3 gap-4 text-xs font-mono">
                  <div className="col-span-3 space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-bold">Secure Card Number:</label>
                    <input
                      type="text"
                      placeholder="4111 0000 8124 5321"
                      required={paymentMethod === 'card'}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#111] border border-zinc-800 py-2.5 px-3 rounded-lg focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-bold">Expiry Date:</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required={paymentMethod === 'card'}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-[#111] border border-zinc-800 py-2.5 px-3 rounded-lg text-center focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-bold">CVV Code:</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      required={paymentMethod === 'card'}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-[#111] border border-zinc-800 py-2.5 px-3 rounded-lg text-center focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 col-span-3 pt-2 text-[10px] text-zinc-400 leading-normal">
                    <p>
                      Transactions are processed with full encryption. Statements display only as <span className="text-zinc-200 font-bold font-serif italic">&ldquo;{discreetBillingName}&rdquo;</span>. No reference to adult products.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div id="crypto-form-badge" className="p-5 bg-gradient-to-r from-orange-950/10 to-[#111] border border-zinc-900 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                  {/* Luxury transfer QR SVG code */}
                  <div className="w-24 h-24 bg-white p-1 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-[100%] h-[100%]">
                      {/* Generates a nice mock aesthetic transfer address qr representation */}
                      <rect x="0" y="0" width="100" height="100" fill="#000" />
                      <rect x="10" y="10" width="20" height="20" fill="#FFF" />
                      <rect x="15" y="15" width="10" height="10" fill="#000" />
                      <rect x="70" y="10" width="20" height="20" fill="#FFF" />
                      <rect x="75" y="15" width="10" height="10" fill="#000" />
                      <rect x="10" y="70" width="20" height="20" fill="#FFF" />
                      <rect x="15" y="75" width="10" height="10" fill="#000" />
                      {/* scatter dots */}
                      <rect x="40" y="20" width="5" height="5" fill="#FFF" />
                      <rect x="50" y="30" width="10" height="10" fill="#FFF" />
                      <rect x="40" y="50" width="5" height="5" fill="#FFF" />
                      <rect x="60" y="60" width="5" height="10" fill="#FFF" />
                      <rect x="80" y="80" width="10" height="10" fill="#FFF" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#FBBF24] uppercase tracking-wider block">Decentralized USDT Payment (TRC20 Address)</span>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Send exactly <strong className="text-zinc-200">${total.toFixed(2)} USDT ({formatPriceWithCurrency(total, activeCurrency)})</strong> to the following secure logistics address. Orders clear after exactly 1 chain confirmation.
                    </p>
                    <div className="bg-[#090611] font-mono text-[10px] px-3 py-1.5 rounded select-all border border-zinc-900 truncate tracking-wide text-zinc-300">
                      TPhU92JKsaHjks73KAs721Dkjas83KAsj9
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div id="upi-form-badge" className="p-5 bg-gradient-to-r from-emerald-950/10 to-[#111] border border-zinc-900 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 bg-white p-1 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                    {propUpiQrCodeUrl ? (
                      <img src={propUpiQrCodeUrl} className="w-[100%] h-[100%] object-contain" alt="Merchant UPI QR" referrerPolicy="no-referrer" />
                    ) : (
                      <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] text-black">
                        <rect x="0" y="0" width="100" height="100" fill="#000" />
                        <rect x="10" y="10" width="20" height="20" fill="#FFF" />
                        <rect x="15" y="15" width="10" height="10" fill="#000" />
                        <rect x="70" y="10" width="20" height="20" fill="#FFF" />
                        <rect x="10" y="70" width="20" height="20" fill="#FFF" />
                        <rect x="40" y="40" width="20" height="20" fill="#FFF" />
                        <rect x="45" y="45" width="10" height="10" fill="#000" />
                        {/* scatter dots and lines resembling upi payment code targets */}
                        <rect x="75" y="75" width="15" height="15" fill="#FFF" />
                        <rect x="30" y="15" width="5" height="15" fill="#FFF" />
                        <rect x="20" y="50" width="15" height="5" fill="#FFF" />
                        <rect x="65" y="40" width="5" height="15" fill="#FFF" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-grow space-y-3">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Unified Payments (UPI & QR)</span>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Scan the QR code above with any UPI app to transfer <strong className="text-zinc-200">{formatPriceWithCurrency(total, activeCurrency)}</strong>.
                    </p>

                    {(propUpiId || propUpiName) && (
                      <div className="bg-[#091512] border border-emerald-950/40 p-2.5 rounded font-mono text-[9.5px] text-zinc-300 space-y-0.5">
                        {propUpiName && <div>UPI registered Name: <span className="text-zinc-100 font-semibold">{propUpiName}</span></div>}
                        {propUpiId && <div>Recipient VPA Address: <span className="text-emerald-400 font-bold select-all">{propUpiId}</span></div>}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 uppercase">Your UPI ID (VPA):</label>
                        <input
                          type="text"
                          placeholder="e.g. buyer@ybl"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-[#111] border border-zinc-850 py-1.5 px-3 rounded text-zinc-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 uppercase">Reference Txn ID:</label>
                        <input
                          type="text"
                          required={paymentMethod === 'upi'}
                          placeholder="e.g. TXN18227391"
                          value={upiRef}
                          onChange={(e) => setUpiRef(e.target.value)}
                          className="w-full bg-[#111] border border-zinc-850 py-1.5 px-3 rounded text-zinc-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-1.5">
                      <div className="flex items-center gap-2 border border-dashed border-zinc-800 p-2 text-xs rounded bg-[#080512]">
                        <Upload className="w-3.5 h-3.5 text-zinc-500" />
                        <div className="flex-1">
                          <span className="text-[10px] text-zinc-400 block">screenshot payment proof</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setUpiScreenshot(e.target.files[0].name);
                            }
                          }}
                          className="w-32 text-[8px] opacity-75 cursor-pointer text-zinc-400"
                        />
                        {upiScreenshot && (
                          <span className="text-[9px] text-emerald-400 font-mono">✓ Proof registered</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Validation submission */}
            <button
              id="checkout-finalize-btn"
              type="submit"
              className="w-full py-4.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 font-mono text-xs uppercase font-black tracking-widest text-center shadow-lg cursor-pointer flex items-center justify-center gap-2 duration-300 text-black"
            >
              <Lock className="w-4 h-4" /> Finalize My Discreet Order
            </button>
          </form>

          {/* Right Summary Side */}
          <div id="checkout-summary-column" className="lg:col-span-5 space-y-6 lg:border-l lg:border-zinc-900 lg:pl-10">
            <h3 className="text-lg font-serif font-black text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              Order Review
            </h3>

            {/* Items inside summary */}
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-zinc-900/10 p-2 rounded-xl border border-zinc-900">
                  <div className="w-12 h-12 bg-zinc-950 rounded-lg border border-zinc-900 flex items-center justify-center p-1 flex-shrink-0">
                    <ProductIllustration productId={item.product.id} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-serif font-bold text-zinc-200 uppercase tracking-widest truncate">{item.product.name}</h4>
                    <span className="text-[10px] text-zinc-500 block font-mono">Qty: {item.quantity} • {item.selectedColor}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-300 pl-2">
                    {formatPriceWithCurrency(item.product.price * item.quantity, activeCurrency)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 font-mono text-xs border-t border-zinc-900 pt-4">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal:</span>
                <span>{formatPriceWithCurrency(subtotal, activeCurrency)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Secret Coupon:</span>
                  <span>-{formatPriceWithCurrency(discount, activeCurrency)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-500">
                <span>Discreet Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : formatPriceWithCurrency(shipping, activeCurrency)}</span>
              </div>

              <div className="flex justify-between text-zinc-300 border-t border-zinc-900 pt-2 text-sm font-serif">
                <span>Confidential Total:</span>
                <span className="text-amber-500 font-bold font-mono text-base">{formatPriceWithCurrency(total, activeCurrency)}</span>
              </div>
            </div>

            {/* Bottom trust seals */}
            <div className="p-4 bg-amber-950/10 border border-amber-900/15 rounded-xl space-y-2 text-xs leading-relaxed">
              <span className="font-mono text-[10px] font-bold text-amber-500 block uppercase">Logistics Safeguard</span>
              <p className="text-zinc-400">
                Billing entries are protected behind an independent tokenized payment processor. The packaging contains absolutely zero references to product contents, materials, or brands.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Step 2: Loader screen */}
      {step === 'loading' && (
        <div id="checkout-ssl-processor" className="w-full text-center py-24 space-y-4 max-w-md mx-auto flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
          <h3 className="text-lg font-serif font-bold text-white tracking-widest uppercase">SSL Bank clearance</h3>
          <p className="text-xs text-zinc-400 max-w-md leading-relaxed font-sans">
            Authorizing transaction variables... Confirming 256-bit secure envelope keys, verifying biological item coordinates, and printing discreet logistics codes. Do not refresh.
          </p>
        </div>
      )}

      {/* Step 3: Receipt screen */}
      {step === 'receipt' && placedOrder && (
        <div id="checkout-receipt-confirmation" className="w-full max-w-lg mx-auto bg-zinc-900/50 border border-zinc-900 p-8 md:p-12 rounded-3xl text-center space-y-6 shadow-2xl animate-fade-in flex flex-col items-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
          <div className="space-y-1.5">
            <h2 className="text-2xl font-serif font-black text-white">Purchase Confirmed!</h2>
            <p className="text-xs text-zinc-400 font-mono">Discreet Order Number: <strong className="text-zinc-100">{placedOrder.id}</strong></p>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-md">
            Your billing has been safely cleared under generic descriptor labels. Discreet ground logistics are currently compiling plain cardboard packaging for dispatch.
          </p>

          {/* Receipt billing detail sheet */}
          <div className="w-full bg-[#080511] rounded-xl p-5 text-left text-xs font-mono space-y-3 border border-zinc-900 text-zinc-400">
            <span className="text-[10px] uppercase font-bold text-amber-500 block border-b border-zinc-900 pb-1">Delivery Protocol Log</span>
            
            <div className="flex justify-between">
              <span>Plain Courier Target:</span>
              <span className="text-zinc-200">{placedOrder.shippingAddress.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Logistics Highway:</span>
              <span className="text-zinc-200">{placedOrder.shippingAddress.street}, {placedOrder.shippingAddress.city}</span>
            </div>

            <div className="flex justify-between">
              <span>Card Descriptors:</span>
              <span className="text-amber-500 italic font-serif">&ldquo;{discreetBillingName}&ldquo;</span>
            </div>

            <div className="flex justify-between border-t border-zinc-900 pt-2 text-[#FBBF24]">
              <span>Cleared Ledger Total:</span>
              <span>{formatPriceWithCurrency(placedOrder.total, activeCurrency)}</span>
            </div>
          </div>

          {/* Core CTAs */}
          <div id="receipt-desktop-ctas" className="w-full flex gap-3">
            <button
              onClick={() => setActiveView('dashboard')}
              className="flex-1 cursor-pointer py-3 px-4 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-500 font-mono text-xs uppercase font-bold tracking-widest duration-300"
            >
              Track Order
            </button>
            
            <button
              onClick={() => setActiveView('home')}
              className="flex-1 cursor-pointer py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90 text-black font-mono text-xs uppercase font-bold tracking-widest duration-300"
            >
              Home View
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
