import type { ColorTheme } from "@/constants/constants";
import clsx from "clsx";

import { Poppins, Space_Mono, Work_Sans } from "next/font/google";

import { cookies } from "next/headers";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/colors";
import { BLOG_DESCRIPTION, BLOG_TITLE, COLOR_THEME_COOKIE_NAME, DEFAULT_COLOR_THEME } from "@/constants/constants";
import StyledComponentsRegistry from "@/lib/registry";
import "./styles.css";

const MAIN_FONT = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});

const HEADING_FONT = Poppins({
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700"],
  variable: "--font-family-heading",
});

const MONO_FONT = Space_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "700"],
  variable: "--font-family-mono",
});

export const metadata = {
  title: {
    template: `%s | ${BLOG_TITLE}`,
    default: BLOG_TITLE,
  },
  description: BLOG_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const saved_theme = (await cookies()).get(COLOR_THEME_COOKIE_NAME);
  const color_theme = (saved_theme?.value || DEFAULT_COLOR_THEME) as ColorTheme;

  return (
    <html
      lang="en"
      style={
        (color_theme === "dark" ? DARK_COLORS : LIGHT_COLORS) as React.CSSProperties
      }
      className={clsx(
        MAIN_FONT.variable,
        HEADING_FONT.variable,
        MONO_FONT.variable,
      )}
      data-color-theme={color_theme}
    >
      <head>
        <link rel="icon" href="https://fav.farm/🤙🏽" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Header initialTheme={color_theme} />
          <main>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
