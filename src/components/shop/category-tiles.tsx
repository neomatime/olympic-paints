import Link from "next/link";
import { productCategories } from "@/data/categories";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

type Tile = { key: string; label: string; href: string; count: string; description: string; featured?: boolean };

export function CategoryTiles({ products }: { products: Product[] }) {
  const tiles: Tile[] = [
    {
      key: "colours",
      label: "Our Colours",
      href: "/collections",
      count: "Colour range",
      description: "Explore the Olympic Paints colour collections.",
      featured: true,
    },
    ...productCategories.map((c) => {
      const n = products.filter((p) => p.category === c.id).length;
      return {
        key: c.id,
        label: c.label,
        href: `/products?category=${c.id}#shop`,
        count: `${n} ${n === 1 ? "item" : "items"}`,
        description: c.description,
      };
    }),
  ];

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {tiles.map((tile) => (
        <li key={tile.key}>
          <Link
            href={tile.href}
            className={cn(
              "group flex h-full flex-col rounded-lg p-6 md:p-8 transition-colors",
              tile.featured ? "bg-espresso text-cream hover:bg-walnut" : "bg-paper text-ink hover:bg-linen"
            )}
          >
            <span
              className={cn(
                "w-fit rounded-full px-3 py-1 text-xs font-medium",
                tile.featured ? "bg-olympic-yellow text-espresso" : "bg-ink/10 text-ink"
              )}
            >
              {tile.count}
            </span>
            <h3 className="mt-4 text-2xl leading-tight">{tile.label}</h3>
            <p className={cn("mt-2 text-sm leading-relaxed", tile.featured ? "text-cream/75" : "text-muted")}>
              {tile.description}
            </p>
            <span className="mt-auto pt-6 text-sm font-medium">
              View all <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">›</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
