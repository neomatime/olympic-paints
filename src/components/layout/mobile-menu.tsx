"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLeft, navRight } from "@/data/navigation";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const pathname = usePathname();
  const { count } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Move focus into the menu when it opens, and keep Tab cycling within it
  // while it's open. Escape closes the menu and returns focus to the
  // toggle button that opened it.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const container = containerRef.current;
      if (!container) return;
      const focusable = container.querySelectorAll<HTMLElement>("a[href]");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, triggerRef]);

  const allLinks = [...navLeft, ...navRight];

  return (
    <div
      id="mobile-menu"
      ref={containerRef}
      inert={!open}
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
          ref={i === 0 ? firstLinkRef : undefined}
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
