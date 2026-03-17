<template>
  <div :class="['demo', { 'demo--fullscreen': isFullscreen }]">
    <div v-if="!isFullscreen" class="demo__controls">
      <label class="demo__control">
        <span>User:</span>
        <select v-model="currentUserId">
          <option value="user1">Alice Johnson</option>
          <option value="user2">Bob Smith</option>
        </select>
      </label>
      <label class="demo__control">
        <span>Theme:</span>
        <select v-model="theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label class="demo__control">
        <span>Mobile:</span>
        <input type="checkbox" v-model="isMobile" />
      </label>
      <label class="demo__control">
        <span>Single Room:</span>
        <input type="checkbox" v-model="isSingleRoom" />
      </label>
      <label class="demo__control">
        <span>Fullscreen:</span>
        <input type="checkbox" v-model="isFullscreen" />
      </label>
    </div>
    <button v-if="isFullscreen" class="demo__exit-button" @click="isFullscreen = false">
      Exit Fullscreen
    </button>
    <advanced-chat-kai :currentUserId="currentUserId" :theme="theme" :isMobile="isMobile" :isSingleRoom="isSingleRoom"
      :rooms="filteredRooms" :messages="messages" :selectedRoomId="selectedRoomId" :isLoadingRoom="isLoadingRoom"
      :isLoadingMessage="isLoadingMessage" :replyTo="replyTo"
      :height="isFullscreen ? '100vh' : (isMobile ? '667px' : '600px')"
      :width="isFullscreen ? '100vw' : (isMobile ? '375px' : '900px')" :isMessageAttachmentAvailable="false"
      :timestampFormatter="formatTimestamp" @add-room="handleAddRoom" @select-room="handleSelectRoom"
      @send-message="handleSendMessage" @select-emoji="handleSelectEmoji" @click-reaction="handleClickReaction"
      @reply-to-message="handleReplyToMessage" @cancel-reply="handleCancelReply" @search-room="handleSearchRoom" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import "advanced-chat-kai";
import { database } from "./lib/firebase";
import { ref as dbRef, push, set, update, get, onValue, off } from "firebase/database";
import type { ChatRoom, ChatItemType, ChatMessageReply, SelectEmojiDetail, ClickReactionDetail, ReplyToMessageDetail, SearchRoomDetail, ThemeType } from "advanced-chat-kai";
import { USERS } from "./constants";
import { formatTimestamp, buildRoom } from "./utils";

const currentUserId = ref("user1");
const theme = ref<ThemeType>("light");
const isMobile = ref(false);
const isSingleRoom = ref(false);
const isFullscreen = ref(false);
const isSmallDevice = ref(false);

// Show the demo in full screen mode on small devices by default
const mediaQuery = window.matchMedia("(max-width: 639px)");
const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
  isSmallDevice.value = e.matches;
  if (e.matches) {
    isMobile.value = true;
    isFullscreen.value = true;
  }
};
handleMediaChange(mediaQuery);

const rooms = ref<ChatRoom[]>([]);
const messages = ref<ChatItemType[]>([]);
const selectedRoomId = ref<string | null>(null);
const isLoadingRoom = ref(false);
const isLoadingMessage = ref(false);
const replyTo = ref<ChatMessageReply | null>(null);
const searchQuery = ref("");

const filteredRooms = computed(() => {
  if (!searchQuery.value) return rooms.value;
  const query = searchQuery.value.toLowerCase();
  return rooms.value.filter((room) => room.id.toLowerCase().includes(query));
});

const currentUser = computed(() => USERS[currentUserId.value]);

let messagesUnsubscribe: (() => void) | null = null;

const handleAddRoom = async () => {
  isLoadingRoom.value = true;

  const roomsRef = dbRef(database, "/rooms");
  const newRoomRef = push(roomsRef);
  const roomId = newRoomRef.key!;

  await set(newRoomRef, { id: roomId });

  selectedRoomId.value = roomId;
};

const handleSelectRoom = (e: CustomEvent<{ room: ChatRoom }>) => {
  selectedRoomId.value = e.detail.room.id;
};

