import { transformObject } from "@/utils";
import { COLORS_ALIAS } from "./colors-alias";

const kebab = (str: string) => str.replace(/_/g, "-");

export type ColorTuple = [number, number, number, number?];
type ColorMapRaw = Record<string, ColorTuple>;

export interface ColorMap {
  [key: `--${string}`]: string;
}

export const DARK_COLORS_MAP: ColorMapRaw = {
  color_text_headings: COLORS_ALIAS.neutrals_50,
  color_text_body: COLORS_ALIAS.neutrals_100,
  color_text_disabled: COLORS_ALIAS.neutrals_300,
  color_text_action: COLORS_ALIAS.primary_400,
  color_text_action_hover: COLORS_ALIAS.primary_300,
  color_text_info: COLORS_ALIAS.info_default,
  color_text_success: COLORS_ALIAS.success_400,
  color_text_warning: COLORS_ALIAS.warning_400,
  color_text_error: COLORS_ALIAS.error_300,
  color_text_on_action: COLORS_ALIAS.neutrals_black,
  color_text_on_disabled: COLORS_ALIAS.neutrals_200,
  color_text_muted: COLORS_ALIAS.neutrals_default,
  color_surface_page: COLORS_ALIAS.neutrals_1100,
  color_surface_primary: COLORS_ALIAS.neutrals_900,
  color_surface_info: COLORS_ALIAS.info_1000,
  color_surface_success: COLORS_ALIAS.success_1050,
  color_surface_warning: COLORS_ALIAS.warning_1050,
  color_surface_error: COLORS_ALIAS.error_1050,
  color_surface_disabled: COLORS_ALIAS.neutrals_900,
  color_surface_action: COLORS_ALIAS.primary_default,
  color_surface_action_hover: COLORS_ALIAS.primary_400,
  color_surface_action_hover_light: COLORS_ALIAS.primary_1000,
  color_surface_success_hover: COLORS_ALIAS.success_1000,
  color_surface_warning_hover: COLORS_ALIAS.warning_1000,
  color_surface_error_hover: COLORS_ALIAS.error_1000,
  color_icon_primary: COLORS_ALIAS.primary_50,
  color_icon_disabled: COLORS_ALIAS.neutrals_default,
  color_icon_info: COLORS_ALIAS.info_default,
  color_icon_success: COLORS_ALIAS.success_600,
  color_icon_warning: COLORS_ALIAS.warning_600,
  color_icon_error: COLORS_ALIAS.error_700,
  color_icon_accent: COLORS_ALIAS.accent_default,
  color_icon_action: COLORS_ALIAS.primary_400,
  color_icon_on_action: COLORS_ALIAS.neutrals_black,
  color_icon_action_hover: COLORS_ALIAS.primary_default,
  color_border_secondary: COLORS_ALIAS.primary_300,
  color_border_primary: COLORS_ALIAS.neutrals_800,
  color_border_disabled: COLORS_ALIAS.neutrals_800,
  color_border_info: COLORS_ALIAS.info_600,
  color_border_success: COLORS_ALIAS.success_700,
  color_border_warning: COLORS_ALIAS.warning_700,
  color_border_error: COLORS_ALIAS.error_600,
  color_border_action: COLORS_ALIAS.primary_700,
  color_border_action_hover: COLORS_ALIAS.primary_default,
  color_border_action_focus: COLORS_ALIAS.primary_700,
  color_border_success_hover: COLORS_ALIAS.success_600,
  color_border_warning_hover: COLORS_ALIAS.warning_600,
  color_border_error_hover: COLORS_ALIAS.error_default,
  color_border_info_hover: COLORS_ALIAS.info_default,
};

// For certain slices of the tree, we'll overwrite `--color-background`. For example, a warning sidenote will set it to `--color-warning-500`. If I need to know the PAGE background within those elements, I can use this value:
DARK_COLORS_MAP.color_page_background = DARK_COLORS_MAP.color_surface_page;

