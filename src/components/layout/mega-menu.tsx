"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems, type MenuItem, type MenuKey } from "@/data/navigation";
import { productCategories } from "@/data/categories";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { inspirations } from "@/data/inspiration";
import { storeLocations } from "@/data/store-locations";
import { colourCafeVisitSteps } from "@/data/colour-cafe";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const PHONE = "(011) 857 1045";
const PHONE_HREF = "tel:+27118571045";
const EMAIL = "info@olympicpaints.co.za";

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={cn("w-3.5 h-3.5 shrink-0", className)} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4.5 2.5L8 6l-3.5 3.5" />
    </svg>
  );
}

function ArrowLink({ href, children, onClick }: { href: string; children: ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-olympic-yellow decoration-2 underline-offset-[6px] hover:decoration-ink transition-colors"
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}

function PanelHeader({ title, description, link }: { title: string; description: string; link?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl leading-tight text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
      {link && <div className="shrink-0 pt-2">{link}</div>}
    </div>
  );
}

function Thumb({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <span className={cn("relative block overflow-hidden bg-ink/5", className)}>
      <Image src={src} alt={alt} fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
    </span>
  );
}

const productTiles = [
  {
    key: "colours",
    label: "Our Colours",
    description: "Explore the Olympic Paints colour collections.",
    href: "/collections",
    image: collections[0]?.coverImage,
  },
  ...productCategories.map((c) => ({
    key: c.id,
    label: c.label,
    description: c.description,
    href: `/products?category=${c.id}`,
    image: products.find((p) => p.category === c.id)?.images[0],
  })),
];

function PanelContent({ active, close }: { active: MenuKey; close: () => void }) {
  switch (active) {
    case "products":
      return (
        <>
          <PanelHeader
            title="Explore Our Products"
            description="From sample pots and PVA wall paints to enamels, primers, sealers and preparation tools — everything you need for your next project."
            link={<ArrowLink href="/products" onClick={close}>View All Products</ArrowLink>}
          />
          <ul className="mt-6 grid grid-cols-3 gap-x-4 border-t border-ink/10">
            {productTiles.map((tile) => (
              <li key={tile.key} className="border-b border-ink/10">
                <Link
                  href={tile.href}
                  onClick={close}
                  className="group flex items-center gap-4 rounded-md px-2 py-3.5 hover:bg-paper transition-colors"
                >
                  {tile.image && <Thumb src={tile.image} alt="" className="w-14 h-14 rounded-full shrink-0" />}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] text-ink group-hover:underline decoration-olympic-yellow decoration-2 underline-offset-4">{tile.label}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted line-clamp-2">{tile.description}</span>
                  </span>
                  <Chevron className="text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      );

    case "colour-cafe":
      return (
        <>
          <PanelHeader
            title="The Colour Cafe"
            description="An immersive design destination for coffee, consultation, colour and home transformation."
            link={<ArrowLink href="/colour-cafe" onClick={close}>Explore the Colour Cafe</ArrowLink>}
          />
          <div className="mt-6 grid grid-cols-[1fr_300px] gap-8">
            <ol className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink/10 pt-5">
              {colourCafeVisitSteps.map((step) => (
                <li key={step.num} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olympic-yellow text-[11px] font-bold text-espresso">{step.num}</span>
                  <span>
                    <span className="block text-[15px] text-ink">{step.title}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted">{step.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link href="/contact#enquiry" onClick={close} className="group relative block overflow-hidden rounded-lg">
              <Thumb src="/images/hero-front.webp" alt="" className="aspect-[4/3] w-full" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-night/80 px-4 py-3 text-sm text-cream">
                Book a Colour Cafe consultation
                <Chevron className="text-olympic-yellow transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </>
      );

    case "collections":
      return (
        <>
          <PanelHeader
            title="Colour Collections"
            description="Curated palettes for every mood and room, from the 2026 Colour of the Year to gallery whites and graphic accents."
            link={<ArrowLink href="/collections" onClick={close}>View All Collections</ArrowLink>}
          />
          <ul className="mt-6 grid grid-cols-5 gap-4">
            {collections.map((c) => (
              <li key={c.id}>
                <Link href={`/collections/${c.slug}`} onClick={close} className="group block">
                  <Thumb src={c.coverImage} alt="" className="aspect-[4/5] w-full rounded-lg" />
                  <span className="mt-3 flex items-center justify-between gap-2 text-[15px] text-ink group-hover:underline decoration-olympic-yellow decoration-2 underline-offset-4">
                    {c.name}
                    <Chevron className="text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      );

    case "inspiration":
      return (
        <>
          <PanelHeader
            title="Inspiration"
            description="Explore real spaces designed with Olympic Paints, with the colours and designers behind each one."
            link={<ArrowLink href="/inspiration" onClick={close}>View All Inspiration</ArrowLink>}
          />
          <ul className="mt-6 grid grid-cols-4 gap-4">
            {inspirations.slice(0, 4).map((room) => (
              <li key={room.id}>
                <Link href="/inspiration" onClick={close} className="group block">
                  <Thumb src={room.images.after} alt="" className="aspect-[4/3] w-full rounded-lg" />
                  <span className="mt-3 block text-sm text-ink group-hover:underline decoration-olympic-yellow decoration-2 underline-offset-4">{room.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      );

    case "our-story":
      return (
        <>
          <PanelHeader
            title="Our Story"
            description="More than four decades of paint heritage, now shaped into colour guidance, design confidence and immersive experiences."
            link={<ArrowLink href="/our-story" onClick={close}>Read Our Story</ArrowLink>}
          />
          <div className="mt-6 grid grid-cols-[1fr_360px] items-center gap-10 border-t border-ink/10 pt-6">
            <p className="font-serif text-3xl leading-snug text-ink">
              From trusted paint heritage to home transformation partner.
            </p>
            <Link href="/our-story" onClick={close} className="group block">
              <Thumb src="/images/our-people-poster.jpg" alt="" className="aspect-video w-full rounded-lg" />
            </Link>
          </div>
        </>
      );

    case "find-a-store":
      return (
        <>
          <PanelHeader
            title="Find a Store"
            description="Visit a Colour Cafe to meet Olympic Paints designers and explore colour in context."
            link={<ArrowLink href="/find-a-store" onClick={close}>Open Store Locator</ArrowLink>}
          />
          <ul className="mt-6 grid grid-cols-3 gap-4">
            {storeLocations.map((store) => (
              <li key={store.id}>
                <Link
                  href="/find-a-store"
                  onClick={close}
                  className="group flex h-full flex-col rounded-lg border border-ink/10 p-5 hover:border-olympic-yellow/60 hover:bg-paper transition-colors"
                >
                  <span className="text-[15px] text-ink group-hover:underline decoration-olympic-yellow decoration-2 underline-offset-4">{store.name}</span>
                  <span className="mt-2 text-xs leading-relaxed text-muted">
                    {store.address ? `${store.address}, ${store.city}` : `${store.city}, ${store.province}`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      );

    case "contact":
      return (
        <>
          <PanelHeader
            title="Contact"
            description="Reach the Olympic Paints team directly."
            link={<ArrowLink href="/contact#enquiry" onClick={close}>Send a Message</ArrowLink>}
          />
          <dl className="mt-6 grid grid-cols-3 gap-8 border-t border-ink/10 pt-6 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-ink/40">Call</dt>
              <dd className="mt-2"><a href={PHONE_HREF} className="text-ink hover:underline decoration-olympic-yellow decoration-2 underline-offset-4">{PHONE}</a></dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-ink/40">Email</dt>
              <dd className="mt-2"><a href={`mailto:${EMAIL}`} className="text-ink hover:underline decoration-olympic-yellow decoration-2 underline-offset-4">{EMAIL}</a></dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-ink/40">Head Office</dt>
              <dd className="mt-2 text-ink/75">28 Mecca Rd, Lenasia, 1827</dd>
            </div>
          </dl>
        </>
      );

    case "login":
      return (
        <>
          <PanelHeader title="Your Account" description="Sign in to access your Olympic Paints account." />
          <div className="mt-6 flex gap-4 border-t border-ink/10 pt-6">
            <Link href="/login" onClick={close} className="inline-flex items-center justify-center px-7 py-3.5 text-sm tracking-wide uppercase rounded-sm bg-olympic-yellow text-espresso font-semibold hover:bg-yellow-deep transition-colors">
              Sign In
            </Link>
            <Link href="/register" onClick={close} className="inline-flex items-center justify-center px-7 py-3.5 text-sm tracking-wide uppercase rounded-sm border border-ink/20 text-ink hover:bg-ink/5 transition-colors">
              Create Account
            </Link>
          </div>
        </>
      );

    case "vibraint":
      return (
        <>
          <PanelHeader
            title="VibrAInt"
            description="VibrAInt is Olympic Paints' AI-powered colour tool. Choose the kind of space you are working on, explore colours through a look-and-feel journey, then bring your direction into a Colour Cafe consultation."
          />
          <div className="mt-6 border-t border-ink/10 pt-6">
            <a
              href="https://vibraint.net/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-olympic-yellow decoration-2 underline-offset-[6px] hover:decoration-ink transition-colors"
            >
              Open VibrAInt<span className="sr-only"> (opens in a new tab)</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </>
      );
  }
}

const utilityLinks = [
  { href: "/collections", title: "Featured Collections", desc: "Curated palettes for every room", icon: "image" },
  { href: "/inspiration", title: "Inspiration", desc: "Ideas for every space", icon: "image" },
  { href: "/find-a-store", title: "Find a Store", desc: "Visit an Olympic Paints store", icon: "pin" },
  { href: "/contact", title: "Need Help?", desc: "Get in touch with our team", icon: "chat" },
] as const;

function UtilityIcon({ name }: { name: "image" | "pin" | "chat" }) {
  const common = { className: "w-6 h-6 shrink-0 text-ink/60", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, "aria-hidden": true } as const;
  if (name === "pin")
    return (
      <svg {...common}>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
        <circle cx="12" cy="10" r="2.3" />
      </svg>
    );
  if (name === "chat")
    return (
      <svg {...common}>
        <path strokeLinejoin="round" d="M4 12a8 8 0 1 1 3.2 6.4L4 19.5l1-3.4A7.96 7.96 0 0 1 4 12Z" />
        <path d="M9 12h.01M12 12h.01M15 12h.01" strokeLinecap="round" strokeWidth={2} />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="M3.5 16l5-5 4 4 3-3 5 5" />
      <circle cx="15.5" cy="9" r="1.3" />
    </svg>
  );
}

// Mobile accordion children: existing destinations only.
const mobileChildren: Partial<Record<MenuKey, { label: string; href: string }[]>> = {
  "colour-cafe": [
    { label: "Explore the Colour Cafe", href: "/colour-cafe" },
    { label: "Book a consultation", href: "/contact#enquiry" },
  ],
  products: [
    { label: "All Products", href: "/products" },
    ...productTiles.map((t) => ({ label: t.label, href: t.href })),
  ],
  collections: [
    { label: "All Collections", href: "/collections" },
    ...collections.map((c) => ({ label: c.name, href: `/collections/${c.slug}` })),
  ],
};

function MenuLink({ item, className, onClick, onActivate, selected, children }: {
  item: MenuItem;
  className: string;
  onClick: () => void;
  onActivate?: () => void;
  selected?: boolean;
  children: ReactNode;
}) {
  const shared = { className, onClick, onMouseEnter: onActivate, onFocus: onActivate, "data-selected": selected };
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" {...shared}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={item.href} {...shared}>
      {children}
    </Link>
  );
}

export function MegaMenu({ open, onClose, triggerRef }: MegaMenuProps) {
  const pathname = usePathname();
  const [active, setActive] = useState<MenuKey>("products");
  const [expanded, setExpanded] = useState<MenuKey | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    // Desktop and mobile layouts are both in the DOM; focus the first link of whichever is visible.
    const focusTimer = setTimeout(() => {
      const visible = [...(panel?.querySelectorAll<HTMLElement>("[data-menu-first]") ?? [])].find((el) => el.offsetParent !== null);
      (visible?.querySelector<HTMLElement>("[data-selected=true]") ?? visible?.querySelector<HTMLElement>("a, button"))?.focus();
    }, 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = [
        ...(triggerRef.current ? [triggerRef.current] : []),
        ...panel.querySelectorAll<HTMLElement>("a[href], button"),
      ].filter((el) => el.offsetParent !== null);
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

    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      setExpanded(null);
    };
  }, [open, onClose, triggerRef]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[35] bg-ink/20 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      <div
        id="site-menu"
        ref={panelRef}
        inert={!open}
        aria-hidden={!open}
        className="fixed inset-x-0 top-0 z-40 flex justify-center px-0 lg:px-6 pointer-events-none"
      >
        <nav
          aria-label="Main menu"
          className={cn(
            "pointer-events-auto w-full max-w-[1360px] max-h-dvh overflow-y-auto overscroll-contain",
            "bg-cream/[0.97] backdrop-blur-xl text-ink border-ink/10 lg:border lg:border-t-0 lg:rounded-b-2xl",
            "shadow-[0_24px_60px_rgb(17_17_17/0.14)]",
            "transition-[clip-path,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "[clip-path:inset(0_0_0%_0)] opacity-100" : "[clip-path:inset(0_0_100%_0)] opacity-0"
          )}
        >
          <div
            className={cn(
              "pt-16 lg:pt-20 transition-[opacity,transform] duration-300",
              open ? "opacity-100 translate-y-0 delay-150" : "opacity-0 -translate-y-2"
            )}
          >
            {/* Desktop mega menu */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-[240px_1fr] gap-10 border-t border-ink/10 px-10 pt-7 pb-8">
                <ul data-menu-first className="border-r border-ink/10 pr-6">
                  {menuItems.map((item) => {
                    const isActive = active === item.key;
                    return (
                      <li key={item.key}>
                        <MenuLink
                          item={item}
                          onClick={onClose}
                          onActivate={() => setActive(item.key)}
                          selected={isActive}
                          className={cn(
                            "group -ml-3 flex items-center justify-between rounded-md px-3 py-2.5 text-[17px] transition-colors",
                            isActive ? "bg-yellow-soft font-medium text-ink" : "text-ink hover:bg-paper"
                          )}
                        >
                          {item.label}
                          <Chevron className={cn("transition-transform group-hover:translate-x-1", isActive ? "text-yellow-deep" : "text-ink/35")} />
                        </MenuLink>
                      </li>
                    );
                  })}
                </ul>
                <div key={active} className="min-h-[372px] animate-[menu-fade_0.25s_ease-out]">
                  <PanelContent active={active} close={onClose} />
                </div>
              </div>

              <ul className="mx-10 grid grid-cols-4 border-t border-ink/10">
                {utilityLinks.map((u, i) => (
                  <li key={u.href} className={cn("py-5", i > 0 && "border-l border-ink/10 pl-6")}>
                    <Link href={u.href} onClick={onClose} className="group flex items-center gap-4">
                      <UtilityIcon name={u.icon} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-ink group-hover:underline decoration-olympic-yellow decoration-2 underline-offset-4">{u.title}</span>
                        <span className="block text-xs text-muted">{u.desc}</span>
                      </span>
                      <Chevron className="mr-4 text-ink/35 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile accordion */}
            <div className="lg:hidden border-t border-ink/10 px-6 pb-10">
              <ul data-menu-first>
                {menuItems.map((item) => {
                  const children = mobileChildren[item.key];
                  if (!children) {
                    return (
                      <li key={item.key} className="border-b border-ink/10">
                        <MenuLink item={item} onClick={onClose} className="flex items-center justify-between py-4 text-xl text-ink">
                          {item.label}
                          <Chevron className="text-ink/35" />
                        </MenuLink>
                      </li>
                    );
                  }
                  const isOpen = expanded === item.key;
                  const subId = `mobile-sub-${item.key}`;
                  return (
                    <li key={item.key} className="border-b border-ink/10">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={subId}
                        onClick={() => setExpanded(isOpen ? null : item.key)}
                        className={cn("flex w-full items-center justify-between py-4 text-left text-xl", isOpen ? "font-medium text-ink" : "text-ink")}
                      >
                        {item.label}
                        <Chevron className={cn("transition-transform", isOpen ? "rotate-90 text-yellow-deep" : "text-ink/35")} />
                      </button>
                      <ul id={subId} hidden={!isOpen} className="pb-4 pl-1">
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} onClick={onClose} className="block py-2.5 text-base text-ink/75 hover:underline decoration-olympic-yellow decoration-2 underline-offset-4">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-8 text-sm text-muted">
                Need help?{" "}
                <a href={PHONE_HREF} className="text-ink underline underline-offset-4">{PHONE}</a>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
