# Olympic Paints — Color Cafe: Home Studio Design
## Next.js Migration & UI/UX Redesign Spec

**Date:** 2026-09-24
**Client:** Olympic Paints (olympicpaints.co.za)
**Repo:** github.com/neomatime/olympic-paints
**Existing site:** Static HTML/CSS/JS on Vercel (`olympic-paints.vercel.app`)
**Project path:** `C:\Users\Neo\OneDrive\Documents\HIMARK SGC\projects\websites\olympicpaints\olympic-paints-site`

---

## 1. Overview

Olympic Paints is a South African paint retailer with an in-house creative division called the Color Cafe, which houses graphic designers, interior designers, and a coffee shop under one roof.

This project migrates the existing static site to Next.js with TypeScript, rebrands the Color Cafe as "Color Cafe: Home Studio Design," and builds the UI/UX foundation for a full digital experience — phased from a marketing/catalogue site into e-commerce and a virtual design studio.

### Vision

Transform a commodity purchase (paint) into a premium, personalised home design journey — both online and in-store. The physical Color Cafe features prototype rooms (living room, bedroom, kitchen) where clients walk into their future home. The coffee shop serves as the welcoming front-of-house.

**Key positioning line:** *"Enjoy a cup of coffee through a design consultation with us."*

### What this phase covers

**Phase 1 only: UI/UX migration and rebrand.** No database, no CMS, no auth, no real payments. All data is static/mocked with typed TypeScript files. Components are designed so that swapping to Supabase/Sanity in Phase 2 requires zero component changes — only the data source changes.

---

## 2. Architecture

### Tech Stack

- **Framework:** Next.js 15 App Router
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + custom brand tokens
- **Deployment:** Vercel
- **Data (Phase 1):** Static typed files in `src/data/`
- **Cart (Phase 1):** localStorage via React context + `useReducer`
- **Data (Phase 2, future):** Supabase (auth, DB, storage) + Sanity (CMS) + Stripe (payments)

### Project Structure

```
olympic-paints/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # Home, Our Story, Colour Cafe, Contact, Find a Store
│   │   │   ├── page.tsx          # Home
│   │   │   ├── our-story/
│   │   │   ├── colour-cafe/
│   │   │   ├── contact/
│   │   │   └── find-a-store/
│   │   ├── (shop)/               # Products, Collections, Cart, Checkout
│   │   │   ├── products/
│   │   │   │   ├── page.tsx      # Catalogue with filters
│   │   │   │   └── [slug]/       # Product detail
│   │   │   ├── collections/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── (studio)/             # Virtual Studio (Phase 2/3 UI shells)
│   │   │   ├── inspiration/
│   │   │   ├── studio/
│   │   │   │   ├── page.tsx      # Studio landing
│   │   │   │   ├── visualiser/
│   │   │   │   ├── palette-builder/
│   │   │   │   └── book/
│   │   ├── (legal)/              # Privacy, Terms, Returns, Shipping
│   │   ├── api/                  # API routes (Phase 2+)
│   │   └── layout.tsx            # Root layout (header/footer)
│   ├── components/
│   │   ├── ui/                   # Button, Input, Card, Modal, Select, Textarea
│   │   ├── layout/               # SiteHeader, SiteFooter, MobileMenu
│   │   ├── home/                 # HeroCarousel, DiscoverySection
│   │   ├── shop/                 # ProductCard, ProductGrid, CartDrawer, ColourSwatch
│   │   ├── studio/               # PaletteBuilder, RoomUploader, ColourVisualiser, ConsultationBooking
│   │   └── shared/               # ScrollReveal, SkipLink, Breadcrumb, SectionHeading, BeforeAfter, ImageGallery, VideoPlayer, TestimonialCard
│   ├── lib/
│   │   └── utils/                # Helpers, constants, formatters
│   ├── data/                     # Static typed data (Phase 1)
│   │   ├── products.ts
│   │   ├── collections.ts
│   │   ├── colours.ts
│   │   ├── inspiration.ts
│   │   ├── team.ts
│   │   └── store-locations.ts
│   ├── types/                    # Shared type definitions
│   │   └── index.ts
│   ├── hooks/                    # useScroll, useMediaQuery, useCart, etc.
│   ├── context/                  # CartProvider
│   └── styles/
│       └── globals.css           # Tailwind + brand custom properties
├── public/                       # Static assets (images, fonts, videos)
└── next.config.ts
```

