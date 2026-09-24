"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColourSwatch } from "./colour-swatch";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";
import { categoryLabel } from "@/data/categories";

export function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({
      productId: product.id,
      productName: product.name,
      colourId: product.colours[0]?.id || "",
      colourName: product.colours[0]?.name || "",
      sizeLabel: selectedSize.label,
      qty: 1,
      price: selectedSize.price,
      image: product.images[0],
    });
  }

  return (
    <article className="group">
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-paper"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm",
              product.badge === "bestseller" ? "bg-olympic-yellow text-espresso" : "bg-espresso text-cream"
            )}
          >
            {product.badge === "bestseller" ? "Best Seller" : "New"}
          </span>
        )}
      </Link>

      <div className="flex gap-1.5 mb-3">
        {product.colours.slice(0, 5).map((c) => (
          <ColourSwatch key={c.id} hex={c.hex} name={c.name} />
        ))}
      </div>

      <Link href={`/products/${product.slug}`}>
        <h3 className="text-sm font-medium">{product.name}</h3>
      </Link>
      <p className="text-xs text-muted mt-1">
        {categoryLabel(product.category)}
      </p>

      {product.rating && (
        <div className="flex items-center gap-1 mt-2 text-xs text-muted">
          <span aria-hidden="true">{"★".repeat(Math.round(product.rating.score))}</span>
          <span>
            {product.rating.score} ({product.rating.count})
          </span>
        </div>
      )}

      <select
        className="mt-3 w-full px-3 py-2 bg-paper border border-ink/10 text-sm rounded-sm"
        value={selectedSize.label}
        onChange={(e) => {
          const size = product.sizes.find((s) => s.label === e.target.value);
          if (size) setSelectedSize(size);
        }}
        aria-label={`Select size for ${product.name}`}
      >
        {product.sizes.map((s) => (
          <option key={s.label} value={s.label}>
            {s.label} &mdash; {formatPrice(s.price)}
          </option>
        ))}
      </select>

      <Button variant="secondary" className="w-full mt-3" onClick={handleAdd}>
        Add to Bag
      </Button>
    </article>
  );
}
