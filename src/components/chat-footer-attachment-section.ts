import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
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
        background-color: var(--gray-200);
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
        background-color: var(--gray-300);
      }

      .chat-footer-attachment-section__text {
        display: inline-block;
        align-self: flex-start;
        max-width: 10em;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1em;
        white-space: nowrap;
      }

      .chat-footer-attachment-section__text--highlight {
        font-weight: 600;
      }
    `,
  ];

  render() {
    return html`<div class="chat-footer-attachment-section">
      ${this.attachments.map(
        (attachment) =>
          html`<div class="chat-footer-attachment-section__item">
            <button
              class="chat-footer-attachment-section__button"
              @click="${() => this._removeAttachment(attachment)}"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.6em"
                viewBox="0 -960 960 960"
                width="1.6em"
                fill="var(--gray-700)"
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
          </div>`,
      )}
    </div>`;
  }
}

if (!customElements.get("chat-footer-attachment-section")) {
  customElements.define("chat-footer-attachment-section", ChatFooterAttachmentSection);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-footer-attachment-section": ChatFooterAttachmentSection;
  }
}
