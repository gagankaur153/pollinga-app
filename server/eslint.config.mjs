import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JS rules
  {
    files: ["**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  // Express / CommonJS files
  {
    files: ["server/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
]);