import type { ProductCategory } from "@/types";

export type CategoryInfo = {
  id: ProductCategory;
  label: string;
  description: string;
};

// Mirrors the product categories on olympicpaints.co.za (2026-09-25).
export const productCategories: CategoryInfo[] = [
  { id: "samples", label: "Samples", description: "Test a colour on your own walls before committing to a room." },
  { id: "enamels", label: "Enamels", description: "Hard-wearing gloss finishes for wood, metal, doors and trims." },
  { id: "preparation", label: "Preparation", description: "Rollers, brushes and tools to get surfaces ready." },
  { id: "pva", label: "PVA", description: "Interior and exterior wall paints in matt, satin and sheen finishes." },
  { id: "sealers", label: "Sealers", description: "Seal, restore and waterproof surfaces before and after painting." },
  { id: "primers", label: "Primers", description: "Primers and undercoats for better adhesion and a truer colour." },
  { id: "multipurpose", label: "Multipurpose", description: "All-in-one coatings that cover more than one job." },
  { id: "general", label: "General", description: "Everyday coatings for roofs, walls and exteriors." },
];

export function categoryLabel(id: ProductCategory): string {
  return productCategories.find((c) => c.id === id)?.label ?? id;
}
