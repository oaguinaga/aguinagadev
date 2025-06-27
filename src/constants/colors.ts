import { transformObject } from "@/utils";

const kebab = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export type ColorTuple = [number, number, number, number?];
type ColorMapRaw = Record<string, ColorTuple>;

export interface ColorMap {
  [key: `--${string}`]: string;
}

export const DARK_COLORS_RAW: ColorMapRaw = {
  colorText: [210, 10, 90],
  colorBackground: [210, 15, 6],
  colorBlurredBackground: [210, 15, 6, 0.75],
  colorMutedBackground: [210, 38, 15, 0.85],

  colorAction: [240, 95, 62],
  colorPrimary: [225, 100, 75],
  colorSecondary: [333, 100, 55],
  colorTertiary: [280, 100, 85],
  colorDecorative: [200, 50, 60],
};

// For certain slices of the tree, we’ll overwrite `--color-background`. For example, a warning sidenote will set it to `--color-warning-500`. If I need to know the PAGE background within those elements, I can use this value:
DARK_COLORS_RAW.colorPageBackground = DARK_COLORS_RAW.colorBackground;

export const LIGHT_COLORS_RAW: ColorMapRaw = {
  colorText: [222, 22, 5],
  // Was thinking of shifting to an off-white, but sadly I have so many images with a white background, which clashes with any non-white page bg.
  colorBackground: [0, 0, 100],
  colorBlurredBackground: [0, 0, 95, 0.75],
  colorMutedBackground: [200, 45, 76, 0.85],

  colorAction: [240, 95, 62],
  colorPrimary: [240, 95, 62],
  colorSecondary: [333, 100, 45],
  colorTertiary: [255, 85, 30],
  colorDecorative: [200, 75, 65],
};

LIGHT_COLORS_RAW.colorPageBackground = LIGHT_COLORS_RAW.colorBackground;

export const LIGHT_COLORS = createStyleObject(LIGHT_COLORS_RAW);
export const DARK_COLORS = createStyleObject(DARK_COLORS_RAW);
console.log("DARK_COLORS", DARK_COLORS);

// This method takes the raw H/S/L values and produces an object that can be passed to `style`:
// Input: { gray500: [210, 10, 90] }
// Output: { '--color-gray-500': 'hsl(210deg 10% 90%)' }
function createStyleObject(colors: ColorMapRaw): ColorMap {
  return transformObject(colors, (key, value) => {
    if (typeof value === "string") {
      // This allows us to "share" a value across keys.
      value = colors[value];
    }

    const [h, s, l, a = 1] = value as ColorTuple;

    const newKey = `--${kebab(key)}`;
    const newValue =
      a === 1 ? `hsl(${h}deg ${s}% ${l}%)` : `hsl(${h}deg ${s}% ${l}% / ${a})`;

    return [newKey, newValue];
  });
}

/*
  Sometimes I want to grab the raw HSL values and combine them with a custom opacity. This helper function makes it easier.

  Example usage:
  color: hsl(${vals(DARK_COLORS.colorText)} / 0.5);
*/
export function vals(colorValues: ColorTuple) {
  return `${colorValues[0]}deg ${colorValues[1]}% ${colorValues[2]}%`;
}
