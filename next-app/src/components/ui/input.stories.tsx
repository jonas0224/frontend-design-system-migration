import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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

export const Default: Story = {};
export const Error: Story = {
  args: {
    error: "Please enter a valid email address.",
    hint: undefined,
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
