import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles";

export class ChatAvatar extends LitElement {
  @property({ type: Number }) size = 3.2;
  @property({ type: String }) src = "";

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
        border-radius: 50%;
      }
    `,
  ];

  render() {
    return html`<img
      class="chat-avatar"
      style="width: ${this.size}em; height: ${this.size}em;"
      src="${this.src}"
      alt="Avatar"
    ></img>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-avatar": ChatAvatar;
  }
}
