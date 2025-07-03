import type {
  ColorMapRaw,
  ColorTuple,
} from "@/assets/tokens/output/mapped-colors";

import {
  DARK_COLORS_MAP as IMPORTED_DARK_COLORS_MAP,
  LIGHT_COLORS_MAP,
} from "@/assets/tokens/output/mapped-colors";
import { transformObject } from "@/utils";

const kebab = (str: string) => str.replace(/_/g, "-");

export type ColorMap = {
  [key: `--${string}`]: string;
};

// Create local copies that we can modify
const LIGHT_COLORS_RAW: ColorMapRaw = { ...LIGHT_COLORS_MAP };
const DARK_COLORS_MAP: ColorMapRaw = { ...IMPORTED_DARK_COLORS_MAP };

// For certain slices of the tree, we'll overwrite `--color-background`. For example, a warning sidenote will set it to `--color-warning-500`. If I need to know the PAGE background within those elements, I can use this value:
DARK_COLORS_MAP.color_page_background = DARK_COLORS_MAP.color_surface_page;
LIGHT_COLORS_RAW.color_page_background = LIGHT_COLORS_RAW.color_surface_page;

export const LIGHT_COLORS = createStyleObject(LIGHT_COLORS_RAW);
export const DARK_COLORS = createStyleObject(DARK_COLORS_MAP);

export const GROUPED_LIGHT_COLORS = groupColors(LIGHT_COLORS);
export const GROUPED_DARK_COLORS = groupColors(DARK_COLORS);

function groupColors(colors: ColorMap) {
  const specialKeys = ["action", "disabled", "body", "muted"];

  return Object.entries(colors).reduce((acc, [name, value]) => {
    // Extract parts from CSS variable name
    // Example: "--color-text-action" -> ["color", "text", "action"]
    const parts = name.replace(/^--/, "").split("-");

    if (parts.length >= 3 && parts[0] === "color") {
      const subgroup = parts[1]; // text, surface, icons, border, etc.
      const colorName = parts.slice(2).join("_"); // action, action_hover, etc.

      // Check if this is a special key (action or disabled related)
      const isSpecialKey = specialKeys.some(key => colorName.startsWith(key));

      if (isSpecialKey) {
        // Initialize subgroup if it doesn't exist
        if (!acc[subgroup]) {
          acc[subgroup] = {};
        }

        // Add the color to the subgroup with the full color name
        acc[subgroup][colorName] = value;
      }
      else {
        const predefinedKeys = [
          "info",
          "success",
          "warning",
          "error",
          "primary",
          "secondary",
        ];

        // Find the predefined key in the color name
        let group = "other";
        for (const predefinedKey of predefinedKeys) {
          if (colorName.includes(predefinedKey)) {
            group = predefinedKey;
            break;
          }
        }

        // If no predefined key found, use the subgroup as group
        if (group === "other") {
          group = subgroup;
        }

        // Create the final key by removing the group from color name
        const finalKey
          = colorName.replace(group, "").replace(/^_+|_+$/g, "") || subgroup;

        // Initialize group if it doesn't exist
        if (!acc[group]) {
          acc[group] = {};
        }

        // Add the color to the group
        acc[group][finalKey] = value;
      }
    }

    return acc;
  }, {} as Record<string, Record<string, string>>);
}

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
    const newValue
      = a === 1 ? `hsl(${h}deg ${s}% ${l}%)` : `hsl(${h}deg ${s}% ${l}% / ${a})`;

    return [newKey, newValue];
  });
}

/*
  Sometimes I want to grab the raw HSL values and combine them with a custom opacity. This helper function makes it easier.

  Example usage:
: hsl(${vals(DARK_COLORS.colorText)} / 0.5);
*/
export function vals(colorValues: ColorTuple) {
  return `${colorValues[0]}deg ${colorValues[1]}% ${colorValues[2]}%`;
}
