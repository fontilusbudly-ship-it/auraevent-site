import {type KeyboardEvent, useEffect, useState} from 'react';
import {Maximize2} from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  caption?: string;
  badge?: string;
  className?: string;
  priority?: boolean;
  onOpen?: (resolvedSrc: string) => void;
}

export function MediaFrame({
  src,
  alt,
  caption,
  badge,
  className = '',
  priority = false,
  onOpen,
}: MediaFrameProps) {
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setAttempt(0);
  }, [src]);

  const candidates =
    src.startsWith('/src/assets/') || src.startsWith('/assets/')
      ? [src]
      : [src, `https://www.auraevent.pro/${src}`];
  const isFallback = attempt >= candidates.length;
  const activeSrc = candidates[Math.min(attempt, candidates.length - 1)];
  const isInteractive = Boolean(onOpen && !isFallback);

  const handleOpen = () => {
    if (onOpen && !isFallback) {
      onOpen(activeSrc);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isInteractive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <figure
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Agrandir : ${caption || alt}` : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      className={`group relative overflow-hidden rounded-2xl bg-[#f3ece6] border border-[#EADFD6] focus-visible:outline-2 focus-visible:outline-[#B8892B] ${
        isInteractive ? 'cursor-zoom-in' : ''
      } ${className}`}
      onClick={handleOpen}
    >
      {!isFallback ? (
        <>
          <img
            src={activeSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            onError={() => setAttempt((prev) => prev + 1)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          {(caption || badge) && (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300">
              {badge && (
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#D9B25F] mb-1">
                  {badge}
                </span>
              )}
              {caption && (
                <span className="block text-xs sm:text-sm font-medium leading-snug text-white/95">
                  {caption}
                </span>
              )}
            </figcaption>
          )}
          {onOpen && (
            <span
              className="pointer-events-none absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#111111] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
              aria-hidden="true"
            >
              <Maximize2 className="w-4 h-4" />
            </span>
          )}
        </>
      ) : (
        <div className="w-full h-full min-h-[180px] p-6 flex flex-col justify-between bg-gradient-to-br from-[#3A0810] via-[#6B0F1A] to-[#230509] text-white">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D9B25F]">
              {badge || 'Archives Aura Event'}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-5 h-5 text-[#D9B25F]/80 shrink-0"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="8.5" cy="10.5" r="1.5" />
              <path d="M21 16l-5-5-4 4-2-2-7 6" />
            </svg>
          </div>
          <div>
            <p className="font-display text-base sm:text-lg font-bold leading-snug text-white">
              {caption || alt}
            </p>
            <p className="mt-1.5 text-xs text-white/65">{src}</p>
          </div>
        </div>
      )}
    </figure>
  );
}
