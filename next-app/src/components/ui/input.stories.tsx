import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Input } from "./input";
import { Textarea } from "./textarea";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email",
    placeholder: "name@company.com",
    hint: "Use your work email.",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");
    await expect(input).toHaveAccessibleDescription("Use your work email.");
  },
};
export const Error: Story = {
  args: {
    error: "Please enter a valid email address.",
    hint: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription("Please enter a valid email address.");
  },
};

export const TextareaExample: Story = {
  render: () => (
    <div className="max-w-lg">
      <Textarea
        label="Project Summary"
        placeholder="Describe the migration outcome..."
        hint="Keep it concise and outcome-oriented."
      />
    </div>
  ),
};
