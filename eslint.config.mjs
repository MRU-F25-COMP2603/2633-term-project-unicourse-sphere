import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: [
      "eslint:recommended",
      "plugin:@eslint/js/recommended",
      "plugin:prettier/recommended",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { node: true },
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "no-console": "off",
      quotes: ["error", "double"],
      "comma-dangle": ["error", "always-multiline"],
      indent: ["error", 4],
    },
  },
]);
