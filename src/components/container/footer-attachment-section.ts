import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../../styles";
import { ChatMessageAttachment, RemoveAttachmentDetail } from "../../types";

export class ChatFooterAttachmentSection extends LitElement {
  @property({ type: Array }) attachments: ChatMessageAttachment[] = [];

  private _removeAttachment(attachment: ChatMessageAttachment) {
    this.dispatchEvent(
      new CustomEvent<RemoveAttachmentDetail>("remove-attachment", {
        detail: {
          attachment,
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

      .footer-attachment-section {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        gap: var(--chat-spacing-2);
        align-items: center;
        width: 0;
        overflow-x: scroll;
      }

      .footer-attachment-section__item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 7.5rem;
        min-height: 4rem;
        padding: var(--chat-spacing-1);
        background-color: var(--chat-muted);
        border-radius: var(--chat-radius-lg);
      }

      .footer-attachment-section__button {
        display: flex;
        align-items: center;
        align-self: flex-end;
        justify-content: center;
        padding: var(--chat-spacing-1);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius-full);
      }

      .footer-attachment-section__button:hover {
        background-color: var(--chat-accent);
      }

      .footer-attachment-section__text {
        display: inline-block;
        align-self: flex-start;
        max-width: 6.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--chat-text-xs);
        color: var(--chat-foreground);
        white-space: nowrap;
      }

      .footer-attachment-section__text--highlight {
        font-weight: 600;
      }

      .footer-attachment-section__image-wrapper {
        position: relative;
        height: 4rem;
      }

      .footer-attachment-section__image {
        width: 7.5rem;
        height: 100%;
        object-fit: cover;
        border-radius: var(--chat-radius-lg);
      }

      .footer-attachment-section__image-button {
        position: absolute;
        top: var(--chat-spacing-1);
        right: var(--chat-spacing-1);
        background-color: var(--chat-background);
        border-radius: var(--chat-radius-full);
      }

      .footer-attachment-section__image-button:hover {
        background-color: var(--chat-accent);
      }
    `,
  ];

  render() {
    return html`<div class="footer-attachment-section">
      ${this.attachments.map((attachment) =>
        !attachment.imageUrl
          ? html`<div class="footer-attachment-section__item">
              <button
                class="footer-attachment-section__button"
                @click="${() => this._removeAttachment(attachment)}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--chat-muted-foreground)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              <span
                class="footer-attachment-section__text footer-attachment-section__text--highlight"
                >${attachment.name}</span
              >
              <span class="footer-attachment-section__text"
                >${attachment.meta}</span
              >
            </div>`
          : html`<div class="footer-attachment-section__image-wrapper">
              <img
                class="footer-attachment-section__image"
                src="${attachment.imageUrl}"
                height="100%"
                width="120"
              /><button
                class="footer-attachment-section__button footer-attachment-section__image-button"
                @click="${() => this._removeAttachment(attachment)}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--chat-muted-foreground)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>`,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-footer-attachment-section": ChatFooterAttachmentSection;
  }
}
