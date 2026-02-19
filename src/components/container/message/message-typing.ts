import { LitElement, css, html } from "lit";
import { globalStyles } from "../../../styles";

export class ChatMessageTyping extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-message-typing {
        display: flex;
        flex-direction: row;
        gap: var(--chat-spacing-2);
        margin-right: 40%;
        margin-bottom: var(--chat-spacing-4);
      }

      .chat-message-typing__avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        background-color: transparent;
        border-radius: 50%;
      }

      .chat-message-typing__body {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: var(--chat-spacing-2);
        align-items: center;
        padding: var(--chat-spacing-2) var(--chat-spacing-3);
        background-color: var(--chat-secondary);
        border-radius: var(--chat-radius-lg);
      }

      .chat-message-typing__dot {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--chat-spacing-2);
        height: var(--chat-spacing-2);
        background-color: var(--chat-muted-foreground);
        border-radius: 50%;
        opacity: 0.4;
        animation: typing 0.8s infinite alternate;
      }

      .chat-message-typing__dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .chat-message-typing__dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0% {
          opacity: 0.4;
          transform: scale(1);
        }

        50% {
          opacity: 0.6;
        }

        100% {
          opacity: 1;
          transform: scale(1.25);
        }
      }
    `,
  ];

  render() {
    return html`<div class="chat-message-typing">
      <div class="chat-message-typing__avatar"></div>
      <div class="chat-message-typing__body">
        <div class="chat-message-typing__dot"></div>
        <div class="chat-message-typing__dot"></div>
        <div class="chat-message-typing__dot"></div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-typing": ChatMessageTyping;
  }
}
