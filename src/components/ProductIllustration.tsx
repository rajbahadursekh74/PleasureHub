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
  // We render highly tailored SVGs representing luxury intimate wellness products.
  switch (productId) {
    case 'sona-2-cruise':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03] drop-shadow-[0_15px_15px_rgba(139,92,246,0.15)] hover:drop-shadow-[0_20px_20px_rgba(139,92,246,0.3)]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sona-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E153A" />
              <stop offset="100%" stopColor="#0B071F" />
            </radialGradient>
            <linearGradient id="sona-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="60%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
            <linearGradient id="sona-bezel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <radialGradient id="sona-interior" id-link="sona-body-dark" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#1E0A3C" />
            </radialGradient>
            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Underlay ambient lighting */}
          <circle cx="200" cy="200" r="160" fill="url(#sona-bg)" />
          <circle cx="200" cy="220" r="80" fill="#8B5CF6" opacity="0.12" filter="url(#soft-glow)" />

          {/* Floating Luxury Device Chassis */}
          <g>
            {/* Main Rounded Ergonomic Shell */}
            <path
              d="M100 200 C100 130, 300 120, 310 180 C320 230, 240 280, 200 280 C130 280, 100 270, 100 200 Z"
              fill="url(#sona-body)"
            />

            {/* Shadow of details */}
            <path
              d="M100 200 C110 230, 150 260, 200 280 C140 270, 110 240, 100 200 Z"
              fill="#3B0764"
              opacity="0.3"
            />

            {/* Gold Interface / Accent Bezel ring */}
            <ellipse cx="200" cy="180" rx="45" ry="25" fill="none" stroke="url(#sona-bezel)" strokeWidth="6" />

            {/* Sonic Wave Chamber Opening */}
            <ellipse cx="200" cy="180" rx="36" ry="18" fill="url(#sona-interior)" />
            <circle cx="200" cy="180" r="10" fill="#0F0624" opacity="0.6" />

            {/* Subtle Metallic Highlight lines */}
            <path
              d="M 125 185 C 150 160, 250 150, 290 170"
              stroke="#DDD6FE"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Interactive LED button (S) */}
            <circle cx="210" cy="250" r="8" fill="#F43F5E" opacity="0.8" filter="url(#soft-glow)" />
            <circle cx="230" cy="245" r="5" fill="#A78BFA" opacity="0.7" />
            <circle cx="190" cy="253" r="5" fill="#A78BFA" opacity="0.7" />
          </g>
        </svg>
      );

    case 'enigma-wave':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03] drop-shadow-[0_15px_15px_rgba(244,63,94,0.15)] hover:drop-shadow-[0_20px_20px_rgba(244,63,94,0.3)]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="enigma-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2A1728" />
              <stop offset="100%" stopColor="#0E0713" />
            </radialGradient>
            <linearGradient id="rose-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCA5A5" />
              <stop offset="35%" stopColor="#F472B6" />
              <stop offset="70%" stopColor="#BE185D" />
              <stop offset="100%" stopColor="#500724" />
            </linearGradient>
            <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="30%" stopColor="#FEF3C7" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <filter id="enigma-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Underlay Ambient */}
          <circle cx="200" cy="200" r="160" fill="url(#enigma-bg)" />
          <ellipse cx="200" cy="230" rx="90" ry="40" fill="#EB4899" opacity="0.1" filter="url(#enigma-glow)" />

          {/* Golden base ring overlay */}
          <circle cx="200" cy="200" r="110" stroke="url(#gold-metal)" strokeWidth="3" opacity="0.3" strokeDasharray="10 5" />

          {/* Enigma Wave overlapping loop curves */}
          <path
            d="M 120 220 C 120 120, 280 120, 280 220 C 280 320, 210 320, 200 300 C 190 280, 240 240, 240 200 C 240 160, 160 160, 160 200 C 160 240, 130 260, 120 220 Z"
            fill="url(#rose-gold)"
          />

          {/* Inner Golden Ribbed core */}
          <path
            d="M 175 195 C 185 180, 215 180, 225 195 C 220 215, 180 215, 175 195 Z"
            fill="url(#gold-metal)"
            opacity="0.9"
          />

          {/* Soft light reflects */}
          <path
            d="M 140 190 C 150 150, 250 150, 260 190"
            stroke="#FFF5F7"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 190 285 C 210 295, 230 290, 245 270"
            stroke="#FFF5F7"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </svg>
      );

    case 'aria-premium':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03] drop-shadow-[0_15px_15px_rgba(167,139,250,0.2)] hover:drop-shadow-[0_20px_20px_rgba(167,139,250,0.35)]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="aria-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1B1229" />
              <stop offset="100%" stopColor="#08040F" />
            </radialGradient>
            <linearGradient id="aria-obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4B5563" />
              <stop offset="15%" stopColor="#1F2937" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>
            <linearGradient id="aria-gold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FFA000" />
              <stop offset="100%" stopColor="#B71C1C" />
            </linearGradient>
            <filter id="magical-mist" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feColorMatrix type="matrix" values="1 0 0 0 0.5  0 1 0 0 0.2  0 0 1 0 0.9  0 0 0 0.4 0" />
            </filter>
            <filter id="aria-led-glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Underlay Ambient Backlight */}
          <circle cx="200" cy="200" r="160" fill="url(#aria-bg)" />

          {/* Purple Mist/Fog effects matching the picture */}
          <ellipse cx="200" cy="310" rx="130" ry="70" fill="#C084FC" opacity="0.3" filter="url(#magical-mist)" />
          <ellipse cx="200" cy="90" rx="50" ry="25" fill="#818CF8" opacity="0.2" filter="url(#magical-mist)" />

          {/* Premium Pedestal Platform */}
          <ellipse cx="200" cy="320" rx="90" ry="18" fill="#1F1332" stroke="#8B5CF6" strokeWidth="2.5" />
          <ellipse cx="200" cy="324" rx="80" ry="12" fill="#0C0517" />

          {/* Obsidian Body (Aria Premium wand stick) */}
          <g>
            {/* The primary vertical luxury wand shaft */}
            <path
              d="M 185 300 L 190 120 Q 192 100 200 100 Q 208 100 210 120 L 215 300 C 215 315, 185 315, 185 300 Z"
              fill="url(#aria-obsidian)"
            />

            {/* Highly polished reflex shine along the edge */}
            <path
              d="M 188 290 L 192 122 Q 193 110, 200 110"
              stroke="#F3F4F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.3"
            />

            {/* Glowing heartbeat bio-sensor light lines */}
            <path
              d="M 197 140 L 199 220"
              stroke="#D946EF"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#aria-led-glow)"
              opacity="0.85"
            />
            <path
              d="M 203 160 L 204 200"
              stroke="#A78BFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#aria-led-glow)"
              opacity="0.7"
            />

            {/* Gold accents bands */}
            <path d="M 188 240 C 195 243, 205 243, 212 240" stroke="url(#aria-gold)" strokeWidth="4" />
            <path d="M 189 255 C 196 258, 204 258, 211 255" stroke="url(#aria-gold)" strokeWidth="3" />

            {/* Bottom weighted jewel */}
            <path d="M 192 305 C 196 312, 204 312, 208 305" fill="url(#aria-gold)" />
          </g>
        </svg>
      );

    case 'luna-silk-ii':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03] drop-shadow-[0_15px_15px_rgba(251,191,36,0.1)] hover:drop-shadow-[0_20px_20px_rgba(251,191,36,0.25)]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="luna-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2A2420" />
              <stop offset="100%" stopColor="#0F0C0A" />
            </radialGradient>
            <linearGradient id="luna-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="silk-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F3F4F6" />
              <stop offset="100%" stopColor="#D1D5DB" />
            </linearGradient>
            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Underlay Ambient */}
          <circle cx="200" cy="200" r="160" fill="url(#luna-bg)" />
          <ellipse cx="200" cy="240" rx="70" ry="30" fill="#FBBF24" opacity="0.08" filter="blur(16px)" />

          {/* Luxury Silk Pebble Egg */}
          <g filter="url(#soft-shadow)">
            {/* Elegant egg silhouette rotated slightly like an egg jewel */}
            <path
              d="M150 150 C120 200, 140 280, 200 280 C260 280, 280 200, 250 150 C220 100, 180 100, 150 150 Z"
              fill="url(#silk-body)"
            />

            {/* Symmetric Golden Intimate Core Band */}
            <path
              d="M175 125 C190 120, 210 120, 225 125 C230 145, 170 145, 175 125 Z"
              fill="url(#luna-gold)"
            />

            {/* Embedded Small Golden Button */}
            <circle cx="200" cy="180" r="10" fill="url(#luna-gold)" />
            <circle cx="200" cy="180" r="13" stroke="url(#luna-gold)" strokeWidth="1.5" opacity="0.5" />

            {/* Subtle soft edge reflections */}
            <path
              d="M 148 165 C 135 210, 160 265, 200 275"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        </svg>
      );

    case 'solitaire-aura':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="160" fill="#0D1127" />
          <ellipse cx="200" cy="230" rx="80" ry="30" fill="#3B82F6" opacity="0.15" filter="blur(15px)" />
          {/* Wave ring stimulator design */}
          <ellipse cx="200" cy="200" rx="90" ry="45" fill="none" stroke="#60A5FA" strokeWidth="14" />
          <ellipse cx="200" cy="200" rx="90" ry="45" fill="none" stroke="#2563EB" strokeWidth="6" />
          <circle cx="120" cy="180" r="15" fill="#3B82F6" opacity="0.9" />
          <circle cx="120" cy="180" r="6" fill="#FFFFFF" />
        </svg>
      );

    case 'midnight-bloom':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="160" fill="#1A1024" />
          {/* Glass Candle Jars with Purple glow and flame */}
          <rect x="140" y="160" width="120" height="150" rx="12" fill="#2E1E3F" stroke="#E9D5FF" strokeWidth="2" />
          <rect x="155" y="150" width="90" height="10" rx="3" fill="#D8B4FE" />
          {/* Liquid wax */}
          <rect x="142" y="180" width="116" height="128" fill="#4A2052" opacity="0.8" />
          {/* Wick and glowing flame */}
          <line x1="200" y1="180" x2="200" y2="160" stroke="#FBBF24" strokeWidth="3" />
          <path d="M190 145 C190 120, 210 120, 210 145 C210 160, 190 160, 190 145 Z" fill="#F59E0B" filter="blur(1px)" />
          <path d="M195 142 C195 130, 205 130, 205 142 C205 150, 195 150, 195 142 Z" fill="#FEF3C7" />
        </svg>
      );

    case 'ethereal-air':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="160" fill="#0C0A1A" />
          {/* Sonic egg wave device */}
          <path d="M140 220 C140 140, 260 140, 260 220 C260 280, 140 280, 140 220 Z" fill="#3B0764" />
          <circle cx="200" cy="220" r="50" fill="none" stroke="#C084FC" strokeWidth="6" opacity="0.8" />
          {/* Ripples */}
          <circle cx="200" cy="220" r="70" fill="none" stroke="#C084FC" strokeWidth="2" opacity="0.4" />
          <circle cx="200" cy="220" r="90" fill="none" stroke="#C084FC" strokeWidth="1" opacity="0.2" />
        </svg>
      );

    case 'velvet-nectar-duo':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="160" fill="#1F151B" />
          {/* Twin Pink Satin Lube Bottles */}
          <rect x="130" y="150" width="60" height="180" rx="15" fill="#DB2777" opacity="0.8" />
          <rect x="145" y="130" width="30" height="20" rx="2" fill="#F472B6" />
          <rect x="210" y="170" width="60" height="160" rx="15" fill="#EC4899" opacity="0.9" />
          <rect x="225" y="150" width="30" height="20" rx="2" fill="#F472B6" />
        </svg>
      );

    case 'provocateur-lace':
      return (
        <svg
          viewBox="0 0 400 400"
          className={`${className} transition-all duration-300 ${
            interactive ? 'hover:scale-[1.03]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="160" fill="#0C070D" />
          {/* Elegantly Vectorized Corset/Lace graphic on background */}
          <path d="M140 120 L160 300 H240 L260 120 C230 160, 170 160, 140 120 Z" fill="#4C0519" opacity="0.4" />
          <path d="M140 120 L160 300 H240 L260 120 C230 160, 170 160, 140 120 Z" fill="none" stroke="#F43F5E" strokeWidth="4" />
          {/* Laced elements */}
          <line x1="170" y1="180" x2="230" y2="240" stroke="#F43F5E" strokeWidth="2" />
          <line x1="230" y1="180" x2="170" y2="240" stroke="#F43F5E" strokeWidth="2" />
          <line x1="165" y1="210" x2="235" y2="270" stroke="#F43F5E" strokeWidth="2" />
          <line x1="235" y1="210" x2="165" y2="270" stroke="#F43F5E" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="8" fill="#1C1917" />
          <circle cx="50" cy="50" r="30" fill="#A78BFA" opacity="0.3" />
          <path d="M50 35 L65 60 H35 L50 35 Z" fill="#8B5CF6" />
        </svg>
      );
  }
};
