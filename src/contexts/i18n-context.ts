import { createContext } from "@lit/context";
import { I18nType } from "../types";

export interface I18nContext {
  i18n: I18nType;
}

export const i18nContext = createContext<I18nContext>("i18n");
