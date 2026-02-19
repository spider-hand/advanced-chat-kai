import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tagName) => {
            return tagName === "advanced-chat-kai";
          },
        },
      },
    }),
  ],
  resolve: {
    alias:
      process.env.NODE_ENV !== "production"
        ? {
            "advanced-chat-kai": resolve(__dirname, "../src/define/index.ts"),
          }
        : {},
  },
});
