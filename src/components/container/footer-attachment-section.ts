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

      .chat-footer-attachment-section {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        gap: var(--chat-spacing-2);
        align-items: center;
        width: 0;
        overflow-x: scroll;
      }

      .chat-footer-attachment-section__item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 7.5rem;
        min-height: 4rem;
        padding: var(--chat-spacing-1);
        background-color: var(--chat-muted);
        border-radius: var(--chat-radius-lg);
      }

      .chat-footer-attachment-section__button {
        display: flex;
        align-items: center;
        align-self: flex-end;
        justify-content: center;
        padding: var(--chat-spacing-1);
        background-color: transparent;
        border: none;
        border-radius: var(--chat-radius-full);
      }

      .chat-footer-attachment-section__button:hover {
        background-color: var(--chat-accent);
      }

      .chat-footer-attachment-section__text {
        display: inline-block;
        align-self: flex-start;
        max-width: 6.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--chat-text-xs);
        color: var(--chat-foreground);
        white-space: nowrap;
      }

      .chat-footer-attachment-section__text--highlight {
        font-weight: 600;
      }

      .chat-footer-attachment-section__image-wrapper {
        position: relative;
        height: 4rem;
      }

      .chat-footer-attachment-section__image {
        width: 7.5rem;
        height: 100%;
        object-fit: cover;
        border-radius: var(--chat-radius-lg);
      }

      .chat-footer-attachment-section__image-button {
        position: absolute;
        top: var(--chat-spacing-1);
        right: var(--chat-spacing-1);
        background-color: var(--chat-background);
        border-radius: var(--chat-radius-full);
      }

      .chat-footer-attachment-section__image-button:hover {
        background-color: var(--chat-accent);
      }
    `,
  ];

  render() {
    return html`<div class="chat-footer-attachment-section">
      ${this.attachments.map((attachment) =>
        !attachment.imageUrl
          ? html`<div class="chat-footer-attachment-section__item">
              <button
                class="chat-footer-attachment-section__button"
                @click="${() => this._removeAttachment(attachment)}"
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
              <span
                class="chat-footer-attachment-section__text chat-footer-attachment-section__text--highlight"
                >${attachment.name}</span
              >
              <span class="chat-footer-attachment-section__text"
                >${attachment.meta}</span
              >
            </div>`
          : html`<div class="chat-footer-attachment-section__image-wrapper">
              <img
                class="chat-footer-attachment-section__image"
                src="${attachment.imageUrl}"
                height="100%"
                width="120"
              /><button
                class="chat-footer-attachment-section__button chat-footer-attachment-section__image-button"
                @click="${() => this._removeAttachment(attachment)}"
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
