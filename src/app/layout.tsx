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

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});

const headingFont = Poppins({
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700"],
  variable: "--font-family-heading",
});

const monoFont = Space_Mono({
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
  const savedTheme = (await cookies()).get(COLOR_THEME_COOKIE_NAME);
  const theme = (savedTheme?.value || DEFAULT_COLOR_THEME) as ColorTheme;

  return (
    <html
      lang="en"
      style={
        (theme === "dark" ? DARK_COLORS : LIGHT_COLORS) as React.CSSProperties
      }
      className={clsx(
        mainFont.variable,
        headingFont.variable,
        monoFont.variable,
      )}
      data-color-theme={theme}
    >
      <head>
        <link rel="icon" href="https://fav.farm/🤙🏽" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
