import type { NavItem } from "@/types";
import { productCategories } from "./categories";

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
      { label: "Our Colours", href: "/collections" },
      ...productCategories.map((c) => ({ label: c.label, href: `/products?category=${c.id}` })),
    ],
  },
  { label: "VibrAInt", href: "https://vibraint.net/", external: true },
];

export const navRight: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Find a Store", href: "/find-a-store" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" },
];

export const navItems: NavItem[] = [...navLeft, ...navRight];
