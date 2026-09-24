"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLeft, navRight } from "@/data/navigation";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

type MobileMenuProps = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const allLinks = [...navLeft, ...navRight];

  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {allLinks.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-2xl font-serif transition-all duration-500",
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="/cart"
        className="text-lg text-muted mt-4"
        onClick={onClose}
      >
        Cart {count > 0 && `(${count})`}
      </Link>
    </div>
  );
}
