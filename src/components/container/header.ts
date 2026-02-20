import { LitElement, css, html, nothing } from "lit";
import { consume } from "@lit/context";
import { property, state } from "lit/decorators.js";
import { globalStyles } from "../../styles";
import "../shared/action-list";
import { sidebarContext, RoomContext, roomContext } from "../../contexts";
import { ChatRoom } from "../../types";

export class ChatHeader extends LitElement {
  @consume({ context: sidebarContext, subscribe: true })
  @property({ type: Boolean })
  showSidebar!: boolean;

  @consume({ context: roomContext, subscribe: true })
  @property({ type: Object })
  roomContext!: RoomContext;

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
      }

      .chat-header {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        gap: var(--chat-spacing-4);
        align-items: center;
        min-height: 4rem;
        max-height: 4rem;
        padding: 0 var(--chat-spacing-3);
        border-bottom: 1px solid var(--chat-border);
      }

      .chat-header__body {
        display: flex;
        flex-direction: column;
        gap: var(--chat-spacing-1);
        justify-content: center;
        width: 15rem;
      }

      .chat-header__title {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--chat-text-base);
        font-weight: 600;
        color: var(--chat-foreground);
        white-space: nowrap;
      }

      .chat-header__subtitle {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--chat-text-xs);
        color: var(--chat-muted-foreground);
        white-space: nowrap;
      }

      .chat-header__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--chat-spacing-1);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius-full);
      }

      .chat-header__button:hover {
        background-color: var(--chat-accent);
      }
    `,
  ];

  render() {
    return html`<header class="chat-header">
      <button
        class="chat-header__button"
        style="display: ${!this.showSidebar ? "block" : "none"}"
        @click="${this._openSidebar}"
        aria-label="Open sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--chat-muted-foreground)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 5h16" />
          <path d="M4 12h16" />
          <path d="M4 19h16" />
        </svg>
      </button>
      <div class="chat-header__body">
        <span class="chat-header__title"
          >${this._selectedRoom?.headerTitle ?? ""}</span
        >
        <span class="chat-header__subtitle"
          >${this._selectedRoom?.headerSubtitle ?? ""}</span
        >
      </div>
      ${this.roomContext.roomActions.length > 0
        ? html`<button
            class="chat-header__button"
            style="margin-left: auto;"
            @click="${this._toggleActionList}"
            aria-label="Show actions"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--chat-muted-foreground)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>`
        : nothing}
      ${this._showActionList
        ? html`<chat-action-list
            style="position: absolute; top: 4em; right: 1.2em;"
            .actionType="${"room"}"
            .roomId="${this.roomContext.selectedRoomId}"
            .actions="${this.roomContext.roomActions}"
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
