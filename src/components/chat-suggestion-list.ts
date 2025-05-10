import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { ChatMessageSuggestion, SelectSuggestionDetail } from "../types";


export class ChatSuggestionList extends LitElement {
  @property({ type: Array }) suggestions: ChatMessageSuggestion[] = [];

  private _selectSuggestion(suggestion: ChatMessageSuggestion): void {
    this.dispatchEvent(
      new CustomEvent<SelectSuggestionDetail>("select-suggestion", {
        detail: { suggestion },
        composed: true,
      }),
    );
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        align-self: flex-end;
      }

      .chat-suggestion-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 1.6em;
      }

      .chat-suggestion-list__item {
        min-width: 45%;
        max-width: 45%;
        padding: 0.8em 1.2em;
        margin-right: 0;
        margin-left: auto;
        font-size: 1.4em;
        text-align: left;
        background-color: var(--gray-200);
        border: none;
        border-radius: 8px;
      }

      .chat-suggestion-list__item:hover {
        background-color: var(--gray-300);
      }
    `,
  ];

  render() {
    return html`<div class="chat-suggestion-list">
      ${this.suggestions.map(
        (suggestion) =>
          html`<button
            class="chat-suggestion-list__item"
            @click="${() => this._selectSuggestion(suggestion)}"
          >
            ${suggestion.text}
          </button>`,
      )}
    </div>`;
  }
}

if (!customElements.get("chat-suggestion-list")) {
  customElements.define("chat-suggestion-list", ChatSuggestionList);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-suggestion-list": ChatSuggestionList;
  }
}
