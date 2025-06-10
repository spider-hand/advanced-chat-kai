import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../src/define/index.ts";
import "../src/components/advanced-chat-kai.ts";
import {
  testAttachments,
  testDialog,
  testI18n,
  testProps,
  testReplyTo,
  testSuggestions,
} from "./props.ts";

const meta: Meta = {
  title: "advanced-chat-kai/Custom",
  component: "advanced-chat-kai",
};

const customStyles = `
  advanced-chat-kai {
    --chat-surface-50: hsl(240 20% 99%);
    --chat-surface-100: hsl(240 23% 97%);
    --chat-surface-200: hsl(240 22% 93%);
    --chat-surface-300: hsl(240 20% 85%);
    --chat-surface-400: hsl(240 21% 75%);
    --chat-surface-500: hsl(240 17% 45%);
    --chat-surface-600: hsl(240 17% 45%);
    --chat-surface-700: hsl(240 13% 32%);
    --chat-surface-800: hsl(240 11% 23%);
    --chat-surface-900: hsl(240 10% 18%);
    --chat-surface-950: hsl(240 10% 16%);
    --chat-brand-50: hsl(252 95% 93%);
    --chat-brand-100: hsl(250 91% 86%);
    --chat-brand-200: hsl(250 88% 80%);
    --chat-brand-300: hsl(249 84% 74%);
    --chat-brand-400: hsl(249 80% 67%);
    --chat-brand-500: hsl(249 78% 60%);
    --chat-brand-600: hsl(249 76% 52%);
    --chat-brand-700: hsl(249 74% 45%);
    --chat-brand-800: hsl(250 72% 37%);
    --chat-brand-900: hsl(250 70% 30%);
    --chat-brand-950: hsl(250 68% 22%);
    --chat-send-button-bg: var(--chat-brand-600);
    --chat-send-button-bg-hover: var(--chat-brand-700);
    --chat-my-message-bg: var(--chat-brand-500);
    --chat-my-message-bg-selected: var(--chat-brand-600);
    --chat-my-reaction-list-bg: var(--chat-brand-500);
    --chat-my-reaction-button-bg: var(--chat-brand-600);
    --chat-my-reaction-button-bg-hover: var(--chat-brand-700);
    --chat-suggestion-list-item-bg: var(--chat-brand-500);
    --chat-suggestion-list-item-bg-hover: var(--chat-brand-600);
    --chat-my-message-menu-bg: var(--chat-brand-500);
    --chat-my-message-button-bg-hover: var(--chat-brand-600);
    --chat-my-attachment-bg: var(--chat-brand-600);
    --chat-my-attachment-bg-hover: var(--chat-brand-700);
    --chat-text-on-brand: var(--chat-surface-50);
    --chat-subtext-on-brand: var(--chat-surface-100);
  }`;

export default meta;
type Story = StoryObj;

export const WithDefault: Story = {
  args: {
    theme: "light",
  },
};

WithDefault.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithLoader: Story = {
  args: {
    isLoadingRoom: true,
    isLoadingMessage: true,
    theme: "light",
  },
};

WithLoader.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithFullProps: Story = {
  args: {
    ...testProps,
    theme: "light",
  },
};

WithFullProps.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithLeftAlignedMessages: Story = {
  args: {
    ...testProps,
    theme: "light",
    alignMyMessagesLeft: true,
  },
};

WithLeftAlignedMessages.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithReplyAndAttachment: Story = {
  args: {
    ...testProps,
    theme: "light",
    attachments: testAttachments,
    replyTo: testReplyTo,
  },
};

WithReplyAndAttachment.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithMobile: Story = {
  args: {
    ...testProps,
    isMobile: true,
    width: "40em",
    height: "60em",
    theme: "light",
  },
};

WithMobile.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithFullScreen: Story = {
  args: {
    ...testProps,
    width: "100vw",
    height: "100vh",
    isMobile: true,
    theme: "light",
  },
};

WithFullScreen.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithSingleRoom: Story = {
  args: {
    ...testProps,
    isSingleRoom: true,
    theme: "light",
  },
};

WithSingleRoom.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithDialog: Story = {
  args: {
    ...testProps,
    theme: "light",
    dialog: testDialog,
  },
};

WithDialog.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithTyping: Story = {
  args: {
    ...testProps,
    theme: "light",
    isTyping: true,
  },
};

WithTyping.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithSuggestions: Story = {
  args: {
    ...testProps,
    theme: "light",
    suggestions: testSuggestions,
  },
};

WithSuggestions.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithClosedRoom: Story = {
  args: {
    ...testProps,
    theme: "light",
    rooms: testProps.rooms?.map((room) => {
      return {
        ...room,
        hasEnded: true,
      };
    }),
  },
};

WithClosedRoom.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];

export const WithLocalization: Story = {
  args: {
    ...testProps,
    theme: "light",
    i18n: testI18n,
  },
};

WithLocalization.decorators = [
  (story) => html`
    <style>
      ${customStyles}
    </style>
    ${story()}
  `,
];
