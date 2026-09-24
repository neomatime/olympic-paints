"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types";

type FilterOption = { value: ProductCategory | "all"; label: string };

const filters: FilterOption[] = [
  { value: "all", label: "All Products" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "specialist", label: "Specialty" },
  { value: "equipment", label: "Equipment" },
];

const validCategories = new Set(filters.map((f) => f.value));

export function ProductGrid({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requested = searchParams.get("category");
  const activeFilter = requested && validCategories.has(requested as ProductCategory | "all") ? requested : "all";

  const setFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const filtered = activeFilter === "all" ? products : products.filter((p) => p.category === activeFilter);

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filter products by category">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={activeFilter === f.value}
            className={cn(
              "px-5 py-2 text-sm rounded-full border transition-colors",
              activeFilter === f.value
                ? "bg-ink text-cream border-ink"
                : "border-ink/15 text-muted hover:border-ink/30"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-muted py-16">No products in this category yet.</p>}
    </div>
  );
}
