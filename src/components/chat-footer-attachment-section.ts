import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles";
import { ChatMessageAttachment, RemoveAttachmentDetail } from "../types";

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
        gap: 0.8em;
        align-items: center;
        width: 0;
        overflow-x: scroll;
      }

      .chat-footer-attachment-section__item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 12em;
        min-height: 6.4em;
        padding: 0.4em;
        background-color: var(--chat-surface-200);
        border-radius: 0.8em;
      }

      .chat-footer-attachment-section__button {
        display: flex;
        align-items: center;
        align-self: flex-end;
        justify-content: center;
        padding: 0.4em;
        background-color: transparent;
        border: none;
        border-radius: 10em;
      }

      .chat-footer-attachment-section__button:hover {
        background-color: var(--chat-surface-300);
      }

      .chat-footer-attachment-section__text {
        display: inline-block;
        align-self: flex-start;
        max-width: 10em;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1em;
        color: var(--chat-text);
        white-space: nowrap;
      }

      .chat-footer-attachment-section__text--highlight {
        font-weight: 600;
      }

      .chat-footer-attachment-section__image-wrapper {
        position: relative;
        height: 6.4em;
      }

      .chat-footer-attachment-section__image {
        width: 12em;
        height: 100%;
        object-fit: cover;
        border-radius: 0.8em;
      }

      .chat-footer-attachment-section__image-button {
        position: absolute;
        top: 0.4em;
        right: 0.4em;
        background-color: var(--chat-surface-50);
        border-radius: 10em;
      }

      .chat-footer-attachment-section__image-button:hover {
        background-color: var(--chat-surface-100);
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
                  fill="var(--chat-surface-700)"
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
                  fill="var(--chat-surface-700)"
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
