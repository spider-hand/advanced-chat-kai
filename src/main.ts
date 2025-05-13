import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { globalStyles } from "./styles/global";
import "./components/chat-container";
import "./components/chat-sidebar";
import { sidebarContext } from "./contexts/sidebar-context";
import {
  AdvancedChatKaiProps,
  ChatAction,
  ChatActionType,
  ChatMessage,
  ChatMessageAttachment,
  ChatMessageSuggestion,
  ChatRoom,
  ChatUser,
  PartialI18nType,
  ThemeType,
} from "./types";
import { currentUserContext } from "./contexts/current-user-context";
import { RoomContext, roomContext } from "./contexts/room-context";
import { messageContext, MessageContext } from "./contexts/message-context";
import { FooterContext, footerContext } from "./contexts/footer-context";
import { I18nContext, i18nContext } from "./contexts/i18n-context";
import { defaultI18n } from "./consts";

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
  @property({ type: Array }) myMessageActions: ChatAction<ChatActionType>[] =
    [];
  @property({ type: Array }) theirMessageActions: ChatAction<ChatActionType>[] =
    [];
  @property({ type: Boolean }) isMobile = false;
  @property({ type: Boolean }) isSingleRoom = false;
  @property({ type: Boolean }) isEmojiPickerAvailable = false;
  @property({ type: Boolean }) isEmojiReactionAvailable = false;
  @property({ type: Boolean }) isReplyAvailable = false;
  @property({ type: Boolean }) isMessageAttachmentAvailable = false;
  @property({ type: Boolean }) isMarkdownAvailable = false;
  @property({ type: Boolean }) isTyping = false;
  @property({ type: Number }) height = 600;
  @property({ type: Object }) i18n: PartialI18nType = defaultI18n;
  @property({ type: String, reflect: true }) theme: ThemeType = "light";

  @provide({ context: currentUserContext })
  currentUserContext: ChatUser = {
    id: "",
  };

  @provide({ context: roomContext })
  roomsContext: RoomContext = {
    rooms: this.rooms,
    selectedRoomId: this.selectedRoomId,
    isLoadingRoom: this.isLoadingRoom,
    isLoadingMoreRooms: this.isLoadingMoreRooms,
    actions: this.roomActions,
  };

  @provide({ context: messageContext })
  messagesContext: MessageContext = {
    messages: this.messages,
    suggestions: this.suggestions,
    isLoadingMessage: this.isLoadingMessage,
    isLoadingMoreMessages: this.isLoadingMoreMessages,
    isMarkdownAvailable: this.isMarkdownAvailable,
    myMessageActions: this.myMessageActions,
    theirMessageActions: this.theirMessageActions,
    isEmojiReactionAvailable: this.isEmojiReactionAvailable,
    isReplyAvailable: this.isReplyAvailable,
    isTyping: this.isTyping,
  };

  @provide({ context: footerContext })
  footerContext: FooterContext = {
    isEmojiPickerAvailable: this.isEmojiPickerAvailable,
    isMessageAttachmentAvailable: this.isMessageAttachmentAvailable,
    attachments: this.attachments,
  };

  @provide({ context: sidebarContext })
  @property({ type: Boolean })
  showSidebar = true;

  @provide({ context: i18nContext })
  @property({ type: Object })
  i18nContext: I18nContext = {
    i18n: defaultI18n,
  };

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
      changedProperties.has("isLoadingMoreRooms") ||
      changedProperties.has("roomActions")
    ) {
      this.roomsContext = {
        rooms: this.rooms,
        selectedRoomId: this.selectedRoomId,
        isLoadingRoom: this.isLoadingRoom,
        isLoadingMoreRooms: this.isLoadingMoreRooms,
        actions: this.roomActions,
      };
    }
    if (
      changedProperties.has("messages") ||
      changedProperties.has("suggestions") ||
      changedProperties.has("isLoadingMessage") ||
      changedProperties.has("isLoadingMoreMessages") ||
      changedProperties.has("isMarkdownAvailable") ||
      changedProperties.has("myMessageActions") ||
      changedProperties.has("theirMessageActions") ||
      changedProperties.has("isEmojiReactionAvailable") ||
      changedProperties.has("isReplyAvailable") ||
      changedProperties.has("isTyping")
    ) {
      this.messagesContext = {
        messages: this.messages,
        suggestions: this.suggestions,
        isLoadingMessage: this.isLoadingMessage,
        isLoadingMoreMessages: this.isLoadingMoreMessages,
        isMarkdownAvailable: this.isMarkdownAvailable,
        myMessageActions: this.myMessageActions,
        theirMessageActions: this.theirMessageActions,
        isEmojiReactionAvailable: this.isEmojiReactionAvailable,
        isReplyAvailable: this.isReplyAvailable,
        isTyping: this.isTyping,
      };
    }

    if (
      changedProperties.has("isEmojiPickerAvailable") ||
      changedProperties.has("isMessageAttachmentAvailable") ||
      changedProperties.has("attachments")
    ) {
      this.footerContext = {
        isEmojiPickerAvailable: this.isEmojiPickerAvailable,
        isMessageAttachmentAvailable: this.isMessageAttachmentAvailable,
        attachments: this.attachments,
      };
    }

    if (changedProperties.has("i18n")) {
      this.i18nContext = {
        i18n: { ...defaultI18n, ...this.i18n },
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
        border: 0.1em solid var(--border);
        border-radius: 1.6em;
        box-shadow: rgb(0 0 0 / 15%) 0 0.3em 0.3em 0;
      }
    `,
  ];

  render() {
    return html`<div class="main" style="height: ${this.height}px">
      ${!this.isSingleRoom
        ? html`<chat-sidebar
            .show="${this.showSidebar}"
            .isMobile="${this.isMobile}"
            @close="${this._closeSidebar}"
          ></chat-sidebar>`
        : nothing}
      <chat-container
        .isMobile="${this.isMobile}"
        .isSingleRoom="${this.isSingleRoom}"
        @open-sidebar="${this._openSidebar}"
      ></chat-container>
    </div>`;
  }
}

if (!customElements.get("advanced-chat-kai")) {
  customElements.define("advanced-chat-kai", Main);
}

declare global {
  interface HTMLElementTagNameMap {
    "advanced-chat-kai": Main;
  }
}
