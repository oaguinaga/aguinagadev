"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import useIsOnscreen from "@/hooks/use-is-on-screen";

export type BrowserMockupProps = {
  src: string;
  type: "image" | "video";
  aspectRatio?: "16:9" | "4:3" | "1 / 1" | "auto"; // e.g. "16:9", "4:3", "1 / 1", "auto"
  showControls?: boolean; // applies to video only
  showAddressBar?: boolean;
  addressText?: string;
  objectFit?: "cover" | "contain";
  className?: string;
  style?: CSSProperties;
  alt?: string; // for images
};

/**
 * Minimal, mobile-first browser mockup that displays image or video media.
 */
export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  src,
  type,
  aspectRatio,
  showControls = true,
  showAddressBar = false,
  addressText,
  objectFit = "cover",
  className,
  style,
  alt,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useIsOnscreen(
    // Narrow to the hook's expected type
    containerRef as unknown as React.RefObject<HTMLElement | undefined>,
    false,
    {
      threshold: [0],
      ignoreSubsequentEntries: true,
      disabled: false,
    },
  );

  const computedStyle: CSSProperties = useMemo(() => {
    const aspect = toAspectRatioValue(aspectRatio);
    const cssVars: CSSProperties = aspect
      ? ({ ["--browser-aspect-ratio" as any]: aspect } as CSSProperties)
      : {};
    return { ...cssVars, ...style };
  }, [aspectRatio, style]);

  const groupAriaLabel = showAddressBar && addressText
    ? `Browser mockup showing ${addressText}`
    : "Browser mockup";

  return (
    <Browser
      ref={containerRef}
      className={className}
      style={computedStyle}
      role="group"
      aria-label={groupAriaLabel}
    >
      <Chrome aria-hidden="true">
        <DotRow>
          <Dot />
          <Dot />
          <Dot />
        </DotRow>
        {showAddressBar
          ? (
              <AddressBar title={addressText || undefined}>
                <AddressText aria-hidden={false}>
                  {addressText || ""}
                </AddressText>
              </AddressBar>
            )
          : null}
        <ChromeSpacer />
      </Chrome>

      <Viewport>
        {type === "image"
          ? (
              <Image
                src={src}
                alt={alt || ""}
                loading="lazy"
                fill
                sizes="100vw"
                priority={false}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit }}
              />
            )
          : (
              isInView && (
                <video
                  src={src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  controls={showControls}
                  preload="metadata"
                  aria-label={alt || "Video"}
                  tabIndex={showControls ? -1 : 0}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit }}
                />
              )
            )}
      </Viewport>
    </Browser>
  );
};

function toAspectRatioValue(aspectRatio?: string): string | undefined {
  if (!aspectRatio || aspectRatio === "auto") {
    return undefined;
  }

  // Accept already valid CSS like "1 / 1"
  if (aspectRatio.includes("/")) {
    return aspectRatio;
  }

  // Convert colon notation like "16:9" ⇒ "16 / 9"
  const parts = aspectRatio.split(":");
  if (parts.length === 2) {
    const width = Number.parseFloat(parts[0]);
    const height = Number.parseFloat(parts[1]);
    if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
      return `${width} / ${height}`;
    }
  }
  return undefined;
}

const Browser = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: var(--browser-border-radius, 14px);
  border: 1px solid var(--browser-border-color, var(--color-border-primary));
  background: var(
    --browser-viewport-bg,
    var(--color-surface-page)
  );
  box-shadow: var(
    --browser-shadow,
    0 4px 20px rgba(0, 0, 0, 0.08)
  );
  overflow: hidden;
  aspect-ratio: var(--browser-aspect-ratio, 16 / 9);
`;

const Chrome = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  height: var(--browser-chrome-height, 40px);
  background: var(
    --browser-chrome-bg,
    var(--color-surface-page)
  );
  padding: 0 10px;
  border-bottom: 1px solid var(--browser-border-color, var(--color-border-primary));
`;

const Dot = styled.span`
  width: var(--browser-dot-size, 10px);
  height: var(--browser-dot-size, 10px);
  border-radius: 999px;
  background: var(--color-border-disabled);
`;

const DotRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--browser-dot-gap, 6px);

  & > ${Dot}:nth-child(1) {
    background: var(--color-icons-error);
  }
  & > ${Dot}:nth-child(2) {
    background: var(--color-icons-warning);
  }
  & > ${Dot}:nth-child(3) {
    background: var(--color-icons-success);
  }
`;

const AddressBar = styled.div`
  justify-self: center;
  min-width: 40%;
  max-width: 80%;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-radius: 999px;
  background: var(
    --browser-address-bg,
    var(--color-surface-page)
  );
  border: 1px solid var(--browser-border-color, var(--color-border-primary));
  overflow: hidden;
`;

const AddressText = styled.span`
  font-size: 12px;
  color: var(--browser-address-text, var(--color-text-muted));
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 13px;
  }
`;

const ChromeSpacer = styled.div`
  width: 16px;
  height: 1px;
`;

const Viewport = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  background: var(
    --browser-viewport-bg,
    var(--color-surface-page)
  );
`;

export default BrowserMockup;
