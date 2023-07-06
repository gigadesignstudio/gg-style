import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import tokens from '~~/assets/css/tokens.json';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
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
