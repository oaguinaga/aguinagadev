"use client";

import type { ColorMap } from "@/constants/colors";

import type { ColorTheme } from "@/constants/constants";
import React from "react";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/colors";

export type ThemeContextValue = {
  colorTheme: ColorTheme;
  toggleTheme: () => void;
  setColorTheme: (theme: ColorTheme) => void;
  colors: ColorMap;
};

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children, initialTheme }: { children: React.ReactNode; initialTheme?: ColorTheme }) {
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>(() => {
    if (initialTheme) {
      return initialTheme;
    }
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-color-theme");
      if (attr === "light" || attr === "dark") {
        return attr;
      }
    }
    if (typeof window !== "undefined") {
      return (window.localStorage.getItem("color-theme") as ColorTheme) || "light";
    }
    return "light";
  });

  React.useEffect(() => {
    window.localStorage.setItem("color-theme", colorTheme);
  }, [colorTheme]);

  const toggleTheme = React.useCallback(() => {
    setColorTheme((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
  }, []);

  const colors = colorTheme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return (
    <ThemeContext value={{
      colorTheme,
      toggleTheme,
      setColorTheme,
      colors,
    }}
    >
      {children}
    </ThemeContext>
  );
}

export default ThemeProvider;