const handleSendMessage = async (e: CustomEvent<{ roomId: string; content: string; replyTo: ChatMessageReply | null }>) => {
  const { roomId, content, replyTo: eventReplyTo } = e.detail;

  const messagesRef = dbRef(database, `/messages/${roomId}`);
  const newMessageRef = push(messagesRef);
  const messageId = newMessageRef.key!;

  const newMessage = {
    id: messageId,
    type: "message",
    roomId,
    senderId: currentUser.value.id,
    senderName: currentUser.value.name,
    senderAvatar: currentUser.value.avatar,
    content,
    timestamp: new Date().toISOString(),
    reactions: {},
    attachments: [],
    isDeleted: false,
    isSelected: false,
    replyTo: eventReplyTo,
  };

  await set(newMessageRef, newMessage);

  await update(dbRef(database, `/rooms/${roomId}`), { latestMessage: content });
};

const handleReplyToMessage = (e: CustomEvent<ReplyToMessageDetail>) => {
  replyTo.value = e.detail.replyTo;
};

const handleCancelReply = () => {
  replyTo.value = null;
};

const handleSearchRoom = (e: CustomEvent<SearchRoomDetail>) => {
  searchQuery.value = e.detail.value;
};

const handleSelectEmoji = async (e: CustomEvent<SelectEmojiDetail>) => {
  const { messageId, emoji } = e.detail;
  const roomId = selectedRoomId.value;
  if (!roomId || !messageId) return;

  const reactionsRef = dbRef(database, `/messages/${roomId}/${messageId}/reactions/${emoji}`);
  const snapshot = await get(reactionsRef);
  const currentUsers: string[] = snapshot.val() ?? [];

  if (!currentUsers.includes(currentUserId.value)) {
    await set(reactionsRef, [...currentUsers, currentUserId.value]);
  }
};

const handleClickReaction = async (e: CustomEvent<ClickReactionDetail>) => {
  const { messageId, reaction } = e.detail;
  const roomId = selectedRoomId.value;
  if (!roomId) return;

  const reactionsRef = dbRef(database, `/messages/${roomId}/${messageId}/reactions/${reaction.emoji}`);
  const snapshot = await get(reactionsRef);
  const currentUsers: string[] = snapshot.val() ?? [];

  if (currentUsers.includes(currentUserId.value)) {
    const updatedUsers = currentUsers.filter((u) => u !== currentUserId.value);
    if (updatedUsers.length > 0) {
      await set(reactionsRef, updatedUsers);
    } else {
      await set(reactionsRef, null);
    }
  } else {
    await set(reactionsRef, [...currentUsers, currentUserId.value]);
  }
};

const subscribeToMessages = (roomId: string) => {
  if (messagesUnsubscribe) {
    messagesUnsubscribe();
  }

  isLoadingMessage.value = true;
  const messagesRef = dbRef(database, `/messages/${roomId}`);

  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      messages.value = Object.values(data)
        .map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          reactions: msg.reactions ?? {},
          attachments: msg.attachments ?? [],
          replyTo: msg.replyTo
            ? {
              ...msg.replyTo,
              timestamp: new Date(msg.replyTo.timestamp),
              reactions: msg.replyTo.reactions ?? {},
              attachments: msg.replyTo.attachments ?? [],
            }
            : null,
        }))
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    } else {
      messages.value = [];
    }
    isLoadingMessage.value = false;
  });

  messagesUnsubscribe = () => off(messagesRef);
};

const subscribeToRooms = () => {
  isLoadingRoom.value = true;
  const roomsRef = dbRef(database, "/rooms");

  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      rooms.value = Object.values(data).map((r: any) => buildRoom(r));
      if (!selectedRoomId.value && rooms.value.length > 0) {
        selectedRoomId.value = rooms.value[0].id;
      }
    } else {
      rooms.value = [];
    }
    isLoadingRoom.value = false;
  });
};

watch(selectedRoomId, (newRoomId) => {
  if (newRoomId) {
    subscribeToMessages(newRoomId);
  } else {
    messages.value = [];
  }
});

onMounted(() => {
  subscribeToRooms();
  mediaQuery.addEventListener("change", handleMediaChange);
});

onUnmounted(() => {
  if (messagesUnsubscribe) {
    messagesUnsubscribe();
  }
  mediaQuery.removeEventListener("change", handleMediaChange);
});
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 24px;
}

.demo--fullscreen {
  padding: 0;
}

.demo__controls {
  display: flex;
  gap: 24px;
}

.demo__control {
  display: flex;
  align-items: center;
  gap: 4px;
}

.demo__exit-button {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1;
}
</style>
