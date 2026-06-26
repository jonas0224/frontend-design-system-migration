import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Modal } from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Primitives/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Keyboard support: Escape closes, Tab stays trapped inside the dialog, and focus returns to the trigger after close.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);

      return (
        <div>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Invite collaborator"
            description="Send an invite to review migration progress."
          >
            <div className="space-y-3">
              <Input label="Email" placeholder="name@company.com" />
              <Input label="Role" placeholder="Reviewer" />
              <Button>Send invite</Button>
            </div>
          </Modal>
        </div>
      );
    }

    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    const dialog = await within(document.body).findByRole("dialog");
    await expect(dialog).toHaveAccessibleName("Invite collaborator");
    await userEvent.keyboard("{Escape}");
    await expect(dialog).not.toBeInTheDocument();
  },
};

export const Open: Story = {
  args: {
    open: true,
    onClose: fn(),
    title: "Review migration",
    description: "Confirm the checklist before merge.",
  },
  play: async () => {
    const dialog = await within(document.body).findByRole("dialog");
    await expect(dialog).toHaveAccessibleName("Review migration");
    await expect(dialog).toHaveAccessibleDescription("Confirm the checklist before merge.");
  },
};
