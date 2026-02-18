import type { ChatRoom } from "advanced-chat-kai";

export const formatTimestamp = (isoString: string): string => {
  const date = new Date(isoString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
};

export const convertReactionsFromFirebase = (
  reactions: Record<string, string[]> | null
): Map<string, Set<string>> => {
  const map = new Map<string, Set<string>>();
  if (reactions) {
    for (const [emoji, users] of Object.entries(reactions)) {
      map.set(emoji, new Set(users));
    }
  }
  return map;
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
