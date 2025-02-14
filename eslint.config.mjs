import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["src/*.js", "src/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "warn",
      "no-dupe-class-members": "off",
      "prefer-const": "warn",
      "no-empty-function": ["error", { allow: ["getters", "setters", "constructors"] }]
    }
  },
  {
    plugins: {
      prettier: prettierPlugin
    }
  },
  {
    ignores: [".config/*", "build/**/*", "build/*", "**/node_modules/", ".git/"]
  }
];
