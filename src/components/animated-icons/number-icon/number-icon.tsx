"use client";

import React from "react";
import { animated, useSprings } from "react-spring";
import { styled } from "styled-components";

import { SPRINGS } from "@/constants/constants";
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";

import Svg from "../svg";

const PRESSED_SPRING = {
  tension: SPRINGS.springy.tension * 2,
  friction: SPRINGS.springy.friction * 3,
};

export type Status = "idle" | "hovering" | "pressed" | "booped";

type Props = {
  size?: number;
  isEnabled?: boolean;
  accentColor: string;
  status?: Status;
  style?: React.CSSProperties;
} & React.SVGProps<SVGSVGElement>;

function NumberIcon({
  size = 16,
  isEnabled,
  accentColor,
  status = "idle",
  style = {},
  ...delegated
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const lineData = getLineData(status);

  // NOTE: This *appears* broken on localhost, thanks to Strict Mode. But it works in production.
  const [springs] = useSprings(
    lineData.length,
    index => ({
      to: lineData[index],
      config: status === "pressed" ? PRESSED_SPRING : SPRINGS.springy,
      immediate: prefersReducedMotion,
    }),
    [status],
  );

  let opacity;
  if (isEnabled || status !== "idle") {
    opacity = 1;
  } else {
    opacity = 0.7;
  }

  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      style={{
        width: size,
        height: size,
        opacity,
        ...style,
      }}
      {...delegated}
    >
      {springs.map((spring, i) => (
        <Line
          key={i}
          {...spring}
          stroke={isEnabled ? accentColor : "currentColor"}
        />
      ))}
    </Svg>
  );
}

function getLineData(status: Status) {
  switch (status) {
    case "idle":
    case "hovering": {
      return [
        { x1: 2, y1: 8, x2: 22, y2: 8 },
        { x1: 2, y1: 16, x2: 22, y2: 16 },
        { x1: 10, y1: 2, x2: 6, y2: 22 },
        { x1: 18, y1: 2, x2: 14, y2: 22 },
      ];
    }
    case "booped": {
      const boopBy = 1;
      return [
        { x1: 2, y1: 8 + boopBy, x2: 22, y2: 8 + boopBy },
        { x1: 2, y1: 16 - boopBy, x2: 22, y2: 16 - boopBy },
        { x1: 10 + boopBy, y1: 2, x2: 6 + boopBy, y2: 22 },
        { x1: 18 - boopBy, y1: 2, x2: 14 - boopBy, y2: 22 },
      ];
    }
    case "pressed": {
      return [
        { x1: 2, y1: 12, x2: 22, y2: 12 },
        { x1: 2, y1: 12, x2: 22, y2: 12 },
        { x1: 12, y1: 2, x2: 12, y2: 22 },
        { x1: 12, y1: 2, x2: 12, y2: 22 },
      ];
    }
  }
}

const Line = styled(animated.line)`
  transition: stroke 250ms;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export default NumberIcon;
