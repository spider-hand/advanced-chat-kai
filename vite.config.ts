import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: "es2022",
    minify: "esbuild",
    lib: {
      entry: "src/advanced-chat-kai.ts",
      name: "advanced-chat-kai",
    },
  },
  plugins: [visualizer()],
});
