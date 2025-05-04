import { createContext } from "@lit/context";
import { ChatAction } from "../types";

export interface RoomActionContext {
  actions: ChatAction<string | number | boolean>[];
}

export const roomActionContext =
  createContext<RoomActionContext>("room-action");
