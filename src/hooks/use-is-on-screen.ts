import React from "react";

type Options = {
  // threshold is an option on IntersectionObserver. It allows us to specify that the element should only be on-screen when a certain percentage of it is visible.
  // For example, if we set `threshold: [0.5]`, the element will only be considered onscreen when 50%+ is within the viewport.
  // Defaults to [0], which listens for a single pixel of visibility.
  threshold: Array<number>;
  // By default, `isOnscreen` tracks whether the element is on screen in perpetuity. Sometimes, we only care about when it *first* enters the viewport. If we specify this argument, the IntersectionObserver is dissolved after that first entry.
  ignoreSubsequentEntries?: boolean;
  // Because hooks can’t be called conditionally, there may be cases where I only want to enable the IntersectionObserver *sometimes*. In that case, I can pass the `disabled` prop.
  disabled?: boolean;
};

export default function useIsOnScreen(
  elementRef: React.RefObject<HTMLElement | undefined>,
  defaultState: boolean = false,
  options: Options = {
    threshold: [0],
    ignoreSubsequentEntries: false,
    disabled: false,
  },
) {
  const [isOnscreen, setIsOnscreen] = React.useState(defaultState);

  // For the threshold, we don’t need to re-run the effect when it changes, so we’ll covertly access the value in the effect via a ref.
  const thresholdRef = React.useRef(options.threshold);
  thresholdRef.current = options.threshold;

  React.useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    if (options.disabled) {
      return;
    }

    if (isOnscreen && options.ignoreSubsequentEntries) {
      return;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        setIsOnscreen(entry.intersectionRatio > 0);
      },
      {
        threshold: thresholdRef.current,
      },
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [
    isOnscreen,
    elementRef,
    options.ignoreSubsequentEntries,
    options.disabled,
  ]);

  return isOnscreen;
}
