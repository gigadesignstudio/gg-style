import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  alias: {
    "@gg-style": resolve("./"),
  },
  // css: ['normalize.css', join(currentDir, './assets/css/index.css')],
});
