import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./modal";

describe("Modal", () => {
  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Test modal" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("restores focus to previously focused element on close", () => {
    const onClose = vi.fn();
    const trigger = document.createElement("button");
    trigger.textContent = "Trigger";
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Modal open onClose={onClose} title="Focus modal" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    rerender(<Modal open={false} onClose={onClose} title="Focus modal" />);
    expect(trigger).toHaveFocus();

    trigger.remove();
  });
});
