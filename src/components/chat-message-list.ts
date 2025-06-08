import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles";
import "./chat-message-item";
import "./chat-loader";
import "./chat-suggestion-list";
import "./chat-message-typing";
import "./chat-message-divider";
import "./chat-notification-badge";
import {
  MessageContext,
  messageContext,
  currentUserIdContext,
} from "../contexts";
import { ChatItemType, ChatMessage } from "../types";

export class ChatMessageList extends LitElement {
  @consume({ context: currentUserIdContext, subscribe: true })
  @property({ type: String })
  currentUserId: string | null = null;

  @consume({ context: messageContext, subscribe: true })
  @property({ type: Object })
  messageContext!: MessageContext;

  @query(".chat-message-list__top") chatMessageListTop!: HTMLDivElement;
  @query(".chat-message-list__bottom") chatMessageListBottom!: HTMLDivElement;

  @state() private _showScrollToBottomButton = false;
  @state() private _showNotificationBadge = false;
  @state() private _rectTop = 0;
  @state() private _rectBottom = 0;

  private get _isWithinClientHeight(): boolean {
    return (
      this.scrollHeight - this.scrollTop - this.clientHeight <=
      this.clientHeight
    );
  }

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
      const rect = this.getBoundingClientRect();
      this._rectTop = rect.top;
      this._rectBottom = rect.bottom;
    });

    const observer = new IntersectionObserver((entries) => {
      if (this.messageContext.isLoadingMessage) return;

      for (const entry of entries) {
        if (entry.target.classList.contains("chat-message-list__bottom")) {
          if (entry.isIntersecting) {
            this._showScrollToBottomButton = false;
            this._showNotificationBadge = false;
          } else {
            this._showScrollToBottomButton = true;
          }
        }

        if (entry.isIntersecting) {
          if (entry.target.classList.contains("chat-message-list__top")) {
            this.dispatchEvent(
              new CustomEvent("load-more-messages", { composed: true }),
            );
          }
        }
      }
    });

    observer.observe(this.chatMessageListTop);
    observer.observe(this.chatMessageListBottom);
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has("messageContext")) {
      const { id: previousFirstMessageId, roomId: previousFirstMessageRoomId } =
        (_changedProperties.get("messageContext")
          ?.messages[0] as ChatItemType) ?? {};

      const previousMessagesLength =
        _changedProperties.get("messageContext")?.messages.length ?? 0;
      const previousScrollHeight = this.scrollHeight;
      const previousScrollTop = this.scrollTop;

      const { id: currentFirstMessageId, roomId: currentFirstMessageRoomId } =
        (this.messageContext.messages[0] as ChatItemType) ?? {};
      const currentMessagesLength = this.messageContext.messages.length;

      // Scroll to the bottom if the selected room has changed
      if (previousFirstMessageRoomId !== currentFirstMessageRoomId) {
        setTimeout(() => {
          this._scrollToBottom(null, "instant");
        });
        return;
      }

      // Check if a new message has been loaded
      if (currentMessagesLength > previousMessagesLength) {
        // Check if an older message has been loaded and inserted at the top
        if (previousFirstMessageId !== currentFirstMessageId) {
          // Keep the view at the same position after loading older messages
          setTimeout(() => {
            const newScrollHeight = this.scrollHeight;
            this.scrollTop =
              previousScrollTop + (newScrollHeight - previousScrollHeight);
          });
        } else if (
          this._isWithinClientHeight ||
          (
            this.messageContext.messages[
              this.messageContext.messages.length - 1
            ] as ChatMessage
          ).senderId === this.currentUserId
        ) {
          // Scroll to the bottom if the scroll position is within the client height
          // or the user just sent a message
          setTimeout(() => {
            this._scrollToBottom(null, "smooth");
          });
        } else {
          // Show notification badge if there is a new message and the user is not at the bottom
          this._showNotificationBadge = true;
        }
      }
    }
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        flex-grow: 1;
        padding: 1.6em 1.2em;
        overflow: hidden scroll;
      }

      .chat-message-list {
        position: relative;
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
        background-color: var(--surface-50);
        border: var(--floating-item-border);
        border-radius: 100%;
        box-shadow: var(--floating-item-box-shadow);
      }

      .chat-message-list__button:hover {
        background-color: var(--surface-100);
      }
    `,
  ];

  render() {
    return html`
      <div class="chat-message-list">
        <div class="chat-message-list__top"></div>
        ${this.messageContext.isLoadingMessage
          ? html`<chat-loader
              style="position: absolute; top: 50%; transform: translateY(-50%);"
            ></chat-loader>`
          : html` ${!this.messageContext.isLoadingMessage &&
              this.messageContext.isLoadingMoreMessages
                ? html`<chat-loader></chat-loader>`
                : nothing}
              ${this.messageContext.messages.map((item, i) =>
                item.type === "message"
                  ? html`<chat-message-item
                      .message="${item}"
                      .last="${i === this.messageContext.messages.length - 1}"
                      .isReplying=${this.messageContext.replyTo?.id === item.id}
                      .isMarkdownAvailable="${this.messageContext
                        .isMarkdownAvailable}"
                      .myMessageActions="${this.messageContext
                        .myMessageActions}"
                      .theirMessageActions="${this.messageContext
                        .theirMessageActions}"
                      .isEmojiReactionAvailable="${this.messageContext
                        .isEmojiReactionAvailable}"
                      .isReplyAvailable="${this.messageContext
                        .isReplyAvailable}"
                      .showTheirAvatar="${this.messageContext.showTheirAvatar}"
                      .alignMyMessagesLeft="${this.messageContext
                        .alignMyMessagesLeft}"
                      .containerTop="${this._rectTop}"
                      .containerBottom="${this._rectBottom}"
                    ></chat-message-item>`
                  : item.type === "divider"
                    ? html`<chat-message-divider
                        .message="${item}"
                      ></chat-message-divider>`
                    : nothing,
              )}
              ${this.messageContext.isTyping
                ? html`<chat-message-typing></chat-message-typing>`
                : nothing}
              ${this.messageContext.suggestions.length > 0
                ? html`<chat-suggestion-list
                    style="align-self: ${this.messageContext.alignMyMessagesLeft
                      ? "flex-start"
                      : "flex-end"};"
                    .suggestions="${this.messageContext.suggestions}"
                    .alignMyMessagesLeft="${this.messageContext
                      .alignMyMessagesLeft}"
                  ></chat-suggestion-list>`
                : nothing}
              <button
                class="chat-message-list__button"
                style="display: ${this._showScrollToBottomButton
                  ? "flex"
                  : "none"}"
                @click="${this._scrollToBottom}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2.4em"
                  viewBox="0 -960 960 960"
                  width="2.4em"
                  fill="var(--surface-700)"
                >
                  <path
                    d="M440-313v-447q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v447l196-196q12-12 28-11.5t28 12.5q11 12 11.5 28T772-452L508-188q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L188-452q-11-11-11-27.5t11-28.5q12-12 28.5-12t28.5 12l195 195Z"
                  />
                </svg>
              </button>`}
        <div class="chat-message-list__bottom"></div>
        ${this._showNotificationBadge
          ? html`<chat-notification-badge
              @click-notification-badge="${this._scrollToBottom}"
            ></chat-notification-badge>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-list": ChatMessageList;
  }
}
