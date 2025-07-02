import type { Preview } from "@storybook/nextjs";
import React from "react";
import "./global.css";
import { DARK_COLORS, LIGHT_COLORS } from "../src/constants/colors";

// Apply CSS variables to the <html> element
const applyThemeVariables = (theme: "light" | "dark") => {
  const vars = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;
  const root = document.documentElement;

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

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
  applyThemeVariables(context.globals.theme);
  return <Story />;
};

const preview: Preview = {
  parameters: {
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
};

export default preview;
