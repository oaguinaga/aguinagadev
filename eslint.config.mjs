// Run this command to generate base config and vs code settings:
// pnpm dlx @antfu/eslint-config@latest
import antfu from "@antfu/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";
import storybook from "eslint-plugin-storybook";

export default antfu(
  {
    react: true,
    typescript: true,

    lessOpinionated: true,
    isInEditor: false,

    stylistic: {
      semi: true,
      quotes: "double",
      indent: 2,
    },

    formatters: {
      css: true,
    },

    ignores: [
      "migrations/**/*",
      "next-env.d.ts",
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/out/**",
      "**/public/**",
      "**/artifacts/**",
      "**/cache/**",
      "**/typechain-types/**",
      "**/.git/**",
      "**/.vscode/**",
      "**/.idea/**",
      "**/.husky/**",
      "**/.vercel/**",
      "**/.turbo/**",
      "**/.output/**",
      "**/.cache/**",
      "**/.DS_Store",
    ],
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
    files: ["**/*.tsx"],
    rules: {
      "ts/no-use-before-define": "off",
    },
  },
  {
    rules: {
      "antfu/no-top-level-await": "off", // Allow top-level await
      "style/brace-style": ["error", "1tbs"], // Use the default brace style
      "ts/consistent-type-definitions": ["error", "type"], // Use `type` instead of `interface`
      "react/prefer-destructuring-assignment": "off", // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      "node/prefer-global/process": "off", // Allow using `process.env`
      "no-console": ["warn"],
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
