import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { heroAssets } from '../data/media';
import { BRAND } from '../data/content';

const ROTATE_MS = 5600;

export default function Hero() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '18%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '40%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduced ? 1 : 0]);

  // Crossfade through hero stills
  useEffect(() => {
    if (reduced || heroAssets.length <= 1) return;
    const t = setInterval(() => {
      setActive((i) => (i + 1) % heroAssets.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [reduced]);

  const stagger = (i: number) => (reduced ? 0 : 0.6 + i * 0.12);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
      {/* Background slideshow */}
      <motion.div style={{ y }} className="absolute inset-0">
        {heroAssets.map((asset, i) => (
          <div
            key={asset.id}
            className="absolute inset-0 transition-opacity duration-[1600ms] ease-luxe"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <img
              src={asset.src}
              alt={i === 0 ? asset.caption : ''}
              className={`h-full w-full object-cover ${
                !reduced && i === active ? 'animate-kenburns' : ''
              }`}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </div>
        ))}
      </motion.div>

      {/* Overlays for legibility */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/55"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" aria-hidden />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="shell w-full">
          <div className="max-w-3xl text-ivory">
            <motion.p
              className="eyebrow text-champagne"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: stagger(0), ease: [0.22, 1, 0.36, 1] }}
            >
              Wedding Design &amp; Planning Studio
            </motion.p>

            <motion.h1
              className="display mt-5 text-[2.9rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.4rem] text-balance"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: stagger(1), ease: [0.22, 1, 0.36, 1] }}
            >
              Celebrations worth
              <br />
              <span className="italic text-champagne">remembering forever.</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg text-pretty"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: stagger(2), ease: [0.22, 1, 0.36, 1] }}
            >
              {BRAND.shortIntro}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: stagger(3), ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#inquiry" className="btn btn-primary">
                Plan Your Event
              </a>
              <a href="#featured" className="btn btn-light">
                Explore Our Work
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-ivory/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="eyebrow text-[0.6rem]">Scroll</span>
            <motion.span
              className="block h-9 w-px bg-gradient-to-b from-ivory/80 to-transparent"
              animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
