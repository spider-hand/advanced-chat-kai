import { createContext } from "@lit/context";
import {
  ChatAction,
  ChatItemType,
  ChatMessageReply,
  ChatMessageSuggestion,
} from "../types";

export interface MessageContext {
  messages: ChatItemType[];
  suggestions: ChatMessageSuggestion[];
  replyTo: ChatMessageReply | null;
  isLoadingMessage: boolean;
  isLoadingMoreMessages: boolean;
  isMarkdownAvailable: boolean;
  myMessageActions: ChatAction<string | number | boolean>[];
  theirMessageActions: ChatAction<string | number | boolean>[];
  isEmojiReactionAvailable: boolean;
  isReplyAvailable: boolean;
  isTyping: boolean;
  showTheirAvatar: boolean;
}

export const messageContext = createContext<MessageContext>("message");
