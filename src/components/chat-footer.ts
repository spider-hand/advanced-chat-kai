import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles/global";
import {
  ChatRoom,
  SelecteEmojiDetail,
  SelectFileDetail,
  SendMessageDetail,
} from "../types";
import { RoomContext, roomContext } from "../contexts/room-context";
import { currentUserIdContext } from "../contexts/current-user-id-context";
import "./chat-footer-reply-to-section";
import "./chat-footer-attachment-section";
import { FooterContext, footerContext } from "../contexts/footer-context";
import { I18nContext, i18nContext } from "../contexts/i18n-context";
import { MessageContext, messageContext } from "../contexts/message-context";

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

  private _onSelectEmoji(event: CustomEvent<SelecteEmojiDetail>) {
    this._textarea.value += event.detail.emoji;
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
          roomId: this.roomContext.selectedRoomId,
          senderId: this.currentUserId,
          content: this._textareaValue.trim(),
        },
        composed: true,
      }),
    );
    this._textareaValue = "";
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
        gap: 0.8em;
        padding: 0.8em 1.2em;
        border-top: 0.1em solid var(--border);
      }

      .chat-footer__message {
        font-size: 1.2em;
      }

      .chat-footer__textarea {
        display: flex;
        flex-grow: 1;
        padding: 0.8em;
        font-size: 1.4em;
        outline: none;
        background-color: var(--surface-50);
        border: 0.1em solid var(--border);
        border-radius: 0.8em;
        box-shadow: none;
      }

      .chat-footer__textarea::placeholder {
        color: var(--placeholder);
      }

      .chat-footer__menu {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        align-items: center;
        justify-content: space-between;
        height: 3.2em;
      }

      .chat-footer__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4em;
        background-color: transparent;
        border: none;
        border-radius: 100px;
      }

      .chat-footer__file {
        display: none;
      }

      .chat-footer__button:hover {
        background-color: var(--surface-100);
      }

      .chat-footer__button--emoji {
        margin-right: auto;
      }

      .chat-footer__button--send {
        margin-left: auto;
        background-color: var(--surface-700);
      }

      .chat-footer__button--send:hover {
        background-color: var(--surface-800);
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
            >${this.i18nContext.i18n.closedRoomMessage}</span
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
                .chatFooterTextareaPlaceholder}"
              .value="${this._textareaValue}"
              @input="${this._handleTextareaInput}"
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
                        height="2.4em"
                        viewBox="0 -960 960 960"
                        width="2.4em"
                        fill="var(--surface-700)"
                      >
                        <path
                          d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z"
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
                      height="2.4em"
                      viewBox="0 -960 960 960"
                      width="2.4em"
                      fill="var(--surface-700)"
                    >
                      <path
                        d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-100q58 0 107-28t79-76q6-12-1-24t-21-12H316q-14 0-21 12t-1 24q30 48 79.5 76T480-260Z"
                      />
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
                  height="2.4em"
                  viewBox="0 -960 960 960"
                  width="2.4em"
                  fill="var(--surface-50)"
                >
                  <path
                    d="M440-647 244-451q-12 12-28 11.5T188-452q-11-12-11.5-28t11.5-28l264-264q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l264 264q11 11 11 27.5T772-452q-12 12-28.5 12T715-452L520-647v447q0 17-11.5 28.5T480-160q-17 0-28.5-11.5T440-200v-447Z"
                  />
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
