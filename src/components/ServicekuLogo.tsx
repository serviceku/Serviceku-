import React from 'react';

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'icon-only' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  lightMode?: boolean;
}

export const ServicekuIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 56 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-label="Serviceku Logo Icon"
    >
      <defs>
        <linearGradient id="logoBlueGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284c7" />
          <stop offset="0.5" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="snowGrad" x1="40" y1="30" x2="110" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="gearGrad" x1="90" y1="30" x2="170" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e293b" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="swooshGrad" x1="10" y1="120" x2="190" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284c7" />
          <stop offset="0.5" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1e40af" />
        </linearGradient>
      </defs>

      {/* Outer Circle Ring Arc (Top & Left) */}
      <path 
        d="M 50,130 A 72,72 0 1,1 170,120" 
        stroke="url(#logoBlueGrad)" 
        strokeWidth="11" 
        strokeLinecap="round" 
      />

      {/* Snowflake on the Left */}
      <g stroke="url(#snowGrad)" strokeWidth="6" strokeLinecap="round">
        {/* Main snowflake stems */}
        <line x1="75" y1="35" x2="75" y2="115" />
        <line x1="35" y1="75" x2="115" y2="75" />
        <line x1="47" y1="47" x2="103" y2="103" />
        <line x1="47" y1="103" x2="103" y2="47" />

        {/* Snowflake crystal chevrons */}
        {/* Top stem chevrons */}
        <line x1="75" y1="48" x2="65" y2="40" strokeWidth="4.5" />
        <line x1="75" y1="48" x2="85" y2="40" strokeWidth="4.5" />
        {/* Bottom stem chevrons */}
        <line x1="75" y1="102" x2="65" y2="110" strokeWidth="4.5" />
        <line x1="75" y1="102" x2="85" y2="110" strokeWidth="4.5" />
        {/* Left stem chevrons */}
        <line x1="48" y1="75" x2="40" y2="65" strokeWidth="4.5" />
        <line x1="48" y1="75" x2="40" y2="85" strokeWidth="4.5" />
        {/* Diagonal branches */}
        <line x1="56" y1="56" x2="52" y2="46" strokeWidth="4" />
        <line x1="56" y1="56" x2="46" y2="52" strokeWidth="4" />
        <line x1="94" y1="94" x2="98" y2="104" strokeWidth="4" />
        <line x1="94" y1="94" x2="104" y2="98" strokeWidth="4" />
      </g>

      {/* Mechanical Gear on the Right */}
      <g fill="url(#gearGrad)">
        {/* Gear ring path with outer cogs */}
        <path d="M 125,55 L 132,54 L 134,60 L 140,62 L 146,57 L 152,61 L 150,68 L 155,73 L 162,71 L 165,78 L 161,84 L 164,91 L 171,92 L 171,99 L 164,103 L 163,110 L 169,115 L 164,121 L 157,119 L 153,124 L 154,131 L 147,134 L 142,129 L 136,132 L 133,139 L 126,139 L 125,132 C 145,128 152,110 148,90 C 145,76 137,64 125,55 Z" />
      </g>

      {/* Industrial Heavy Wrench / Spanner */}
      <g fill="#1e293b" stroke="#0f172a" strokeWidth="1.5">
        {/* Angled Wrench handle */}
        <path 
          d="M 94,128 L 134,64 C 137,59 143,58 147,61 L 152,64 C 156,67 157,73 153,77 L 114,140 C 111,145 105,146 101,143 L 96,140 C 92,137 91,131 94,128 Z" 
          fill="#334155"
        />
        {/* Wrench Open Jaw Head (Top Right) */}
        <path 
          d="M 132,53 C 133,40 143,30 156,31 C 166,32 173,38 176,46 C 172,49 165,51 161,49 C 155,46 150,48 146,53 C 143,57 144,63 148,67 L 145,71 C 136,68 131,61 132,53 Z" 
          fill="#1e293b"
        />
      </g>

      {/* Fluid Dynamic Wave Swooshes Underneath */}
      <path 
        d="M 22,145 C 50,128 85,130 115,145 C 145,160 175,150 192,134 C 182,147 155,165 120,154 C 85,143 50,148 22,145 Z" 
        fill="url(#swooshGrad)" 
      />
      <path 
        d="M 40,154 C 70,142 98,145 125,156 C 148,166 172,158 185,149 C 174,160 150,172 120,163 C 90,154 62,158 40,154 Z" 
        fill="#0284c7" 
        opacity="0.85"
      />
    </svg>
  );
};

