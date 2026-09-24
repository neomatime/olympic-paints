import type { ColourSwatch } from "@/types";

// Extracted from the paint-chip grid in colour-collections.html (data-theme, data-name, data-hex)
// plus the additional swatch hexes used on product cards in products.html.
export const colours: ColourSwatch[] = [
  { id: "gallery-white", name: "Gallery White", hex: "#FFFFFF", family: "neutral" },
  { id: "cloud-white", name: "Cloud White", hex: "#F7F7F5", family: "neutral" },
  { id: "soft-grey", name: "Soft Grey", hex: "#E8E8E3", family: "neutral" },
  { id: "olympic-yellow", name: "Olympic Yellow", hex: "#FBC70F", family: "warm" },
  { id: "morning-yellow", name: "Morning Yellow", hex: "#FFE680", family: "warm" },
  { id: "lemon-light", name: "Lemon Light", hex: "#FFF2A8", family: "warm" },
  { id: "sky-wash", name: "Sky Wash", hex: "#CFE5F4", family: "cool" },
  { id: "studio-blue", name: "Studio Blue", hex: "#6B9ECF", family: "cool" },
  { id: "slate-line", name: "Slate Line", hex: "#4F6072", family: "cool" },
  { id: "leaf-green", name: "Leaf Green", hex: "#7E9B72", family: "earth" },
  { id: "deep-teal", name: "Deep Teal", hex: "#1F5E5B", family: "earth" },
  { id: "ink-black", name: "Ink Black", hex: "#111111", family: "bold" },
  // Additional hexes found on product-card swatches in products.html (not in the
  // colour-collections.html chip grid, but real values used elsewhere on the site).
  { id: "clay-earth", name: "Clay Earth", hex: "#D7A500", family: "earth" },
  { id: "dusk-blue", name: "Dusk Blue", hex: "#6B8CAE", family: "cool" },
  { id: "studio-violet", name: "Studio Violet", hex: "#9B7CB5", family: "bold" },
  { id: "brushed-silver", name: "Brushed Silver", hex: "#C0C0C0", family: "neutral" },
];
