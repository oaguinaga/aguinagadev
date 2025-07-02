import type { Meta, StoryObj } from "@storybook/nextjs";

import Select from "./Select";

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label",
    value: "value",
    onChange: () => {},
    children: [
      <option key="1" value="1">
        1
      </option>,
      <option key="2" value="2">
        2
      </option>,
      <option key="3" value="3">
        3
      </option>,
    ],
  },
};
