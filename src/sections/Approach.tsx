import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '../components/Reveal';
import MediaThumb from '../components/MediaThumb';
import { APPROACH } from '../data/content';
import { assetById } from '../data/media';

export default function Approach() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const image = assetById('img55');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section id="approach" ref={ref} className="bg-ink py-24 text-ivory sm:py-32">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Visual */}
        <Reveal from="right" className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-lg">
            <div className="relative aspect-[4/5] w-full">
              {image && (
                <motion.div style={{ y: imgY }} className="absolute inset-[-6%]">
                  <MediaThumb asset={image} hoverZoom={false} />
                </motion.div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <div className="flex flex-col gap-5">
            <Reveal>
              <span className="eyebrow text-champagne flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden />
                {APPROACH.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-4xl sm:text-5xl md:text-[3.4rem] text-balance">
                {APPROACH.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-prose2 text-base leading-relaxed text-ivory/75 text-pretty sm:text-lg">
                {APPROACH.intro}
              </p>
            </Reveal>
          </div>

          <div className="mt-2 flex flex-col">
            {APPROACH.steps.map((step, i) => (
              <Reveal key={step.index} from="up" delay={0.05 * i}>
                <div className="flex gap-6 border-t border-ivory/15 py-6">
                  <span className="display text-2xl text-champagne/80">{step.index}</span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif text-xl font-medium">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-ivory/65 text-pretty">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
