"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BUBBLE_DISMISSED_KEY = "op_chat_welcome_dismissed";

const quickActions = [
  { label: "Book a Colour Cafe consultation", href: "/contact#enquiry" },
  { label: "Find a store", href: "/find-a-store" },
  { label: "Browse products", href: "/products" },
  { label: "Explore colour collections", href: "/collections" },
];

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinejoin="round" d="M4 12a8 8 0 1 1 3.2 6.4L4 19.5l1-3.4A7.96 7.96 0 0 1 4 12Z" />
    </svg>
  );
}

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [unread, setUnread] = useState(true);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(BUBBLE_DISMISSED_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const timer = setTimeout(() => setShowWelcome(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function dismissWelcome() {
    setShowWelcome(false);
    try {
      sessionStorage.setItem(BUBBLE_DISMISSED_KEY, "1");
    } catch {}
  }

  function openPanel() {
    setOpen(true);
    setUnread(false);
    dismissWelcome();
  }

  function closePanel() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-30 flex items-end gap-3">
      {showWelcome && !open && (
        <div className="hidden md:flex items-center rounded-xl bg-cream text-ink border border-ink/10 shadow-sm">
          <button
            type="button"
            onClick={openPanel}
            className="flex items-center gap-4 pl-5 pr-2 py-3 text-left rounded-l-xl hover:bg-paper transition-colors"
          >
            <span>
              <span className="block text-sm font-medium">Hi! I&apos;m your Olympic Paints Assistant</span>
              <span className="block text-xs text-muted mt-0.5">How can I help you today?</span>
            </span>
            <span aria-hidden="true" className="text-lg leading-none">›</span>
          </button>
          <button
            type="button"
            onClick={dismissWelcome}
            aria-label="Dismiss assistant message"
            className="self-stretch px-3 text-muted hover:text-ink rounded-r-xl transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
        </div>
      )}

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="Olympic Paints Assistant"
          className="absolute bottom-[4.5rem] right-0 w-[min(22rem,calc(100vw-2.5rem))] rounded-xl bg-cream text-ink border border-ink/10 shadow-[0_10px_30px_rgb(17_17_17/0.12)] overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-ink/10">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-olympic-yellow text-espresso flex items-center justify-center">
                <ChatIcon className="w-4 h-4" />
              </span>
              <span className="text-sm font-medium">Olympic Paints Assistant</span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={closePanel}
              aria-label="Close assistant"
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-paper transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 2l8 8M10 2l-8 8" />
              </svg>
            </button>
          </div>
          <div className="px-5 py-5">
            <p className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-paper px-4 py-3 text-sm leading-relaxed">
              Hi! How can I help you today? Choose a topic to get started.
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {quickActions.map((action) => (
                <li key={action.href}>
                  <Link
                    href={action.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-lg border border-ink/10 px-4 py-2.5 text-sm hover:border-ink/30 hover:bg-paper transition-colors"
                  >
                    {action.label}
                    <span aria-hidden="true">›</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              Live chat is coming soon. Need help now? Call{" "}
              <a href="tel:+27118571045" className="underline underline-offset-2 hover:text-ink">
                (011) 857 1045
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close Olympic Paints Assistant" : "Open Olympic Paints Assistant"}
        className="relative shrink-0 w-14 h-14 rounded-full bg-olympic-yellow text-espresso flex items-center justify-center hover:bg-yellow-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-espresso"
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        ) : (
          <ChatIcon className="w-6 h-6" />
        )}
        {unread && !open && (
          <span
            aria-hidden="true"
            className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-red-500 ring-2 ring-cream"
          />
        )}
      </button>
    </div>
  );
}
