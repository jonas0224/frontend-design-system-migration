import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Continue",
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Loading: Story = { args: { loading: true } };
export const Danger: Story = { args: { variant: "danger", children: "Delete" } };
