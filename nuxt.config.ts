import tokens from './assets/css/tokens.json';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: { '@gg-style': join(currentDir, './') },
  css: [join(currentDir, './assets/css/index.css')],
  postcss: {
    plugins: {
      'postcss-gg-tokens': {
        tokens,
      },
      'postcss-preset-env': {
        stage: 0,
        features: {
          'nesting-rules': false,
        },
      },
      'postcss-nested': {},
    },
  },
});
