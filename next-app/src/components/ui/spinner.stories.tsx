import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Primitives/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    size: "md",
    label: "Loading",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    tone: {
      control: "select",
      options: ["brand", "on-solid"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const WithoutLabel: Story = {
  args: { label: undefined },
};

export const Large: Story = {
  args: { size: "lg", label: "Fetching results" },
};

/** Used inside primary/danger buttons so the ring contrasts the fill. */
export const OnSolidBackground: Story = {
  args: { tone: "on-solid", label: undefined, size: "md" },
  decorators: [
    (Story) => (
      <div className="inline-flex rounded-[var(--ref-radius-md)] bg-[var(--color-brand)] p-4">
        <Story />
      </div>
    ),
  ],
};
