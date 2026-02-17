import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, configDefaults } from "vitest/config";
import externalizeSourceDependencies from "@blockquote/rollup-plugin-externalize-source-dependencies";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

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
    workspace: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["test/**/*.test.ts"],
          browser: {
            enabled: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
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
