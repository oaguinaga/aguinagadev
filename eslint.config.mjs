// Run this command to generate base config and vs code settings:
// pnpm dlx @antfu/eslint-config@latest
import antfu from "@antfu/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";
import storybook from "eslint-plugin-storybook"

export default antfu(
  {
    type: "app",
    typescript: true,
    react: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  ...storybook.configs["flat/recommended"],
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "ts/no-use-before-define": ["off"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
    },
  },
);
