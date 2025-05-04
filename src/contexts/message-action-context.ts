import { createContext } from "@lit/context";
import { ChatAction } from "../types";

export interface MessageActionContext {
  actions: ChatAction<string | number | boolean>[];
}

export const messageActionContext = createContext<MessageActionContext>("message-action");
