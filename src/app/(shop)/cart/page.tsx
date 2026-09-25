"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQty, total, hydrated } = useCart();

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Your Bag" }]} />
      <PageHero eyebrow="Shopping Bag" title="Your bag." backgroundImage="/images/cart/hero.webp" compact />

      <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto">
        {!hydrated ? (
          <div className="py-16" aria-hidden="true" />
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative mx-auto mb-10 aspect-[16/9] max-w-2xl overflow-hidden rounded-sm bg-paper">
              <Image
                src="/images/cart/empty-bag.webp"
                alt="Coffee beans in a wooden tray beside fabric and colour swatches at the Colour Cafe"
                fill
                sizes="(min-width: 672px) 672px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="text-muted mb-8">Your bag is empty.</p>
            <Button href="/products" variant="primary">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {items.map((item) => (
                <li key={`${item.productId}-${item.sizeLabel}-${item.colourId}`} className="flex gap-6 py-6">
                  <div className="relative w-28 h-28 shrink-0 rounded-sm overflow-hidden bg-paper">
                    <Image src={item.image} alt={item.productName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/products`} className="font-medium hover:underline">
                          {item.productName}
                        </Link>
                        <p className="text-sm text-muted mt-1">
                          {item.sizeLabel}
                          {item.colourName ? ` · ${item.colourName}` : ""}
                        </p>
                      </div>
                      <p className="font-medium whitespace-nowrap">{formatPrice(item.price * item.qty)}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <label className="text-sm text-muted" htmlFor={`qty-${item.productId}-${item.sizeLabel}-${item.colourId}`}>
                        Qty
                      </label>
                      <select
                        id={`qty-${item.productId}-${item.sizeLabel}-${item.colourId}`}
                        value={item.qty}
                        onChange={(e) => updateQty(item.productId, item.sizeLabel, item.colourId, Number(e.target.value))}
                        className="px-3 py-1.5 text-sm border border-ink/10 rounded-sm bg-paper"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.sizeLabel, item.colourId)}
                        className="text-sm text-muted hover:text-ink underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-end mt-8 gap-6">
              <div className="text-right">
                <p className="text-sm text-muted">Subtotal</p>
                <p className="text-2xl font-medium">{formatPrice(total)}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button href="/products" className="w-full sm:order-1" variant="ghost">
                  Continue Shopping
                </Button>
                <Button href="/checkout" className="w-full sm:order-2" variant="primary">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
