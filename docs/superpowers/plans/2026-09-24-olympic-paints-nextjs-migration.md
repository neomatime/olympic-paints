# Olympic Paints — Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Olympic Paints static HTML/CSS/JS site to Next.js 15 App Router with TypeScript, preserving all features and enhancing the Color Cafe rebrand.

**Architecture:** Next.js 15 App Router with route groups `(marketing)`, `(shop)`, `(studio)`, `(legal)`. All data is static typed files — no database. Cart uses React context with localStorage. The existing 5,737-line CSS is replaced with Tailwind v4 plus brand custom properties extracted from the current `:root` palette.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS v4, Vercel

## Global Constraints

- TypeScript strict mode (`"strict": true` in tsconfig)
- Next.js 15 App Router — no Pages Router
- Tailwind CSS v4 — utility-first, brand tokens as CSS custom properties in `globals.css`
- All components default to server components unless they need interactivity (`"use client"`)
- Fonts: Balimo (serif/display, local files) + Outfit (sans, Google Fonts)
- Brand colours from existing `:root`: `--olympic-yellow: #FBC70F`, `--espresso: #111111`, `--paper: #F7F7F5`, `--linen: #F1F1EE`, `--sage: #7E9B72`, etc.
- `prefers-reduced-motion` respected on all animations
- WCAG 2.1 AA: all form inputs labelled, 4.5:1 contrast for body text, focus indicators, semantic HTML
- No database, no auth, no real payments in Phase 1
- Existing assets live at `public/images/`, `public/fonts/`, `public/videos/` (migrated from `assests/`)
- Deploy to Vercel

---

## File Map

```
olympic-paints/
├── public/
│   ├── fonts/
│   │   ├── Balimo-Regular.otf
│   │   ├── Balimo-Regular.ttf
│   │   ├── Balimo-Bold.otf
│   │   └── Balimo-Bold.ttf
│   ├── images/                      # Migrated from assests/images/
│   │   ├── logo.png
│   │   ├── DETAILS_1.JPG ... DETAILS_44.JPG
│   │   └── *.svg
│   └── videos/                      # Migrated from assests/videos/
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout: fonts, metadata, header/footer, CartProvider
│   │   ├── not-found.tsx            # Custom 404
│   │   ├── (marketing)/
│   │   │   ├── page.tsx             # Home — hero carousel, stats, cafe primer, discovery, journey
│   │   │   ├── our-story/
│   │   │   │   └── page.tsx
│   │   │   ├── colour-cafe/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── find-a-store/
│   │   │       └── page.tsx
│   │   ├── (shop)/
│   │   │   ├── products/
│   │   │   │   ├── page.tsx         # Product catalogue with filters
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # Product detail
│   │   │   ├── collections/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   └── checkout/
│   │   │       └── page.tsx
│   │   ├── (studio)/
│   │   │   ├── inspiration/
│   │   │   │   └── page.tsx
│   │   │   └── studio/
│   │   │       ├── page.tsx         # Studio landing
│   │   │       ├── palette-builder/
│   │   │       │   └── page.tsx
│   │   │       ├── visualiser/
│   │   │       │   └── page.tsx     # Shell only
│   │   │       └── book/
│   │   │           └── page.tsx     # Shell only
│   │   └── (legal)/
│   │       ├── privacy/
│   │       │   └── page.tsx
│   │       ├── terms/
│   │       │   └── page.tsx
│   │       ├── returns/
│   │       │   └── page.tsx
│   │       └── shipping/
│   │       │   └── page.tsx
│   │       └── layout.tsx           # Shared legal page layout
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   └── modal.tsx
│   │   ├── layout/
│   │   │   ├── site-header.tsx
│   │   │   ├── site-footer.tsx
│   │   │   ├── mobile-menu.tsx
│   │   │   └── skip-link.tsx
│   │   ├── home/
│   │   │   ├── hero-carousel.tsx
│   │   │   ├── stats-strip.tsx
│   │   │   ├── cafe-primer.tsx
│   │   │   ├── discovery-section.tsx
│   │   │   └── journey-steps.tsx
│   │   ├── shop/
│   │   │   ├── product-card.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-detail.tsx
│   │   │   ├── colour-swatch.tsx
│   │   │   ├── cart-drawer.tsx
│   │   │   └── size-select.tsx
│   │   ├── studio/
│   │   │   └── palette-builder.tsx
│   │   └── shared/
│   │       ├── scroll-reveal.tsx
│   │       ├── section-heading.tsx
│   │       ├── page-hero.tsx
│   │       ├── image-gallery.tsx
│   │       ├── video-player.tsx
│   │       ├── breadcrumb.tsx
│   │       └── coming-soon.tsx
│   ├── context/
│   │   └── cart-context.tsx
│   ├── hooks/
│   │   ├── use-scroll.ts
│   │   ├── use-media-query.ts
│   │   └── use-reduced-motion.ts
│   ├── data/
│   │   ├── products.ts
│   │   ├── collections.ts
│   │   ├── colours.ts
│   │   ├── inspiration.ts
│   │   ├── team.ts
│   │   ├── store-locations.ts
│   │   └── navigation.ts
│   ├── types/
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── .gitignore
```

---

### Task 1: Project Scaffold & Brand Tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `.gitignore`
- Create: `src/styles/globals.css`
- Create: `src/types/index.ts`
- Create: `src/lib/utils.ts`
- Move: `assests/font/*` → `public/fonts/`, `assests/images/*` → `public/images/`, `assests/videos/*` → `public/videos/`

**Interfaces:**
- Produces: Tailwind config with brand tokens, all shared types (`Product`, `ColourSwatch`, `Collection`, `RoomInspiration`, `CartItem`, `TeamMember`, `StoreLocation`, `NavItem`), utility functions (`cn()` for class merging, `formatPrice()` for ZAR formatting)

- [ ] **Step 1: Initialise Next.js project**

Run from the project root:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

If the directory is not empty, create in a temp directory and move files, preserving the existing git history.

- [ ] **Step 2: Move existing assets to `public/`**

```bash
mkdir -p public/fonts public/images public/videos
cp assests/font/* public/fonts/
cp assests/images/* public/images/
cp -r assests/videos/* public/videos/
cp logo.png public/images/
```

- [ ] **Step 3: Write `src/styles/globals.css` with brand tokens**

Extract the existing `:root` palette from `styles.css` (lines 27-55) into Tailwind's CSS layer:

```css
@import "tailwindcss";

@font-face {
  font-family: 'Balimo';
  src: url('/fonts/Balimo-Regular.otf') format('opentype'),
       url('/fonts/Balimo-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Balimo';
  src: url('/fonts/Balimo-Bold.otf') format('opentype'),
       url('/fonts/Balimo-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@theme {
  --color-olympic-yellow: #FBC70F;
  --color-yellow-soft: #FFF6CC;
  --color-yellow-deep: #D7A500;
  --color-espresso: #111111;
  --color-walnut: #252525;
  --color-taupe: #5F5F5F;
  --color-ink: #111111;
  --color-cream: #FFFFFF;
  --color-paper: #F7F7F5;
  --color-linen: #F1F1EE;
  --color-nude: #E8E8E3;
  --color-blush: #D7D7D2;
  --color-sage: #7E9B72;
  --color-muted: #5E5E5E;

  --font-family-serif: 'Balimo', Georgia, serif;
  --font-family-sans: 'Outfit', 'Inter', system-ui, sans-serif;

  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
}

@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 88px;
  }

  body {
    @apply font-sans text-ink bg-cream antialiased leading-relaxed;
  }

  h1, h2, h3 {
    @apply font-serif font-normal tracking-tight;
  }

  h1 {
    font-size: clamp(3.2rem, 7.5vw, 7.5rem);
    line-height: 0.92;
  }

  h2 {
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    line-height: 1;
  }

  h3 {
    font-size: clamp(1.15rem, 1.8vw, 1.35rem);
    line-height: 1.25;
  }
}
```

