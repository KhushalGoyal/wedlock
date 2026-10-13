/**
 * Brand, navigation and section copy.
 * Kept separate from presentation so wording can change without touching UI.
 * Copy is intentionally authentic: no invented history, team, awards,
 * testimonials, client names or statistics.
 */
import type { CategorySlug } from './media';

export const BRAND = {
  name: 'Wedlock Events',
  // Short, honest positioning drawn from the portfolio itself.
  tagline: 'Luxury weddings, designed as cinema.',
  shortIntro:
    'A wedding design and planning studio crafting immersive celebrations — from the first floral gateway to the final firework.',
};

/** The studio's directors (provided by the business). */
export interface Director {
  name: string;
  role: string;
}

export const DIRECTORS: Director[] = [
  { name: 'Pawan Nagal', role: 'Director' },
  { name: 'Dinesh Nagal', role: 'Director' },
];

/** Real social profiles only. */
export const SOCIAL = {
  instagram: {
    handle: '@wedlock__events_',
    url: 'https://www.instagram.com/wedlock__events_',
  },
};

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '#featured' },
  { label: 'Functions', href: '#functions' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Clients', href: '#clients' },
  { label: 'Inquire', href: '#inquiry' },
];

export interface FeaturedProject {
  /** Asset id from the media manifest used as the cover. */
  coverId: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Deep-links into the matching function gallery. */
  category: CategorySlug;
}

/**
 * A curated editorial selection. Titles describe the design and the function
 * on show — they do not claim specific couples or venues the footage can't
 * support. The exception, used honestly, is the carnival welcome captured on
 * camera for Deepak & Neha.
 */
export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    coverId: 'img64',
    eyebrow: 'Destination',
    title: 'A Palace, Reimagined',
    description:
      'A heritage facade turned into a private stage — floodlit stone framing a wall of white blooms.',
    category: 'venue',
  },
  {
    coverId: 'img32',
    eyebrow: 'Reception',
    title: 'Fireworks & Forever',
    description:
      'The night it all arrives: a statement stage, a full sky of pyrotechnics, and the couple at the centre of it.',
    category: 'reception',
  },
  {
    coverId: 'vid74',
    eyebrow: 'The Carnival · Deepak & Neha',
    title: 'A Welcome Worth Remembering',
    description:
      'A carnival-themed celebration, greeted by florals, type and colour from the very first step.',
    category: 'entrance',
  },
  {
    coverId: 'img67',
    eyebrow: 'Ceremony',
    title: 'Sacred Vows',
    description:
      'A red-and-gold mandap raised above an ornate aisle — tradition, staged with restraint and scale.',
    category: 'ceremony',
  },
  {
    coverId: 'img61',
    eyebrow: 'Haldi',
    title: 'Golden Mornings',
    description:
      'Marigold by the thousand, a floral ring and turmeric light — the warmest function of them all.',
    category: 'haldi',
  },
  {
    coverId: 'img52',
    eyebrow: 'Sangeet',
    title: 'After Dark',
    description:
      'Suspended decor, sapphire light and a stage engineered for performance and dance.',
    category: 'sangeet',
  },
];

/**
 * Client / celebrations list.
 * Only "Deepak & Neha" is a real, footage-supported entry. The rest are clearly
 * marked placeholders (`placeholder: true`) — neutral slots to be replaced with
 * real families/clients. Edit this array to update the Clients section; the UI
 * styles placeholders distinctly so they're never mistaken for real names.
 */
export interface Client {
  name: string;
  detail?: string;
  placeholder?: boolean;
}

export const CLIENTS: Client[] = [
  { name: 'Deepak & Neha', detail: 'The Carnival · Destination Wedding' },
  { name: 'Family Name', detail: 'Wedding · City', placeholder: true },
  { name: 'Family Name', detail: 'Haldi & Mehendi · City', placeholder: true },
  { name: 'Family Name', detail: 'Sangeet · City', placeholder: true },
  { name: 'Family Name', detail: 'Reception · City', placeholder: true },
  { name: 'Family Name', detail: 'Destination Wedding', placeholder: true },
  { name: 'Family Name', detail: 'Corporate Event', placeholder: true },
];

