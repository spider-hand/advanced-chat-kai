import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles";
import "./chat-room-list";
import "./chat-search";

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
        min-width: 24em;
        max-width: 24em;
        height: 100%;
        background-color: var(--chat-surface-100);
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
        gap: 0.8em;
        width: 100%;
        min-height: 11.2em;
        padding: 1.6em 1.2em;
      }

      .chat-sidebar__button-group {
        display: flex;
        flex-direction: row;
        gap: 0.8em;
      }

      .chat-sidebar__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4em;
        background-color: transparent;
        border: none;
        border-radius: 100px;
      }

      .chat-sidebar__button:hover {
        background-color: var(--chat-surface-200);
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
              height="2.4em"
              viewBox="0 -960 960 960"
              width="2.4em"
              fill="var(--chat-surface-700)"
            >
              <path
                d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z"
              />
            </svg>
          </button>
          <button
            class="chat-sidebar__button"
            @click="${this._addRoom}"
            aria-label="Add Room"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2.4em"
              viewBox="0 -960 960 960"
              width="2.4em"
              fill="var(--chat-surface-700)"
            >
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h261q20 0 30 12.5t10 27.5q0 15-10.5 27.5T460-760H200v560h560v-261q0-20 12.5-30t27.5-10q15 0 27.5 10t12.5 30v261q0 33-23.5 56.5T760-120H200Zm280-360Zm-120 80v-97q0-16 6-30.5t17-25.5l344-344q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L553-384q-11 11-25.5 17.5T497-360h-97q-17 0-28.5-11.5T360-400Zm481-384-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"
              />
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