- [ ] **Step 4: Write `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-family-serif)"],
        sans: ["var(--font-family-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Write `src/types/index.ts` with all shared types**

```typescript
export type ProductCategory = 'interior' | 'exterior' | 'specialist' | 'equipment';
export type ProductFinish = 'matt' | 'silk' | 'gloss' | 'eggshell' | 'suede';
export type ColourFamily = 'warm' | 'cool' | 'neutral' | 'bold' | 'earth';
export type RoomType = 'living-room' | 'bedroom' | 'kitchen' | 'bathroom' | 'kids-room' | 'outdoor';

export type ColourSwatch = {
  id: string;
  name: string;
  hex: string;
  family: ColourFamily;
  collection?: string;
};

export type ProductSize = {
  label: string;
  ml: number;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  finish?: ProductFinish;
  sizes: ProductSize[];
  colours: ColourSwatch[];
  images: string[];
  featured: boolean;
  badge?: 'bestseller' | 'new';
  rating?: { score: number; count: number };
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  colours: ColourSwatch[];
  rooms: RoomInspiration[];
  year: number;
};

export type RoomInspiration = {
  id: string;
  title: string;
  roomType: RoomType;
  images: { before?: string; after: string };
  coloursUsed: ColourSwatch[];
  designer?: string;
};

export type CartItem = {
  productId: string;
  productName: string;
  colourId: string;
  colourName: string;
  sizeLabel: string;
  qty: number;
  price: number;
  image: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type StoreLocation = {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  hours: { day: string; open: string; close: string }[];
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};
```

- [ ] **Step 6: Write `src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number): string {
  return `R ${cents.toLocaleString("en-ZA")}`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
```

- [ ] **Step 7: Install dependencies**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 8: Update `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 9: Verify the dev server starts**

```bash
npm run dev
```

Visit `http://localhost:3000` — should render the default Next.js page with no errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with brand tokens and types"
```

---

### Task 2: Static Data Files

**Files:**
- Create: `src/data/products.ts`
- Create: `src/data/colours.ts`
- Create: `src/data/collections.ts`
- Create: `src/data/inspiration.ts`
- Create: `src/data/team.ts`
- Create: `src/data/store-locations.ts`
- Create: `src/data/navigation.ts`

**Interfaces:**
- Consumes: Types from `src/types/index.ts` — `Product`, `ColourSwatch`, `Collection`, `RoomInspiration`, `TeamMember`, `StoreLocation`, `NavItem`
- Produces: Exported arrays `products`, `colours`, `collections`, `inspirations`, `team`, `storeLocations`, `navItems` — consumed by every page

- [ ] **Step 1: Write `src/data/colours.ts`**

Extract colour data from the existing `colour-collections.html` paint chips and the `customPalette` system in `script.js`. Each colour needs an `id`, `name`, `hex`, and `family`.

```typescript
import type { ColourSwatch } from "@/types";

export const colours: ColourSwatch[] = [
  { id: "arctic-white", name: "Arctic White", hex: "#FFFFFF", family: "neutral" },
  { id: "olympic-yellow", name: "Olympic Yellow", hex: "#FBC70F", family: "warm" },
  { id: "sage-garden", name: "Sage Garden", hex: "#7E9B72", family: "cool" },
  { id: "sky-blue", name: "Sky Blue", hex: "#CFE5F4", family: "cool" },
  { id: "deep-espresso", name: "Deep Espresso", hex: "#111111", family: "bold" },
  { id: "warm-nude", name: "Warm Nude", hex: "#E8E8E3", family: "neutral" },
  { id: "golden-hour", name: "Golden Hour", hex: "#FFE680", family: "warm" },
  { id: "coastal-blue", name: "Coastal Blue", hex: "#6B9ECF", family: "cool" },
  { id: "clay-earth", name: "Clay Earth", hex: "#D7A500", family: "earth" },
  { id: "blush-stone", name: "Blush Stone", hex: "#D7D7D2", family: "neutral" },
  // Continue extracting from existing HTML — aim for 30-50 colours
  // covering each family: warm, cool, neutral, bold, earth
];
```

- [ ] **Step 2: Write `src/data/products.ts`**

Extract product data from `products.html`. The existing HTML has product cards with `data-product-id`, `data-category`, image URLs, names, swatches, prices, and size selects.

```typescript
import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "velvet-interior",
    slug: "platinumplus-velvet-interior",
    name: "PlatinumPlus Velvet Interior",
    description: "A luxurious matt finish for interior walls. Smooth, washable, and available in over 1,200 curated colours.",
    category: "interior",
    finish: "matt",
    sizes: [
      { label: "5L", ml: 5000, price: 549 },
      { label: "20L", ml: 20000, price: 1899 },
    ],
    colours: [
      { id: "arctic-white", name: "Arctic White", hex: "#FFFFFF", family: "neutral" },
      { id: "olympic-yellow", name: "Olympic Yellow", hex: "#FBC70F", family: "warm" },
      { id: "sage-garden", name: "Sage Garden", hex: "#7E9B72", family: "cool" },
      { id: "sky-blue", name: "Sky Blue", hex: "#CFE5F4", family: "cool" },
      { id: "deep-espresso", name: "Deep Espresso", hex: "#111111", family: "bold" },
    ],
    images: ["https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=82"],
    featured: true,
    badge: "bestseller",
    rating: { score: 4.9, count: 128 },
  },
  {
    id: "satin-interior",
    slug: "platinumplus-satin-interior",
    name: "PlatinumPlus Satin Interior",
    description: "A soft satin sheen for bedrooms and living areas. Durable, easy to clean, and beautifully reflective.",
    category: "interior",
    finish: "silk",
    sizes: [
      { label: "5L", ml: 5000, price: 579 },
      { label: "20L", ml: 20000, price: 1999 },
    ],
    colours: [
      { id: "arctic-white", name: "Arctic White", hex: "#FFFFFF", family: "neutral" },
      { id: "warm-nude", name: "Warm Nude", hex: "#E8E8E3", family: "neutral" },
      { id: "golden-hour", name: "Golden Hour", hex: "#FFE680", family: "warm" },
      { id: "coastal-blue", name: "Coastal Blue", hex: "#6B9ECF", family: "cool" },
    ],
    images: ["https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=82"],
    featured: true,
    badge: "new",
    rating: { score: 4.8, count: 94 },
  },
  // Continue extracting ALL products from products.html
  // Each product card in the HTML has: data-product-id, data-category,
  // image, swatches, name, category label, rating, sizes with prices
];
```

- [ ] **Step 3: Write `src/data/collections.ts`**

Extract from `colour-collections.html`:

```typescript
import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "inspiring-optimism-2026",
    slug: "inspiring-optimism",
    name: "Inspiring Optimism",
    description: "The 2026 Colour of the Year collection. Warm, confident tones that bring energy and calm to any room.",
    coverImage: "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_c768e03d-e562-4ba7-801e-b7db4975fec8.png",
    colours: [
      { id: "olympic-yellow", name: "Olympic Yellow", hex: "#FBC70F", family: "warm", collection: "inspiring-optimism" },
      { id: "golden-hour", name: "Golden Hour", hex: "#FFE680", family: "warm", collection: "inspiring-optimism" },
      { id: "clay-earth", name: "Clay Earth", hex: "#D7A500", family: "earth", collection: "inspiring-optimism" },
    ],
    rooms: [],
    year: 2026,
  },
  // Continue with other collections from colour-collections.html
];
```

- [ ] **Step 4: Write `src/data/inspiration.ts`, `src/data/team.ts`, `src/data/store-locations.ts`**

```typescript
// src/data/inspiration.ts
import type { RoomInspiration } from "@/types";

