import {useEffect} from 'react';
import type {GalleryPhoto} from '../data/auraData';

type Props = {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Visionneuse plein écran : flèches, clavier (← → Échap) et légende. */
export function Lightbox({photos, activeIndex, onClose, onNavigate}: Props) {
  const open = activeIndex !== null && photos.length > 0;
  const n = photos.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(((activeIndex as number) - 1 + n) % n);
      if (e.key === 'ArrowRight') onNavigate(((activeIndex as number) + 1) % n);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, activeIndex, n, onClose, onNavigate]);

  if (!open) return null;
  const photo = photos[activeIndex as number];
  const go = (d: number) => onNavigate(((activeIndex as number) + d + n) % n);

  return (
    <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Photo agrandie" onClick={onClose}>
      <button type="button" className="absolute right-5 top-4 text-4xl text-white" aria-label="Fermer" onClick={onClose}>&times;</button>
      <button type="button" className="absolute left-3 text-5xl text-white" aria-label="Photo précédente" onClick={(e) => { e.stopPropagation(); go(-1); }}>&#8249;</button>
      <button type="button" className="absolute right-3 text-5xl text-white" aria-label="Photo suivante" onClick={(e) => { e.stopPropagation(); go(1); }}>&#8250;</button>
      <img src={photo.src} alt={photo.alt} className="max-h-[80vh] max-w-[88vw] rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
      <p className="mt-4 max-w-2xl text-center text-sm text-white/80" onClick={(e) => e.stopPropagation()}>
        {photo.caption} · {(activeIndex as number) + 1} / {n}
      </p>
    </div>
  );
}
