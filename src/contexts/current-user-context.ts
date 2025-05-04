import { createContext } from "@lit/context";
import { ChatUser } from "../types";

export const currentUserContext = createContext<ChatUser>("current-user");
