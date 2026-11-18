import {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import type {GalleryPhoto} from '../data/auraData';

interface LightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function Lightbox({photos, activeIndex, onClose, onNavigate}: LightboxProps) {
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  const isOpen = activeIndex !== null && photos[activeIndex] !== undefined;
  const activePhoto = isOpen ? photos[activeIndex] : null;

  useEffect(() => {
    setFallbackAttempt(0);
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onNavigate((activeIndex - 1 + photos.length) % photos.length);
      } else if (event.key === 'ArrowRight') {
        onNavigate((activeIndex + 1) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, photos.length, onClose, onNavigate]);

  if (!isOpen || !activePhoto || activeIndex === null) return null;

  const candidates =
    activePhoto.src.startsWith('/src/assets/') || activePhoto.src.startsWith('/assets/')
      ? [activePhoto.src]
      : [activePhoto.src, `https://www.auraevent.pro/${activePhoto.src}`];
  const srcToUse = candidates[Math.min(fallbackAttempt, candidates.length - 1)];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activePhoto.alt}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/92 backdrop-blur-sm p-4 sm:p-8"
    >
      <div className="w-full max-w-6xl flex items-center justify-between text-white/80 mb-4">
        <div className="text-xs sm:text-sm font-medium tracking-wide">
          <span className="text-[#D9B25F] font-bold uppercase tracking-[0.16em]">
            {activePhoto.categoryLabel}
          </span>
          <span className="mx-2 text-white/40" aria-hidden="true">
            ·
          </span>
          <span className="tabular-nums">
            {activeIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la galerie"
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D9B25F]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center min-h-0">
        <button
          type="button"
          onClick={() => onNavigate((activeIndex - 1 + photos.length) % photos.length)}
          aria-label="Photo précédente"
          className="absolute left-0 sm:left-2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-[#6B0F1A] border border-white/15 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D9B25F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {fallbackAttempt < candidates.length ? (
          <img
            src={srcToUse}
            alt={activePhoto.alt}
            referrerPolicy="no-referrer"
            onError={() => setFallbackAttempt((prev) => prev + 1)}
            className="max-h-[76vh] max-w-full object-contain rounded-xl shadow-2xl"
          />
        ) : (
          <div className="max-w-lg w-full rounded-2xl border border-[#B8892B]/40 bg-[#3A0810] p-8 text-center text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B25F]">
              {activePhoto.categoryLabel}
            </p>
            <p className="mt-3 font-display text-2xl font-bold">{activePhoto.caption}</p>
            <p className="mt-2 text-sm text-white/70">{activePhoto.alt}</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => onNavigate((activeIndex + 1) % photos.length)}
          aria-label="Photo suivante"
          className="absolute right-0 sm:right-2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-[#6B0F1A] border border-white/15 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D9B25F]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <p className="mt-4 max-w-2xl text-center text-sm text-white/85">{activePhoto.caption}</p>
    </div>
  );
}
