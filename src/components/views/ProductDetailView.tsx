import React from 'react';
import { Star, ShieldCheck, Heart, ShoppingCart, ArrowLeft, Send, Check } from 'lucide-react';
import { Product, Review } from '../../types';
import { ProductIllustration } from '../common/ProductIllustration';
import { CurrencyConfig, formatPriceWithCurrency } from '../../utils/currency';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (p: Product, qty: number, color?: string) => void;
  onBuyNow: (p: Product, qty: number, color?: string) => void;
  allReviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  relatedProducts: Product[];
  setSelectedProduct: (p: Product) => void;
  setActiveView: (view: string) => void;
  activeCurrency: CurrencyConfig;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  allReviews,
  onAddReview,
  relatedProducts,
  setSelectedProduct,
  setActiveView,
  activeCurrency,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState('Royal Amethyst');
  const [activeTab, setActiveTab] = React.useState<'specs' | 'discreet'>('specs');
  const [wishlisted, setWishlisted] = React.useState(false);
  const [activeImageIdx, setActiveImageIdx] = React.useState(0);

  // Review submission state
  const [reviewerName, setReviewerName] = React.useState('');
  const [reviewerRating, setReviewerRating] = React.useState(5);
  const [reviewerComment, setReviewerComment] = React.useState('');
  const [reviewSubmitted, setReviewSubmitted] = React.useState(false);

  // Vibration tester state
  const [vibeActive, setVibeActive] = React.useState(false);
  const [vibeSpeed, setVibeSpeed] = React.useState(1); // 1 = low, 2 = medium, 3 = hyper-sonic

  const productReviews = allReviews.filter(r => r.productId === product.id);

  const colors = ['Royal Amethyst', 'Rose Quartz Glow', 'Obsidian Chrome'];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    onAddReview({
      productId: product.id,
      userName: reviewerName,
      rating: reviewerRating,
      comment: reviewerComment,
      verified: true
    });

    setReviewSubmitted(true);
    setReviewerName('');
    setReviewerComment('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const incrementQty = () => setQuantity(prev => (prev < product.stock ? prev + 1 : prev));
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div id="product-detail-view" className="max-w-7xl mx-auto px-4 py-8 text-zinc-100 bg-[#0B0813]">
      {/* Back button */}
      <button
        id="btn-back-to-catalog"
        onClick={() => setActiveView('category')}
        className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-white uppercase mb-8 cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Return to Collections</span>
      </button>

      {/* Main Column Split */}
      <div id="product-card-core-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
        {/* LEFT COLUMN: Visual Media (Tiled Thumbnails + Primary Master Showcase) */}
        <div id="media-showcase-column" className="lg:col-span-7 space-y-6">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 justify-center">
              {[1, 2, 3].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 md:w-20 md:h-20 bg-[#090614] border rounded-xl overflow-hidden flex items-center justify-center cursor-pointer transition-all ${
                    activeImageIdx === idx ? 'border-violet-500 shadow-lg shadow-violet-500/10' : 'border-violet-950/45 hover:border-violet-800'
                  }`}
                >
                  <div className="w-12 h-12 opacity-80">
                    <ProductIllustration productId={product.id} interactive={false} />
                  </div>
                </button>
              ))}
            </div>

            {/* Master display card */}
            <div className="flex-1 aspect-square bg-[#090614]/80 rounded-2xl border border-violet-950/40 relative flex items-center justify-center p-8 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#140F27]/40 to-transparent opacity-80" />
              {/* If vibration speed test is active, show ambient ripple ring */}
              {vibeActive && (
                <div
                  className={`absolute w-72 h-72 rounded-full border border-violet-500/40 animate-ping opacity-25`}
                  style={{ animationDuration: vibeSpeed === 1 ? '3s' : vibeSpeed === 2 ? '1.5s' : '0.6s' }}
                />
              )}

              <div className="w-72 h-72 md:w-85 md:h-85">
                <ProductIllustration productId={product.id} interactive={true} />
              </div>

              {/* Floating product details label */}
              <div className="absolute bottom-4 right-4 bg-zinc-950/70 border border-zinc-800/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] uppercase font-mono tracking-wider flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Premium Quality Standard</span>
              </div>
            </div>
          </div>

          {/* VIBE ENGINE TESTER COMPONENT - Incredibly fun and authentic! */}
          <div id="vibrations-tester-widget" className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/30 via-slate-900/30 to-violet-950/20 border border-violet-900/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest font-mono">Sensory Interface Simulator</span>
              <h4 className="text-sm font-serif font-bold text-zinc-100 flex items-center justify-center sm:justify-start gap-1.5">
                <span className={`w-2 h-2 rounded-full ${vibeActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                Test Pulsation Frequency Pacing
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans max-w-sm">
                Activate to view the vibration speeds of the smart motors. Experience how Cruise Control responds to physical load pressures.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {vibeActive && (
                <div className="flex gap-1.5 items-center bg-violet-950/50 border border-violet-850 px-2.5 py-1 rounded-full text-[10.5px] font-mono">
                  {([1, 2, 3] as const).map(speed => (
                    <button
                      key={speed}
                      onClick={() => setVibeSpeed(speed)}
                      className={`px-2.5 py-0.5 rounded-full cursor-pointer uppercase transition-all ${
                        vibeSpeed === speed
                          ? 'bg-fuchsia-600 text-white font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      S{speed}
                    </button>
                  ))}
                </div>
              )}
              <button
                id="btn-toggle-vibrator"
                onClick={() => setVibeActive(!vibeActive)}
                className={`py-2 px-5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  vibeActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-500'
                    : 'bg-violet-900/40 text-violet-300 border border-violet-850 hover:bg-violet-800/40'
                }`}
              >
                {vibeActive ? 'Halt Motor' : 'Trigger Engine'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Buying Desk info */}
        <div id="product-meta-column" className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span id="product-category-brand" className="text-xs uppercase tracking-widest font-bold text-fuchsia-400 font-mono">
              {product.brand} • {product.category}
            </span>
            <h1 id="product-detail-title" className="text-3xl md:text-4xl font-serif font-black tracking-tight text-white leading-tight">
              {product.name}
            </h1>
            
            {/* Star ratings summary */}
            <div className="flex items-center gap-2 font-mono text-xs pt-1">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map(st => (
                  <Star key={st} className={`w-4 h-4 ${product.rating >= st ? 'fill-amber-500' : ''}`} />
                ))}
              </div>
              <span className="text-zinc-300 font-bold">{product.rating} Stars</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">{productReviews.length} Client Critiques</span>
            </div>
          </div>

          {/* Price container */}
          <div className="py-4 border-y border-violet-950/40 flex items-baseline gap-4">
            <span id="product-retail-price" className="text-3xl font-serif font-black text-white">
              {formatPriceWithCurrency(product.price, activeCurrency)}
            </span>
            {product.originalPrice && (
              <span id="product-discount-price" className="text-base text-zinc-500 line-through">
                {formatPriceWithCurrency(product.originalPrice, activeCurrency)}
              </span>
            )}
            <span className="text-[10px] font-mono font-bold bg-[#140F2D] text-[#FEF3C7] px-2 py-1 rounded border border-violet-950/40 uppercase tracking-widest">
              Available in Stock ({product.stock})
            </span>
          </div>

          <p id="product-brief" className="text-sm text-zinc-300 font-sans leading-relaxed">
            {product.description}
          </p>

          {/* Color choice switches */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-zinc-400">Select Finishes:</h4>
            <div className="flex gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`text-[10px] font-mono uppercase tracking-wide px-3.5 py-2 rounded-xl transition-all border cursor-pointer ${
                    selectedColor === color
                      ? 'bg-[#18112C] border-fuchsia-500 text-fuchsia-300 shadow-md'
                      : 'border-violet-950/60 bg-transparent text-zinc-400 hover:border-violet-850 hover:text-zinc-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantitaive modifiers desk actions */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-zinc-400">Qty:</span>
              <div id="detail-qty-pacer" className="flex items-center bg-[#140F24] border border-violet-950 rounded-full py-1.5 px-3 font-mono">
                <button
                  onClick={decrementQty}
                  className="px-2 font-bold text-zinc-400 hover:text-white cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold w-10 text-center">{quantity}</span>
                <button
                  onClick={incrementQty}
                  className="px-2 font-bold text-zinc-400 hover:text-white cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA checkout / cart buttons */}
            <div id="detail-buying-desk" className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="btn-add-to-cart-action"
                onClick={() => onAddToCart(product, quantity, selectedColor)}
                className="flex-1 cursor-pointer py-4 px-6 rounded-full border border-violet-700 bg-violet-950/20 hover:bg-violet-900/30 text-violet-300 hover:text-white font-mono uppercase text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>

              <button
                id="btn-buy-now-action"
                onClick={() => onBuyNow(product, quantity, selectedColor)}
                className="flex-1 cursor-pointer py-4 px-6 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-mono uppercase text-xs font-black tracking-widest text-center shadow-lg transition-all duration-300 focus:outline-none"
              >
                Buy It Now
              </button>
            </div>
          </div>

          {/* Underlay legal policies switches */}
          <div className="pt-6 border-t border-violet-950/30">
            <div className="flex gap-4 border-b border-violet-950/15 pb-2 text-xs font-mono">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-1 px-1 tracking-wider uppercase ${activeTab === 'specs' ? 'border-b-2 border-fuchsia-500 text-fuchsia-400 font-bold' : 'text-zinc-400'}`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('discreet')}
                className={`pb-1 px-1 tracking-wider uppercase ${activeTab === 'discreet' ? 'border-b-2 border-fuchsia-500 text-fuchsia-400 font-bold' : 'text-zinc-400'}`}
              >
                Discreet Guarantee
              </button>
            </div>

            <div className="pt-4 text-xs text-zinc-400 leading-relaxed font-sans">
              {activeTab === 'specs' ? (
                <ul className="space-y-2 font-mono">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key} className="flex justify-between py-1.5 border-b border-violet-950/10">
                      <span className="text-zinc-500">{key}:</span>
                      <span className="text-zinc-200 text-right">{value}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-3 font-sans">
                  <p>
                    All PleasureHub orders are securely taped in standard brown cardboard boxes with generic plain courier sheets. There is absolutely no reference to the products inside.
                  </p>
                  <p className="font-mono text-[11px] text-fuchsia-400">
                    BANK STATEMENT LABEL: Billing descriptors will appear strictly as &quot;PH-Intimate-Svc&quot;. Your complete privacy is fully safeguarded.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SEGMENT & RATING SYSTEM */}
      <section id="product-reviews-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-violet-950/30 mb-20 animate-fade-in">
        
        {/* Left Side: Client Reviews Log */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            Client Reviews ({productReviews.length})
          </h3>

          <div className="space-y-4">
            {productReviews.length === 0 ? (
              <p className="text-zinc-500 italic text-sm">Be the first to leave a critique for {product.name}. Complete anonymous review is highly recommended!</p>
            ) : (
              productReviews.map(rev => (
                <div key={rev.id} className="p-5 rounded-2xl bg-[#140F24]/40 border border-violet-950/60 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-serif font-black text-fuchsia-300 font-bold">{rev.userName}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{rev.date}</span>
                  </div>
                  
                  {/* Rating Stars row */}
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map(st => (
                      <Star key={st} className={`w-3.5 h-3.5 ${rev.rating >= st ? 'fill-amber-500' : 'text-zinc-800'}`} />
                    ))}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{rev.comment}</p>
                  
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 font-mono uppercase text-[9.5px] font-bold text-emerald-500/80">
                      <Check className="w-3 h-3" /> VERIFIED ANONYMOUS BUYER
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>        {/* Right Side: Add a Review form */}
        <div className="lg:col-span-5 bg-[#111]/35 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-4 h-fit">
          <h3 className="text-sm font-serif font-black tracking-widest text-amber-500 uppercase">Write a Critique</h3>
          
          {reviewSubmitted ? (
            <div id="review-complete-badge" className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-xl text-center space-y-2">
              <span className="text-2xl block">🎉</span>
              <h4 className="text-xs font-mono font-bold uppercase text-emerald-400">Review Submitted Successfully</h4>
              <p className="text-[11px] text-zinc-400">Your intimate critique has been safely queued and published. Thank you for supporting our body-positive sanctuary!</p>
            </div>
          ) : (
            <form id="reviewer-form-element" onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10.5px] font-mono text-zinc-400 uppercase font-bold">Reviewer Name (Anon OK):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Secret Intimate / Anonymous L."
                  value={reviewerName}
                  onChange={e => setReviewerName(e.target.value)}
                  className="w-full bg-[#0c0c0e] text-xs px-4 py-3 rounded-xl border border-zinc-800 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10.5px] font-mono text-zinc-400 uppercase font-bold">Client Star Rating:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setReviewerRating(st)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${reviewerRating >= st ? 'fill-amber-500 text-amber-500' : 'text-zinc-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10.5px] font-mono text-zinc-400 uppercase font-bold">Critique Comments:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details regarding motors, tactile feel, sound levels, and discrete shipping..."
                  value={reviewerComment}
                  onChange={e => setReviewerComment(e.target.value)}
                  className="w-full bg-[#0c0c0e] text-xs px-4 py-3 rounded-xl border border-zinc-800 focus:border-amber-500 focus:outline-none resize-none font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 font-mono text-xs uppercase font-semibold text-black rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Post Critique
              </button>
            </form>
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section id="detail-related-carousel" className="space-y-8 pt-12 border-t border-zinc-900">
          <h3 className="text-xl font-serif font-black text-white text-center sm:text-left">Related Intimacies</h3>
          
          <div id="relative-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  setQuantity(1);
                  setVibeActive(false);
                  setActiveImageIdx(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-zinc-900/20 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500 transition-all cursor-pointer"
              >
                <div className="aspect-square w-full rounded-xl bg-[#090614]/85 flex items-center justify-center relative overflow-hidden mb-3">
                  <div className="w-32 h-32">
                    <ProductIllustration productId={p.id} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-serif font-bold text-zinc-200 group-hover:text-amber-500 transition-colors uppercase tracking-wide truncate">
                    {p.name}
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-mono font-bold uppercase">{p.brand}</p>
                  <p className="text-xs font-serif font-black text-zinc-100 pt-1">{formatPriceWithCurrency(p.price, activeCurrency)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
