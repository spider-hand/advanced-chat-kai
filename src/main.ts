import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { globalStyles } from "./styles/global";
import "./components/chat-container";
import "./components/chat-sidebar";
import { sidebarContext } from "./contexts/sidebar-context";
import { DeviceContext, deviceContext } from "./contexts/device-context";
import {
  AdvancedChatKaiProps,
  ChatAction,
  ChatActionType,
  ChatMessage,
  ChatMessageAttachment,
  ChatMessageSuggestion,
  ChatRoom,
  ChatUser,
} from "./types";
import { currentUserContext } from "./contexts/current-user-context";
import { RoomContext, roomContext } from "./contexts/room-context";
import { messageContext, MessageContext } from "./contexts/message-context";
import {
  RoomActionContext,
  roomActionContext,
} from "./contexts/room-action-context";
import {
  MessageActionContext,
  messageActionContext,
} from "./contexts/message-action-context";
import {
  MessageAttachmentContext,
  messageAttachmentContext,
} from "./contexts/message-attachment-context";

@customElement("advanced-chat-kai")
export class Main extends LitElement {
  @property({ type: Object })
  currentUser: ChatUser;
  @property({ type: Array }) rooms: ChatRoom[] = [];
  @property({ type: Array }) messages: ChatMessage[] = [];
  @property({ type: Array }) attachments: ChatMessageAttachment[] = [];
  @property({ type: Array }) suggestions: ChatMessageSuggestion[] = [];
  @property({ type: String }) selectedRoomId: string | null = null;
  @property({ type: Boolean }) isLoadingRoom = false;
  @property({ type: Boolean }) isLoadingMessage = false;
  @property({ type: Boolean }) isLoadingMoreRooms = false;
  @property({ type: Boolean }) isLoadingMoreMessages = false;
  @property({ type: Array }) roomActions: ChatAction<ChatActionType>[] = [];
  @property({ type: Array }) messageActions: ChatAction<ChatActionType>[] = [];
  @property({ type: Boolean }) isMobile = false;
  @property({ type: Number }) height = 480;

  @provide({ context: currentUserContext })
  currentUserContext: ChatUser = {
    id: "",
    name: "",
  };

  @provide({ context: roomContext })
  roomsContext: RoomContext = {
    rooms: this.rooms,
    selectedRoomId: this.selectedRoomId,
    isLoadingRoom: this.isLoadingRoom,
    isLoadingMoreRooms: this.isLoadingMoreRooms,
  };

  @provide({ context: messageContext })
  messagesContext: MessageContext = {
    messages: this.messages,
    suggestions: this.suggestions,
    isLoadingMessage: this.isLoadingMessage,
    isLoadingMoreMessages: this.isLoadingMoreMessages,
  };

  @provide({ context: messageAttachmentContext })
  messageAttachmentContext: MessageAttachmentContext = {
    attachments: this.attachments,
  };

  @provide({ context: roomActionContext })
  roomActionContext: RoomActionContext = {
    actions: this.roomActions,
  };

  @provide({ context: messageActionContext })
  messageActionContext: MessageActionContext = {
    actions: this.messageActions,
  };

  @provide({ context: deviceContext })
  deviceContext: DeviceContext = {
    isMobile: this.isMobile,
  };

  @provide({ context: sidebarContext })
  @property({ type: Boolean })
  showSidebar = true;

  protected updated(
    changedProperties: Map<
      keyof AdvancedChatKaiProps,
      AdvancedChatKaiProps[keyof AdvancedChatKaiProps]
    >,
  ): void {
    if (changedProperties.has("currentUser")) {
      this.currentUserContext = this.currentUser;
    }
    if (
      changedProperties.has("rooms") ||
      changedProperties.has("selectedRoomId") ||
      changedProperties.has("isLoadingRoom") ||
      changedProperties.has("isLoadingMoreRooms")
    ) {
      this.roomsContext = {
        rooms: this.rooms,
        selectedRoomId: this.selectedRoomId,
        isLoadingRoom: this.isLoadingRoom,
        isLoadingMoreRooms: this.isLoadingMoreRooms,
      };
    }
    if (
      changedProperties.has("messages") ||
      changedProperties.has("suggestions") ||
      changedProperties.has("isLoadingMessage") ||
      changedProperties.has("isLoadingMoreMessages")
    ) {
      this.messagesContext = {
        messages: this.messages,
        suggestions: this.suggestions,
        isLoadingMessage: this.isLoadingMessage,
        isLoadingMoreMessages: this.isLoadingMoreMessages,
      };
    }

    if (changedProperties.has("attachments")) {
      this.messageAttachmentContext = {
        attachments: this.attachments,
      };
    }

    if (changedProperties.has("roomActions")) {
      this.roomActionContext = {
        actions: this.roomActions,
      };
    }
    if (changedProperties.has("messageActions")) {
      this.messageActionContext = {
        actions: this.messageActions,
      };
    }
    if (changedProperties.has("isMobile")) {
      this.deviceContext = {
        isMobile: this.isMobile,
      };
    }
  }

  private _closeSidebar() {
    this.showSidebar = false;
  }

  private _openSidebar() {
    this.showSidebar = true;
  }

  static styles = [
    globalStyles,
    css`
      .main {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: hidden;
        background-color: var(--white);
        border: 0.1em solid var(--border);
        border-radius: 1.6em;
        box-shadow: rgb(0 0 0 / 15%) 0 0.3em 0.3em 0;
      }
    `,
  ];

  render() {
    return html`<div class="main" style="height: ${this.height}px">
      <chat-sidebar
        .show="${this.showSidebar}"
        @close="${this._closeSidebar}"
      ></chat-sidebar>
      <chat-container @open-sidebar="${this._openSidebar}"></chat-container>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "advanced-chat-kai": Main;
  }
}