export const inspirations: RoomInspiration[] = [
  {
    id: "modern-living-warmth",
    title: "Modern Living with Warmth",
    roomType: "living-room",
    images: { after: "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_c768e03d-e562-4ba7-801e-b7db4975fec8.png" },
    coloursUsed: [
      { id: "olympic-yellow", name: "Olympic Yellow", hex: "#FBC70F", family: "warm" },
      { id: "warm-nude", name: "Warm Nude", hex: "#E8E8E3", family: "neutral" },
    ],
    designer: "Olympic Design Team",
  },
  // Add more entries — at least 2 per room type
];
```

```typescript
// src/data/team.ts
import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    id: "design-team-lead",
    name: "Olympic Design Team",
    role: "Interior Designers & Colour Specialists",
    bio: "The team behind the Colour Cafe experience — guiding homeowners from colour uncertainty to confident design direction.",
    image: "/images/DETAILS_1.JPG",
  },
  // Extract from our-story.html — the gallery section has real designer photos
];
```

```typescript
// src/data/store-locations.ts
import type { StoreLocation } from "@/types";

export const storeLocations: StoreLocation[] = [
  {
    id: "lenasia-hq",
    name: "Olympic Paints Headquarters & Colour Cafe",
    address: "28 Mecca Rd",
    city: "Lenasia",
    province: "Gauteng",
    postalCode: "1827",
    phone: "(011) 857 1045",
    email: "info@olympicpaints.co.za",
    coordinates: { lat: -26.3336, lng: 27.8462 },
    hours: [
      { day: "Monday - Friday", open: "08:00", close: "17:00" },
      { day: "Saturday", open: "08:00", close: "13:00" },
      { day: "Sunday", open: "Closed", close: "Closed" },
    ],
  },
];
```

- [ ] **Step 5: Write `src/data/navigation.ts`**

```typescript
import type { NavItem } from "@/types";

export const navLeft: NavItem[] = [
  { label: "Our Story", href: "/our-story" },
  { label: "Colour Cafe", href: "/colour-cafe" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Interior", href: "/products?category=interior" },
      { label: "Exterior", href: "/products?category=exterior" },
      { label: "Equipment", href: "/products?category=equipment" },
    ],
  },
];

export const navRight: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 6: Verify all data files import cleanly**

Create a quick test in `src/app/page.tsx`:

```typescript
import { products } from "@/data/products";
import { colours } from "@/data/colours";
import { collections } from "@/data/collections";

export default function Home() {
  return <p>{products.length} products, {colours.length} colours, {collections.length} collections</p>;
}
```

Run `npm run dev` and check the page renders counts with no type errors.

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: add static data files for products, colours, collections, team, stores"
```

---

### Task 3: Hooks & Context (Cart + Utilities)

**Files:**
- Create: `src/hooks/use-scroll.ts`
- Create: `src/hooks/use-media-query.ts`
- Create: `src/hooks/use-reduced-motion.ts`
- Create: `src/context/cart-context.tsx`

**Interfaces:**
- Consumes: `CartItem` from `src/types/index.ts`
- Produces: `useScroll()` → `{ scrollY: number; isScrolled: boolean }`, `useMediaQuery(query)` → `boolean`, `useReducedMotion()` → `boolean`, `CartProvider` + `useCart()` → `{ items, addItem, removeItem, updateQty, clearCart, total, count }`

- [ ] **Step 1: Write `src/hooks/use-scroll.ts`**

Migrates the `setHeaderState()` function from `script.js` line 38-41.

```typescript
"use client";

import { useState, useEffect } from "react";

export function useScroll(threshold = 24) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrollY(y);
      setIsScrolled(y > threshold);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
}
```

- [ ] **Step 2: Write `src/hooks/use-media-query.ts`**

```typescript
"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    function onChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
```

- [ ] **Step 3: Write `src/hooks/use-reduced-motion.ts`**

Migrates the `prefers-reduced-motion` check from `script.js` line 52.

```typescript
"use client";

import { useMediaQuery } from "./use-media-query";

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
```

- [ ] **Step 4: Write `src/context/cart-context.tsx`**

Migrates the `OP_CART` system from `cart.js`. Same localStorage key for backwards compatibility.

```typescript
"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { CartItem } from "@/types";

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; productId: string; sizeLabel: string }
  | { type: "UPDATE_QTY"; productId: string; sizeLabel: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

type CartState = {
  items: CartItem[];
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const key = `${action.item.productId}-${action.item.sizeLabel}`;
      const existing = state.items.find(
        (i) => `${i.productId}-${i.sizeLabel}` === key
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            `${i.productId}-${i.sizeLabel}` === key
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) =>
            !(i.productId === action.productId && i.sizeLabel === action.sizeLabel)
        ),
      };
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.productId === action.productId && i.sizeLabel === action.sizeLabel
            ? { ...i, qty: Math.max(0, action.qty) }
            : i
        ).filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, sizeLabel: string) => void;
  updateQty: (productId: string, sizeLabel: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("op_cart");
      if (stored) dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("op_cart", JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (item) => dispatch({ type: "ADD", item }),
        removeItem: (pid, size) => dispatch({ type: "REMOVE", productId: pid, sizeLabel: size }),
        updateQty: (pid, size, qty) => dispatch({ type: "UPDATE_QTY", productId: pid, sizeLabel: size, qty }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
```

- [ ] **Step 5: Verify hooks and context compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add src/hooks/ src/context/
git commit -m "feat: add cart context, scroll, media query, and reduced motion hooks"
```

---

### Task 4: UI Primitives

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/select.tsx`
- Create: `src/components/ui/modal.tsx`

**Interfaces:**
- Consumes: `cn()` from `src/lib/utils.ts`
- Produces: `<Button variant="primary|secondary|ghost" />`, `<Input label="" />`, `<Textarea label="" />`, `<Select label="" options={[]} />`, `<Modal open onClose />` — consumed by all pages

- [ ] **Step 1: Write `src/components/ui/button.tsx`**

Migrates `.button.primary`, `.button.ghost`, `.button.outline`, `.button.primary-dark` from `styles.css`.

```typescript
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  href?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-olympic-yellow text-espresso font-semibold hover:bg-yellow-deep transition-colors",
  secondary:
    "bg-espresso text-cream font-semibold hover:bg-walnut transition-colors",
  ghost:
    "bg-transparent text-ink border border-ink/20 hover:bg-ink/5 transition-colors",
  outline:
    "bg-transparent text-cream border border-cream/40 hover:bg-cream/10 transition-colors",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-wide uppercase rounded-sm cursor-pointer",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
```

- [ ] **Step 2: Write `src/components/ui/input.tsx`**

```typescript
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink/70">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 bg-paper border border-ink/10 text-ink text-sm rounded-sm",
            "focus:outline-none focus:ring-2 focus:ring-olympic-yellow/50 focus:border-olympic-yellow",
            "placeholder:text-muted",
            error && "border-red-500 focus:ring-red-500/50",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
```

- [ ] **Step 3: Write `src/components/ui/textarea.tsx`**

```typescript
import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink/70">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={cn(
            "w-full px-4 py-3 bg-paper border border-ink/10 text-ink text-sm rounded-sm resize-y",
            "focus:outline-none focus:ring-2 focus:ring-olympic-yellow/50 focus:border-olympic-yellow",
            "placeholder:text-muted",
            error && "border-red-500 focus:ring-red-500/50",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
```

- [ ] **Step 4: Write `src/components/ui/select.tsx`**

```typescript
import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectOption = { value: string; label: string };

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label: string;
  options: SelectOption[];
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink/70">
          {label}
        </label>
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 bg-paper border border-ink/10 text-ink text-sm rounded-sm appearance-none",
            "focus:outline-none focus:ring-2 focus:ring-olympic-yellow/50 focus:border-olympic-yellow",
            error && "border-red-500",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
export { Select };
```

- [ ] **Step 5: Write `src/components/ui/modal.tsx`**

```typescript
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function handleClose() {
      onClose();
    }
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "backdrop:bg-ink/60 bg-cream rounded-sm shadow-2xl p-0 max-w-2xl w-[90vw]",
        "open:animate-in open:fade-in open:zoom-in-95",
        className
      )}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted hover:text-ink transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  );
}
```

- [ ] **Step 6: Verify all UI primitives compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI primitives — Button, Input, Textarea, Select, Modal"
```

