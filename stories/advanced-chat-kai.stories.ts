import type { Meta, StoryObj } from "@storybook/web-components";
import "../src/main.ts";
import {
  AdvancedChatKaiProps,
  ChatAction,
  ChatMessage,
  ChatMessageSuggestion,
  ChatRoom,
  ChatUser,
} from "../src/types/props.ts";

const meta: Meta = {
  component: "advanced-chat-kai",
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    currentUser: {
      id: "1",
      name: "User 1",
    } as ChatUser,
    rooms: [
      {
        id: "1",
        title: "Room 1",
        subtitle: "Subtitle 1",
        meta: "May 1",
      },
      {
        id: "2",
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        subtitle:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        meta: "May 1",
      },
      {
        id: "3",
        title: "Room 3",
        subtitle: "Subtitle 3",
        meta: "May 1",
      },
      {
        id: "4",
        title: "Room 4",
        subtitle: "Subtitle 4",
        meta: "May 1",
      },
      {
        id: "5",
        title: "Room 5",
        subtitle: "Subtitle 5",
        meta: "May 1",
      },
      {
        id: "6",
        title: "Room 6",
        subtitle: "Subtitle 6",
        meta: "May 1",
      },
      {
        id: "7",
        title: "Room 7",
        subtitle: "Subtitle 7",
        meta: "May 1",
      },
      {
        id: "8",
        title: "Room 8",
        subtitle: "Subtitle 8",
        meta: "May 1",
      },
      {
        id: "9",
        title: "Room 9",
        subtitle: "Subtitle 9",
        meta: "May 1",
      },
      {
        id: "10",
        title: "Room 10",
        subtitle: "Subtitle 10",
        meta: "May 1",
      },
    ] as ChatRoom[],
    messages: [
      {
        id: "1",
        roomId: "1",
        senderId: "1",
        senderName: "User 1",
        content: "Hello, how are you?",
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>(),
        attachments: [
          {
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            id: "file1.txt",
          },
          {
            name: "file2.txt",
            meta: "20 KB",
            id: "file2.txt",
          },
          {
            name: "file3.txt",
            meta: "30 KB",
            id: "file3.txt",
          },
        ],
        isDeleted: false,
        replyTo: null,
      },
      {
        id: "2",
        roomId: "1",
        senderId: "2",
        senderName: "User 2",
        content: "I'm fine, thank you!",
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>(),
        attachments: [
          {
            name: "file1.txt",
            meta: "10 KB",
            id: "file1.txt",
          },
          {
            name: "file2.txt",
            meta: "20 KB",
            id: "file2.txt",
          },
          {
            name: "file3.txt",
            meta: "30 KB",
            id: "file3.txt",
          },
        ],
        isDeleted: false,
        replyTo: null,
      },
      {
        id: "3",
        roomId: "1",
        senderId: "1",
        senderName: "User 1",
        content: "What about you?",
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>(),
        attachments: [],
        isDeleted: false,
        replyTo: null,
      },
      {
        id: "4",
        roomId: "1",
        senderId: "2",
        senderName: "User 2",
        content: "I'm doing great!",
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>(),
        attachments: [],
        isDeleted: false,
        replyTo: null,
      },
      {
        id: "5",
        roomId: "1",
        senderId: "1",
        senderName: "User 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>([
          ["😀", new Set(["1", "2"])],
          ["👍", new Set(["3"])],
          ["🎉", new Set(["1", "4", "5"])],
        ]),
        attachments: [],
        isDeleted: false,
        replyTo: null,
      },
      {
        id: "6",
        roomId: "1",
        senderId: "2",
        senderName:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>([
          ["😀", new Set(["1", "2", "8"])],
          ["👍", new Set(["3", "5", "7"])],
          ["🎉", new Set(["1", "4", "5", "6"])],
          ["❤️", new Set(["2", "3", "6", "9"])],
          ["😂", new Set(["10", "11", "12"])],
          ["😢", new Set(["4"])],
          ["👏", new Set(["2", "6", "8", "10"])],
          ["🔥", new Set(["1", "5", "7", "9"])],
          ["😎", new Set(["3", "8"])],
          ["🙌", new Set(["2", "6", "11"])],
        ]),
        attachments: [],
        isDeleted: false,
        replyTo: null,
      },
      {
        id: "7",
        roomId: "1",
        senderId: "2",
        senderName: "User 2",
        content: "I'm doing great!",
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>(),
        attachments: [],
        isDeleted: true,
        replyTo: null,
      },
      {
        id: "8",
        roomId: "1",
        senderId: "2",
        senderName: "User 2",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>(),
        attachments: [],
        isDeleted: false,
        replyTo: {
          id: "1",
          roomId: "1",
          senderId: "1",
          senderName: "User 1",
          content: "Hello, how are you?",
          timestamp: "12:34 PM",
          reactions: new Map<string, Set<string>>(),
          attachments: [
            {
              name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              id: "file1.txt",
            },
            {
              name: "file2.txt",
              meta: "20 KB",
              id: "file2.txt",
            },
            {
              name: "file3.txt",
              meta: "30 KB",
              id: "file3.txt",
            },
          ],
          isDeleted: false,
          replyTo: null,
        },
      },
    ] as ChatMessage[],
    suggestions: [
      {
        text: "Hello",
        value: "hello",
      },
      {
        text: "How are you?",
        value: "how-are-you",
      },
      {
        text: "What about you?",
        value: "what-about-you",
      },
      {
        text: "I'm doing great!",
        value: "im-doing-great",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        value: "lorem-ipsum",
      },
    ] as ChatMessageSuggestion[],
    attachments: [
      {
        name: "file1.txt",
        meta: "10 KB",
        id: "file1.txt",
      },
      {
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        meta: "20 KB",
        id: "lorem-ipsum",
      },
      {
        name: "file3.txt",
        meta: "30 KB",
        id: "file3.txt",
      },
      {
        name: "file4.txt",
        meta: "40 KB",
        id: "file4.txt",
      },
      {
        name: "file5.txt",
        meta: "50 KB",
        id: "file5.txt",
      },
      {
        name: "file6.txt",
        meta: "60 KB",
        id: "file6.txt",
      },
      {
        name: "file7.txt",
        meta: "70 KB",
        id: "file7.txt",
      },
      {
        name: "file8.txt",
        meta: "80 KB",
        id: "file8.txt",
      },
      {
        name: "file9.txt",
        meta: "90 KB",
        id: "file9.txt",
      },
      {
        name: "file10.txt",
        meta: "100 KB",
        id: "file10.txt",
      },
    ],
    selectedRoomId: "1",
    isLoadingRoom: false,
    isLoadingMessage: false,
    isLoadingMoreRooms: false,
    isLoadingMoreMessages: false,
    roomActions: [
      {
        label: "Delete",
        value: "delete-room",
      },
    ] as ChatAction<string>[],
    myMessageActions: [
      {
        label: "Edit",
        value: "edit-message",
      },
      {
        label: "Delete",
        value: "delete-message",
      },
    ],
    theirMessageActions: [
      {
        label: "Delete",
        value: "delete-message",
      },
    ],
    isMobile: false,
    isSingleRoom: false,
    isEmojiPickerAvailable: true,
    isEmojiReactionAvailable: true,
    isMessageAttachmentAvailable: true,
    isReplyAvailable: true,
    height: 480,
  } as AdvancedChatKaiProps,
};
