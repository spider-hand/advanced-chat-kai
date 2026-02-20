import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { globalStyles } from "../../styles";
import "../shared/avatar";
import "../shared/action-list";
import { ChatAction, ChatRoom, SelectRoomDetail } from "../../types";

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

  private _toggleActionList(event: Event) {
    // Prevent the event from bubbling up to the room item which would trigger a room select
    event.stopPropagation();

    const rect = this.getBoundingClientRect();
    const spaceBelow = this.containerBottom - rect.bottom;
    const spaceAbove = rect.top - this.containerTop;

    // Require minimum 100px above to show popup above (accounts for sidebar header)
    const minSpaceAbove = 100;
    this._showActionListAbove = spaceAbove >= minSpaceAbove && spaceAbove >= spaceBelow;
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
        gap: var(--chat-spacing-2);
        align-items: center;
        width: 100%;
        height: 4rem;
        padding: 0 var(--chat-spacing-3);
        cursor: pointer;
      }

      .chat-room-item::after {
        position: absolute;
        right: var(--chat-spacing-3);
        bottom: 0;
        left: var(--chat-spacing-3);
        height: 1px;
        content: "";
        background-color: var(--chat-border);
      }

      .chat-room-item--active {
        background-color: var(--chat-sidebar-accent);
      }

      .chat-room-item__text {
        display: flex;
        flex-direction: column;
        gap: var(--chat-spacing-1);
        width: calc(100% - 10rem);
        min-width: 6.25rem;
      }

      .chat-room-item__title {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--chat-text-sm);
        font-weight: 600;
        color: var(--chat-sidebar-foreground);
        white-space: nowrap;
      }

      .chat-room-item__subtitle {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--chat-text-xs);
        color: var(--chat-muted-foreground);
        white-space: nowrap;
      }

      .chat-room-item__meta {
        color: var(--chat-muted-foreground);
      }

      .chat-room-item__menu {
        position: absolute;
        top: var(--chat-spacing-3);
        right: var(--chat-spacing-3);
        display: flex;
        flex-direction: column;
        gap: var(--chat-spacing-2);
        align-items: flex-end;
        text-align: right;
      }

      .chat-room-item__badge {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--chat-spacing-0-5) var(--chat-spacing-2);
        border-radius: var(--chat-radius);
      }

      .chat-room-item__badge--rounded {
        width: 0.625rem;
        height: 0.625rem;
        padding: 0;
        border-radius: var(--chat-radius-full);
      }

      .chat-room-item__badge--success {
        color: var(--chat-success-foreground);
        background-color: var(--chat-success);
      }

      .chat-room-item__badge--danger {
        color: var(--chat-danger-foreground);
        background-color: var(--chat-danger);
      }

      .chat-room-item__badge--warning {
        color: var(--chat-warning-foreground);
        background-color: var(--chat-warning);
      }

      .chat-room-item__badge--info {
        color: var(--chat-info-foreground);
        background-color: var(--chat-info);
      }

      .chat-room-item__button {
        position: absolute;
        top: var(--chat-spacing-3);
        right: var(--chat-spacing-3);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--chat-spacing-1);
        font-size: var(--chat-text-xs);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius-full);
      }

      .chat-room-item__button:hover {
        background-color: var(--chat-sidebar-accent);
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
        ? html`<chat-avatar .src="${this.room.avatar ?? null}"></chat-avatar>`
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
              width="1.4em"
              height="1.4em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--chat-sidebar-foreground)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
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
              top: this._showActionListAbove ? "auto" : "50%",
              right: "1.2em",
              bottom: this._showActionListAbove ? "50%" : "auto",
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
