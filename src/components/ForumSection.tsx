import {useEffect, useState, type FormEvent} from 'react';
import {motion} from 'motion/react';
import {FORUM, SUPPORTERS, TALKS, forumStatus as status} from '../data/forumData';

const wa = (n: string, t: string) => `https://wa.me/${n}?text=${encodeURIComponent(t)}`;
const fade = {
  initial: {opacity: 0, y: 24},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, margin: '-60px'},
  transition: {duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]},
};
const POSTERS = [FORUM.mainPoster, ...TALKS.map((t) => t.poster)];

export function ForumSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [label, setLabel] = useState(status);

  useEffect(() => {
    const t = window.setInterval(() => setLabel(status()), 3600_000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowLeft') setOpen((i) => ((i ?? 0) - 1 + POSTERS.length) % POSTERS.length);
      if (e.key === 'ArrowRight') setOpen((i) => ((i ?? 0) + 1) % POSTERS.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Bonjour Aura Event,\nJe souhaite m’inscrire au ${FORUM.title} (${FORUM.dates}).\n- Nom : ${f.get('name')}\n- Téléphone : ${f.get('phone')}\n- Université / institution : ${f.get('school')}`;
    window.open(wa(FORUM.waMain, text), '_blank', 'noopener');
  };

  const facts = [
    ['Dates', FORUM.dates],
    ['Lieu', FORUM.venue],
    ['Participation', FORUM.fee],
    ['Statut', label],
  ];

  return (
    <section id="forum" className="py-20 sm:py-28 bg-[#FAF6F2]" aria-labelledby="forum-title">
      <div className="max-w-7xl mx-auto px-5">
        <motion.div {...fade} className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <button type="button" onClick={() => setOpen(0)} className="block w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10" aria-label="Agrandir l’affiche du forum">
              <img src={FORUM.mainPoster} alt={`Affiche : ${FORUM.edition} du ${FORUM.title}, ${FORUM.dates}`} className="w-full h-auto" />
            </button>
          </div>
          <div className="lg:col-span-7">
            <p className="editorial-kicker">À la une · {FORUM.dates}</p>
            <h2 id="forum-title" className="mt-4 text-4xl sm:text-6xl font-bold leading-[1.02]">{FORUM.edition} du {FORUM.title}</h2>
            <p className="mt-5 text-lg text-black/70 leading-relaxed">
              Trois jours de conférences au {FORUM.venue} autour d’une question : <em>{FORUM.theme}</em> Droit, santé, gouvernance, économie, culture et engagement communautaire : des intervenants de domaines variés échangent avec les étudiants et les jeunes diplômés. Organisé par Aura Event.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-xl border border-[#EADFD6] bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#B8892B]">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#forum-inscription" className="btn-shimmer inline-flex items-center rounded-full bg-[#6B0F1A] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#111]">Je m’inscris</a>
              <a href={wa(FORUM.waMain, `Bonjour, nous souhaitons devenir partenaire du ${FORUM.title}.`)} target="_blank" rel="noopener noreferrer" className="btn-shimmer inline-flex items-center rounded-full border-2 border-[#111] px-7 py-3.5 text-sm font-bold hover:bg-[#111] hover:text-white">Devenir partenaire</a>
            </div>
          </div>
        </motion.div>

        <motion.div {...fade} className="mt-20">
          <p className="editorial-kicker">Conférences annoncées</p>
          <h3 className="mt-3 text-3xl sm:text-4xl font-bold">Qui parle, et de quoi.</h3>
          <p className="mt-2 text-black/60">D’autres intervenants seront annoncés. Le programme détaillé jour par jour sera publié prochainement.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TALKS.map((t, i) => (
              <motion.article key={t.id} {...fade} transition={{...fade.transition, delay: (i % 3) * 0.08}} className="luxury-card p-6 flex flex-col">
                <p className="font-display text-xl font-bold leading-snug flex-1">{t.subject}</p>
                <ul className="mt-5 space-y-3 border-t border-[#EADFD6] pt-4">
                  {t.speakers.map((s) => (
                    <li key={s.name}>
                      <p className="font-semibold text-[#6B0F1A]">{s.name}</p>
                      <p className="text-sm text-black/60">{s.role}</p>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade} className="mt-20">
          <p className="editorial-kicker">Les affiches</p>
          <div className="mt-6 flex gap-4 overflow-x-auto no-scrollbar snap-x pb-2">
            {POSTERS.map((src, i) => (
              <button key={src} type="button" onClick={() => setOpen(i)} className="snap-start shrink-0 w-48 sm:w-56 overflow-hidden rounded-xl ring-1 ring-black/10" aria-label={`Agrandir l’affiche ${i + 1}`}>
                <img src={src} alt={`Affiche ${i + 1} du ${FORUM.title}`} loading="lazy" className="w-full h-auto" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade} className="mt-20 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-[#6B0F1A] p-8 sm:p-10 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B25F]">Partenaires</p>
            <h3 className="mt-3 text-3xl font-bold">Avec le soutien de</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {SUPPORTERS.map((s) => (
                <li key={s} className="rounded-full border border-white/30 px-4 py-1.5 text-sm">{s}</li>
              ))}
            </ul>
            <p className="mt-6 text-white/80">Le forum est ouvert aux sponsors : si votre organisation veut soutenir cette première édition, écrivez-nous.</p>
            <a href={wa(FORUM.waMain, `Bonjour, nous souhaitons devenir partenaire du ${FORUM.title}.`)} target="_blank" rel="noopener noreferrer" className="btn-shimmer mt-5 inline-flex rounded-full bg-[#D9B25F] px-6 py-3 text-sm font-bold text-[#111] hover:bg-white">Devenir partenaire</a>
          </div>
          <form id="forum-inscription" onSubmit={register} className="rounded-3xl bg-white border border-[#EADFD6] p-8 sm:p-10 space-y-4">
            <h3 className="text-3xl font-bold">S’inscrire au forum</h3>
            <p className="text-sm text-black/60">Participation : {FORUM.fee}. Votre demande s’ouvre dans WhatsApp, prête à envoyer.</p>
            {[['name', 'Nom et prénom', 'text'], ['phone', 'Téléphone / WhatsApp', 'tel'], ['school', 'Université ou institution', 'text']].map(([n, l, ty]) => (
              <label key={n} className="block text-sm font-medium">
                {l}
                <input name={n} type={ty} required={n !== 'school'} className="mt-1 w-full rounded-xl border border-black/15 px-4 py-3 focus:border-[#B8892B] focus:outline-none" />
              </label>
            ))}
            <button className="btn-shimmer w-full rounded-full bg-[#6B0F1A] py-3.5 text-sm font-bold text-white hover:bg-[#111]">Envoyer l’inscription sur WhatsApp</button>
            <p className="text-xs text-black/50">Une question ? {FORUM.email} · +509 47 99 33 15 · +509 31 33 28 06</p>
          </form>
        </motion.div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Affiche agrandie" onClick={() => setOpen(null)}>
          <button type="button" className="absolute top-4 right-5 text-4xl text-white" aria-label="Fermer" onClick={() => setOpen(null)}>&times;</button>
          <button type="button" className="absolute left-3 text-5xl text-white" aria-label="Précédente" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + POSTERS.length) % POSTERS.length); }}>&#8249;</button>
          <button type="button" className="absolute right-3 text-5xl text-white" aria-label="Suivante" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % POSTERS.length); }}>&#8250;</button>
          <img src={POSTERS[open]} alt={`Affiche ${open + 1}`} className="max-h-[90vh] max-w-[88vw] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
