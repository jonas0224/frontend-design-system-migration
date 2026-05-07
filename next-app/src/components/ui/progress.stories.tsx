import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Primitives/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: {
    value: 45,
    max: 100,
    indeterminate: false,
    size: "md",
    tone: "brand",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    tone: {
      control: "select",
      options: ["brand", "success"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Determinate: Story = {};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Complete: Story = {
  args: { value: 100 },
};
