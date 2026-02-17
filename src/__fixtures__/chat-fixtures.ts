import type {
  AdvancedChatKaiProps,
  ChatMessageAttachment,
  ChatMessageReply,
  ChatMessageSuggestion,
  ChatRoom,
  ChatItemType,
  Dialog,
  I18nType,
} from "../types";

export const rooms: ChatRoom[] = [
  {
    id: "support-ticket-1234",
    headerTitle: "Support: Order #1234",
    headerSubtitle: "Shipping inquiry",
    sidebarTitle: "Order #1234",
    sidebarSubtitle: "Shipping inquiry",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CS",
    meta: "2 min ago",
    badge: { label: "Active", type: "success" },
    hasEnded: false,
  },
  {
    id: "team-chat",
    headerTitle: "Engineering Team",
    headerSubtitle: "5 members",
    sidebarTitle: "Engineering Team",
    sidebarSubtitle: "Alex: Let's sync up tomorrow",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ET",
    meta: "1 hour ago",
    badge: { label: "3", type: "info" },
    hasEnded: false,
  },
  {
    id: "sales-lead",
    headerTitle: "Acme Corp",
    headerSubtitle: "Enterprise lead",
    sidebarTitle: "Acme Corp",
    sidebarSubtitle: "Thanks for the proposal!",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AC",
    meta: "Yesterday",
    hasEnded: false,
  },
  {
    id: "urgent-ticket",
    headerTitle: "Support: Payment Failed",
    headerSubtitle: "Urgent",
    sidebarTitle: "Payment Failed",
    sidebarSubtitle: "Customer unable to checkout",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PF",
    meta: "30 min ago",
    badge: { label: "Urgent", type: "warning" },
    hasEnded: false,
  },
  {
    id: "closed-ticket",
    headerTitle: "Support: Refund Request",
    headerSubtitle: "Resolved",
    sidebarTitle: "Refund Request",
    sidebarSubtitle: "Issue resolved",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RR",
    meta: "3 days ago",
    badge: { label: "Closed", type: "danger" },
    hasEnded: true,
  },
];

export const messages: ChatItemType[] = [
  {
    id: "divider-today",
    type: "divider",
    roomId: "support-ticket-1234",
    content: "Today",
  },
  {
    id: "msg-1",
    type: "message",
    roomId: "support-ticket-1234",
    senderId: "customer-jane",
    senderName: "Jane Smith",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    content: "Hi! I placed an order yesterday but haven't received a tracking number yet. Order #1234.",
    timestamp: "10:23 AM",
    reactions: new Map(),
    attachments: [],
    isDeleted: false,
    isSelected: false,
    replyTo: null,
  },
  {
    id: "msg-2",
    type: "message",
    roomId: "support-ticket-1234",
    senderId: "current-user-id",
    senderName: "Support Agent",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agent",
    content: "Hello Jane! Let me look into that for you. One moment please.",
    timestamp: "10:25 AM",
    reactions: new Map([["👍", new Set(["customer-jane"])]]),
    attachments: [],
    isDeleted: false,
    isSelected: false,
    replyTo: null,
  },
  {
    id: "msg-3",
    type: "message",
    roomId: "support-ticket-1234",
    senderId: "current-user-id",
    senderName: "Support Agent",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agent",
    content: "I found your order! It shipped this morning. Here's your tracking information:",
    timestamp: "10:27 AM",
    reactions: new Map(),
    attachments: [
      {
        id: "tracking-doc",
        name: "tracking-info.pdf",
        meta: "145 KB",
      },
    ],
    isDeleted: false,
    isSelected: false,
    replyTo: null,
  },
  {
    id: "msg-4",
    type: "message",
    roomId: "support-ticket-1234",
    senderId: "customer-jane",
    senderName: "Jane Smith",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    content: "That's great, thank you so much! 🎉",
    timestamp: "10:28 AM",
    reactions: new Map([
      ["❤️", new Set(["current-user-id", "team-member-1"])],
      ["🎉", new Set(["current-user-id", "team-member-1", "team-member-2"])],
      ["👏", new Set(["team-member-2"])],
    ]),
    attachments: [],
    isDeleted: false,
    isSelected: false,
    replyTo: null,
  },
];

