import { transformObject } from "@/utils";
import { COLORS_ALIAS } from "./colors-alias";

const kebab = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export type ColorTuple = [number, number, number, number?];
type ColorMapRaw = Record<string, ColorTuple>;

export interface ColorMap {
  [key: `--${string}`]: string;
}

export const DARK_COLORS_MAP: ColorMapRaw = {
  colorTextHeadings: COLORS_ALIAS.neutrals_50,
  colorTextBody: COLORS_ALIAS.neutrals_100,
  colorTextDisabled: COLORS_ALIAS.neutrals_300,
  colorTextAction: COLORS_ALIAS.primary_400,
  colorTextActionHover: COLORS_ALIAS.primary_300,
  colorTextInformation: COLORS_ALIAS.info_default,
  colorTextSuccess: COLORS_ALIAS.success_400,
  colorTextWarning: COLORS_ALIAS.warning_400,
  colorTextError: COLORS_ALIAS.error_300,
  colorTextOnAction: COLORS_ALIAS.neutrals_black,
  colorTextOnDisabled: COLORS_ALIAS.neutrals_200,
  colorTextMuted: COLORS_ALIAS.neutrals_default,
  colorSurfacePage: COLORS_ALIAS.neutrals_1100,
  colorSurfacePrimary: COLORS_ALIAS.neutrals_900,
  colorSurfaceInformation: COLORS_ALIAS.info_1000,
  colorSurfaceSuccess: COLORS_ALIAS.success_1050,
  colorSurfaceWarning: COLORS_ALIAS.warning_1050,
  colorSurfaceError: COLORS_ALIAS.error_1050,
  colorSurfaceDisabled: COLORS_ALIAS.neutrals_900,
  colorSurfaceAction: COLORS_ALIAS.primary_default,
  colorSurfaceActionHover: COLORS_ALIAS.primary_400,
  colorSurfaceActionHoverLight: COLORS_ALIAS.primary_1000,
  colorSurfaceSuccessHover: COLORS_ALIAS.success_1000,
  colorSurfaceWarningHover: COLORS_ALIAS.warning_1000,
  colorSurfaceErrorHover: COLORS_ALIAS.error_1000,
  colorIconPrimary: COLORS_ALIAS.primary_50,
  colorIconDisabled: COLORS_ALIAS.neutrals_default,
  colorIconInformation: COLORS_ALIAS.info_default,
  colorIconSuccess: COLORS_ALIAS.success_600,
  colorIconWarning: COLORS_ALIAS.warning_600,
  colorIconError: COLORS_ALIAS.error_700,
  colorIconAccent: COLORS_ALIAS.accent_default,
  colorIconAction: COLORS_ALIAS.primary_400,
  colorIconOnAction: COLORS_ALIAS.neutrals_black,
  colorIconActionHover: COLORS_ALIAS.primary_default,
  colorBorderSecondary: COLORS_ALIAS.primary_300,
  colorBorderPrimary: COLORS_ALIAS.neutrals_800,
  colorBorderDisabled: COLORS_ALIAS.neutrals_800,
  colorBorderInformation: COLORS_ALIAS.info_600,
  colorBorderSuccess: COLORS_ALIAS.success_700,
  colorBorderWarning: COLORS_ALIAS.warning_700,
  colorBorderError: COLORS_ALIAS.error_600,
  colorBorderAction: COLORS_ALIAS.primary_700,
  colorBorderActionHover: COLORS_ALIAS.primary_default,
  colorBorderActionFocus: COLORS_ALIAS.primary_700,
  colorBorderSuccessHover: COLORS_ALIAS.success_600,
  colorBorderWarningHover: COLORS_ALIAS.warning_600,
  colorBorderErrorHover: COLORS_ALIAS.error_default,
  colorBorderInformationHover: COLORS_ALIAS.info_default,
};

