import { useRef } from 'react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import MediaThumb from '../components/MediaThumb';
import { populatedCategories, type CategorySlug } from '../data/media';

interface ExploreByFunctionProps {
  onOpenCategory: (slug: CategorySlug) => void;
}

/**
 * Immersive, image-led cards for each wedding function. Categories are
 * generated from the manifest and empty ones never appear. Horizontal scroll
 * with scroll-snap keeps it editorial on desktop and natural on touch.
 */
export default function ExploreByFunction({ onOpenCategory }: ExploreByFunctionProps) {
  const categories = populatedCategories();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 520), behavior: 'smooth' });
  };

  return (
    <section id="functions" className="bg-charcoal py-24 text-ivory sm:py-32">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Explore by Function"
            title="Every function, its own world"
            intro="Each celebration is designed as a distinct chapter. Step into the one that speaks to yours."
            tone="light"
          />
          <div className="hidden shrink-0 gap-3 sm:flex">
            <ArrowBtn dir={-1} onClick={() => scrollByCards(-1)} label="Scroll left" />
            <ArrowBtn dir={1} onClick={() => scrollByCards(1)} label="Scroll right" />
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:px-10"
        style={{ scrollPaddingLeft: '20px' }}
      >
        {categories.map((cat, i) => (
          <Reveal
            key={cat.slug}
            from="up"
            delay={Math.min(i * 0.04, 0.25)}
            className="shrink-0 snap-start"
          >
            <button
              type="button"
              onClick={() => onOpenCategory(cat.slug)}
              className="group relative block h-[62vh] max-h-[560px] min-h-[420px] w-[78vw] max-w-[380px] overflow-hidden rounded-lg bg-ink text-left sm:w-[340px]"
              aria-label={`Open ${cat.label} gallery (${cat.count} items)`}
            >
              <MediaThumb asset={cat.cover} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10 transition-opacity duration-500 group-hover:from-ink/95" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                <span className="eyebrow text-champagne/90">{cat.tagline}</span>
                <span className="rounded-full border border-ivory/30 px-3 py-1 text-xs tracking-wide2 text-ivory/90">
                  {cat.count}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="display text-4xl text-balance">{cat.label}</h3>
                <p className="mt-2 max-w-[90%] text-sm text-ivory/70 text-pretty">{cat.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wide2">
                  View gallery
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    className="transition-transform duration-500 ease-luxe group-hover:translate-x-1.5"
                  >
                    <path d="M1 5h13M10 1l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </button>
          </Reveal>
        ))}
        <div className="shrink-0" aria-hidden style={{ width: '1px' }} />
      </div>
    </section>
  );
}

function ArrowBtn({ dir, onClick, label }: { dir: number; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition hover:bg-ivory hover:text-ink"
    >
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        {dir < 0 ? <path d="M11 3L5 9l6 6" /> : <path d="M7 3l6 6-6 6" />}
      </svg>
    </button>
  );
}
