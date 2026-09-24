"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, total } = useCart();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <div
      className={cn("fixed inset-0 z-[60] transition-opacity", open ? "pointer-events-auto" : "pointer-events-none opacity-0")}
      aria-hidden={!open}
    >
      <div
        className={cn("absolute inset-0 bg-ink/50 transition-opacity", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={cn(
          "absolute top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <h2 className="text-lg font-medium">Your Bag ({items.reduce((n, i) => n + i.qty, 0)})</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-muted hover:text-ink transition-colors"
            aria-label="Close bag"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-muted text-center py-16">Your bag is empty.</p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {items.map((item) => (
                <li key={`${item.productId}-${item.sizeLabel}`} className="flex gap-4 py-4">
                  <div className="relative w-20 h-20 shrink-0 rounded-sm overflow-hidden bg-paper">
                    <Image src={item.image} alt={item.productName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.productName}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {item.sizeLabel}
                      {item.colourName ? ` · ${item.colourName}` : ""}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <label className="sr-only" htmlFor={`qty-${item.productId}-${item.sizeLabel}`}>
                        Quantity for {item.productName}
                      </label>
                      <select
                        id={`qty-${item.productId}-${item.sizeLabel}`}
                        value={item.qty}
                        onChange={(e) => updateQty(item.productId, item.sizeLabel, Number(e.target.value))}
                        className="px-2 py-1 text-sm border border-ink/10 rounded-sm bg-paper"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.sizeLabel)}
                        className="text-xs text-muted hover:text-ink underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="flex items-center justify-between text-sm font-medium mb-4">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/cart" onClick={onClose}>
              <Button variant="secondary" className="w-full mb-3">
                View Bag
              </Button>
            </Link>
            <Link href="/checkout" onClick={onClose}>
              <Button variant="primary" className="w-full">
                Checkout
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
