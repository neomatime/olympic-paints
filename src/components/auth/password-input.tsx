"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  error?: string;
  hint?: string;
};

// Matches the styling of ui/input.tsx, with a show/hide toggle inside the field.
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink/70">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            className={cn(
              "w-full pl-4 pr-20 py-3 bg-paper border border-ink/10 text-ink text-sm rounded-sm",
              "focus:outline-none focus:ring-2 focus:ring-olympic-yellow/50 focus:border-olympic-yellow",
              "placeholder:text-muted",
              error && "border-red-500 focus:ring-red-500/50",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-controls={inputId}
            aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            className="absolute inset-y-0 right-0 px-4 text-xs font-medium uppercase tracking-wide text-ink/70 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olympic-yellow/50 rounded-sm"
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
        {hint && (
          <p id={hintId} className="text-xs text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
