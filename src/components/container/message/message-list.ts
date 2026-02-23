import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { consume } from "@lit/context";
import { globalStyles } from "../../../styles";
import "./message-item";
import "../../shared/loader";
import "./suggestion-list";
import "./message-typing";
import "./message-divider";
import "./notification-badge";
import {
  MessageContext,
  messageContext,
  currentUserIdContext,
} from "../../../contexts";
import { ChatItemType, ChatMessage } from "../../../types";

export class ChatMessageList extends LitElement {
  @consume({ context: currentUserIdContext, subscribe: true })
  @property({ type: String })
  currentUserId: string | null = null;

  @consume({ context: messageContext, subscribe: true })
  @property({ type: Object })
  messageContext!: MessageContext;

  @query(".message-list__top") chatMessageListTop!: HTMLDivElement;
  @query(".message-list__bottom") chatMessageListBottom!: HTMLDivElement;

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
        if (entry.target.classList.contains("message-list__bottom")) {
          if (entry.isIntersecting) {
            this._showScrollToBottomButton = false;
            this._showNotificationBadge = false;
          } else {
            this._showScrollToBottomButton = true;
          }
        }

        if (entry.isIntersecting) {
          if (entry.target.classList.contains("message-list__top")) {
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
        this._showScrollToBottomButton = false;
        this._showNotificationBadge = false;
        setTimeout(() => {
          this._scrollToBottom(undefined, "instant");
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
            this._scrollToBottom(undefined, "smooth");
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
        padding: var(--chat-spacing-4) var(--chat-spacing-3);
        overflow: hidden scroll;
        scrollbar-color: var(--chat-border) transparent;
        scrollbar-width: thin;
      }

      :host::-webkit-scrollbar {
        width: 6px;
      }

      :host::-webkit-scrollbar-track {
        background: transparent;
      }

      :host::-webkit-scrollbar-thumb {
        background-color: var(--chat-border);
        border-radius: var(--chat-radius);
      }

      :host::-webkit-scrollbar-thumb:hover {
        background-color: var(--chat-muted-foreground);
      }

      .message-list {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--chat-spacing-4);
        width: 100%;
      }

      .message-list__top {
        height: 1px;
        margin-bottom: calc(-1 * var(--chat-spacing-4) - 1px);
      }

      .message-list__bottom {
        height: 1px;
        margin-top: calc(-1 * var(--chat-spacing-4) - 1px);
      }

      .message-list__button {
        position: sticky;
        bottom: 0;
        left: 100%;
        z-index: 2;
        display: flex;
        align-items: center;
        align-self: flex-end;
        justify-content: center;
        padding: var(--chat-spacing-2);
        background-color: var(--chat-popover);
        border: 1px solid var(--chat-border);
        border-radius: var(--chat-radius-full);
        box-shadow: var(--chat-shadow-sm);
      }

      .message-list__button:hover {
        background-color: var(--chat-accent);
      }

      .message-list__button--hidden {
        display: none;
      }
    `,
  ];

  render() {
    return html`
      <div class="message-list">
        <div class="message-list__top"></div>
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
                      .timestampFormatter="${this.messageContext
                        .timestampFormatter}"
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
                class="${classMap({
                  "message-list__button": true,
                  "message-list__button--hidden": !this._showScrollToBottomButton,
                })}"
                @click="${this._scrollToBottom}"
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24" fill="none" stroke="var(--chat-muted-foreground)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
              </button>`}
        <div class="message-list__bottom"></div>
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
