import type { TeamMember } from "@/types";

// Extracted from the "In Pictures" gallery in our-story.html, the only section of the
// site with real designer photography. "Nisha van der Hoven" is the only named
// individual on the site (alt="Designer Nisha van der Hoven by a sunlit stone wall").
// The other two gallery photos have no name in their alt text, so they are kept under
// the studio/team identity used elsewhere on the site rather than an invented name.
export const team: TeamMember[] = [
  {
    id: "nisha-van-der-hoven",
    name: "Nisha van der Hoven",
    role: "Interior Designer",
    bio: "Part of the Olympic Paints design team, helping homeowners connect colour to mood, light, furniture, texture and daily life.",
    image: "/images/nisha-van-der-hoven_portrait-2-png-CROP.webp",
  },
  {
    id: "design-team-lead",
    name: "Olympic Design Team",
    role: "Interior Designers & Colour Specialists",
    bio: "The team behind the Colour Cafe experience — guiding homeowners from colour uncertainty to confident design direction.",
    image: "/images/ZEANNE_OLYMPIC-35-scaled-1.webp",
  },
  {
    id: "colour-cafe-studio",
    name: "Colour Cafe Design Studio",
    role: "Design Consultation Team",
    bio: "Consultants who bring together wall colour, flooring, furniture, lighting, cabinetry, textiles and finishes into one room direction.",
    image: "/images/Between-Worlds-Image-4.webp",
  },
];
