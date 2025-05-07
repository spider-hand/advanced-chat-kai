import { LitElement, css, html, nothing } from "lit";
import { consume } from "@lit/context";
import { customElement, property, state } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { sidebarContext } from "../contexts/sidebar-context";
import "./chat-action-list";
import { RoomContext, roomContext } from "../contexts/room-context";
import { ChatRoom } from "../types";
import {
  RoomActionContext,
  roomActionContext,
} from "../contexts/room-action-context";

@customElement("chat-header")
export class ChatHeader extends LitElement {
  @consume({ context: sidebarContext, subscribe: true })
  @property({ type: Boolean })
  showSidebar!: boolean;

  @consume({ context: roomContext, subscribe: true })
  @property({ type: Object })
  roomContext!: RoomContext;

  @consume({ context: roomActionContext, subscribe: true })
  @property({ type: Object })
  roomActionsContext!: RoomActionContext;

  @state() private _showActionList = false;

  private get _selectedRoom(): ChatRoom | undefined {
    return this.roomContext.rooms.find(
      (room) => room.id === this.roomContext.selectedRoomId,
    );
  }

  private _openSidebar() {
    this.dispatchEvent(new CustomEvent("open-sidebar", { composed: true }));
  }

  private _toggleActionList() {
    this._showActionList = !this._showActionList;
  }

  private _closeActionList() {
    this._showActionList = false;
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        flex-grow: 1;
      }

      .chat-header {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        gap: 1.6em;
        align-items: center;
        min-height: 6.4em;
        max-height: 6.4em;
        padding: 0 1.2em;
        border-bottom: 0.1em solid var(--border);
      }

      .chat-header__body {
        display: flex;
        flex-direction: column;
        gap: 0.4em;
        justify-content: center;
        width: 10em;
      }

      .chat-header__title {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.6em;
        font-weight: 600;
        white-space: nowrap;
      }

      .chat-header__subtitle {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2em;
        white-space: nowrap;
      }

      .chat-header__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4em;
        background-color: transparent;
        border: none;
        border-radius: 100px;
      }

      .chat-header__button:hover {
        background-color: var(--gray-100);
      }
    `,
  ];

  render() {
    return html`<header class="chat-header">
      <button
        class="chat-header__button"
        style="display: ${!this.showSidebar ? "block" : "none"}"
        @click="${this._openSidebar}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2.4em"
          viewBox="0 -960 960 960"
          width="2.4em"
          fill="var(--gray-700)"
        >
          <path
            d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z"
          />
        </svg>
      </button>
      <div class="chat-header__body">
        <span class="chat-header__title"
          >${this._selectedRoom?.title ?? ""}</span
        >
        <span class="chat-header__subtitle"
          >${this._selectedRoom?.subtitle ?? ""}</span
        >
      </div>
      ${this.roomActionsContext.actions.length > 0
        ? html`<button
            class="chat-header__button"
            style="margin-left: auto;"
            @click="${this._toggleActionList}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2.4em"
              viewBox="0 -960 960 960"
              width="2.4em"
              fill="var(--gray-700)"
            >
              <path
                d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
              />
            </svg>
          </button>`
        : nothing}
      ${this._showActionList
        ? html`<chat-action-list
            style="position: absolute; top: 4em; right: 1.2em;"
            .actionType="${"chat"}"
            .actions="${this.roomActionsContext.actions}"
            @select-action="${this._closeActionList}"
            @close="${this._closeActionList}"
          ></chat-action-list>`
        : nothing}
    </header>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-header": ChatHeader;
  }
}
