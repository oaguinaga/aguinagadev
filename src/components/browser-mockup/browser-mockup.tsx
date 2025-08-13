"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./browser-mockup.module.css";

export type BrowserMockupProps = {
  src: string;
  type: "image" | "video";
  aspectRatio?: string; // e.g. "16:9", "4:3", "1 / 1", "auto"
  showControls?: boolean; // applies to video only
  showAddressBar?: boolean;
  addressText?: string;
  objectFit?: "cover" | "contain";
  className?: string;
  style?: CSSProperties;
  alt?: string; // for images
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
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    // Lazy-observe the component; when visible, load video
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0.01 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
    <div
      ref={containerRef}
      className={[styles.browser, className].filter(Boolean).join(" ")}
      style={computedStyle}
      role="group"
      aria-label={groupAriaLabel}
    >
      <div className={styles.chrome} aria-hidden="true">
        <div className={styles.dotRow}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        {showAddressBar
          ? (
              <div className={styles.addressBar} title={addressText || undefined}>
                <span className={styles.addressText} aria-hidden={false}>
                  {addressText || ""}
                </span>
              </div>
            )
          : null}
        {/* Right side spacer for symmetry */}
        <div className={styles.chromeSpacer} />
      </div>

      <div className={styles.viewport}>
        {type === "image"
          ? (
              <Image
                className={styles.media}
                src={src}
                alt={alt || ""}
                loading="lazy"
                fill
                sizes="100vw"
                style={{ objectFit }}
                priority={false}
              />
            )
          : (
        // Only render the video element once in view to lazy-load
              isInView && (
                <video
                  className={styles.media}
                  src={src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  controls={showControls}
                  preload="metadata"
                  aria-label={alt || "Video"}
                  tabIndex={showControls ? -1 : 0}
                  style={{ objectFit }}
                />
              )
            )}
      </div>
    </div>
  );
};

export default BrowserMockup;
