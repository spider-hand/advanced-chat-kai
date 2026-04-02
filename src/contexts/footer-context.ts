import { createContext } from "@lit/context";
import { ChatMessageAttachment, FooterOption } from "../types";

export interface FooterContext {
  isEmojiPickerAvailable: boolean;
  isMessageAttachmentAvailable: boolean;
  inputMessage: string;
  attachments: ChatMessageAttachment[];
  enterToSend: boolean;
  footerOptions: FooterOption<string | number | boolean>[];
}

export const footerContext = createContext<FooterContext>("footer");
