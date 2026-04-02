# advanced-chat-kai

<img alt="light" src="https://github.com/user-attachments/assets/c7efa2e4-c7f5-4a83-968c-cbc0b0fea91f" />
<img alt="dark" src="https://github.com/user-attachments/assets/b547b8b6-2154-4334-8f5d-16fb2c8e264c"" />

![npm version](https://img.shields.io/npm/v/advanced-chat-kai) ![npm downloads](https://img.shields.io/npm/dm/advanced-chat-kai) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/advanced-chat-kai) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![codecov](https://codecov.io/gh/spider-hand/advanced-chat-kai/graph/badge.svg?token=ETHZJ2CTPF)](https://codecov.io/gh/spider-hand/advanced-chat-kai) ![Lit](https://img.shields.io/badge/lit-%23324FFF.svg?&logo=lit&logoColor=white)

[English](./README.md) | [简体中文](./README.zh-CN.md)

一个高度可定制的聊天 Web Component，可轻松与 shadcn 集成，并可用于任何框架（React、Vue、Angular、Svelte 等）。

> "Kai"（改）在日语中表示“改进”。这个项目受到 vue-advanced-chat 的启发，目标是构建一个更好的替代方案。

## 功能特性

- **框架无关** - 可用于任何前端框架
- **后端无关** - 不对你的后端做任何假设
- **轻量** - 基于 Lit 构建，包体积小且性能高
- **无业务逻辑** - 组件只负责 UI
- **主题化** - 提供浅色和深色主题，并支持 CSS 变量，便于与基于 shadcn 的 UI 一起使用

### 对比

|                   | 包体积（压缩后） | 包体积（压缩后 + gzip） | 下载时间（慢速 3G） | 下载时间（4G） |
| ----------------- | ---------------- | ----------------------- | ------------------- | -------------- |
| advanced-chat-kai | 112.9kB          | 23.1kB                  | 465ms               | 27ms           |
| vue-advanced-chat | 493.4kB          | 149.8kB                 | 3s                  | 171ms          |
|                   | 📦 **小 77%**    | 📦 **小 84%**           | ⚡️ **快 85%**       | ⚡️ **快 84%**  |

## 演示

👉 [Storybook](https://main--6810a95e2c6e78e3e3be0658.chromatic.com)

👉 [Live Chat Example](https://advanced-chat-kai-demo.pages.dev)

## 目录

- [安装](#安装)
- [用法](#用法)
- [Props](#props)
- [事件](#事件)
- [样式](#样式)
- [贡献](#贡献)
- [许可证](#许可证)

## 安装

```
npm install advanced-chat-kai
```

## 用法

```html
<advanced-chat-kai></advanced-chat-kai>
```

## Props

| 名称                           | 类型                                              | 必填 | 默认值                 | 说明                                  |
| ------------------------------ | ------------------------------------------------- | ---- | ---------------------- | ------------------------------------- |
| `currentUserId`                | string \| null                                    | 否   | `null`                 | 当前使用聊天组件的用户 ID             |
| `rooms`                        | [ChatRoom](#chatroom)[]                           | 否   | `[]`                   | 侧边栏中显示的聊天室列表              |
| `messages`                     | [ChatItemType](#chatitemtype)[]                   | 否   | `[]`                   | 当前选中聊天室中的消息列表            |
| `attachments`                  | [ChatMessageAttachment](#chatmessageattachment)[] | 否   | `[]`                   | 消息中的附件列表                      |
| `suggestions`                  | [ChatMessageSuggestion](#chatmessagesuggestion)[] | 否   | `[]`                   | 消息建议列表                          |
| `replyTo`                      | [ChatMessageReply](#chatmessagereply) \| null     | 否   | `null`                 | 当前正在回复的消息                    |
| `selectedRoomId`               | string \| null                                    | 否   | `null`                 | 当前选中的聊天室 ID                   |
| `isLoadingRoom`                | boolean                                           | 否   | `false`                | 初始聊天室列表是否正在加载            |
| `isLoadingMessage`             | boolean                                           | 否   | `false`                | 初始消息列表是否正在加载              |
| `isLoadingMoreRooms`           | boolean                                           | 否   | `false`                | 是否正在加载更多聊天室                |
| `isLoadingMoreMessages`        | boolean                                           | 否   | `false`                | 是否正在加载更多消息                  |
| `inputMessage`                 | string                                            | 否   | `""`                   | 当前消息输入框的值，用于双向绑定      |
| `footerOptions`                | [FooterOption<ChatActionType>](#footeroption)[]   | 否   | `[]`                   | 页脚选择框可用的选项列表              |
| `roomActions`                  | [ChatAction<ChatActionType>](#chataction)[]       | 否   | `[]`                   | 聊天室可用的操作列表                  |
| `myMessageActions`             | [ChatAction<ChatActionType>](#chataction)[]       | 否   | `[]`                   | 当前用户消息可用的操作列表            |
| `theirMessageActions`          | [ChatAction<ChatActionType>](#chataction)[]       | 否   | `[]`                   | 其他用户消息可用的操作列表            |
| `isMobile`                     | boolean                                           | 否   | `false`                | 是否以移动端模式渲染聊天组件          |
| `isSingleRoom`                 | boolean                                           | 否   | `false`                | 是否隐藏侧边栏和切换按钮              |
| `isEmojiPickerAvailable`       | boolean                                           | 否   | `true`                 | 是否显示页脚中的 emoji 选择器         |
| `isEmojiReactionAvailable`     | boolean                                           | 否   | `true`                 | 是否显示消息上的 emoji reaction 按钮  |
| `isReplyAvailable`             | boolean                                           | 否   | `true`                 | 是否显示消息上的回复按钮              |
| `isMessageAttachmentAvailable` | boolean                                           | 否   | `true`                 | 是否显示页脚中的消息附件按钮          |
| `isMarkdownAvailable`          | boolean                                           | 否   | `false`                | 是否启用 markdown 消息渲染            |
| `isTyping`                     | boolean                                           | 否   | `false`                | 是否显示输入中指示器                  |
| `showRoomAvatar`               | boolean                                           | 否   | `true`                 | 是否显示聊天室列表中的头像            |
| `showTheirAvatar`              | boolean                                           | 否   | `true`                 | 是否显示其他用户消息上的头像          |
| `alignMyMessagesLeft`          | boolean                                           | 否   | `false`                | 我的消息是否左对齐                    |
| `enterToSend`                  | boolean                                           | 否   | `false`                | 是否按下回车键就发送消息              |
| `timestampFormatter`           | ((date: Date) => string) \| null                  | 否   | `null`                 | 自定义 Date 时间戳格式化函数          |
| `dialog`                       | [Dialog](#dialog) \| null                         | 否   | `null`                 | 要渲染的对话框                        |
| `height`                       | string                                            | 否   | `"60em"`               | 聊天组件的高度                        |
| `width`                        | string                                            | 否   | `"80em"`               | 聊天组件的宽度                        |
| `i18n`                         | [PartialI18nType](#i18ntype)                      | 否   | [见下方](#i18ntype)    | 用于翻译的 i18n 对象                  |
| `theme`                        | ThemeType                                         | 否   | `"light"`              | 聊天组件的主题，必须是 `light` 或 `dark` |

### 接口

##### ChatRoom

说明：

- 如果 `hasEnded` 为 true 且 `selectedRoomId` 与该房间的 `id` 匹配，则页脚会被隐藏。

示例：

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

说明：

- `type` 必须是 `divider` 或 `message`。
- `timestamp` 可以是字符串（原样显示）或 Date 对象（使用 `timestampFormatter` 或默认的 Intl 格式化）。
- `reactions` 表示 emoji reactions，以及对每个 emoji 做出反应的用户 ID 列表。
- `isSelected` 可用于标识某个操作（例如编辑）当前是否在该消息上处于激活状态。

示例：

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
    timestamp: "12:34 PM", // 或 new Date()
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

示例：

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

示例：

```js
suggestions = [
  {
    text: "Hello",
    value: "hello",
  },
];
```

##### ChatMessageReply

示例：

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

示例：

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

##### FooterOption

示例：

```js
footerOptions = [
  {
    label: "Insert template",
    value: "insert-template",
    default: true,
  },
  {
    label: "Assign conversation",
    value: "assign-conversation",
  },
];
```

##### Dialog

示例：

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

默认值如下。你只需要覆盖想自定义的字段即可。

```js
const DEFAULT_I18N = {
  DELETED_MESSAGE: "This message has been deleted.",
  CHAT_FOOTER_TEXTAREA_PLACEHOLDER: "Write a message..",
  CHAT_SEARCH_PLACEHOLDER: "Search room",
  CLOSED_ROOM_MESSAGE: "This chat has been ended.",
  NEW_MESSAGE_NOTIFICATION: "New messages",
};
```

### ⚠️ 关于更新数组和对象的说明

Lit 使用浅比较来检测响应式属性的变化。处理数组或对象时，你必须赋予一个新的引用才能触发更新。直接修改原对象或原数组（例如使用 `push()` 或直接修改某个属性）不会让组件更新。

✅ 正确：

```ts
this.messages = [...this.messages, newMessage];
```

❌ 无效：

```ts
this.messages.push(newMessage);
```

## 事件

| 名称                    | Detail / Payload                         | 用户在以下情况下触发                         |
| ----------------------- | ---------------------------------------- | -------------------------------------------- |
| `add-room`              | -                                        | 点击侧边栏中的添加按钮                       |
| `search-room`           | `{ value }`                              | 修改搜索框输入内容                           |
| `select-room-action`    | `{ label, value, roomId }`               | 选择房间上的某个操作                         |
| `load-more-rooms`       | -                                        | 滚动到房间列表底部                           |
| `select-room`           | `{ room }`                               | 在列表中选择某个房间                         |
| `load-more-messages`    | -                                        | 滚动到消息列表顶部                           |
| `select-message-action` | `{ label, value, messageId }`            | 选择消息上的某个操作                         |
| `select-footer-option`  | `{ label, value, roomId }`               | 选择页脚选择框中的某个选项                   |
| `select-suggestion`     | `{ suggestion }`                         | 选择建议列表中的某项                         |
| `select-emoji`          | `{ messageId, currentUserId, emoji }`    | 在消息的选择器中选择一个 emoji reaction      |
| `reply-to-message`      | `{ replyTo }`                            | 点击消息上的回复按钮                         |
| `click-reaction`        | `{ messageId, reaction }`                | 点击消息上已有的 emoji reaction              |
| `download-attachment`   | `{ attachment }`                         | 点击附件上的下载按钮                         |
| `remove-attachment`     | `{ attachment }`                         | 点击附件上的关闭按钮                         |
| `cancel-reply`          | -                                        | 点击回复消息上的关闭按钮，或发送带回复的消息 |
| `select-file`           | `{ file }`                               | 选择文件                                     |
| `send-message`          | `{ roomId, senderId, content, replyTo }` | 点击页脚中的发送按钮                         |
| `click-dialog-button`   | `{ event, side }`                        | 点击对话框中的按钮                           |

## 样式

CSS 变量名称基于 [shadcn](https://ui.shadcn.com/docs/theming) 设计系统和 [Tailwind CSS](https://tailwindcss.com/docs/customizing-spacing) 的 spacing/typography 规范，并统一使用 `--chat-` 前缀。你可以通过覆盖这些变量来自定义聊天组件的外观。

### 颜色变量

| 变量                            |
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

### 字体大小变量

| 变量               | 默认值     |
| ------------------ | ---------- |
| `--chat-text-xs`   | `0.75rem`  |
| `--chat-text-sm`   | `0.875rem` |
| `--chat-text-base` | `1rem`     |
| `--chat-text-lg`   | `1.125rem` |
| `--chat-text-xl`   | `1.25rem`  |

### 圆角变量

| 变量                 | 默认值     |
| -------------------- | ---------- |
| `--chat-radius-sm`   | `0.125rem` |
| `--chat-radius`      | `0.25rem`  |
| `--chat-radius-md`   | `0.375rem` |
| `--chat-radius-lg`   | `0.5rem`   |
| `--chat-radius-xl`   | `0.75rem`  |
| `--chat-radius-2xl`  | `1rem`     |
| `--chat-radius-3xl`  | `1.5rem`   |
| `--chat-radius-full` | `9999px`   |

### 间距变量

| 变量                 | 默认值     |
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

### 阴影变量

| 变量                | 默认值                                                                |
| ------------------- | --------------------------------------------------------------------- |
| `--chat-shadow-2xs` | `0 1px rgb(0 0 0 / 0.05)`                                             |
| `--chat-shadow-xs`  | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                       |
| `--chat-shadow-sm`  | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`       |
| `--chat-shadow-md`  | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`    |
| `--chat-shadow-lg`  | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`  |
| `--chat-shadow-xl`  | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `--chat-shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)`                                 |

### 自定义变量

| 变量                             | 说明                   |
| -------------------------------- | ---------------------- |
| `--chat-base-font-size`          | 聊天组件的基础字体大小 |
| `--chat-message-mine`            | 我的消息背景色         |
| `--chat-message-mine-foreground` | 我的消息文字/图标颜色  |
| `--chat-success`                 | 成功徽章背景色         |
| `--chat-success-foreground`      | 成功徽章文字颜色       |
| `--chat-danger`                  | 危险徽章背景色         |
| `--chat-danger-foreground`       | 危险徽章文字颜色       |
| `--chat-warning`                 | 警告徽章背景色         |
| `--chat-warning-foreground`      | 警告徽章文字颜色       |
| `--chat-info`                    | 信息徽章背景色         |
| `--chat-info-foreground`         | 信息徽章文字颜色       |
| `--chat-overlay-subtle`          | 轻微遮罩（5% 不透明度） |
| `--chat-overlay-light`           | 浅遮罩（8% 不透明度）   |
| `--chat-overlay`                 | 默认遮罩（10% 不透明度）|
| `--chat-overlay-medium`          | 中等遮罩（15% 不透明度）|
| `--chat-overlay-heavy`           | 重遮罩（50% 不透明度）  |

### 用法

你可以使用 CSS 自定义属性（变量）覆盖组件样式。这些变量直接应用在 `advanced-chat-kai` 元素上：

```css
advanced-chat-kai {
  --chat-primary: oklch(0.65 0.24 15);
  --chat-primary-foreground: oklch(1 0 0);
  --chat-message-mine: oklch(0.65 0.24 15);
  --chat-message-mine-foreground: oklch(1 0 0);
}
```

所有样式都封装在 Shadow DOM 中，因此外部的直接 CSS 选择器不会生效，只有 CSS 变量可用于样式定制。

## 贡献

- 始终欢迎提交修复 bug 的 PR。
- UI 变更或新功能在未事先讨论前请不要直接提交。请先创建 issue 进行提案和讨论。

感谢你的理解与贡献。

## 许可证

[MIT](./LICENSE)
