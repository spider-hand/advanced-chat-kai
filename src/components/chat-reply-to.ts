import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { ReplyToMessageDetail } from "../types";

@customElement("chat-reply-to")
export class ChatReplyTo extends LitElement {
  @property({ type: Object }) replyTo!: ReplyToMessageDetail;

  private _cancelReply() {
    this.dispatchEvent(new CustomEvent("cancel-reply", { composed: true }));
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-reply-to {
        display: flex;
        flex-direction: row;
        gap: 0.2em;
        align-items: center;
        font-size: 1em;
      }

      .chat-reply-to__name {
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
        white-space: nowrap;
      }

      .chat-reply-to__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2em;
        margin-right: 0.4em;
        background-color: transparent;
        border: none;
        border-radius: 100px;
      }

      .chat-reply-to__button:hover {
        background-color: var(--gray-200);
      }
    `,
  ];

  render() {
    return html`<div class="chat-reply-to">
      <button class="chat-reply-to__button" @click="${this._cancelReply}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.6em"
          viewBox="0 -960 960 960"
          width="1.6em"
          fill="var(--gray-700)"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
          />
        </svg>
      </button>
      Reply to
      <span class="chat-reply-to__name">${this.replyTo.senderName}</span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-reply-to": ChatReplyTo;
  }
}
