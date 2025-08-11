"use client";

import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styled_components_style_sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styled_components_style_sheet.getStyleElement();
    styled_components_style_sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager
      enableVendorPrefixes
      sheet={styled_components_style_sheet.instance}
    >
      {children}
    </StyleSheetManager>
  );
}
