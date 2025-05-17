import {
  ChatActionType,
  ChatMessageAttachment,
  ChatMessageSuggestion,
  ChatRoom,
} from "./props";

export interface SelectActionDetail<T extends string | number | boolean> {
  actionType: ChatActionType;
  label: string;
  value: T;
}

export interface SearchRoomDetail {
  value: string;
}

export interface SelecteEmojiDetail {
  messageId: string;
  currentUserId: string;
  emoji: string;
}

export interface SendMessageDetail {
  roomId: string;
  senderId: string;
  message: string;
  replyTo: string | null;
}

export interface SelectFileDetail {
  file: File;
}

export interface ReplyToMessageDetail {
  messageId: string;
  senderId: string;
  senderName: string;
}

export interface SelectRoomDetail {
  room: ChatRoom;
}

export interface SelectSuggestionDetail {
  suggestion: ChatMessageSuggestion;
}

export interface ClickReactionDetail {
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
