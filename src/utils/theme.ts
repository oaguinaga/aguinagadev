import { DARK_COLORS, LIGHT_COLORS } from "@/constants/colors";
import { ColorTheme } from "@/constants/constants";

/**
 * Applies theme color variables to the document root element
 */
export function applyThemeToRoot(theme: ColorTheme) {
  const colors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  const root = document.documentElement;

  // Set the theme attribute
  root.setAttribute("data-color-theme", theme);

  // Apply all color CSS variables
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
