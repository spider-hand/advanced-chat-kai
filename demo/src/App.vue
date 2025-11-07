<template>
  <div>
    <div>
      <span>Current User: {{ currentUserId }}</span>
      <button @click="switchUser">
        Switch to User {{ currentUserId === "1" ? "2" : "1" }}
      </button>
      <span>Theme: {{ theme }}</span>
      <button @click="toggleTheme">
        Switch to {{ theme === "light" ? "dark" : "light" }}
      </button>
    </div>
    <advanced-chat-kai .currentUserId="currentUserId" .rooms="filteredRooms" .messages="messages" .theme="theme"
      .replyTo="replyTo" .selectedRoomId="selectedRoomId" .isLoadingRoom="isLoadingRoom"
      .isLoadingMoreRooms="isLoadingMoreRooms" .isLoadingMessage="isLoadingMessage"
      .isLoadingMoreMessages="isLoadingMoreMessages" .inputMessage="inputMessage" .roomActions="ROOM_ACTIONS"
      .myMessageActions="MY_MESSAGE_ACTIONS" .theirMessageActions="THEIR_MESSAGE_ACTIONS" @add-room="addRoom"
      @search-room="searchRoom" @load-more-rooms="loadMoreRooms" @select-room="selectRoom"
      @load-more-messages="loadMoreMessages" @select-message-action="selectMessageAction" @select-emoji="selectEmoji"
      @reply-to-message="replyToMessage" @cancel-reply="cancelReply" @click-reaction="clickReaction"
      @send-message="sendMessage"></advanced-chat-kai>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import "advanced-chat-kai";
import type {
  ChatAction,
  ChatItemType,
  ChatMessage,
  ChatMessageReply,
  ChatRoom,
  ClickReactionDetail,
  ReplyToMessageDetail,
  SearchRoomDetail,
  SelectEmojiDetail,
  SelectMessageActionDetail,
  SelectRoomDetail,
  SendMessageDetail,
  ThemeType,
} from "advanced-chat-kai";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref as dbRef,
  set,
  get,
  push,
  query,
  orderByKey,
  limitToLast,
  endBefore,
  update,
  onValue,
  type Unsubscribe,
} from "firebase/database";
import LitLogo from "./assets/lit.svg";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/// Constants
const ROOM_ACTIONS: ChatAction<string>[] = [
  {
    label: "Delete",
    value: "delete-room",
  },
];

const MY_MESSAGE_ACTIONS: ChatAction<string>[] = [
  {
    label: "Edit",
    value: "edit-message",
  },
  {
    label: "Delete",
    value: "delete-message",
  },
];

const THEIR_MESSAGE_ACTIONS: ChatAction<string>[] = [];

// User
const currentUserId = ref("1");

const switchUser = () => {
  currentUserId.value = currentUserId.value === "1" ? "2" : "1";
};

// Rooms
const rooms = ref<ChatRoom[]>([]);
const lastRoomKey = ref<string | null>(null);

