import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("associates label and input by id", () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });

  it("renders error message and aria-invalid when error is provided", () => {
    render(<Input label="Email" error="Invalid email." />);
    const input = screen.getByLabelText("Email");
    const error = screen.getByText("Invalid email.");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(error).toBeInTheDocument();
  });
});
