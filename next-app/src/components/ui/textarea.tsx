import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cx } from "./utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, className, rows = 4, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = `${textareaId}-hint`;
  const errorId = `${textareaId}-error`;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          {label}
        </label>
      ) : null}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cx(
          "w-full rounded-[var(--ref-radius-md)] border bg-[var(--color-surface-elevated)] px-3 py-2 text-sm text-[var(--color-text-primary)] shadow-sm placeholder:text-[var(--color-text-secondary)] transition-[border-color,box-shadow,background-color] duration-[var(--ref-motion-duration-base)] ease-[var(--ref-motion-ease-standard)] focus-visible:border-[var(--color-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-brand)_22%,transparent)]",
          error ? "border-[var(--color-error)]" : "border-[var(--color-border)]",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      />
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
