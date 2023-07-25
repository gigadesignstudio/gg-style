import tokens from "./assets/css/tokens.json";

export default defineNuxtConfig({
  extends: "..",
  postcss: {
    plugins: {
      "postcss-gg-tokens": {
        tokens,
      },
      "postcss-preset-env": {
        stage: 0,
        features: {
          "nesting-rules": false,
        },
      },
      "postcss-nested": {},
    },
  },
});
