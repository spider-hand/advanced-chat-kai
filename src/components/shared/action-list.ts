import { LitElement, css, html } from "lit";
import { property, query } from "lit/decorators.js";
import { globalStyles } from "../../styles";
import {
  ChatAction,
  SelectRoomActionDetail,
  SelectMessageActionDetail,
} from "../../types";

export class ChatActionList extends LitElement {
  @property({ type: String }) actionType: "room" | "message" = "room";
  @property({ type: String }) roomId: string | null = null;
  @property({ type: String }) messageId: string | null = null;
  @property({ type: Array }) actions: ChatAction<string | number | boolean>[] =
    [];

  @query(".action-list") chatActionList!: HTMLDivElement;

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

      .action-list {
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        background-color: var(--chat-popover);
        border: 1px solid var(--chat-border);
        border-radius: var(--chat-radius-lg);
        box-shadow: var(--chat-shadow-sm);
      }

      .action-list__item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        min-width: 8rem;
        padding: var(--chat-spacing-2);
        font-size: var(--chat-text-xs);
        color: var(--chat-popover-foreground);
        cursor: pointer;
      }

      .action-list__item:hover {
        background-color: var(--chat-accent);
      }
    `,
  ];

  private _dispatchAction(action: ChatAction<string | number | boolean>) {
    if (this.actionType === "room") {
      this.dispatchEvent(
        new CustomEvent<SelectRoomActionDetail<string | number | boolean>>(
          "select-room-action",
          {
            detail: {
              label: action.label,
              value: action.value,
              roomId: this.roomId as string,
            },
            composed: true,
          },
        ),
      );
      return;
    }

    if (this.actionType === "message") {
      this.dispatchEvent(
        new CustomEvent<SelectMessageActionDetail<string | number | boolean>>(
          "select-message-action",
          {
            detail: {
              label: action.label,
              value: action.value,
              messageId: this.messageId as string,
            },
            composed: true,
          },
        ),
      );
      return;
    }
  }

  render() {
    return html`<div class="action-list">
      ${this.actions.map(
        (action) => html`
          <div
            class="action-list__item"
            @click="${() => this._dispatchAction(action)}"
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
