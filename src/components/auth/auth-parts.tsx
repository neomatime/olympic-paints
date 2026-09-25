"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <header>
      <p className="flex items-center gap-3 text-xs font-bold tracking-[0.16em] uppercase text-muted">
        <span className="w-6 h-px bg-olympic-yellow" aria-hidden="true" />
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl md:text-5xl leading-[1.05]">{title}</h1>
      {description && <p className="mt-4 text-muted leading-relaxed">{description}</p>}
    </header>
  );
}

/** Takes focus when shown, so screen-reader and keyboard users land on the new state. */
export function AuthConfirmation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="outline-none">
      {children}
    </div>
  );
}

export function Checkbox({
  name,
  label,
  error,
  required,
}: {
  name: string;
  label: ReactNode;
  error?: string;
  required?: boolean;
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-start gap-3 text-sm text-ink/80 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn("mt-0.5 w-4 h-4 shrink-0 accent-espresso cursor-pointer", error && "outline outline-1 outline-red-500")}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Simulates a network round trip so the submit button can show a pending state. */
export function useMockSubmit(delay = 700) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const submit = useCallback(() => {
    setStatus("submitting");
    timer.current = setTimeout(() => setStatus("done"), delay);
  }, [delay]);
  const reset = useCallback(() => setStatus("idle"), []);
  return { status, submit, reset };
}

export function focusFirstInvalid(form: HTMLFormElement, errors: Record<string, string | undefined>, order: string[]) {
  const first = order.find((name) => errors[name]);
  if (!first) return;
  const field = form.elements.namedItem(first);
  if (field instanceof HTMLElement) field.focus();
}

/** "Go to My Account" stand-in until accounts exist. */
export function MyAccountPreview() {
  const [shown, setShown] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setShown(true)}
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-wide uppercase rounded-sm cursor-pointer bg-transparent text-ink border border-ink/20 hover:bg-ink/5 transition-colors"
      >
        Go to My Account
      </button>
      <p aria-live="polite" className="text-xs text-muted min-h-4">
        {shown ? "My Account is coming soon. For now, keep exploring the shop." : ""}
      </p>
    </div>
  );
}
