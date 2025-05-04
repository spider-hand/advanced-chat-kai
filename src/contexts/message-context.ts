import { createContext } from "@lit/context";
import { ChatMessage, ChatMessageSuggestion } from "../types";

export interface MessageContext {
  messages: ChatMessage[];
  suggestions: ChatMessageSuggestion[];
  isLoadingMessage: boolean;
  isLoadingMoreMessages: boolean;
}

export const messageContext = createContext<MessageContext>("message");
