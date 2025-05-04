import { createContext } from "@lit/context";
import { ChatMessageAttachment } from "../types";

export interface MessageAttachmentContext {
  attachments: ChatMessageAttachment[];
}

export const messageAttachmentContext =
  createContext<MessageAttachmentContext>("message-attachment");
