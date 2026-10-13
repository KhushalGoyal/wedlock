import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  id?: string;
}

/** Shared editorial section header with consistent rhythm and type scale. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';
  const muted = tone === 'light' ? 'text-ivory/70' : 'text-charcoal/65';
  const accent = tone === 'light' ? 'text-champagne' : 'text-clay';

  return (
    <header
      id={id}
      className={`flex flex-col gap-5 ${centered ? 'items-center text-center mx-auto max-w-2xl' : 'items-start max-w-2xl'}`}
    >
      {eyebrow && (
        <Reveal from="up">
          <span className={`eyebrow ${accent} flex items-center gap-3`}>
            <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal from="up" delay={0.05}>
        <h2 className="display text-4xl sm:text-5xl md:text-[3.6rem] text-balance">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal from="up" delay={0.1}>
          <p className={`text-base sm:text-lg leading-relaxed text-pretty ${muted}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
