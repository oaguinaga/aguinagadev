import type { Meta, StoryObj } from "@storybook/nextjs";

import { icons } from "../icon/icon-list";
import Button from "./index";

const meta = {
  component: Button,

  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    iconLeft: {
      control: {
        type: "select",
        options: Object.keys(icons),
      },
    },
    iconRight: {
      control: {
        type: "select",
        options: Object.keys(icons),
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["primary", "transparent", "outline"],
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};
