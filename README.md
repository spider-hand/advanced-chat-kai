# advanced-chat-kai

<img alt="light" src="https://github.com/user-attachments/assets/c7efa2e4-c7f5-4a83-968c-cbc0b0fea91f" />
<img alt="dark" src="https://github.com/user-attachments/assets/b547b8b6-2154-4334-8f5d-16fb2c8e264c"" />

![npm version](https://img.shields.io/npm/v/advanced-chat-kai) ![npm downloads](https://img.shields.io/npm/dm/advanced-chat-kai) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/advanced-chat-kai) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![codecov](https://codecov.io/gh/spider-hand/advanced-chat-kai/graph/badge.svg?token=ETHZJ2CTPF)](https://codecov.io/gh/spider-hand/advanced-chat-kai) ![Lit](https://img.shields.io/badge/lit-%23324FFF.svg?&logo=lit&logoColor=white)

A highly customizable chat Web Component that integrates easily with shadcn - works with any framework (React, Vue, Angular, Svelte, etc.)

> "Kai" (改) means "improved" in Japanese - inspired by vue-advanced-chat, this project started with the goal of building an improved alternative.

## Features

- **Framework-agnostic** - Can be used with any frontend framework
- **Backend-agnostic** - No assumptions about your backend
- **Lightweight** - Built with Lit for minimal bundle size and high performance
- **Logic-free** - Component handles only UI
- **Theming** - Light and dark themes with CSS variables, which is designed to be easily used with shadcn based UI

### Comparison

|                   | Bundle size (minified) | Bundle size (minified + gzipped) | Download time (slow 3G) | Download time (4G) |
| ----------------- | ---------------------- | -------------------------------- | ----------------------- | ------------------ |
| advanced-chat-kai | 112.9kB                | 23.1kB                           | 465ms                   | 27ms               |
| vue-advanced-chat | 493.4kB                | 149.8kB                          | 3s                      | 171ms              |
|                   | 📦 **77% smaller**     | 📦 **84% smaller**               | ⚡️ **85% faster**       | ⚡️ **84% faster**  |

## Demo

👉 [Storybook](https://main--6810a95e2c6e78e3e3be0658.chromatic.com)

👉 [Live Chat Example](https://advanced-chat-kai-demo.pages.dev)

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
| `timestampFormatter`           | ((date: Date) => string) \| null                  | false    | `null`                 | Custom function to format Date timestamps. If null, uses default Intl format      |
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
- `timestamp` can be a string (displayed as-is) or a Date object (formatted using `timestampFormatter` or default Intl format).
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
    timestamp: "12:34 PM", // or new Date()
    reactions: {
      "👍": ["2", "3"],
      "🎉": ["1", "4", "5"],
    },
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
  reactions: {
    "👍": ["2", "3"],
    "🎉": ["1", "4", "5"],
  },
  attachments: [
    {
      name: "file1.txt",
      meta: "20 KB",
      id: "0",
    },
  ],
  isDeleted: false,
  isSelected: false,
};
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

### ⚠️ Note on updating arrays and objects

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

| Name                    | Detail / Payload                         | Fires when a user                                                             |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `add-room`              | -                                        | Clicked the add button on the sidebar                                         |
| `search-room`           | `{ value }`                              | Changed the input on the searchbox                                            |
| `select-room-action`    | `{ label, value, roomId }`               | Selected an action on the room                                                |
| `load-more-rooms`       | -                                        | Reached the bottom of the room list                                           |
| `select-room`           | `{ room }`                               | Selected a room in the list                                                   |
| `load-more-messages`    | -                                        | Reached the top of the message list                                           |
| `select-message-action` | `{ label, value, messageId }`            | Selected an action on the message                                             |
| `select-suggestion`     | `{ suggestion }`                         | Selected a suggestion in the list                                             |
| `select-emoji`          | `{ messageId, currentUserId, emoji }`    | Selected an emoji reaction in picker for a message                            |
| `reply-to-message`      | `{ replyTo }`                            | Clicked the reply button on a message                                         |
| `click-reaction`        | `{ messageId, reaction }`                | Clicked an existing emoji reaction on a message                               |
| `download-attachment`   | `{ attachment }`                         | Clicked the download button on an attachment                                  |
| `remove-attachment`     | `{ attachment }`                         | Clicked the close button on an attachment                                     |
| `cancel-reply`          | -                                        | Clicked the close button on the reply message, or sent a message with a reply |
| `select-file`           | `{ file }`                               | Selected a file                                                               |
| `send-message`          | `{ roomId, senderId, content, replyTo }` | Clicked the send button on the footer                                         |
| `click-dialog-button`   | `{ event, side }`                        | Clicked a button on a dialog                                                  |

## Styling

CSS variable names are based on the [shadcn](https://ui.shadcn.com/docs/theming) design system and [Tailwind CSS](https://tailwindcss.com/docs/customizing-spacing) spacing/typography scale, prefixed with `--chat-`. You can override these variables to customize the appearance of the chat component.

### Color Variables

| Variable                        |
| ------------------------------- |
| `--chat-background`             |
| `--chat-foreground`             |
| `--chat-card`                   |
| `--chat-card-foreground`        |
| `--chat-popover`                |
| `--chat-popover-foreground`     |
| `--chat-primary`                |
| `--chat-primary-foreground`     |
| `--chat-secondary`              |
| `--chat-secondary-foreground`   |
| `--chat-muted`                  |
| `--chat-muted-foreground`       |
| `--chat-accent`                 |
| `--chat-accent-foreground`      |
| `--chat-destructive`            |
| `--chat-destructive-foreground` |
| `--chat-border`                 |
| `--chat-input`                  |
| `--chat-ring`                   |

### Font Size Variables

| Variable           | Default    |
| ------------------ | ---------- |
| `--chat-text-xs`   | `0.75rem`  |
| `--chat-text-sm`   | `0.875rem` |
| `--chat-text-base` | `1rem`     |
| `--chat-text-lg`   | `1.125rem` |
| `--chat-text-xl`   | `1.25rem`  |

### Border Radius Variables

| Variable             | Default    |
| -------------------- | ---------- |
| `--chat-radius-sm`   | `0.125rem` |
| `--chat-radius`      | `0.25rem`  |
| `--chat-radius-md`   | `0.375rem` |
| `--chat-radius-lg`   | `0.5rem`   |
| `--chat-radius-xl`   | `0.75rem`  |
| `--chat-radius-2xl`  | `1rem`     |
| `--chat-radius-3xl`  | `1.5rem`   |
| `--chat-radius-full` | `9999px`   |

### Spacing Variables

| Variable             | Default    |
| -------------------- | ---------- |
| `--chat-spacing-0`   | `0`        |
| `--chat-spacing-0-5` | `0.125rem` |
| `--chat-spacing-1`   | `0.25rem`  |
| `--chat-spacing-1-5` | `0.375rem` |
| `--chat-spacing-2`   | `0.5rem`   |
| `--chat-spacing-2-5` | `0.625rem` |
| `--chat-spacing-3`   | `0.75rem`  |
| `--chat-spacing-4`   | `1rem`     |
| `--chat-spacing-5`   | `1.25rem`  |
| `--chat-spacing-6`   | `1.5rem`   |
| `--chat-spacing-8`   | `2rem`     |

### Shadow Variables

| Variable            | Default                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `--chat-shadow-2xs` | `0 1px rgb(0 0 0 / 0.05)`                                             |
| `--chat-shadow-xs`  | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                       |
| `--chat-shadow-sm`  | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`       |
| `--chat-shadow-md`  | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`    |
| `--chat-shadow-lg`  | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`  |
| `--chat-shadow-xl`  | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `--chat-shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)`                                 |

### Custom Variables

| Variable                         | Description                              |
| -------------------------------- | ---------------------------------------- |
| `--chat-base-font-size`          | The base font size of the chat component |
| `--chat-message-mine`            | The background color of my messages      |
| `--chat-message-mine-foreground` | The text/icon color on my messages       |
| `--chat-success`                 | The background color of success badge    |
| `--chat-success-foreground`      | The text color on success badge          |
| `--chat-danger`                  | The background color of danger badge     |
| `--chat-danger-foreground`       | The text color on danger badge           |
| `--chat-warning`                 | The background color of warning badge    |
| `--chat-warning-foreground`      | The text color on warning badge          |
| `--chat-info`                    | The background color of info badge       |
| `--chat-info-foreground`         | The text color on info badge             |
| `--chat-overlay-subtle`          | Subtle overlay (5% opacity)              |
| `--chat-overlay-light`           | Light overlay (8% opacity)               |
| `--chat-overlay`                 | Default overlay (10% opacity)            |
| `--chat-overlay-medium`          | Medium overlay (15% opacity)             |
| `--chat-overlay-heavy`           | Heavy overlay (50% opacity)              |

### Usage

You can override the component's style using CSS custom properties (variables). These are applied directly to `advanced-chat-kai` element:

```css
advanced-chat-kai {
  --chat-primary: oklch(0.65 0.24 15);
  --chat-primary-foreground: oklch(1 0 0);
  --chat-message-mine: oklch(0.65 0.24 15);
  --chat-message-mine-foreground: oklch(1 0 0);
}
```

All styles are encapsulated in Shadow DOM, so direct CSS selectors from outside will not apply - only CSS variables can be used for styling.

## Contributing

- Bug fix PRs are always welcome.
- UI changes or new features should not be submitted without prior discussion. Please open an issue first to propose and discuss them.

Thanks for your understanding and contributions.

## License

[MIT](./LICENSE)
