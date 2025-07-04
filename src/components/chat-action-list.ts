import { LitElement, css, html } from "lit";
import { property, query } from "lit/decorators.js";
import { globalStyles } from "../styles";
import {
  ChatAction,
  SelectRoomActionDetail,
  SelectMessageActionDetail,
} from "../types";

export class ChatActionList extends LitElement {
  @property({ type: String }) actionType: "room" | "message" = "room";
  @property({ type: String }) roomId: string | null = null;
  @property({ type: String }) messageId: string | null = null;
  @property({ type: Array }) actions: ChatAction<string | number | boolean>[] =
    [];

  @query(".chat-action-list") chatActionList!: HTMLDivElement;

  constructor() {
    super();
    this._onClickOutside = this._onClickOutside.bind(this);
  }

  private _onClickOutside = (event: MouseEvent) => {
    if (!event.composedPath().includes(this.chatActionList)) {
      this.dispatchEvent(new CustomEvent("close"));
    }
  };

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener("mousedown", this._onClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener("mousedown", this._onClickOutside);
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-action-list {
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        background-color: var(--chat-surface-50);
        border: var(--chat-floating-item-border);
        border-radius: 0.8em;
        box-shadow: var(--chat-floating-item-box-shadow);
      }

      .chat-action-list__item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        min-width: 6.4em;
        height: 3.2em;
        padding: 0 0.8em;
        font-size: 1.4em;
        color: var(--chat-text);
        cursor: pointer;
      }

      .chat-action-list__item:hover {
        background-color: var(--chat-surface-100);
      }
    `,
  ];

  render() {
    return html`<div class="chat-action-list">
      ${this.actions.map(
        (action) => html`
          <div
            class="chat-action-list__item"
            @click="${() =>
              this.actionType === "room"
                ? this.dispatchEvent(
                    new CustomEvent<
                      SelectRoomActionDetail<string | number | boolean>
                    >("select-room-action", {
                      detail: {
                        label: action.label,
                        value: action.value,
                        roomId: this.roomId,
                      },
                      composed: true,
                    }),
                  )
                : this.dispatchEvent(
                    new CustomEvent<
                      SelectMessageActionDetail<string | number | boolean>
                    >("select-message-action", {
                      detail: {
                        label: action.label,
                        value: action.value,
                        messageId: this.messageId,
                      },
                      composed: true,
                    }),
                  )}"
          >
            ${action.label}
          </div>
        `,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-action-list": ChatActionList;
  }
}
