"use client";
import clsx from "clsx";
import Cookie from "js-cookie";
import * as React from "react";
import { Moon, Sun } from "react-feather";
import styled from "styled-components";

import type { ColorTheme } from "@/constants/constants";

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
  const [theme, setTheme] = React.useState(initialTheme);

  async function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    await Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, { expires: 1000 });

    applyThemeToRoot(nextTheme);
  }

  return (
    <Wrapper className={clsx(className)} {...delegated}>
      <Logo />
      <Actions>
        <Action onClick={handleClick}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </Action>
      </Actions>
    </Wrapper>
  );
}

const Wrapper = styled.header`
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
