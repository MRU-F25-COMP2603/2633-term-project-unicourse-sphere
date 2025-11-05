import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    extends: [js.configs.recommended, "plugin:prettier/recommended"],
    rules: {
      semi: ["error", "never"],
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
]);
