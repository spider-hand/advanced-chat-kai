import type {
  ChatItemType,
  ChatMessage,
  ChatMessageAttachment,
  ChatMessageReply,
} from "../../../src/types";
import LitLogo from "../assets/lit.svg";

export const fetchMessages = async (
  roomId: string,
  index: number,
): Promise<ChatItemType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arr: ChatItemType[] = [];

      for (let i = index; i < index + 10; i++) {
        arr.push({
          id: `message-id-${i}`,
          type: "message",
          roomId,
          senderId: `user-id-${i}`,
          senderName: `User ${i}`,
          senderAvatar: LitLogo,
          content: `This is message number ${i}`,
          timestamp: "12:34 PM",
          reactions: new Map<string, Set<string>>(),
          attachments: [],
          isDeleted: false,
          isSelected: false,
          replyTo: null,
        });
      }

      resolve(arr);
    }, 3000);
  });
};

export const createMessage = async (
  roomId: string,
  index: number,
  senderId: string,
  content: string,
  attachments: ChatMessageAttachment[],
  replyTo: ChatMessageReply | null,
): Promise<ChatMessage> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `message-id-${index}`,
        type: "message",
        roomId,
        senderId: senderId,
        senderName: `User ${index}`,
        senderAvatar: LitLogo,
        content: content,
        timestamp: "12:34 PM",
        reactions: new Map<string, Set<string>>(),
        attachments: attachments,
        isDeleted: false,
        isSelected: false,
        replyTo: replyTo,
      });
    }, 100);
  });
};
