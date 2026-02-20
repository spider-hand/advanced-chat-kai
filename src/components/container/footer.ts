import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { consume } from "@lit/context";
import { globalStyles } from "../../styles";
import {
  ChatRoom,
  SelectEmojiDetail,
  SelectFileDetail,
  SendMessageDetail,
} from "../../types";
import "./footer-reply-to-section";
import "./footer-attachment-section";
import "../shared/emoji-picker";
import {
  currentUserIdContext,
  RoomContext,
  roomContext,
  FooterContext,
  footerContext,
  I18nContext,
  i18nContext,
  MessageContext,
  messageContext,
} from "../../contexts";

export class ChatFooter extends LitElement {
  @consume({ context: currentUserIdContext, subscribe: true })
  @property({ type: String })
  currentUserId: string | null = null;

  @consume({ context: roomContext, subscribe: true })
  @property({ type: Object })
  roomContext!: RoomContext;

  @consume({ context: messageContext, subscribe: true })
  @property({ type: Object })
  messageContext!: MessageContext;

  @consume({ context: footerContext, subscribe: true })
  @property({ type: Object })
  footerContext!: FooterContext;

  @consume({ context: i18nContext, subscribe: true })
  @property({ type: Object })
  i18nContext!: I18nContext;

  @state() private _textareaValue = "";
  @state() private _showEmojiPicker = false;

  @query("textarea") private _textarea!: HTMLTextAreaElement;
  @query("input[type='file']") private _fileInput!: HTMLInputElement;

  protected updated(_changedProperties: PropertyValues): void {
    if (
      _changedProperties.has("footerContext") &&
      _changedProperties.get("footerContext")?.inputMessage !==
        this.footerContext.inputMessage
    ) {
      this._textareaValue = this.footerContext.inputMessage;
    }
  }

  private get _selectedRoom(): ChatRoom | undefined {
    return this.roomContext.rooms.find(
      (room) => room.id === this.roomContext.selectedRoomId,
    );
  }

  private get _isSendButtonEnabled(): boolean {
    return (
      this._textareaValue.trim() !== "" ||
      this.footerContext.attachments.length > 0
    );
  }

