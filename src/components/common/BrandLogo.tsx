import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
  mode?: 'default' | 'image-only' | 'stacked';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  onClick,
  mode = 'default'
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const sizeConfig = {
    sm: {
      img: 'w-9 h-9',
      fullImg: 'h-10 w-auto',
      title: 'text-sm sm:text-base',
      tagline: 'text-[8.5px]',
      gap: 'gap-2.5'
    },
    md: {
      img: 'w-11 h-11 sm:w-12 sm:h-12',
      fullImg: 'h-12 sm:h-14 w-auto',
      title: 'text-lg sm:text-xl',
      tagline: 'text-[10px]',
      gap: 'gap-3'
    },
    lg: {
      img: 'w-16 h-16 sm:w-20 sm:h-20',
      fullImg: 'h-20 sm:h-24 w-auto',
      title: 'text-2xl sm:text-3xl',
      tagline: 'text-xs sm:text-sm',
      gap: 'gap-4'
    },
    xl: {
      img: 'w-24 h-24 sm:w-32 sm:h-32',
      fullImg: 'h-32 sm:h-40 w-auto',
      title: 'text-3xl sm:text-4xl',
      tagline: 'text-sm sm:text-base',
      gap: 'gap-5'
    }
  }[size];

  if (mode === 'image-only') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      >
        <img
          src="/logo.png"
          alt="ELA Digital World Logo"
          className={`${sizeConfig.fullImg} object-contain rounded-2xl drop-shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-transform duration-300 group-hover:scale-105`}
        />
      </div>
    );
  }

  return (
    <div
      id="brand-logo"
      onClick={onClick}
      className={`inline-flex ${mode === 'stacked' ? 'flex-col items-center text-center' : 'items-center'} ${sizeConfig.gap} select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* 3D Earth Globe & Orbital Arrow Emblem from the Official Logo */}
      <div className="relative flex-shrink-0">
        {!imgFailed ? (
          <img
            src="/logo.png"
            alt="ELA Digital World Logo"
            onError={() => setImgFailed(true)}
            className={`${sizeConfig.img} object-contain rounded-xl drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-transform duration-300 group-hover:scale-105`}
          />
        ) : (
          /* High-Precision Vector SVG Fallback */
          <svg
            className={`${sizeConfig.img} drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]`}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="svgGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B2" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="svgCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#030712" stroke="#1E293B" strokeWidth="2" />
            <ellipse cx="50" cy="50" rx="42" ry="18" stroke="url(#svgCyan)" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="3 3" />
            <ellipse cx="50" cy="50" rx="46" ry="16" transform="rotate(-30 50 50)" stroke="url(#svgGold)" strokeWidth="3" />
            <circle cx="89" cy="27" r="4" fill="#FFF2B2" />
            <path d="M40 33H62M40 50H56M40 67H62M40 33V67" stroke="url(#svgGold)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Official Typography Styled Exactly as the Logo */}
      <div className={`flex flex-col justify-center leading-none ${mode === 'stacked' ? 'items-center mt-2' : ''}`}>
        <div className="flex items-center gap-1.5">
          {/* 'EL' in 3D Electric Chrome-Blue, 'A' in 3D Polished Gold */}
          <span className={`font-heading ${sizeConfig.title} font-black tracking-wider`}>
            <span className="bg-gradient-to-r from-sky-100 via-sky-300 to-blue-400 bg-clip-text text-transparent">EL</span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">A</span>
          </span>
          {/* 'DIGITAL' in Chrome Blue, 'WORLD' in 3D Gold */}
          <span className={`font-heading ${sizeConfig.title} font-black tracking-wider`}>
            <span className="bg-gradient-to-r from-sky-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">DIGITAL </span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">WORLD</span>
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className={`font-mono ${sizeConfig.tagline} text-slate-300 tracking-widest uppercase font-semibold`}>
              Think Digital. Think Bigger.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
