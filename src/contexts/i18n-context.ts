import { createContext } from "@lit/context";
import { defaultI18n } from "../consts/index";

export interface I18nContext {
  i18n: typeof defaultI18n;
}

export const i18nContext = createContext<I18nContext>("i18n");