  private _handleTextareaInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this._textareaValue = target.value;
  }

  private _handleKeydown(event: KeyboardEvent) {
    if (
      this.footerContext.enterToSend &&
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      this._sendMessage();
    }
  }

  private _handleFileInput() {
    this._fileInput.click();
  }

  private _handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.dispatchEvent(
        new CustomEvent<SelectFileDetail>("select-file", {
          detail: {
            file,
          },
          composed: true,
        }),
      );
    }
  }

  private _onSelectEmoji(event: CustomEvent<SelectEmojiDetail>) {
    this._textareaValue += event.detail.emoji;
    this._textarea.value = this._textareaValue;
    this._showEmojiPicker = false;
  }

  private _toggleEmojiPicker() {
    this._showEmojiPicker = !this._showEmojiPicker;
  }

  private _closeEmojiPicker() {
    this._showEmojiPicker = false;
  }

  private _sendMessage() {
    if (!this._isSendButtonEnabled) return;
    this.dispatchEvent(
      new CustomEvent<SendMessageDetail>("send-message", {
        detail: {
          roomId: this.roomContext.selectedRoomId as string,
          senderId: this.currentUserId,
          content: this._textareaValue.trim(),
          replyTo: this.messageContext.replyTo,
        },
        composed: true,
      }),
    );
    this._textareaValue = "";
    if (this.messageContext.replyTo) {
      this.dispatchEvent(new CustomEvent("cancel-reply", { composed: true }));
    }
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-footer {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap: var(--chat-spacing-2);
        padding: var(--chat-spacing-2) var(--chat-spacing-3);
        border-top: 1px solid var(--chat-border);
      }

      .chat-footer__message {
        font-size: var(--chat-text-xs);
        color: var(--chat-foreground);
      }

      .chat-footer__textarea {
        display: flex;
        flex-grow: 1;
        padding: var(--chat-spacing-2);
        font-size: var(--chat-text-sm);
        color: var(--chat-foreground);
        outline: none;
        background-color: var(--chat-background);
        border: 1px solid var(--chat-input);
        border-radius: var(--chat-radius-lg);
        box-shadow: none;
      }

      .chat-footer__textarea::placeholder {
        color: var(--chat-muted-foreground);
      }

      .chat-footer__menu {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: var(--chat-spacing-2);
        align-items: center;
        justify-content: space-between;
        height: 2rem;
      }

      .chat-footer__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--chat-spacing-1);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius-full);
      }

      .chat-footer__file {
        display: none;
      }

      .chat-footer__button:hover {
        background-color: var(--chat-accent);
      }

      .chat-footer__button--emoji {
        margin-right: auto;
      }

      .chat-footer__button--send {
        margin-left: auto;
        background-color: var(--chat-primary);
      }

      .chat-footer__button--send:hover {
        background-color: var(--chat-primary);
        opacity: 0.9;
      }

      .chat-footer__button--disabled {
        pointer-events: none;
        opacity: 0.5;
      }
    `,
  ];

  render() {
    return html`<footer class="chat-footer">
      ${this._selectedRoom?.hasEnded
        ? html`<span class="chat-footer__message"
            >${this.i18nContext.i18n.CLOSED_ROOM_MESSAGE}</span
          >`
        : html` ${this.footerContext.attachments.length > 0
              ? html`<chat-footer-attachment-section
                  .attachments=${this.footerContext.attachments}
                ></chat-footer-attachment-section>`
              : nothing}
            ${this.messageContext.replyTo
              ? html`<chat-footer-reply-to-section
                  .replyTo="${this.messageContext.replyTo}"
                ></chat-footer-reply-to-section>`
              : nothing}
            <textarea
              class="chat-footer__textarea"
              .placeholder="${this.i18nContext.i18n
                .CHAT_FOOTER_TEXTAREA_PLACEHOLDER}"
              .value="${this._textareaValue}"
              @input="${this._handleTextareaInput}"
              @keydown="${this._handleKeydown}"
            ></textarea>
            <div class="chat-footer__menu">
              ${this.footerContext.isMessageAttachmentAvailable
                ? html`<button
                      class="chat-footer__button"
                      @click="${this._handleFileInput}"
                      aria-label="Select file"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--chat-muted-foreground)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"
                        />
                      </svg>
                    </button>
                    <input
                      type="file"
                      class="chat-footer__file"
                      @change="${this._handleFileChange}"
                    />`
                : nothing}
              ${this.footerContext.isEmojiPickerAvailable
                ? html`<button
                    class="chat-footer__button chat-footer__button--emoji"
                    @click="${this._toggleEmojiPicker}"
                    aria-label="Toggle emoji picker"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--chat-muted-foreground)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M22 11v1a10 10 0 1 1-9-10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" x2="9.01" y1="9" y2="9" />
                      <line x1="15" x2="15.01" y1="9" y2="9" />
                      <path d="M16 5h6" />
                      <path d="M19 2v6" />
                    </svg>
                  </button>`
                : nothing}
              <button
                class="${classMap({
                  "chat-footer__button": true,
                  "chat-footer__button--send": true,
                  "chat-footer__button--disabled": !this._isSendButtonEnabled,
                })}"
                .disabled="${!this._isSendButtonEnabled}"
                @click="${this._sendMessage}"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--chat-primary-foreground)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </button>
              ${this.footerContext.isEmojiPickerAvailable
                ? html`<chat-emoji-picker
                    style="position: absolute; bottom: calc(100% + 0.8em); left: 0; display: ${this
                      ._showEmojiPicker
                      ? "block"
                      : "none"};"
                    @select-emoji="${this._onSelectEmoji}"
                    @close="${this._closeEmojiPicker}"
                  ></chat-emoji-picker>`
                : nothing}
            </div>`}
    </footer>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-footer": ChatFooter;
  }
}
