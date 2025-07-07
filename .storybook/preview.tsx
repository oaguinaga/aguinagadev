import type { Preview } from "@storybook/nextjs";
import React from "react";
import { DARK_COLORS, LIGHT_COLORS } from "../src/constants/colors";
import { applyThemeToRoot } from "../src/utils/theme";
import "./global.css";
import "../src/app/styles.css";

// Add a global toolbar control for theme switching
export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "moon",
      items: ["light", "dark"],
    },
  },
};

// Add a decorator to apply the theme on every story render
const withTheme = (Story, context) => {
  applyThemeToRoot(context.globals.theme);
  return <Story />;
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: {
          name: "Light",
          value: LIGHT_COLORS["--color-page-background"],
        },
        dark: { name: "Dark", value: DARK_COLORS["--color-page-background"] },
      },
      default: "light",
    },
  },
  decorators: [withTheme],
  tags: ["autodocs"],
};

export default preview;
