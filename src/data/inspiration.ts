import type { RoomInspiration } from "@/types";
import { colours } from "./colours";

const byId = (id: string) => {
  const colour = colours.find((c) => c.id === id);
  if (!colour) throw new Error(`Unknown colour id: ${id}`);
  return colour;
};

// Room imagery supplied by the client (2026-09-25). Titles describe each image;
// coloursUsed are the closest swatches from colours.ts, not confirmed product colours.
const DESIGNER = "Olympic Design Team";

export const inspirations: RoomInspiration[] = [
  {
    id: "terracotta-olive-living",
    title: "Terracotta and Olive Living Room",
    roomType: "living-room",
    images: { after: "/images/inspiration/terracotta-olive-living.webp" },
    coloursUsed: [byId("clay-earth"), byId("leaf-green"), byId("cloud-white")],
    designer: DESIGNER,
  },
  {
    id: "neutral-fireplace-living",
    title: "Soft Neutral Living Room with Fireplace",
    roomType: "living-room",
    images: { after: "/images/inspiration/neutral-fireplace-living.webp" },
    coloursUsed: [byId("cloud-white"), byId("soft-grey"), byId("clay-earth")],
    designer: DESIGNER,
  },
  {
    id: "gallery-wall-living",
    title: "Gallery Wall Living Room in Warm Neutrals",
    roomType: "living-room",
    images: { after: "/images/inspiration/gallery-wall-living.webp" },
    coloursUsed: [byId("soft-grey"), byId("leaf-green"), byId("ink-black")],
    designer: DESIGNER,
  },
  {
    id: "cream-olive-bedroom",
    title: "Serene Bedroom in Cream and Olive",
    roomType: "bedroom",
    images: { after: "/images/inspiration/cream-olive-bedroom.webp" },
    coloursUsed: [byId("cloud-white"), byId("leaf-green"), byId("soft-grey")],
    designer: DESIGNER,
  },
  {
    id: "terracotta-kitchen",
    title: "Sunlit Kitchen with Terracotta Accents",
    roomType: "kitchen",
    images: { after: "/images/inspiration/terracotta-kitchen.webp" },
    coloursUsed: [byId("gallery-white"), byId("clay-earth"), byId("morning-yellow")],
    designer: DESIGNER,
  },
  {
    id: "travertine-kitchen",
    title: "Travertine Kitchen in Natural Tones",
    roomType: "kitchen",
    images: { after: "/images/inspiration/travertine-kitchen.webp" },
    coloursUsed: [byId("cloud-white"), byId("soft-grey"), byId("clay-earth")],
    designer: DESIGNER,
  },
  {
    id: "stone-oak-bathroom",
    title: "Stone and Oak Bathroom",
    roomType: "bathroom",
    images: { after: "/images/inspiration/stone-oak-bathroom.webp" },
    coloursUsed: [byId("soft-grey"), byId("cloud-white"), byId("leaf-green")],
    designer: DESIGNER,
  },
  {
    id: "spa-bathroom-view",
    title: "Spa Bathroom with a View",
    roomType: "bathroom",
    images: { after: "/images/inspiration/spa-bathroom-view.webp" },
    coloursUsed: [byId("cloud-white"), byId("soft-grey"), byId("sky-wash")],
    designer: DESIGNER,
  },
  {
    id: "olive-safari-kids-room",
    title: "Olive Safari Kids Room",
    roomType: "kids-room",
    images: { after: "/images/inspiration/olive-safari-kids-room.webp" },
    coloursUsed: [byId("leaf-green"), byId("clay-earth"), byId("cloud-white")],
    designer: DESIGNER,
  },
  {
    id: "sunny-playroom",
    title: "Sunny Playroom in Soft Pastels",
    roomType: "kids-room",
    images: { after: "/images/inspiration/sunny-playroom.webp" },
    coloursUsed: [byId("morning-yellow"), byId("sky-wash"), byId("leaf-green")],
    designer: DESIGNER,
  },
  {
    id: "modern-entrance",
    title: "Modern Entrance in Warm Evening Light",
    roomType: "outdoor",
    images: { after: "/images/inspiration/modern-entrance.webp" },
    coloursUsed: [byId("gallery-white"), byId("ink-black"), byId("soft-grey")],
    designer: DESIGNER,
  },
  {
    id: "poolside-patio",
    title: "Poolside Patio at Dusk",
    roomType: "outdoor",
    images: { after: "/images/inspiration/poolside-patio.webp" },
    coloursUsed: [byId("slate-line"), byId("soft-grey"), byId("deep-teal")],
    designer: DESIGNER,
  },
];
