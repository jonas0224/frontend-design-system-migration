import type { HTMLAttributes } from "react";
import { cx } from "./utils";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/** Pulse placeholder for loading layouts (text, cards, avatars). */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cx(
        "rounded-[var(--ref-radius-md)] bg-[color-mix(in_srgb,var(--color-border)_55%,transparent)] motion-safe:ds-animate-skeleton motion-reduce:opacity-80",
        className,
      )}
      {...props}
    />
  );
}
