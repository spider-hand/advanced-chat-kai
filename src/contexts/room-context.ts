import { createContext } from "@lit/context";
import { ChatRoom } from "../types";

export interface RoomContext {
  rooms: ChatRoom[];
  selectedRoomId: string | null;
  isLoadingRoom: boolean;
  isLoadingMoreRooms: boolean;
}

export const roomContext = createContext<RoomContext>("room");
