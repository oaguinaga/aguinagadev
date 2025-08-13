"use client";

import { ArrowRight, Star } from "lucide-react";
import React from "react";
import { animated, useSpring } from "react-spring";
import { styled } from "styled-components";

// import {
//   BaseWrapper as AsideWrapper,
//   WarningAside,
// } from "@/components/Aside";
import { BREAKPOINTS, TIGHT_SPRING } from "@/constants/constants";

import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";

type ListType = "unordered" | "ordered";
const ListContext = React.createContext<{ type: ListType }>({
  type: "unordered",
});

const DefaultIcon = () => <ArrowRight size="1.25rem" />;
const FullStarIcon = () => <Star size="1.25rem" />;

const ICONS = {
  default: DefaultIcon,
  fullStar: FullStarIcon,
};

type ListItemProps = {
  bullet?: keyof typeof ICONS;
  animated?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLLIElement>;

export const ListItem = ({
  bullet = "default",
  animated = false,
  children,
  ...delegated
}: ListItemProps) => {
  const { type } = React.use(ListContext);

  const prefersReducedMotion = usePrefersReducedMotion();

  const IconComponent = ICONS[bullet];
  const [isHovering, setIsHovering] = React.useState(false);

  const iconSpring = useSpring(
    animated && !prefersReducedMotion
      ? {
          "--x": isHovering ? `8px` : `0px`,
          "config": TIGHT_SPRING,
        }
      : { transform: "translateY(4px) translateX(0px)" },
  );

  if (type === "ordered") {
    return (
      <Wrapper {...delegated}>
        <ListItemContents>{children}</ListItemContents>
      </Wrapper>
    );
  }

  return (
    <Wrapper {...delegated}>
      <IconWrapper style={iconSpring}>
        <IconComponent />
      </IconWrapper>
      {/*
        This interaction is purely decorative, and is not required for
        folks using the keyboard or a screen-reader.
      */}
      <ListItemContents
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </ListItemContents>
    </Wrapper>
  );
};

type Props = {
  type?: ListType;
} & React.HTMLAttributes<HTMLUListElement>;

const List = ({ type = "unordered", ...delegated }: Props) => {
  return (
    <ListContext value={{ type }}>
      {type === "ordered" && <OrderedListElem {...delegated} />}
      {type === "unordered" && <UnorderedListElem {...delegated} />}
    </ListContext>
  );
};

const UnorderedListElem = styled.ul`
  font-size: inherit;
  margin-bottom: 2rem;
  list-style: none;
  padding: 0;

  /* For nested list items, add top margin as well */
  ul & {
    margin-top: 16px;
  }

  @media ${BREAKPOINTS.smAndSmaller} {
    margin-bottom: 1.5rem;
  }
`;

const OrderedListElem = styled.ol`
  --counter-name: counts;

  font-size: inherit;
  margin-bottom: 2rem;
  counter-reset: var(--counter-name);
  list-style: none;
  padding: 0;

  & li {
    counter-increment: var(--counter-name);
    align-items: baseline;
  }

  & li::before {
    content: counters(var(--counter-name), '.') '. ';
    display: inline-flex;
    justify-content: center;
    font-feature-settings: 'tnum';
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
    padding-right: 12px;
    width: 2.25rem;
  }


  @media ${BREAKPOINTS.smAndSmaller} {
    font-size: calc(18 / 16 * 1rem);
    margin-bottom: 1.5rem;
  }
`;

const Wrapper = styled.li`
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;

  &:last-of-type {
    margin-bottom: 0;
  }

`;

const ListItemContents = styled.div`
  flex: 1;
`;

const IconWrapper = styled(animated.span)`
  --optical-align: 0.1875em;
  display: flex;
  align-items: center;
  padding-right: 16px;
  padding-top: 0;
  color: var(--color-text-action);
  transform: translate(var(--x), var(--optical-align));
`;

List.ListItem = ListItem;

export default List;
