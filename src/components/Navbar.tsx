import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BRAND, NAV_LINKS } from '../data/content';

export default function Navbar() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
        solid
          ? 'bg-ivory/85 backdrop-blur-xl shadow-[0_1px_0_rgb(185_155_120_/_0.25)]'
          : 'bg-transparent'
      }`}
      style={{ height: 'var(--header-h)' }}
    >
      <nav className="shell flex h-full items-center justify-between">
        <a
          href="#top"
          className={`display text-2xl tracking-tight transition-colors ${
            solid ? 'text-ink' : 'text-ivory'
          }`}
          aria-label={`${BRAND.name} — home`}
        >
          Wedlock<span className="text-gold">.</span>
        </a>

        {/* Desktop links */}
        <ul
          className={`hidden items-center gap-8 lg:flex ${
            solid ? 'text-charcoal' : 'text-ivory'
          }`}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm tracking-wide2 transition-opacity hover:opacity-100"
              >
                <span className={solid ? 'opacity-80' : 'opacity-90'}>{l.label}</span>
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-400 ease-luxe group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#inquiry"
            className={`btn hidden md:inline-flex ${solid ? 'btn-ghost text-ink' : 'btn-light'}`}
          >
            Plan Your Event
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center lg:hidden ${
              solid ? 'text-ink' : 'text-ivory'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <div className="relative h-4 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
                  open ? 'top-2 rotate-45' : 'top-0.5'
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-px w-6 bg-current transition-all duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
                  open ? 'top-2 -rotate-45' : 'top-[0.9rem]'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell flex flex-col gap-1 border-t border-clay/20 bg-ivory/95 pb-8 pt-4 backdrop-blur-xl">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display py-3 text-3xl text-ink/90 transition-colors hover:text-gold"
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#inquiry"
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-4 self-start"
              >
                Plan Your Event
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
