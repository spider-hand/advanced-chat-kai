import { createContext } from "@lit/context";
import { ChatAction } from "../types";

export interface MessageActionContext {
  myMessageActions: ChatAction<string | number | boolean>[];
  theirMessageActions: ChatAction<string | number | boolean>[];
}

export const messageActionContext = createContext<MessageActionContext>("message-action");
