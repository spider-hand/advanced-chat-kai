import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { ChatMessageReply } from "../types";

export class ChatFooterReplyToSection extends LitElement {
  @property({ type: Object }) replyTo!: ChatMessageReply;

  private _cancelReply() {
    this.dispatchEvent(new CustomEvent("cancel-reply", { composed: true }));
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-footer-reply-to-section {
        display: flex;
        flex-direction: row;
        gap: 0.2em;
        align-items: center;
        font-size: 1em;
        color: var(--subtext);
      }

      .chat-footer-reply-to-section__name {
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
        color: var(--text);
        white-space: nowrap;
      }

      .chat-footer-reply-to-section__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2em;
        margin-right: 0.4em;
        background-color: transparent;
        border: none;
        border-radius: 100px;
      }

      .chat-footer-reply-to-section__button:hover {
        background-color: var(--surface-200);
      }
    `,
  ];

  render() {
    return html`<div class="chat-footer-reply-to-section">
      <button
        class="chat-footer-reply-to-section__button"
        @click="${this._cancelReply}"
        aria-label="Cancel reply"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.6em"
          viewBox="0 -960 960 960"
          width="1.6em"
          fill="var(--surface-700)"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
          />
        </svg>
      </button>
      Reply to
      <span class="chat-footer-reply-to-section__name"
        >${this.replyTo.senderName}</span
      >
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-footer-reply-to-section": ChatFooterReplyToSection;
  }
}
