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
      img: 'w-8 h-8 sm:w-9 sm:h-9',
      fullImg: 'h-9 sm:h-10 w-auto',
      title: 'text-sm sm:text-base',
      tagline: 'text-[8px] sm:text-[9px]',
      gap: 'gap-2 sm:gap-2.5'
    },
    md: {
      img: 'w-9 h-9 sm:w-11 sm:h-11',
      fullImg: 'h-11 sm:h-12 w-auto',
      title: 'text-base sm:text-lg lg:text-xl',
      tagline: 'text-[9px] sm:text-[10px]',
      gap: 'gap-2.5 sm:gap-3'
    },
    lg: {
      img: 'w-14 h-14 sm:w-16 sm:h-16',
      fullImg: 'h-16 sm:h-20 w-auto',
      title: 'text-xl sm:text-2xl lg:text-3xl',
      tagline: 'text-[10px] sm:text-xs',
      gap: 'gap-3 sm:gap-4'
    },
    xl: {
      img: 'w-20 h-20 sm:w-24 sm:h-24',
      fullImg: 'h-24 sm:h-32 w-auto',
      title: 'text-2xl sm:text-3xl lg:text-4xl',
      tagline: 'text-xs sm:text-sm',
      gap: 'gap-4 sm:gap-5'
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
      className={`inline-flex ${mode === 'stacked' ? 'flex-col items-center text-center' : 'items-center'} ${sizeConfig.gap} select-none ${onClick ? 'cursor-pointer group' : ''} ${className} overflow-visible`}
    >
      {/* 3D Earth Globe & Orbital Arrow Emblem from the Official Logo */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {!imgFailed ? (
          <img
            src="/logo.png"
            alt="ELA Digital World Logo"
            onError={() => setImgFailed(true)}
            className={`${sizeConfig.img} object-contain rounded-xl drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-transform duration-300 group-hover:scale-105 flex-shrink-0`}
          />
        ) : (
          /* High-Precision Vector SVG Fallback */
          <svg
            className={`${sizeConfig.img} drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] flex-shrink-0`}
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

      {/* Official Brand Typography: Rendered without clipping or text-box cutoff */}
      <div className={`flex flex-col justify-center py-0.5 overflow-visible ${mode === 'stacked' ? 'items-center mt-2' : ''}`}>
        <div className="flex items-center gap-1.5 whitespace-nowrap overflow-visible">
          {/* 'ELA' in Electric Blue + Polished Gold */}
          <span className={`font-heading ${sizeConfig.title} font-black tracking-wider leading-snug inline-flex items-center`}>
            <span className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">EL</span>
            <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">A</span>
          </span>
          {/* 'DIGITAL WORLD' in Electric Blue + Polished Gold */}
          <span className={`font-heading ${sizeConfig.title} font-black tracking-wider leading-snug inline-flex items-center ml-1`}>
            <span className="text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">DIGITAL </span>
            <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] ml-1">WORLD</span>
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5 whitespace-nowrap overflow-visible">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0"></span>
            <span className={`font-mono ${sizeConfig.tagline} text-slate-300 tracking-wider uppercase font-semibold`}>
              Think Digital. Think Bigger.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
