import type { RoomInspiration } from "@/types";
import { colours } from "./colours";

const byId = (id: string) => {
  const colour = colours.find((c) => c.id === id);
  if (!colour) throw new Error(`Unknown colour id: ${id}`);
  return colour;
};

// NOTE: the existing site only contains one genuinely room-specific photograph
// (the "Layered living room in warm neutral tones" image on index.html). It has
// no dedicated photography for bedroom/kitchen/bathroom/kids-room/outdoor. The
// entries below reuse the real lifestyle image URLs that exist across
// index.html and colour-cafe.html (all are real assets already on the site,
// not invented), paired with plausible titles/colours per room type so every
// RoomType has at least two entries as requested. Titles/colour pairings for
// non-living-room entries are best-effort compositions, not scraped copy.
export const inspirations: RoomInspiration[] = [
  {
    id: "modern-living-warmth",
    title: "Modern Living with Warmth",
    roomType: "living-room",
    images: {
      after:
        "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_c768e03d-e562-4ba7-801e-b7db4975fec8.png",
    },
    coloursUsed: [byId("olympic-yellow"), byId("gallery-white"), byId("leaf-green")],
    designer: "Olympic Design Team",
  },
  {
    id: "layered-living-neutrals",
    title: "Layered Living in Warm Neutrals",
    roomType: "living-room",
    images: {
      after: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=82",
    },
    coloursUsed: [byId("cloud-white"), byId("clay-earth"), byId("slate-line")],
    designer: "Olympic Design Team",
  },
  {
    id: "calm-bedroom-soft-light",
    title: "Calm Bedroom in Soft Light",
    roomType: "bedroom",
    images: {
      after:
        "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_aa7d96f6-4b98-404a-92ca-41fb6f205ae8.png",
    },
    coloursUsed: [byId("soft-grey"), byId("sky-wash"), byId("morning-yellow")],
    designer: "Olympic Design Team",
  },
  {
    id: "quiet-retreat-muted-tones",
    title: "Quiet Retreat in Muted Tones",
    roomType: "bedroom",
    images: {
      after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=82",
    },
    coloursUsed: [byId("gallery-white"), byId("dusk-blue"), byId("cloud-white")],
    designer: "Olympic Design Team",
  },
  {
    id: "kitchen-natural-tones",
    title: "Kitchen Grounded in Natural Tones",
    roomType: "kitchen",
    images: {
      after:
        "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175401_6ebea8f8-552f-4638-ab05-b057ae298e29.png",
    },
    coloursUsed: [byId("clay-earth"), byId("gallery-white"), byId("slate-line")],
    designer: "Olympic Design Team",
  },
  {
    id: "bright-kitchen-warm-accents",
    title: "Bright Kitchen with Warm Accents",
    roomType: "kitchen",
    images: {
      after:
        "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175401_2d5368d6-76ec-4138-9dba-25cb57ea653f.png",
    },
    coloursUsed: [byId("olympic-yellow"), byId("gallery-white"), byId("brushed-silver")],
    designer: "Olympic Design Team",
  },
  {
    id: "bathroom-cool-calm",
    title: "Bathroom in Cool Calm Tones",
    roomType: "bathroom",
    images: {
      after: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=2200&q=82",
    },
    coloursUsed: [byId("sky-wash"), byId("studio-blue"), byId("gallery-white")],
    designer: "Olympic Design Team",
  },
  {
    id: "spa-inspired-bathroom",
    title: "Spa-Inspired Bathroom Palette",
    roomType: "bathroom",
    images: {
      after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=82",
    },
    coloursUsed: [byId("cloud-white"), byId("deep-teal"), byId("dusk-blue")],
    designer: "Olympic Design Team",
  },
  {
    id: "playful-kids-room",
    title: "Playful Kids Room in Optimistic Colour",
    roomType: "kids-room",
    images: {
      after:
        "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_c768e03d-e562-4ba7-801e-b7db4975fec8.png",
    },
    coloursUsed: [byId("olympic-yellow"), byId("lemon-light"), byId("leaf-green")],
    designer: "Olympic Design Team",
  },
  {
    id: "kids-room-gentle-contrast",
    title: "Kids Room with Gentle Contrast",
    roomType: "kids-room",
    images: {
      after:
        "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_aa7d96f6-4b98-404a-92ca-41fb6f205ae8.png",
    },
    coloursUsed: [byId("studio-violet"), byId("gallery-white"), byId("morning-yellow")],
    designer: "Olympic Design Team",
  },
  {
    id: "exterior-confident-contrast",
    title: "Exterior Refresh with Confident Contrast",
    roomType: "outdoor",
    images: {
      after:
        "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175401_6ebea8f8-552f-4638-ab05-b057ae298e29.png",
    },
    coloursUsed: [byId("slate-line"), byId("gallery-white"), byId("ink-black")],
    designer: "Olympic Design Team",
  },
  {
    id: "weather-ready-outdoor",
    title: "Weather-Ready Outdoor Palette",
    roomType: "outdoor",
    images: {
      after:
        "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175401_2d5368d6-76ec-4138-9dba-25cb57ea653f.png",
    },
    coloursUsed: [byId("clay-earth"), byId("ink-black"), byId("slate-line")],
    designer: "Olympic Design Team",
  },
];
