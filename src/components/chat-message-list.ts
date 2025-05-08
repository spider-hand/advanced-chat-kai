import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles/global";
import "./chat-message-item";
import "./chat-loader";
import "./chat-suggestion-list";
import { MessageContext, messageContext } from "../contexts/message-context";
import { ReplyToMessageDetail } from "../types";

@customElement("chat-message-list")
export class ChatMessageList extends LitElement {
  @consume({ context: messageContext, subscribe: true })
  @property({ type: Object })
  messageContext!: MessageContext;
  @property({ type: Object }) replyTo: ReplyToMessageDetail | null = null;

  @query(".chat-message-list__top") chatMessageListTop!: HTMLDivElement;
  @query(".chat-message-list__bottom") chatMessageListBottom!: HTMLDivElement;

  @state() private _showScrollToBottomButton = false;

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

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.classList.contains("chat-message-list__bottom")) {
          if (entry.isIntersecting) {
            this._showScrollToBottomButton = false;
          } else {
            this._showScrollToBottomButton = true;
          }
        }

        if (entry.isIntersecting) {
          if (entry.target.classList.contains("chat-message-list__top")) {
            this.dispatchEvent(new CustomEvent("load-more-messages"));
          }
        }
      }
    });

    observer.observe(this.chatMessageListTop);
    observer.observe(this.chatMessageListBottom);
  }

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
        height: 0.1em;
        margin-bottom: -1.7em;
      }

      .chat-message-list__bottom {
        height: 0.1em;
        margin-top: -1.7em;
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

  render() {
    return html`
      <div class="chat-message-list">
        <div class="chat-message-list__top"></div>
        ${this.messageContext.isLoadingMoreMessages
          ? html`<chat-loader></chat-loader>`
          : nothing}
        ${this.messageContext.messages.map(
          (item, i) =>
            html`<chat-message-item
              .message="${item}"
              .last="${i === this.messageContext.messages.length - 1}"
              .selected=${this.replyTo?.messageId === item.id}
              .isMarkdownAvailable="${this.messageContext.isMarkdownAvailable}"
              .myMessageActions="${this.messageContext.myMessageActions}"
              .theirMessageActions="${this.messageContext.theirMessageActions}"
              .isEmojiReactionAvailable="${this.messageContext
                .isEmojiReactionAvailable}"
              .isReplyAvailable="${this.messageContext.isReplyAvailable}"
            ></chat-message-item>`,
        )}
        ${this.messageContext.suggestions.length > 0
          ? html`<chat-suggestion-list
              .suggestions="${this.messageContext.suggestions}"
            ></chat-suggestion-list>`
          : nothing}
        <div class="chat-message-list__bottom"></div>
        <button
          class="chat-message-list__button"
          style="display: ${this._showScrollToBottomButton ? "block" : "none"}"
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
