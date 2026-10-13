import { useState } from 'react';
import type { MediaAsset } from '../data/media';

interface MediaThumbProps {
  asset: MediaAsset;
  className?: string;
  /** Load immediately (above the fold). Defaults to lazy. */
  eager?: boolean;
  /** Apply a subtle zoom when the parent `.group` is hovered. */
  hoverZoom?: boolean;
  sizes?: string;
}

/**
 * Renders a still thumbnail for an image or a video poster. Reserves no
 * intrinsic box itself — it fills its parent with object-cover, so the parent
 * controls the aspect ratio (which prevents layout shift). Shows a shimmer
 * skeleton while loading and a graceful branded fallback on error.
 */
export default function MediaThumb({
  asset,
  className = '',
  eager = false,
  hoverZoom = true,
  sizes,
}: MediaThumbProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const previewSrc = asset.type === 'video' ? asset.poster ?? asset.src : asset.src;
  const isVideo = asset.type === 'video';

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {!loaded && !errored && (
        <div className="skeleton absolute inset-0" aria-hidden />
      )}

      {errored ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-charcoal text-champagne/70">
          <span className="display text-3xl italic">W</span>
          <span className="eyebrow text-[0.6rem] text-champagne/50">Wedlock Events</span>
        </div>
      ) : (
        <img
          src={previewSrc}
          alt={asset.caption}
          width={asset.width}
          height={asset.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-[transform,opacity] duration-700 ease-luxe ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${hoverZoom ? 'group-hover:scale-[1.06]' : ''}`}
        />
      )}

      {/* Video affordance */}
      {isVideo && !errored && (
        <>
          <span className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-ink/55 px-2.5 py-1 text-[0.6rem] uppercase tracking-wide2 text-ivory backdrop-blur">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
              <path d="M1 0l8 5-8 5z" />
            </svg>
            Film
          </span>
          <span
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            aria-hidden
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/70 bg-ink/25 text-ivory backdrop-blur-sm transition-transform duration-500 ease-luxe group-hover:scale-110">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3 1.5l11 6.5-11 6.5z" />
              </svg>
            </span>
          </span>
        </>
      )}
    </div>
  );
}
