import React from 'react';
import { Filter, Star, ShieldCheck, Heart, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Product, CategoryId } from '../types';
import { ProductIllustration } from './ProductIllustration';
import { CurrencyConfig, formatPriceWithCurrency } from '../utils/currency';

interface CategoryViewProps {
  products: Product[];
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  setSelectedProduct: (p: Product) => void;
  setActiveView: (view: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  searchTerm: string;
  activeCurrency: CurrencyConfig;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  setSelectedProduct,
  setActiveView,
  wishlist,
  toggleWishlist,
  searchTerm,
  activeCurrency,
}) => {
  const [selectedPriceRanges, setSelectedPriceRanges] = React.useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = React.useState<string>('all');
  const [selectedMaterials, setSelectedMaterials] = React.useState<string[]>([]);
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null);
  const [sortOption, setSortOption] = React.useState<string>('featured');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  // Derive available brands and materials
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];

  // Map categories to headers & descriptions
  const CATEGORY_META: { [key in CategoryId]: { title: string; desc: string } } = {
    all: {
      title: 'The Full Spectrum',
      desc: 'Explore our complete sanctuary of premium biological devices, sheer lace wear, and botanical formulas, meticulously curated for refined adults.'
    },
    toys: {
      title: 'Adult Toys',
      desc: 'Discover a curated sanctuary of intimate wellness. Our collection blends cutting-edge technology with sophisticated design for unparalleled sensory experiences.'
    },
    couples: {
      title: 'Couples Products',
      desc: 'Synchronized dual simulators, ergonomic shared shapes, and coordinate bundles crafted to deepen connection and unify visual sensory states.'
    },
    massagers: {
      title: 'Personal Massagers',
      desc: 'Wands and pebbles coated with organic satin silicone, powered by whisper-quiet high frequency motors for target relief and localized sensory release.'
    },
    lubricants: {
      title: 'Lubricants & Oils',
      desc: 'Botanical formulations, body-safe melting massage oils, and pH-balanced intimate fluids that dry completely clear with zero non-sticky residue.'
    },
    lingerie: {
      title: 'Intimate Apparel',
      desc: 'Intricately structured French lace bodysuits, sheer mesh wear, and heavy mulberry silk straps designed to outline and celebrate anatomical elegance.'
    },
    men: {
      title: "Men's Cabinet",
      desc: 'Precision engineered physical stimulators and daily performance formulations targeted directly at men’s aesthetic pleasure and toning.'
    },
    women: {
      title: "Women's Collection",
      desc: 'Advanced biomechanic pulse units, clitoral sonic transducers, and pelvic floor toning arrays engineered entirely by women, for women.'
    },
    accessories: {
      title: 'Accessories & Care',
      desc: 'USB quick chargers, travel storage pods, dynamic sanitizers, and accessory kits designed to preserve high fidelity wellness equipment.'
    }
  };

  const handlePriceRangeToggle = (range: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
    setCurrentPage(1);
  };

  const handleMaterialToggle = (mat: string) => {
    setSelectedMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
    setCurrentPage(1);
  };

  const filterPrice = (p: Product) => {
    if (selectedPriceRanges.length === 0) return true;
    return selectedPriceRanges.some(range => {
      if (range === 'under50') return p.price < 50;
      if (range === '50-150') return p.price >= 50 && p.price <= 150;
      if (range === '150-300') return p.price >= 150 && p.price <= 300;
      if (range === '300plus') return p.price > 300;
      return true;
    });
  };

  const filterMaterial = (p: Product) => {
    if (selectedMaterials.length === 0) return true;
    return p.materials.some(m => selectedMaterials.includes(m));
  };

  // Process the full pipeline: categorization -> searching -> sidebar metrics parameters
  const filteredProducts = products.filter(p => {
    // 1. Category filter
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    
    // 2. Search query filter
    const matchesSearch = !searchTerm
      ? true
      : p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

    // 3. Price sidebar parameter
    const matchesPrice = filterPrice(p);

    // 4. Brand sidebar parameter
    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;

    // 5. Material selection
    const matchesMat = filterMaterial(p);

    // 6. Rating selection
    const matchesRating = selectedRating === null ? true : p.rating >= selectedRating;

    return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesMat && matchesRating;
  });

  // Sort Pipeline
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'low-to-high') return a.price - b.price;
    if (sortOption === 'high-to-low') return b.price - a.price;
    if (sortOption === 'highly-rated') return b.rating - a.rating;
    // Featured / New defaults
    return b.reviewCount - a.reviewCount;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedBrand('all');
    setSelectedMaterials([]);
    setSelectedRating(null);
    setCurrentPage(1);
  };

  const relativeCollections = [
    { label: 'Intimate Apparel', cat: 'lingerie' },
    { label: 'Massage Oils & Balms', cat: 'lubricants' },
    { label: 'Bedroom Tech', cat: 'toys' },
    { label: 'Couples Bundles', cat: 'couples' },
    { label: 'Eco-Friendly Range', cat: 'toys' }
  ];

  return (
    <div id="category-catalog-container" className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-zinc-100 bg-[#0B0813]">
      
      {/* 1. TOP INDEX NAVIGATION HISTORY BREADCRUMBS */}
      <div id="breadcrumbs" className="flex items-center gap-2 text-xs text-zinc-500 font-mono tracking-wide uppercase mb-6">
        <span className="hover:text-zinc-300 cursor-pointer" onClick={() => setActiveView('home')}>Home</span>
        <span>/</span>
        <span className="hover:text-zinc-300 cursor-pointer" onClick={() => setSelectedCategory('all')}>Collections</span>
        {selectedCategory !== 'all' && (
          <>
            <span>/</span>
            <span className="text-zinc-300 font-bold">{CATEGORY_META[selectedCategory].title}</span>
          </>
        )}
      </div>

      {/* 2. DYNAMIC RICH CATEGORY TITLE AND BRIEF */}
      <div id="category-intro-section" className="mb-10 max-w-4xl space-y-4">
        <h1 className="text-4xl md:text-5.5xl font-serif font-black tracking-tight leading-tight bg-gradient-to-r from-white via-violet-100 to-zinc-200 bg-clip-text text-transparent">
          {CATEGORY_META[selectedCategory].title}
        </h1>
        <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
          {CATEGORY_META[selectedCategory].desc}
        </p>
      </div>

      {/* 3. DENSE BARRIER LEVEL CONTROLS FOR MOBILES */}
      <div id="inline-controls-panel" className="w-full flex items-center justify-between border-y border-violet-950/40 py-4 mb-8">
        <button
          id="btn-mobile-filters-trigger"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="md:hidden flex items-center gap-2 px-4 py-2 border border-violet-900 rounded-full text-xs font-mono font-bold tracking-wider text-violet-300 bg-violet-950/25 cursor-pointer uppercase"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filter & Sort
        </button>

        <span id="product-results-counter" className="hidden sm:inline text-xs text-zinc-400 font-mono tracking-wider bg-violet-950/30 px-3 py-1.5 rounded border border-violet-950/50">
          Showing <strong className="text-violet-300">{sortedProducts.length}</strong> luxurious matches
        </span>

        {/* Sort selector dropdown */}
        <div id="sort-dropdown-box" className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500 hidden sm:inline">Sort By:</span>
          <div className="relative">
            <select
              id="select-sort-options"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-[#140F24] border border-violet-950/80 rounded-lg py-2 pl-4 pr-10 hover:border-violet-600 focus:outline-none text-zinc-300 cursor-pointer"
            >
              <option value="featured">Featured / Ratings</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="highly-rated">Client Satisfaction</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4.5 h-4.5 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. MAIN LAYOUT GRID (Sidebar + Product listing card grid) */}
      <div id="main-catalog-framework" className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTER CRITERIA */}
        <aside
          id="desktop-sidebar-filters"
          className={`${
            mobileFiltersOpen ? 'fixed inset-0 z-50 bg-[#0B0813] p-6 overflow-y-auto block' : 'hidden'
          } md:block space-y-8 pr-4 border-r border-violet-950/20`}
        >
          {/* Mobile Filter Sheet Header */}
          {mobileFiltersOpen && (
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-6">
              <h3 className="text-lg font-serif font-bold text-white">Refine Intimacies</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-zinc-400 hover:text-white uppercase font-mono text-xs font-black"
              >
                Close ×
              </button>
            </div>
          )}

          {/* Section A: Price range checkbox */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-violet-400 font-mono">Price Range</h4>
            <div className="space-y-3">
              {[
                { id: 'under50', label: `Under ${formatPriceWithCurrency(50, activeCurrency)}` },
                { id: '50-150', label: `${formatPriceWithCurrency(50, activeCurrency)} - ${formatPriceWithCurrency(150, activeCurrency)}` },
                { id: '150-300', label: `${formatPriceWithCurrency(150, activeCurrency)} - ${formatPriceWithCurrency(300, activeCurrency)}` },
                { id: '300plus', label: `${formatPriceWithCurrency(300, activeCurrency)}+` }
              ].map(pItem => (
                <label key={pItem.id} className="flex items-center gap-3 cursor-pointer group text-xs text-zinc-400 hover:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(pItem.id)}
                    onChange={() => handlePriceRangeToggle(pItem.id)}
                    className="w-4 h-4 rounded border-violet-950 bg-[#160F2B] text-fuchsia-600 focus:ring-fuchsia-500accent-pink"
                  />
                  <span>{pItem.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section B: Brand Dropdown picker */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-violet-400 font-mono">Brand</h4>
            <div className="relative">
              <select
                id="brand-filter-select"
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="w-full appearance-none bg-[#140F24] border border-violet-950/80 rounded-lg py-2 pl-4 pr-10 hover:border-violet-600 focus:outline-none text-zinc-300 text-xs font-mono"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand} className="uppercase">
                    {brand === 'all' ? 'All Brands' : brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
          </div>

          {/* Section C: Material Selection Pills */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-violet-400 font-mono">Material Selection</h4>
            <div className="flex flex-wrap gap-2">
              {['Medical Silicone', 'ABS Polymer', 'Metallic', 'Glass'].map(mat => {
                const isActive = selectedMaterials.includes(mat);
                return (
                  <button
                    key={mat}
                    onClick={() => handleMaterialToggle(mat)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-violet-900 border-violet-500 text-white shadow-lg shadow-violet-500/25'
                        : 'border-violet-950 bg-[#160F2F]/20 text-zinc-400 hover:border-violet-850 hover:text-zinc-200'
                    }`}
                  >
                    {mat.replace('Medical ', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section D: Customer Rating Checklist */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-violet-400 font-mono">Satisfaction Rating</h4>
            <div className="space-y-2">
              {[4, 4.5, 4.8].map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedRating(selectedRating === st ? null : st)}
                  className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg border transition-all duration-200 text-left cursor-pointer ${
                    selectedRating === st
                      ? 'border-fuchsia-500 bg-fuchsia-950/20 text-fuchsia-300'
                      : 'border-violet-950/45 hover:bg-violet-950/20 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{st} & Up</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">Select</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters Option */}
          <button
            onClick={resetAllFilters}
            className="w-full py-2.5 rounded-lg border border-red-950/50 hover:bg-red-950/20 text-red-400/90 hover:text-red-300 text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-200 mt-6 cursor-pointer"
          >
            Clear Filters
          </button>
        </aside>

        {/* 5. DYNAMIC PRODUCT GRID SECTION */}
        <section id="category-products-panel" className="md:col-span-3 space-y-12">
          {sortedProducts.length === 0 ? (
            <div id="no-products-fallout" className="w-full border border-dashed border-violet-950 p-16 rounded-3xl text-center space-y-4">
              <span className="text-3xl block">🔍</span>
              <h3 className="text-lg font-serif font-bold text-white">No intimate matches found</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                No items align with your active combinations of prices, materials, or brands. Clear your sidebar refiners or try a different collection.
              </p>
              <button
                onClick={resetAllFilters}
                className="py-2.5 px-6 rounded-full bg-violet-900 hover:bg-violet-850 text-white font-mono text-xs uppercase tracking-widest transition-colors duration-200 mt-2 cursor-pointer"
              >
                Clear Sidebar Refiners
              </button>
            </div>
          ) : (
            <div id="products-catalog-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((p) => {
                const isWishlisted = wishlist.includes(p.id);
                return (
                  <div
                    key={p.id}
                    id={`catalog-card-${p.id}`}
                    className="group relative bg-[#120F24]/40 border border-violet-950/40 rounded-2xl p-4 flex flex-col justify-between hover:border-violet-600/70 hover:shadow-[0_12px_24px_rgba(139,92,246,0.12)] transition-all duration-300"
                  >
                    {/* Visual canvas */}
                    <div
                      id={`canvas-panel-${p.id}`}
                      onClick={() => handleProductClick(p)}
                      className="aspect-square w-full rounded-xl bg-[#090614]/85 border border-violet-950/20 flex flex-col items-center justify-center relative cursor-pointer group-hover:scale-[1.01] transition-transform duration-300 overflow-hidden"
                    >
                      {/* Badge options exactly matching screenshot 1 banner style */}
                      {p.isBestSeller && (
                        <span className="absolute top-2.5 left-2.5 bg-[#8B5CF6] text-white font-mono uppercase text-[9px] font-bold px-2.5 py-0.5 rounded tracking-widest z-10">
                          Best Seller
                        </span>
                      )}
                      
                      {p.isLimited && (
                        <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white font-mono uppercase text-[9px] font-bold px-2.5 py-0.5 rounded tracking-widest z-10">
                          Limited Edition
                        </span>
                      )}

                      <div className="w-40 h-40">
                        <ProductIllustration productId={p.id} interactive={true} />
                      </div>
                    </div>

                    {/* Wishlist and detailed trigger lines */}
                    <button
                      id={`catalog-wishlist-trigger-${p.id}`}
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-6 right-6 p-2 rounded-full cursor-pointer backdrop-blur-md border bg-zinc-950/60 hover:bg-zinc-900 border-zinc-800/40 text-zinc-300 hover:text-rose-500 transition-colors z-20 shadow-md"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Text Details */}
                    <div className="mt-4 flex flex-col gap-1 flex-1 justify-between">
                      <div className="cursor-pointer" onClick={() => handleProductClick(p)}>
                        <h3 className="text-sm font-serif font-bold text-zinc-100 uppercase tracking-wider group-hover:text-fuchsia-400 transition-colors truncate">
                          {p.name}
                        </h3>
                        {/* Rating row matching first screenshot stars line */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <div className="flex text-amber-500">
                            {[1, 2, 3, 4, 5].map(starIdx => (
                              <Star
                                key={starIdx}
                                className={`w-3 h-3 ${p.rating >= starIdx ? 'fill-amber-500 text-amber-500' : 'text-zinc-700'}`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 font-bold">
                            ({p.reviewCount > 1000 ? `${(p.reviewCount/1000).toFixed(1)}K` : p.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Discreet Tag matching exact screenshots label */}
                      {p.discreetShipping && (
                        <p className="flex items-center gap-1 font-mono uppercase text-[9.5px] font-bold text-zinc-500 tracking-wider mt-1 border-t border-violet-950/20 pt-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Discreet Shipping</span>
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-2">
                        <span className="text-base font-serif font-black text-zinc-200">
                          {formatPriceWithCurrency(p.price, activeCurrency)}
                        </span>
                        <button
                          id={`catalog-detail-trigger-${p.id}`}
                          onClick={() => handleProductClick(p)}
                          className="cursor-pointer px-3.5 py-1.5 bg-[#170E2F] hover:bg-violet-650 text-fuchsia-300 border border-violet-850/60 hover:text-white rounded text-[10.5px] font-mono font-semibold uppercase tracking-wider transition-colors duration-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SPREAD MODERN PAGINATION NUMBERS exactly matching screenshot 1 layout */}
          <div id="pagination-panel" className="w-full flex justify-center items-center gap-2 mt-12 py-6 border-t border-violet-950/30">
            <button className="px-3 py-2 border border-violet-950 bg-[#160D2D]/35 rounded hover:border-violet-600 text-zinc-400 hover:text-white font-mono text-xs">
              &lt;
            </button>
            <button className="px-4 py-2 bg-gradient-to-tr from-violet-600 to-fuchsia-500 border border-violet-500 rounded text-white font-mono font-bold text-xs select-none">
              1
            </button>
            <button className="px-4 py-2 border border-violet-950 bg-[#160D2D]/35 rounded hover:border-violet-600 text-zinc-403 hover:text-white font-mono text-xs transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-violet-950 bg-[#160D2D]/35 rounded hover:border-violet-600 text-zinc-403 hover:text-white font-mono text-xs transition-colors">
              3
            </button>
            <span className="px-2 font-mono text-zinc-650">...</span>
            <button className="px-4 py-2 border border-violet-950 bg-[#160D2D]/35 rounded hover:border-violet-600 text-zinc-403 hover:text-white font-mono text-xs transition-colors">
              12
            </button>
            <button className="px-3 py-2 border border-violet-950 bg-[#160D2D]/35 rounded hover:border-violet-600 text-zinc-404 hover:text-white font-mono text-xs">
              &gt;
            </button>
          </div>
        </section>
      </div>

      {/* 6. RELATED COLLECTIONS STRIP AT BOTTOM */}
      <section id="related-collections-bar" className="w-full mt-20 space-y-6">
        <h3 className="text-xl font-serif font-black text-white text-center">Related Collections</h3>
        <div id="relative-tags" className="flex flex-wrap justify-center items-center gap-3">
          {relativeCollections.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(tag.cat as CategoryId)}
              className="px-6 py-3 border border-zinc-900 bg-[#0A0713]/55 hover:bg-violet-950/15 text-zinc-300 hover:text-white rounded-full font-serif text-sm tracking-wide hover:border-violet-750 cursor-pointer duration-300"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
