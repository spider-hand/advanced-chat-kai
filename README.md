# advanced-chat-kai

![light](https://github.com/user-attachments/assets/57da1b89-166e-4e06-9b6d-ae08d789ffb4)

![dark](https://github.com/user-attachments/assets/eae2c3c3-be4d-4eae-bd11-5c553ac0c0bf)

A highly customizable Web Component for building chat interfaces

> "Kai" (改) means "improved" in Japanese - this is a modern, lightweight, and framework-agnostic chat component built for flexibility and ease of integration.

## Features

- Framework-agnostic - Can be used with any frontend framework or none at all
- Backend-agnostic - No assumptions about your backend; integrate freely
- Lightweight - Built with Lit for minimal bundle size and high performance
- Logic-free - You own the data, state and behavior; components only handle UI
- Theming support - Built-in light and dark themes
- Customizable style - Easily style components with CSS variables

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
| `dialog`                       | [Dialog](#dialog) \| null                         | false    | `null`                 | The dialog to be rendered                                                         |
| `height`                       | number                                            | false    | `600`                  | The height of the chat component                                                  |
| `width`                        | number                                            | false    | `800`                  | The width of the chat component                                                   |
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
i18n = {
  deletedMessage: "This message has been deleted.",
  chatFooterTextareaPlaceholder: "Write a message..",
  chatSearchPlaceholder: "Search room",
  closedRoomMessage: "This chat has been ended.",
};
```

## Events

| Name                  | Detail / Payload                         | Fires when a user                                  |
| --------------------- | ---------------------------------------- | -------------------------------------------------- |
| `add-room`            | -                                        | Clicked the add button on the sidebar              |
| `search-room`         | `{ value }`                              | Changed the input on the searchbox                 |
| `select-action`       | `{ actionType, label, value }`           | Selected an action                                 |
| `load-more-rooms`     | -                                        | Reached the bottom of the room list                |
| `select-room`         | `{ room }`                               | Selected a room in the list                        |
| `load-more-messages`  | -                                        | Reached the top of the message list                |
| `select-suggestion`   | `{ suggestion }`                         | Selected a suggestion in the list                  |
| `select-emoji`        | `{ messageId, currentUserId, emoji }`    | Selected an emoji reaction in picker for a message |
| `reply-to-message`    | `{ messageId, senderId, senderName }`    | Clicked the reply button on a message              |
| `click-reaction`      | `{ reaction }`                           | Clicked an existing emoji reaction on a message    |
| `download-attachment` | `{ attachment }`                         | Clicked the download button on an attachment       |
| `remove-attachment`   | `{ attachment }`                         | Clicked the close button on an attachment          |
| `cancel-reply`        | -                                        | Clicked the close button on the reply message      |
| `select-file`         | `{ file }`                               | Selected a file                                    |
| `send-message`        | `{ roomId, senderId, message, replyTo }` | Clicked the send button on the footer              |
| `click-dialog-button` | `{ event, side }`                        | Clicked a button on a dialog                       |

## Styling

The `--surface-50` to `--surface-950` variables define the primary surface color scale, used across light and dark themes for backgrounds and component surfaces.

| Variable                     | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `--white`                    |                                                   |
| `--black`                    |                                                   |
| `--success`                  |                                                   |
| `--danger`                   |                                                   |
| `--warning`                  |                                                   |
| `--info`                     |                                                   |
| `--surface-50`               |                                                   |
| `--surface-100`              |                                                   |
| `--surface-200`              |                                                   |
| `--surface-300`              |                                                   |
| `--surface-400`              |                                                   |
| `--surface-500`              |                                                   |
| `--surface-600`              |                                                   |
| `--surface-700`              |                                                   |
| `--surface-800`              |                                                   |
| `--surface-900`              |                                                   |
| `--surface-950`              |                                                   |
| `--text`                     | The default text color                            |
| `--border`                   | The default border color                          |
| `--floating-item-border`     | The default border color for floating items       |
| `--floating-item-box-shadow` | The default box shadow for floating items         |
| `--placeholder`              | The default placeholder color                     |
| `--deleted`                  | The default background color for deleted messages |
| `--overlay`                  | The default background color for overlay          |

You can override the component's style using CSS custom properties (variables). These are applied directly to `advanced-chat-kai` element:

```css
advanced-chat-kai {
  --success: green;
  --danger: red;
  --warning: yellow;
  --info: blue;
}
```

All styles are encapsulated in Shadow DOM, so direct CSS selectors from outside will not apply - only CSS variables can be used for styling.

## Contributing

- Bug fix PRs are always welcome.
- UI changes or new features should not be submitted without prior discussion. Please open an issue first to propose and discuss them.

Thanks for your understanding and contributions.

## License

[MIT](./LICENSE)
