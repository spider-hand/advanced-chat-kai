# advanced-chat-kai

![light](https://github.com/user-attachments/assets/bbdadeda-b26f-4af5-9bb6-2c40ace765c7)
![dark](https://github.com/user-attachments/assets/34a4ce47-b7ba-43a6-a87c-c914c65e6523)
![custom](https://github.com/user-attachments/assets/7a9690b4-ce7c-4775-b937-82525e161f55)

![npm version](https://img.shields.io/npm/v/advanced-chat-kai) ![npm downloads](https://img.shields.io/npm/dm/advanced-chat-kai) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/advanced-chat-kai) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![codecov](https://codecov.io/gh/spider-hand/advanced-chat-kai/graph/badge.svg?token=ETHZJ2CTPF)](https://codecov.io/gh/spider-hand/advanced-chat-kai)

A highly customizable Web Component for building chat interfaces

> "Kai" (改) means "improved" in Japanese - this is a modern, lightweight, and framework-agnostic chat component built for flexibility and ease of integration.

## Features

- Framework-agnostic - Can be used with any frontend framework or none at all
- Backend-agnostic - No assumptions about your backend; integrate freely
- Lightweight - Built with Lit for minimal bundle size and high performance
- Logic-free - You own the data, state and behavior; components only handle UI
- Theming support - Built-in light and dark themes
- Customizable style - Easily style components with CSS variables

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Events](#events)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install advanced-chat-kai
```

## Usage

```html
<advanced-chat-kai></advanced-chat-kai>
```

## Props

| Name                           | Type                                              | Required | Default                | Description                                                                       |
| ------------------------------ | ------------------------------------------------- | -------- | ---------------------- | --------------------------------------------------------------------------------- |
| `currentUserId`                | string \| null                                    | false    | `null`                 | The current user id using the chat                                                |
| `rooms`                        | [ChatRoom](#chatroom)[]                           | false    | `[]`                   | The list of chat rooms showing in the sidebar                                     |
| `messages`                     | [ChatItemType](#chatitemtype)[]                   | false    | `[]`                   | The list of messages in the room currently selected                               |
| `attachments`                  | [ChatMessageAttachment](#chatmessageattachment)[] | false    | `[]`                   | The list of attachments in the message                                            |
| `suggestions`                  | [ChatMessageSuggestion](#chatmessagesuggestion)[] | false    | `[]`                   | The list of message suggestions                                                   |
| `replyTo`                      | [ChatMessageReply](#chatmessagereply) \| null     | false    | `null`                 | The message being replied to, if any                                              |
| `selectedRoomId`               | string \| null                                    | false    | `null`                 | The id of the room currently selected                                             |
| `isLoadingRoom`                | boolean                                           | false    | `false`                | Whether the list of the initial rooms are loading or not                          |
| `isLoadingMessage`             | boolean                                           | false    | `false`                | Whether the list of the initial messages are loading or not                       |
| `isLoadingMoreRooms`           | boolean                                           | false    | `false`                | Whether more rooms are loading or not                                             |
| `isLoadingMoreMessages`        | boolean                                           | false    | `false`                | Whether more messages are loading or not                                          |
| `inputMessage`                 | string                                            | false    | `""`                   | The current message input used for two-way binding                                |
| `roomActions`                  | [ChatAction<ChatActionType>](#chataction)[]       | false    | `[]`                   | The list of actions available for the rooms                                       |
| `myMessageActions`             | [ChatAction<ChatActionType>](#chataction)[]       | false    | `[]`                   | The list of actions available for the user's messages                             |
| `theirMessageActions`          | [ChatAction<ChatActionType>](#chataction)[]       | false    | `[]`                   | The list of actions available for other user's messages                           |
| `isMobile`                     | boolean                                           | false    | `false`                | Whether the chat component should be rendered in mobile mode or not               |
| `isSingleRoom`                 | boolean                                           | false    | `false`                | Whether the sidebar and toggle button should be rendered or not                   |
| `isEmojiPickerAvailable`       | boolean                                           | false    | `true`                 | Whether the emoji picker on the footer should be rendered or not                  |
| `isEmojiReactionAvailable`     | boolean                                           | false    | `true`                 | Whether the emoji reaction button on the message should be rendered or not        |
| `isReplyAvailable`             | boolean                                           | false    | `true`                 | Whether the reply button on the message should be rendered or not                 |
| `isMessageAttachmentAvailable` | boolean                                           | false    | `true`                 | Whether the message attachment button on the footer should be rendered or not     |
| `isMarkdownAvailable`          | boolean                                           | false    | `false`                | Whether the markdown message format should be rendered or not                     |
| `isTyping`                     | boolean                                           | false    | `false`                | Whether the typing indicator should be rendered or not                            |
| `showRoomAvatar`               | boolean                                           | false    | `true`                 | Whether the room avatar on the list of rooms should be rendered or not            |
| `showTheirAvatar`              | boolean                                           | false    | `true`                 | Whether the other user's avatar on the message should be rendered or not          |
| `alignMyMessagesLeft`          | boolean                                           | false    | `false`                | Whether my messages should be aligned to the left or not                          |
| `enterToSend`                  | boolean                                           | false    | `false`                | Whether the enter key should send the message or not                              |
| `dialog`                       | [Dialog](#dialog) \| null                         | false    | `null`                 | The dialog to be rendered                                                         |
| `height`                       | string                                            | false    | `"60em"`               | The height of the chat component                                                  |
| `width`                        | string                                            | false    | `"80em"`               | The width of the chat component                                                   |
| `i18n`                         | [PartialI18nType](#i18ntype)                      | false    | [See below](#i18ntype) | The i18n object to be used for translations                                       |
| `theme`                        | ThemeType                                         | false    | `"light"`              | The theme to be used for the chat component. It must be either `light` or `dark`. |

### Interfaces

##### ChatRoom

Notes:

- The footer will be hidden if `hasEnded` is true and `selectedRoomId` matches the room’s `id`.

Example:

```js
rooms = [
  {
    id: "1",
    headerTitle: "title",
    headerSubtitle: "subtitle",
    sidebarTitle: "title",
    siderbarSubtitle: "subtitle",
    avatar: "/avatar.png",
    meta: "May 1",
    badge: {
      type: "success",
      label: "Success",
    },
    hasEnded: false,
  },
];
```

##### ChatItemType

Notes:

- `type` must be either `divider` or `message`.
- `reactions` represents the emoji reactions and the list of user IDs who reacted with each emoji.
- `isSelected` can be used to indicate that an action (such as editing) is currently active on the message.

Example:

```js
messages = [
  {
    id: "0",
    type: "divider",
    roomId: "1",
    content: "May 1",
  },
  {
    id: "1",
    type: "message",
    roomId: "1",
    senderId: "1",
    senderName: "User 1",
    senderAvatar: "/avatar.png",
    content: "Hello, world",
    timestamp: "12:34 PM",
    reactions: new Map<string, Set<string>>([
      ["👍", new Set(["2", "3"])],
      ["🎉", new Set(["1", "4", "5"])],
    ]),
    attachments: [
      {
        name: "file1.txt",
        meta: "20 KB",
        id: "0",
      }
    ],
    isDeleted: false,
    isSelected: false,
    replyTo: null,
  }
]
```

##### ChatMessageAttachment

Example:

```js
attachments = [
  {
    name: "file1.txt",
    meta: "20 KB",
    id: "0",
  },
  {
    name: "image.png",
    meta: "2 MB",
    id: "1",
    imageUrl: "/image.png",
  },
];
```

##### ChatMessageSuggestion

Example:

```js
suggestions = [
  {
    text: "Hello",
    value: "hello",
  },
];
```

##### ChatMessageReply

Example:

```js
chatMessageReply = {
  id: "1",
  type: "message",
  roomId: "1",
  senderId: "1",
  senderName: "User 1",
  senderAvatar: "/avatar.png",
  content: "Hello, world",
  timestamp: "12:34 PM",
  reactions: new Map<string, Set<string>>([
    ["👍", new Set(["2", "3"])],
    ["🎉", new Set(["1", "4", "5"])],
  ]),
  attachments: [
    {
      name: "file1.txt",
      meta: "20 KB",
      id: "0",
    }
  ],
  isDeleted: false,
  isSelected: false,
}
```

##### ChatAction

Example:

```js
myMessageActions = [
  {
    label: "Edit",
    value: "edit-message",
  },
  {
    label: "Delete",
    value: "delete-message",
  },
];
```

##### Dialog

Example:

```js
dialog = {
  event: "confirm-deletion-message",
  body: "Are you sure you want to delete this message?",
  leftButton: {
    text: "Cancel",
  },
  rightButton: {
    text: "OK",
    variant: "danger",
  },
};
```

##### I18nType

The default value is shown below. You can override only the fields you want to customize.

```js
const DEFAULT_I18N = {
  DELETED_MESSAGE: "This message has been deleted.",
  CHAT_FOOTER_TEXTAREA_PLACEHOLDER: "Write a message..",
  CHAT_SEARCH_PLACEHOLDER: "Search room",
  CLOSED_ROOM_MESSAGE: "This chat has been ended.",
  NEW_MESSAGE_NOTIFICATION: "New messages",
};
```

### ⚠️　Note on updating arrays and objects

Lit uses shallow comparison to detect changes to reactive properties. When working with arrays or objects, you must assign a new reference to trigger updates. Mutating the existing object or array in place (e.g. using `push()` or modifying a property directly) will not cause the component to update.

✅ Correct:

```ts
this.messages = [...this.messages, newMessage];
```

❌ Won’t work:

```ts
this.messages.push(newMessage);
```

## Events

| Name                    | Detail / Payload                      | Fires when a user                                  |
| ----------------------- | ------------------------------------- | -------------------------------------------------- |
| `add-room`              | -                                     | Clicked the add button on the sidebar              |
| `search-room`           | `{ value }`                           | Changed the input on the searchbox                 |
| `select-room-action`    | `{ label, value, roomId }`            | Selected an action on the room                     |
| `load-more-rooms`       | -                                     | Reached the bottom of the room list                |
| `select-room`           | `{ room }`                            | Selected a room in the list                        |
| `load-more-messages`    | -                                     | Reached the top of the message list                |
| `select-message-action` | `{ label, value, messageId }`         | Selected an action on the message                  |
| `select-suggestion`     | `{ suggestion }`                      | Selected a suggestion in the list                  |
| `select-emoji`          | `{ messageId, currentUserId, emoji }` | Selected an emoji reaction in picker for a message |
| `reply-to-message`      | `{ replyTo }`                         | Clicked the reply button on a message              |
| `click-reaction`        | `{ messageId, reaction }`             | Clicked an existing emoji reaction on a message    |
| `download-attachment`   | `{ attachment }`                      | Clicked the download button on an attachment       |
| `remove-attachment`     | `{ attachment }`                      | Clicked the close button on an attachment          |
| `cancel-reply`          | -                                     | Clicked the close button on the reply message      |
| `select-file`           | `{ file }`                            | Selected a file                                    |
| `send-message`          | `{ roomId, senderId, content }`       | Clicked the send button on the footer              |
| `click-dialog-button`   | `{ event, side }`                     | Clicked a button on a dialog                       |

## Styling

The `--chat-surface-50` to `--chat-surface-950` variables define the primary surface color scale, used across light and dark themes for backgrounds and component surfaces.

| Variable                               | Description                                         |
| -------------------------------------- | --------------------------------------------------- |
| `--chat-base-font-size`                     | The base font size of the chat component            |
| `--chat-white`                              |                                                     |
| `--chat-black`                              |                                                     |
| `--chat-success`                            |                                                     |
| `--chat-danger`                             |                                                     |
| `--chat-warning`                            |                                                     |
| `--chat-info`                               |                                                     |
| `--chat-surface-50`                         |                                                     |
| `--chat-surface-100`                        |                                                     |
| `--chat-surface-200`                        |                                                     |
| `--chat-surface-300`                        |                                                     |
| `--chat-surface-400`                        |                                                     |
| `--chat-surface-500`                        |                                                     |
| `--chat-surface-600`                        |                                                     |
| `--chat-surface-700`                        |                                                     |
| `--chat-surface-800`                        |                                                     |
| `--chat-surface-900`                        |                                                     |
| `--chat-surface-950`                        |                                                     |
| `--chat-text`                               | The default text color                              |
| `--chat-subtext`                            | The default subtext color                           |
| `--chat-border`                             | The default border color                            |
| `--chat-floating-item-border`               | The default border color for floating items         |
| `--chat-floating-item-box-shadow`           | The default box shadow for floating items           |
| `--chat-placeholder`                        | The default placeholder color                       |
| `--chat-deleted`                            | The default background color for deleted messages   |
| `--chat-overlay`                            | The default background color for overlay            |
| `--chat-notification-badge-background` | The default background color for notification badge |
| `--chat-notification-badge-text`       | The default text color for notification badge       |

Also, a minimal set of CSS variables is exposed specifically for applying brand colors to the key UI elements:

| Variable                          | Description                                                         |
| --------------------------------- | ------------------------------------------------------------------- |
| `--chat-send-button-bg`                | The background color of the send button                             |
| `--chat-send-button-bg-hover`          | The background color of the send button on hover                    |
| `--chat-my-message-bg`                 | The background color of my messages                                 |
| `--chat-my-message-bg-selected`        | The background color of my messages when selected                   |
| `--chat-my-reaction-list-bg`           | The background color of the reaction list on my messages            |
| `--chat-my-reaction-button-bg`         | The background color of the reaction button on my messages          |
| `--chat-my-reaction-button-bg-hover`   | The background color of the reaction button on my messages on hover |
| `--chat-suggestion-list-item-bg`       | The background color of the suggestion list item                    |
| `--chat-suggestion-list-item-bg-hover` | The background color of the suggestion list item on hover           |
| `--chat-my-message-menu-bg`            | The background color of the message menu on my messages             |
| `--chat-my-message-button-bg-hover`    | The background color of the message button on my messages on hover  |
| `--chat-my-attachment-bg`              | The background color of the attachment on my messages               |
| `--chat-my-attachment-bg-hover`        | The background color of the attachment on my messages on hover      |
| `--chat-text-on-brand`                 | The text color on brand colors                                      |
| `--chat-subtext-on-brand`              | The subtext color on brand colors                                   |

You can override the component's style using CSS custom properties (variables). These are applied directly to `advanced-chat-kai` element:

```css
advanced-chat-kai {
  --chat-success: green;
  --chat-danger: red;
  --chat-warning: yellow;
  --chat-info: blue;
}
```

All styles are encapsulated in Shadow DOM, so direct CSS selectors from outside will not apply - only CSS variables can be used for styling.

## Contributing

- Bug fix PRs are always welcome.
- UI changes or new features should not be submitted without prior discussion. Please open an issue first to propose and discuss them.

Thanks for your understanding and contributions.

## License

[MIT](./LICENSE)
