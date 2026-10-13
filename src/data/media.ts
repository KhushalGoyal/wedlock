/**
 * Wedlock Events — Media Manifest
 * ------------------------------------------------------------------
 * A single, data-driven source of truth that maps every photograph and
 * video in /public/media to a display context. UI components read from this
 * file only — no media is hard-coded into components, so new assets can be
 * added or re-categorised here without touching the interface.
 *
 * Assets were classified by visual inspection of the actual footage from the
 * studio's completed events. Categories are derived from what the assets
 * genuinely show (decor, stage design, florals and the individual wedding
 * functions). We do not invent couples, venues or event details that the
 * media does not support. The one identifiable project — a carnival-themed
 * celebration for "Deepak & Neha" — is taken from on-camera signage.
 *
 * `confidence` flags how certain the classification is:
 *   'high'   — subject matter is unambiguous
 *   'medium' — a reasonable reading; could belong to an adjacent function
 *   'low'    — supporting/ambient asset; review before feature use
 *
 * A few source files were intentionally excluded from the manifest:
 *   - one "food lounge" collage (a composite, not a clean photograph)
 *   - two social-media screenshots (not original, uncropped studio assets)
 *   - one phone screenshot with letterboxing and on-screen device chrome
 *   - one near-duplicate of an entrance corridor
 * The original files remain untouched in /public/media; they are simply not
 * surfaced in the UI.
 */

export type MediaType = 'image' | 'video';
export type Confidence = 'high' | 'medium' | 'low';

export type CategorySlug =
  | 'ceremony'
  | 'haldi'
  | 'mehendi'
  | 'sangeet'
  | 'reception'
  | 'cocktail'
  | 'entrance'
  | 'decor'
  | 'dining'
  | 'venue';

export interface MediaAsset {
  id: string;
  type: MediaType;
  /** Public URL served from the site root. */
  src: string;
  /** Poster image for videos (also served from root). */
  poster?: string;
  /** Display (auto-oriented) dimensions, used to reserve aspect ratio. */
  width: number;
  height: number;
  category: CategorySlug;
  /** Lower number = higher display priority within a category. */
  priority: number;
  featured?: boolean;
  /** Eligible for the full-bleed hero (landscape, high impact). */
  hero?: boolean;
  caption: string;
  /** Identified project/event, only when supported by the footage. */
  project?: string;
  confidence: Confidence;
  /** Video length in seconds, when applicable. */
  duration?: number;
}

export interface Category {
  slug: CategorySlug;
  label: string;
  tagline: string;
  blurb: string;
}

/** Display order for "Explore by Function". Empty categories are hidden in the UI. */
export const CATEGORIES: Category[] = [
  {
    slug: 'ceremony',
    label: 'Wedding Ceremony',
    tagline: 'The vows',
    blurb: 'Mandaps and ceremony sets built around light, flowers and sacred ritual.',
  },
  {
    slug: 'haldi',
    label: 'Haldi',
    tagline: 'Golden mornings',
    blurb: 'Marigold-soaked mornings in every shade of turmeric and sun.',
  },
  {
    slug: 'mehendi',
    label: 'Mehendi',
    tagline: 'Colour & joy',
    blurb: 'Playful, pigment-rich sets designed for an afternoon of celebration.',
  },
  {
    slug: 'sangeet',
    label: 'Sangeet & DJ Nights',
    tagline: 'After dark',
    blurb: 'Stages, rigging and lighting engineered for performance and dance.',
  },
  {
    slug: 'reception',
    label: 'Reception',
    tagline: 'The grand reveal',
    blurb: 'Statement stages and show moments for the night it all comes together.',
  },
  {
    slug: 'cocktail',
    label: 'Cocktail & Lounge',
    tagline: 'Golden hour',
    blurb: 'Poolside cabanas and lounges styled for conversation and cocktails.',
  },
  {
    slug: 'entrance',
    label: 'Welcome & Entrances',
    tagline: 'First impressions',
    blurb: 'Floral gateways and passages that set the tone from the first step.',
  },
  {
    slug: 'decor',
    label: 'Floral & Stage Design',
    tagline: 'The craft',
    blurb: 'Signature installations, backdrops and the details that define a day.',
  },
  {
    slug: 'dining',
    label: 'Tablescapes & Dining',
    tagline: 'At the table',
    blurb: 'Layered tablescapes and dining rooms set beneath the open sky.',
  },
  {
    slug: 'venue',
    label: 'Palace Venues',
    tagline: 'Destination',
    blurb: 'Heritage facades and grounds transformed into a private celebration.',
  },
];

