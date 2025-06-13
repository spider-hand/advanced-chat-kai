import { createContext } from "@lit/context";
import { ChatAction, ChatRoom } from "../types";

export interface RoomContext {
  rooms: ChatRoom[];
  selectedRoomId: string | null;
  isLoadingRoom: boolean;
  isLoadingMoreRooms: boolean;
  showRoomAvatar: boolean;
  roomActions: ChatAction<string | number | boolean>[];
}

export const roomContext = createContext<RoomContext>("room");
