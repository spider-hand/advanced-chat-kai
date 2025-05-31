import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles/global";
import { ChatMessage, ChatMessageReply, ReplyToMessageDetail } from "../types";

export class ChatMessageMenu extends LitElement {
  @property({ type: Boolean }) mine = false;
  @property({ type: Object }) message!: ChatMessage;
  @property({ type: Boolean }) isEmojiReactionAvailable = false;
  @property({ type: Boolean }) isReplyAvailable = false;
  @property({ type: Boolean }) isMessageActionAvailable = false;

  private _clickEmojiButton() {
    this.dispatchEvent(new CustomEvent("click-emoji-button"));
  }

  private _replyToMesssage() {
    const message = { ...this.message };
    delete message.replyTo;
    const replyTo: ChatMessageReply = message;

    this.dispatchEvent(
      new CustomEvent<ReplyToMessageDetail>("reply-to-message", {
        detail: {
          replyTo: replyTo,
        },
        composed: true,
      }),
    );
  }

  private _clickActionButton() {
    this.dispatchEvent(new CustomEvent("click-action-button"));
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-message-menu {
        z-index: 1;
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        align-items: center;
        padding: 0.4em;
        background-color: var(--surface-100);
        border: var(--floating-item-border);
        border-radius: 0.8em;
        box-shadow: var(--floating-item-box-shadow);
      }

      .chat-message-menu--mine {
        background-color: var(--surface-200);
      }

      .chat-message-menu__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4em;
        font-size: var(--base-font-size);
        background-color: transparent;
        border: none;
        border-radius: 100px;
      }

      .chat-message-menu .chat-message-menu__button:hover {
        background-color: var(--surface-200);
      }

      .chat-message-menu--mine .chat-message-menu__button:hover {
        background-color: var(--surface-300);
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "chat-message-menu": true,
        "chat-message-menu--mine": this.mine,
      })}"
    >
      ${this.isEmojiReactionAvailable
        ? html`<button
            class="chat-message-menu__button"
            @click="${this._clickEmojiButton}"
            aria-label="Add emoji reaction"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 -960 960 960"
              width="2em"
              fill="var(--surface-700)"
            >
              <path
                d="M480-480Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q33 0 65 5t62 15q23 8 29 23.5t1 30.5q-5 15-18.5 23.5T588-781q-26-9-52.5-14t-55.5-5q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35q-5-19 5-31t25-15q15-3 29.5 4.5T871-564q5 20 7 41t2 43q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm320-680h-40q-17 0-28.5-11.5T720-800q0-17 11.5-28.5T760-840h40v-40q0-17 11.5-28.5T840-920q17 0 28.5 11.5T880-880v40h40q17 0 28.5 11.5T960-800q0 17-11.5 28.5T920-760h-40v40q0 17-11.5 28.5T840-680q-17 0-28.5-11.5T800-720v-40ZM620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q58 0 107-28t79-76q6-12-1-24t-21-12H316q-14 0-21 12t-1 24q30 48 79.5 76T480-260Z"
              />
            </svg>
          </button>`
        : nothing}
      ${this.isReplyAvailable
        ? html`<button
            class="chat-message-menu__button"
            @click="${this._replyToMesssage}"
            aria-label="Reply to message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 -960 960 960"
              width="2em"
              fill="var(--surface-700)"
            >
              <path
                d="m273-480 116 116q12 12 11.5 28T388-308q-12 11-28 11.5T332-308L148-492q-12-12-12-28t12-28l184-184q11-11 27.5-11t28.5 11q12 12 12 28.5T388-675L273-560h367q83 0 141.5 58.5T840-360v120q0 17-11.5 28.5T800-200q-17 0-28.5-11.5T760-240v-120q0-50-35-85t-85-35H273Z"
              />
            </svg>
          </button>`
        : nothing}
      ${this.isMessageActionAvailable
        ? html`<button
            class="chat-message-menu__button"
            @click="${this._clickActionButton}"
            aria-label="Message actions"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 -960 960 960"
              width="2em"
              fill="var(--surface-700)"
            >
              <path
                d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
              />
            </svg>
          </button>`
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-menu": ChatMessageMenu;
  }
}
