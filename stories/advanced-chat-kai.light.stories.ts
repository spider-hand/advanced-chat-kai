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
  title: "advanced-chat-kai/Light",
  component: "advanced-chat-kai",
};

export default meta;
type Story = StoryObj;

export const WithDefault: Story = {
  args: {
    theme: "light",
  },
};

export const WithLoader: Story = {
  args: {
    isLoadingRoom: true,
    isLoadingMessage: true,
    theme: "light",
  },
};

export const WithFullProps: Story = {
  args: {
    ...testProps,
    theme: "light",
  },
};

export const WithLeftAlignedMessages: Story = {
  args: {
    ...testProps,
    theme: "light",
    alignMyMessagesLeft: true,
  },
};

export const WithReplyAndAttachment: Story = {
  args: {
    ...testProps,
    theme: "light",
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
    theme: "light",
  },
};

export const WithFullScreen: Story = {
  args: {
    ...testProps,
    width: "100vw",
    height: "100vh",
    isMobile: true,
    theme: "light",
  },
}

export const WithSingleRoom: Story = {
  args: {
    ...testProps,
    isSingleRoom: true,
    theme: "light",
  },
};

export const WithDialog: Story = {
  args: {
    ...testProps,
    theme: "light",
    dialog: testDialog,
  },
};

export const WithTyping: Story = {
  args: {
    ...testProps,
    theme: "light",
    isTyping: true,
  },
};

export const WithSuggestions: Story = {
  args: {
    ...testProps,
    theme: "light",
    suggestions: testSuggestions,
  },
};

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

export const WithLocalization: Story = {
  args: {
    ...testProps,
    theme: "light",
    i18n: testI18n,
  },
};
