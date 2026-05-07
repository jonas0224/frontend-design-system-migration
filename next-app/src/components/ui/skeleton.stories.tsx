import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Line: Story = {
  render: () => <Skeleton className="h-4 w-full max-w-md" />,
};

export const AvatarAndLines: Story = {
  render: () => (
    <div className="flex max-w-md gap-3">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-2 pt-1">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  ),
};
