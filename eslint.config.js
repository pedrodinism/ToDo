import eslint from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  eslint.configs.recommended,

  {
    languageOptions: {
      globals: globals.browser,
    },
  },
];
