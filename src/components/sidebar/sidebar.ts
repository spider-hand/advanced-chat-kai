import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../../styles";
import "./room-list";
import "./search";

export class ChatSidebar extends LitElement {
  @property({ type: Boolean }) show = false;
  @property({ type: Boolean }) isMobile = false;

  private _closeSidebar() {
    this.dispatchEvent(new CustomEvent("close", { composed: true }));
  }

  private _addRoom() {
    this.dispatchEvent(new CustomEvent("add-room", { composed: true }));
  }

  private _onSelectRoom() {
    if (this.isMobile) {
      this._closeSidebar();
    }
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-sidebar {
        display: flex;
        flex-direction: column;
        min-width: 15rem;
        max-width: 15rem;
        height: 100%;
        background-color: var(--chat-sidebar);
      }

      .chat-sidebar--hidden {
        display: none;
      }

      .chat-sidebar--mobile {
        position: absolute;
        min-width: 100%;
        max-width: 100%;
      }

      .chat-sidebar__header {
        display: flex;
        flex-direction: column;
        gap: var(--chat-spacing-2);
        width: 100%;
        min-height: 7rem;
        padding: var(--chat-spacing-4) var(--chat-spacing-3);
      }

      .chat-sidebar__button-group {
        display: flex;
        flex-direction: row;
        gap: var(--chat-spacing-2);
      }

      .chat-sidebar__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--chat-spacing-1);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius-full);
      }

      .chat-sidebar__button:hover {
        background-color: var(--chat-sidebar-accent);
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "chat-sidebar": true,
        "chat-sidebar--hidden": !this.show,
        "chat-sidebar--mobile": this.isMobile,
      })}"
    >
      <div class="chat-sidebar__header">
        <div class="chat-sidebar__button-group">
          <button
            class="chat-sidebar__button"
            @click="${this._closeSidebar}"
            aria-label="Close Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--chat-sidebar-foreground)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
          <button
            class="chat-sidebar__button"
            @click="${this._addRoom}"
            aria-label="Add Room"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--chat-sidebar-foreground)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
              />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </button>
        </div>
        <chat-search></chat-search>
      </div>
      <chat-room-list @select-room="${this._onSelectRoom}"></chat-room-list>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-sidebar": ChatSidebar;
  }
}
