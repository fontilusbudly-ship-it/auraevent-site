import {useRef} from 'react';
import {motion, useReducedMotion, useScroll, useTransform, type MotionValue} from 'motion/react';

const TEXT =
  'Avec Aura Event, vous ne faites pas qu’organiser un événement : vous créez des souvenirs inoubliables et marquez les esprits.';

function Word({word, i, n, progress, still}: {word: string; i: number; n: number; progress: MotionValue<number>; still: boolean}) {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.14, 1]);
  return (
    <motion.span style={still ? undefined : {opacity}} className="inline-block mr-[0.28em]">
      {word}
    </motion.span>
  );
}

/** Phrase de promesse : les mots s'illuminent un à un pendant le défilement. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const {scrollYProgress} = useScroll({target: ref, offset: ['start 0.85', 'end 0.45']});
  const words = TEXT.split(' ');
  return (
    <section className="py-24 sm:py-36" aria-label="Notre promesse">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <p className="editorial-kicker">Notre promesse</p>
        <p ref={ref} className="font-display mt-8 text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight">
          {words.map((w, i) => (
            <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} still={reduce} />
          ))}
        </p>
        <p className="font-editorial mt-10 text-3xl text-[#6B0F1A]">Aura Event · Haïti</p>
      </div>
    </section>
  );
}
