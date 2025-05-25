import {
  ChatMessageAttachment,
  ChatMessageReply,
  ChatMessageSuggestion,
  ChatRoom,
} from "./props";

export interface SelectRoomActionDetail<T extends string | number | boolean> {
  label: string;
  value: T;
  roomId: string;
}

export interface SelectMessageActionDetail<
  T extends string | number | boolean,
> {
  label: string;
  value: T;
  messageId: string;
}

export interface SearchRoomDetail {
  value: string;
}

export interface SelecteEmojiDetail {
  messageId: string;
  currentUserId: string | null;
  emoji: string;
}

export interface SendMessageDetail {
  roomId: string;
  senderId: string | null;
  content: string;
}

export interface SelectFileDetail {
  file: File;
}

export interface ReplyToMessageDetail {
  replyTo: ChatMessageReply;
}

export interface SelectRoomDetail {
  room: ChatRoom;
}

export interface SelectSuggestionDetail {
  suggestion: ChatMessageSuggestion;
}

export interface ClickReactionDetail {
  messageId: string;
  reaction: {
    emoji: string;
    users: Set<string>;
  };
}

export interface RemoveAttachmentDetail {
  attachment: ChatMessageAttachment;
}

export interface DownloadAttachmentDetail {
  attachment: ChatMessageAttachment;
}

export interface ClickDialogButtonDetail {
  event: string;
  side: "left" | "right";
}
