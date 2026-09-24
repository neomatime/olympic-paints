"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/use-scroll";
import { useCart } from "@/context/cart-context";
import { navLeft, navRight } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (item.children) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <Link
          href={item.href}
          className={cn("nav-link", isActive && "font-semibold")}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
          <svg className="inline ml-1 w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </Link>
        {dropdownOpen && (
          <div className="absolute top-full left-0 pt-2 z-50">
            <div className="bg-cream border border-ink/10 rounded-sm shadow-lg py-2 min-w-[180px]">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2 text-sm text-ink/70 hover:text-ink hover:bg-paper transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn("nav-link", isActive && "font-semibold")}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const { isScrolled } = useScroll();
  const { count } = useCart();
  const pathname = usePathname();
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        {/* Mobile brand */}
        <Link href="/" className="md:hidden absolute left-4 top-1/2 -translate-y-1/2" aria-label="Olympic Paints home">
          <Image src="/images/logo.png" alt="Olympic Paints" width={40} height={40} />
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-8 px-8" aria-label="Primary navigation">
          <div className="flex items-center gap-8">
            {navLeft.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>

          <Link href="/" className="mx-8" aria-label="Olympic Paints home">
            <Image
              src="/images/logo.png"
              alt="Olympic Paints"
              width={56}
              height={56}
              className={cn(
                "rounded-full transition-all duration-500",
                isScrolled ? "w-10 h-10" : "w-14 h-14"
              )}
              priority
            />
          </Link>

          <div className="flex items-center gap-8">
            {navRight.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
            <Link href="/cart" className="relative" aria-label="Shopping cart">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-olympic-yellow text-espresso text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          ref={menuToggleRef}
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={cn("block w-5 h-0.5 bg-ink transition-transform", menuOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block w-5 h-0.5 bg-ink transition-opacity", menuOpen && "opacity-0")} />
          <span className={cn("block w-5 h-0.5 bg-ink transition-transform", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} triggerRef={menuToggleRef} />
    </>
  );
}
