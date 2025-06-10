import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { consume } from "@lit/context";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { globalStyles } from "../styles/global";
import "./chat-avatar";
import "./chat-action-list";
import "./chat-emoji-picker";
import "./chat-message-menu";
import "./chat-message-reaction-list";
import "./chat-message-attachment-list";
import "./chat-message-reply-to";
import "./chat-deleted-message";
import { currentUserIdContext } from "../contexts/current-user-id-context";
import { ChatAction, ChatMessage } from "../types";

export class ChatMessageItem extends LitElement {
  @consume({ context: currentUserIdContext, subscribe: true })
  @property({ type: String })
  currentUserId: string | null = null;

  @property({ type: Object }) message!: ChatMessage;
  @property({ type: Boolean }) last = false;
  @property({ type: Boolean }) isReplying = false;
  @property({ type: Boolean }) isMarkdownAvailable = false;
  @property({ type: Array }) myMessageActions: ChatAction<
    string | number | boolean
  >[] = [];
  @property({ type: Array }) theirMessageActions: ChatAction<
    string | number | boolean
  >[] = [];
  @property({ type: Boolean }) isEmojiReactionAvailable = false;
  @property({ type: Boolean }) isReplyAvailable = false;
  @property({ type: Boolean }) showTheirAvatar = false;
  @property({ type: Boolean }) alignMyMessagesLeft = false;
  @property({ type: Number }) containerTop = 0;
  @property({ type: Number }) containerBottom = 0;

  @query("chat-message-menu") chatMessageMenu!: HTMLDivElement;

  @state() private _timer: NodeJS.Timeout | null = null;
  @state() private _hover = false;
  @state() private _showActionList = false;
  @state() private _showEmojiPicker = false;
  @state() private _content: string = "";
  @state() private _showPopupAbove = true;

  protected async updated(_changedProperties: PropertyValues): Promise<void> {
    if (
      _changedProperties.has("message") ||
      _changedProperties.has("isMarkdownAvailable")
    ) {
      if (this.isMarkdownAvailable) {
        const { micromark } = await import("micromark");
        this._content = micromark(this.message.content);
      } else {
        this._content = this.message.content;
      }
    }
  }

  private get _mine() {
    return this.message.senderId === this.currentUserId;
  }

  private get _isAlignedLeft() {
    return !this._mine || this.alignMyMessagesLeft;
  }

  private get _isMessageActionAvailable() {
    return (
      (this._mine && this.myMessageActions.length > 0) ||
      (!this._mine && this.theirMessageActions.length > 0)
    );
  }

  private get _isMessageMenuAvailable() {
    return (
      this.isEmojiReactionAvailable ||
      this.isReplyAvailable ||
      this._isMessageActionAvailable
    );
  }

  private _onMouseEnter() {
    clearTimeout(this._timer);
    this._hover = true;
  }

  // Set a delay to hide the menu so it doesn't disappear immediately when the mouse leaves
  private _onMouseLeave() {
    this._timer = setTimeout(() => {
      this._hover = false;
    }, 200);
  }

  private _onBlurMenu() {
    this._hover = false;
  }

  private _calculatePopupPosition() {
    const rect = this.chatMessageMenu.getBoundingClientRect();
    const spaceBelow = this.containerBottom - rect.bottom;
    const spaceAbove = rect.top - this.containerTop;

    this._showPopupAbove = spaceAbove >= spaceBelow;
  }

  private _toggleEmojiPicker() {
    this._calculatePopupPosition();
    this._showEmojiPicker = !this._showEmojiPicker;
  }

  private _closeEmojiPicker() {
    this._showEmojiPicker = false;
  }

  private _openActionList() {
    this._calculatePopupPosition();
    this._showActionList = true;
  }

