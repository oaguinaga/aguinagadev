import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isColorValue(obj) {
  return (
    obj &&
    obj.type === "color" &&
    obj.values &&
    obj.values.light &&
    obj.values.dark
  );
}

function transformAliasToReference(aliasString, propertyPath) {
  // Only handle "alias:" strings
  if (aliasString.startsWith("alias:")) {
    const aliasPath = aliasString.replace("alias:", "");
    const aliasKey = aliasPath.replace("/", "_");
    return `COLORS_ALIAS.${aliasKey}`;
  }

  // Log any property that doesn't follow the expected "alias:" format
  console.warn(
    `⚠️  Property "${propertyPath}" has unexpected value: "${aliasString}" (expected format: "alias:...")`
  );
  return `// INVALID: ${aliasString}`;
}

function extractColorVariables(variables, parentKey = "") {
  const lightColors = {};
  const darkColors = {};

  function traverse(obj, currentPath) {
    for (const [key, value] of Object.entries(obj)) {
      // Convert key to snake_case (replace hyphens with underscores)
      const snakeKey = key.replace(/-/g, "_");
      const fullPath = currentPath ? `${currentPath}_${snakeKey}` : snakeKey;

      if (isColorValue(value)) {
        const colorKey = `color_${fullPath}`;
        const lightPropertyPath = `${fullPath}.light`;
        const darkPropertyPath = `${fullPath}.dark`;
        lightColors[colorKey] = transformAliasToReference(
          value.values.light,
          lightPropertyPath
        );
        darkColors[colorKey] = transformAliasToReference(
          value.values.dark,
          darkPropertyPath
        );
      } else if (typeof value === "object" && value !== null) {
        traverse(value, fullPath);
      }
    }
  }

  traverse(variables, parentKey);

  return { light: lightColors, dark: darkColors };
}

function generateTypeScriptFile(lightColors, darkColors) {
  const lightEntries = Object.entries(lightColors)
    .map(([key, value]) => `  ${key}: ${value},`)
    .join("\n");

  const darkEntries = Object.entries(darkColors)
    .map(([key, value]) => `  ${key}: ${value},`)
    .join("\n");

  return `import { COLORS_ALIAS } from "@/assets/tokens/constants/colors-alias";
  export type ColorTuple = [number, number, number, number?];
  export type ColorMapRaw = Record<string, ColorTuple>;

export const LIGHT_COLORS_MAP: ColorMapRaw = {
${lightEntries}
};

export const DARK_COLORS_MAP: ColorMapRaw = {
${darkEntries}
};
`;
}

function main() {
  // Path to the input JSON file
  const inputPath = path.join(
    __dirname,
    "..",
    "src",
    "assets",
    "tokens",
    "input",
    "mapped-colors.json"
  );

  // Path to the output TypeScript file (sibling to the input directory)
  const outputPath = path.join(
    __dirname,
    "..",
    "src",
    "assets",
    "tokens",
    "output",
    "mapped-colors.ts"
  );

  try {
    // Read and parse the JSON file
    const jsonContent = fs.readFileSync(inputPath, "utf-8");
    const data = JSON.parse(jsonContent);

    // Find the "mapped" collection
    const mappedCollection = data.collections.find((c) => c.name === "mapped");
    if (!mappedCollection) {
      throw new Error('Could not find "mapped" collection in the JSON file');
    }

    // Extract color variables
    const { light, dark } = extractColorVariables(mappedCollection.variables);

    // Generate TypeScript content
    const tsContent = generateTypeScriptFile(light, dark);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the TypeScript file
    fs.writeFileSync(outputPath, tsContent, "utf-8");

    console.log(`✅ Successfully generated ${outputPath}`);
    console.log(
      `📊 Generated ${
        Object.keys(light).length
      } color mappings for both light and dark themes`
    );
  } catch (error) {
    console.error("❌ Error generating mapped colors:", error);
    process.exit(1);
  }
}

// Run main function if this file is executed directly
main();
