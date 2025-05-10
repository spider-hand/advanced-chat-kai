import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles/global";
import { ChatUser, ClickReactionDetail } from "../types";
import { currentUserContext } from "../contexts/current-user-context";


export class ChatAvatar extends LitElement {
  @consume({ context: currentUserContext, subscribe: true })
  @property({ type: Object })
  currentUser!: ChatUser;
  @property({ type: Boolean }) mine = false;
  @property({ type: Object }) reactions!: Map<string, Set<string>>;

  private _clickReaction(emoji: string, users: Set<string>) {
    this.dispatchEvent(
      new CustomEvent<ClickReactionDetail>("click-reaction", {
        detail: {
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
        z-index: 1;
        display: flex;
        flex-flow: row wrap;
        gap: 0.4em;
        align-items: center;
        max-width: 80%;
        padding: 0.4em;
        background-color: var(--gray-100);
        border-radius: 0.4em;
        box-shadow: rgb(0 0 0 / 15%) 0 0.1em 0.1em 0;
      }

      .chat-message-reaction-list--mine {
        margin-left: auto;
        background-color: var(--gray-200);
      }

      .chat-message-reaction-list__button {
        display: flex;
        flex-direction: row;
        gap: 0.4em;
        align-items: center;
        padding: 0 0.4em;
        margin: 0;
        font-size: 1.4em;
        background-color: transparent;
        border: none;
        border-radius: 0.4em;
      }

      .chat-message-reaction-list__button--reacted {
        background-color: var(--gray-200);
      }

      .chat-message-reaction-list--mine
        .chat-message-reaction-list__button--reacted {
        background-color: var(--gray-300);
      }

      .chat-message-reaction-list__button:hover {
        background-color: var(--gray-200);
      }

      .chat-message-reaction-list--mine
        .chat-message-reaction-list__button:hover {
        background-color: var(--gray-300);
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "chat-message-reaction-list": true,
        "chat-message-reaction-list--mine": this.mine,
      })}"
    >
      ${Array.from(this.reactions.entries()).map(([emoji, users]) => {
        return html`<button
          class="${classMap({
            "chat-message-reaction-list__button": true,
            "chat-message-reaction-list__button--reacted": users.has(
              this.currentUser.id,
            ),
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

if (!customElements.get("chat-message-reaction-list")) {
  customElements.define("chat-message-reaction-list", ChatAvatar);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-reaction-list": ChatAvatar;
  }
}
