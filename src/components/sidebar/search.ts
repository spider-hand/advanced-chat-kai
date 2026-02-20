import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "../../styles";
import { SearchRoomDetail } from "../../types";
import { I18nContext, i18nContext } from "../../contexts";

export class ChatSearch extends LitElement {
  @consume({ context: i18nContext, subscribe: true })
  @property({ type: Object })
  i18nContext!: I18nContext;

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
        height: 3rem;
        min-height: 3rem;
      }

      .chat-search {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        gap: var(--chat-spacing-1);
        align-items: center;
        padding: var(--chat-spacing-2);
        color: var(--chat-sidebar-foreground);
        outline: none;
        background-color: var(--chat-background);
        border: 1px solid var(--chat-sidebar-border);
        border-radius: var(--chat-radius-lg);
        box-shadow: none;
      }

      .chat-search__body {
        width: 100%;
        padding: 0;
        font-size: var(--chat-text-sm);
        color: var(--chat-sidebar-foreground);
        outline: none;
        background-color: transparent;
        border: none;
      }

      .chat-search__body::placeholder {
        color: var(--chat-muted-foreground);
      }
    `,
  ];

  render() {
    return html`<div class="chat-search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.6em"
        height="1.6em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--chat-muted-foreground)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
      <input
        class="chat-search__body"
        .placeholder="${this.i18nContext.i18n.CHAT_SEARCH_PLACEHOLDER}"
        @input="${this._onChangeInput}"
      />
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-search": ChatSearch;
  }
}
