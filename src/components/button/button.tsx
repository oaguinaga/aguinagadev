"use client";

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
  variant?: "primary" | "transparent" | "outline" | "success" | "warning" | "error";
  iconLeft?: IconId;
  iconRight?: IconId;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const STYLES: Record<"primary" | "transparent" | "outline" | "success" | "warning" | "error", StyleConfig> = {
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
    success: {
      background: "var(--color-surface-success)",
      color: "var(--color-text-success)",
      background_hover: "var(--color-surface-success-hover)",
    },
    warning: {
      background: "var(--color-surface-warning)",
      color: "var(--color-text-warning)",
      background_hover: "var(--color-surface-warning-hover)",
    },
    error: {
      background: "var(--color-surface-error)",
      color: "var(--color-text-error)",
      background_hover: "var(--color-surface-error-hover)",
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

  /* this is for the outline variant */
  &[data-variant="outline"] {
    border-color: var(--color-border-action);

  }

  &[data-variant="success"] {
    border-color: var(--color-border-success);
  }

  &[data-variant="warning"] {
    border-color: var(--color-border-warning);
  }

  &[data-variant="error"] {
    border-color: var(--color-border-error);
  }

  &:hover {
    background: var(--background-hover);
    border-color: var(--background-hover);

    &[data-variant="success"] {
      border-color: var(--color-border-success);
    }

    &[data-variant="warning"] {
      border-color: var(--color-border-warning);
    }

    &[data-variant="error"] {
      border-color: var(--color-border-error);
    }

    &[data-variant="outline"] {
      border-color: var(--color-border-action);
    }
  }

  &:disabled {
    background-color: var(--color-disabled);
    border-color: var(--color-border-disabled);
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
`;

export default Button;