---

### Task 5: Layout Shell (Header, Footer, Mobile Menu, Root Layout)

**Files:**
- Create: `src/components/layout/skip-link.tsx`
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/mobile-menu.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `useScroll()`, `useCart()`, `NavItem` from navigation data, `cn()`
- Produces: Root layout wrapping all pages with `<SiteHeader>`, `<SiteFooter>`, `<CartProvider>`, and metadata

- [ ] **Step 1: Write `src/components/layout/skip-link.tsx`**

Direct migration of the existing skip link (line 37 of `index.html`, line 78-83 of `styles.css`).

```typescript
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[100] px-3.5 py-2.5 bg-cream text-ink rounded-sm text-sm -translate-y-[160%] focus:translate-y-0 transition-transform"
    >
      Skip to content
    </a>
  );
}
```

- [ ] **Step 2: Write `src/components/layout/site-header.tsx`**

Migrates the existing header: centered circular logo, split nav groups, scroll-shrink, mobile hamburger trigger, cart badge. Lines 47-70 of `index.html`, header CSS from `styles.css`.

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/use-scroll";
import { useCart } from "@/context/cart-context";
import { navLeft, navRight } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (item.children) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <Link
          href={item.href}
          className={cn("nav-link", isActive && "font-semibold")}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
          <svg className="inline ml-1 w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </Link>
        {dropdownOpen && (
          <div className="absolute top-full left-0 pt-2 z-50">
            <div className="bg-cream border border-ink/10 rounded-sm shadow-lg py-2 min-w-[180px]">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2 text-sm text-ink/70 hover:text-ink hover:bg-paper transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn("nav-link", isActive && "font-semibold")}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isScrolled } = useScroll();
  const { count } = useCart();
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        {/* Mobile brand */}
        <Link href="/" className="md:hidden absolute left-4 top-1/2 -translate-y-1/2" aria-label="Olympic Paints home">
          <Image src="/images/logo.png" alt="Olympic Paints" width={40} height={40} />
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-8 px-8" aria-label="Primary navigation">
          <div className="flex items-center gap-8">
            {navLeft.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>

          <Link href="/" className="mx-8" aria-label="Olympic Paints home">
            <Image
              src="/images/logo.png"
              alt="Olympic Paints"
              width={56}
              height={56}
              className={cn(
                "rounded-full transition-all duration-500",
                isScrolled ? "w-10 h-10" : "w-14 h-14"
              )}
              priority
            />
          </Link>

          <div className="flex items-center gap-8">
            {navRight.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
            <Link href="/cart" className="relative" aria-label="Shopping cart">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-olympic-yellow text-espresso text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={cn("block w-5 h-0.5 bg-ink transition-transform", menuOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block w-5 h-0.5 bg-ink transition-opacity", menuOpen && "opacity-0")} />
          <span className={cn("block w-5 h-0.5 bg-ink transition-transform", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
```

- [ ] **Step 3: Write `src/components/layout/mobile-menu.tsx`**

```typescript
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLeft, navRight } from "@/data/navigation";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

type MobileMenuProps = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const allLinks = [...navLeft, ...navRight];

  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {allLinks.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-2xl font-serif transition-all duration-500",
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="/cart"
        className="text-lg text-muted mt-4"
        onClick={onClose}
      >
        Cart {count > 0 && `(${count})`}
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Write `src/components/layout/site-footer.tsx`**

Migrates the footer from `colour-cafe.html` lines 171-182.

```typescript
import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-cream/80">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <Link href="/" aria-label="Olympic Paints home">
            <Image src="/images/logo.png" alt="Olympic Paints" width={48} height={48} className="rounded-full mb-4" />
          </Link>
          <p className="text-sm leading-relaxed text-cream/50">
            Olympic Paints blends simple lines, honest materials, and refined details to create interiors that feel calm, personal, and grounded. Since 1981.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
            <Link href="/collections" className="hover:text-cream transition-colors">Colours</Link>
            <Link href="/products" className="hover:text-cream transition-colors">Products</Link>
            <Link href="/inspiration" className="hover:text-cream transition-colors">Inspiration</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">Explore</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/colour-cafe" className="hover:text-cream transition-colors">Colour Cafe</Link>
            <Link href="/our-story" className="hover:text-cream transition-colors">Our Story</Link>
            <Link href="/find-a-store" className="hover:text-cream transition-colors">Find a Store</Link>
            <Link href="/contact" className="hover:text-cream transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">Get in Touch</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="tel:+27118571045" className="hover:text-cream transition-colors">(011) 857 1045</a>
            <a href="mailto:info@olympicpaints.co.za" className="hover:text-cream transition-colors">info@olympicpaints.co.za</a>
            <p className="text-cream/30 text-xs leading-relaxed mt-2">
              28 Mecca Rd, Lenasia, 1827<br />Gauteng, South Africa
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-cream/30 max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Olympic Paints. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <Link href="/privacy" className="hover:text-cream/60 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-cream/60 transition-colors">Terms</Link>
          <Link href="/shipping" className="hover:text-cream/60 transition-colors">Shipping</Link>
          <Link href="/returns" className="hover:text-cream/60 transition-colors">Returns</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Write `src/app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/context/cart-context";
import "@/styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Olympic Paints | A World Of Colour Reimagined",
    template: "%s | Olympic Paints",
  },
  description:
    "Olympic Paints helps South African homeowners transform spaces through colour, design guidance, curated collections, and the immersive Colour Cafe experience.",
  metadataBase: new URL("https://olympic-paints.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Olympic Paints",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <CartProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify the layout renders**

Run `npm run dev`, navigate to `http://localhost:3000`. Confirm header with logo, nav links, and footer all render. Check mobile hamburger works. Cart badge should show 0.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add site header, footer, mobile menu, and root layout"
```

---

### Task 6: Shared Components

**Files:**
- Create: `src/components/shared/scroll-reveal.tsx`
- Create: `src/components/shared/section-heading.tsx`
- Create: `src/components/shared/page-hero.tsx`
- Create: `src/components/shared/breadcrumb.tsx`
- Create: `src/components/shared/image-gallery.tsx`
- Create: `src/components/shared/video-player.tsx`
- Create: `src/components/shared/coming-soon.tsx`

**Interfaces:**
- Consumes: `useReducedMotion()`, `cn()`
- Produces: Reusable content components consumed by all page-level components

- [ ] **Step 1: Write `src/components/shared/scroll-reveal.tsx`**

Migrates the IntersectionObserver system from `script.js` lines 192-209. Wraps children and adds `.is-visible` via intersection.

```typescript
"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

export function ScrollReveal({ children, className, delay = 0, threshold = 0.12 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay * 120}ms` }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/shared/section-heading.tsx`**

Extracted pattern from the existing `.section-kicker` + `h2` + `p` combos used on every page.

```typescript
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowColor?: "default" | "gold" | "sage";
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
};

const eyebrowColors = {
  default: "text-muted",
  gold: "text-olympic-yellow",
  sage: "text-sage",
};

export function SectionHeading({ eyebrow, eyebrowColor = "default", title, description, className, centered }: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <p className={cn(
          "flex items-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase",
          centered && "justify-center",
          eyebrowColors[eyebrowColor]
        )}>
          <span className="w-6 h-px bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {description && <p className="mt-4 text-muted max-w-2xl leading-relaxed">{description}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/shared/page-hero.tsx`**

The dark overlay hero used on inner pages (Products, Contact, etc.) — lines 48-55 of `products.html`.

```typescript
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  compact?: boolean;
};

export function PageHero({ eyebrow, title, description, backgroundImage, compact }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", compact ? "py-24" : "py-32 md:py-44")}>
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
          <div className="absolute inset-0 bg-espresso/70" />
        </div>
      )}
      {!backgroundImage && <div className="absolute inset-0 bg-espresso" />}
      <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-6 text-cream">
        <p className="flex items-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase text-cream/60">
          <span className="w-6 h-px bg-cream/40" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        {description && <p className="mt-6 text-lg text-cream/70 max-w-2xl leading-relaxed">{description}</p>}
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/shared/breadcrumb.tsx`**

Schema-aware breadcrumb trail.

```typescript
import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbProps = { items: BreadcrumbItem[] };

export function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href && { item: `https://olympic-paints.vercel.app${item.href}` }),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted py-4 px-6">
        <ol className="flex items-center gap-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-ink transition-colors">{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

- [ ] **Step 5: Write `src/components/shared/video-player.tsx`**

Migrates the YouTube lazy-load pattern from `colour-cafe.html` lines 96-108.

```typescript
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  videoId: string;
  title: string;
  thumbnail?: string;
  duration?: string;
  className?: string;
};

export function VideoPlayer({ videoId, title, thumbnail, duration, className }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const thumb = thumbnail || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  if (playing) {
    return (
      <div className={cn("relative aspect-video rounded-sm overflow-hidden", className)}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={cn("relative aspect-video rounded-sm overflow-hidden group cursor-pointer", className)}
      aria-label={`Play ${title}`}
    >
      <Image src={thumb} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
        <span className="w-16 h-16 bg-cream/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-ink ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      {duration && (
        <span className="absolute bottom-4 left-4 text-sm text-cream/80">
          Watch the film &middot; {duration}
        </span>
      )}
    </button>
  );
}
```

- [ ] **Step 6: Write `src/components/shared/image-gallery.tsx` and `src/components/shared/coming-soon.tsx`**

```typescript
// src/components/shared/image-gallery.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

type GalleryItem = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  tall?: boolean;
};

type ImageGalleryProps = { items: GalleryItem[]; className?: string };

export function ImageGallery({ items, className }: ImageGalleryProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {items.map((item, i) => (
        <ScrollReveal key={i} delay={i} className={cn(item.tall && "md:row-span-2")}>
          <div className={cn("relative overflow-hidden rounded-sm group", item.tall ? "aspect-[3/4]" : "aspect-[4/3]")}>
            <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            {(item.title || item.subtitle) && (
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent flex flex-col justify-end p-6">
                {item.subtitle && <p className="text-xs text-cream/60 uppercase tracking-wider">{item.subtitle}</p>}
                {item.title && <h3 className="text-cream mt-1">{item.title}</h3>}
              </div>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
```

```typescript
// src/components/shared/coming-soon.tsx
import { SectionHeading } from "./section-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="py-32 px-6 text-center max-w-xl mx-auto">
      <SectionHeading eyebrow="Coming Soon" eyebrowColor="gold" title={title} description={description} centered />
      <form className="mt-8 flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <Input label="" placeholder="Your email" type="email" aria-label="Email for updates" className="flex-1" />
        <Button variant="primary" type="submit">Notify Me</Button>
      </form>
    </section>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/shared/
git commit -m "feat: add shared components — ScrollReveal, PageHero, SectionHeading, Breadcrumb, VideoPlayer, ImageGallery, ComingSoon"
```

---

### Task 7: Home Page

**Files:**
- Create: `src/components/home/hero-carousel.tsx`
- Create: `src/components/home/stats-strip.tsx`
- Create: `src/components/home/cafe-primer.tsx`
- Create: `src/components/home/discovery-section.tsx`
- Create: `src/components/home/journey-steps.tsx`
- Modify: `src/app/(marketing)/page.tsx`

**Interfaces:**
- Consumes: `ScrollReveal`, `SectionHeading`, `Button`, `useReducedMotion()`, `cn()`
- Produces: Complete home page at `/` — hero carousel with autoplay, stats strip with animated counters, Colour Cafe primer, discovery section, journey steps

This is a large task. Migrate each section of `index.html` (lines 74-178) into its own component. The home page composes them in order.

- [ ] **Step 1: Write `src/components/home/hero-carousel.tsx`**

Migrates the hero carousel from `index.html` lines 74-93 and `script.js` lines 44-53. Three slides with background images, dot navigation, autoplay with pause on hover.

```typescript
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  { image: "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_c768e03d-e562-4ba7-801e-b7db4975fec8.png", label: "Cinematic living room" },
  { image: "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_aa7d96f6-4b98-404a-92ca-41fb6f205ae8.png", label: "Warm interior" },
  { image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=82", label: "Light-filled space" },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (prefersReduced || paused || slides.length < 2) return;
    const timer = setInterval(next, 5600);
    return () => clearInterval(timer);
  }, [prefersReduced, paused, next]);

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            i === active ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url('${slide.image}')` }}
          aria-hidden={i !== active}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-ink/10" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-16 max-w-5xl">
        <p className="flex items-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase text-cream/60">
          <span className="w-6 h-px bg-cream/40" aria-hidden="true" />
          2026 Colour of the Year
        </p>
        <h1 className="text-cream">
          Inspiring<br /><em className="font-serif">Optimism</em>
        </h1>
        <p className="mt-6 text-cream/70 max-w-lg leading-relaxed">
          Colour, creativity and expert guidance brought together at the Colour Cafe so you can choose paint with confidence.
        </p>
        <div className="flex gap-4 mt-8">
          <Link href="/contact">
            <Button variant="primary">Book a Colour Cafe consultation</Button>
          </Link>
          <Link href="/collections">
            <Button variant="outline">Explore colours</Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10" aria-label="Hero scenes">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              i === active ? "bg-cream scale-125" : "bg-cream/40 hover:bg-cream/60"
            )}
            aria-label={`Show ${slide.label}`}
          />
        ))}
      </div>

      <p className="absolute right-6 bottom-8 text-xs text-cream/30 hidden md:block" aria-hidden="true">
        Paint Manufacturer &mdash; Est. 1981 &middot; Lenasia ZA
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/home/stats-strip.tsx`**

Migrates the animated counters from `index.html` lines 97-114 and `script.js` lines 212-250.

```typescript
"use client";

import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type StatItem = { target: number; suffix: string; label: string };

const stats: StatItem[] = [
  { target: 40, suffix: "+", label: "Years of Heritage" },
  { target: 1200, suffix: "+", label: "Curated Colours" },
  { target: 5000, suffix: "+", label: "Homes Transformed" },
  { target: 0, suffix: "5.0 ★", label: "Google Reviews" },
];

function AnimatedCounter({ target, suffix, label, delay }: StatItem & { delay: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || target === 0) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 2000;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setValue(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefersReduced]);

  const display = target === 0 ? suffix : `${value.toLocaleString()}${suffix}`;

  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className="text-center">
        <span className="text-4xl md:text-5xl font-serif">
          {target <= 100 && target > 0 ? (
            <><span className="text-olympic-yellow">{value}</span>{suffix}</>
          ) : target === 0 ? (
            <>{suffix.replace("★", "")}<span className="text-olympic-yellow">★</span></>
          ) : (
            <>{value.toLocaleString()}<span className="text-olympic-yellow">{suffix}</span></>
          )}
        </span>
        <span className="block mt-2 text-sm text-muted uppercase tracking-wider">{label}</span>
      </div>
    </ScrollReveal>
  );
}

