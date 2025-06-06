import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { ChatMessageSuggestion, SelectSuggestionDetail } from "../types";

export class ChatSuggestionList extends LitElement {
  @property({ type: Array }) suggestions: ChatMessageSuggestion[] = [];
  @property({ type: Boolean }) alignMyMessagesLeft = false;

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
        color: var(--text);
        text-align: left;
        background-color: var(--surface-200);
        border: none;
        border-radius: 0.8em;
      }

      .chat-suggestion-list__item:hover {
        background-color: var(--surface-300);
      }

      .chat-suggestion-list__text {
        font-size: 1.4em;
      }
    `,
  ];

  render() {
    return html`<div class="chat-suggestion-list">
      ${this.suggestions.map(
        (suggestion) =>
          html`<button
            class="chat-suggestion-list__item"
            style="margin-left: ${this.alignMyMessagesLeft ? "4em" : "auto"};"
            @click="${() => this._selectSuggestion(suggestion)}"
          >
            <span class="chat-suggestion-list__text">${suggestion.text}</span>
          </button>`,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-suggestion-list": ChatSuggestionList;
  }
}
