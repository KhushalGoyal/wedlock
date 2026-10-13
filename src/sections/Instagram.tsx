import Reveal from '../components/Reveal';
import MediaThumb from '../components/MediaThumb';
import { SOCIAL } from '../data/content';
import { assetById, type MediaAsset } from '../data/media';

// A curated strip of work shown as an Instagram-style grid. Tiles link out to
// the real profile (we don't have per-post permalinks, so each opens the feed).
const GRID_IDS = ['img19', 'img61', 'img67', 'img53', 'img26', 'img23', 'vid77', 'img64'];

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Instagram() {
  const tiles = GRID_IDS.map(assetById).filter(Boolean) as MediaAsset[];
  const { url, handle } = SOCIAL.instagram;

  return (
    <section id="instagram" className="bg-sand/40 py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <span className="eyebrow flex items-center gap-3 text-clay">
              <InstagramIcon className="h-5 w-5" />
              On Instagram
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-4xl sm:text-5xl md:text-[3.4rem]">
              Follow the celebrations
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-charcoal/70 transition-colors hover:text-gold"
            >
              {handle}
            </a>
          </Reveal>
        </div>

        {/* Feed-style grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map((asset, i) => (
            <Reveal key={asset.id} from="up" delay={Math.min(i * 0.04, 0.25)}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-md bg-charcoal"
                aria-label={`View ${handle} on Instagram`}
              >
                <MediaThumb asset={asset} />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-ink/45 group-hover:opacity-100">
                  <InstagramIcon className="h-7 w-7" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-charcoal">
            <InstagramIcon className="h-4 w-4" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
