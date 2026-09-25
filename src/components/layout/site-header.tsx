"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/use-scroll";
import { useCart } from "@/context/cart-context";
import { MegaMenu } from "./mega-menu";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const { isScrolled } = useScroll();
  const { count } = useCart();
  const pathname = usePathname();
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  // Transparent over the home hero; solid dark teal once scrolled or on other pages.
  // While the menu is open the panel supplies the background.
  const solid = !menuOpen && (pathname !== "/" || isScrolled);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-cream transition-colors duration-300",
          solid ? "bg-night/92 backdrop-blur-md border-b border-cream/10" : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 lg:h-20 max-w-[1360px] items-center justify-between px-5 lg:px-10">
          <Link href="/" aria-label="Olympic Paints home" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Olympic Paints"
              width={52}
              height={52}
              className="h-11 w-11 lg:h-[52px] lg:w-[52px] rounded-full"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 lg:gap-4">
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full hover:text-olympic-yellow transition-colors"
              aria-label={count > 0 ? `Shopping bag, ${count} ${count === 1 ? "item" : "items"}` : "Shopping bag"}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-olympic-yellow text-[10px] font-bold text-espresso">
                  {count}
                </span>
              )}
            </Link>

            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="group flex items-center gap-3 rounded-full py-1 pl-3 pr-1 hover:text-olympic-yellow transition-colors"
            >
              <span className="text-sm tracking-wide">{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 group-hover:border-olympic-yellow transition-colors" aria-hidden="true">
                <span className={cn("absolute h-px w-4 bg-current transition-transform duration-300", menuOpen ? "rotate-45" : "-translate-y-[5px]")} />
                <span className={cn("absolute h-px w-4 bg-current transition-opacity duration-200", menuOpen && "opacity-0")} />
                <span className={cn("absolute h-px w-4 bg-current transition-transform duration-300", menuOpen ? "-rotate-45" : "translate-y-[5px]")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MegaMenu open={menuOpen} onClose={closeMenu} triggerRef={menuToggleRef} />
    </>
  );
}
