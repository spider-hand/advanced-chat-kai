import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../define/index";
import "./advanced-chat-kai";
import {
  activeChat,
  emptyState,
  loadingState,
  mobileLayout,
  singleRoomMode,
  edgeCasesChat,
  rooms,
  messages,
  messageWithReply,
  messageWithImages,
  attachments,
  suggestions,
  replyTo,
  confirmDialog,
  localizedText,
} from "../__fixtures__/chat-fixtures";
import type { AdvancedChatKaiProps } from "../types";

const meta: Meta<AdvancedChatKaiProps> = {
  title: "AdvancedChatKai",
  component: "advanced-chat-kai",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    theme: {
      control: "radio",
      options: ["light", "dark"],
      table: { category: "Appearance", defaultValue: { summary: "light" } },
    },
    width: {
      control: "text",
      table: { category: "Appearance", defaultValue: { summary: "80em" } },
    },
    height: {
      control: "text",
      table: { category: "Appearance", defaultValue: { summary: "60em" } },
    },
    isMobile: {
      control: "boolean",
      table: { category: "Layout", defaultValue: { summary: "false" } },
    },
    isSingleRoom: {
      control: "boolean",
      table: { category: "Layout", defaultValue: { summary: "false" } },
    },
    alignMyMessagesLeft: {
      control: "boolean",
      table: { category: "Layout", defaultValue: { summary: "false" } },
    },
    isEmojiPickerAvailable: {
      control: "boolean",
      table: { category: "Features", defaultValue: { summary: "true" } },
    },
    isEmojiReactionAvailable: {
      control: "boolean",
      table: { category: "Features", defaultValue: { summary: "true" } },
    },
    isReplyAvailable: {
      control: "boolean",
      table: { category: "Features", defaultValue: { summary: "true" } },
    },
    isMessageAttachmentAvailable: {
      control: "boolean",
      table: { category: "Features", defaultValue: { summary: "true" } },
    },
    isMarkdownAvailable: {
      control: "boolean",
      table: { category: "Features", defaultValue: { summary: "false" } },
    },
    enterToSend: {
      control: "boolean",
      table: { category: "Features", defaultValue: { summary: "false" } },
    },
    isTyping: {
      control: "boolean",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    isLoadingRoom: {
      control: "boolean",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    isLoadingMessage: {
      control: "boolean",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    currentUserId: { table: { disable: true } },
    rooms: { table: { disable: true } },
    messages: { table: { disable: true } },
    attachments: { table: { disable: true } },
    suggestions: { table: { disable: true } },
    replyTo: { table: { disable: true } },
    selectedRoomId: { table: { disable: true } },
    inputMessage: { table: { disable: true } },
    roomActions: { table: { disable: true } },
    myMessageActions: { table: { disable: true } },
    theirMessageActions: { table: { disable: true } },
    dialog: { table: { disable: true } },
    i18n: { table: { disable: true } },
    showRoomAvatar: { table: { disable: true } },
    showTheirAvatar: { table: { disable: true } },
    isLoadingMoreRooms: { table: { disable: true } },
    isLoadingMoreMessages: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<AdvancedChatKaiProps>;

export const Default: Story = {
  args: activeChat,
};

export const Loading: Story = {
  args: loadingState,
};

export const Empty: Story = {
  args: emptyState,
};

export const Mobile: Story = {
  args: mobileLayout,
};

export const Fullscreen: Story = {
  args: {
    ...activeChat,
    width: "100vw",
    height: "100vh",
    isMobile: true,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const SingleRoom: Story = {
  args: singleRoomMode,
};

export const LeftAligned: Story = {
  args: {
    ...activeChat,
    alignMyMessagesLeft: true,
  },
};

export const Typing: Story = {
  args: {
    ...activeChat,
    isTyping: true,
  },
};

export const WithSuggestions: Story = {
  args: {
    ...activeChat,
    suggestions,
  },
};

export const ReplyingToMessage: Story = {
  args: {
    ...activeChat,
    replyTo,
  },
};

export const WithAttachments: Story = {
  args: {
    ...activeChat,
    attachments,
  },
};

export const WithImageMessages: Story = {
  args: {
    ...activeChat,
    messages: [...messages, messageWithImages],
  },
};

export const WithReplyThread: Story = {
  args: {
    ...activeChat,
    messages: [...messages, messageWithReply],
  },
};

export const ClosedConversation: Story = {
  args: {
    ...activeChat,
    selectedRoomId: "closed-ticket",
    rooms: rooms.map((r) =>
      r.id === "closed-ticket" ? { ...r, hasEnded: true } : r,
    ),
  },
};

export const MarkdownEnabled: Story = {
  args: {
    ...activeChat,
    isMarkdownAvailable: true,
  },
};

export const EnterToSend: Story = {
  args: {
    ...activeChat,
    enterToSend: true,
  },
};

export const MinimalFeatures: Story = {
  args: {
    ...activeChat,
    isEmojiPickerAvailable: false,
    isEmojiReactionAvailable: false,
    isReplyAvailable: false,
    isMessageAttachmentAvailable: false,
  },
};

export const WithDialog: Story = {
  args: {
    ...activeChat,
    dialog: confirmDialog,
  },
};

export const Localized: Story = {
  args: {
    ...activeChat,
    i18n: localizedText,
  },
};

export const EdgeCases: Story = {
  args: edgeCasesChat,
};
