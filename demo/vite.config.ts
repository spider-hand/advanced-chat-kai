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
});
