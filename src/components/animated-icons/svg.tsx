"use client";

import { styled } from "styled-components";

const Svg = styled.svg`
  stroke: currentColor;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  will-change: transform;
  backface-visibility: hidden;
  transition: opacity 200ms;
`;

export default Svg;
