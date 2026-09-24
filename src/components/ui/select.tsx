import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectOption = { value: string; label: string };

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label: string;
  options: SelectOption[];
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink/70">
          {label}
        </label>
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 bg-paper border border-ink/10 text-ink text-sm rounded-sm appearance-none",
            "focus:outline-none focus:ring-2 focus:ring-olympic-yellow/50 focus:border-olympic-yellow",
            error && "border-red-500",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
export { Select };