export function StatsStrip() {
  return (
    <section className="py-16 px-6 border-y border-ink/10" aria-label="Key statistics">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <AnimatedCounter key={stat.label} {...stat} delay={i} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `src/components/home/cafe-primer.tsx`**

Migrates `index.html` lines 117-132.

```typescript
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export function CafePrimer() {
  const steps = [
    { num: "01", title: "Discover", desc: "Share your space, style, mood and practical needs." },
    { num: "02", title: "Design", desc: "Build a palette with materials, finishes and room direction." },
    { num: "03", title: "Purchase", desc: "Leave with paint and equipment recommendations you can act on." },
  ];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" aria-labelledby="cafe-primer-title">
      <ScrollReveal>
        <SectionHeading
          eyebrow="The Olympic Paints Difference"
          title="Colour Cafe turns colour uncertainty into a clear design direction."
          description="It is the signature Olympic Paints experience: a guided consultation where colour specialists and versatile interior designers help you connect palette, finish, materials, light and paint products before you buy."
        />
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" aria-label="Colour Cafe outcomes">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i}>
            <article>
              <span className="text-xs text-olympic-yellow font-bold">{step.num}</span>
              <h3 className="mt-2">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{step.desc}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal className="flex gap-4 mt-12">
        <Link href="/colour-cafe">
          <Button variant="secondary">Understand Colour Cafe</Button>
        </Link>
        <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-olympic-yellow transition-colors">
          Book with Atlas →
        </Link>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/home/discovery-section.tsx`**

Migrates the interactive discovery board from `index.html` lines 135-155 and `script.js` discovery logic.

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const choices = [
  { id: "home", label: "Home refresh", recommendation: "Book a Colour Cafe consultation", detail: "Bring room photos, natural-light notes and any furniture or flooring references. Atlas will help prepare the brief." },
  { id: "retail", label: "Retail or hospitality", recommendation: "Book a commercial design session", detail: "Share your brand colours, floor plan and customer journey. Our designers specialise in high-traffic, high-impact spaces." },
  { id: "work", label: "Office or studio", recommendation: "Request a workspace palette", detail: "Productivity, calm and brand alignment — we design workspaces that support focus and identity." },
  { id: "exterior", label: "Exterior update", recommendation: "Book an exterior assessment", detail: "Weather, substrate and street presence all matter. Bring photos and we will recommend the right coating system." },
];

export function DiscoverySection() {
  const [activeId, setActiveId] = useState("home");
  const active = choices.find((c) => c.id === activeId)!;

  return (
    <ScrollReveal>
      <section className="py-24 px-6 max-w-6xl mx-auto" aria-labelledby="discovery-title">
        <SectionHeading
          eyebrow="Start Here"
          eyebrowColor="gold"
          title="Find your colour direction before you book."
          description="Choose the closest starting point and we will suggest a consultation focus you can take straight to Atlas."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3" role="group" aria-label="Choose your project starting point">
            {choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => setActiveId(choice.id)}
                className={cn(
                  "text-left px-5 py-4 rounded-sm border transition-all text-sm",
                  choice.id === activeId
                    ? "border-olympic-yellow bg-yellow-soft/30 font-medium"
                    : "border-ink/10 hover:border-ink/20"
                )}
              >
                {choice.label}
              </button>
            ))}
          </div>
          <div className="bg-paper rounded-sm p-8">
            <span className="text-xs text-muted uppercase tracking-wider">Recommended next step</span>
            <h3 className="mt-3">{active.recommendation}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">{active.detail}</p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button variant="primary">Continue with Atlas</Button>
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
```

- [ ] **Step 5: Write `src/components/home/journey-steps.tsx`**

Migrates the pinned-scroll journey section from `index.html` lines 178+.

```typescript
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  { num: "01", title: "Coffee", desc: "Begin gently, with a drink and a conversation about how you want to live." },
  { num: "02", title: "Connection", desc: "Share photos, plans, materials, dreams and design questions." },
  { num: "03", title: "Colour", desc: "Explore palettes beside flooring, fabric, furniture, lighting and texture." },
  { num: "04", title: "Creation", desc: "Build feel boards and room directions with expert support." },
  { num: "05", title: "Transformation", desc: "Leave with a clearer, calmer and more confident home plan." },
];

