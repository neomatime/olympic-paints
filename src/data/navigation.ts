import type { NavItem } from "@/types";

// Extracted verbatim from <nav class="site-nav"> in the existing HTML (identical across
// every page): nav-group.nav-left, then the brand, then nav-group.nav-right.
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
      { label: "Specialty", href: "/products?category=specialist" },
      { label: "Equipment", href: "/products?category=equipment" },
    ],
  },
];

export const navRight: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Find a Store", href: "/find-a-store" },
  { label: "Contact", href: "/contact" },
];

export const navItems: NavItem[] = [...navLeft, ...navRight];
