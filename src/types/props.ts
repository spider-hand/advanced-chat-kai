import { defaultI18n } from "../consts";

export type ChatActionType = "room" | "message";

export interface ChatAction<T extends string | number | boolean> {
  label: string;
  value: T;
}

export type BadgeType = "success" | "danger" | "warning" | "info";

export interface ChatRoom {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  badge?: {
    type: BadgeType;
    label: string;
  };
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  reactions: Map<string, Set<string>>;
  attachments: ChatMessageAttachment[];
  isDeleted: boolean;
  replyTo: ChatMessage | null;
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

export interface ChatUser {
  id: string;
}

export type I18nType = typeof defaultI18n;
export type PartialI18nType = Partial<I18nType>;

export type ThemeType = "light" | "dark";

export interface AdvancedChatKaiProps {
  currentUser: ChatUser;
  rooms: ChatRoom[];
  messages: ChatMessage[];
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
  height: number;
  i18n?: PartialI18nType;
  theme?: ThemeType;
}
