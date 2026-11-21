import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {AgencyLogo} from './AgencyLogo';
import {FORUM, forumStatus} from '../data/forumData';

/**
 * Effets de luxe, sans toucher au reste du site :
 * 1. rideau d'entrée (une fois par visite)
 * 2. curseur doré (ordinateur uniquement)
 * 3. lueur dorée qui suit la souris sur les cartes (.luxury-card)
 * 4. boutons légèrement aimantés (.btn-shimmer)
 */
export function LuxuryFX() {
  const reduce = useReducedMotion();
  const ring = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('aura-intro');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!intro) return;
    try {
      sessionStorage.setItem('aura-intro', '1');
    } catch {
      /* navigation privée : on ignore */
    }
    const t = window.setTimeout(() => setIntro(false), reduce ? 0 : 2300);
    return () => window.clearTimeout(t);
  }, [intro, reduce]);

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = ring.current;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    let lastBtn: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;
      if (el) {
        el.style.opacity = '1';
        el.dataset.hover = String(!!t.closest('a,button,input,select,textarea,summary,[role="button"]'));
        el.dataset.view = String(!!t.closest('button:has(img),a:has(img),[role="button"]:has(img)'));
      }
      const card = t.closest('.luxury-card') as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      }
      const btn = t.closest('.btn-shimmer') as HTMLElement | null;
      if (btn !== lastBtn) {
        if (lastBtn) lastBtn.style.translate = '';
        lastBtn = btn;
      }
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.16;
        const dy = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }
    };
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, {passive: true});
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const [atTop, setAtTop] = useState(true);
  const [far, setFar] = useState(false);
  const live = forumStatus() !== 'Édition terminée';
  const barOn = live && atTop && !intro;

  useEffect(() => {
    const on = () => {
      setAtTop(window.scrollY < 80);
      setFar(window.scrollY > 500);
    };
    on();
    window.addEventListener('scroll', on, {passive: true});
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.dataset.bar = barOn ? '1' : '0';
  }, [barOn]);

  return (
    <>
      {live && (
        <a
          href="#forum"
          className={`fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center gap-3 bg-[#6B0F1A] px-4 text-xs font-medium text-white transition-transform duration-500 sm:text-[13px] ${barOn ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <span className="truncate">
            Forum Universitaire de Jacmel · {FORUM.dates} · <b>{forumStatus()}</b>
          </span>
          <span className="hidden font-bold text-[#D9B25F] sm:inline">S’inscrire →</span>
        </a>
      )}
      <a
        href="https://wa.me/50931332806"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Écrire à Aura Event sur WhatsApp"
        className={`fixed bottom-5 right-5 z-[60] inline-flex items-center rounded-full bg-[#6B0F1A] px-5 py-3 text-sm font-bold text-white shadow-xl transition-all duration-500 hover:bg-[#111] ${far && !intro ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      >
        WhatsApp
      </a>
      <div ref={ring} className="aura-cursor" aria-hidden="true" />
      <AnimatePresence>
        {intro && !reduce && (
          <motion.div
            key="aura-intro"
            aria-hidden="true"
            className="fixed inset-0 z-[300] grid place-items-center bg-white border-b-[3px] border-[#B8892B]"
            exit={{y: '-101%', transition: {duration: 1.1, ease: [0.77, 0, 0.18, 1]}}}
          >
            <div className="text-center">
              <motion.div
                className="mx-auto w-fit"
                initial={{opacity: 0, scale: 0.85}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1]}}
              >
                <AgencyLogo className="w-28 h-28" size={112} />
              </motion.div>
              <motion.span
                className="block h-px bg-[#B8892B] mx-auto my-4"
                initial={{width: 0}}
                animate={{width: 170}}
                transition={{duration: 1.1, delay: 0.5, ease: [0.7, 0, 0.2, 1]}}
              />
              <motion.p
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B8892B]"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.9, delay: 0.95}}
              >
                Haïti · Événements d’exception
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
