import type { HTMLAttributes } from "react";
import { cx } from "./utils";

export type ProgressSize = "sm" | "md";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Current value; ignored when `indeterminate` is true. */
  value: number;
  max?: number;
  /** Marquee-style activity bar (no fixed completion). */
  indeterminate?: boolean;
  size?: ProgressSize;
  /** Track fill color token intent */
  tone?: "brand" | "success";
  /** Accessible name for the progressbar (required for axe / screen readers). */
  label?: string;
}

const sizeClass: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
};

const toneClass = {
  brand: "bg-[var(--color-brand)]",
  success: "bg-[var(--color-success)]",
} as const;

export function Progress({
  value,
  max = 100,
  indeterminate = false,
  size = "md",
  tone = "brand",
  label,
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.min(max, Math.max(0, value));
  const percent = max <= 0 ? 0 : Math.round((clamped / max) * 100);
  const accessibleName = label ?? (indeterminate ? "Loading" : "Progress");

  return (
    <div className={cx("w-full min-w-[120px]", className)} {...props}>
      <div
        role="progressbar"
        aria-label={accessibleName}
        {...(indeterminate
          ? { "aria-valuetext": "Loading" }
          : {
              "aria-valuemin": 0,
              "aria-valuemax": max,
              "aria-valuenow": clamped,
            })}
        className={cx(
          "w-full overflow-hidden rounded-[var(--ref-radius-pill)] bg-[var(--color-border)]/50 motion-reduce:transition-none",
          sizeClass[size],
        )}
      >
        {indeterminate ? (
          <div
            className={cx(
              "h-full w-1/3 rounded-[var(--ref-radius-pill)] motion-safe:animate-[progress-indeterminate_1.2s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:opacity-90",
              toneClass[tone],
            )}
          />
        ) : (
          <div
            className={cx(
              "h-full rounded-[var(--ref-radius-pill)] motion-safe:transition-[width] motion-safe:duration-[var(--ref-motion-duration-base)] motion-safe:ease-[var(--ref-motion-ease-standard)] motion-reduce:transition-none",
              toneClass[tone],
            )}
            style={{ width: `${percent}%` }}
          />
        )}
      </div>
    </div>
  );
}
