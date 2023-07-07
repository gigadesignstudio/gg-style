import tokens from "../assets/css/tokens.json";

export default defineNuxtConfig({
  extends: '..',
  postcss: {
    plugins: {
      "postcss-gg-tokens": {
        tokens,
      },
    },
  },
});