export const messageWithReply: ChatItemType = {
  id: "reply-msg",
  type: "message",
  roomId: "support-ticket-1234",
  senderId: "current-user-id",
  senderName: "Support Agent",
  senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agent",
  content: "Yes, that tracking number is correct!",
  timestamp: "10:30 AM",
  reactions: new Map(),
  attachments: [],
  isDeleted: false,
  isSelected: false,
  replyTo: {
    id: "msg-4",
    type: "message",
    roomId: "support-ticket-1234",
    senderId: "customer-jane",
    senderName: "Jane Smith",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    content: "Is this tracking number correct?",
    timestamp: "10:29 AM",
    reactions: new Map(),
    attachments: [],
    isDeleted: false,
    isSelected: false,
  },
};

export const messageWithImages: ChatItemType = {
  id: "image-msg",
  type: "message",
  roomId: "support-ticket-1234",
  senderId: "customer-jane",
  senderName: "Jane Smith",
  senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  content: "Here are the screenshots of the issue:",
  timestamp: "10:31 AM",
  reactions: new Map(),
  attachments: [
    {
      id: "screenshot-1",
      name: "error-screen.png",
      meta: "1.2 MB",
      imageUrl: "https://placehold.co/400x300/e2e8f0/64748b?text=Screenshot+1",
    },
    {
      id: "screenshot-2",
      name: "console-log.png",
      meta: "890 KB",
      imageUrl: "https://placehold.co/400x300/e2e8f0/64748b?text=Screenshot+2",
    },
  ],
  isDeleted: false,
  isSelected: false,
  replyTo: null,
};

export const attachments: ChatMessageAttachment[] = [
  { id: "att-1", name: "invoice.pdf", meta: "256 KB" },
  { id: "att-2", name: "photo.jpg", meta: "1.8 MB", imageUrl: "https://placehold.co/200x150/e2e8f0/64748b?text=Photo" },
];

export const suggestions: ChatMessageSuggestion[] = [
  { text: "Check order status", value: "check-status" },
  { text: "Request refund", value: "request-refund" },
  { text: "Talk to agent", value: "talk-agent" },
];

export const replyTo: ChatMessageReply = {
  id: "msg-1",
  type: "message",
  roomId: "support-ticket-1234",
  senderId: "customer-jane",
  senderName: "Jane Smith",
  senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  content: "Hi! I placed an order yesterday but haven't received a tracking number yet.",
  timestamp: "10:23 AM",
  reactions: new Map(),
  attachments: [],
  isDeleted: false,
  isSelected: false,
};

export const confirmDialog: Dialog = {
  event: "close-conversation",
  body: "Are you sure you want to close this conversation? The customer will be notified.",
  leftButton: { text: "Cancel" },
  rightButton: { text: "Close", variant: "danger" },
};

export const localizedText: I18nType = {
  DELETED_MESSAGE: "このメッセージは削除されました",
  CHAT_SEARCH_PLACEHOLDER: "会話を検索...",
  CHAT_FOOTER_TEXTAREA_PLACEHOLDER: "メッセージを入力...",
  CLOSED_ROOM_MESSAGE: "この会話は終了しました",
  NEW_MESSAGE_NOTIFICATION: "新着メッセージがあります",
};

const baseProps: Partial<AdvancedChatKaiProps> = {
  currentUserId: "current-user-id",
  height: "600px",
  width: "900px",
  theme: "light",
  showRoomAvatar: true,
  showTheirAvatar: true,
  isEmojiPickerAvailable: true,
  isEmojiReactionAvailable: true,
  isReplyAvailable: true,
  isMessageAttachmentAvailable: true,
};

/** Standard chat with active conversation */
export const activeChat: AdvancedChatKaiProps = {
  ...baseProps,
  rooms,
  messages,
  selectedRoomId: "support-ticket-1234",
};

/** Empty state */
export const emptyState: AdvancedChatKaiProps = {
  ...baseProps,
  rooms: [],
  messages: [],
  selectedRoomId: null,
};

/** Loading state */
export const loadingState: AdvancedChatKaiProps = {
  ...baseProps,
  rooms: [],
  messages: [],
  isLoadingRoom: true,
  isLoadingMessage: true,
};

/** Mobile layout */
export const mobileLayout: AdvancedChatKaiProps = {
  ...activeChat,
  isMobile: true,
  width: "375px",
  height: "667px",
};

/** Single room mode */
export const singleRoomMode: AdvancedChatKaiProps = {
  ...activeChat,
  isSingleRoom: true,
  width: "600px",
};

