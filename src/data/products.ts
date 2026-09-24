import type { Product } from "@/types";
import { colours } from "./colours";

const byId = (id: string) => {
  const colour = colours.find((c) => c.id === id);
  if (!colour) throw new Error(`Unknown colour id: ${id}`);
  return colour;
};

// Extracted from the 8 product cards in products.html (data-product-id, data-category,
// image, swatches, name, category label, rating, size <option> prices).
export const products: Product[] = [
  {
    id: "velvet-interior",
    slug: "platinumplus-velvet-interior",
    name: "PlatinumPlus Velvet Interior",
    description:
      "A luxurious matt finish for interior walls. Smooth, washable, and available in over 1,200 curated colours.",
    category: "interior",
    finish: "matt",
    sizes: [
      { label: "5L", ml: 5000, price: 549 },
      { label: "20L", ml: 20000, price: 1899 },
    ],
    colours: [byId("gallery-white"), byId("olympic-yellow"), byId("leaf-green"), byId("sky-wash"), byId("ink-black")],
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
      { label: "5L", ml: 5000, price: 649 },
      { label: "20L", ml: 20000, price: 2199 },
    ],
    colours: [byId("gallery-white"), byId("soft-grey"), byId("morning-yellow"), byId("studio-blue")],
    images: ["https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=82"],
    featured: true,
    badge: "new",
    rating: { score: 4.8, count: 96 },
  },
  {
    id: "matt-exterior",
    slug: "platinumplus-matt-exterior",
    name: "PlatinumPlus Matt Exterior",
    description: "A weather-resistant exterior finish built for South African sun, rain and temperature swings.",
    category: "exterior",
    finish: "matt",
    sizes: [
      { label: "5L", ml: 5000, price: 699 },
      { label: "20L", ml: 20000, price: 2399 },
    ],
    colours: [byId("gallery-white"), byId("soft-grey"), byId("sky-wash"), byId("slate-line")],
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=82"],
    featured: false,
    rating: { score: 4.7, count: 84 },
  },
  {
    id: "roof-paint",
    slug: "platinumplus-roof-paint",
    name: "PlatinumPlus Roof Paint",
    description: "A specialist roof coating engineered for long-term protection and colour retention.",
    category: "specialist",
    sizes: [{ label: "20L", ml: 20000, price: 2199 }],
    colours: [byId("ink-black"), byId("slate-line"), byId("leaf-green")],
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=82"],
    featured: false,
    rating: { score: 4.6, count: 52 },
  },
  {
    id: "wood-metal",
    slug: "platinumplus-wood-metal",
    name: "PlatinumPlus Wood & Metal",
    description: "A specialist multi-surface paint for wood and metal, resisting rust, chipping and wear.",
    category: "specialist",
    sizes: [
      { label: "1L", ml: 1000, price: 349 },
      { label: "5L", ml: 5000, price: 1299 },
    ],
    colours: [byId("ink-black"), byId("slate-line"), byId("olympic-yellow"), byId("brushed-silver")],
    images: ["https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=82"],
    featured: false,
    rating: { score: 4.8, count: 67 },
  },
  {
    id: "sample-pots",
    slug: "olympic-sample-pots",
    name: "Olympic Sample Pots",
    description: "Curated colour testing pots so you can live with a shade before committing to a full room.",
    category: "interior",
    sizes: [{ label: "250ml", ml: 250, price: 60 }],
    colours: [byId("olympic-yellow"), byId("leaf-green"), byId("lemon-light"), byId("dusk-blue"), byId("studio-violet")],
    images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=82"],
    featured: true,
    rating: { score: 5.0, count: 210 },
  },
  {
    id: "roller-kit",
    slug: "olympic-roller-tray-kit",
    name: "Olympic Roller & Tray Kit",
    description: "Paint application equipment covering rollers, trays and everything needed to get started.",
    category: "equipment",
    sizes: [{ label: "Complete Kit", ml: 0, price: 249 }],
    colours: [byId("gallery-white"), byId("olympic-yellow"), byId("ink-black")],
    images: ["https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=82"],
    featured: false,
    rating: { score: 4.8, count: 74 },
  },
  {
    id: "brush-set",
    slug: "olympic-brush-prep-set",
    name: "Olympic Brush & Prep Set",
    description: "Brushes, tape and preparation tools to get walls ready and finishes looking sharp.",
    category: "equipment",
    sizes: [{ label: "Starter Set", ml: 0, price: 179 }],
    colours: [byId("gallery-white"), byId("soft-grey"), byId("olympic-yellow")],
    images: ["https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=82"],
    featured: false,
    rating: { score: 4.7, count: 59 },
  },
];
