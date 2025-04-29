import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles/global";
import "./chat-avatar";
import "./chat-action-list";

@customElement("chat-room-item")
export class ChatRoomItem extends LitElement {
  @property({ type: Boolean }) active = false;

  @state() private _hover = false;
  @state() private _showMenu = false;

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
      }

      .chat-room-item::after {
        position: absolute;
        right: 1.2em;
        bottom: 0;
        left: 1.2em;
        height: 0.1em;
        content: "";
        background-color: var(--border);
      }

      .chat-room-item--active {
        background-color: var(--gray-200);
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
        white-space: nowrap;
      }

      .chat-room-item__subtitle {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2em;
        white-space: nowrap;
      }

      .chat-room-item__menu {
        position: absolute;
        top: 1.2em;
        right: 1.2em;
        font-size: 1.2em;
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
        background-color: var(--gray-200);
      }
    `,
  ];

  private _onMouseEnter() {
    this._hover = true;
  }

  private _onMouseLeave() {
    this._hover = false;
  }

  private _toggleMenu() {
    this._showMenu = !this._showMenu;
  }

  private _closeMenu() {
    this._showMenu = false;
  }

  render() {
    const actions = [
      { label: "A" },
      { label: "B" },
      { label: "C" },
    ];

    return html`<div
      class="${classMap({
        "chat-room-item": true,
        "chat-room-item--active": this.active,
      })}"
      @mouseenter="${this._onMouseEnter}"
      @mouseleave="${this._onMouseLeave}"
    >
      <chat-avatar></chat-avatar>
      <div class="chat-room-item__text">
        <span class="chat-room-item__title">Room Room Room Room Room</span>
        <span class="chat-room-item__subtitle">
          Hello, world Hello, world Hello, world Hello world</span
        >
      </div>
      ${this._hover
        ? html`<button
            class="chat-room-item__button"
            @click="${this._toggleMenu}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 -960 960 960"
              width="2em"
              fill="var(--gray-700)"
            >
              <path
                d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
              />
            </svg>
          </button>`
        : html`<span class="chat-room-item__menu">Apr 28</span>`}
      ${this._showMenu
        ? html`<chat-action-list
            style="position: absolute; top: 0; right: 1.2em; transform: translateY(-100%);"
            .actions="${actions}"
            @select-action="${this._closeMenu}"
            @close="${this._closeMenu}"
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