export function JourneySteps() {
  return (
    <section className="py-24 px-6 bg-espresso text-cream">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Journey"
            eyebrowColor="gold"
            title="Coffee. Connect. Colour. Create. Transform."
            centered
          />
        </ScrollReveal>
        <div className="mt-16 space-y-12">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i}>
              <article className="flex gap-8 items-start">
                <span className="text-olympic-yellow text-sm font-bold shrink-0 mt-1">{step.num}</span>
                <div>
                  <h3 className="text-cream">{step.title}</h3>
                  <p className="mt-2 text-cream/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Compose the home page at `src/app/(marketing)/page.tsx`**

```typescript
import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { StatsStrip } from "@/components/home/stats-strip";
import { CafePrimer } from "@/components/home/cafe-primer";
import { DiscoverySection } from "@/components/home/discovery-section";
import { JourneySteps } from "@/components/home/journey-steps";

export const metadata: Metadata = {
  title: "Olympic Paints | A World Of Colour Reimagined",
  description: "Olympic Paints helps South African homeowners transform spaces through colour, design guidance, curated collections, and the immersive Colour Cafe experience.",
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <StatsStrip />
      <CafePrimer />
      <DiscoverySection />
      <JourneySteps />
    </>
  );
}
```

- [ ] **Step 7: Verify the home page renders end-to-end**

Run `npm run dev`, navigate to `http://localhost:3000`. Confirm:
- Hero carousel slides auto-advance
- Stats counters animate on scroll
- All sections render with scroll reveal
- Navigation works
- Mobile responsive

- [ ] **Step 8: Commit**

```bash
git add src/components/home/ src/app/\(marketing\)/page.tsx
git commit -m "feat: add home page with hero carousel, stats, cafe primer, discovery, journey"
```

---

### Task 8: Marketing Pages (Our Story, Colour Cafe, Contact, Find a Store)

**Files:**
- Create: `src/app/(marketing)/our-story/page.tsx`
- Create: `src/app/(marketing)/colour-cafe/page.tsx`
- Create: `src/app/(marketing)/contact/page.tsx`
- Create: `src/app/(marketing)/find-a-store/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `SectionHeading`, `ScrollReveal`, `ImageGallery`, `VideoPlayer`, `Button`, `Input`, `Textarea`, `Select`, team data, store-locations data
- Produces: Four complete marketing pages

Each page migrates its corresponding HTML file. The implementer should read the source HTML file for the exact content (headings, copy, images, sections) and replicate the structure using the shared components built in Tasks 4-6.

- [ ] **Step 1: Write `src/app/(marketing)/our-story/page.tsx`**

Migrate `our-story.html`. Key sections: brand heritage intro, team gallery (using `ImageGallery` with photos from `DETAILS_*.JPG`), video section (2026 Colour Collection film, HomeMakers film), Our People clip. Read the existing file to extract exact copy.

- [ ] **Step 2: Write `src/app/(marketing)/colour-cafe/page.tsx`**

Migrate `colour-cafe.html`. Key sections: hero with studio illustration, gallery strip (Consultation Studio, Future Home, Feel Boards), video section (Colour Cafe film, videoId `skkslmRcitc`), five-step visit timeline (Coffee → Connect → Colour → Create → Transform), booking CTA. This is the Color Cafe: Home Studio Design rebrand page.

- [ ] **Step 3: Write `src/app/(marketing)/contact/page.tsx`**

Migrate `contact.html`. Key sections: compact hero, guide steps (Choose project stage → Share room goals → Match with support), contact form with `Input`/`Textarea`/`Select` (all properly labelled), store address from `storeLocations` data. The Atlas chatbot section should be simplified to a styled CTA for Phase 1 (the full chatbot is a Phase 2/3 feature).

- [ ] **Step 4: Write `src/app/(marketing)/find-a-store/page.tsx`**

Migrate `find-a-store.html`. Show store details from `storeLocations` data: address, phone, email, hours. Include an embedded map (Google Maps iframe with the Lenasia coordinates). Add a CTA to contact page.

- [ ] **Step 5: Verify all marketing pages render and navigate correctly**

Visit each page, check content renders, links work, mobile responsive.

- [ ] **Step 6: Commit**

```bash
git add src/app/\(marketing\)/
git commit -m "feat: add Our Story, Colour Cafe, Contact, and Find a Store pages"
```

---

### Task 9: Shop Components & Product Pages

**Files:**
- Create: `src/components/shop/colour-swatch.tsx`
- Create: `src/components/shop/size-select.tsx`
- Create: `src/components/shop/product-card.tsx`
- Create: `src/components/shop/product-grid.tsx`
- Create: `src/components/shop/product-detail.tsx`
- Create: `src/components/shop/cart-drawer.tsx`
- Create: `src/app/(shop)/products/page.tsx`
- Create: `src/app/(shop)/products/[slug]/page.tsx`
- Create: `src/app/(shop)/collections/page.tsx`
- Create: `src/app/(shop)/collections/[slug]/page.tsx`
- Create: `src/app/(shop)/cart/page.tsx`
- Create: `src/app/(shop)/checkout/page.tsx`

**Interfaces:**
- Consumes: `useCart()`, product/collection data, `Button`, `Select`, `Modal`, `ScrollReveal`, `PageHero`, `Breadcrumb`, `formatPrice()`
- Produces: Full shop flow — catalogue with filters, product detail, cart, checkout (mocked payment)

- [ ] **Step 1: Write `src/components/shop/colour-swatch.tsx`**

Migrates the `.paint-chip` from the existing CSS. A small coloured circle that's clickable with a selected state.

```typescript
import { cn } from "@/lib/utils";

type ColourSwatchProps = {
  hex: string;
  name: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
};

export function ColourSwatch({ hex, name, selected, onClick, size = "sm" }: ColourSwatchProps) {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8" };
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border-2 transition-transform",
        selected ? "border-ink scale-110" : "border-transparent hover:scale-110",
        sizes[size]
      )}
      style={{ backgroundColor: hex }}
      aria-label={name}
      aria-pressed={selected}
      title={name}
    />
  );
}
```

- [ ] **Step 2: Write `src/components/shop/size-select.tsx`**

```typescript
import { formatPrice } from "@/lib/utils";
import type { ProductSize } from "@/types";

