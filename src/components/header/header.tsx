"use client";
import type { ColorTheme } from "@/constants/constants";
import clsx from "clsx";
import Cookie from "js-cookie";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Moon, Sun } from "react-feather";

import styled from "styled-components";
import Logo from "@/components/logo";
import { COLOR_THEME_COOKIE_NAME } from "@/constants/constants";

import { applyThemeToRoot } from "@/utils/theme";
import VisuallyHidden from "../visually-hidden";

function Header({
  initialTheme,
  className,
  ...delegated
}: {
  initialTheme: ColorTheme;
  className?: string;
  delegated?: React.HTMLAttributes<HTMLDivElement>;
}) {
  const [color_theme, set_color_theme] = React.useState(initialTheme);

  async function handleClick() {
    const next_theme = color_theme === "light" ? "dark" : "light";

    set_color_theme(next_theme);

    await Cookie.set(COLOR_THEME_COOKIE_NAME, next_theme, { expires: 1000 });

    applyThemeToRoot(next_theme);
  }

  return (
    <Wrapper
      className={clsx(className)}
      {...delegated}
      style={{
        background: usePathname() === "/" ? "var(--color-sky-from)" : "var(--color-sky-subtle)",
      }}
    >
      <Content>

        <Logo />
        <Actions>
          <Action onClick={handleClick}>
            {color_theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
            <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
          </Action>
        </Actions>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.header`
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  width: 100%;
  max-width: var(--content-width);
  padding: 0 var(--viewport-padding);
  margin-left: auto;
  margin-right: auto;
`;

const Action = styled.button`
  display: block;
  border: none;
  background: transparent;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  color: var(--color-text);
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: var(--color-decorative-100);
  }

  & svg {
    display: block;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export default Header;
