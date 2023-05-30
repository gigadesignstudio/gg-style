// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/plugins/directives/styles.css"],
  postcss: {
    plugins: {
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
