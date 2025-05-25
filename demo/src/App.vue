<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import type {
  ChatRoom,
  SearchRoomDetail,
  Dialog,
  ClickDialogButtonDetail,
  SelectRoomActionDetail,
  SelectRoomDetail,
  ChatItemType,
  ChatMessageAttachment,
  ChatMessageSuggestion,
  SendMessageDetail,
  SelectMessageActionDetail,
  ChatMessage,
  SelectSuggestionDetail,
  SelecteEmojiDetail,
  ClickReactionDetail,
  SelectFileDetail,
  RemoveAttachmentDetail,
  ThemeType,
  ReplyToMessageDetail,
  ChatMessageReply,
  DownloadAttachmentDetail,
} from "../../src/types";
import "../../dist/advanced-chat-kai.es.js";
import { createRoom, fetchRooms } from "./services/mockRoomService";
import { createMessage, fetchMessages } from "./services/mockMessageService";
import { myMessageActions, roomActions, theirMessageActions } from "./consts";

const currentUserId = ref("user-id-1");

const rooms = ref<ChatRoom[]>([]);

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

const nextRoomIndex = computed(() => {
  return rooms.value.length;
});

const searchQuery = ref("");

const selectedRoomId = ref<string | null>(null);

const isLoadingRoom = ref(false);
const isLoadingMoreRooms = ref(false);

const messages = ref<ChatItemType[]>([]);
const nextMessageIndex = computed(() => {
  return messages.value.length;
});

const attachments = ref<ChatMessageAttachment[]>([]);

const suggestions = ref<ChatMessageSuggestion[]>([
  {
    value: "suggestion-1",
    text: "Hello, how can I help you?",
  },
  {
    value: "suggestion-2",
    text: "What is your name?",
  },
  {
    value: "suggestion-3",
    text: "Can you tell me more about that?",
  },
]);

const isLoadingMessage = ref(false);
const isLoadingMoreMessages = ref(false);

const inputMessage = ref("");

const selectedMessageId = ref<string | null>(null);

const replyTo = ref<ChatMessageReply | null>(null);

const dialog = ref<Dialog | null>(null);

const height = ref(window.innerHeight);
const width = ref(window.innerWidth);
const isMobile = computed(() => width.value < 768);

const theme = ref<ThemeType>("light");

const addRoom = async () => {
  isLoadingRoom.value = true;
  isLoadingMessage.value = true;
  const newRoom = await createRoom(nextRoomIndex.value);
  rooms.value = [newRoom, ...rooms.value];
  selectedRoomId.value = rooms.value[0]?.id ?? null;
  isLoadingRoom.value = false;

  messages.value = [];
  messages.value = await fetchMessages(
    selectedRoomId.value,
    nextMessageIndex.value,
  );
  isLoadingMessage.value = false;
};

const searchRoom = ({ detail: { value } }: CustomEvent<SearchRoomDetail>) => {
  searchQuery.value = String(value);
};

const loadMoreRooms = async () => {
  if (isLoadingMoreRooms.value || searchQuery.value !== "") return;

  isLoadingMoreRooms.value = true;
  const result = await fetchRooms(nextRoomIndex.value);
  rooms.value = [...rooms.value, ...result];
  isLoadingMoreRooms.value = false;
};

const selectRoom = async ({
  detail: { room },
}: CustomEvent<SelectRoomDetail>) => {
  if (selectedRoomId.value === room.id) return;
  selectedRoomId.value = room.id;
  isLoadingMessage.value = true;
  messages.value = [];
  messages.value = await fetchMessages(room.id, nextMessageIndex.value);
  isLoadingMessage.value = false;

  updateLatestMessage();
};

const selectRoomAction = async ({
  detail: { value, roomId },
}: CustomEvent<SelectRoomActionDetail<string>>) => {
  selectedRoomId.value = roomId;

  if (value === "delete-room") {
    dialog.value = {
      event: "delete-room",
      body: "Are you sure you want to delete this room?",
      leftButton: {
        text: "Cancel",
      },
      rightButton: {
        text: "OK",
        variant: "danger",
      },
    };
  }
};

const loadMoreMesssages = async () => {
  if (isLoadingMoreMessages.value || selectedRoomId.value === null) return;

  isLoadingMoreMessages.value = true;
  const newMessages = await fetchMessages(
    selectedRoomId.value,
    nextMessageIndex.value,
  );
  messages.value = [...newMessages, ...messages.value];
  isLoadingMoreMessages.value = false;
};

