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
    --surface-50: hsl(240 20% 99%);
    --surface-100: hsl(240 23% 97%);
    --surface-200: hsl(240 22% 93%);
    --surface-300: hsl(240 20% 85%);
    --surface-400: hsl(240 21% 75%);
    --surface-500: hsl(240 17% 45%);
    --surface-600: hsl(240 17% 45%);
    --surface-700: hsl(240 13% 32%);
    --surface-800: hsl(240 11% 23%);
    --surface-900: hsl(240 10% 18%);
    --surface-950: hsl(240 10% 16%);
    --brand-50: hsl(252 95% 93%);
    --brand-100: hsl(250 91% 86%);
    --brand-200: hsl(250 88% 80%);
    --brand-300: hsl(249 84% 74%);
    --brand-400: hsl(249 80% 67%);
    --brand-500: hsl(249 78% 60%);
    --brand-600: hsl(249 76% 52%);
    --brand-700: hsl(249 74% 45%);
    --brand-800: hsl(250 72% 37%);
    --brand-900: hsl(250 70% 30%);
    --brand-950: hsl(250 68% 22%);
    --send-button-bg: var(--brand-600);
    --send-button-bg-hover: var(--brand-700);
    --my-message-bg: var(--brand-500);
    --my-message-bg-selected: var(--brand-600);
    --my-reaction-list-bg: var(--brand-500);
    --my-reaction-button-bg: var(--brand-600);
    --my-reaction-button-bg-hover: var(--brand-700);
    --suggestion-list-item-bg: var(--brand-500);
    --suggestion-list-item-bg-hover: var(--brand-600);
    --my-message-menu-bg: var(--brand-500);
    --my-message-button-bg-hover: var(--brand-600);
    --my-attachment-bg: var(--brand-600);
    --my-attachment-bg-hover: var(--brand-700);
    --text-on-brand: var(--surface-50);
    --subtext-on-brand: var(--surface-100);
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
