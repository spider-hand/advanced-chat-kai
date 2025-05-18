import { LitElement, css, html } from "lit";
import { property, query } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { ChatAction, ChatActionType, SelectActionDetail } from "../types";

export class ChatActionList extends LitElement {
  @property({ type: String }) actionType: ChatActionType;
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
        background-color: var(--surface-50);
        border: var(--floating-item-border);
        border-radius: 0.8em;
        box-shadow: var(--floating-item-box-shadow);
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
        cursor: pointer;
      }

      .chat-action-list__item:hover {
        background-color: var(--surface-100);
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
              this.dispatchEvent(
                new CustomEvent<SelectActionDetail<string | number | boolean>>(
                  "select-action",
                  {
                    detail: {
                      actionType: this.actionType,
                      label: action.label,
                      value: action.value,
                    },
                    composed: true,
                  },
                ),
              )}"
          >
            ${action.label}
          </div>
        `,
      )}
    </div>`;
  }
}

if (!customElements.get("chat-action-list")) {
  customElements.define("chat-action-list", ChatActionList);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-action-list": ChatActionList;
  }
}