const M = '/media';
const P = '/media/posters';

export const MEDIA: MediaAsset[] = [
  // ---------------- Images ----------------
  { id: 'img01', type: 'image', src: `${M}/1b40849b-3347-4258-8635-d84f8261d0ca.JPG`, width: 862, height: 833, category: 'mehendi', priority: 1, featured: true, caption: 'A hand-painted mandala backdrop framing a layered floral lounge.', confidence: 'high' },
  { id: 'img02', type: 'image', src: `${M}/2eb37c48-1baa-45af-9996-9084ed256495.JPG`, width: 875, height: 830, category: 'mehendi', priority: 3, caption: 'A rainbow aisle beneath draped canopy and florals.', confidence: 'high' },
  { id: 'img03', type: 'image', src: `${M}/489658d7-1966-4b77-ba45-61cc5b48d640.JPG`, width: 607, height: 426, category: 'sangeet', priority: 7, caption: 'Cascading blue florals and mirror-ball lighting.', confidence: 'medium' },
  { id: 'img04', type: 'image', src: `${M}/5b7ca307-f2ab-4d66-86a7-c524537d9dc6.JPG`, width: 736, height: 552, category: 'cocktail', priority: 5, caption: 'A pastel cabana lounge set beside the pool.', confidence: 'medium' },
  { id: 'img05', type: 'image', src: `${M}/655a9a21-c85d-441e-98a7-428050f28905.JPG`, width: 960, height: 1280, category: 'entrance', priority: 5, caption: 'A blossoming floral arch marking the entrance.', confidence: 'medium' },
  { id: 'img06', type: 'image', src: `${M}/6709273b-9cc8-438e-b2d1-4c2eb0a4d357.JPG`, width: 670, height: 330, category: 'sangeet', priority: 8, caption: 'The main stage rigged for a live sangeet performance.', confidence: 'medium' },
  { id: 'img08', type: 'image', src: `${M}/7f3273b0-9a28-4022-9c45-60d072c61402.JPG`, width: 886, height: 921, category: 'ceremony', priority: 1, featured: true, caption: 'A garden mandap dressed in orchids and soft drapes.', confidence: 'high' },
  { id: 'img09', type: 'image', src: `${M}/83756f18-aa78-4d6c-9246-8b1937308e08.JPG`, width: 563, height: 463, category: 'decor', priority: 8, caption: 'A bohemian tablescape with fruit and marigold accents.', confidence: 'medium' },
  { id: 'img11', type: 'image', src: `${M}/8e59cd5e-99ad-49ab-8a41-41f6b9d93195.JPG`, width: 960, height: 1280, category: 'cocktail', priority: 2, featured: true, caption: 'A sunset cabana lounge in tangerine and magenta.', confidence: 'high' },
  { id: 'img12', type: 'image', src: `${M}/902f1df4-fd07-4e55-84a8-b910bf3aa506.JPG`, width: 736, height: 736, category: 'mehendi', priority: 4, caption: 'A pastel mehendi set with parasols and a floral swing.', confidence: 'high' },
  { id: 'img13', type: 'image', src: `${M}/93dab4e4-137d-4e3e-ac5a-2837e2cdcd72.JPG`, width: 552, height: 503, category: 'reception', priority: 7, caption: 'An Edison-bulb reception stage with geometric frames.', confidence: 'medium' },
  { id: 'img14', type: 'image', src: `${M}/9a4b05b9-d2e1-4be9-8e83-5510a5bb6d49.JPG`, width: 896, height: 982, category: 'reception', priority: 4, caption: 'An amethyst draped stage with a statement floral sofa.', confidence: 'medium' },
  { id: 'img16', type: 'image', src: `${M}/b741e4c0-482a-477e-a67a-d184588ede07.JPG`, width: 440, height: 578, category: 'ceremony', priority: 6, caption: 'An ivory-and-gold mandap mirrored in the pool.', confidence: 'medium' },
  { id: 'img17', type: 'image', src: `${M}/b9155da7-b434-4eb6-a4d2-f493d6363bae.JPG`, width: 905, height: 482, category: 'cocktail', priority: 6, caption: 'A soft pastel lounge backdrop by the water.', confidence: 'medium' },
  { id: 'img18', type: 'image', src: `${M}/c03476fe-256a-47f4-866e-87926fdd4c02.JPG`, width: 960, height: 1280, category: 'cocktail', priority: 1, featured: true, caption: 'Scarlet cabana draping over a poolside lounge.', confidence: 'high' },
  { id: 'img19', type: 'image', src: `${M}/c9a4b10b-b195-4638-9e9d-958cb20879c4.JPG`, width: 867, height: 737, category: 'mehendi', priority: 2, featured: true, caption: 'A fuchsia sofa against a riot of colour and bloom.', confidence: 'high' },
  { id: 'img20', type: 'image', src: `${M}/ebf7d183-e66f-4749-bb50-8f50d1974600.JPG`, width: 960, height: 1280, category: 'mehendi', priority: 6, caption: 'Hot-pink stage styling against a heritage facade.', confidence: 'medium' },
  { id: 'img21', type: 'image', src: `${M}/eed135a7-bfa1-4d8f-aa55-8d614acbd2e4.JPG`, width: 839, height: 804, category: 'decor', priority: 1, featured: true, caption: 'A wall of petal-filled bowls behind a cream settee.', confidence: 'high' },
  { id: 'img22', type: 'image', src: `${M}/f04cf19e-7f0d-4129-ab8d-4cc25246940a.JPG`, width: 915, height: 845, category: 'cocktail', priority: 4, caption: 'A violet lounge beneath a candy-striped canopy.', confidence: 'high' },
  { id: 'img23', type: 'image', src: `${M}/f148de65-509d-4678-b906-69a355fba1e3.JPG`, width: 1079, height: 1417, category: 'haldi', priority: 2, featured: true, caption: "A marigold installation cascading to the water's edge.", confidence: 'high' },
  { id: 'img25', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-49 2.jpg`, width: 1280, height: 720, category: 'sangeet', priority: 5, caption: 'The grounds lit for an evening celebration.', confidence: 'medium' },
  { id: 'img26', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-49.jpg`, width: 1200, height: 1600, category: 'entrance', priority: 1, featured: true, caption: 'A dramatic, candle-lit entrance passage.', confidence: 'high' },
  { id: 'img27', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-50 2.jpg`, width: 1080, height: 1431, category: 'sangeet', priority: 1, featured: true, caption: 'An electric-blue stage built for the DJ night.', confidence: 'high' },
  { id: 'img28', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-50.jpg`, width: 720, height: 1280, category: 'entrance', priority: 4, caption: 'A floral corridor crowned with crystal chandeliers.', confidence: 'high' },
  { id: 'img30', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-51.jpg`, width: 960, height: 1280, category: 'reception', priority: 5, caption: 'A colourful stage above an illuminated dance floor.', confidence: 'medium' },
  { id: 'img31', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-52.jpg`, width: 960, height: 1280, category: 'dining', priority: 3, caption: 'A marble dining table with gilded detailing.', confidence: 'medium' },
  { id: 'img32', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-53.jpg`, width: 1280, height: 960, category: 'reception', priority: 2, featured: true, hero: true, caption: 'Fireworks frame the couple on the reception stage.', confidence: 'high' },
  { id: 'img33', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-54.jpg`, width: 1280, height: 960, category: 'venue', priority: 2, featured: true, caption: 'A heritage palace glowing above a sea of flowers.', confidence: 'high' },
  { id: 'img34', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-55 2.jpg`, width: 960, height: 1280, category: 'mehendi', priority: 7, caption: 'Pop-art styling with a poolside lounge.', confidence: 'medium' },
  { id: 'img35', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-55.jpg`, width: 1280, height: 960, category: 'cocktail', priority: 3, caption: 'A canopied lounge set across the pool from the stage.', confidence: 'medium' },
  { id: 'img36', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-56.jpg`, width: 1280, height: 960, category: 'cocktail', priority: 7, caption: 'A pink draped lounge wrapping the poolside.', confidence: 'medium' },
  { id: 'img37', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-57 2.jpg`, width: 960, height: 1280, category: 'haldi', priority: 3, caption: 'A marigold-and-yellow floral backdrop.', confidence: 'high' },
  { id: 'img38', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-57.jpg`, width: 1280, height: 960, category: 'haldi', priority: 5, caption: 'An evening haldi set beneath draped yellow silk.', confidence: 'medium' },
  { id: 'img39', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-58 2.jpg`, width: 1280, height: 960, category: 'haldi', priority: 4, caption: 'Poolside marigold decor with vintage bicycle props.', confidence: 'high' },
  { id: 'img40', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-58.jpg`, width: 1280, height: 960, category: 'decor', priority: 5, caption: 'A colourful marigold letter installation.', confidence: 'high' },
  { id: 'img41', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-59 2.jpg`, width: 960, height: 1280, category: 'haldi', priority: 7, caption: 'An orange marigold mandap by the pool.', confidence: 'high' },
  { id: 'img42', type: 'image', src: `${M}/PHOTO-2026-05-25-14-04-59.jpg`, width: 960, height: 1280, category: 'haldi', priority: 8, caption: 'Yellow haldi tables shaded by hand-worked parasols.', confidence: 'medium' },
  { id: 'img43', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-00 2.jpg`, width: 1280, height: 627, category: 'venue', priority: 4, caption: 'A floodlit palace facade at the heart of the venue.', confidence: 'high' },
  { id: 'img44', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-00 3.jpg`, width: 960, height: 1280, category: 'entrance', priority: 6, caption: 'A marigold gateway opening onto the grounds.', confidence: 'high' },
  { id: 'img45', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-00.jpg`, width: 1280, height: 960, category: 'mehendi', priority: 5, caption: 'A blush draped mehendi lounge with pendant decor.', confidence: 'medium' },
  { id: 'img46', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-01.jpg`, width: 960, height: 1280, category: 'haldi', priority: 9, caption: 'A marigold mandap mirrored in a reflecting pool.', confidence: 'medium' },
  { id: 'img47', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-02 2.jpg`, width: 1200, height: 1600, category: 'decor', priority: 9, caption: 'Floral detail caught against the night.', confidence: 'low' },
  { id: 'img48', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-02 3.jpg`, width: 1280, height: 960, category: 'cocktail', priority: 8, caption: 'A poolside pergola draped in yellow and white.', confidence: 'medium' },
  { id: 'img49', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-02.jpg`, width: 1280, height: 960, category: 'dining', priority: 4, caption: 'A garden dining lawn under a canopy of string lights.', confidence: 'medium' },
  { id: 'img50', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-03 2.jpg`, width: 1170, height: 802, category: 'decor', priority: 6, caption: 'The Wedlock Events marquee in lights.', confidence: 'high' },
  { id: 'img51', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-03.jpg`, width: 1170, height: 795, category: 'sangeet', priority: 4, caption: 'A blue-lit performance stage branded for the night.', confidence: 'high' },
  { id: 'img52', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-04 2.jpg`, width: 1170, height: 756, category: 'sangeet', priority: 2, featured: true, caption: 'A suspended-decor stage glowing in sapphire light.', confidence: 'high' },
  { id: 'img53', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-04.jpg`, width: 1600, height: 1200, category: 'sangeet', priority: 3, caption: 'A full LED concert stage built for the celebration.', confidence: 'high' },
  { id: 'img54', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-05 2.jpg`, width: 1280, height: 852, category: 'entrance', priority: 2, featured: true, hero: true, caption: 'A chandelier-lined passage in ivory and gold.', confidence: 'high' },
  { id: 'img55', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-05.jpg`, width: 1135, height: 1001, category: 'decor', priority: 2, featured: true, caption: 'A sculptural floral backdrop behind a velvet sofa.', confidence: 'high' },
  { id: 'img56', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-06 2.jpg`, width: 1170, height: 769, category: 'dining', priority: 2, caption: 'Violet-lit dining tables with sculpted ghost chairs.', confidence: 'high' },
  { id: 'img57', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-06.jpg`, width: 682, height: 276, category: 'reception', priority: 8, caption: 'A draped evening stage washed in green light.', confidence: 'low' },
  { id: 'img58', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-07.jpg`, width: 960, height: 1280, category: 'dining', priority: 1, featured: true, caption: 'A long banquet table beneath a single chandelier.', confidence: 'high' },
  { id: 'img59', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-08 2.jpg`, width: 1079, height: 1501, category: 'entrance', priority: 3, featured: true, caption: 'A white draped corridor trailing fresh greenery.', confidence: 'high' },
  { id: 'img60', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-08.jpg`, width: 960, height: 1280, category: 'cocktail', priority: 9, caption: 'An amber canopy lounge with jewel-toned seating.', confidence: 'medium' },
  { id: 'img61', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-09 2.jpg`, width: 1280, height: 960, category: 'haldi', priority: 1, featured: true, caption: 'A marigold haldi backdrop with a floral ring.', confidence: 'high' },
  { id: 'img62', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-09 3.jpg`, width: 1170, height: 1569, category: 'dining', priority: 5, caption: 'A tented dining setup laid for the evening.', confidence: 'medium' },
  { id: 'img63', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-09.jpg`, width: 960, height: 1280, category: 'dining', priority: 6, caption: 'A gilded candelabra centrepiece on a dressed table.', confidence: 'high' },
  { id: 'img64', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-10.jpg`, width: 1280, height: 960, category: 'venue', priority: 1, featured: true, hero: true, caption: 'The palace aglow behind a white floral stage.', confidence: 'high' },
  { id: 'img65', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-11 2.jpg`, width: 960, height: 1280, category: 'entrance', priority: 7, caption: 'A fairy-lit walkway leading toward the stage.', confidence: 'medium' },
  { id: 'img66', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-11 3.jpg`, width: 1280, height: 960, category: 'venue', priority: 3, caption: 'A wide view of the illuminated palace at night.', confidence: 'high' },
  { id: 'img67', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-11.jpg`, width: 960, height: 1280, category: 'ceremony', priority: 2, featured: true, caption: 'A red-and-gold mandap above an ornate carpeted aisle.', confidence: 'high' },
  { id: 'img68', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-12 2.jpg`, width: 960, height: 1280, category: 'ceremony', priority: 3, featured: true, caption: 'A fairy-light canopy over a floral mandap seat.', confidence: 'high' },
  { id: 'img69', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-12.jpg`, width: 1200, height: 1600, category: 'decor', priority: 3, featured: true, hero: true, caption: 'A suspended white floral installation at the palace.', confidence: 'high' },
  { id: 'img70', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-13 2.jpg`, width: 1079, height: 1417, category: 'haldi', priority: 10, caption: 'A yellow floral pergola framing the poolside.', confidence: 'medium' },
  { id: 'img71', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-13 3.jpg`, width: 960, height: 1280, category: 'reception', priority: 6, caption: 'A gilded candelabra and florals under a chandelier.', confidence: 'medium' },
  { id: 'img72', type: 'image', src: `${M}/PHOTO-2026-05-25-14-05-13.jpg`, width: 716, height: 1600, category: 'reception', priority: 9, caption: 'A yellow-and-white tented reception hall.', confidence: 'low' },

  // ---------------- Videos ----------------
  { id: 'vid73', type: 'video', src: `${M}/09f63da5-8228-491b-a987-9ecd2d647bf6.MP4`, poster: `${P}/09f63da5-8228-491b-a987-9ecd2d647bf6.jpg`, width: 464, height: 832, category: 'mehendi', priority: 8, caption: 'A playful favours counter stocked for guests.', confidence: 'medium', duration: 8 },
  { id: 'vid74', type: 'video', src: `${M}/365cb371-2708-42ab-ae11-bd9889926076.MP4`, poster: `${P}/365cb371-2708-42ab-ae11-bd9889926076.jpg`, width: 480, height: 624, category: 'entrance', priority: 2, featured: true, caption: 'The carnival-theme welcome board for Deepak & Neha.', project: 'Deepak & Neha — The Carnival', confidence: 'high', duration: 15 },
  { id: 'vid75', type: 'video', src: `${M}/3e6e5b4e-25af-48f6-a30b-73dd2bbc4260.MP4`, poster: `${P}/3e6e5b4e-25af-48f6-a30b-73dd2bbc4260.jpg`, width: 480, height: 848, category: 'cocktail', priority: 10, caption: 'A botanical blue lounge styled for cocktails.', confidence: 'medium', duration: 23 },
  { id: 'vid76', type: 'video', src: `${M}/5847cd73-026d-4254-929e-6dce4fbf634a.MP4`, poster: `${P}/5847cd73-026d-4254-929e-6dce4fbf634a.jpg`, width: 480, height: 704, category: 'mehendi', priority: 9, caption: 'A boho mandap in blush and sage.', confidence: 'medium', duration: 17 },
  { id: 'vid77', type: 'video', src: `${M}/87b2ead3-4112-4e9a-8e41-8c6bac748193.MP4`, poster: `${P}/87b2ead3-4112-4e9a-8e41-8c6bac748193.jpg`, width: 480, height: 848, category: 'mehendi', priority: 1, featured: true, caption: 'A colour-drenched mehendi entrance in full bloom.', confidence: 'high', duration: 24 },
  { id: 'vid78', type: 'video', src: `${M}/ae0fcb75-973f-4c47-8831-57743208413f.MP4`, poster: `${P}/ae0fcb75-973f-4c47-8831-57743208413f.jpg`, width: 480, height: 848, category: 'decor', priority: 4, featured: true, caption: 'A scarlet rangoli-inspired floral installation.', confidence: 'high', duration: 10 },
  { id: 'vid79', type: 'video', src: `${M}/b913c0c1-ce16-4b8d-8123-48e0b17aaaa7.MP4`, poster: `${P}/b913c0c1-ce16-4b8d-8123-48e0b17aaaa7.jpg`, width: 480, height: 704, category: 'mehendi', priority: 10, caption: 'Pop-art styling with painted backdrops and pillars.', confidence: 'medium', duration: 28 },
  { id: 'vid80', type: 'video', src: `${M}/c1c0ee8c-37b1-4753-8885-2866f56a4cc1.MP4`, poster: `${P}/c1c0ee8c-37b1-4753-8885-2866f56a4cc1.jpg`, width: 480, height: 736, category: 'haldi', priority: 1, featured: true, caption: 'The haldi welcome framed in pampas and bloom.', confidence: 'high', duration: 14 },
  { id: 'vid81', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-01.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-01.jpg`, width: 464, height: 832, category: 'reception', priority: 1, featured: true, caption: "Fireworks and fountains for the couple's grand moment.", confidence: 'high', duration: 13 },
  { id: 'vid82', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-03.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-03.jpg`, width: 464, height: 832, category: 'reception', priority: 3, featured: true, caption: 'A pyrotechnic finale as the celebration peaks.', confidence: 'high', duration: 41 },
  { id: 'vid83', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-07.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-07.jpg`, width: 464, height: 832, category: 'entrance', priority: 1, featured: true, caption: 'A floral-arched walkway into the palace grounds.', confidence: 'high', duration: 31 },
  { id: 'vid84', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-10 2.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-10 2.jpg`, width: 480, height: 848, category: 'decor', priority: 7, caption: 'A garden pathway hung with suspended florals.', confidence: 'medium', duration: 13 },
  { id: 'vid85', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-10.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-10.jpg`, width: 480, height: 848, category: 'cocktail', priority: 11, caption: 'Poolside styling in candy pink and pastel.', confidence: 'medium', duration: 15 },
  { id: 'vid86', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-13.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-13.jpg`, width: 480, height: 848, category: 'decor', priority: 8, caption: 'A detailed tablescape layered in blue roses.', confidence: 'medium', duration: 38 },
  { id: 'vid87', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-14 2.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-14 2.jpg`, width: 464, height: 832, category: 'haldi', priority: 11, caption: 'A sunlit yellow mandap beside the pool.', confidence: 'medium', duration: 25 },
  { id: 'vid88', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-14 3.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-14 3.jpg`, width: 480, height: 848, category: 'cocktail', priority: 12, caption: 'A sapphire-lit lounge dressed for the evening.', confidence: 'medium', duration: 17 },
  { id: 'vid89', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-14.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-14.jpg`, width: 464, height: 832, category: 'entrance', priority: 3, featured: true, caption: 'A blush floral gateway welcoming guests.', confidence: 'high', duration: 30 },
  { id: 'vid90', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-15.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-15.jpg`, width: 464, height: 832, category: 'entrance', priority: 8, caption: 'A rose-and-orchid arch marking the entrance.', confidence: 'medium', duration: 29 },
  { id: 'vid91', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-16 2.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-16 2.jpg`, width: 480, height: 848, category: 'reception', priority: 7, caption: 'An evening stage draped for the reception.', confidence: 'medium', duration: 44 },
  { id: 'vid92', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-16 3.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-16 3.jpg`, width: 464, height: 832, category: 'entrance', priority: 4, featured: true, caption: 'A luminous floral entrance with light sculptures.', confidence: 'high', duration: 23 },
  { id: 'vid93', type: 'video', src: `${M}/VIDEO-2026-05-25-14-05-16.mp4`, poster: `${P}/VIDEO-2026-05-25-14-05-16.jpg`, width: 720, height: 1280, category: 'reception', priority: 4, caption: "The couple's reception moment on a statement stage.", confidence: 'medium', duration: 26 },
];

// ------------------------------------------------------------------
// Derived helpers — components consume these, never raw indices.
// ------------------------------------------------------------------

export const byPriority = (a: MediaAsset, b: MediaAsset) => a.priority - b.priority;

export function assetsByCategory(slug: CategorySlug): MediaAsset[] {
  return MEDIA.filter((m) => m.category === slug).sort(byPriority);
}

/** Categories that actually contain assets, in display order (empties hidden). */
export function populatedCategories(): (Category & { count: number; cover: MediaAsset })[] {
  return CATEGORIES.map((c) => {
    const assets = assetsByCategory(c.slug);
    return { ...c, count: assets.length, cover: assets[0] };
  }).filter((c) => c.count > 0 && c.cover);
}

export function categoryCover(slug: CategorySlug): MediaAsset | undefined {
  return assetsByCategory(slug)[0];
}

export function categoryLabel(slug: CategorySlug): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function assetById(id: string): MediaAsset | undefined {
  return MEDIA.find((m) => m.id === id);
}

export const heroAssets = MEDIA.filter((m) => m.hero).sort(byPriority);

export const featuredAssets = MEDIA.filter((m) => m.featured).sort(byPriority);

export const totalCounts = {
  images: MEDIA.filter((m) => m.type === 'image').length,
  videos: MEDIA.filter((m) => m.type === 'video').length,
  categories: populatedCategories().length,
};