type SizeSelectProps = {
  sizes: ProductSize[];
  selected: string;
  onChange: (label: string) => void;
};

export function SizeSelect({ sizes, selected, onChange }: SizeSelectProps) {
  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size.label}
          onClick={() => onChange(size.label)}
          className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
            selected === size.label
              ? "border-ink bg-ink text-cream"
              : "border-ink/10 hover:border-ink/30"
          }`}
        >
          {size.label} &mdash; {formatPrice(size.price)}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/shop/product-card.tsx`**

Migrates the `.product-card` from `products.html` lines 130-158. Image, badge, swatches, name, category, rating, size select, add-to-bag.

```typescript
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColourSwatch } from "./colour-swatch";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({
      productId: product.id,
      productName: product.name,
      colourId: product.colours[0]?.id || "",
      colourName: product.colours[0]?.name || "",
      sizeLabel: selectedSize.label,
      qty: 1,
      price: selectedSize.price,
      image: product.images[0],
    });
  }

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        {product.badge && (
          <span className={cn(
            "absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm",
            product.badge === "bestseller" ? "bg-olympic-yellow text-espresso" : "bg-espresso text-cream"
          )}>
            {product.badge === "bestseller" ? "Best Seller" : "New"}
          </span>
        )}
      </Link>

      <div className="flex gap-1.5 mb-3">
        {product.colours.slice(0, 5).map((c) => (
          <ColourSwatch key={c.id} hex={c.hex} name={c.name} />
        ))}
      </div>

      <Link href={`/products/${product.slug}`}>
        <h3 className="text-sm font-medium">{product.name}</h3>
      </Link>
      <p className="text-xs text-muted mt-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)} Paint</p>

      {product.rating && (
        <div className="flex items-center gap-1 mt-2 text-xs text-muted">
          {"★".repeat(Math.round(product.rating.score))}
          <span className="ml-1">{product.rating.score} ({product.rating.count})</span>
        </div>
      )}

      <select
        className="mt-3 w-full px-3 py-2 bg-paper border border-ink/10 text-sm rounded-sm"
        value={selectedSize.label}
        onChange={(e) => {
          const size = product.sizes.find((s) => s.label === e.target.value);
          if (size) setSelectedSize(size);
        }}
        aria-label="Select size"
      >
        {product.sizes.map((s) => (
          <option key={s.label} value={s.label}>
            {s.label} &mdash; {formatPrice(s.price)}
          </option>
        ))}
      </select>

      <Button variant="secondary" className="w-full mt-3" onClick={handleAdd}>
        Add to Bag
      </Button>
    </article>
  );
}
```

- [ ] **Step 4: Write `src/components/shop/product-grid.tsx`**

Migrates the filter system from `script.js` lines 253-288.

