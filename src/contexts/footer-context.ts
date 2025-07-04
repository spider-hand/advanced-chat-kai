import { createContext } from "@lit/context";
import { ChatMessageAttachment } from "../types";

export interface FooterContext {
  isEmojiPickerAvailable: boolean;
  isMessageAttachmentAvailable: boolean;
  inputMessage: string;
  attachments: ChatMessageAttachment[];
  enterToSend: boolean;
}

export const footerContext = createContext<FooterContext>("footer");