const selectMessageAction = ({
  detail: { value, messageId },
}: CustomEvent<SelectMessageActionDetail<string>>) => {
  const targetIndex = messages.value.findIndex(
    (message) => message.id === messageId,
  );
  if (targetIndex === -1) return;

  let target = messages.value[targetIndex] as ChatMessage;
  target.isSelected = true;
  selectedMessageId.value = target.id;

  if (value === "edit-message") {
    inputMessage.value = target.content ?? "";
    messages.value = [
      ...messages.value.slice(0, targetIndex),
      { ...target },
      ...messages.value.slice(targetIndex + 1),
    ];
    attachments.value = target.attachments;
    suggestions.value = [];
    replyTo.value = target.replyTo;
  } else if (value === "delete-message") {
    dialog.value = {
      event: "delete-message",
      body: "Are you sure you want to delete this message?",
      leftButton: {
        text: "Cancel",
      },
      rightButton: {
        text: "OK",
        variant: "danger",
      },
    };
  }
};

const selectSuggestion = async ({
  detail: { suggestion },
}: CustomEvent<SelectSuggestionDetail>) => {
  if (selectedRoomId.value === null) return;

  const newMessage = await createMessage(
    selectedRoomId.value,
    nextMessageIndex.value,
    currentUserId.value,
    suggestion.text,
    [],
    null,
  );
  messages.value = [...messages.value, newMessage];
  attachments.value = [];
  suggestions.value = [];
  replyTo.value = null;

  updateLatestMessage();
};

const selectEmoji = ({
  detail: { messageId, emoji },
}: CustomEvent<SelecteEmojiDetail>) => {
  const targetIndex = messages.value.findIndex(
    (message) => message.id === messageId,
  );
  if (targetIndex === -1) return;

  let target = messages.value[targetIndex] as ChatMessage;
  const map = new Map(target.reactions) ?? new Map();
  const set = new Set(map.get(emoji)) ?? new Set();
  set.add(currentUserId.value);
  map.set(emoji, set);

  messages.value = [
    ...messages.value.slice(0, targetIndex),
    { ...target, reactions: map },
    ...messages.value.slice(targetIndex + 1),
  ];
};

const replyToMessage = ({ detail }: CustomEvent<ReplyToMessageDetail>) => {
  replyTo.value = detail.replyTo;
  inputMessage.value = "";
};

const clickReaction = ({
  detail: { messageId, reaction },
}: CustomEvent<ClickReactionDetail>) => {
  const targetIndex = messages.value.findIndex(
    (message) => message.id === messageId,
  );
  if (targetIndex === -1) return;

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

  messages.value = [
    ...messages.value.slice(0, targetIndex),
    { ...target, reactions: map },
    ...messages.value.slice(targetIndex + 1),
  ];
};

const downloadAttachment = ({
  detail: { attachment },
}: CustomEvent<DownloadAttachmentDetail>) => {
  console.log("downloadAttachment", attachment);

  // TODO: Implement download logic
};

const removeAttachment = ({
  detail: { attachment },
}: CustomEvent<RemoveAttachmentDetail>) => {
  attachments.value = attachments.value.filter(
    (item) => item.id !== attachment.id,
  );
};

const cancelReply = () => {
  replyTo.value = null;
};

const selectFile = ({ detail: { file } }: CustomEvent<SelectFileDetail>) => {
  attachments.value = [
    ...attachments.value,
    {
      id: `attachment-${attachments.value.length + 1}`,
      name: file.name,
      meta: `${(file.size / 1024).toFixed(2)} KB`,
      imageUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    },
  ];
};

const sendMessage = async ({
  detail: { roomId, content },
}: CustomEvent<SendMessageDetail>) => {
  if (roomId !== selectedRoomId.value) return;

  if (selectedMessageId.value) {
    const targetIndex = messages.value.findIndex(
      (message) => message.id === selectedMessageId.value,
    );
    if (targetIndex === -1) return;

    let target = messages.value[targetIndex] as ChatMessage;
    target.isSelected = false;
    target.content = content;
    target.attachments = attachments.value;
    target.replyTo = replyTo.value;
    messages.value = [
      ...messages.value.slice(0, targetIndex),
      { ...target },
      ...messages.value.slice(targetIndex + 1),
    ];
    selectedMessageId.value = null;
  } else {
    const newMessage = await createMessage(
      roomId,
      nextMessageIndex.value,
      currentUserId.value,
      content,
      attachments.value,
      replyTo.value,
    );
    messages.value = [...messages.value, newMessage];
  }

  suggestions.value = [];
  attachments.value = [];
  replyTo.value = null;

  updateLatestMessage();
};

