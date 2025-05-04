import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { ChatAction, ChatActionType, SelectActionDetail } from "../types";

@customElement("chat-action-list")
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
        background-color: var(--gray-50);
        border-radius: 0.8em;
        box-shadow: rgb(0 0 0 / 15%) 0 0.1em 0.1em 0;
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
        background-color: var(--gray-100);
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

declare global {
  interface HTMLElementTagNameMap {
    "chat-action-list": ChatActionList;
  }
}
