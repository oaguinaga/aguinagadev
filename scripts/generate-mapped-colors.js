import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Checks if an object represents a color token with light and dark values
 */
function isColorToken(tokenObject) {
  return (
    tokenObject &&
    tokenObject.type === "color" &&
    tokenObject.values &&
    tokenObject.values.light &&
    tokenObject.values.dark
  );
}

/**
 * Converts a design token path to a snake_case variable name
 * Example: "text-action-hover" becomes "text_action_hover"
 */
function convertToSnakeCase(tokenPath) {
  return tokenPath.replace(/-/g, "_");
}

/**
 * Converts an alias reference to a TypeScript constant reference
 * Example: "alias:primary/default" becomes "COLORS_ALIAS.primary_default"
 */
function convertAliasToConstant(aliasValue) {
  if (!aliasValue.startsWith("alias:")) {
    console.warn(
      `⚠️  Unexpected alias format: "${aliasValue}" (expected "alias:...")`,
    );
    return `// INVALID: ${aliasValue}`;
  }

  const aliasPath = aliasValue.replace("alias:", "");
  const constantName = aliasPath.replace("/", "_");
  return `COLORS_ALIAS.${constantName}`;
}

/**
 * Recursively finds all color tokens in a nested object structure
 * Returns an array of color token information
 */
function findAllColorTokens(tokenStructure) {
  const colorTokens = [];

  function searchForColorTokens(currentObject, pathSoFar = []) {
    for (const [tokenName, tokenValue] of Object.entries(currentObject)) {
      if (isColorToken(tokenValue)) {
        // Found a color token - add it to our collection
        const snakeCaseTokenName = convertToSnakeCase(tokenName);
        const fullTokenPath = [...pathSoFar, snakeCaseTokenName];
        const colorVariableName = `color_${fullTokenPath.join("_")}`;

        colorTokens.push({
          variableName: colorVariableName,
          lightValue: tokenValue.values.light,
          darkValue: tokenValue.values.dark,
        });
      } else if (typeof tokenValue === "object" && tokenValue !== null) {
        // This is a nested group - search deeper
        const snakeCaseTokenName = convertToSnakeCase(tokenName);
        const newPath = [...pathSoFar, snakeCaseTokenName];
        searchForColorTokens(tokenValue, newPath);
      }
    }
  }

  searchForColorTokens(tokenStructure);
  return colorTokens;
}

/**
 * Takes color tokens and creates separate light and dark color maps
 */
function createColorMaps(colorTokens) {
  const lightColorMap = {};
  const darkColorMap = {};

  for (const token of colorTokens) {
    lightColorMap[token.variableName] = convertAliasToConstant(
      token.lightValue,
    );
    darkColorMap[token.variableName] = convertAliasToConstant(token.darkValue);
  }

  return {
    light: lightColorMap,
    dark: darkColorMap,
  };
}

/**
 * Generates the TypeScript file content with the color maps
 */
function generateTypeScriptContent(lightColorMap, darkColorMap) {
  const lightColorEntries = Object.entries(lightColorMap)
    .map(
      ([variableName, aliasReference]) =>
        `  ${variableName}: ${aliasReference},`,
    )
    .join("\n");

  const darkColorEntries = Object.entries(darkColorMap)
    .map(
      ([variableName, aliasReference]) =>
        `  ${variableName}: ${aliasReference},`,
    )
    .join("\n");

  return `import { COLORS_ALIAS } from "@/assets/tokens/constants/colors-alias";
export type ColorTuple = [number, number, number, number?];
export type ColorMapRaw = Record<string, ColorTuple>;

export const LIGHT_COLORS_MAP: ColorMapRaw = {
${lightColorEntries}
};

export const DARK_COLORS_MAP: ColorMapRaw = {
${darkColorEntries}
};
`;
}

/**
 * Main function that orchestrates the entire process
 */
function main() {
  // Define file paths
  const inputFilePath = path.join(
    __dirname,
    "..",
    "src",
    "assets",
    "tokens",
    "input",
    "mapped-colors.json",
  );

  const outputFilePath = path.join(
    __dirname,
    "..",
    "src",
    "assets",
    "tokens",
    "output",
    "mapped-colors.ts",
  );

  try {
    const jsonFileContent = fs.readFileSync(inputFilePath, "utf-8");
    const designTokenData = JSON.parse(jsonFileContent);

    const mappedCollection = designTokenData.collections.find(
      (collection) => collection.name === "mapped",
    );

    if (!mappedCollection) {
      throw new Error('Could not find "mapped" collection in the input file');
    }

    console.log("🎨 Extracting color tokens...");
    const allColorTokens = findAllColorTokens(mappedCollection.variables);

    console.log("🗺️  Creating color maps...");
    const { light: lightColorMap, dark: darkColorMap } =
      createColorMaps(allColorTokens);

    const typeScriptContent = generateTypeScriptContent(
      lightColorMap,
      darkColorMap,
    );

    const outputDirectory = path.dirname(outputFilePath);
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, typeScriptContent, "utf-8");

    console.log(`✅ Successfully generated ${outputFilePath}`);
    console.log(
      `📊 Generated ${allColorTokens.length} color mappings for both light and dark themes`,
    );
  } catch (error) {
    console.error("❌ Error generating mapped colors:", error);
    process.exit(1);
  }
}

main();
