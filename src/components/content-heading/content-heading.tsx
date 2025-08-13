"use client";
import type { Status } from "@/components/animated-icons/number-icon/number-icon";
import * as React from "react";

import { styled } from "styled-components";
import NumberIcon from "@/components/animated-icons/number-icon/number-icon";
import VisuallyHidden from "@/components/visually-hidden";
import { BREAKPOINTS } from "@/constants/constants";

export type Props = {
  id: string;
  children: React.ReactNode;
};
export type BaseHeadingProps = Props & {
  level: "h2" | "h3" | "h4";
};
const HEADER_HEIGHT = 128;

function ContentHeading({
  id,
  children,
  level,
  ...delegated
}: BaseHeadingProps) {
  const [status, setStatus] = React.useState<Status>("idle");

  // Manual 'useBoop' logic, since I want to flip the status when the boop ends. If the user stops hovering over the button before the timeout fires, the timeout will be canceled by the cleanup fn.
  React.useEffect(() => {
    if (status !== "booped") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus("hovering");
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  });

  // When we render the MDX, we generate unique IDs for each heading. For example, 'Introducing Promises' will get converted to 'introducing-promises-1'. This is to prevent conflicts if two headings share the exact same text.
  // I *also* want to include an element with the raw ID, without the sequential number, for when I want to link to the heading from an external source (eg. the course platform) and know that the heading content is unique.
  const rawId = getRawId(id);

  const Wrapper = COMPONENT_MAP[level];

  let iconSize = 21;
  if (level === "h3") {
    iconSize = 18;
  } else if (level === "h4") {
    iconSize = 14;
  }

  return (
    <Wrapper
      {...delegated}
      id={rawId}
      data-element-type="ContentHeading"
    >
      <Anchor
        id={id}
        href={`#${id}`}
        onMouseEnter={() => setStatus("booped")}
        onMouseLeave={() => setStatus("idle")}
        onMouseDown={() => setStatus("pressed")}
        onMouseUp={() => setStatus("hovering")}
      >
        <NumberIcon
          isEnabled
          size={iconSize}
          status={status}
          accentColor="currentColor"
        />
        <VisuallyHidden>Link to this heading</VisuallyHidden>
      </Anchor>
      {children}
    </Wrapper>
  );
}

const getRawId = (id = "") => {
  const segments = id.split("-");

  return segments.slice(0, segments.length - 1).join("-");
};

// Weird structure here since I need to map individual components to HTML tags (<h2>, <h3>, etc).
export function SectionHeading(props: Props) {
  return <ContentHeading {...props} level="h2" />;
}

export function SectionSubHeading(props: Props) {
  return <ContentHeading {...props} level="h3" />;
}
export function SectionSubSubHeading(props: Props) {
  return <ContentHeading {...props} level="h4" />;
}

const H2 = styled.h2`
  --optical-align: 2px;
  position: relative;
  font-size: calc(32 / 16 * 1rem);
  color: var(--color-text-action-hover);
  margin-top: 1.5em;
  margin-bottom: 1em;
  scroll-margin-top: ${HEADER_HEIGHT + 2}rem;
`;
const H3 = styled.h3`
  --optical-align: 1px;
  position: relative;
  font-size: calc(24 / 16 * 1rem);
  color: var(--color-gray-900);
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  scroll-margin-top: ${HEADER_HEIGHT + 2}rem;

  /* Sometimes, our SectionHeadings collect several SectionSubHeadings, and there may not be any stuff between the two headings. In that case, they should scooch a bit closer together. */
  ${H2} + & {
    margin-top: -0.5rem;
  }
`;
const H4 = styled.h4`
  --optical-align: 0px;
  position: relative;
  font-size: calc(20 / 16 * 1rem);
  color: var(--color-gray-900);
  margin-top: 1em;
  margin-bottom: 0.5em;
  scroll-margin-top: ${HEADER_HEIGHT + 2}rem;

  /* Same deal with H3 and H4, as described above in H3*/
  ${H3} + & {
    margin-top: -0.325rem;
  }
`;

const COMPONENT_MAP = {
  h2: H2,
  h3: H3,
  h4: H4,
};

const Anchor = styled.a`
  --in-curve: cubic-bezier(0.17, 0.67, 0.47, 1);
  --out-curve: cubic-bezier(0.61, 0.55, 0.24, 0.97);
  display: none;

  @media (pointer: fine) and ${BREAKPOINTS.mdAndLarger} {
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    width: 2rem;
    height: 2rem;
    border-radius: 1000px;
    transform: translate(-85%, var(--optical-align));
    transition:
      opacity 400ms,
      transform 400ms var(--out-curve);
    /* Add a delay so that the icon doesn't fade while the user moves the mouse from heading to icon */
    transition-delay: 250ms;
    opacity: 0;
    scroll-margin-top: 128px;
    will-change: transform;
    color: var(--color-text-action);

    [data-element-type='ContentHeading']:hover &,
    &:focus-visible {
      opacity: 1;
      transform: translate(-100%, var(--optical-align));
      transition:
        opacity 250ms,
        transform 250ms var(--in-curve);
      transition-delay: 0ms;
    }

  }
`;

export default ContentHeading;