```typescript
"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types";

type FilterOption = { value: ProductCategory | "all"; label: string };

const filters: FilterOption[] = [
  { value: "all", label: "All Products" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "specialist", label: "Specialty" },
  { value: "equipment", label: "Equipment" },
];

export function ProductGrid({ products, initialFilter }: { products: Product[]; initialFilter?: string }) {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter || "all");

  const filtered = activeFilter === "all"
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8" aria-label="Filter products">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={cn(
              "px-5 py-2 text-sm rounded-full border transition-colors",
              activeFilter === f.value
                ? "bg-ink text-cream border-ink"
                : "border-ink/15 text-muted hover:border-ink/30"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted py-16">No products in this category yet.</p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Write `src/components/shop/product-detail.tsx`**

New component (currently the existing site uses a modal). Full product detail with image gallery, swatches, size selector, add-to-cart, description.

- [ ] **Step 6: Write `src/components/shop/cart-drawer.tsx`**

Migrates the cart drawer UI from `cart.js`. Uses `useCart()` context. Shows items, quantities, totals, remove buttons, checkout link.

- [ ] **Step 7: Write product pages**

`src/app/(shop)/products/page.tsx` — uses `PageHero`, `ProductGrid`, `Breadcrumb`. Reads `initialFilter` from search params.

`src/app/(shop)/products/[slug]/page.tsx` — uses `ProductDetail`, `Breadcrumb`. Generates static params from product slugs.

- [ ] **Step 8: Write collection pages**

`src/app/(shop)/collections/page.tsx` — grid of collection cards with cover images.

`src/app/(shop)/collections/[slug]/page.tsx` — collection detail with colour palette display and linked room inspirations.

- [ ] **Step 9: Write cart and checkout pages**

`src/app/(shop)/cart/page.tsx` — full cart view with quantity controls, totals. Link to checkout.

`src/app/(shop)/checkout/page.tsx` — checkout form (shipping + payment fields using `Input`/`Select`). Payment is mocked — submitting shows a success message.

- [ ] **Step 10: Verify the full shop flow**

Add a product to cart from `/products`. Navigate to `/cart`. Adjust quantity. Go to `/checkout`. Submit. Confirm success message.

- [ ] **Step 11: Commit**

```bash
git add src/components/shop/ src/app/\(shop\)/
git commit -m "feat: add shop — products, collections, cart, checkout with mocked payment"
```

---

### Task 10: Studio & Inspiration Pages

**Files:**
- Create: `src/app/(studio)/inspiration/page.tsx`
- Create: `src/app/(studio)/studio/page.tsx`
- Create: `src/app/(studio)/studio/palette-builder/page.tsx`
- Create: `src/components/studio/palette-builder.tsx`
- Create: `src/app/(studio)/studio/visualiser/page.tsx`
- Create: `src/app/(studio)/studio/book/page.tsx`

**Interfaces:**
- Consumes: `inspiration` data, `colours` data, `PageHero`, `ScrollReveal`, `ImageGallery`, `ComingSoon`, `ColourSwatch`
- Produces: Inspiration gallery, Studio landing, functional Palette Builder, two coming-soon shells (Visualiser, Book)

- [ ] **Step 1: Write `src/app/(studio)/inspiration/page.tsx`**

Room gallery page. Filter by room type (`RoomType` tabs). Each card shows the room image, colours used, and designer credit. Migrates `inspiration.html`.

- [ ] **Step 2: Write `src/app/(studio)/studio/page.tsx`**

Studio landing page introducing the three tools: Palette Builder (active), Visualiser (coming soon), Book a Consultation (coming soon). Card layout linking to each sub-page.

- [ ] **Step 3: Write `src/components/studio/palette-builder.tsx`**

Migrates the palette-slot system from `script.js` lines 291-460. Colour chips grid, clickable to add to a 5-slot custom palette. Copy palette text, download as PDF (reuse the existing PDF generation logic from `script.js` lines 316-460, converted to TypeScript).

- [ ] **Step 4: Write `src/app/(studio)/studio/palette-builder/page.tsx`**

Page wrapper for the PaletteBuilder component. Uses `PageHero` with eyebrow "Build Your Palette".

- [ ] **Step 5: Write visualiser and book shells**

Both use the `ComingSoon` component:

```typescript
// src/app/(studio)/studio/visualiser/page.tsx
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata = { title: "Colour Visualiser" };

export default function VisualiserPage() {
  return (
    <ComingSoon
      title="See your colours on your walls."
      description="Upload a photo of your room, apply Olympic paint colours, and see the transformation before you commit. Coming soon."
    />
  );
}
```

```typescript
// src/app/(studio)/studio/book/page.tsx
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata = { title: "Book a Consultation" };

export default function BookPage() {
  return (
    <ComingSoon
      title="Book a design consultation."
      description="Choose your date, share your brief, and sit down with an Olympic Paints interior designer. Enjoy a cup of coffee through a design consultation with us. Coming soon."
    />
  );
}
```

- [ ] **Step 6: Verify all studio pages render**

- [ ] **Step 7: Commit**

```bash
git add src/app/\(studio\)/ src/components/studio/
git commit -m "feat: add inspiration gallery, palette builder, and studio shell pages"
```

---

### Task 11: Legal Pages

**Files:**
- Create: `src/app/(legal)/layout.tsx`
- Create: `src/app/(legal)/privacy/page.tsx`
- Create: `src/app/(legal)/terms/page.tsx`
- Create: `src/app/(legal)/returns/page.tsx`
- Create: `src/app/(legal)/shipping/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `Breadcrumb`
- Produces: Four legal pages with shared layout (narrow prose column)

- [ ] **Step 1: Write `src/app/(legal)/layout.tsx`**

```typescript
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 prose prose-sm prose-neutral">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write each legal page**

Migrate content from `privacy-policy.html`, `terms.html`, `returns.html`, `shipping.html`. Each page is a server component with `metadata` export and the legal text rendered as JSX (headings, paragraphs, lists).

- [ ] **Step 3: Commit**

```bash
git add src/app/\(legal\)/
git commit -m "feat: add legal pages — privacy, terms, returns, shipping"
```

---

### Task 12: SEO, Schema.org, Sitemap, 404

**Files:**
- Create: `src/app/not-found.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx` — add Organization + LocalBusiness JSON-LD

**Interfaces:**
- Consumes: product slugs, collection slugs, store-location data
- Produces: Dynamic sitemap, robots.txt, 404 page, global structured data

- [ ] **Step 1: Write `src/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://olympic-paints.vercel.app";

  const staticPages = [
    "", "/our-story", "/colour-cafe", "/contact", "/find-a-store",
    "/products", "/collections", "/inspiration", "/studio",
    "/studio/palette-builder", "/privacy", "/terms", "/returns", "/shipping",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  const productPages = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const collectionPages = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...productPages, ...collectionPages];
}
```

- [ ] **Step 2: Write `src/app/robots.ts`**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://olympic-paints.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 3: Write `src/app/not-found.tsx`**

A branded 404 page with navigation back to home.

- [ ] **Step 4: Add JSON-LD to root layout**

Add Organization + LocalBusiness structured data to `src/app/layout.tsx`, migrating the schema from `index.html` lines 12-33.

- [ ] **Step 5: Verify**

Check `/sitemap.xml` returns valid XML. Check `/robots.txt`. Navigate to `/nonexistent` to see 404.

- [ ] **Step 6: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/not-found.tsx src/app/layout.tsx
git commit -m "feat: add sitemap, robots.txt, 404, and structured data"
```

---

### Task 13: Final QA & Production Build

**Files:**
- Modify: Various — fix any type errors, broken links, responsive issues found during QA

**Interfaces:**
- Consumes: Everything built in Tasks 1-12
- Produces: A production-ready build that passes `next build` with zero errors

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Fix any type errors.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Fix any build errors.

- [ ] **Step 3: Run production server locally**

```bash
npm run start
```

Walk through every page. Check:
- [ ] Home: carousel, counters, all sections
- [ ] Our Story: content, images, videos
- [ ] Colour Cafe: gallery, video, timeline, CTA
- [ ] Products: filters, add to cart, product detail pages
- [ ] Collections: listing, detail pages
- [ ] Inspiration: gallery, room type filter
- [ ] Studio: landing, palette builder, coming soon shells
- [ ] Cart: add/remove/update items
- [ ] Checkout: form submission, mocked success
- [ ] Contact: form labels, all fields accessible
- [ ] Legal pages: content renders
- [ ] 404: branded page
- [ ] Mobile: all pages responsive at 375px
- [ ] Accessibility: tab through interactive elements, check focus indicators

- [ ] **Step 4: Fix any issues found**

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final QA fixes and production build verification"
```
