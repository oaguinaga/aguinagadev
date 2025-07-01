import * as React from "react";
import VisuallyHidden from "../VisuallyHidden";
import styled from "styled-components";
import { COLORS } from "@/constants/colorss-css";

const STYLES = {
  sm: {
    height: 8,
    padding: 0,
    borderRadius: 4,
  },
  md: {
    height: 12,
    padding: 0,
    borderRadius: 4,
  },
  lg: {
    height: 16,
    padding: 4,
    borderRadius: 8,
  },
};

const ProgressBar = ({
  value,
  size,
}: {
  value: number;
  size: keyof typeof STYLES;
}) => {
  const style = STYLES[size as keyof typeof STYLES];
  if (!style) {
    throw new Error(`Unknown size: ${size}`);
  }

  return (
    <Wrapper
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={
        {
          "--padding": `${style.padding}px`,
          "--border-radius": `${style.borderRadius}px`,
        } as React.CSSProperties
      }
    >
      <VisuallyHidden>{value}%</VisuallyHidden>
      <BarWrapper>
        <Bar
          style={
            {
              "--width": `${value}%`,
              "--height": `${style.height}px`,
            } as React.CSSProperties
          }
        />
      </BarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.transparentGray15};
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  /* trim off corners when bar is closer to 100% */
  padding: var(--padding);
  border-radius: var(--border-radius);
`;

const BarWrapper = styled.div`
  overflow: hidden;
  border-radius: 4px;
`;

const Bar = styled.div`
  background-color: var(--color-surface-info);
  width: var(--width);
  height: var(--height);
  border-radius: 4px 0 0 4px;
`;
export default ProgressBar;
