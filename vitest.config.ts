import { defineConfig, configDefaults } from "vitest/config";
import externalizeSourceDependencies from "@blockquote/rollup-plugin-externalize-source-dependencies";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude as string[]),
        "**/**.js",
        "demo/**",
        "stories/**",
      ],
    },
    // Lit recommends using browser environment for testing
    // https://lit.dev/docs/tools/testing/#testing-in-the-browser
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
  },
  plugins: [
    externalizeSourceDependencies([
      /* @web/test-runner-commands needs to establish a web-socket
       * connection. It expects a file to be served from the
       * @web/dev-server. So it should be ignored by Vite */
      "/__web-dev-server__web-socket.js",
    ]),
  ],
});
