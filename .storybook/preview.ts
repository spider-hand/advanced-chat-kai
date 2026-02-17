import { html } from "lit";
import type { Preview } from "@storybook/web-components-vite";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    backgrounds: { disable: true },
    layout: "centered",
  },
  globalTypes: {
    theme: {
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || "light";
      // Set background color based on theme
      document.body.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#ffffff";
      // Wrap story and pass theme as attribute via render
      return html`
        <div data-theme="${theme}" style="display: contents;">
          ${story({ args: { ...context.args, theme } })}
        </div>
      `;
    },
  ],
};

export default preview;
