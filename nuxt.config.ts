import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  css: ["normalize.css", join(currentDir, "./assets/css/index.css")],
});
