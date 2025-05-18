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
  ChatItemType,
  ChatMessageAttachment,
  ChatMessageSuggestion,
  ChatRoom,
  Dialog,
  PartialI18nType,
  ThemeType,
} from "./types";
import { currentUserIdContext } from "./contexts/current-user-id-context";
import { RoomContext, roomContext } from "./contexts/room-context";
import { messageContext, MessageContext } from "./contexts/message-context";
import { FooterContext, footerContext } from "./contexts/footer-context";
import { I18nContext, i18nContext } from "./contexts/i18n-context";
import { defaultI18n } from "./consts";

/**
 * @tag advanded-chat-kai
 * 
 * @summary The main component of the chat application
 * 
 * @prop {ChatUser} currentUser - The current user using the chat
 * @prop {ChatRoom[]} rooms - The list of chat rooms showing in the sidebar
 * @prop {ChatItemType[]} messages - The list of messages in the room currently selected
 * @prop {ChatMessageAttachment[]} attachments - The list of attachments in the message
 * @prop {ChatMessageSuggestion[]} suggestions - The list of message suggestions
 * @prop {string | null} selectedRoomId - The id of the room currently selected
 * @prop {boolean} isLoadingRoom - Whether the room is loading or not
 * @prop {boolean} isLoadingMessage - Whether the message is loading or not
 * @prop {boolean} isLoadingMoreRooms - Whether more rooms are loading or not
 * @prop {boolean} isLoadingMoreMessages - Whether more messages are loading or not
 * @prop {string} inputMessage - The current message input used for two-way data binding
 * @prop {ChatAction<ChatActionType>[]} roomActions - The list of actions available for the room
 * @prop {ChatAction<ChatActionType>[]} myMessageActions - The list of actions available for the user's messages
 * @prop {ChatAction<ChatActionType>[]} theirMessageActions - The list of actions available for the other user's messages
 * @prop {boolean} isMobile - Whether the chat component should be rendered in mobile mode or not
 * @prop {boolean} isSingleRoom - Whether the sidebar and toggle button should be rendered or not
 * @prop {boolean} isEmojiPickerAvailable - Whether the emoji picker on the footer should be rendered or not
 * @prop {boolean} isEmojiReactionAvailable - Whether the emoji reaction button on the message should be rendered or not
 * @prop {boolean} isReplyAvailable - Whether the reply button on the message should be rendered or not
 * @prop {boolean} isMessageAttachmentAvailable - Whether the message attachment button on the footer should be rendered or not
 * @prop {boolean} isMarkdownAvailable - Whether the markdown message format should be rendered or not
 * @prop {boolean} isTyping - Whether the typing indicator should be rendered or not
 * @prop {boolean} showRoomAvatar - Whether the room avatar on the list of rooms should be rendered or not
 * @prop {boolean} showTheirAvatar - Whether the other user's avatar on the message should be rendered or not
 * @prop {Dialog} dialog - The dialog to be rendered
 * @prop {number} height - The height of the chat component
 * @prop {PartialI18nType} i18n - The i18n object to be used for translations
 * @prop {ThemeType} theme - The theme to be used for the chat component
 * 
 * @fires add-room - The event fired when the add button is clicked
 * @fires search-room - The event fired when the search input is changed
 * @fires select-action - The event fired when an action is selected
 * @fires load-more-rooms - The event fired when reaching the bottom of the room list
 * @fires select-room - The event fired when a room on the list is clicked
 * @fires load-more-messages - The event fired when reaching the top of the message list
 * @fires select-suggestion - The event fired when a suggestion is selected
 * @fires select-emoji - The event fired when an emoji is selected
 * @fires reply-to-message - The event fired when the reply button on the message is clicked
 * @fires click-reaction - The event fired when an existing reaction on the message is clicked
 * @fires download-attachment - The event fired when download button on the attachment is clicked
 * @fires remove-attachment - The event fired when an attachment is removed
 * @fires cancel-reply - The event fired when the reply is cancelled
 * @fires select-file - The event fired when a file is selected
 * @fires send-message - The event fired when a message is sent
 * @fires click-dialog-button - The event fired when a dialog button is clicked
 * 
 * @cssprop --white
 * @cssprop --black
 * @cssprop --success
 * @cssprop --danger
 * @cssprop --warning
 * @cssprop --info
 * @cssprop --surface-50
 * @cssprop --surface-100
 * @cssprop --surface-200
 * @cssprop --surface-300
 * @cssprop --surface-400
 * @cssprop --surface-500
 * @cssprop --surface-600
 * @cssprop --surface-700
 * @cssprop --surface-800
 * @cssprop --surface-900
 * @cssprop --surface-950
 * @cssprop --text - The default text color
 * @cssprop --border - The default border color
 * @cssprop --floating-item-border - The default border color for floating items
 * @cssprop --floating-item-box-shadow - The default box shadow for floating items
 * @cssprop --placeholder - The default placeholder color
 * @cssprop --deleted - The color used for deleted messages
 * @cssprop --overlay - The color used for overlays
 * @cssprop --base-font-size - The base font size of the chat component
 */
