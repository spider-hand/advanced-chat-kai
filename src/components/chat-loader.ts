import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";


export class ChatLoader extends LitElement {
  @property({ type: Number }) size = 3.2;

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        align-self: center;
      }

      .chat-loader {
        border: 0.4em solid var(--gray-300);
        border-top: 0.4em solid var(--gray-500);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  render() {
    return html`<div
      class="chat-loader"
      style="width: ${this.size}em; height: ${this.size}em;"
    ></div>`;
  }
}

if (!customElements.get("chat-loader")) {
  customElements.define("chat-loader", ChatLoader);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-loader": ChatLoader;
  }
}
