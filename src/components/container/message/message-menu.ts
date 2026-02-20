import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../../../styles";
import {
  ChatMessage,
  ChatMessageReply,
  ReplyToMessageDetail,
} from "../../../types";

export class ChatMessageMenu extends LitElement {
  @property({ type: Boolean }) mine = false;
  @property({ type: Object }) message!: ChatMessage;
  @property({ type: Boolean }) isEmojiReactionAvailable = false;
  @property({ type: Boolean }) isReplyAvailable = false;
  @property({ type: Boolean }) isMessageActionAvailable = false;

  private get _iconBg() {
    return this.mine
      ? "var(--chat-message-mine-foreground)"
      : "var(--chat-muted-foreground)";
  }

  private _clickEmojiButton() {
    this.dispatchEvent(new CustomEvent("click-emoji-button"));
  }

  private _replyToMesssage() {
    const message = { ...this.message };
    message.replyTo = null;
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
        gap: var(--chat-spacing-2);
        align-items: center;
        padding: var(--chat-spacing-1);
        background-color: var(--chat-secondary);
        border: 1px solid var(--chat-border);
        border-radius: var(--chat-radius-lg);
        box-shadow: 0 0.125rem 0.25rem oklch(0% 0 0deg / 10%);
      }

      .chat-message-menu--mine {
        background-color: var(--chat-message-mine);
      }

      .chat-message-menu__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--chat-spacing-1);
        font-size: var(--chat-base-font-size);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius-full);
      }

      .chat-message-menu .chat-message-menu__button:hover {
        background-color: var(--chat-accent);
      }

      .chat-message-menu--mine .chat-message-menu__button:hover {
        background-color: oklch(0% 0 0deg / 10%);
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
              width="1.6em"
              height="1.6em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="${this._iconBg}"
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
      ${this.isReplyAvailable
        ? html`<button
            class="chat-message-menu__button"
            @click="${this._replyToMesssage}"
            aria-label="Reply to message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6em"
              height="1.6em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="${this._iconBg}"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
              <path d="m9 17-5-5 5-5" />
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
              width="1.6em"
              height="1.6em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="${this._iconBg}"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
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
