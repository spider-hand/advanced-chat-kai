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
    isMobile: {
      toolbar: {
        title: "Mobile",
        icon: "mobile",
        items: [
          { value: false, title: "Desktop", icon: "browser" },
          { value: true, title: "Mobile", icon: "mobile" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    isMobile: false,
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || "light";
      const isMobile = context.globals.isMobile ?? false;
      const width = context.args.width ?? (isMobile ? "375px" : "900px");
      const height = context.args.height ?? (isMobile ? "667px" : "600px");
      // Set background color based on theme
      document.body.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#ffffff";
      // Wrap story and pass theme, isMobile, width, and height via render
      return html`
        <div data-theme="${theme}" style="display: contents;">
          ${story({ args: { ...context.args, theme, isMobile, width, height } })}
        </div>
      `;
    },
  ],
};

export default preview;
