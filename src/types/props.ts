export type ChatActionType = "room" | "chat" | "message";

export interface ChatAction<T extends string | number | boolean> {
  label: string;
  value: T;
}

export interface ChatRoom {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
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
  name: string;
}

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
  roomActions: ChatAction<string | number | boolean>[];
  myMessageActions: ChatAction<string | number | boolean>[];
  theirMessageActions: ChatAction<string | number | boolean>[];
  isMobile: boolean;
  height: number;
}
