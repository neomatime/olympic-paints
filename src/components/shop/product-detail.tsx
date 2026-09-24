"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColourSwatch } from "./colour-swatch";
import { SizeSelect } from "./size-select";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useCart } from "@/context/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";
import { categoryLabel } from "@/data/categories";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColour, setSelectedColour] = useState(product.colours[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({
      productId: product.id,
      productName: product.name,
      colourId: selectedColour?.id || "",
      colourName: selectedColour?.name || "",
      sizeLabel: selectedSize.label,
      qty: 1,
      price: selectedSize.price,
      image: product.images[0],
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ScrollReveal>
          <div className="relative aspect-square overflow-hidden rounded-sm bg-paper">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
              priority
            />
            {product.badge && (
              <span
                className={cn(
                  "absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm",
                  product.badge === "bestseller" ? "bg-olympic-yellow text-espresso" : "bg-espresso text-cream"
                )}
              >
                {product.badge === "bestseller" ? "Best Seller" : "New"}
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative w-20 aspect-square overflow-hidden rounded-sm border-2 transition-colors",
                    activeImage === i ? "border-ink" : "border-transparent hover:border-ink/30"
                  )}
                  aria-label={`View image ${i + 1} of ${product.name}`}
                  aria-pressed={activeImage === i}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p className="text-xs font-bold tracking-[0.16em] uppercase text-muted">
            {categoryLabel(product.category)}
            {product.finish ? ` — ${product.finish.charAt(0).toUpperCase()}${product.finish.slice(1)}` : ""}
          </p>
          <h1 className="mt-3">{product.name}</h1>

          {product.rating && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted">
              <span aria-hidden="true" className="text-espresso">
                {"★".repeat(Math.round(product.rating.score))}
                {"☆".repeat(5 - Math.round(product.rating.score))}
              </span>
              <span>
                {product.rating.score} ({product.rating.count} reviews)
              </span>
            </div>
          )}

          <p className="mt-6 text-muted leading-relaxed">{product.description}</p>

          <p className="mt-6 text-2xl font-medium">{formatPrice(selectedSize.price)}</p>

          {product.colours.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-medium mb-3">
                Colour: <span className="font-normal text-muted">{selectedColour?.name}</span>
              </h2>
              <div className="flex gap-2 flex-wrap">
                {product.colours.map((c) => (
                  <ColourSwatch
                    key={c.id}
                    hex={c.hex}
                    name={c.name}
                    size="md"
                    selected={selectedColour?.id === c.id}
                    onClick={() => setSelectedColour(c)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-sm font-medium mb-3">Size</h2>
            <SizeSelect sizes={product.sizes} selected={selectedSize.label} onChange={(label) => {
              const size = product.sizes.find((s) => s.label === label);
              if (size) setSelectedSize(size);
            }} />
          </div>

          <Button variant="primary" className="w-full mt-8" onClick={handleAdd}>
            {added ? "Added to Bag" : "Add to Bag"}
          </Button>
          <p role="status" aria-live="polite" className="sr-only">
            {added ? `${product.name} added to bag` : ""}
          </p>

          <Link href="/products" className="inline-block mt-6 text-sm font-medium hover:underline">
            &larr; Back to all products
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
