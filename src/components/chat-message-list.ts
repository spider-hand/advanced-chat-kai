import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import "./chat-message-item";
import "./chat-loader";

@customElement("chat-message-list")
export class ChatMessageList extends LitElement {
  @query(".chat-message-list__bottom") chatMessageListBottom!: HTMLDivElement;

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        flex-grow: 1;
        padding: 1.6em 1.2em;
        overflow-y: scroll;
      }

      .chat-message-list {
        display: flex;
        flex-direction: column;
        gap: 1.6em;
        width: 100%;
      }

      .chat-message-list__top {
        margin-bottom: -1.6em;
      }

      .chat-message-list__bottom {
        margin-top: -1.6em;
      }

      .chat-message-list__button {
        position: sticky;
        bottom: 0;
        left: 100%;
        z-index: 2;
        display: flex;
        align-items: center;
        align-self: flex-end;
        justify-content: center;
        padding: 0.8em;
        background-color: var(--gray-50);
        border: none;
        border-radius: 100%;
        box-shadow: rgb(0 0 0 / 15%) 0 0.1em 0.1em 0;
      }

      .chat-message-list__button:hover {
        background-color: var(--gray-100);
      }
    `,
  ];

  private _scrollToBottom(
    _?: Event,
    behavior: ScrollBehavior = "smooth",
  ): void {
    this.chatMessageListBottom.scrollIntoView({
      behavior: behavior,
    });
  }

  protected firstUpdated(): void {
    setTimeout(() => {
      this._scrollToBottom(null, "instant");
    });
  }

  render() {
    const items = Array.from({ length: 20 }, (_, i) => i);

    return html`
      <div class="chat-message-list">
        <div class="chat-message-list__top"></div>
        <chat-loader></chat-loader>
        ${items.map(
          (i) =>
            html`<chat-message-item
              .mine="${i % 2 === 0 ? true : false}"
            ></chat-message-item>`,
        )}
        <div class="chat-message-list__bottom"></div>
        <button
          class="chat-message-list__button"
          @click="${this._scrollToBottom}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2.4em"
            viewBox="0 -960 960 960"
            width="2.4em"
            fill="var(--gray-700)"
          >
            <path
              d="M440-313v-447q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v447l196-196q12-12 28-11.5t28 12.5q11 12 11.5 28T772-452L508-188q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L188-452q-11-11-11-27.5t11-28.5q12-12 28.5-12t28.5 12l195 195Z"
            />
          </svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-list": ChatMessageList;
  }
}
