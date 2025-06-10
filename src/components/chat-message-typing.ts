import { LitElement, css, html } from "lit";
import { globalStyles } from "../styles";

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
        gap: 0.8em;
        margin-right: 40%;
        margin-bottom: 1.6em;
      }

      .chat-message-typing__avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4em;
        height: 4em;
        background-color: transparent;
        border-radius: 50%;
      }

      .chat-message-typing__body {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        align-items: center;
        padding: 0.8em 1.2em;
        background-color: var(--chat-surface-100);
        border-radius: 0.8em;
      }

      .chat-message-typing__dot {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0.8em;
        height: 0.8em;
        background-color: var(--chat-surface-300);
        border-radius: 50%;
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
          background-color: var(--chat-surface-300);
          transform: scale(1);
        }

        50% {
          background-color: var(--chat-surface-400);
        }

        100% {
          background-color: var(--chat-surface-500);
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
