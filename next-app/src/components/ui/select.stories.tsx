import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Role",
    hint: "Select a migration role.",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <Select {...args} defaultValue="engineer">
        <option value="engineer">Frontend Engineer</option>
        <option value="lead">Tech Lead</option>
        <option value="manager">Engineering Manager</option>
      </Select>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="max-w-sm">
      <Select label="Environment" error="Please choose an environment." defaultValue="">
        <option value="" disabled>
          Select one
        </option>
        <option value="staging">Staging</option>
        <option value="production">Production</option>
      </Select>
    </div>
  ),
};
