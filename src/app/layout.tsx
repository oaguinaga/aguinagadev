import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import "./styles.css";
import {
  BLOG_TITLE,
  BLOG_DESCRIPTION,
  LIGHT_TOKENS,
  DARK_TOKENS,
} from "@/constants";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

export const metadata = {
  title: {
    template: `%s | ${BLOG_TITLE}`,
    default: BLOG_TITLE,
  },
  description: BLOG_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = "dark";

  return (
    <html
      lang="en"
      style={
        (theme === "dark" ? DARK_TOKENS : LIGHT_TOKENS) as React.CSSProperties
      }
      className={clsx(mainFont.variable, monoFont.variable)}
      // data-color-theme={theme}
    >
      <body>
        {/* <Header initialTheme={theme} /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