### Key Architectural Decisions

- **Route groups** `(marketing)`, `(shop)`, `(studio)`, `(legal)` keep concerns separated without affecting URLs.
- **No database in Phase 1.** All data lives in typed `src/data/*.ts` files. Components consume typed data via imports. When Supabase/Sanity arrives in Phase 2, we create matching query functions with the same return types and swap the imports.
- **Cart uses React context + localStorage** in Phase 1. The `CartProvider` wraps the app, using `useReducer` for state. When Supabase arrives, the reducer actions call the DB instead.
- **Checkout is UI-complete but payment is mocked** — no Stripe in Phase 1.

---

## 3. Pages & User Journey

### Digital Customer Journey

```
LAND → INSPIRE → EXPLORE → EXPERIENCE → CONVERT
```

- **Homeowner path:** Home → Inspiration/Collections → Products → Cart → Checkout
- **Designer path:** Home → Colour Cafe → Collections → Studio → Book consultation
- **Coffee walk-in path:** Home → Colour Cafe → Find a Store

### Page Map

#### Marketing

| Route | Purpose | Migrates From |
|-------|---------|---------------|
| `/` | Hero carousel, value prop, discovery teasers, CTAs | `index.html` |
| `/our-story` | Brand heritage (40+ years), team, video content | `our-story.html` |
| `/colour-cafe` | Color Cafe: Home Studio Design — 4-zone experience, showroom gallery, coffee invitation | `colour-cafe.html` |
| `/contact` | Contact form, full address, map, opening hours, phone | `contact.html` |
| `/find-a-store` | Store locator with map integration | `find-a-store.html` |

#### Shop

| Route | Purpose | Migrates From |
|-------|---------|---------------|
| `/products` | Full product catalogue with category/finish/colour filters | `products.html` |
| `/products/[slug]` | Product detail — swatches, sizes, pricing, add to cart | New (currently modal) |
| `/collections` | Curated colour collections by theme/room | `colour-collections.html` |
| `/collections/[slug]` | Individual collection detail with room inspirations | New |
| `/cart` | Cart page | `checkout.html` |
| `/checkout` | Checkout flow (mocked payment in Phase 1) | `checkout.html` |

#### Studio (Phase 2/3 UI shells)

| Route | Purpose |
|-------|---------|
| `/inspiration` | Room gallery filtered by room type, before/afters | Migrated from `inspiration.html` |
| `/studio` | Virtual design studio landing |
| `/studio/visualiser` | Colour overlay tool on uploaded room photos |
| `/studio/palette-builder` | Custom palette creation (migrated paint-chip picker) |
| `/studio/book` | Book a design consultation |

#### Legal

| Route | Migrates From |
|-------|---------------|
| `/privacy` | `privacy-policy.html` |
| `/terms` | `terms.html` |
| `/returns` | `returns.html` |
| `/shipping` | `shipping.html` |

### Navigation

```
[Our Story]  [Colour Cafe]  [Products ▾]     LOGO     [Collections]  [Inspiration]  [Studio]  [Contact]
                             ├─ All Products
                             ├─ Interior
                             ├─ Exterior
                             └─ Equipment
```

- Products gets a dropdown for category filtering
- Studio is new — replaces Find a Store in primary nav (Find a Store moves to footer + Contact page)
- Cart icon in top-right
- Mobile: hamburger with full-screen overlay (as currently built)

---

## 4. Component Design & UI System

### Design Tokens

The current site has a warm, editorial, premium visual language. We preserve that DNA and systematise it.

```
Brand Tokens:
├── Colors
│   ├── Primary: Olympic brand colours (extracted from existing palette)
│   ├── Neutral: Warm greys/creams (warm tone, not clinical)
│   ├── Accent: Colour-of-the-year feature colour
│   └── Semantic: Success, error, info states
├── Typography
│   ├── Display: Current serif/display font (hero headlines)
│   ├── Body: Current sans-serif (nav, paragraphs)
│   └── Accent: Italic/em treatment (signature headline style)
├── Spacing: 4px base scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
├── Radius: Minimal — sharp/editorial, not rounded
└── Motion: Scroll reveals, page transitions, hover states
```

### Component Inventory

#### Layout Shell

