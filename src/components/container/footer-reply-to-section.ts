import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../../styles";
import { ChatMessageReply } from "../../types";

export class ChatFooterReplyToSection extends LitElement {
  @property({ type: Object }) replyTo!: ChatMessageReply;

  private _cancelReply() {
    this.dispatchEvent(new CustomEvent("cancel-reply", { composed: true }));
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-footer-reply-to-section {
        display: flex;
        flex-direction: row;
        gap: var(--chat-spacing-0-5);
        align-items: center;
        font-size: var(--chat-text-xs);
        color: var(--chat-muted-foreground);
      }

      .chat-footer-reply-to-section__name {
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
        color: var(--chat-foreground);
        white-space: nowrap;
      }

      .chat-footer-reply-to-section__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--chat-spacing-0-5);
        margin-right: var(--chat-spacing-1);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius-full);
      }

      .chat-footer-reply-to-section__button:hover {
        background-color: var(--chat-accent);
      }
    `,
  ];

  render() {
    return html`<div class="chat-footer-reply-to-section">
      <button
        class="chat-footer-reply-to-section__button"
        @click="${this._cancelReply}"
        aria-label="Cancel reply"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.6em"
          viewBox="0 -960 960 960"
          width="1.6em"
          fill="var(--chat-muted-foreground)"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
          />
        </svg>
      </button>
      Reply to
      <span class="chat-footer-reply-to-section__name"
        >${this.replyTo.senderName}</span
      >
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-footer-reply-to-section": ChatFooterReplyToSection;
  }
}
