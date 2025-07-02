import type { Meta, StoryObj } from '@storybook/nextjs';

import Icon from './Icon';

const meta = {
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "search",
    size: 0
  }
};