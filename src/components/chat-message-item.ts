import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles/global";
import "./chat-avatar";
import "./chat-action-list";
import "./chat-emoji-picker";

@customElement("chat-message-item")
export class ChatMessageItem extends LitElement {
  @property({ type: Boolean }) mine = true;

  @state() private _timer: number | null = null;
  @state() private _hover = false;
  @state() private _showMenu = false;
  @state() private _showEmojiPicker = false;

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-message-item {
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        margin-right: 45%;
      }

      .chat-message-item--mine {
        margin-right: auto;
        margin-left: 45%;
      }

      .chat-message-item__container {
        display: flex;
        flex-direction: column;
        gap: 0.8em;
      }

      .chat-message-item__meta {
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        align-items: baseline;
      }

      .chat-message-item__name {
        font-size: 1.2em;
        font-weight: 600;
      }

      .chat-message-item__date {
        font-size: 0.8em;
        font-weight: 600;
        color: var(--gray-700);
      }

      .chat-message-item__body {
        position: relative;
        padding: 0.8em 1.2em;
        font-size: 1.4em;
        background-color: var(--gray-100);
        border-radius: 0.8em;
      }

      .chat-message-item__body--mine {
        background-color: var(--gray-200);
      }

      .chat-message-item__menu {
        position: absolute;
        top: calc(100% + 0.4em);
        left: 0;
        z-index: 1;
        display: flex;
        flex-direction: row;
        gap: 0.8em;
        padding: 0.4em;
        background-color: var(--gray-100);
        border-radius: 0.4em;
        box-shadow: rgb(0 0 0 / 15%) 0 0.1em 0.1em 0;
      }

      .chat-message-item__menu--mine {
        right: 0;
        left: auto;
        background-color: var(--gray-200);
      }

      .chat-message-item__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4em;
        font-size: var(--base-font-size);
        background-color: transparent;
        border: none;
        border-radius: 100px;
      }

      .chat-message-item__menu .chat-message-item__button:hover {
        background-color: var(--gray-200);
      }

      .chat-message-item__menu--mine .chat-message-item__button:hover {
        background-color: var(--gray-300);
      }
    `,
  ];

  private _onMouseEnter() {
    clearTimeout(this._timer);
    this._hover = true;
  }

  // Set a delay to hide the menu so it doesn't disappear immediately when the mouse leaves
  private _onMouseLeave() {
    this._timer = setTimeout(() => {
      this._hover = false;
    }, 200);
  }

  private _toggleEmojiPicker() {
    this._showEmojiPicker = !this._showEmojiPicker;
  }

  private _closeEmojiPicker() {
    this._showEmojiPicker = false;
  }

  private _openMenu() {
    this._showMenu = true;
  }

  private _closeMenu() {
    this._showMenu = false;
  }

  render() {
    const actions = [
      { label: "Action 1" },
      { label: "Action 100" },
      { label: "Action 1000" },
    ];

    return html`<div
      class="${classMap({
        "chat-message-item": true,
        "chat-message-item--mine": this.mine,
      })}"
    >
      ${!this.mine ? html`<chat-avatar></chat-avatar>` : nothing}
      <div class="chat-message-item__container">
        ${!this.mine
          ? html`<div class="chat-message-item__meta">
              <span class="chat-message-item__name">User Name</span
              ><span class="chat-message-item__date">01/05/2025 12:34</span>
            </div>`
          : nothing}
        <div
          class="${classMap({
            "chat-message-item__body": true,
            "chat-message-item__body--mine": this.mine,
          })}"
          @mouseenter="${this._onMouseEnter}"
          @mouseleave="${this._onMouseLeave}"
        >
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.</span
          >
          ${this._hover
            ? html` <div
                class="${classMap({
                  "chat-message-item__menu": true,
                  "chat-message-item__menu--mine": this.mine,
                })}"
              >
                <button
                  class="chat-message-item__button"
                  @click="${this._toggleEmojiPicker}"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="2em"
                    viewBox="0 -960 960 960"
                    width="2em"
                    fill="var(--gray-700)"
                  >
                    <path
                      d="M480-480Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q33 0 65 5t62 15q23 8 29 23.5t1 30.5q-5 15-18.5 23.5T588-781q-26-9-52.5-14t-55.5-5q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35q-5-19 5-31t25-15q15-3 29.5 4.5T871-564q5 20 7 41t2 43q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm320-680h-40q-17 0-28.5-11.5T720-800q0-17 11.5-28.5T760-840h40v-40q0-17 11.5-28.5T840-920q17 0 28.5 11.5T880-880v40h40q17 0 28.5 11.5T960-800q0 17-11.5 28.5T920-760h-40v40q0 17-11.5 28.5T840-680q-17 0-28.5-11.5T800-720v-40ZM620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q58 0 107-28t79-76q6-12-1-24t-21-12H316q-14 0-21 12t-1 24q30 48 79.5 76T480-260Z"
                    />
                  </svg>
                </button>
                <button class="chat-message-item__button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="2em"
                    viewBox="0 -960 960 960"
                    width="2em"
                    fill="var(--gray-700)"
                  >
                    <path
                      d="m273-480 116 116q12 12 11.5 28T388-308q-12 11-28 11.5T332-308L148-492q-12-12-12-28t12-28l184-184q11-11 27.5-11t28.5 11q12 12 12 28.5T388-675L273-560h367q83 0 141.5 58.5T840-360v120q0 17-11.5 28.5T800-200q-17 0-28.5-11.5T760-240v-120q0-50-35-85t-85-35H273Z"
                    />
                  </svg>
                </button>
                <button
                  class="chat-message-item__button"
                  @click="${this._openMenu}"
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
                </button>
              </div>`
            : nothing}
          ${this._showMenu
            ? html`<chat-action-list
                style="position: absolute; top: 100%; right: ${this.mine
                  ? "0"
                  : "auto"}; left: ${this.mine
                  ? "auto"
                  : 0}; transform: translateY(-100%); z-index: 1;"
                .actions="${actions}"
                @select-action="${this._closeMenu}"
                @close="${this._closeMenu}"
              ></chat-action-list>`
            : nothing}
          ${this._showEmojiPicker
            ? html`<chat-emoji-picker
                style="position: absolute; top: 100%; right: ${this.mine
                  ? "0"
                  : "auto"}; left: ${this.mine
                  ? "auto"
                  : 0}; transform: translateY(-100%); z-index: 1;"
                .width="${300}"
                .height="${300}"
                @select-emoji="${this._closeEmojiPicker}"
                @close="${this._closeEmojiPicker}"
              ></chat-emoji-picker>`
            : nothing}
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-item": ChatMessageItem;
  }
}
