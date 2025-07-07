"use client";

import React from "react";
import styled from "styled-components";

/**
 * ⚠️ importing the icons like this is ok for less than 50 icons. However
 * it might make sense to dynamically import the icons if we have more
 * than 50 icons in the future.
 * example:
 *
 * const iconMap = {
 *   search: () => import("lucide-react").then(m => m.Search),
 *    ... more icons
 * };
 * const [Component, setComponent] = useState(null);
 * useEffect(() => {
 *   iconMap[id]().then(setComponent);
 * }, [id]);
 * return Component ? <Component /> : null;
 *
 * this ensures that the icon is only imported when it is needed,
 * and not when the component is imported.
 */
import { icons } from "./icon-list";

export type IconId = keyof typeof icons;

function Icon({
  id,
  size = 24,
  strokeWidth = 2,
  style,
  ...delegated
}: {
  id: keyof typeof icons;
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper
      style={
        {
          "--size": `${size}px`,
          "--stroke-width": `${strokeWidth}px`,
          ...style,
        } as React.CSSProperties
      }
      {...delegated}
    >
      <Component color="currentColor" size={size} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: var(--size);
  height: var(--size);

  /*
    OMG I'm doing that thing I've warned against doing!
    Unfortunately, react-feather doesn't make it possible to pass
    discrete styles to the nested SVG within its components.

    Because I'm "reaching in" to third-party code, though, it feels
    OK. In my mind, this Icon is my bridge to that third-party code,
    and if I have to do some hacky stuff, that's fine. It's
    a special circumstance, and I won't ever have to look at the
    react-feather JSX and try to work out where this SVG style
    is coming from.
  */
  & > svg {
    display: block;
    stroke-width: var(--stroke-width);
  }
`;

export default Icon;
