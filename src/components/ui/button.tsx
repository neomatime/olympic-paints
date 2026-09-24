import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  href?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-olympic-yellow text-espresso font-semibold hover:bg-yellow-deep transition-colors",
  secondary:
    "bg-espresso text-cream font-semibold hover:bg-walnut transition-colors",
  ghost:
    "bg-transparent text-ink border border-ink/20 hover:bg-ink/5 transition-colors",
  outline:
    "bg-transparent text-cream border border-cream/40 hover:bg-cream/10 transition-colors",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-wide uppercase rounded-sm cursor-pointer",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
