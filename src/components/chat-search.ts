import { LitElement, css, html } from "lit";
import { globalStyles } from "../styles/global";
import { SearchRoomDetail } from "../types";


export class ChatSearch extends LitElement {
  private _onChangeInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.dispatchEvent(
      new CustomEvent<SearchRoomDetail>("search-room", {
        detail: { value },
        composed: true,
      }),
    );
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        height: 4.8em;
        min-height: 4.8em;
      }

      .chat-search {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        gap: 0.4em;
        align-items: center;
        padding: 0.8em;
        color: var(--gray-900);
        outline: none;
        background-color: var(--white);
        border: 0.1em solid var(--border);
        border-radius: 0.8em;
        box-shadow: none;
      }

      .chat-search__body {
        width: 100%;
        padding: 0;
        font-size: 1.4em;
        outline: none;
        background-color: transparent;
        border: none;
      }

      .chat-search__body::placeholder {
        color: var(--placeholder);
      }
    `,
  ];

  render() {
    return html`<div class="chat-search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="2em"
        viewBox="0 -960 960 960"
        width="2em"
        fill="var(--gray-700)"
      >
        <path
          d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
        />
      </svg>
      <input
        class="chat-search__body"
        placeholder="Search room"
        @input="${this._onChangeInput}"
      />
    </div>`;
  }
}

if (!customElements.get("chat-search")) {
  customElements.define("chat-search", ChatSearch);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-search": ChatSearch;
  }
}
