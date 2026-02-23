import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { consume } from "@lit/context";
import { globalStyles } from "../../../styles";
import { ClickReactionDetail } from "../../../types";
import { currentUserIdContext } from "../../../contexts";

export class ChatMessageReactionList extends LitElement {
  @consume({ context: currentUserIdContext, subscribe: true })
  @property({ type: String })
  currentUserId: string | null = null;
  @property({ type: String }) messageId!: string;
  @property({ type: Boolean }) mine = false;
  @property({ type: Boolean }) alignMyMessagesLeft = false;
  @property({ type: Object }) reactions: Record<string, string[]> = {};

  private _clickReaction(emoji: string, users: string[]) {
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

      .message-reaction-list {
        display: flex;
        flex-flow: row wrap;
        gap: var(--chat-spacing-1);
        align-items: center;
        max-width: 80%;
        padding: var(--chat-spacing-1);
        background-color: var(--chat-secondary);
        border: 1px solid var(--chat-border);
        border-radius: var(--chat-radius);
        box-shadow: var(--chat-shadow-xs);
      }

      .message-reaction-list--mine {
        background-color: var(--chat-message-mine);
      }

      .message-reaction-list--right-aligned {
        margin-left: auto;
      }

      .message-reaction-list__button {
        display: flex;
        flex-direction: row;
        gap: var(--chat-spacing-1);
        align-items: center;
        padding: 0 var(--chat-spacing-1);
        margin: 0;
        font-size: var(--chat-text-sm);
        color: var(--chat-foreground);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius);
      }

      .message-reaction-list__button--reacted {
        background-color: var(--chat-accent);
      }

      .message-reaction-list--mine .message-reaction-list__button {
        color: var(--chat-message-mine-foreground);
      }

      .message-reaction-list--mine
        .message-reaction-list__button--reacted {
        background-color: var(--chat-overlay);
      }

      .message-reaction-list__button:hover {
        background-color: var(--chat-overlay-light);
      }

      .message-reaction-list--mine
        .message-reaction-list__button:hover {
        background-color: var(--chat-overlay);
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "message-reaction-list": true,
        "message-reaction-list--mine": this.mine,
        "message-reaction-list--right-aligned":
          this.mine && !this.alignMyMessagesLeft,
      })}"
    >
      ${Object.entries(this.reactions).map(([emoji, users]) => {
        return html`<button
          class="${classMap({
            "message-reaction-list__button": true,
            "message-reaction-list__button--reacted":
              this.currentUserId !== null && users.includes(this.currentUserId),
          })}"
          @click="${() => this._clickReaction(emoji, users)}"
        >
          <span>${emoji}</span>
          <span>${users.length}</span>
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
