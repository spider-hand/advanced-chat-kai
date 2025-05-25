import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: "es2022",
    minify: "esbuild",
    lib: {
      entry: "src/define/index.ts",
      name: "advanced-chat-kai",
      formats: ["es"],
      fileName: (format) => `advanced-chat-kai.${format}.js`,
    },
  },
  plugins: [visualizer()],
});
