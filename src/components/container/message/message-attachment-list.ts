import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../../../styles";
import {
  ChatMessageAttachment,
  DownloadAttachmentDetail,
} from "../../../types";

export class ChatMessageAttachmentList extends LitElement {
  @property({ type: Array }) attachments: Array<ChatMessageAttachment> = [];
  @property({ type: Boolean }) mine = false;

  private _downloadAttachment(attachment: ChatMessageAttachment) {
    this.dispatchEvent(
      new CustomEvent<DownloadAttachmentDetail>("download-attachment", {
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

      .chat-message-attachment-list {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap: var(--chat-spacing-2);
      }

      .chat-message-attachment-list__item {
        display: flex;
        flex-direction: column;
        gap: var(--chat-spacing-1);
        padding: var(--chat-spacing-1) var(--chat-spacing-2);
        text-align: start;
        background-color: var(--chat-accent);
        border: none;
        border-radius: var(--chat-radius);
      }

      .chat-message-attachment-list__text {
        display: inline-block;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--chat-text-xs);
        color: var(--chat-foreground);
        white-space: nowrap;
      }

      .chat-message-attachment-list__item:hover {
        background-color: var(--chat-muted);
      }

      .chat-message-attachment-list--mine .chat-message-attachment-list__item {
        background-color: oklch(0% 0 0deg / 10%);
      }

      .chat-message-attachment-list--mine
        .chat-message-attachment-list__item:hover {
        background-color: oklch(0% 0 0deg / 15%);
      }

      .chat-message-attachment-list--mine .chat-message-attachment-list__text {
        color: var(--chat-message-mine-foreground);
      }

      .chat-message-attachment-list__icon {
        margin-left: auto;
      }

      .chat-message-attachment-list__image-wrapper {
        position: relative;
      }

      .chat-message-attachment-list__image {
        object-fit: cover;
        border-radius: var(--chat-radius);
      }

      .chat-message-attachment-list__image-button {
        position: absolute;
        right: var(--chat-spacing-2);
        bottom: var(--chat-spacing-2);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--chat-spacing-1);
        background-color: var(--chat-popover);
        border: none;
        border-radius: var(--chat-radius-lg);
      }

      .chat-message-attachment-list__image-button:hover {
        background-color: var(--chat-accent);
      }
    `,
  ];

  render() {
    return html`<div
      class=${classMap({
        "chat-message-attachment-list": true,
        "chat-message-attachment-list--mine": this.mine,
      })}
    >
      ${this.attachments.map((attachment) =>
        !attachment.imageUrl
          ? html`<button
              class="chat-message-attachment-list__item"
              @click="${() => this._downloadAttachment(attachment)}"
            >
              <span class="chat-message-attachment-list__text"
                >${attachment.name}</span
              ><span class="chat-message-attachment-list__text"
                >${attachment.meta}</span
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6em"
                height="1.6em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="${this.mine
                  ? "var(--chat-message-mine-foreground)"
                  : "var(--chat-muted-foreground)"}"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="chat-message-attachment-list__icon"
              >
                <path
                  d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
                />
                <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            </button>`
          : html`<div class="chat-message-attachment-list__image-wrapper">
              <img
                class="chat-message-attachment-list__image"
                src="${attachment.imageUrl}"
                width="100%"
              />
              <button
                class="chat-message-attachment-list__image-button"
                @click="${() => this._downloadAttachment(attachment)}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="1.6em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--chat-foreground)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 15V3" />
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="m7 10 5 5 5-5" />
                </svg>
              </button>
            </div>`,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-attachment-list": ChatMessageAttachmentList;
  }
}
