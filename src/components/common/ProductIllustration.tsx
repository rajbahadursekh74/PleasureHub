import React from 'react';

interface ProductIllustrationProps {
  productId: string;
  className?: string;
  interactive?: boolean;
}

export const ProductIllustration: React.FC<ProductIllustrationProps> = ({
  productId,
  className = "w-full h-full",
  interactive = true,
}) => {
  // We render highly tailored SVGs representing luxury premium fashion apparel and accessories.
  const baseWrapperClass = `${className} transition-all duration-300 ${
    interactive ? 'hover:scale-[1.03] drop-shadow-[0_15px_15px_rgba(168,85,247,0.1)] hover:drop-shadow-[0_20px_20px_rgba(168,85,247,0.25)]' : ''
  }`;

  switch (productId) {
    case 'classy-oxford-shoes':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="shoes-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#251610" />
              <stop offset="100%" stopColor="#0B0604" />
            </radialGradient>
            <linearGradient id="leather-brown" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A75E38" />
              <stop offset="50%" stopColor="#7E3D1A" />
              <stop offset="100%" stopColor="#411B05" />
            </linearGradient>
            <linearGradient id="sole-gold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#shoes-bg)" />
          {/* Shoe Outline */}
          <g transform="translate(40, -10) scale(0.8)">
            {/* Sole */}
            <path d="M 100 280 C 130 290, 240 290, 280 270 C 310 250, 312 210, 290 200 C 270 190, 240 240, 190 240 C 140 240, 110 220, 100 250 Z" fill="#1C1917" />
            <path d="M 102 284 C 132 294, 238 294, 278 274" stroke="url(#sole-gold)" strokeWidth="3" />
            {/* Shoe Main Body Leather */}
            <path d="M 120 250 C 110 210, 130 150, 180 140 C 230 130, 260 170, 280 190 C 290 200, 295 220, 290 245 C 285 255, 260 268, 220 268 C 170 268, 130 265, 120 250 Z" fill="url(#leather-brown)" />
            {/* Lacing Section, Wingtips & Brogue perforations */}
            <path d="M 180 140 C 190 170, 190 210, 175 230" stroke="#451A03" strokeWidth="4" strokeLinecap="round" />
            <path d="M 180 140 C 175 140, 160 170, 160 190 C 160 210, 175 230, 175 230" fill="#321401" opacity="0.4" />
            {/* Real Shoelaces */}
            <line x1="162" y1="170" x2="185" y2="165" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="160" y1="182" x2="182" y2="177" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="164" y1="194" x2="180" y2="190" stroke="#FFFFFF" strokeWidth="2.5" />
            {/* Polish Gloss Highlight */}
            <path d="M 230 160 C 260 180, 275 200, 285 225" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          </g>
        </svg>
      );

    case 'luxe-trench-coat':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="coat-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1B1724" />
              <stop offset="100%" stopColor="#08060B" />
            </radialGradient>
            <linearGradient id="trench-material" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C7A37C" />
              <stop offset="60%" stopColor="#AA845B" />
              <stop offset="100%" stopColor="#7E5F3B" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#coat-bg)" />
          {/* Double-Breasted Trench Coat Vector structure */}
          <g transform="translate(100, 80) scale(0.5)">
            {/* Sleeves */}
            <path d="M 20 80 Q -30 150, -40 280 H 0 L 20 120" fill="#7E5F3B" />
            <path d="M 380 80 Q 430 150, 440 280 H 400 L 380 120" fill="#7E5F3B" />
            {/* Main coat trunk */}
            <path d="M 80 80 C 80 80, 320 80, 320 80 L 340 400 H 60 Z" fill="url(#trench-material)" />
            {/* Large Lapels */}
            <path d="M 200 160 L 80 60 L 150 200 Z" fill="#906D44" stroke="#5C4427" strokeWidth="2" />
            <path d="M 200 160 L 320 60 L 250 200 Z" fill="#906D44" stroke="#5C4427" strokeWidth="2" />
            {/* Tailored Belt with gold-colored loop */}
            <rect x="70" y="240" width="260" height="25" fill="#5C4427" rx="3" />
            <rect x="180" y="235" width="40" height="35" rx="4" fill="none" stroke="#FBBF24" strokeWidth="4" />
            {/* Double buttons rows */}
            <circle cx="130" cy="150" r="10" fill="#3A2814" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="270" cy="150" r="10" fill="#3A2814" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="130" cy="200" r="10" fill="#3A2814" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="270" cy="200" r="10" fill="#3A2814" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="130" cy="290" r="10" fill="#3A2814" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="270" cy="290" r="10" fill="#3A2814" stroke="#FBBF24" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'leather-tote-bag':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bag-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E1E2F" />
              <stop offset="100%" stopColor="#0B0B13" />
            </radialGradient>
            <linearGradient id="saffiano-black" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4B5563" />
              <stop offset="60%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="gold-hardware" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#F9A825" />
              <stop offset="100%" stopColor="#F57F17" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#bag-bg)" />
          {/* Luxury Handbag structures */}
          <g transform="translate(100, 70) scale(0.5)">
            {/* Handles arched up */}
            <path d="M 80 180 C 80 20, 320 20, 320 180" stroke="url(#gold-hardware)" strokeWidth="14" fill="none" />
            <path d="M 90 180 C 90 40, 310 40, 310 180" stroke="#111827" strokeWidth="10" fill="none" />
            {/* Bag Body */}
            <path d="M 50 180 L 70 380 Q 200 400 330 380 L 350 180 Z" fill="url(#saffiano-black)" stroke="#030712" strokeWidth="2" />
            {/* Saffiano cross-hatch shading effect */}
            <path d="M 50 180 L 70 380 L 200 180 Z" fill="#FFF" opacity="0.03" />
            {/* Gold Zipper & Buckles */}
            <line x1="50" y1="180" x2="350" y2="180" stroke="url(#gold-hardware)" strokeWidth="8" />
            {/* Gold Lock Ornament hanging */}
            <circle cx="200" cy="220" r="15" fill="url(#gold-hardware)" />
            <rect x="194" y="220" width="12" height="15" fill="url(#gold-hardware)" rx="1" />
            {/* Side stitchings */}
            <path d="M 70 180 L 90 380" stroke="#1F2937" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 330 180 L 310 380" stroke="#1F2937" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        </svg>
      );

    case 'silk-mididress':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="dress-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#301A24" />
              <stop offset="100%" stopColor="#11070C" />
            </radialGradient>
            <linearGradient id="silk-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="60%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#dress-bg)" />
          {/* Midi Slip Cowl Dress Hanging on gold wire */}
          <g transform="translate(110, 60) scale(0.45)">
            {/* Gold Clothes Hanger */}
            <path d="M 200 80 Q 200 20 180 30 Q 170 40 185 50 Q 200 55 200 80" stroke="#FBBF24" strokeWidth="4" fill="none" />
            <path d="M 100 130 L 200 80 L 300 130 Z" stroke="#FBBF24" strokeWidth="4" fill="none" />
            {/* Thin Shoulder Straps */}
            <line x1="130" y1="115" x2="135" y2="170" stroke="#FDA4AF" strokeWidth="2.5" />
            <line x1="270" y1="115" x2="265" y2="170" stroke="#FDA4AF" strokeWidth="2.5" />
            {/* Slinky Silk Cowl-Neck Slip Midi silhouette */}
            <path
              d="M 120 170 C 130 200, 160 210, 200 210 C 240 210, 270 200, 280 170 C 285 240, 290 320, 310 480 C 280 500, 120 500, 90 480 C 110 320, 115 240, 120 170 Z"
              fill="url(#silk-pink)"
            />
            {/* Shading/Fabric Draping curves */}
            <path d="M 140 210 Q 200 250 260 210" stroke="#9F1239" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M 130 250 Q 200 290 270 250" stroke="#9F1239" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M 115 320 Q 200 370 285 320" stroke="#9F1239" strokeWidth="1.5" fill="none" opacity="0.4" />
            {/* High Side Slit */}
            <path d="M 115 380 Q 140 430 150 480" stroke="#FDA4AF" strokeWidth="1" opacity="0.7" />
          </g>
        </svg>
      );

    case 'slimfit-wool-suit':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="suit-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111B2E" />
              <stop offset="100%" stopColor="#050810" />
            </radialGradient>
            <linearGradient id="navy-wool" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#suit-bg)" />
          {/* Formal Suit & Silk Tie Vector */}
          <g transform="translate(100, 80) scale(0.5)">
            {/* Navy Blazer outline */}
            <path d="M 50 100 L 100 400 H 300 L 350 100 Z" fill="url(#navy-wool)" />
            {/* White Dress Shirt V collar */}
            <path d="M 150 100 L 200 220 L 250 100 Z" fill="#F9FAFB" />
            {/* Red Silk Tie */}
            <path d="M 190 150 L 210 150 L 225 310 L 200 340 L 175 310 Z" fill="#DC2626" />
            {/* Lapels */}
            <path d="M 150 100 L 110 240 L 200 240 Z" fill="#1D4ED8" stroke="#1E1B4B" strokeWidth="2.5" />
            <path d="M 250 100 L 290 240 L 200 240 Z" fill="#1D4ED8" stroke="#1E1B4B" strokeWidth="2.5" />
            {/* Pocket square gold badge */}
            <rect x="250" y="200" width="45" height="10" fill="#FBBF24" rx="2" />
          </g>
        </svg>
      );

    case 'linen-casual-shirt':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="160" fill="#0A1612" />
          {/* Folded white linen summer button-down shirt mockup */}
          <g transform="translate(105, 100) scale(0.48)">
            <rect x="20" y="40" width="360" height="280" rx="15" fill="#F8FAFC" />
            <path d="M 200 130 L 110 40 H 290 Z" fill="#E2E8F0" />
            <path d="M 200 130 L 130 40 L 200 90 L 270 40 Z" fill="#F1F5F9" />
            {/* Wooden button tags */}
            <circle cx="200" cy="180" r="6" fill="#D97706" />
            <circle cx="200" cy="230" r="6" fill="#D97706" />
            <circle cx="200" cy="280" r="6" fill="#D97706" />
            {/* Texture stitching */}
            <line x1="200" y1="130" x2="200" y2="320" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
          </g>
        </svg>
      );

    case 'athleisure-tech-jogger':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="160" fill="#1A202C" />
          {/* Folded tech joggers visual */}
          <g transform="translate(120, 80) scale(0.4)">
            <path d="M 100 80 Q 200 100 300 80 L 270 480 H 210 L 200 240 L 190 480 H 130 Z" fill="#4A5568" />
            {/* Neon elastic drawstrings */}
            <path d="M 190 92 Q 185 180 160 200 M 210 92 Q 215 180 240 200" stroke="#4ADE80" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="160" cy="200" r="6" fill="#4ADE80" />
            <circle cx="240" cy="200" r="6" fill="#4ADE80" />
            {/* Side tech zippers */}
            <line x1="255" y1="150" x2="245" y2="210" stroke="#1A202C" strokeWidth="3" />
          </g>
        </svg>
      );

    case 'designer-kurtiset':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="kurti-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#14211D" />
              <stop offset="100%" stopColor="#070C0A" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#kurti-bg)" />
          {/* Festive Kurti Embroidered Outline */}
          <g transform="translate(100, 60) scale(0.5)">
            <path d="M 120 120 L 70 200 H 130 L 140 450 H 260 L 270 200 H 330 L 280 120 Z" fill="#319795" />
            {/* White Chikankari floral embroidery on neckline */}
            <path d="M 160 120 Q 200 220 240 120" stroke="#E2E8F0" strokeWidth="5" fill="none" />
            <path d="M 180 140 M 175 160 Q 200 190 225 160" stroke="#FFF" strokeWidth="2" fill="none" strokeDasharray="3 3" />
            <circle cx="200" cy="180" r="8" fill="#FBBF24" />
            <circle cx="180" cy="160" r="5" fill="#E2E8F0" />
            <circle cx="220" cy="160" r="5" fill="#E2E8F0" />
            {/* Dupatta drape scarf across shoulders */}
            <path d="M 80 150 Q 200 320 320 220" stroke="#81E6D9" strokeWidth="12" fill="none" opacity="0.6" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'minimalist-aviator-glasses':
      return (
        <svg viewBox="0 0 400 400" className={baseWrapperClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="glasses-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2D2214" />
              <stop offset="100%" stopColor="#0D0905" />
            </radialGradient>
            <linearGradient id="gold-metal-frame" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="tinted-lens" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#glasses-bg)" />
          {/* Classic Gold Aviator Frames */}
          <g transform="translate(60, 40) scale(0.7)">
            {/* Left teardrop lens */}
            <path d="M 70 200 C 70 140, 180 145, 180 200 C 180 250, 110 270, 70 240 C 50 225, 70 210, 70 200 Z" fill="url(#tinted-lens)" stroke="url(#gold-metal-frame)" strokeWidth="4" />
            {/* Right teardrop lens */}
            <path d="M 220 200 C 220 145, 330 140, 330 200 C 330 210, 350 225, 330 240 C 290 270, 220 250, 220 200 Z" fill="url(#tinted-lens)" stroke="url(#gold-metal-frame)" strokeWidth="4" />
            {/* Left polarized highlight reflects */}
            <path d="M 85 180 C 110 170, 150 175, 165 200" stroke="#FFF" strokeWidth="2.5" opacity="0.15" />
            <path d="M 235 180 C 260 170, 300 175, 315 200" stroke="#FFF" strokeWidth="2.5" opacity="0.15" />
            {/* Double nasal bridge and temples */}
            <line x1="180" y1="185" x2="220" y2="185" stroke="url(#gold-metal-frame)" strokeWidth="3" />
            <line x1="180" y1="197" x2="220" y2="197" stroke="url(#gold-metal-frame)" strokeWidth="3" />
            {/* Temples sides */}
            <line x1="70" y1="190" x2="20" y2="180" stroke="url(#gold-metal-frame)" strokeWidth="3" strokeLinecap="round" />
            <line x1="330" y1="190" x2="380" y2="180" stroke="url(#gold-metal-frame)" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#1C1917" />
          <circle cx="50" cy="50" r="30" fill="#A78BFA" opacity="0.3" />
          <path d="M 50 35 L 65 60 H 35 L 50 35 Z" fill="#8B5CF6" />
        </svg>
      );
  }
};
