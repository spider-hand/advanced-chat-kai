import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles";
import { ClickReactionDetail } from "../types";
import { currentUserIdContext } from "../contexts";

export class ChatMessageReactionList extends LitElement {
  @consume({ context: currentUserIdContext, subscribe: true })
  @property({ type: String })
  currentUserId: string | null = null;
  @property({ type: String }) messageId!: string;
  @property({ type: Boolean }) mine = false;
  @property({ type: Boolean }) alignMyMessagesLeft = false;
  @property({ type: Object }) reactions!: Map<string, Set<string>>;

  private _clickReaction(emoji: string, users: Set<string>) {
    this.dispatchEvent(
      new CustomEvent<ClickReactionDetail>("click-reaction", {
        detail: {
          messageId: this.messageId,
          reaction: {
            emoji,
            users: users,
          },
        },
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

      .chat-message-reaction-list {
        display: flex;
        flex-flow: row wrap;
        gap: 0.4em;
        align-items: center;
        max-width: 80%;
        padding: 0.4em;
        background-color: var(--surface-100);
        border: var(--floating-item-border);
        border-radius: 0.4em;
        box-shadow: var(--floating-item-box-shadow);
      }

      .chat-message-reaction-list--mine {
        background-color: var(--my-reaction-list-bg, var(--surface-200));
      }

      .chat-message-reaction-list--right-aligned {
        margin-left: auto;
      }

      .chat-message-reaction-list__button {
        display: flex;
        flex-direction: row;
        gap: 0.4em;
        align-items: center;
        padding: 0 0.4em;
        margin: 0;
        font-size: 1.4em;
        color: var(--text);
        background-color: transparent;
        border: none;
        border-radius: 0.4em;
      }

      .chat-message-reaction-list__button--reacted {
        background-color: var(--surface-200);
      }

      .chat-message-reaction-list--mine .chat-message-reaction-list__button {
        color: var(--text-on-brand, var(--text));
      }

      .chat-message-reaction-list--mine
        .chat-message-reaction-list__button--reacted {
        background-color: var(--my-reaction-button-bg, var(--surface-300));
      }

      .chat-message-reaction-list__button:hover {
        background-color: var(--surface-200);
      }

      .chat-message-reaction-list--mine
        .chat-message-reaction-list__button:hover {
        background-color: var(
          --my-reaction-button-bg-hover,
          var(--surface-300)
        );
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "chat-message-reaction-list": true,
        "chat-message-reaction-list--mine": this.mine,
        "chat-message-reaction-list--right-aligned":
          this.mine && !this.alignMyMessagesLeft,
      })}"
    >
      ${Array.from(this.reactions.entries()).map(([emoji, users]) => {
        return html`<button
          class="${classMap({
            "chat-message-reaction-list__button": true,
            "chat-message-reaction-list__button--reacted":
              this.currentUserId !== null && users.has(this.currentUserId),
          })}"
          @click="${() => this._clickReaction(emoji, users)}"
        >
          <span>${emoji}</span>
          <span>${users.size}</span>
        </button>`;
      })}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-reaction-list": ChatMessageReactionList;
  }
}
