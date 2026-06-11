import React from 'react';
import { ArrowRight, ArrowLeft, Heart, Eye, Sparkles, MessageSquare, Flame } from 'lucide-react';
import { Product, CategoryId } from '../types';
import { ProductIllustration } from './ProductIllustration';
import { CurrencyConfig, formatPriceWithCurrency } from '../utils/currency';

interface HomeViewProps {
  products: Product[];
  setSelectedCategory: (category: CategoryId) => void;
  setActiveView: (view: string) => void;
  setSelectedProduct: (p: Product) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  onAddToCart: (p: Product, qty: number) => void;
  activeCurrency: CurrencyConfig;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  setSelectedCategory,
  setActiveView,
  setSelectedProduct,
  wishlist,
  toggleWishlist,
  onAddToCart,
  activeCurrency,
}) => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);
  const [activeReviewSlide, setActiveReviewSlide] = React.useState(0);

  // Filter products for showcase
  const newArrivals = products.filter(p => p.isNewArrival);
  const bestSellers = products.filter(p => p.isBestSeller);

  const handleLingerieShorcut = () => {
    setSelectedCategory('lingerie');
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const reviewsList = [
    {
      text: "The shipping was absolutely silent. Arrived in a generic durable cardboard wrap. The quality of the silicone is unlike anything in standard shops.",
      author: "Juliet B. - SF",
      product: "Luna Silk II",
      stars: 5,
    },
    {
      text: "Enigma Wave exceeded my high standards. The combination of deep waves and simultaneous external clitoral pacer is incredibly satisfying.",
      author: "Garrison M. - Miami",
      product: "Enigma Wave",
      stars: 5,
    },
    {
      text: "Our couples dynamics has blossomed as a direct consequence of incorporating these technologies. Worth every single cent.",
      author: "Ariadne & Theo - Boston",
      product: "Sona 2 Cruise",
      stars: 5,
    }
  ];

  return (
    <div id="home-view-page" className="w-full text-zinc-100 pb-16 bg-[#050505] bg-gradient-to-b from-[#050505] to-[#0a0a0c]">
      
      {/* 1. HERO BANNER SECTION */}
      <section id="hero-banner" className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Dynamic visual framing with an elegant glowing ambient backdrop */}
        <div id="hero-box" className="relative w-full min-h-[460px] md:min-h-[560px] bg-[#0c0c0f] rounded-[40px] overflow-hidden border border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-[0_20px_100px_rgba(139,92,246,0.04)]">
          {/* Neon accent stripes matching screenshot 2 */}
          <div className="absolute top-0 right-0 w-full h-[4px] bg-purple-650" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute -left-32 -top-32 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

          {/* Texts Side (Left) */}
          <div className="flex-1 space-y-6 z-10 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-purple-900/40 text-purple-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              New Collection 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6">
              Sophisticated <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-bold">Intimacy.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto md:mx-0">
              Discover our curated range of premium wellness products designed for your ultimate pleasure. Discreet shipping, guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <button
                id="hero-shop-cta"
                onClick={() => handleCategoryNav('all')}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 font-bold rounded-lg transition-all text-sm tracking-wide cursor-pointer text-white"
              >
                Shop Collection
              </button>
              <button
                onClick={() => handleCategoryNav('accessories')}
                className="px-8 py-4 border border-white/20 hover:bg-white/5 font-bold rounded-lg transition-all text-sm text-white cursor-pointer"
              >
                View Guide
              </button>
            </div>
          </div>

          {/* Gorgeous illustration side (Right) */}
          <div className="flex-1 w-full max-w-sm md:max-w-md z-10 relative flex justify-center items-center">
            {/* Pulsing neon highlight */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-[80px]" />
            <div className="w-72 h-72 md:w-85 md:h-85">
              <ProductIllustration productId="sona-2-cruise" interactive={true} />
            </div>
            {/* Float badge */}
            <span className="absolute bottom-4 left-6 bg-black/80 border border-white/10 backdrop-blur-md text-[10px] md:text-xs font-mono uppercase px-3 py-1.5 rounded-full text-purple-400 flex items-center gap-1 tracking-wider shadow-lg">
              <Flame className="w-3.5 h-3.5 text-purple-450" /> Sona 2 Cruise • Best Seller
            </span>
          </div>
        </div>
      </section>

      {/* 2. CURATED COLLECTIONS GRID */}
      <section id="curated-collections" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">Curated Collections</h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">Explore by sensory experience and intimate anatomy</p>
        </div>

        {/* Bento Grid Layout exactly echoing screenshots */}
        <div id="collections-bento" className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Adult Toys (Big Card) */}
          <div
            onClick={() => handleCategoryNav('toys')}
            className="md:col-span-2 md:row-span-2 group relative h-[380px] md:h-auto min-h-[380px] rounded-3xl overflow-hidden border border-white/10 hover:border-purple-600 bg-[#0f0f12] cursor-pointer transition-all duration-300 shadow-md hover:shadow-purple-900/5 flex flex-col justify-between p-8"
          >
            {/* Vector wire background lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-b from-transparent to-black" />
            <div className="absolute right-0 bottom-4 w-60 h-60 md:w-80 md:h-80 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <ProductIllustration productId="enigma-wave" interactive={false} />
            </div>

            <div className="z-10">
              <span className="text-[10px] uppercase font-mono text-purple-400 tracking-widest bg-purple-900/20 px-3 py-1 rounded-full border border-purple-550/10">
                Wellness Tech
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-2xl font-bold text-white group-hover:text-purple-450 transition-colors">
                Adult Toys
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mt-1">Premium engineering for acoustic biological frequency syncing.</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-purple-405 font-bold uppercase font-mono hover:underline">
                Explore Core <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Lingerie */}
          <div
            onClick={handleLingerieShorcut}
            className="group relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden border border-white/10 hover:border-purple-600 bg-[#0f0f12] cursor-pointer transition-all duration-300 p-8 flex flex-col justify-between"
          >
            <div className="absolute right-0 bottom-4 w-44 h-44 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <ProductIllustration productId="provocateur-lace" interactive={false} />
            </div>

            <div className="z-10">
              <span className="text-[10px] uppercase font-mono text-purple-400 tracking-widest bg-purple-900/20 px-3 py-1 rounded-full border border-purple-550/10">
                Silk & Lace
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-450 transition-colors">
                Lingerie
              </h3>
              <p className="text-[11px] text-gray-400 max-w-[180px] mt-0.5">Handcrafted French overlays and Mulberry silk bands.</p>
            </div>
          </div>

          {/* Card 3: Wellness */}
          <div
            onClick={() => handleCategoryNav('lubricants')}
            className="group relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden border border-white/10 hover:border-purple-600 bg-[#0f0f12] cursor-pointer transition-all duration-300 p-8 flex flex-col justify-between"
          >
            <div className="absolute right-0 bottom-2 w-44 h-44 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <ProductIllustration productId="midnight-bloom" interactive={false} />
            </div>

            <div className="z-10">
              <span className="text-[10px] uppercase font-mono text-purple-400 tracking-widest bg-purple-900/20 px-3 py-1 rounded-full border border-purple-550/10">
                Botanicals
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-450 transition-colors">
                Wellness
              </h3>
              <p className="text-[11px] text-gray-400 max-w-[180px] mt-0.5">Therapeutic melt massage candles and soothing formulations.</p>
            </div>
          </div>

          {/* Card 4: Couples (Spans 2 columns on desktop) */}
          <div
            onClick={() => handleCategoryNav('couples')}
            className="md:col-span-2 group relative h-[220px] rounded-3xl overflow-hidden border border-white/10 hover:border-purple-600 bg-[#0f0f12] cursor-pointer transition-all duration-300 p-8 flex flex-col justify-between"
          >
            <div className="absolute right-4 bottom-0 w-36 h-36 opacity-85 group-hover:scale-105 transition-transform duration-500">
              {/* Simple romantic mesh */}
              <svg viewBox="0 0 100 100" className="w-full h-full" opacity="0.4">
                <circle cx="40" cy="50" r="30" fill="none" stroke="#a855f7" strokeWidth="2" />
                <circle cx="60" cy="50" r="30" fill="none" stroke="#ec4899" strokeWidth="2" />
                <path d="M50 35 Q55 30 60 35 T50 55 Q40 45 40 35 T50 35 Z" fill="#a855f7" />
              </svg>
            </div>

            <div className="z-10">
              <span className="text-[10px] uppercase font-mono text-pink-400 tracking-widest bg-pink-900/20 px-3 py-1 rounded-full border border-pink-550/10">
                Harmonies
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-450 transition-colors">
                Couples
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mt-0.5">Dual-stimulators and synchronization bundles designed for shared coordinates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS CAROUSEL/GRID */}
      <section id="new-arrivals" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">New Arrivals</h2>
            <p className="text-xs text-zinc-400 mt-1 font-sans">Freshly engineered additions to the sensual cabinet</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid - New arrivals */}
        <div id="new-arrivals-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                id={`card-${product.id}`}
                className="group relative bg-[#0f0f12] border border-white/10 rounded-2xl overflow-hidden p-4 flex flex-col justify-between hover:border-purple-600 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(139,92,246,0.03)]"
              >
                {/* Visual Canvas containing high-gloss product render */}
                <div
                  id={`canvas-${product.id}`}
                  onClick={() => handleProductClick(product)}
                  className="aspect-square w-full rounded-xl bg-[#030303] flex items-center justify-center relative cursor-pointer group-hover:scale-[1.01] transition-transform duration-300"
                >
                  <span className="absolute top-2.5 left-2.5 bg-purple-600 shadow-md text-white font-mono uppercase text-[9.5px] font-bold px-2.5 py-0.5 rounded-full tracking-wider z-10">
                    New
                  </span>
                  
                  <div className="w-44 h-44">
                    <ProductIllustration productId={product.id} interactive={true} />
                  </div>
                </div>

                {/* Wishlist action */}
                <button
                  id={`wishlist-btn-${product.id}`}
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-6 right-6 p-2 rounded-full cursor-pointer backdrop-blur-md border bg-zinc-950/60 hover:bg-zinc-900 border-white/10 text-zinc-300 hover:text-rose-500 transition-colors z-20 shadow-md"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Details Section */}
                <div className="mt-4 flex flex-col gap-1.5 flex-1 justify-between">
                  <div className="cursor-pointer" onClick={() => handleProductClick(product)}>
                    <h3 className="text-sm font-sans font-bold text-zinc-100 uppercase tracking-wide group-hover:text-purple-400 transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 italic mt-0.5 font-sans">
                      {product.brand} • {product.category}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-white/5">
                    <span className="text-sm font-sans font-extrabold text-zinc-100">
                      {formatPriceWithCurrency(product.price, activeCurrency)}
                    </span>
                    <button
                      id={`buy-now-btn-${product.id}`}
                      onClick={() => handleProductClick(product)}
                      className="cursor-pointer px-3 py-1.5 bg-purple-900/35 border border-purple-800/40 hover:bg-purple-600 hover:text-white rounded-lg text-[10px] font-bold font-sans tracking-widest text-[#d8b4fe] uppercase duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. DESIGN PILLARS */}
      <section id="features-info" className="max-w-7xl mx-auto px-4 py-8">
        <hr className="border-t border-white/10 mb-12" />
        <div id="info-pillars-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-zinc-400">
          <div className="space-y-3 p-4">
            <h4 className="text-zinc-200 font-sans font-bold tracking-widest uppercase text-sm">Discreet Packaging</h4>
            <p className="text-xs leading-relaxed max-w-sm mx-auto">
              Plain brown cardboard boxes with absolutely no brand logos or suggestive titles on packaging labels. Total anonymity.
            </p>
          </div>
          <div className="space-y-3 p-4 border-y md:border-y-0 md:border-x border-white/10">
            <h4 className="text-zinc-200 font-sans font-bold tracking-widest uppercase text-sm">Secure Billing</h4>
            <p className="text-xs leading-relaxed max-w-sm mx-auto">
              Statements display non-suggestive generic labels corresponding to our logistics gateway. We protect your billing profile.
            </p>
          </div>
          <div className="space-y-3 p-4">
            <h4 className="text-zinc-200 font-sans font-bold tracking-widest uppercase text-sm">Expert Support</h4>
            <p className="text-xs leading-relaxed max-w-sm mx-auto">
              Intimacy wellness consultants are available on demand via live chatbot to address questions regarding speeds, materials, and sizes.
            </p>
          </div>
        </div>
        <hr className="border-t border-white/10 mt-12" />
      </section>

      {/* 5. BRAND CRITIQUE RATINGS REVIEWS ROW */}
      <section id="store-reviews" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center max-w-2xl mx-auto text-center space-y-6">
          <MessageSquare className="w-8 h-8 text-purple-400" />
          <h2 className="text-2xl font-sans font-bold text-white tracking-tight">Experience Circles</h2>
          <p className="text-base italic text-zinc-300 leading-relaxed font-sans">
            &ldquo;{reviewsList[activeReviewSlide].text}&rdquo;
          </p>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase text-purple-400 font-sans tracking-widest">
              {reviewsList[activeReviewSlide].author}
            </h4>
            <p className="text-[10px] text-zinc-500 uppercase font-mono font-bold tracking-wider">
              Verified Buyer of {reviewsList[activeReviewSlide].product}
            </p>
          </div>
          <div className="flex items-center gap-1.5 pt-2">
            {reviewsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReviewSlide(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  activeReviewSlide === idx ? 'bg-purple-600 w-5' : 'bg-[#222]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER PROMO ACCORDIAN BOX */}
      <section id="loyalty-newsletter" className="max-w-7xl mx-auto px-4 py-12">
        <div id="newsletter-card" className="w-full bg-[#0f0f12] rounded-[32px] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="absolute right-0 top-0 w-44 h-44 bg-purple-600/5 rounded-full blur-2xl" />
          
          <div className="space-y-3 flex-1 text-center md:text-left">
            <h3 className="text-2xl font-sans font-bold text-white tracking-tight">Join the Inner Circle</h3>
            <p className="text-xs md:text-sm text-zinc-300 max-w-lg leading-relaxed">
              Subscribe for exclusive sensory arrivals, expert physical wellness tutorials, and private member-only secret codes. Completely discreet, unsubscribe anytime.
            </p>
          </div>

          <div className="w-full max-w-sm">
            {newsletterSubscribed ? (
              <div id="newsletter-joined-banner" className="bg-[#15151a] border border-purple-500/30 rounded-xl p-5 text-center animate-fade-in shadow-xl">
                <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider mb-1.5 font-sans">
                  Welcome to the Circle
                </span>
                <p className="text-[11px] text-zinc-350 mb-3 leading-relaxed">
                  Apply this discreet code during checkout to unlock {formatPriceWithCurrency(10, activeCurrency)} off your first elegant purchase:
                </p>
                <div className="bg-[#050505] inline-block font-mono font-bold tracking-widest text-amber-400 border border-white/10 px-4 py-2 rounded-lg text-xs select-all">
                  DISCREET10
                </div>
              </div>
            ) : (
              <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your discreet email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-[#050505] text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#a855f7] focus:outline-none placeholder-zinc-500 text-zinc-100"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs font-sans tracking-wide active:scale-[0.98] transition-all cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
            {!newsletterSubscribed && (
              <span className="text-[10px] text-zinc-500 block text-center md:text-left mt-2 pl-2">
                By subscribing, you agree to our confidential guidelines. 18+ only.
              </span>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
