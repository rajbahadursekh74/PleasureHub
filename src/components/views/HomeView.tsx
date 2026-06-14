import React from 'react';
import { ArrowRight, ArrowLeft, Heart, Sparkles, MessageSquare, Flame } from 'lucide-react';
import { Product, CategoryId } from '../../types';
import { ProductIllustration } from '../common/ProductIllustration';
import { CurrencyConfig, formatPriceWithCurrency } from '../../utils/currency';

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
  activeCurrency,
}) => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);
  const [activeReviewSlide, setActiveReviewSlide] = React.useState(0);

  // Filter products for showcase
  const newArrivals = products.filter(p => p.isNewArrival);

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
      text: "The Italian Oxford shoes are absolutely stunning. Outstanding hand-painted patina and the cushion support is incredibly comfortable.",
      author: "Juliet B. - SF",
      product: "Italian Oxford Shoes",
      stars: 5,
    },
    {
      text: "The double-breasted trench coat is tailored to perfection. Water-resistant material works flawlessly during afternoon breezes.",
      author: "Garrison M. - Miami",
      product: "Luxe Trench Coat",
      stars: 5,
    },
    {
      text: "Our wardrobes have blossomed as a direct consequence of incorporating FeshtaWish designer wear. Worth every single cent.",
      author: "Ariadne & Theo - Boston",
      product: "Imperial Slim Wool Suit",
      stars: 5,
    }
  ];

  return (
    <div id="home-view-page" className="w-full text-zinc-100 pb-16 bg-[#050505] bg-gradient-to-b from-[#050505] to-[#0a0a0c]">
      
      {/* 1. HERO BANNER SECTION */}
      <section id="hero-banner" className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Dynamic visual framing with an elegant glowing ambient backdrop */}
        <div id="hero-box" className="relative w-full min-h-[460px] md:min-h-[560px] bg-[#0c0c0f] rounded-[40px] overflow-hidden border border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-[0_20px_100px_rgba(245,158,11,0.04)]">
          {/* Neon accent stripes */}
          <div className="absolute top-0 right-0 w-full h-[4px] bg-amber-600" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute -left-32 -top-32 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />

          {/* Texts Side (Left) */}
          <div className="flex-1 space-y-6 z-10 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-amber-900/40 text-amber-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Premium Collection 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 font-serif">
              Sophisticated <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-bold">Elegance.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto md:mx-0">
              Discover our curated range of premium wardrobe classics, tailored designer wear, and premium hand-painted accessories.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4 font-sans">
              <button
                id="hero-shop-cta"
                onClick={() => handleCategoryNav('all')}
                className="px-8 py-4 bg-amber-600 hover:bg-amber-700 font-bold rounded-lg transition-all text-sm tracking-wide cursor-pointer text-white"
              >
                Shop Collection
              </button>
              <button
                onClick={() => handleCategoryNav('ethnic')}
                className="px-8 py-4 border border-white/20 hover:bg-white/5 font-bold rounded-lg transition-all text-sm text-white cursor-pointer"
              >
                View Heritage
              </button>
            </div>
          </div>

          {/* Gorgeous illustration side (Right) */}
          <div className="flex-1 w-full max-w-sm md:max-w-md z-10 relative flex justify-center items-center">
            {/* Pulsing neon highlight */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-amber-500/5 to-yellow-500/5 rounded-full blur-[80px]" />
            <div className="w-72 h-72 md:w-85 md:h-85">
              <ProductIllustration productId="classy-oxford-shoes" interactive={true} />
            </div>
            {/* Float badge */}
            <span className="absolute bottom-4 left-6 bg-black/80 border border-white/10 backdrop-blur-md text-[10px] md:text-xs font-mono uppercase px-3 py-1.5 rounded-full text-amber-400 flex items-center gap-1 tracking-wider shadow-lg">
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Classy Italian Oxford • Best Seller
            </span>
          </div>
        </div>
      </section>

      {/* 2. CURATED COLLECTIONS GRID */}
      <section id="curated-collections" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">Curated Portfolios</h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">Explore by category, tailor weave and designer brand</p>
        </div>

        {/* Bento Grid Layout */}
        <div id="collections-bento" className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Footwear (Big Card) */}
          <div
            onClick={() => handleCategoryNav('footwear')}
            className="md:col-span-2 md:row-span-2 group relative h-[380px] md:h-auto min-h-[380px] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500 bg-[#0f0f12] cursor-pointer transition-all duration-300 shadow-md hover:shadow-amber-955/5 flex flex-col justify-between p-8"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-b from-transparent to-black" />
            <div className="absolute right-0 bottom-4 w-60 h-60 md:w-80 md:h-80 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <ProductIllustration productId="classy-oxford-shoes" interactive={false} />
            </div>

            <div className="z-10">
              <span className="text-[10px] uppercase font-mono text-amber-400 tracking-widest bg-amber-900/20 px-3 py-1 rounded-full border border-amber-550/10">
                True Craftsmanship
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors font-serif">
                Designer Footwear
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mt-1">Genuine full-grain calfskins with memory foam insoles and Blake stitching.</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-500 font-bold uppercase font-mono hover:underline">
                Explore Wardrobe <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Women's Wear */}
          <div
            onClick={() => handleCategoryNav('women')}
            className="group relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500 bg-[#0f0f12] cursor-pointer transition-all duration-300 p-8 flex flex-col justify-between"
          >
            <div className="absolute right-0 bottom-4 w-44 h-44 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <ProductIllustration productId="silk-mididress" interactive={false} />
            </div>

            <div className="z-10">
              <span className="text-[10px] uppercase font-mono text-amber-400 tracking-widest bg-amber-900/20 px-3 py-1 rounded-full border border-amber-550/10">
                Atelier Weave
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors font-serif">
                Women's Wear
              </h3>
              <p className="text-[11px] text-gray-400 max-w-[180px] mt-0.5">Stunning slips and mulberry silk dresses cut on a cowl bias.</p>
            </div>
          </div>

          {/* Card 3: Accessories */}
          <div
            onClick={() => handleCategoryNav('accessories')}
            className="group relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500 bg-[#0f0f12] cursor-pointer transition-all duration-300 p-8 flex flex-col justify-between"
          >
            <div className="absolute right-0 bottom-2 w-44 h-44 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <ProductIllustration productId="minimalist-aviator-glasses" interactive={false} />
            </div>

            <div className="z-10">
              <span className="text-[10px] uppercase font-mono text-amber-400 tracking-widest bg-amber-900/20 px-3 py-1 rounded-full border border-amber-550/10">
                Gold & Titanium
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors font-serif">
                Accessories
              </h3>
              <p className="text-[11px] text-gray-400 max-w-[180px] mt-0.5">Polarized titanium frames, timekeepers, and secure travel bags.</p>
            </div>
          </div>

          {/* Card 4: Men's Wear */}
          <div
            onClick={() => handleCategoryNav('men')}
            className="md:col-span-2 group relative h-[220px] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500 bg-[#0f0f12] cursor-pointer transition-all duration-300 p-8 flex flex-col justify-between"
          >
            <div className="absolute right-4 bottom-0 w-36 h-36 opacity-85 group-hover:scale-105 transition-transform duration-500">
              {/* Elegant hanger design outline */}
              <svg viewBox="0 0 100 100" className="w-full h-full" opacity="0.3">
                <path d="M50 20 C47 20 45 23 45 25 C45 28 48 30 50 32 L50 40 L20 60 L80 60 L50 40 Z" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <line x1="20" y1="60" x2="80" y2="60" stroke="#fbbf24" strokeWidth="2.5" />
              </svg>
            </div>

            <div className="z-10">
              <span className="text-[10px] uppercase font-mono text-yellow-500 tracking-widest bg-yellow-950/20 px-3 py-1 rounded-full border border-yellow-500/10">
                Sartorial Perfection
              </span>
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-amber-550 transition-colors font-serif">
                Men's Collections
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mt-0.5">Half-canvassed double breasted blazers and Super 120s Australian wool trousers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS CAROUSEL/GRID */}
      <section id="new-arrivals" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">New Runway Arrivals</h2>
            <p className="text-xs text-zinc-400 mt-1 font-sans">Freshly stitched catalog ensembles added to our catalog</p>
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
                className="group relative bg-[#0f0f12] border border-white/10 rounded-2xl overflow-hidden p-4 flex flex-col justify-between hover:border-amber-500 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(245,158,11,0.03)]"
              >
                {/* Visual Canvas containing high-gloss product render */}
                <div
                  id={`canvas-${product.id}`}
                  onClick={() => handleProductClick(product)}
                  className="aspect-square w-full rounded-xl bg-[#030303] flex items-center justify-center relative cursor-pointer group-hover:scale-[1.01] transition-transform duration-300"
                >
                  <span className="absolute top-2.5 left-2.5 bg-amber-600 shadow-md text-white font-mono uppercase text-[9.5px] font-bold px-2.5 py-0.5 rounded-full tracking-wider z-10">
                    Runway
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
                    <h3 className="text-sm font-sans font-bold text-zinc-100 uppercase tracking-wide group-hover:text-amber-500 transition-colors truncate">
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
                      className="cursor-pointer px-3 py-1.5 bg-amber-950/35 border border-amber-900/40 hover:bg-amber-600 hover:text-white rounded-lg text-[10px] font-bold font-sans tracking-widest text-[#fde047] uppercase duration-300"
                    >
                      Details
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
        <div id="info-pillars-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-zinc-400 font-sans">
          <div className="space-y-3 p-4">
            <h4 className="text-zinc-200 font-bold tracking-widest uppercase text-xs">Exquisite Packaging</h4>
            <p className="text-xs leading-relaxed max-w-sm mx-auto">
              Delivered in tailored matte presentation pull-drawers, cushioned with silk shoe cases and envelopes. Perfect for giving.
            </p>
          </div>
          <div className="space-y-3 p-4 border-y md:border-y-0 md:border-x border-white/10">
            <h4 className="text-zinc-200 font-bold tracking-widest uppercase text-xs">Aesthetic Sourcing</h4>
            <p className="text-xs leading-relaxed max-w-sm mx-auto">
              Every raw flax linen fiber, Saffiano leather, and Mulberry silk segment is sustainably harvested and certified.
            </p>
          </div>
          <div className="space-y-3 p-4">
            <h4 className="text-zinc-200 font-bold tracking-widest uppercase text-xs">Personal Tailors</h4>
            <p className="text-xs leading-relaxed max-w-sm mx-auto">
              Our professional atelier stylists are standing by 24/7 in chat to guide your sizes, body measurements, and custom cuffs.
            </p>
          </div>
        </div>
        <hr className="border-t border-white/10 mt-12" />
      </section>

      {/* 5. BRAND CRITIQUE RATINGS REVIEWS ROW */}
      <section id="store-reviews" className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center max-w-2xl mx-auto text-center space-y-6">
          <MessageSquare className="w-8 h-8 text-amber-400" />
          <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Style Circles</h2>
          <p className="text-base italic text-zinc-350 leading-relaxed font-sans">
            &ldquo;{reviewsList[activeReviewSlide].text}&rdquo;
          </p>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase text-amber-500 font-sans tracking-widest">
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
                  activeReviewSlide === idx ? 'bg-amber-600 w-5' : 'bg-[#222]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER PROMO BOX */}
      <section id="loyalty-newsletter" className="max-w-7xl mx-auto px-4 py-12">
        <div id="newsletter-card" className="w-full bg-[#0f0f12] rounded-[32px] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="absolute right-0 top-0 w-44 h-44 bg-amber-600/5 rounded-full blur-2xl" />
          
          <div className="space-y-3 flex-1 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">Join the Style Club</h3>
            <p className="text-xs md:text-sm text-zinc-300 max-w-lg leading-relaxed">
              Subscribe for early runway alerts, expert sizing guidelines, and private seasonal member-only secret codes.
            </p>
          </div>

          <div className="w-full max-w-sm">
            {newsletterSubscribed ? (
              <div id="newsletter-joined-banner" className="bg-[#15151a] border border-amber-500/30 rounded-xl p-5 text-center animate-fade-in shadow-xl">
                <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider mb-1.5 font-sans">
                  Welcome to the Club
                </span>
                <p className="text-[11px] text-zinc-350 mb-3 leading-relaxed">
                  Apply this code during checkout to unlock {formatPriceWithCurrency(10, activeCurrency)} off your first elegant design weave:
                </p>
                <div className="bg-[#050505] inline-block font-mono font-bold tracking-widest text-amber-400 border border-white/10 px-4 py-2 rounded-lg text-xs select-all">
                  AURASTYLIST
                </div>
              </div>
            ) : (
              <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow bg-[#050505] text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-amber-500 focus:outline-none placeholder-zinc-500 text-zinc-100"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs font-sans tracking-wide active:scale-[0.98] transition-all cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
            {!newsletterSubscribed && (
              <span className="text-[10px] text-zinc-500 block text-center md:text-left mt-2 pl-2">
                By subscribing, you agree to our privacy guidelines. Unsubscribe anytime.
              </span>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
