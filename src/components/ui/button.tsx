import { forwardRef, type ButtonHTMLAttributes, type ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonOwnProps = {
  variant?: ButtonVariant;
};

type ButtonAsButtonProps = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonOwnProps & ComponentProps<typeof Link>;

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

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

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = "primary", className, href, children, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-wide uppercase rounded-sm cursor-pointer",
    variantStyles[variant],
    className
  );

  if (href !== undefined) {
    const linkProps = rest as Omit<ButtonAsLinkProps, "variant" | "className" | "href" | "children">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButtonProps, "variant" | "className" | "href" | "children">;
  return (
    <button ref={ref} className={classes} {...buttonProps}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
