import { LitElement, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles";
import "./chat-room-item";
import "./chat-loader";
import { RoomContext, roomContext } from "../contexts";

export class ChatRoomList extends LitElement {
  @consume({ context: roomContext, subscribe: true })
  @property({ type: Object })
  roomContext!: RoomContext;

  @query(".chat-room-list__bottom") chatRoomListBottom!: HTMLDivElement;

  @state() private _rectTop = 0;
  @state() private _rectBottom = 0;

  protected firstUpdated(): void {
    setTimeout(() => {
      const rect = this.getBoundingClientRect();
      this._rectTop = rect.top;
      this._rectBottom = rect.bottom;
    });

    const observer = new IntersectionObserver((entries) => {
      if (this.roomContext.isLoadingRoom) return;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("chat-room-list__bottom")) {
            this.dispatchEvent(
              new CustomEvent("load-more-rooms", { composed: true }),
            );
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
        border-top: 0.1em solid var(--chat-border);
      }

      .chat-room-list {
        position: relative;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
      }

      .chat-room-list__bottom {
        height: 0.1em;
      }
    `,
  ];

  render() {
    return html`<div class="chat-room-list">
        ${this.roomContext.isLoadingRoom
          ? html`<chat-loader
              style="position: absolute; top: 50%; transform: translateY(-50%);"
            ></chat-loader>`
          : this.roomContext.rooms.map(
              (item) =>
                html`<chat-room-item
                  .active="${this.roomContext.selectedRoomId === item.id}"
                  .room="${item}"
                  .showAvatar="${this.roomContext.showRoomAvatar}"
                  .actions="${this.roomContext.roomActions}"
                  .containerTop="${this._rectTop}"
                  .containerBottom="${this._rectBottom}"
                ></chat-room-item>`,
            )}
      </div>
      <div class="chat-room-list__bottom"></div>
      ${!this.roomContext.isLoadingRoom && this.roomContext.isLoadingMoreRooms
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
