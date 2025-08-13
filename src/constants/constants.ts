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

export const SPRINGS = {
  default: {
    // This is literally the default for React Spring.
    // Kept here for reference, not because I should use it.
    tension: 170,
    friction: 26,
  },
  springy: {
    tension: 300,
    friction: 10,
  },
};

export const TIGHT_SPRING = {
  tension: 450,
  friction: 25,
};

export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 563,
  md: 768,
  lg: 1200,
  xl: 1570,
};

export const BREAKPOINTS = {
  xs: `(max-width: ${BREAKPOINT_SIZES.xs / 16}rem)`,
  sm: `(min-width: ${BREAKPOINT_SIZES.xs / 16}rem) and (max-width: ${
    BREAKPOINT_SIZES.sm / 16
  }rem)`,
  md: `(min-width: ${BREAKPOINT_SIZES.sm / 16}rem) and (max-width: ${
    BREAKPOINT_SIZES.md / 16
  }rem)`,
  lg: `(min-width: ${BREAKPOINT_SIZES.md / 16}rem) and (max-width: ${
    BREAKPOINT_SIZES.lg / 16
  }rem)`,
  xl: `(min-width: ${BREAKPOINT_SIZES.lg / 16}rem) and (max-width: ${
    BREAKPOINT_SIZES.xl / 16
  }rem)`,
  xsAndSmaller: `(max-width: ${BREAKPOINT_SIZES.xs / 16}rem)`,
  smAndSmaller: `(max-width: ${BREAKPOINT_SIZES.sm / 16}rem)`,
  mdAndSmaller: `(max-width: ${BREAKPOINT_SIZES.md / 16}rem)`,
  lgAndSmaller: `(max-width: ${BREAKPOINT_SIZES.lg / 16}rem)`,
  xlAndSmaller: `(max-width: ${BREAKPOINT_SIZES.xl / 16}rem)`,
  xsAndLarger: `(min-width: ${(BREAKPOINT_SIZES.xs + 0.25) / 16}rem)`,
  smAndLarger: `(min-width: ${(BREAKPOINT_SIZES.sm + 0.25) / 16}rem)`,
  mdAndLarger: `(min-width: ${(BREAKPOINT_SIZES.md + 0.25) / 16}rem)`,
  lgAndLarger: `(min-width: ${(BREAKPOINT_SIZES.lg + 0.25) / 16}rem)`,
  xlAndLarger: `(min-width: ${(BREAKPOINT_SIZES.xl + 0.25) / 16}rem)`,
  mobile: `(max-width: ${BREAKPOINT_SIZES.md / 16}rem)`,
  desktop: `(min-width: ${(BREAKPOINT_SIZES.md + 0.25) / 16}rem)`,
};