export class Main extends LitElement {
  @property({ type: String })
  currentUserId: string | null = null;
  @property({ type: Array }) rooms: ChatRoom[] = [];
  @property({ type: Array }) messages: ChatItemType[] = [];
  @property({ type: Array }) attachments: ChatMessageAttachment[] = [];
  @property({ type: Array }) suggestions: ChatMessageSuggestion[] = [];
  @property({ type: String }) selectedRoomId: string | null = null;
  @property({ type: Boolean }) isLoadingRoom = false;
  @property({ type: Boolean }) isLoadingMessage = false;
  @property({ type: Boolean }) isLoadingMoreRooms = false;
  @property({ type: Boolean }) isLoadingMoreMessages = false;
  @property({ type: String }) inputMessage = "";
  @property({ type: Array }) roomActions: ChatAction<ChatActionType>[] = [];
  @property({ type: Array }) myMessageActions: ChatAction<ChatActionType>[] =
    [];
  @property({ type: Array }) theirMessageActions: ChatAction<ChatActionType>[] =
    [];
  @property({ type: Boolean }) isMobile = false;
  @property({ type: Boolean }) isSingleRoom = false;
  @property({ type: Boolean }) isEmojiPickerAvailable = true;
  @property({ type: Boolean }) isEmojiReactionAvailable = true;
  @property({ type: Boolean }) isReplyAvailable = true;
  @property({ type: Boolean }) isMessageAttachmentAvailable = true;
  @property({ type: Boolean }) isMarkdownAvailable = false;
  @property({ type: Boolean }) isTyping = false;
  @property({ type: Boolean }) showRoomAvatar = true;
  @property({ type: Boolean }) showTheirAvatar = true;
  @property({ type: Object}) dialog: Dialog = null;
  @property({ type: Number }) height = 600;
  @property({ type: Object }) i18n: PartialI18nType = defaultI18n;
  @property({ type: String, reflect: true }) theme: ThemeType = "light";

  @provide({ context: currentUserIdContext })
  currentUserIdContext = this.currentUserId;

  @provide({ context: roomContext })
  roomsContext: RoomContext = {
    rooms: this.rooms,
    selectedRoomId: this.selectedRoomId,
    isLoadingRoom: this.isLoadingRoom,
    isLoadingMoreRooms: this.isLoadingMoreRooms,
    showRoomAvatar: this.showRoomAvatar,
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
    showTheirAvatar: this.showTheirAvatar,
  };

  @provide({ context: footerContext })
  footerContext: FooterContext = {
    isEmojiPickerAvailable: this.isEmojiPickerAvailable,
    isMessageAttachmentAvailable: this.isMessageAttachmentAvailable,
    inputMessage: this.inputMessage,
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
    if (changedProperties.has("currentUserId")) {
      this.currentUserIdContext = this.currentUserId;
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
        showRoomAvatar: this.showRoomAvatar,
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
        showTheirAvatar: this.showTheirAvatar,
      };
    }

    if (
      changedProperties.has("isEmojiPickerAvailable") ||
      changedProperties.has("isMessageAttachmentAvailable") ||
      changedProperties.has("inputMessage") ||
      changedProperties.has("attachments")
    ) {
      this.footerContext = {
        isEmojiPickerAvailable: this.isEmojiPickerAvailable,
        isMessageAttachmentAvailable: this.isMessageAttachmentAvailable,
        inputMessage: this.inputMessage,
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
        .dialog="${this.dialog}"
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
