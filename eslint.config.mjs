import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", "plugin:prettier/recommended"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { node: true }
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    rules: {
      "semi": ["error", "never"],
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
]);
