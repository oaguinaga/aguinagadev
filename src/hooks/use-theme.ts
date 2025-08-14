import type { ColorTheme } from "@/constants/constants";
import React from "react";
import { ThemeContext } from "@/provider/theme-provider";

export default function useTheme(initialTheme?: ColorTheme) {
  const ctx = React.use(ThemeContext);
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>(() => {
    if (ctx) {
      return ctx.colorTheme;
    }
    if (initialTheme) {
      return initialTheme;
    }
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-color-theme");
      if (attr === "light" || attr === "dark") {
        return attr;
      }
    }
    return "light";
  });
  const isDarkMode = colorTheme === "dark";

  const toggleColorTheme = () => {
    const nextTheme = colorTheme === "light" ? "dark" : "light";
    setColorTheme(nextTheme);
  };

  return ctx
    ? {
        colorTheme: ctx.colorTheme,
        toggleColorTheme,
        isDarkMode: ctx.colorTheme === "dark",
        setColorTheme: ctx.setColorTheme,
      }
    : {
        colorTheme,
        toggleColorTheme,
        isDarkMode,
        setColorTheme,
      };
}
