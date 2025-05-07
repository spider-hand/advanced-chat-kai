import { createContext } from "@lit/context";

export interface FooterContext {
  isEmojiPickerAvailable: boolean;
  isMessageAttachmentAvailable: boolean;
}

export const footerContext = createContext<FooterContext>("footer");
