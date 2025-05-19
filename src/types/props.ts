import { defaultI18n } from "../consts";

export type ChatActionType = "room" | "message";

export interface ChatAction<T extends string | number | boolean> {
  label: string;
  value: T;
}

export type VariantType = "success" | "danger" | "warning" | "info";

export interface ChatRoom {
  id: string;
  title: string;
  subtitle: string;
  avatar?: string;
  meta: string;
  badge?: {
    type: VariantType;
    label: string;
  };
  hasEnded: boolean;
}

export type ChatItemType = ChatMessage | ChatDivider;

export interface ChatMessage {
  id: string;
  type: "message";
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  reactions: Map<string, Set<string>>;
  attachments: ChatMessageAttachment[];
  isDeleted: boolean;
  isSelected: boolean;
  replyTo: ChatMessage | null;
}

export interface ChatDivider {
  id: string;
  type: "divider";
  content: string;
}

export interface ChatMessageAttachment {
  id: string;
  name: string;
  meta: string;
}

export interface ChatMessageSuggestion {
  text: string;
  value: string;
}

export interface Dialog {
  event: string;
  body: string;
  leftButton: {
    text: string;
    variant?: VariantType;
  };
  rightButton: {
    text: string;
    variant?: VariantType;
  };
}

export type I18nType = typeof defaultI18n;
export type PartialI18nType = Partial<I18nType>;

export type ThemeType = "light" | "dark";

export interface AdvancedChatKaiProps {
  currentUserId: string | null;
  rooms: ChatRoom[];
  messages: ChatItemType[];
  attachments: ChatMessageAttachment[];
  suggestions: ChatMessageSuggestion[];
  selectedRoomId: string | null;
  isLoadingRoom: boolean;
  isLoadingMessage: boolean;
  isLoadingMoreRooms: boolean;
  isLoadingMoreMessages: boolean;
  inputMessage?: string;
  roomActions: ChatAction<string | number | boolean>[];
  myMessageActions: ChatAction<string | number | boolean>[];
  theirMessageActions: ChatAction<string | number | boolean>[];
  isMobile: boolean;
  isSingleRoom: boolean;
  isEmojiPickerAvailable: boolean;
  isEmojiReactionAvailable: boolean;
  isMessageAttachmentAvailable: boolean;
  isReplyAvailable: boolean;
  isMarkdownAvailable: boolean;
  isTyping: boolean;
  showRoomAvatar: boolean;
  showTheirAvatar: boolean;
  dialog: Dialog | null;
  height: number;
  i18n?: PartialI18nType;
  theme?: ThemeType;
}
