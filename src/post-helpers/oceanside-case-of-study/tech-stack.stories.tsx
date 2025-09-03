import type { Meta, StoryObj } from "@storybook/nextjs";

import TechStack from "./index";

const meta = {
  component: TechStack,
} satisfies Meta<typeof TechStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
