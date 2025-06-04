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
} from "./props";

const meta: Meta = {
  title: "advanced-chat-kai/Dark",
  component: "advanced-chat-kai",
};

export default meta;
type Story = StoryObj;

export const WithDefault: Story = {
  args: {
    theme: "dark",
  },
};

export const WithLoader: Story = {
  args: {
    isLoadingRoom: true,
    isLoadingMessage: true,
    theme: "dark",
  },
};

export const WithFullProps: Story = {
  args: {
    ...testProps,
    theme: "dark",
  },
};

export const WithLeftAlignedMessages: Story = {
  args: {
    ...testProps,
    theme: "dark",
    alignMyMessagesLeft: true,
  },
};

export const WithReplyAndAttachment: Story = {
  args: {
    ...testProps,
    theme: "dark",
    attachments: testAttachments,
    replyTo: testReplyTo,
  },
};

export const WithMobile: Story = {
  args: {
    ...testProps,
    isMobile: true,
    width: "40em",
    height: "60em",
    theme: "dark",
  },
};

export const WithSingleRoom: Story = {
  args: {
    ...testProps,
    isSingleRoom: true,
    theme: "dark",
  },
};

export const WithDialog: Story = {
  args: {
    ...testProps,
    dialog: testDialog,
    theme: "dark",
  },
};

export const WithTyping: Story = {
  args: {
    ...testProps,
    isTyping: true,
    theme: "dark",
  },
};

export const WithSuggestions: Story = {
  args: {
    ...testProps,
    suggestions: testSuggestions,
    theme: "dark",
  },
};

export const WithClosedRoom: Story = {
  args: {
    ...testProps,
    theme: "dark",
    rooms: testProps.rooms?.map((room) => {
      return {
        ...room,
        hasEnded: true,
      };
    }),
  },
};

export const WithLocalization: Story = {
  args: {
    ...testProps,
    theme: "dark",
    i18n: testI18n,
  },
};