export const ServicekuLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  lightMode = false,
}) => {
  const sizeMap = {
    sm: { icon: 34, title: 'text-lg', subtitle: 'text-[9px]', tag: 'text-[7px]' },
    md: { icon: 46, title: 'text-2xl', subtitle: 'text-[11px]', tag: 'text-[8.5px]' },
    lg: { icon: 64, title: 'text-3xl', subtitle: 'text-sm', tag: 'text-[10px]' },
    xl: { icon: 88, title: 'text-5xl', subtitle: 'text-base', tag: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  if (variant === 'icon-only') {
    return <ServicekuIcon size={currentSize.icon} className={className} />;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-blue-100 shadow-md ${className}`}>
        <ServicekuIcon size={currentSize.icon * 1.3} />
        <div className="mt-2 text-center">
          <span className="font-extrabold italic tracking-tight text-blue-700 text-2xl block font-sans">
            Serviceku
          </span>
          <div className="w-full h-0.5 bg-blue-600 my-1 rounded-full" />
          <span className="font-black text-slate-800 text-[10px] tracking-wider uppercase block">
            ELEKTRONIK TERBAIK
          </span>
          <span className="text-[8px] font-semibold text-slate-600 tracking-tight block">
            -SPESIALIS PENDINGIN DAN MESIN ELEKTRONIK-
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <ServicekuIcon size={currentSize.icon * 1.5} />
        <div className="mt-3">
          <h1 className={`${currentSize.title} font-extrabold italic tracking-tighter text-blue-700 drop-shadow-sm`}>
            Service<span className="text-sky-500">ku</span>
          </h1>
          <div className="flex items-center justify-center gap-1.5 my-1">
            <span className="h-[2px] w-6 bg-blue-700 rounded-full" />
            <span className={`${currentSize.subtitle} font-black text-slate-900 tracking-wider uppercase`}>
              ELEKTRONIK TERBAIK
            </span>
            <span className="h-[2px] w-6 bg-blue-700 rounded-full" />
          </div>
          <span className={`${currentSize.tag} font-bold text-slate-600 tracking-normal uppercase block`}>
            -SPESIALIS PENDINGIN DAN MESIN ELEKTRONIK-
          </span>
        </div>
      </div>
    );
  }

  // Default 'horizontal' variant suitable for Header / Navbar
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      <ServicekuIcon size={currentSize.icon} />
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline">
          <span className={`${currentSize.title} font-black italic tracking-tighter text-blue-700 leading-none`}>
            Service<span className="text-sky-500">ku</span>
          </span>
        </div>
        <div className="flex items-center gap-1 my-0.5">
          <span className="h-[1.5px] w-3 bg-blue-600 rounded-full" />
          <span className={`${currentSize.subtitle} font-black tracking-wider uppercase leading-none ${lightMode ? 'text-blue-100' : 'text-slate-800'}`}>
            ELEKTRONIK TERBAIK
          </span>
          <span className="h-[1.5px] w-3 bg-blue-600 rounded-full" />
        </div>
        <span className={`${currentSize.tag} font-bold tracking-tight uppercase leading-none ${lightMode ? 'text-blue-200' : 'text-slate-500'}`}>
          -SPESIALIS PENDINGIN & MESIN ELEKTRONIK-
        </span>
      </div>
    </div>
  );
};
