import type { Collection } from "@/types";
import { colours } from "./colours";

const byId = (id: string) => {
  const colour = colours.find((c) => c.id === id);
  if (!colour) throw new Error(`Unknown colour id: ${id}`);
  return { ...colour, collection: id };
};

// Extracted from the theme tabs (data-theme-filter) and paint chips (data-theme) in
// colour-collections.html. "Inspiring Optimism" is confirmed as the 2026 Colour of the
// Year collection in index.html's hero copy ("2026 Colour of the Year" / "Inspiring Optimism").
export const collections: Collection[] = [
  {
    id: "inspiring-optimism-2026",
    slug: "inspiring-optimism",
    name: "Inspiring Optimism",
    description:
      "The 2026 Colour of the Year collection. Warm, confident tones that bring energy and calm to any room.",
    coverImage: "/images/collections/inspiring-optimism.webp",
    colours: [byId("olympic-yellow"), byId("morning-yellow"), byId("lemon-light")],
    rooms: [],
    year: 2026,
  },
  {
    id: "gallery-whites",
    slug: "gallery-whites",
    name: "Whites",
    description: "Clean, gallery-ready whites and soft greys that let architecture and light take the lead.",
    coverImage: "/images/collections/gallery-whites.webp",
    colours: [byId("gallery-white"), byId("cloud-white"), byId("soft-grey")],
    rooms: [],
    year: 2026,
  },
  {
    id: "cool-calm",
    slug: "cool-calm",
    name: "Cool Calm",
    description: "Sky washes and studio blues for spaces designed to feel calm, quiet and considered.",
    coverImage: "/images/collections/cool-calm.webp",
    colours: [byId("sky-wash"), byId("studio-blue"), byId("slate-line")],
    rooms: [],
    year: 2026,
  },
  {
    id: "nature-notes",
    slug: "nature-notes",
    name: "Nature Notes",
    description: "Leaf greens and deep teals bringing the outdoors in, grounded and organic.",
    coverImage: "/images/collections/nature-notes.webp",
    colours: [byId("leaf-green"), byId("deep-teal")],
    rooms: [],
    year: 2026,
  },
  {
    id: "graphic-accents",
    slug: "graphic-accents",
    name: "Graphic Accents",
    description: "Confident ink black for bold architectural moments and graphic contrast.",
    coverImage: "/images/collections/graphic-accents.webp",
    colours: [byId("ink-black")],
    rooms: [],
    year: 2026,
  },
];
