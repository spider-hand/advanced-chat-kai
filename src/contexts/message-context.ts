import { createContext } from "@lit/context";
import { ChatAction, ChatMessage, ChatMessageSuggestion } from "../types";

export interface MessageContext {
  messages: ChatMessage[];
  suggestions: ChatMessageSuggestion[];
  isLoadingMessage: boolean;
  isLoadingMoreMessages: boolean;
  isMarkdownAvailable: boolean;
  myMessageActions: ChatAction<string | number | boolean>[];
  theirMessageActions: ChatAction<string | number | boolean>[];
  isEmojiReactionAvailable: boolean;
  isReplyAvailable: boolean;
}

export const messageContext = createContext<MessageContext>("message");
