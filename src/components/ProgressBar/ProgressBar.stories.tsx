import { Meta, StoryObj } from "@storybook/nextjs";
import ProgressBar from "./ProgressBar";

const meta = {
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    size: "medium",
  },
};
