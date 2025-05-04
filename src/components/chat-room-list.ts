import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles/global";
import "./chat-room-item";
import "./chat-loader";
import { RoomContext, roomContext } from "../contexts/room-context";

@customElement("chat-room-list")
export class ChatRoomList extends LitElement {
  @consume({ context: roomContext, subscribe: true })
  @property({ type: Object })
  roomContext!: RoomContext;

  @query(".chat-room-list__bottom") chatRoomListBottom!: HTMLDivElement;

  protected firstUpdated(): void {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("chat-room-list__bottom")) {
            this.dispatchEvent(new CustomEvent("load-more-rooms"));
          }
        }
      }
    });

    observer.observe(this.chatRoomListBottom);
  }

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

      .chat-room-list__bottom {
        height: 0.1em;
      }
    `,
  ];

  render() {
    return html`<div class="chat-room-list">
        ${this.roomContext.rooms.map(
          (item) =>
            html`<chat-room-item
              .active="${this.roomContext.selectedRoomId === item.id}"
              .room="${item}"
            ></chat-room-item>`,
        )}
      </div>
      <div class="chat-room-list__bottom"></div>
      ${this.roomContext.isLoadingMoreRooms
        ? html`<chat-loader
            style="padding: 1.6em 0;"
            .size="${2.4}"
          ></chat-loader>`
        : nothing} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-room-list": ChatRoomList;
  }
}
