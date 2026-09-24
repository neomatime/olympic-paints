import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink/70">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={cn(
            "w-full px-4 py-3 bg-paper border border-ink/10 text-ink text-sm rounded-sm resize-y",
            "focus:outline-none focus:ring-2 focus:ring-olympic-yellow/50 focus:border-olympic-yellow",
            "placeholder:text-muted",
            error && "border-red-500 focus:ring-red-500/50",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
