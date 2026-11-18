import {useState} from 'react';

interface AgencyLogoProps {
  className?: string;
  size?: number;
}

export function AgencyLogo({className = 'w-12 h-12', size = 48}: AgencyLogoProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = ['logo.png', 'https://www.auraevent.pro/logo.png'];

  if (srcIndex >= sources.length) {
    return (
      <span
        className={`${className} rounded-full bg-[#6B0F1A] border border-[#B8892B] text-[#D9B25F] font-display font-extrabold text-sm tracking-tight inline-flex items-center justify-center shrink-0 select-none`}
        aria-hidden="true"
      >
        AE
      </span>
    );
  }

  return (
    <img
      src={sources[srcIndex]}
      alt="Logo Aura Event"
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      onError={() => setSrcIndex((prev) => prev + 1)}
      className={`${className} object-contain shrink-0`}
    />
  );
}
