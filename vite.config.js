import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      Components: resolve(__dirname, "src/components"),
      Pages: resolve(__dirname, "src/pages"),
      Configs: resolve(__dirname, "src/config"),
      Utils: resolve(__dirname, "src/utils"),
      Store: resolve(__dirname, "src/store"),
      Assets: resolve(__dirname, "src/assets"),
      Routes: resolve(__dirname, "src/routes"),
      Apis: resolve(__dirname, "src/apis"),
      Hooks: resolve(__dirname, "src/hooks"),
    },
  },
});
