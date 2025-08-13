import type { Meta, StoryObj } from "@storybook/nextjs";
import type { BrowserMockupProps } from "./browser-mockup";
import { BrowserMockup } from "./browser-mockup";

const meta: Meta<typeof BrowserMockup> = {
  component: BrowserMockup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    type: { control: { type: "inline-radio" }, options: ["image", "video"] },
    objectFit: { control: { type: "inline-radio" }, options: ["cover", "contain"] },
  },
};

export default meta;
type Story = StoryObj<typeof BrowserMockup>;

const Container = (args: BrowserMockupProps) => (
  <div style={{ width: "min(420px, 100%)", margin: "20px auto" }}>
    <BrowserMockup {...args} />
  </div>
);

export const Video: Story = {
  render: args => <Container {...args} />,
  args: {
    src: "/map-land/map-land.mp4",
    type: "video",
    aspectRatio: "16:9",
    showControls: true,
    showAddressBar: false,
    addressText: "",
    objectFit: "cover",
  },
};

export const VideoWithAddressBar: Story = {
  render: args => <Container {...args} />,
  args: {
    src: "/map-land/map-land.mp4",
    type: "video",
    aspectRatio: "16:9",
    showControls: true,
    showAddressBar: true,
    addressText: "https://example.app/maps",
    objectFit: "cover",
  },
};

export const Image: Story = {
  render: args => <Container {...args} />,
  args: {
    src: "/next.svg",
    type: "image",
    aspectRatio: "4:3",
    showAddressBar: false,
    objectFit: "contain",
    alt: "Next.js logo",
  },
};

export const ImageWithAddressBar: Story = {
  render: args => <Container {...args} />,
  args: {
    src: "/window.svg",
    type: "image",
    aspectRatio: "16:9",
    showAddressBar: true,
    addressText: "https://ui.example/app",
    objectFit: "contain",
    alt: "Window icon",
  },
};