| Component | Description | Migration Source |
|-----------|-------------|-----------------|
| `SiteHeader` | Centered circular logo, split nav (left/right), scroll-shrink, mobile hamburger | Direct migration |
| `SiteFooter` | Links, contact info, social, newsletter signup | Direct migration |
| `MobileMenu` | Full-screen overlay with staggered animations | Direct migration |
| `PageHero` | Two variants: cinematic carousel (home) and dark overlay with eyebrow/heading (inner pages) | Direct migration |
| `ScrollReveal` | IntersectionObserver wrapper component | Migrated from `.reveal` system |

#### Content

| Component | Description | Status |
|-----------|-------------|--------|
| `SectionHeading` | Eyebrow + heading + optional body text | New (extracted pattern) |
| `ImageGallery` | Grid/masonry layout for showroom/Colour Cafe photos | New |
| `VideoPlayer` | Embedded video with poster (HomeMakers film, Our People clip) | Migration |
| `TestimonialCard` | Customer/designer testimonial with photo | New |
| `BeforeAfter` | Interactive slider comparing room transformations | New |

#### Shop

| Component | Description | Status |
|-----------|-------------|--------|
| `ProductCard` | Image, name, price, swatch indicator, quick-add | Migration |
| `ProductGrid` | Filterable grid with category tabs | Migration of `data-theme-filter` system |
| `ProductDetail` | Full product view — swatch options, sizes, add-to-cart | New (replaces modal) |
| `CartDrawer` | Slide-out cart panel | Migration of `OP_CART` |
| `ColourSwatch` | Clickable colour chip | Migration of `.paint-chip` |

#### Studio (Phase 2/3 — UI shells only in Phase 1)

These render as styled placeholder pages with "coming soon" messaging and an email capture for early interest. They are not functional in Phase 1, except `PaletteBuilder` which migrates the existing working feature.

| Component | Description | Status |
|-----------|-------------|--------|
| `PaletteBuilder` | Drag-and-drop palette from colour chips | Migration of existing palette-slot system (functional in Phase 1) |
| `RoomUploader` | Drag-and-drop room photo upload | New (shell only — non-functional) |
| `ColourVisualiser` | Canvas-based colour overlay on room photos | New (shell only — non-functional) |
| `ConsultationBooking` | Date/time picker + brief form | New (shell only — non-functional) |

#### Shared Primitives

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost variants |
| `Input`, `Textarea`, `Select` | Form primitives with labels and validation states |
| `Modal` | Product quick-view, image lightbox |
| `SkipLink` | Accessibility skip-to-content link (carried over) |
| `Breadcrumb` | Schema-aware breadcrumb trail |

### Motion & Interaction

| Effect | Current Implementation | Next.js Version |
|--------|----------------------|-----------------|
| Intro curtain (iris reveal) | CSS + JS `site-intro` | Client component with `useEffect`, respects `prefers-reduced-motion` |
| Hero carousel | `setInterval` + class toggling | `useState` + `useCallback`, pause on hover/focus |
| Scroll reveals | IntersectionObserver on `.reveal` | `ScrollReveal` wrapper component |
| Header shrink on scroll | `is-scrolled` class toggle | `useScroll` hook with `requestAnimationFrame` |
| Paint chip selection | Class toggle + array push | `useState` with typed palette state |
| Cart drawer | Body class + transform | Headless UI Dialog or custom slide-over |

**New motion in Phase 1:**
- Page transitions between routes (subtle fade/slide)
- Colour swatch hover: gentle scale + shadow lift
- Product card: image parallax on hover
- Showroom gallery: lightbox with swipe support

### Responsive Breakpoints

- **Mobile** (<768px): Single column, hamburger nav, stacked hero, full-width product cards
- **Tablet** (768–1024px): 2-column product grid, adapted nav
- **Desktop** (1024+): Full split nav, 3–4 column product grid, hover states active

---

## 5. Data & Content Structure (Phase 1 — Static)

### Type Definitions

