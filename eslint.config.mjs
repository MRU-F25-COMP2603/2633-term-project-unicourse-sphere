import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import globals from "globals";
import pluginMocha from "eslint-plugin-mocha";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        after: "readonly",
      },
    },
    plugins: {
      prettier: pluginPrettier,
      mocha: pluginMocha,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      semi: ["error", "always"], // insert semicolons
      "no-unused-vars": "warn",
      "no-console": "off",
      "prettier/prettier": ["error", { semi: true }],
      "mocha/no-mocha-arrows": "error", // optional, set to "off" if you want arrows
    },
    settings: {
      mocha: { version: "detect" },
    },
  },
]);
