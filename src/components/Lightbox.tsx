import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { MediaAsset } from '../data/media';
import { categoryLabel } from '../data/media';

interface LightboxProps {
  assets: MediaAsset[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

/**
 * Accessible full-screen media viewer.
 * - Esc closes, ← / → navigate, focus returns to the opener on close.
 * - Locks body scroll while open.
 * - Images render large-format; videos play on demand with native controls.
 */
export default function Lightbox({ assets, index, onClose, onNavigate }: LightboxProps) {
  const reduced = useReducedMotion();
  const open = index !== null;
  const asset = open ? assets[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      const next = (index + dir + assets.length) % assets.length;
      onNavigate(next);
    },
    [index, assets.length, onNavigate]
  );

  // Keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go, onClose]);

  // Scroll lock + initial focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && asset && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${categoryLabel(asset.category)} — ${asset.caption}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-4 sm:px-8 text-ivory">
            <span className="eyebrow text-champagne/90">
              {categoryLabel(asset.category)}
              <span className="ml-3 text-ivory/50">
                {(index ?? 0) + 1} / {assets.length}
              </span>
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 text-ivory transition hover:bg-ivory hover:text-ink"
              aria-label="Close viewer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2l12 12M14 2L2 14" />
              </svg>
            </button>
          </div>

          {/* Prev / Next */}
          <NavButton side="left" onClick={() => go(-1)} />
          <NavButton side="right" onClick={() => go(1)} />

          {/* Media stage */}
          <motion.div
            key={asset.id}
            className="relative flex max-h-[80vh] w-full max-w-5xl flex-col items-center px-4"
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {asset.type === 'video' ? (
              <video
                key={asset.src}
                className="max-h-[72vh] w-auto max-w-full rounded-sm shadow-2xl"
                src={asset.src}
                poster={asset.poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
              />
            ) : (
              <img
                src={asset.src}
                alt={asset.caption}
                className="max-h-[72vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
                style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
              />
            )}
            <p className="mt-4 max-w-xl text-center text-sm text-ivory/75 text-pretty">
              {asset.caption}
              {asset.project && (
                <span className="mt-1 block text-xs text-champagne/80">{asset.project}</span>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const isLeft = side === 'left';
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Previous' : 'Next'}
      className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 text-ivory transition hover:bg-ivory hover:text-ink sm:flex ${
        isLeft ? 'left-4' : 'right-4'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        {isLeft ? <path d="M11 3L5 9l6 6" /> : <path d="M7 3l6 6-6 6" />}
      </svg>
    </button>
  );
}
