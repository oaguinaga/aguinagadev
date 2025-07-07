import type { Meta, StoryObj } from "@storybook/nextjs";

import BlogSummaryCard from "./blog-summary-card";

const meta = {
  component: BlogSummaryCard,
} satisfies Meta<typeof BlogSummaryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slug: "javascript-closures",
    title: "JavaScript Closures",
    subtitle: "A blog post about closures in JavaScript",
    abstract: "This is a blog post about closures in JavaScript",
    category: "JavaScript",
  },
};