// For certain slices of the tree, we’ll overwrite `--color-background`. For example, a warning sidenote will set it to `--color-warning-500`. If I need to know the PAGE background within those elements, I can use this value:
DARK_COLORS_MAP.colorPageBackground = DARK_COLORS_MAP.colorSurfacePage;

export const LIGHT_COLORS_RAW: ColorMapRaw = {
  colorTextHeadings: COLORS_ALIAS.neutrals_1000,
  colorTextBody: COLORS_ALIAS.neutrals_900,
  colorTextDisabled: COLORS_ALIAS.neutrals_700,
  colorTextAction: COLORS_ALIAS.primary_600,
  colorTextActionHover: COLORS_ALIAS.primary_800,
  colorTextInformation: COLORS_ALIAS.info_default,
  colorTextSuccess: COLORS_ALIAS.success_800,
  colorTextWarning: COLORS_ALIAS.warning_600,
  colorTextError: COLORS_ALIAS.error_800,
  colorTextOnAction: COLORS_ALIAS.neutrals_white,
  colorTextOnDisabled: COLORS_ALIAS.neutrals_800,
  colorTextMuted: COLORS_ALIAS.neutrals_600,
  colorSurfacePage: COLORS_ALIAS.neutrals_white,
  colorSurfacePrimary: COLORS_ALIAS.neutrals_white,
  colorSurfaceInformation: COLORS_ALIAS.info_100,
  colorSurfaceSuccess: COLORS_ALIAS.success_50,
  colorSurfaceWarning: COLORS_ALIAS.warning_50,
  colorSurfaceError: COLORS_ALIAS.error_50,
  colorSurfaceDisabled: COLORS_ALIAS.neutrals_50,
  colorSurfaceAction: COLORS_ALIAS.primary_default,
  colorSurfaceActionHover: COLORS_ALIAS.primary_600,
  colorSurfaceActionHoverLight: COLORS_ALIAS.primary_50,
  colorSurfaceSuccessHover: COLORS_ALIAS.success_100,
  colorSurfaceWarningHover: COLORS_ALIAS.warning_100,
  colorSurfaceErrorHover: COLORS_ALIAS.error_100,
  colorIconPrimary: COLORS_ALIAS.primary_1000,
  colorIconDisabled: COLORS_ALIAS.neutrals_600,
  colorIconInformation: COLORS_ALIAS.info_default,
  colorIconSuccess: COLORS_ALIAS.success_700,
  colorIconWarning: COLORS_ALIAS.warning_default,
  colorIconError: COLORS_ALIAS.error_700,
  colorIconAccent: COLORS_ALIAS.error_default,
  colorIconAction: COLORS_ALIAS.primary_600,
  colorIconOnAction: COLORS_ALIAS.neutrals_white,
  colorIconActionHover: COLORS_ALIAS.primary_800,
  colorBorderSecondary: COLORS_ALIAS.primary_700,
  colorBorderPrimary: COLORS_ALIAS.neutrals_100,
  colorBorderDisabled: COLORS_ALIAS.neutrals_200,
  colorBorderInformation: COLORS_ALIAS.info_400,
  colorBorderSuccess: COLORS_ALIAS.success_700,
  colorBorderWarning: COLORS_ALIAS.warning_600,
  colorBorderError: COLORS_ALIAS.error_700,
  colorBorderAction: COLORS_ALIAS.primary_700,
  colorBorderActionHover: COLORS_ALIAS.primary_default,
  colorBorderActionFocus: COLORS_ALIAS.primary_default,
  colorBorderSuccessHover: COLORS_ALIAS.success_800,
  colorBorderWarningHover: COLORS_ALIAS.warning_700,
  colorBorderErrorHover: COLORS_ALIAS.error_800,
  colorBorderInformationHover: COLORS_ALIAS.info_default,
};

LIGHT_COLORS_RAW.colorPageBackground = LIGHT_COLORS_RAW.colorSurfacePage;

export const LIGHT_COLORS = createStyleObject(LIGHT_COLORS_RAW);
export const DARK_COLORS = createStyleObject(DARK_COLORS_MAP);

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
