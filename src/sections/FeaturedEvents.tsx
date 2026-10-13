import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import MediaThumb from '../components/MediaThumb';
import { FEATURED_PROJECTS } from '../data/content';
import { assetById, type CategorySlug } from '../data/media';

interface FeaturedEventsProps {
  onOpenCategory: (slug: CategorySlug) => void;
}

/**
 * An editorial, intentionally irregular grid of the strongest work.
 * Card spans vary so the layout reads like a magazine spread rather than a
 * repeating card grid.
 */
export default function FeaturedEvents({ onOpenCategory }: FeaturedEventsProps) {
  // Layout recipe: [columns, rows] per card on the lg grid.
  const spans = [
    'lg:col-span-7 lg:row-span-2',
    'lg:col-span-5',
    'lg:col-span-5',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
  ];

  return (
    <section id="featured" className="bg-ivory py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected Work"
          title="Celebrations we've brought to life"
          intro="A curated look at complete events — from palace receptions to golden-hour haldis — designed, built and directed end to end."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[260px]">
          {FEATURED_PROJECTS.map((project, i) => {
            const cover = assetById(project.coverId);
            if (!cover) return null;
            const feature = i === 0;
            return (
              <Reveal
                key={project.coverId}
                from="up"
                delay={Math.min(i * 0.06, 0.3)}
                className={spans[i] ?? 'lg:col-span-4'}
              >
                <button
                  type="button"
                  onClick={() => onOpenCategory(project.category)}
                  className="group relative block h-full min-h-[300px] w-full overflow-hidden rounded-lg bg-charcoal text-left"
                  aria-label={`Explore ${project.title}`}
                >
                  <MediaThumb asset={cover} eager={feature} />
                  {/* gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />

                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-7">
                    <span className="eyebrow text-champagne/90">{project.eyebrow}</span>
                    <h3 className={`display mt-2 text-balance ${feature ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>
                      {project.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-md text-sm text-ivory/75 text-pretty transition-all duration-500 ease-luxe ${
                        feature
                          ? 'opacity-90'
                          : 'opacity-0 translate-y-2 group-hover:opacity-90 group-hover:translate-y-0'
                      }`}
                    >
                      {project.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wide2 text-ivory/90">
                      Explore
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
