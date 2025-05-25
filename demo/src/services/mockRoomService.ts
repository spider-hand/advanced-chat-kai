import type { ChatRoom } from "../../../src/types";
import LitLogo from "../assets/lit.svg";

export const fetchRooms = async (index: number): Promise<ChatRoom[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arr: ChatRoom[] = [];

      for (let i = index; i < index + 10; i++) {
        arr.push({
          id: `room-id-${i}`,
          headerTitle: `Room ${i}`,
          headerSubtitle: `This is room number ${i}`,
          sidebarTitle: `Room ${i}`,
          sidebarSubtitle: `This is room number ${i}`,
          avatar: LitLogo,
          meta: "May 1",
          hasEnded: false,
        });
      }

      resolve(arr);
    }, 3000);
  });
};

export const createRoom = async (index: number): Promise<ChatRoom> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `room-id-${index}`,
        headerTitle: `Room ${index}`,
        headerSubtitle: `This is room number ${index}`,
        sidebarTitle: `Room ${index}`,
        sidebarSubtitle: `This is room number ${index}`,
        avatar: LitLogo,
        meta: "May 1",
        hasEnded: false,
      });
    }, 3000);
  });
};