const clickDialogButton = async ({
  detail: { event, side },
}: CustomEvent<ClickDialogButtonDetail>) => {
  switch (event) {
    case "delete-room":
      await handleRoomDeletion(side);
      break;
    case "delete-message":
      await handleMessageDeletion(side);
      break;
    default:
      break;
  }
};

const handleRoomDeletion = async (side: "left" | "right") => {
  if (side === "left" || selectedRoomId.value === null) {
    dialog.value = null;
    return;
  }

  isLoadingRoom.value = true;
  isLoadingMessage.value = true;
  rooms.value = rooms.value.filter((room) => room.id !== selectedRoomId.value);
  selectedRoomId.value = rooms.value[0]?.id ?? null;
  dialog.value = null;
  isLoadingRoom.value = false;

  messages.value = [];
  messages.value = await fetchMessages(
    selectedRoomId.value,
    nextMessageIndex.value,
  );
  isLoadingMessage.value = false;
};

const handleMessageDeletion = async (side: "left" | "right") => {
  if (side === "left" || selectedMessageId.value === null) {
    dialog.value = null;
    return;
  }

  if (!selectedMessageId.value) return;

  const targetIndex = messages.value.findIndex(
    (message) => message.id === selectedMessageId.value,
  );
  if (targetIndex === -1) return;

  let target = messages.value[targetIndex] as ChatMessage;
  target.isSelected = false;
  target.isDeleted = true;
  messages.value = [
    ...messages.value.slice(0, targetIndex),
    { ...target },
    ...messages.value.slice(targetIndex + 1),
  ];
  selectedMessageId.value = null;
  dialog.value = null;

  updateLatestMessage();
};

const updateLatestMessage = () => {
  const targetIndex = rooms.value.findIndex(
    (room) => room.id === selectedRoomId.value,
  );
  if (targetIndex === -1) return;
  let target = rooms.value[targetIndex];
  const latestMessage = messages.value[
    messages.value.length - 1
  ] as ChatMessage;
  const latestMessageContent = latestMessage.isDeleted
    ? "This message has been deleted."
    : latestMessage.content === "" && latestMessage.attachments.length > 0
      ? "Uploaded an attachment."
      : latestMessage.content;
  target.headerSubtitle = target.sidebarSubtitle = latestMessageContent;
  rooms.value = [
    ...rooms.value.slice(0, targetIndex),
    { ...target },
    ...rooms.value.slice(targetIndex + 1),
  ];
};

const updateDimensions = () => {
  height.value = window.innerHeight;
  width.value = window.innerWidth;
};

onMounted(async () => {
  isLoadingRoom.value = true;
  isLoadingMessage.value = true;
  rooms.value = await fetchRooms(nextRoomIndex.value);
  selectedRoomId.value = rooms.value[0]?.id ?? null;
  isLoadingRoom.value = false;

  messages.value = await fetchMessages(
    selectedRoomId.value,
    nextMessageIndex.value,
  );
  isLoadingMessage.value = false;

  window.addEventListener("resize", updateDimensions);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateDimensions);
});
</script>

<template>
  <advanced-chat-kai
    .currentUserId="currentUserId"
    .rooms="filteredRooms"
    .messages="messages"
    .attachments="attachments"
    .suggestions="suggestions"
    .replyTo="replyTo"
    .selectedRoomId="selectedRoomId"
    .isLoadingRoom="isLoadingRoom"
    .isLoadingMoreRooms="isLoadingMoreRooms"
    .isLoadingMessage="isLoadingMessage"
    .isLoadingMoreMessages="isLoadingMoreMessages"
    .inputMessage="inputMessage"
    .roomActions="roomActions"
    .myMessageActions="myMessageActions"
    .theirMessageActions="theirMessageActions"
    .dialog="dialog"
    .height="`${height}px`"
    .width="`${width}px`"
    .isMobile="isMobile"
    .theme="theme"
    @add-room="addRoom"
    @search-room="searchRoom"
    @load-more-rooms="loadMoreRooms"
    @select-room="selectRoom"
    @select-room-action="selectRoomAction"
    @load-more-messages="loadMoreMesssages"
    @select-message-action="selectMessageAction"
    @select-suggestion="selectSuggestion"
    @select-emoji="selectEmoji"
    @reply-to-message="replyToMessage"
    @click-reaction="clickReaction"
    @download-attachment="downloadAttachment"
    @remove-attachment="removeAttachment"
    @cancel-reply="cancelReply"
    @select-file="selectFile"
    @send-message="sendMessage"
    @click-dialog-button="clickDialogButton"
  ></advanced-chat-kai>
</template>

<style>
body {
  margin: 0;
}
</style>
