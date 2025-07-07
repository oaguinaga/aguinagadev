import type { Meta, StoryObj } from "@storybook/nextjs";

import BlogHero from "./blog-hero";

const meta = {
  component: BlogHero,
} satisfies Meta<typeof BlogHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Demystifying JavaScript Closures",
    publishedOn: "2023-09-02T12:00:00-0400",
    updatedOn: "2023-09-02T12:00:00-0400",
    category: "JavaScript",
  },
};

export const NoCategory: Story = {
  args: {
    title: "Demystifying JavaScript Closures",
    publishedOn: "2023-09-02T12:00:00-0400",
    updatedOn: "2023-09-02T12:00:00-0400",
  },
};

export const NoUpdatedOn: Story = {
  args: {
    title: "Demystifying JavaScript Closures",
    publishedOn: "2023-09-02T12:00:00-0400",
  },
};