  private _closeActionList() {
    this._showActionList = false;
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-message-item {
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        margin-right: 40%;
      }

      .chat-message-item--last {
        margin-bottom: 1.6em;
      }

      .chat-message-item--right-aligned {
        max-width: 60%;
        margin-right: 0;
        margin-left: auto;
      }

      .chat-message-item__container {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.8em;
      }

      .chat-message-item__meta {
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        align-items: baseline;
      }

      .chat-message-item__meta--right-aligned {
        justify-content: flex-end;
      }

      .chat-message-item__name {
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2em;
        font-weight: 600;
        color: var(--chat-text);
        white-space: nowrap;
      }

      .chat-message-item__date {
        font-size: 0.8em;
        font-weight: 600;
        color: var(--chat-subtext);
      }

      .chat-message-item__body {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.8em;
        padding: 0.8em 1.2em;
        font-size: 1.4em;
        color: var(--chat-text);
        background-color: var(--chat-surface-100);
        border-radius: 0.8em;
      }

      .chat-message-item__body--mine {
        color: var(--chat-text-on-brand, var(--chat-text));
        background-color: var(--chat-my-message-bg, var(--chat-surface-200));
      }

      .chat-message-item__body--chat-deleted {
        background-color: var(--chat-deleted);
      }

      .chat-message-item--selected .chat-message-item__body {
        background-color: var(--chat-surface-300);
      }

      .chat-message-item--selected .chat-message-item__body--mine {
        background-color: var(--chat-my-message-bg-selected, var(--chat-surface-300));
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "chat-message-item": true,
        "chat-message-item--right-aligned": !this._isAlignedLeft,
        "chat-message-item--last": this.last,
        "chat-message-item--selected":
          this.isReplying || this.message.isSelected,
      })}"
    >
      ${this._isAlignedLeft && this.showTheirAvatar
        ? html`<chat-avatar .src="${this.message.senderAvatar}"></chat-avatar>`
        : nothing}
      <div class="chat-message-item__container">
        <div
          class=${classMap({
            "chat-message-item__meta": true,
            "chat-message-item__meta--right-aligned": !this._isAlignedLeft,
          })}
        >
          ${this._isAlignedLeft
            ? html`<span class="chat-message-item__name"
                >${this.message.senderName}</span
              >`
            : nothing}<span class="chat-message-item__date"
            >${this.message.timestamp}</span
          >
        </div>
        <div
          class="${classMap({
            "chat-message-item__body": true,
            "chat-message-item__body--mine": this._mine,
            "chat-message-item__body--chat-deleted": this.message.isDeleted,
          })}"
          @mouseenter="${this._onMouseEnter}"
          @mouseleave="${this._onMouseLeave}"
          @focus="${this._onMouseEnter}"
          tabindex="0"
        >
          ${this.message.replyTo && !this.message.isDeleted
            ? html`<chat-message-reply-to
                .replyTo="${this.message.replyTo}"
                .mine="${this._mine}"
              ></chat-message-reply-to>`
            : nothing}
          ${this.message.isDeleted
            ? html`<chat-deleted-message
                .fontSize="${1.4}"
              ></chat-deleted-message>`
            : this.message.content !== ""
              ? html`<span
                  >${this.isMarkdownAvailable
                    ? unsafeHTML(this._content)
                    : this._content}</span
                >`
              : nothing}
          ${!this.message.isDeleted && this.message.attachments.length > 0
            ? html`<chat-message-attachment-list
                style="margin-top: 0.8em;"
                .attachments=${this.message.attachments}
                .mine="${this._mine}"
              ></chat-message-attachment-list>`
            : nothing}
          ${!this.message.isDeleted &&
          this._hover &&
          this._isMessageMenuAvailable
            ? html`<chat-message-menu
                style=${styleMap({
                  position: "absolute",
                  bottom: "0",
                  left: !this._isAlignedLeft ? "auto" : "calc(100% + 0.4em)",
                  right: !this._isAlignedLeft ? "calc(100% + 0.4em)" : "auto",
                })}
                .mine="${this._mine}"
                .message="${this.message}"
                .isEmojiReactionAvailable="${this.isEmojiReactionAvailable}"
                .isReplyAvailable="${this.isReplyAvailable}"
                .isMessageActionAvailable="${this._isMessageActionAvailable}"
                @click-emoji-button="${this._toggleEmojiPicker}"
                @click-action-button="${this._openActionList}"
                @blur="${this._onBlurMenu}"
              ></chat-message-menu>`
            : nothing}
          ${!this.message.isDeleted && this._showActionList
            ? html`<chat-action-list
                style=${styleMap({
                  position: "absolute",
                  top: this._showPopupAbove ? "auto" : "calc(100% + 0.4em)",
                  bottom: this._showPopupAbove ? "4em" : "auto",
                  right: !this._isAlignedLeft ? "calc(100% + 0.4em)" : "auto",
                  left: !this._isAlignedLeft ? "auto" : "calc(100% + 0.4em)",
                  "z-index": "1",
                })}
                .actionType="${"message"}"
                .messageId="${this.message.id}"
                .actions="${this._mine
                  ? this.myMessageActions
                  : this.theirMessageActions}"
                @select-action="${this._closeActionList}"
                @close="${this._closeActionList}"
              ></chat-action-list>`
            : nothing}
          ${!this.message.isDeleted &&
          this.isEmojiReactionAvailable &&
          this._showEmojiPicker
            ? html`<chat-emoji-picker
                style=${styleMap({
                  position: "absolute",
                  top: this._showPopupAbove ? "auto" : "calc(100% + 0.4em)",
                  bottom: this._showPopupAbove ? "4em" : "auto",
                  right: !this._isAlignedLeft ? "50%" : "auto",
                  left: !this._isAlignedLeft ? "auto" : "50%",
                  "z-index": "1",
                })}
                .width="${300}"
                .height="${180}"
                .messageId="${this.message.id}"
                @select-emoji="${this._closeEmojiPicker}"
                @close="${this._closeEmojiPicker}"
              ></chat-emoji-picker>`
            : nothing}
        </div>
        ${!this.message.isDeleted && this.message.reactions.size > 0
          ? html`<chat-message-reaction-list
              .messageId="${this.message.id}"
              .mine="${this._mine}"
              .alignMyMessagesLeft="${this.alignMyMessagesLeft}"
              .reactions="${this.message.reactions}"
            ></chat-message-reaction-list>`
          : nothing}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-item": ChatMessageItem;
  }
}