```typescript
type Product = {
  id: string
  slug: string
  name: string
  description: string
  category: 'interior' | 'exterior' | 'specialist' | 'equipment'
  finish?: 'matt' | 'silk' | 'gloss' | 'eggshell' | 'suede'
  sizes: { label: string; ml: number; price: number }[]
  colours: ColourSwatch[]
  images: string[]
  featured: boolean
}

type ColourSwatch = {
  id: string
  name: string
  hex: string
  family: 'warm' | 'cool' | 'neutral' | 'bold' | 'earth'
  collection?: string
}

type Collection = {
  id: string
  slug: string
  name: string
  description: string
  coverImage: string
  colours: ColourSwatch[]
  rooms: RoomInspiration[]
  year: number
}

type RoomInspiration = {
  id: string
  title: string
  roomType: 'living-room' | 'bedroom' | 'kitchen' | 'bathroom' | 'kids-room' | 'outdoor'
  images: { before?: string; after: string }
  coloursUsed: ColourSwatch[]
  designer?: string
}

type CartItem = {
  productId: string
  colourId: string
  sizeLabel: string
  qty: number
  price: number
}

type ConsultationSlot = {
  id: string
  date: string
  time: string
  type: 'in-store' | 'virtual'
  designer: string
}
```

### Static Data Files

```
src/data/
├── products.ts          # Product catalogue (~100 items)
├── collections.ts       # Curated colour collections
├── colours.ts           # Master colour library
├── inspiration.ts       # Room gallery entries
├── team.ts              # Designers/staff
└── store-locations.ts   # Store details, coordinates, hours
```

### Cart Strategy

- React context (`CartProvider`) with `useReducer`
- `localStorage` persistence (same approach as existing `OP_CART`)
- Typed with `CartItem[]`
- Checkout UI-complete, payment mocked

### Content Required from Client

| Content | Status | Needed |
|---------|--------|--------|
| Product catalogue | Partial (hardcoded in `products.html`) | Full list with prices, sizes, descriptions |
| Colour library | Partial (paint chips in palette builder) | Complete colour names + hex codes |
| Showroom photos | None | Professional shots of Color Cafe, prototype rooms |
| Team/designer bios | Partial (Our Story) | Headshots, bios |
| Store address + hours | Missing | Full address, hours, phone, map coordinates |
| Brand assets | Logo exists | Brand guidelines doc, font files if custom |

---

## 6. SEO & Accessibility

### SEO

- Meta title and description on every page
- Open Graph + Twitter Card tags
- Schema.org structured data: Organization, LocalBusiness (with full address/hours), Product, BreadcrumbList
- Canonical URLs on all pages
- `sitemap.xml` (auto-generated)
- `robots.txt`
- Semantic heading hierarchy (single H1 per page)
- Image alt text on all images

### Accessibility (WCAG 2.1 AA)

- Skip-to-content link (carried over)
- All form inputs have associated `<label>` elements
- ARIA labels on interactive elements (nav, menu toggle, cart, filters)
- `prefers-reduced-motion` respected for all animations
- Keyboard navigation: all interactive elements focusable and operable
- Focus indicators on all interactive elements
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`
- Colour contrast: minimum 4.5:1 for body text, 3:1 for large text
- Form validation with descriptive error messages

---

## 7. Phased Rollout

### Phase 1 — Core Site Migration (Current Scope)

Migrate the existing static site to Next.js/TypeScript. Preserve every working feature. Enhance the Colour Cafe positioning with the "Home Studio Design" rebrand. All data static/mocked. No database, no CMS, no auth, no real payments.

**Deliverable:** A production-ready marketing + catalogue site on Vercel.

### Phase 2 — E-Commerce & CMS

- Supabase (auth, database, storage)
- Sanity CMS (blog, gallery, showroom content, collections)
- Stripe payments
- User accounts (order history, saved palettes)
- Cart synced to DB
- Real checkout + order confirmation emails
- Analytics (GA4 + conversion tracking)

### Phase 3 — Virtual Studio

- Room photo upload + colour visualiser (canvas-based)
- AI-suggested palettes
- Consultation booking system (calendar + designer availability)
- Design brief submission
- Virtual consultation integration (Zoom/WhatsApp)
- Designer profiles
- B2B portal for professional designers (trade pricing, bulk orders)

| Phase | Focus | DB | Auth | Payments |
|-------|-------|-----|------|----------|
| 1 | UI/UX migration + rebrand | No | No | Mocked |
| 2 | E-commerce + CMS | Supabase | Yes | Stripe |
| 3 | Virtual studio + B2B | Extended | Extended | Extended |

Each phase is a deployable, complete experience.
