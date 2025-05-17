import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { ChatMessage } from "../types";
import "./chat-avatar";

export class ChatMessageReplyTo extends LitElement {
  @property({ type: Object }) replyTo!: ChatMessage;

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-message-reply-to {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        gap: 0.8em;
      }

      .chat-message-reply-to__container {
        display: flex;
        flex-direction: column;
        gap: 0.4em;
      }

      .chat-message-reply-to__text {
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2em;
        white-space: nowrap;
      }

      .chat-message-reply-to__text--highlight {
        font-weight: 600;
      }
    `,
  ];

  render() {
    return html`<div class="chat-message-reply-to">
      ${this.replyTo.senderAvatar
        ? html`<chat-avatar
            .size="${2.4}"
            .src="${this.replyTo.senderAvatar}"
          ></chat-avatar>`
        : nothing}
      <div class="chat-message-reply-to__container">
        <span
          class="chat-message-reply-to__text chat-message-reply-to__text--highlight"
          >${this.replyTo.senderName}</span
        >

        ${!this.replyTo.isDeleted
          ? html`<span class="chat-message-reply-to__text">
              ${this.replyTo.content}</span
            >`
          : html`<chat-deleted-message
              .fontSize="${1.2}"
            ></chat-deleted-message>`}
      </div>
    </div>`;
  }
}

if (!customElements.get("chat-message-reply-to")) {
  customElements.define("chat-message-reply-to", ChatMessageReplyTo);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-reply-to": ChatMessageReplyTo;
  }
}
