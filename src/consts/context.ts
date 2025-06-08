import { FooterContext, MessageContext, RoomContext } from "../contexts";

export const ROOM_CONTEXT_KEYS: (keyof RoomContext)[] = [
  "rooms",
  "selectedRoomId",
  "isLoadingRoom",
  "isLoadingMoreRooms",
  "showRoomAvatar",
  "roomActions",
];

export const MESSAGE_CONTEXT_KEYS: (keyof MessageContext)[] = [
  "messages",
  "suggestions",
  "replyTo",
  "isLoadingMessage",
  "isLoadingMoreMessages",
  "isMarkdownAvailable",
  "myMessageActions",
  "theirMessageActions",
  "isEmojiReactionAvailable",
  "isReplyAvailable",
  "isTyping",
  "showTheirAvatar",
  "alignMyMessagesLeft",
];

export const FOOTER_CONTEXT_KEYS: (keyof FooterContext)[] = [
  "isEmojiPickerAvailable",
  "isMessageAttachmentAvailable",
  "inputMessage",
  "attachments",
  "enterToSend",
];
