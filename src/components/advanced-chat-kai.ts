import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { provide } from "@lit/context";
import { globalStyles } from "../styles";
import "./container/container";
import "./sidebar/sidebar";
import {
  AdvancedChatKaiProps,
  ChatAction,
  ChatItemType,
  ChatMessageAttachment,
  ChatMessageReply,
  ChatMessageSuggestion,
  ChatRoom,
  Dialog,
  PartialI18nType,
  ThemeType,
} from "../types";
import {
  currentUserIdContext,
  sidebarContext,
  RoomContext,
  roomContext,
  messageContext,
  MessageContext,
  FooterContext,
  footerContext,
  I18nContext,
  i18nContext,
} from "../contexts";
import {
  DEFAULT_I18N,
  FOOTER_CONTEXT_KEYS,
  MESSAGE_CONTEXT_KEYS,
  ROOM_CONTEXT_KEYS,
} from "../consts";

/**
 * @tag advanced-chat-kai
 *
 * @summary The main component of the chat application
 *
 * @prop {ChatUser} currentUser - The current user using the chat
 * @prop {ChatRoom[]} rooms - The list of chat rooms showing in the sidebar
 * @prop {ChatItemType[]} messages - The list of messages in the room currently selected
 * @prop {ChatMessageAttachment[]} attachments - The list of attachments in the message
 * @prop {ChatMessageSuggestion[]} suggestions - The list of message suggestions
 * @prop {ChatMessageReply | null} replyTo - The message being replied to, if any
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
 * @prop {boolean} alignMyMessagesLeft - Whether my messages should be aligned to the left or not
 * @prop {boolean} enterToSend - Whether the enter key should send the message or not
 * @prop {((date: Date) => string) | null} timestampFormatter - Custom function to format Date timestamps
 * @prop {Dialog} dialog - The dialog to be rendered
 * @prop {string} height - The height of the chat component
 * @prop {string} width - The width of the chat component
 * @prop {PartialI18nType} i18n - The i18n object to be used for translations
 * @prop {ThemeType} theme - The theme to be used for the chat component
 *
 * @fires add-room - The event fired when the add button is clicked
 * @fires search-room - The event fired when the search input is changed
 * @fires load-more-rooms - The event fired when reaching the bottom of the room list
 * @fires select-room - The event fired when a room on the list is clicked
 * @fires select-room-action - The event fired when an action on the room is clicked
 * @fires load-more-messages - The event fired when reaching the top of the message list
 * @fires select-message-action - The event fired when an action on the message is clicked
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
 * @cssprop --chat-base-font-size - The base font size of the chat component
 * @cssprop --chat-background - Background color for main areas
 * @cssprop --chat-foreground - Main text color
 * @cssprop --chat-card - Card background color
 * @cssprop --chat-card-foreground - Card text color
 * @cssprop --chat-popover - Popover/dropdown background color
 * @cssprop --chat-popover-foreground - Popover/dropdown text color
 * @cssprop --chat-primary - Primary accent color (buttons, notifications)
 * @cssprop --chat-primary-foreground - Text color on primary backgrounds
 * @cssprop --chat-secondary - Secondary color (their messages)
 * @cssprop --chat-secondary-foreground - Text color on secondary backgrounds
 * @cssprop --chat-muted - Muted background color
 * @cssprop --chat-muted-foreground - Muted/placeholder text color
 * @cssprop --chat-accent - Hover/selection background color
 * @cssprop --chat-accent-foreground - Text color on accent backgrounds
 * @cssprop --chat-destructive - Destructive action color
 * @cssprop --chat-destructive-foreground - Text color on destructive backgrounds
 * @cssprop --chat-border - Default border color
 * @cssprop --chat-input - Input border color
 * @cssprop --chat-ring - Focus ring color
 * @cssprop --chat-radius - Default border radius
 * @cssprop --chat-sidebar - Sidebar background color
 * @cssprop --chat-sidebar-foreground - Sidebar text color
 * @cssprop --chat-sidebar-primary - Sidebar primary color
 * @cssprop --chat-sidebar-primary-foreground - Text on sidebar primary
 * @cssprop --chat-sidebar-accent - Sidebar hover/accent color
 * @cssprop --chat-sidebar-accent-foreground - Text on sidebar accent
 * @cssprop --chat-sidebar-border - Sidebar border color
 * @cssprop --chat-sidebar-ring - Sidebar focus ring color
 * @cssprop --chat-message-mine - Background color for current user's messages (defaults to accent)
 * @cssprop --chat-message-mine-foreground - Text color for current user's messages (defaults to accent-foreground)
 * @cssprop --chat-success - Success status color (green)
 * @cssprop --chat-success-foreground - Text color on success backgrounds
 * @cssprop --chat-danger - Danger status color (defaults to destructive)
 * @cssprop --chat-danger-foreground - Text color on danger backgrounds
 * @cssprop --chat-warning - Warning status color (amber)
 * @cssprop --chat-warning-foreground - Text color on warning backgrounds
 * @cssprop --chat-info - Info status color (blue)
 * @cssprop --chat-info-foreground - Text color on info backgrounds
 */
