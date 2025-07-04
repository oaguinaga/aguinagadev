import type { IconId } from "@/components/icon/index";
import * as React from "react";
import styled from "styled-components";
import Icon from "@/components/icon/index";

type StyleConfig = {
  background: string;
  color: string;
  background_hover: string;
};

function Button({
  variant = "primary",
  iconLeft,
  iconRight,
  children,
  ...delegated
}: {
  variant?: "primary" | "transparent" | "outline";
  iconLeft?: IconId;
  iconRight?: IconId;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const STYLES: Record<"primary" | "transparent" | "outline", StyleConfig> = {
    primary: {
      background: "var(--color-surface-action)",
      color: "var(--color-text-on-action)",
      background_hover: "var(--color-surface-action-hover)",
    },
    transparent: {
      background: "var(--color-transparent)",
      color: "var(--color-text-on-action-secondary)",
      background_hover: "var(--color-surface-action-hover-light)",
    },
    outline: {
      background: "var(--color-transparent)",
      color: "var(--color-text-action)",
      background_hover: "var(--color-surface-action-hover-light)",
    },
  } as const;

  return (
    <Wrapper
      {...delegated}
      data-variant={variant}
      style={
        {
          "--background": STYLES[variant].background,
          "--color": STYLES[variant].color,
          "--background-hover": STYLES[variant].background_hover,
        } as React.CSSProperties
      }
    >
      {iconLeft && <Icon id={iconLeft} />}
      {children}
      {iconRight && <Icon id={iconRight} />}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  background: var(--background);
  color: var(--color);
  padding: 8px 20px;
  border-radius: 4px;
  border: 2px solid var(--background);
  cursor: pointer;
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family);
  display: flex;
  gap: 12px;
  letter-spacing: 0.04em;

  &:hover {
    background: var(--background-hover);
    border: 2px solid var(--background-hover);
  }

  &:disabled {
    background-color: var(--color-disabled);
    color: var(--color-text-on-disabled);
    cursor: not-allowed;

    &[data-variant="transparent"] {
      background: var(--color-transparent);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 1px;
  }

  /* this is for the outline variant */
  &[data-variant="outline"] {
    border: 2px solid var(--color-border-action);
  }

`;

export default Button;
