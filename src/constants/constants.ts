export const BLOG_TITLE = "Omar Aguinaga";
export const DEFAULT_COLOR_THEME: ColorTheme = "dark";
export const BLOG_DESCRIPTION = "This is a blog about my experiences and thoughts ✨";

export type ColorTheme = "light" | "dark";
export const COLOR_THEME_COOKIE_NAME = "color-theme";

export const CATEGORIES = {
  JAVASCRIPT: "JavaScript",
  REACT: "React",
  PROJECTS: "Projects",
  CSS: "CSS",
  GENERAL: "General",
  SHOPIFY: "Shopify",
} as const;
export type CategoryKey = keyof typeof CATEGORIES;
export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];
