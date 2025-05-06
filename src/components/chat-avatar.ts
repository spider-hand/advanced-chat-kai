import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("chat-avatar")
export class ChatAvatar extends LitElement {
  @property({ type: Number }) size = 4;

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
        background-color: var(--gray-500);
        border-radius: 50%;
      }
    `,
  ];

  render() {
    return html`<div
      class="chat-avatar"
      style="width: ${this.size}em; height: ${this.size}em;"
    ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-avatar": ChatAvatar;
  }
}
