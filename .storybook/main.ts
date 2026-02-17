import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: ["../public"],
};
export default config;
