import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { SERVICES } from '../data/content';

export default function Services() {
  return (
    <section id="services" className="bg-sand/40 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="What We Do"
          title="From first vision to final frame"
          intro="A full-service studio — we plan, design, build and direct, so every part of your celebration is held by one team."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-clay/25 bg-clay/25 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} from="up" delay={Math.min(i * 0.05, 0.3)} className="h-full">
              <article className="group flex h-full flex-col gap-4 bg-ivory p-8 transition-colors duration-500 hover:bg-charcoal hover:text-ivory">
                <span className="display text-3xl text-clay transition-colors duration-500 group-hover:text-champagne">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl font-medium leading-tight">{s.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal/70 text-pretty transition-colors duration-500 group-hover:text-ivory/75">
                  {s.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
