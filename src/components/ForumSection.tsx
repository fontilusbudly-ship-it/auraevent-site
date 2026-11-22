import {useEffect, useState} from 'react';
import {motion} from 'motion/react';
import {FORUM, OFFICIAL_SPONSOR, SUPPORTERS, TALKS, forumStatus} from '../data/forumData';

const wa = (n: string, t: string) => `https://wa.me/${n}?text=${encodeURIComponent(t)}`;
const fade = {
  initial: {opacity: 0, y: 20},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, margin: '-60px'},
  transition: {duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]},
};
// 0 = affiche principale, puis une affiche par conférence
const POSTERS = [FORUM.mainPoster, ...TALKS.map((t) => t.poster)];
const btnPrimary = 'inline-flex items-center justify-center rounded-md bg-[#6B0F1A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#111]';
const btnLine = 'inline-flex items-center justify-center rounded-md border border-[#111] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#111] hover:text-white';

export function ForumSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [label, setLabel] = useState(forumStatus);
  const sponsorMsg = `Bonjour, nous souhaitons devenir sponsor du ${FORUM.title}.`;

  useEffect(() => {
    const t = window.setInterval(() => setLabel(forumStatus()), 3600_000);
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

  const facts = [
    ['Dates', FORUM.dates],
    ['Lieu', FORUM.venue],
    ['Participation', FORUM.fee],
    ['Statut', label],
  ];

  return (
    <section id="forum" className="bg-[#FAF6F2] py-20 sm:py-28" aria-labelledby="forum-title">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div {...fade} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <button type="button" onClick={() => setOpen(0)} className="block w-full overflow-hidden rounded-md border border-[#E3DAD0]" aria-label="Agrandir l’affiche du forum">
              <img src={FORUM.mainPoster} alt={`Affiche : ${FORUM.edition} du ${FORUM.title}, ${FORUM.dates}`} className="h-auto w-full" />
            </button>
          </div>
          <div className="lg:col-span-7">
            <p className="editorial-kicker">À la une · {FORUM.dates}</p>
            <h2 id="forum-title" className="mt-4 text-4xl font-bold leading-[1.05] sm:text-6xl">{FORUM.edition} du {FORUM.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-black/70">
              Trois jours de conférences au {FORUM.venue} autour d’une question : <em>{FORUM.theme}</em> Droit, santé, gouvernance, économie, culture et engagement communautaire : des intervenants de domaines variés échangent avec les étudiants et les jeunes diplômés. Organisé par Aura Event.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-[#E3DAD0] py-5 sm:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B8892B]">{k}</dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={FORUM.formUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>Je m’inscris</a>
              <a href={wa(FORUM.waMain, sponsorMsg)} target="_blank" rel="noopener noreferrer" className={btnLine}>Devenir sponsor</a>
            </div>
          </div>
        </motion.div>

        <motion.div {...fade} className="mt-20">
          <p className="editorial-kicker">Conférences annoncées</p>
          <h3 className="mt-3 text-3xl font-bold sm:text-4xl">Qui parle, et de quoi.</h3>
          <p className="mt-2 text-black/60">D’autres intervenants seront annoncés. Le programme détaillé jour par jour sera publié prochainement. Touchez une affiche pour l’agrandir.</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {TALKS.map((t, i) => (
              <motion.article key={t.id} {...fade} transition={{...fade.transition, delay: (i % 2) * 0.06}} className="group flex overflow-hidden rounded-md border border-[#E3DAD0] bg-white transition-colors hover:border-[#6B0F1A]/50">
                <button type="button" onClick={() => setOpen(i + 1)} className="relative w-[36%] shrink-0 cursor-zoom-in overflow-hidden border-r border-[#E3DAD0] bg-[#1b2bb5] sm:w-[34%]" aria-label={`Agrandir l’affiche : ${t.speakers[0].name}`}>
                  <img src={t.poster} alt={`Affiche de la conférence de ${t.speakers.map((s) => s.name).join(' et ')}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="invisible block aspect-[5/6]" aria-hidden="true" />
                </button>
                <div className="flex min-w-0 flex-1 flex-col p-5">
                  <h4 className="font-display text-[1.05rem] font-bold leading-snug sm:text-lg">{t.subject}</h4>
                  <ul className="mt-auto space-y-2.5 pt-4">
                    {t.speakers.map((s) => (
                      <li key={s.name} className="border-t border-[#EFE8DF] pt-2.5 first:border-t-0 first:pt-0">
                        <p className="text-sm font-semibold text-[#6B0F1A]">{s.name}</p>
                        <p className="text-xs leading-snug text-black/60">{s.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade} className="mt-20 grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="editorial-kicker">Partenaires</p>
            <h3 className="mt-3 text-3xl font-bold sm:text-4xl">Avec le soutien de</h3>
            <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[#E3DAD0] bg-[#E3DAD0] sm:grid-cols-2">
              {SUPPORTERS.map((s) => (
                <li key={s.name} className="flex items-center gap-4 bg-white p-4">
                  <span className="flex h-12 w-24 shrink-0 items-center justify-center">
                    <img src={s.logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                  </span>
                  <span className="text-sm font-semibold leading-snug">{s.name}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-md border border-[#6B0F1A] bg-white p-6 sm:p-7">
              <p className="editorial-kicker">Sponsor officiel</p>
              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
                <img src={OFFICIAL_SPONSOR.logo} alt={`Logo ${OFFICIAL_SPONSOR.name}`} loading="lazy" className="h-24 w-24 shrink-0 object-contain" />
                <div>
                  <h4 className="font-display text-2xl font-bold">{OFFICIAL_SPONSOR.name}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-black/65">Sponsor officiel de cette première édition. Le forum reste ouvert à d’autres sponsors : si votre organisation souhaite le soutenir, écrivez-nous.</p>
                  <a href={wa(FORUM.waMain, sponsorMsg)} target="_blank" rel="noopener noreferrer" className={`${btnLine} mt-4`}>Devenir sponsor</a>
                </div>
              </div>
            </div>
          </div>

          <aside id="forum-inscription" className="rounded-md border border-[#E3DAD0] bg-white p-7 sm:p-8 lg:sticky lg:top-28 lg:col-span-5">
            <p className="editorial-kicker">Inscription</p>
            <h3 className="mt-3 text-3xl font-bold">S’inscrire au forum</h3>
            <p className="mt-3 leading-relaxed text-black/65">Remplissez le formulaire d’inscription en ligne. Participation : {FORUM.fee}.</p>
            <a href={FORUM.formUrl} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-6 w-full`}>Ouvrir le formulaire d’inscription</a>
            <div className="mt-6 border-t border-[#EFE8DF] pt-5 text-sm text-black/65">
              <p className="font-semibold text-black">Une question ?</p>
              <p className="mt-1">
                <a className="underline underline-offset-4" href={wa(FORUM.waMain, `Bonjour, j’ai une question sur le ${FORUM.title}.`)} target="_blank" rel="noopener noreferrer">WhatsApp +509 47 99 33 15</a>
                {' · '}
                <a className="underline underline-offset-4" href={wa(FORUM.waAlt, `Bonjour, j’ai une question sur le ${FORUM.title}.`)} target="_blank" rel="noopener noreferrer">+509 31 33 28 06</a>
              </p>
              <p className="mt-1"><a className="underline underline-offset-4" href={`mailto:${FORUM.email}`}>{FORUM.email}</a></p>
            </div>
          </aside>
        </motion.div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Affiche agrandie" onClick={() => setOpen(null)}>
          <button type="button" className="absolute right-5 top-4 text-4xl text-white" aria-label="Fermer" onClick={() => setOpen(null)}>&times;</button>
          <button type="button" className="absolute left-3 text-5xl text-white" aria-label="Précédente" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + POSTERS.length) % POSTERS.length); }}>&#8249;</button>
          <button type="button" className="absolute right-3 text-5xl text-white" aria-label="Suivante" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % POSTERS.length); }}>&#8250;</button>
          <img src={POSTERS[open]} alt={`Affiche ${open + 1}`} className="max-h-[90vh] max-w-[88vw] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
