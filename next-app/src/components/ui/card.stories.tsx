import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <div className="mb-1 flex items-center justify-between gap-3">
            <CardTitle>Migration Progress</CardTitle>
            <Badge variant="brand">In Progress</Badge>
          </div>
          <CardDescription>
            Base tokens and semantic aliases are in place for upcoming primitives.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Current focus: roll out consistent `Button`, `Input`, `Card`, and supporting patterns.
        </CardContent>
        <CardFooter>
          <Button size="sm">View checklist</Button>
          <Button size="sm" variant="secondary">
            Open docs
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
