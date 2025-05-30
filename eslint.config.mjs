import eslint from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  eslint.configs.recommended,
  eslintConfigPrettier,
  { files: ["**/*.{js,mjs,cjs}"] },
  {
    languageOptions: {
      globals: {
        ...globals.es2024,
        ...globals.node
      }
    }
  },
  { settings: { node: { version: "detect" } } },
  {
    plugins: {
      prettier: prettierPlugin
    }
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "warn",
      "no-dupe-class-members": "off",
      "prefer-const": "warn",
      "no-empty-function": ["error", { allow: ["getters", "setters", "constructors"] }],
      "max-lines-per-function": ["error", { max: 100 }],
      "max-lines": ["error", { max: 500, skipBlankLines: true, skipComments: true }],
      "prettier/prettier": "error"
    }
  },
  {
    ignores: ["dist/**", "**/node_modules/**", ".git/**", ".config/**"]
  }
];
