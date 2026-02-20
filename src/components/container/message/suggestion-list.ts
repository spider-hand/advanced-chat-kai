import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../../../styles";
import { ChatMessageSuggestion, SelectSuggestionDetail } from "../../../types";

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

      .suggestion-list {
        display: flex;
        flex-direction: column;
        gap: var(--chat-spacing-2);
        margin-bottom: var(--chat-spacing-4);
      }

      .suggestion-list__item {
        max-width: 80%;
        padding: var(--chat-spacing-2) var(--chat-spacing-3);
        margin-right: 0;
        color: var(--chat-secondary-foreground);
        text-align: left;
        background-color: var(--chat-secondary);
        border: 1px solid var(--chat-border);
        border-radius: var(--chat-radius-lg);
      }

      .suggestion-list__item:hover {
        background-color: oklch(from var(--chat-secondary) calc(l - 0.05) c h);
      }

      .suggestion-list__text {
        font-size: var(--chat-text-sm);
      }
    `,
  ];

  render() {
    return html`<div class="suggestion-list">
      ${this.suggestions.map(
        (suggestion) =>
          html`<button
            class="suggestion-list__item"
            style="margin-left: ${this.alignMyMessagesLeft ? "4em" : "auto"};"
            @click="${() => this._selectSuggestion(suggestion)}"
          >
            <span class="suggestion-list__text">${suggestion.text}</span>
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
