import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { ChatDivider } from "../types";

export class ChatMessageDivider extends LitElement {
  @property({ type: Object }) message!: ChatDivider;

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .chat-message-divider {
        display: flex;
        flex-grow: 1;
        align-items: center;
      }

      .chat-message-divider::before,
      .chat-message-divider::after {
        flex: 1;
        margin: 0 0.8em;
        content: "";
        border-top: 1px solid var(--border);
      }

      .chat-message-divider__text {
        display: inline-block;
        max-width: 24em;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2em;
        font-weight: 600;
        color: var(--surface-600);
        white-space: nowrap;
      }
    `,
  ];

  render() {
    return html`<div class="chat-message-divider">
      <span class="chat-message-divider__text">${this.message.content} </span>
    </div>`;
  }
}

if (!customElements.get("chat-message-divider")) {
  customElements.define("chat-message-divider", ChatMessageDivider);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-divider": ChatMessageDivider;
  }
}
