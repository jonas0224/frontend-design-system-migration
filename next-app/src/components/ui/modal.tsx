import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { Button } from "./button";
import { cx } from "./utils";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  closeOnOverlayClick?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  closeOnOverlayClick = true,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = useMemo(() => `modal-title-${title.toLowerCase().replace(/\s+/g, "-")}`, [title]);
  const descriptionId = useMemo(() => `${titleId}-description`, [titleId]);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusables && focusables.length > 0) {
      focusables[0]?.focus();
    } else {
      panelRef.current?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const currentFocusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const first = currentFocusables[0];
      const last = currentFocusables[currentFocusables.length - 1];

      if (!first || !last) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className={cx(
          "absolute inset-0 bg-black/55 motion-safe:ds-animate-modal-backdrop motion-reduce:opacity-100",
        )}
        aria-label="Close modal"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cx(
          "relative z-10 w-full max-w-lg rounded-[var(--ref-radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-lg motion-safe:ds-animate-modal-panel motion-reduce:opacity-100",
        )}
      >
        <div className="mb-4">
          <h2 id={titleId} className="text-xl font-semibold text-[var(--color-text-primary)]">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {description}
            </p>
          ) : null}
        </div>

        <div className="text-[var(--color-text-primary)]">{children}</div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