export const CLIENTS_INTRO = {
  eyebrow: 'In good company',
  heading: 'Families who trusted us with their biggest day',
  intro:
    'Every celebration here was planned, designed and delivered end to end. We keep this list growing with each family we have the privilege to work with.',
};

export interface Service {
  title: string;
  description: string;
}

/**
 * Services reflect capabilities evidenced across the portfolio
 * (full-function weddings, destination palace settings, decor, florals,
 * staging, entertainment and hospitality). Adapt as the business defines them.
 */
export const SERVICES: Service[] = [
  {
    title: 'Wedding Planning & Coordination',
    description:
      'End-to-end planning across every function, with on-ground coordination so the day runs without a seam.',
  },
  {
    title: 'Destination Weddings',
    description:
      'Palace and resort celebrations — logistics, guest movement and multi-day experiences, handled.',
  },
  {
    title: 'Venue Styling & Decor',
    description:
      'Concept-led transformations of heritage and garden venues, tailored to each couple and setting.',
  },
  {
    title: 'Floral & Stage Design',
    description:
      'Signature installations, mandaps, backdrops and stages built in-house, from sketch to build.',
  },
  {
    title: 'Entertainment & Artist Coordination',
    description:
      'Sound, lighting, LED and performance — rigged and programmed for sangeet nights and receptions.',
  },
  {
    title: 'Guest Experience & Hospitality',
    description:
      'Welcomes, lounges, favours and the small touches that make guests feel part of the celebration.',
  },
];

export interface ApproachStep {
  index: string;
  title: string;
  description: string;
}

export const APPROACH = {
  eyebrow: 'Our approach',
  heading: 'Every celebration, directed like a film.',
  intro:
    'We design weddings the way a film is made — with a point of view, a sense of pace, and obsessive attention to the frame. Colour, light, flowers and movement are composed so each moment feels inevitable and entirely your own.',
  steps: [
    {
      index: '01',
      title: 'Listen & Concept',
      description:
        'We start with your story, your families and your setting — then shape a visual direction that belongs only to you.',
    },
    {
      index: '02',
      title: 'Design & Build',
      description:
        'Florals, mandaps, stages and lounges are designed and produced in-house, detail by detail.',
    },
    {
      index: '03',
      title: 'Direct the Day',
      description:
        'On the day, we coordinate every cue — so you can be present for all of it while we hold the frame.',
    },
  ] as ApproachStep[],
};

// --- Inquiry form field options ---

export const EVENT_TYPES = [
  'Full Wedding (multiple functions)',
  'Wedding Ceremony',
  'Haldi',
  'Mehendi',
  'Sangeet / DJ Night',
  'Reception',
  'Cocktail / Lounge',
  'Engagement',
  'Destination Wedding',
  'Corporate / Private Event',
  'Other',
];

export const GUEST_RANGES = [
  'Up to 100',
  '100 – 250',
  '250 – 500',
  '500 – 1000',
  '1000+',
];

export const BUDGET_RANGES = [
  'Under ₹15 L',
  '₹15 – 40 L',
  '₹40 – 75 L',
  '₹75 L – 1.5 Cr',
  '₹1.5 Cr +',
  'Prefer to discuss',
];

export const CONTACT_METHODS = ['Email', 'Phone call', 'WhatsApp'];

// Common country dial codes for the phone field.
export const DIAL_CODES = [
  { code: '+91', label: 'IN +91' },
  { code: '+1', label: 'US +1' },
  { code: '+44', label: 'UK +44' },
  { code: '+971', label: 'UAE +971' },
  { code: '+65', label: 'SG +65' },
  { code: '+61', label: 'AU +61' },
  { code: '+1', label: 'CA +1' },
];
