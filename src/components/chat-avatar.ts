import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("chat-avatar")
export class ChatAvatar extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4em;
        height: 4em;
        background-color: var(--gray-500);
        border-radius: 50%;
      }
    `,
  ];

  render() {
    return html`<div class="chat-avatar"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-avatar": ChatAvatar;
  }
}
