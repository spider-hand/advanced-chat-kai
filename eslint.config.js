// @see: https://eslint.vuejs.org/user-guide/#example-configuration-with-typescript-eslint-and-prettier
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import typescriptEslint from "typescript-eslint";
import eslintPluginLit from "eslint-plugin-lit";
import importPlugin from "eslint-plugin-import";

export default typescriptEslint.config(
  {
    ignores: ["*.d.ts", "**/coverage", "**/dist"],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      eslintPluginLit.configs["flat/recommended"],
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      "import/order": ["error"],
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: {
          extensions: [".js", ".ts"],
        },
      },
    },
  },
  eslintConfigPrettier,
);
