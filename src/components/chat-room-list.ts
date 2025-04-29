import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import "./chat-room-item";
import "./chat-loader";

@customElement("chat-room-list")
export class ChatRoomList extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        overflow-y: scroll;
        border-top: 0.1em solid var(--border);
      }

      .chat-room-list {
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  render() {
    const items = Array.from({ length: 20 }, (_, i) => i);

    return html`<div class="chat-room-list">
        ${items.map(
          (i) =>
            html`<chat-room-item
              .active="${i === 0 ? true : false}"
            ></chat-room-item>`,
        )}
      </div>
      <chat-loader style="padding: 1.6em 0;" .size="${2.4}"></chat-loader>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-room-list": ChatRoomList;
  }
}
