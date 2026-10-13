import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import FeaturedEvents from './sections/FeaturedEvents';
import ExploreByFunction from './sections/ExploreByFunction';
import Gallery, { type GalleryFilter } from './sections/Gallery';
import Services from './sections/Services';
import Approach from './sections/Approach';
import InquiryForm from './sections/InquiryForm';
import Footer from './sections/Footer';
import type { CategorySlug } from './data/media';

export default function App() {
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');

  // Clicking a featured project or function card filters the gallery and
  // scrolls there — the single place galleries are explored.
  const openCategory = useCallback((slug: CategorySlug) => {
    setGalleryFilter(slug);
    window.requestAnimationFrame(() => {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <>
      <a
        href="#featured"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <FeaturedEvents onOpenCategory={openCategory} />
        <ExploreByFunction onOpenCategory={openCategory} />
        <Gallery filter={galleryFilter} onFilterChange={setGalleryFilter} />
        <Services />
        <Approach />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
