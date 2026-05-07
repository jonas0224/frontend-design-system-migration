import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { cx } from "./utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, id, className, children, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-text-primary)]">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cx(
            "h-10 w-full appearance-none rounded-[var(--ref-radius-md)] border bg-[var(--color-surface-elevated)] px-3 pr-9 text-sm text-[var(--color-text-primary)] shadow-sm transition-[border-color,box-shadow,background-color] duration-[var(--ref-motion-duration-base)] ease-[var(--ref-motion-ease-standard)] focus-visible:border-[var(--color-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-brand)_22%,transparent)]",
            error ? "border-[var(--color-error)]" : "border-[var(--color-border)]",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          {...props}
        >
          {children}
        </select>
        <span
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[var(--color-text-secondary)]"
          aria-hidden
        >
          ▾
        </span>
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-[var(--color-error)]">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-[var(--color-text-secondary)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
