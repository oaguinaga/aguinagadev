import type { ColorTheme } from "@/constants/constants";

import { DARK_COLORS, LIGHT_COLORS } from "@/constants/colors";

/**
 * Applies theme color variables to the document root element
 */
export function applyThemeToRoot(theme: ColorTheme) {
  const theme_colors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  const root_element = document.documentElement;

  // Set the theme attribute
  root_element.setAttribute("data-color-theme", theme);

  // Apply all color CSS variables
  Object.entries(theme_colors).forEach(([key, value]) => {
    root_element.style.setProperty(key, value);
  });
}
