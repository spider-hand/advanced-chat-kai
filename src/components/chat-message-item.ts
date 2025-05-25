import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { consume } from "@lit/context";
import { classMap } from "lit/directives/class-map.js";
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
  @property({ type: Number }) containerTop = 0;
  @property({ type: Number }) containerBottom = 0;

  @query("chat-message-menu") chatMessageMenu!: HTMLDivElement;

  @state() private _timer: number | null = null;
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

  private get mine() {
    return this.message.senderId === this.currentUserId;
  }

  private get isMessageActionAvailable() {
    return (
      (this.mine && this.myMessageActions.length > 0) ||
      (!this.mine && this.theirMessageActions.length > 0)
    );
  }

  private get isMessageMenuAvailable() {
    return (
      this.isEmojiReactionAvailable ||
      this.isReplyAvailable ||
      this.isMessageActionAvailable
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

      .chat-message-item--mine {
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

      .chat-message-item__name {
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2em;
        font-weight: 600;
        white-space: nowrap;
      }

      .chat-message-item__date {
        font-size: 0.8em;
        font-weight: 600;
        color: var(--surface-700);
      }

      .chat-message-item__body {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.8em;
        padding: 0.8em 1.2em;
        font-size: 1.4em;
        background-color: var(--surface-100);
        border-radius: 0.8em;
      }

      .chat-message-item__body--mine {
        background-color: var(--surface-200);
      }

      .chat-message-item__body--deleted {
        background-color: var(--deleted);
      }

      .chat-message-item--selected .chat-message-item__body {
        background-color: var(--surface-300);
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "chat-message-item": true,
        "chat-message-item--mine": this.mine,
        "chat-message-item--last": this.last,
        "chat-message-item--selected":
          this.isReplying || this.message.isSelected,
      })}"
    >
      ${!this.mine && this.showTheirAvatar
        ? html`<chat-avatar .src="${this.message.senderAvatar}"></chat-avatar>`
        : nothing}
      <div class="chat-message-item__container">
        ${!this.mine
          ? html`<div class="chat-message-item__meta">
              <span class="chat-message-item__name"
                >${this.message.senderName}</span
              ><span class="chat-message-item__date"
                >${this.message.timestamp}</span
              >
            </div>`
          : nothing}
        <div
          class="${classMap({
            "chat-message-item__body": true,
            "chat-message-item__body--mine": this.mine,
            "chat-message-item__body--deleted": this.message.isDeleted,
          })}"
          @mouseenter="${this._onMouseEnter}"
          @mouseleave="${this._onMouseLeave}"
        >
          ${this.message.replyTo && !this.message.isDeleted
            ? html`<chat-message-reply-to
                .replyTo="${this.message.replyTo}"
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
                .mine="${this.mine}"
              ></chat-message-attachment-list>`
            : nothing}
          ${!this.message.isDeleted &&
          this._hover &&
          this.isMessageMenuAvailable
            ? html`<chat-message-menu
                style="position: absolute; bottom: 0; left: ${this.mine
                  ? "auto"
                  : "calc(100% + 0.4em)"}; right: ${this.mine
                  ? "calc(100% + 0.4em)"
                  : "auto"};"
                .mine="${this.mine}"
                .message="${this.message}"
                .isEmojiReactionAvailable="${this.isEmojiReactionAvailable}"
                .isReplyAvailable="${this.isReplyAvailable}"
                .isMessageActionAvailable="${this.isMessageActionAvailable}"
                @click-emoji-button="${this._toggleEmojiPicker}"
                @click-action-button="${this._openActionList}"
              ></chat-message-menu>`
            : nothing}
          ${!this.message.isDeleted && this._showActionList
            ? html`<chat-action-list
                style="position: absolute; top: ${this._showPopupAbove
                  ? "auto"
                  : "calc(100% + 0.4em)"}; bottom: ${this._showPopupAbove
                  ? "4em"
                  : "auto"}; ${this.mine
                  ? "right: calc(100% + 0.4em);"
                  : "left: calc(100% + 0.4em);"} z-index: 1;"
                .actionType="${"message"}"
                .messageId="${this.message.id}"
                .actions="${this.mine
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
                style="position: absolute; top: ${this._showPopupAbove
                  ? "auto"
                  : "calc(100% + 0.4em)"}; bottom: ${this._showPopupAbove
                  ? "4em"
                  : "auto"}; ${this.mine
                  ? "right: 50%;"
                  : "left: 50%;"} z-index: 1;"
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
              .mine="${this.mine}"
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