export class AdvancedChatKai extends LitElement {
  @property({ type: String })
  currentUserId: string | null = null;
  @property({ type: Array }) rooms: ChatRoom[] = [];
  @property({ type: Array }) messages: ChatItemType[] = [];
  @property({ type: Array }) attachments: ChatMessageAttachment[] = [];
  @property({ type: Array }) suggestions: ChatMessageSuggestion[] = [];
  @property({ type: Object }) replyTo: ChatMessageReply | null = null;
  @property({ type: String }) selectedRoomId: string | null = null;
  @property({ type: Boolean }) isLoadingRoom = false;
  @property({ type: Boolean }) isLoadingMessage = false;
  @property({ type: Boolean }) isLoadingMoreRooms = false;
  @property({ type: Boolean }) isLoadingMoreMessages = false;
  @property({ type: String }) inputMessage = "";
  @property({ type: Array }) roomActions: ChatAction<
    string | number | boolean
  >[] = [];
  @property({ type: Array }) myMessageActions: ChatAction<
    string | number | boolean
  >[] = [];
  @property({ type: Array }) theirMessageActions: ChatAction<
    string | number | boolean
  >[] = [];
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
  @property({ type: Boolean }) alignMyMessagesLeft = false;
  @property({ type: Boolean }) enterToSend = false;
  @property({ attribute: false }) timestampFormatter:
    | ((date: Date) => string)
    | null = null;
  @property({ type: Object }) dialog: Dialog | null = null;
  @property({ type: String }) height = "60em";
  @property({ type: String }) width = "80em";
  @property({ type: Object }) i18n: PartialI18nType = DEFAULT_I18N;
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
    roomActions: this.roomActions,
  };

  @provide({ context: messageContext })
  messagesContext: MessageContext = {
    messages: this.messages,
    suggestions: this.suggestions,
    replyTo: this.replyTo,
    isLoadingMessage: this.isLoadingMessage,
    isLoadingMoreMessages: this.isLoadingMoreMessages,
    isMarkdownAvailable: this.isMarkdownAvailable,
    myMessageActions: this.myMessageActions,
    theirMessageActions: this.theirMessageActions,
    isEmojiReactionAvailable: this.isEmojiReactionAvailable,
    isReplyAvailable: this.isReplyAvailable,
    isTyping: this.isTyping,
    showTheirAvatar: this.showTheirAvatar,
    alignMyMessagesLeft: this.alignMyMessagesLeft,
    timestampFormatter: this.timestampFormatter,
  };

  @provide({ context: footerContext })
  footerContext: FooterContext = {
    isEmojiPickerAvailable: this.isEmojiPickerAvailable,
    isMessageAttachmentAvailable: this.isMessageAttachmentAvailable,
    inputMessage: this.inputMessage,
    attachments: this.attachments,
    enterToSend: this.enterToSend,
  };

  @provide({ context: sidebarContext })
  @property({ type: Boolean })
  showSidebar = true;

  @provide({ context: i18nContext })
  @property({ type: Object })
  i18nContext: I18nContext = {
    i18n: DEFAULT_I18N,
  };

  protected updated(
    changedProperties: Map<
      keyof AdvancedChatKaiProps,
      AdvancedChatKaiProps[keyof AdvancedChatKaiProps]
    >,
  ): void {
    const keys = [...changedProperties.keys()];

    if (keys.includes("currentUserId")) {
      this.currentUserIdContext = this.currentUserId;
    }

    if (
      keys.some((key) => ROOM_CONTEXT_KEYS.includes(key as keyof RoomContext))
    ) {
      this.roomsContext = {
        rooms: this.rooms,
        selectedRoomId: this.selectedRoomId,
        isLoadingRoom: this.isLoadingRoom,
        isLoadingMoreRooms: this.isLoadingMoreRooms,
        showRoomAvatar: this.showRoomAvatar,
        roomActions: this.roomActions,
      };
    }

    if (
      keys.some((key) =>
        MESSAGE_CONTEXT_KEYS.includes(key as keyof MessageContext),
      )
    ) {
      this.messagesContext = {
        messages: this.messages,
        suggestions: this.suggestions,
        replyTo: this.replyTo,
        isLoadingMessage: this.isLoadingMessage,
        isLoadingMoreMessages: this.isLoadingMoreMessages,
        isMarkdownAvailable: this.isMarkdownAvailable,
        myMessageActions: this.myMessageActions,
        theirMessageActions: this.theirMessageActions,
        isEmojiReactionAvailable: this.isEmojiReactionAvailable,
        isReplyAvailable: this.isReplyAvailable,
        isTyping: this.isTyping,
        showTheirAvatar: this.showTheirAvatar,
        alignMyMessagesLeft: this.alignMyMessagesLeft,
        timestampFormatter: this.timestampFormatter,
      };
    }

    if (
      keys.some((key) =>
        FOOTER_CONTEXT_KEYS.includes(key as keyof FooterContext),
      )
    ) {
      this.footerContext = {
        isEmojiPickerAvailable: this.isEmojiPickerAvailable,
        isMessageAttachmentAvailable: this.isMessageAttachmentAvailable,
        inputMessage: this.inputMessage,
        attachments: this.attachments,
        enterToSend: this.enterToSend,
      };
    }

    if (keys.includes("i18n")) {
      this.i18nContext = {
        i18n: { ...DEFAULT_I18N, ...this.i18n },
      };
    }
  }

  private get _isFullscreen() {
    return this.height === "100vh" && this.width === "100vw";
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
      :host {
        display: block;
        width: fit-content;
        height: fit-content;
      }

      .main {
        position: relative;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        border: 0.1em solid var(--chat-border);
        border-radius: 1.6em;
        box-shadow: rgb(0 0 0 / 15%) 0 0.3em 0.3em 0;
      }

      .main--fullscreen {
        border-radius: 0;
      }
    `,
  ];

  render() {
    return html`<div
      class=${classMap({
        main: true,
        "main--fullscreen": this._isFullscreen,
      })}
      style="height: ${this.height}; width: ${this.width}"
    >
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

declare global {
  interface HTMLElementTagNameMap {
    "advanced-chat-kai": AdvancedChatKai;
  }
}
