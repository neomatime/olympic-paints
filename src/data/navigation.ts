import type { NavItem } from "@/types";

export type MenuKey =
  | "our-story"
  | "colour-cafe"
  | "products"
  | "vibraint"
  | "collections"
  | "inspiration"
  | "find-a-store"
  | "contact"
  | "login";

export type MenuItem = NavItem & { key: MenuKey };

// The site's primary destinations, in menu order. The mega menu adds contextual
// content for each key; it does not add or rename destinations.
export const menuItems: MenuItem[] = [
  { key: "our-story", label: "Our Story", href: "/our-story" },
  { key: "colour-cafe", label: "Colour Cafe", href: "/colour-cafe" },
  { key: "products", label: "Products", href: "/products" },
  { key: "vibraint", label: "VibrAInt", href: "https://vibraint.net/", external: true },
  { key: "collections", label: "Collections", href: "/collections" },
  { key: "inspiration", label: "Inspiration", href: "/inspiration" },
  { key: "find-a-store", label: "Find a Store", href: "/find-a-store" },
  { key: "contact", label: "Contact", href: "/contact" },
  { key: "login", label: "Login", href: "/login" },
];
