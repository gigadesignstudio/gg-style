import tokens from "./assets/css/tokens.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/index.css"],
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
