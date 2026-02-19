import type { ChatRoom } from "advanced-chat-kai";

export const formatTimestamp = (date: Date): string => {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
};

export const buildRoom = (roomData: { id: string; latestMessage?: string }): ChatRoom => ({
  id: roomData.id,
  headerTitle: roomData.id,
  headerSubtitle: "",
  sidebarTitle: roomData.id,
  sidebarSubtitle: roomData.latestMessage || "",
  avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${roomData.id}`,
  meta: "",
  hasEnded: false,
});
