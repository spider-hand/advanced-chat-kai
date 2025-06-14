import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { globalStyles } from "../styles";
import "./chat-avatar";
import "./chat-action-list";
import { ChatAction, ChatRoom, SelectRoomDetail } from "../types";

export class ChatRoomItem extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: Object }) room!: ChatRoom;
  @property({ type: Boolean }) showAvatar = false;
  @property({ type: Array }) actions: ChatAction<string | number | boolean>[] =
    [];
  @property({ type: Number }) containerTop = 0;
  @property({ type: Number }) containerBottom = 0;

  @state() private _hover = false;
  @state() private _showActionList = false;
  @state() private _showActionListAbove = true;

  private _selectRoom() {
    this.dispatchEvent(
      new CustomEvent<SelectRoomDetail>("select-room", {
        detail: {
          room: this.room,
        },
        composed: true,
      }),
    );
  }

  private _onMouseEnter() {
    this._hover = true;
  }

  private _onMouseLeave() {
    this._hover = false;
  }

  private _toggleActionList() {
    const rect = this.getBoundingClientRect();
    const spaceBelow = this.containerBottom - rect.bottom;
    const spaceAbove = rect.top - this.containerTop;

    this._showActionListAbove = spaceAbove >= spaceBelow;
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
        width: 100%;
      }

      .chat-room-item {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        align-items: center;
        width: 100%;
        height: 6.4em;
        padding: 0 1.2em;
        cursor: pointer;
      }

      .chat-room-item::after {
        position: absolute;
        right: 1.2em;
        bottom: 0;
        left: 1.2em;
        height: 0.1em;
        content: "";
        background-color: var(--chat-border);
      }

      .chat-room-item--active {
        background-color: var(--chat-surface-200);
      }

      .chat-room-item__text {
        display: flex;
        flex-direction: column;
        gap: 0.4em;
        width: calc(100% - 16em);
        min-width: 10em;
      }

      .chat-room-item__title {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.4em;
        font-weight: 600;
        color: var(--chat-text);
        white-space: nowrap;
      }

      .chat-room-item__subtitle {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2em;
        color: var(--chat-subtext);
        white-space: nowrap;
      }

      .chat-room-item__meta {
        color: var(--chat-subtext);
      }

      .chat-room-item__menu {
        position: absolute;
        top: 1.2em;
        right: 1.2em;
        display: flex;
        flex-direction: column;
        gap: 0.8em;
        align-items: flex-end;
        text-align: right;
      }

      .chat-room-item__badge {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2em 0.8em;
        border-radius: 0.4em;
      }

      .chat-room-item__badge--rounded {
        width: 1em;
        height: 1em;
        padding: 0;
        border-radius: 100px;
      }

      .chat-room-item__badge--success {
        color: var(--chat-surface-50);
        background-color: var(--chat-success);
      }

      .chat-room-item__badge--danger {
        color: var(--chat-white);
        background-color: var(--chat-danger);
      }

      .chat-room-item__badge--warning {
        color: var(--chat-black);
        background-color: var(--chat-warning);
      }

      .chat-room-item__badge--info {
        color: var(--chat-white);
        background-color: var(--chat-info);
      }

      .chat-room-item__button {
        position: absolute;
        top: 1.2em;
        right: 1.2em;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4em;
        font-size: 1.2em;
        background-color: transparent;
        border: none;
        border-radius: 100px;
      }

      .chat-room-item__button:hover {
        background-color: var(--chat-surface-200);
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "chat-room-item": true,
        "chat-room-item--active": this.active || this._hover,
      })}"
      @mouseenter="${this._onMouseEnter}"
      @mouseleave="${this._onMouseLeave}"
      @click="${this._selectRoom}"
      data-testid="chat-room-item"
      role="button"
      tabindex="0"
    >
      ${this.showAvatar
        ? html`<chat-avatar .src="${this.room.avatar}"></chat-avatar>`
        : nothing}
      <div class="chat-room-item__text">
        <span class="chat-room-item__title">${this.room.sidebarTitle}</span>
        <span class="chat-room-item__subtitle">
          ${this.room.sidebarSubtitle}</span
        >
      </div>
      ${this._hover && this.actions.length > 0
        ? html`<button
            class="chat-room-item__button"
            @click="${this._toggleActionList}"
            aria-label="Open room actions"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 -960 960 960"
              width="2em"
              fill="var(--chat-surface-700)"
            >
              <path
                d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
              />
            </svg>
          </button>`
        : html`<div class="chat-room-item__menu">
            <span class="chat-room-item__meta">${this.room.meta}</span>
            ${this.room.badge
              ? html`<span
                  class="${classMap({
                    "chat-room-item__badge": true,
                    "chat-room-item__badge--rounded":
                      this.room.badge.label === "",
                    [`chat-room-item__badge--${this.room.badge.type}`]: true,
                  })}"
                  >${this.room.badge.label}</span
                >`
              : nothing}
          </div>`}
      ${this._showActionList
        ? html`<chat-action-list
            style=${styleMap({
              position: "absolute",
              top: this._showActionListAbove ? "1.2em" : "auto",
              right: "1.2em",
              bottom: this._showActionListAbove
                ? "auto"
                : "calc(-100% - 1.2em)",
              transform: "translateY(-100%)",
              "z-index": "1",
            })}
            .actionType="${"room"}"
            .roomId="${this.room.id}"
            .actions="${this.actions}"
            @select-action="${this._closeActionList}"
            @close="${this._closeActionList}"
          ></chat-action-list>`
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-room-item": ChatRoomItem;
  }
}
