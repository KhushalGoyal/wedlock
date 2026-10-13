import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { CLIENTS, CLIENTS_INTRO } from '../data/content';

/**
 * Client / celebrations list. Real entries render solid; placeholder slots
 * (to be filled later) render with a dashed, muted treatment so they are
 * visibly templates rather than fabricated names.
 */
export default function Clients() {
  return (
    <section id="clients" className="bg-ivory py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={CLIENTS_INTRO.eyebrow}
          title={CLIENTS_INTRO.heading}
          intro={CLIENTS_INTRO.intro}
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-clay/25 bg-clay/20 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENTS.map((client, i) => (
            <Reveal key={`${client.name}-${i}`} from="up" delay={Math.min(i * 0.04, 0.3)} className="h-full">
              <div
                className={`flex h-full min-h-[120px] flex-col items-center justify-center gap-1.5 p-6 text-center ${
                  client.placeholder
                    ? 'bg-ivory/60 text-charcoal/35'
                    : 'bg-ivory text-charcoal'
                }`}
              >
                <span
                  className={`font-serif text-xl leading-tight ${
                    client.placeholder ? 'italic' : 'font-medium'
                  }`}
                >
                  {client.name}
                </span>
                {client.detail && (
                  <span className="text-[0.7rem] uppercase tracking-wide2 opacity-70">
                    {client.detail}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-xs text-charcoal/40">
          Celebrations shown reflect completed events. Additional client names are added as each
          family gives their blessing to share.
        </p>
      </div>
    </section>
  );
}
