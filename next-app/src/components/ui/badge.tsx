import type { HTMLAttributes } from "react";
import { cx } from "./utils";

type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClass: Record<BadgeVariant, string> = {
  neutral: "bg-[var(--color-surface)] text-[var(--color-text-secondary)]",
  brand: "bg-[color-mix(in_srgb,var(--color-brand)_20%,transparent)] text-[var(--color-brand-hover)]",
  success:
    "bg-[color-mix(in_srgb,var(--color-success)_16%,transparent)] text-[var(--color-success)]",
  warning:
    "bg-[color-mix(in_srgb,var(--color-warning)_16%,transparent)] text-[var(--color-warning)]",
  error: "bg-[color-mix(in_srgb,var(--color-error)_16%,transparent)] text-[var(--color-error)]",
};

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-[var(--ref-radius-pill)] px-2.5 py-1 text-xs font-medium transition-[color,background-color,transform] duration-[var(--ref-motion-duration-base)] ease-[var(--ref-motion-ease-standard)] motion-safe:hover:-translate-y-px",
        variantClass[variant],
        className,
      )}
      {...props}
    />
  );
}
