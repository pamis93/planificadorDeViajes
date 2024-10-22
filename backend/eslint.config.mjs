import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node,
    },
    ...pluginJs.configs.recommended, // Extiende las configuraciones recomendadas
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "next" }],
    },
  },
];