export const LIGHT_COLORS_RAW: ColorMapRaw = {
  color_text_headings: COLORS_ALIAS.neutrals_1000,
  color_text_body: COLORS_ALIAS.neutrals_900,
  color_text_disabled: COLORS_ALIAS.neutrals_700,
  color_text_action: COLORS_ALIAS.primary_600,
  color_text_action_hover: COLORS_ALIAS.primary_800,
  color_text_info: COLORS_ALIAS.info_default,
  color_text_success: COLORS_ALIAS.success_800,
  color_text_warning: COLORS_ALIAS.warning_600,
  color_text_error: COLORS_ALIAS.error_800,
  color_text_on_action: COLORS_ALIAS.neutrals_white,
  color_text_on_disabled: COLORS_ALIAS.neutrals_800,
  color_text_muted: COLORS_ALIAS.neutrals_600,
  color_surface_page: COLORS_ALIAS.neutrals_white,
  color_surface_primary: COLORS_ALIAS.neutrals_white,
  color_surface_info: COLORS_ALIAS.info_100,
  color_surface_success: COLORS_ALIAS.success_50,
  color_surface_warning: COLORS_ALIAS.warning_50,
  color_surface_error: COLORS_ALIAS.error_50,
  color_surface_disabled: COLORS_ALIAS.neutrals_50,
  color_surface_action: COLORS_ALIAS.primary_default,
  color_surface_action_hover: COLORS_ALIAS.primary_600,
  color_surface_action_hover_light: COLORS_ALIAS.primary_50,
  color_surface_success_hover: COLORS_ALIAS.success_100,
  color_surface_warning_hover: COLORS_ALIAS.warning_100,
  color_surface_error_hover: COLORS_ALIAS.error_100,
  color_icon_primary: COLORS_ALIAS.primary_1000,
  color_icon_disabled: COLORS_ALIAS.neutrals_600,
  color_icon_info: COLORS_ALIAS.info_default,
  color_icon_success: COLORS_ALIAS.success_700,
  color_icon_warning: COLORS_ALIAS.warning_default,
  color_icon_error: COLORS_ALIAS.error_700,
  color_icon_accent: COLORS_ALIAS.error_default,
  color_icon_action: COLORS_ALIAS.primary_600,
  color_icon_on_action: COLORS_ALIAS.neutrals_white,
  color_icon_action_hover: COLORS_ALIAS.primary_800,
  color_border_secondary: COLORS_ALIAS.primary_700,
  color_border_primary: COLORS_ALIAS.neutrals_100,
  color_border_disabled: COLORS_ALIAS.neutrals_200,
  color_border_info: COLORS_ALIAS.info_400,
  color_border_success: COLORS_ALIAS.success_700,
  color_border_warning: COLORS_ALIAS.warning_600,
  color_border_error: COLORS_ALIAS.error_700,
  color_border_action: COLORS_ALIAS.primary_700,
  color_border_action_hover: COLORS_ALIAS.primary_default,
  color_border_action_focus: COLORS_ALIAS.primary_default,
  color_border_success_hover: COLORS_ALIAS.success_800,
  color_border_warning_hover: COLORS_ALIAS.warning_700,
  color_border_error_hover: COLORS_ALIAS.error_800,
  color_border_info_hover: COLORS_ALIAS.info_default,
};

LIGHT_COLORS_RAW.color_page_background = LIGHT_COLORS_RAW.color_surface_page;

export const LIGHT_COLORS = createStyleObject(LIGHT_COLORS_RAW);
export const DARK_COLORS = createStyleObject(DARK_COLORS_MAP);

export const GROUPED_LIGHT_COLORS = groupColors(LIGHT_COLORS);
export const GROUPED_DARK_COLORS = groupColors(DARK_COLORS);

function groupColors(colors: ColorMap) {
  const predefinedKeys = [
    "info",
    "success",
    "warning",
    "error",
    "action",
    "disabled",
    "primary",
    "secondary",
    "muted",
    "body",
  ];

  return Object.entries(colors).reduce((acc, [name, value]) => {
    // Extract group and key from CSS variable name
    // Example: "--color-text-success" -> group: "success", key: "text"
    const match = name.match(/--color-(\w+)-(.+)/);
    if (match) {
      const [, key, rest] = match;

      // Find the predefined key in the rest of the name
      let group = "other";
      for (const predefinedKey of predefinedKeys) {
        if (rest.includes(predefinedKey)) {
          group = predefinedKey;
          break;
        }
      }

      // If no predefined key found, use the first part as group
      if (group === "other") {
        group = key;
      }

      // Create the final key by combining key and remaining parts
      const finalKey = rest.replace(group, "").replace(/^-+|-+$/g, "") || key;

      // Initialize group if it doesn't exist
      if (!acc[group]) {
        acc[group] = {};
      }

      // Add the color to the group
      acc[group][finalKey] = value;
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
    const newValue =
      a === 1 ? `hsl(${h}deg ${s}% ${l}%)` : `hsl(${h}deg ${s}% ${l}% / ${a})`;

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