const filteredRooms = computed(() => {
  if (searchQuery.value === "") {
    return rooms.value;
  }

  return rooms.value.filter(
    (room) =>
      room.id === selectedRoomId.value ||
      room.headerTitle.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const searchQuery = ref("");

const selectedRoomId = ref<string | null>(null);

const isLoadingRoom = ref(false);

const isLoadingMoreRooms = ref(false);

// Messages
const messages = ref<ChatItemType[]>([]);
const lastMessageKey = ref<string | null>(null);

const isLoadingMessage = ref(false);

const isLoadingMoreMessages = ref(false);

const inputMessage = ref("");

const selectedMessageId = ref<string | null>(null);

const replyTo = ref<ChatMessageReply | null>(null);

// Others
const theme = ref<ThemeType>('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

const unsubscribeArr = ref<Unsubscribe[]>([]);

// Helper functions to convert the data so it can be stored in Firebase
const convertMessageToFirebase = (message: ChatMessage) => {
  return {
    id: message.id,
    type: message.type,
    roomId: message.roomId,
    senderId: message.senderId,
    senderName: message.senderName,
    senderAvatar: message.senderAvatar,
    content: message.content,
    timestamp: message.timestamp,
    replyTo: message.replyTo || null,
    reactions: message.reactions
      ? Object.fromEntries(
        Array.from(message.reactions.entries()).map(([emoji, users]) => [
          emoji,
          Array.from(users),
        ]),
      )
      : {},
    attachments: message.attachments || [],
    isSelected: false,
    isDeleted: message.isDeleted || false,
  };
};

// Helper functions to convert the data back to the message interface
const convertMessageFromFirebase = (firebaseMessage: any): ChatMessage => {
  const reactions = new Map();
  if (firebaseMessage.reactions) {
    Object.entries(firebaseMessage.reactions).forEach(([emoji, users]) => {
      reactions.set(emoji, new Set(users as string[]));
    });
  }

  return {
    id: firebaseMessage.id,
    type: firebaseMessage.type || "message",
    roomId: firebaseMessage.roomId,
    senderId: firebaseMessage.senderId,
    senderName: firebaseMessage.senderName,
    senderAvatar: firebaseMessage.senderAvatar,
    content: firebaseMessage.content,
    timestamp: firebaseMessage.timestamp,
    replyTo: firebaseMessage.replyTo || null,
    reactions: reactions,
    attachments: firebaseMessage.attachments || [],
    isSelected: firebaseMessage.isSelected || false,
    isDeleted: firebaseMessage.isDeleted || false,
  };
};

const addRoom = async () => {
  isLoadingRoom.value = true;
  isLoadingMessage.value = true;

  try {
    const roomsRef = dbRef(database, "rooms");
    const newRoomRef = push(roomsRef);
    const generatedId = newRoomRef.key!;

    const newRoom: ChatRoom = {
      id: generatedId,
      headerTitle: `Room ${generatedId}`,
      headerSubtitle: `This is room ${generatedId}`,
      sidebarTitle: `Room ${generatedId}`,
      sidebarSubtitle: `This is room ${generatedId}`,
      avatar: LitLogo,
      meta: "Nov 1",
      hasEnded: false,
    };

    await set(newRoomRef, newRoom);

    rooms.value.unshift(newRoom);
    selectedRoomId.value = newRoom.id;
    isLoadingRoom.value = false;

    messages.value = [];

    const messagesSnapshot = await get(
      dbRef(database, `messages/${newRoom.id}`),
    );
    if (messagesSnapshot.exists()) {
      const messagesData = messagesSnapshot.val();
      const firebaseMessagesArray = Object.values(messagesData);
      const messagesArray = firebaseMessagesArray.map(convertMessageFromFirebase);

      // Sort messages by timestamp (chronological order) - oldest first
      messagesArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      messages.value = messagesArray;
    }

    isLoadingMessage.value = false;
  } catch (error) {
    console.error("addRoom error:", error);
    isLoadingRoom.value = false;
    isLoadingMessage.value = false;
  }
};

const searchRoom = ({ detail: { value } }: CustomEvent<SearchRoomDetail>) => {
  searchQuery.value = String(value);
};

const loadMoreRooms = async () => {
  if (
    isLoadingMoreRooms.value ||
    searchQuery.value !== "" ||
    !lastRoomKey.value
  )
    return;

  isLoadingMoreRooms.value = true;

  try {
    // Load the next 10 rooms
    const roomsQuery = query(
      dbRef(database, "rooms"),
      orderByKey(),
      endBefore(lastRoomKey.value),
      limitToLast(10),
    );

    const roomsSnapshot = await get(roomsQuery);

    if (roomsSnapshot.exists()) {
      const roomsData = roomsSnapshot.val();
      const roomsArray = Object.values(roomsData) as ChatRoom[];

      // Since limitToLast returns in ascending order, reverse to get newest first
      roomsArray.reverse();

      // Append to existing rooms
      rooms.value = [...rooms.value, ...roomsArray];

      // Update the last room key for next pagination
      const roomKeys = Object.keys(roomsData);
      lastRoomKey.value = roomKeys[0];
    } else {
      // No more rooms to load
      lastRoomKey.value = null;
    }
  } catch (error) {
    console.error("loadMoreRooms error:", error);
  } finally {
    isLoadingMoreRooms.value = false;
  }
};

const selectRoom = async ({
  detail: { room },
}: CustomEvent<SelectRoomDetail>) => {
  if (selectedRoomId.value === room.id) return;

  selectedRoomId.value = room.id;
  isLoadingMessage.value = true;
  messages.value = [];
  lastMessageKey.value = null;

  try {
    // Fetch messages for the selected room (load first 10 messages)
    const messagesQuery = query(
      dbRef(database, `messages/${room.id}`),
      orderByKey(),
      limitToLast(10),
    );

    const messagesSnapshot = await get(messagesQuery);

    if (messagesSnapshot.exists()) {
      const messagesData = messagesSnapshot.val();
      // Convert Firebase messages to app format
      const firebaseMessagesArray = Object.values(messagesData);
      const messagesArray = firebaseMessagesArray.map(
        convertMessageFromFirebase,
      );

      // Sort messages by timestamp (chronological order) - oldest first
      messagesArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      messages.value = messagesArray;

      // Set the last message key for pagination (the oldest message in current list)
      lastMessageKey.value = messagesArray[0]?.id || null;
    } else {
      messages.value = [];
      lastMessageKey.value = null;
    }

    // Start listening to new messages for this room after the initial load
    listenMessages(room.id);
  } catch (error) {
    console.error("selectRoom error:", error);
    messages.value = [];
    lastMessageKey.value = null;
  } finally {
    isLoadingMessage.value = false;
  }
};

const loadMoreMessages = async () => {
  if (
    isLoadingMoreMessages.value ||
    selectedRoomId.value === null ||
    !lastMessageKey.value
  )
    return;

  isLoadingMoreMessages.value = true;

  try {
    // Fetch more messages for the selected room (older than the current oldest)
    const messagesQuery = query(
      dbRef(database, `messages/${selectedRoomId.value}`),
      orderByKey(),
      endBefore(lastMessageKey.value),
      limitToLast(10),
    );

    const messagesSnapshot = await get(messagesQuery);

    if (messagesSnapshot.exists()) {
      const messagesData = messagesSnapshot.val();
      // Convert Firebase messages to app format
      const firebaseMessagesArray = Object.values(messagesData);
      const messagesArray = firebaseMessagesArray.map(
        convertMessageFromFirebase,
      );

      // Sort messages by timestamp (chronological order) - oldest first
      messagesArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      // Prepend to existing messages (older messages go to the top)
      messages.value = [...messagesArray, ...messages.value];

      // Update the last message key for next pagination
      const messageKeys = Object.keys(messagesData);
      lastMessageKey.value = messageKeys[0]; // First key (oldest in the current set)
    } else {
      // No more messages to load
      lastMessageKey.value = null;
    }
  } catch (error) {
    console.error("loadMoreMessages error:", error);
  } finally {
    isLoadingMoreMessages.value = false;
  }
};

const selectMessageAction = async ({
  detail: { value, messageId },
}: CustomEvent<SelectMessageActionDetail<string>>) => {
  if (!selectedRoomId.value) return;

  switch (value) {
    case "edit-message":
      const targetMessage = messages.value.find(
        (m) => m.id === messageId,
      ) as ChatMessage;
      if (targetMessage && targetMessage.type === "message") {
        inputMessage.value = targetMessage.content;
        selectedMessageId.value = messageId;
      }
      break;
    default:
      break;
  }
};

const selectEmoji = async ({
  detail: { messageId, emoji },
}: CustomEvent<SelectEmojiDetail>) => {
  const targetIndex = messages.value.findIndex(
    (message) => message.id === messageId,
  );
  if (targetIndex === -1 || !selectedRoomId.value) return;

  let target = messages.value[targetIndex] as ChatMessage;
  const map = new Map(target.reactions) ?? new Map();
  const set = new Set(map.get(emoji)) ?? new Set();
  set.add(currentUserId.value);
  map.set(emoji, set);

  try {
    // Update the message reactions in the database
    const messageRef = dbRef(
      database,
      `messages/${selectedRoomId.value}/${messageId}`,
    );
    await update(messageRef, {
      reactions: Object.fromEntries(
        Array.from(map.entries()).map(([key, value]) => [
          key,
          Array.from(value),
        ]),
      ),
    });
  } catch (error) {
    console.error("Error updating message reactions:", error);
  }
};

const replyToMessage = ({ detail }: CustomEvent<ReplyToMessageDetail>) => {
  replyTo.value = detail.replyTo;
  inputMessage.value = "";
};

const cancelReply = () => {
  replyTo.value = null;
};

const clickReaction = async ({
  detail: { messageId, reaction },
}: CustomEvent<ClickReactionDetail>) => {
  const targetIndex = messages.value.findIndex(
    (message) => message.id === messageId,
  );
  if (targetIndex === -1 || !selectedRoomId.value) return;

  let target = messages.value[targetIndex] as ChatMessage;

  const map = new Map(target.reactions) ?? new Map();
  const set = new Set(map.get(reaction.emoji)) ?? new Set();
  if (set.has(currentUserId.value)) {
    set.delete(currentUserId.value);
  } else {
    set.add(currentUserId.value);
  }
  if (set.size === 0) {
    map.delete(reaction.emoji);
  } else {
    map.set(reaction.emoji, set);
  }

  try {
    // Update the message reactions in the database
    const messageRef = dbRef(
      database,
      `messages/${selectedRoomId.value}/${messageId}`,
    );
    await update(messageRef, {
      reactions: Object.fromEntries(
        Array.from(map.entries()).map(([key, value]) => [
          key,
          Array.from(value),
        ]),
      ),
    });
  } catch (error) {
    console.error("clickReaction error:", error);
  }
};

const sendMessage = async ({
  detail: { roomId, content },
}: CustomEvent<SendMessageDetail>) => {
  if (roomId !== selectedRoomId.value || !content.trim()) return;

  if (selectedMessageId.value) {
    // Edit existing message
    const targetIndex = messages.value.findIndex(
      (message) => message.id === selectedMessageId.value,
    );
    if (targetIndex === -1) return;

    let target = messages.value[targetIndex] as ChatMessage;
    target.isSelected = false;
    target.content = content;
    target.replyTo = replyTo.value;

    try {
      // Update the message content in the database
      const messageRef = dbRef(
        database,
        `messages/${roomId}/${selectedMessageId.value}`,
      );
      await update(messageRef, {
        content: content,
        replyTo: replyTo.value,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error("sendMessage error:", error);
    } finally {
      selectedMessageId.value = null;
      replyTo.value = null;
    }
  } else {
    // Send new message
    try {
      const messagesRef = dbRef(database, `messages/${roomId}`);
      const newMessageRef = push(messagesRef);
      const generatedId = newMessageRef.key!;

      const newMessage: ChatMessage = {
        id: generatedId,
        type: "message",
        roomId: roomId,
        senderId: currentUserId.value,
        senderName: `User ${currentUserId.value}`,
        senderAvatar: LitLogo,
        content: content,
        timestamp: new Date().toISOString(),
        replyTo: replyTo.value,
        reactions: new Map(),
        attachments: [],
        isSelected: false,
        isDeleted: false,
      };

      const messageToSave = convertMessageToFirebase(newMessage);

      await set(newMessageRef, messageToSave);
      await updateLatestMessage(roomId, newMessage);
    } catch (error) {
      console.error("sendMessage error:", error);
    } finally {
      replyTo.value = null;
    }
  }
};

const updateLatestMessage = async (
  roomId: string,
  latestMessage: ChatMessage,
) => {
  const targetIndex = rooms.value.findIndex((room) => room.id === roomId);
  if (targetIndex === -1) return;

  const latestMessageContent = latestMessage.isDeleted
    ? "This message has been deleted."
    : latestMessage.content === "" && latestMessage.attachments.length > 0
      ? "Uploaded an attachment."
      : latestMessage.content;

  const updatedMeta = new Date(latestMessage.timestamp).toLocaleDateString();

  try {
    // Update the room information in the database
    const roomRef = dbRef(database, `rooms/${roomId}`);
    await update(roomRef, {
      headerSubtitle: latestMessageContent,
      sidebarSubtitle: latestMessageContent,
      meta: updatedMeta,
      lastMessageAt: Date.now(),
    });

    // Update local state
    rooms.value = rooms.value.map((room, index) =>
      index === targetIndex
        ? {
          ...room,
          headerSubtitle: latestMessageContent,
          sidebarSubtitle: latestMessageContent,
          meta: updatedMeta,
        }
        : room
    );
  } catch (error) {
    console.error("updateLatestMessage error:", error);
  }
};

const listenMessages = (roomId: string) => {
  // Clean up existing listeners
  unsubscribeArr.value.forEach((unsubscribe) => unsubscribe());
  unsubscribeArr.value = [];

  if (!roomId) return;

  const messagesQuery = query(
    dbRef(database, `messages/${roomId}`),
    orderByKey(),
    limitToLast(10)
  );

  const unsubscribe = onValue(messagesQuery, (snapshot) => {
    if (snapshot.exists()) {
      const messagesData = snapshot.val();
      const firebaseMessagesArray = Object.values(messagesData);
      const allMessagesArray = firebaseMessagesArray.map(convertMessageFromFirebase);

      // Sort messages by timestamp
      allMessagesArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      // If we don't have any messages yet, use all messages from the listener (max 10)
      if (messages.value.length === 0) {
        messages.value = allMessagesArray;
      } else {
        // We have existing messages - intelligently merge new data
        const currentMessageIds = new Set(messages.value.map(m => m.id));

        // Find new messages (not in current array)
        const newMessages = allMessagesArray.filter(msg => !currentMessageIds.has(msg.id));

        // Update existing messages that might have changed
        const updatedMessages = messages.value.map(existingMsg => {
          const updatedMsg = allMessagesArray.find(msg => msg.id === existingMsg.id);
          return updatedMsg || existingMsg; // Use updated version if found, otherwise keep existing
        });

        // Combine updated existing messages with new messages
        messages.value = [...updatedMessages, ...newMessages];
      }

      // Update pagination key if we have messages
      if (messages.value.length > 0) {
        lastMessageKey.value = messages.value[0].id;
      }
    } else {
      // No messages in this room
      messages.value = [];
      lastMessageKey.value = null;
    }
  });

  // Store the unsubscribe function for cleanup
  unsubscribeArr.value.push(unsubscribe);
};

onMounted(async () => {
  try {
    // Load the first 10 rooms (most recent)
    const roomsQuery = query(
      dbRef(database, "rooms"),
      orderByKey(),
      limitToLast(10),
    );

    const roomsSnapshot = await get(roomsQuery);

    if (roomsSnapshot.exists()) {
      const roomsData = roomsSnapshot.val();
      const roomsArray = Object.values(roomsData) as ChatRoom[];

      // Since limitToLast returns in ascending order, reverse to get newest first
      roomsArray.reverse();
      rooms.value = roomsArray;

      // Set the last room key for pagination
      const roomKeys = Object.keys(roomsData);
      lastRoomKey.value = roomKeys[0];

      // Automatically select and load messages for the first room
      const firstRoom = roomsArray[0];
      selectedRoomId.value = firstRoom.id;
      isLoadingMessage.value = true;
      messages.value = [];
      lastMessageKey.value = null;

      try {
        // Fetch initial messages for the first room
        const messagesQuery = query(
          dbRef(database, `messages/${firstRoom.id}`),
          orderByKey(),
          limitToLast(10),
        );

        const messagesSnapshot = await get(messagesQuery);

        if (messagesSnapshot.exists()) {
          const messagesData = messagesSnapshot.val();

          const firebaseMessagesArray = Object.values(messagesData);
          const messagesArray = firebaseMessagesArray.map(
            convertMessageFromFirebase,
          );

          // Sort messages by timestamp (chronological order) - oldest first
          messagesArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          messages.value = messagesArray;

          // Set the last message key for pagination (the oldest message in current list)
          lastMessageKey.value = messagesArray[0]?.id || null;
        } else {
          messages.value = [];
          lastMessageKey.value = null;
        }

        listenMessages(firstRoom.id);
      } catch (error) {
        console.error("Error loading messages for first room:", error);
        messages.value = [];
        lastMessageKey.value = null;
      } finally {
        isLoadingMessage.value = false;
      }
    } else {
      rooms.value = [];
      lastRoomKey.value = null;
      selectedRoomId.value = null;
      messages.value = [];
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    rooms.value = [];
    lastRoomKey.value = null;
  }
});

onUnmounted(() => {
  unsubscribeArr.value.forEach((unsubscribe) => {
    unsubscribe();
  });
});
</script>

<style scoped>
advanced-chat-kai {
  flex: 1;
  overflow: hidden;
}
</style>
