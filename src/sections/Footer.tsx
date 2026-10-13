import { BRAND, NAV_LINKS } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-ivory">
      <div className="shell py-16">
        <div className="flex flex-col gap-12 border-b border-ivory/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <a href="#top" className="display text-4xl">
              Wedlock<span className="text-gold">.</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60 text-pretty">
              {BRAND.tagline} Designing and directing luxury weddings and
              destination celebrations, one unforgettable event at a time.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="eyebrow text-champagne">Ready when you are</p>
            <a href="#inquiry" className="btn btn-light">
              Plan Your Event
            </a>
            <p className="text-xs text-ivory/45">By appointment · Destination weddings worldwide</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-xs uppercase tracking-wide2 text-ivory/55 transition-colors hover:text-ivory"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-ivory/40">
            © {year} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
