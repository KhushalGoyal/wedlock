import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import MediaThumb from '../components/MediaThumb';
import Lightbox from '../components/Lightbox';
import {
  MEDIA,
  populatedCategories,
  byPriority,
  totalCounts,
  type CategorySlug,
  type MediaAsset,
} from '../data/media';

export type GalleryFilter = CategorySlug | 'all';

interface GalleryProps {
  filter: GalleryFilter;
  onFilterChange: (f: GalleryFilter) => void;
}

/**
 * The cinematic gallery: filterable, masonry-style editorial layout with a
 * full-screen lightbox. Items lazy-load and reserve their aspect ratio to
 * avoid layout shift.
 */
export default function Gallery({ filter, onFilterChange }: GalleryProps) {
  const reduced = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const cats = populatedCategories();

  const assets = useMemo<MediaAsset[]>(() => {
    const list = filter === 'all' ? [...MEDIA] : MEDIA.filter((m) => m.category === filter);
    return list.sort(byPriority);
  }, [filter]);

  const tabs: { key: GalleryFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: MEDIA.length },
    ...cats.map((c) => ({ key: c.slug as GalleryFilter, label: c.label, count: c.count })),
  ];

  return (
    <section id="gallery" className="bg-ivory py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="The Gallery"
          title="A closer look"
          intro={`${totalCounts.images} photographs and ${totalCounts.videos} films across ${totalCounts.categories} functions — open any frame to view it full-screen.`}
        />

        {/* Filter tabs */}
        <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((t) => {
            const activeTab = t.key === filter;
            return (
              <button
                key={t.key}
                onClick={() => {
                  onFilterChange(t.key);
                  setLightboxIndex(null);
                }}
                aria-pressed={activeTab}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs tracking-wide2 transition-all duration-300 ${
                  activeTab
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-clay/35 text-charcoal/75 hover:border-ink hover:text-ink'
                }`}
              >
                {t.label}
                <span className={`ml-2 ${activeTab ? 'text-ivory/60' : 'text-clay'}`}>{t.count}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [column-fill:_balance]"
          >
            {assets.map((asset, i) => (
              <button
                key={asset.id}
                onClick={() => setLightboxIndex(i)}
                className="group mb-4 block w-full overflow-hidden rounded-md bg-charcoal"
                style={{ breakInside: 'avoid' }}
                aria-label={`Open: ${asset.caption}`}
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
                >
                  <MediaThumb asset={asset} eager={i < 4} sizes="(max-width:768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox
        assets={assets}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
