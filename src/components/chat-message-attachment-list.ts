import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles/global";
import { ChatMessageAttachment, DownloadAttachmentDetail } from "../types";

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
        gap: 0.8em;
      }

      .chat-message-attachment-list__item {
        display: flex;
        flex-direction: column;
        gap: 0.4em;
        padding: 0.4em 0.8em;
        text-align: start;
        background-color: var(--surface-200);
        border: none;
        border-radius: 0.4em;
      }

      .chat-message-attachment-list__text {
        display: inline-block;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2em;
        white-space: nowrap;
      }

      .chat-message-attachment-list__item:hover {
        background-color: var(--surface-300);
      }

      .chat-message-attachment-list--mine .chat-message-attachment-list__item {
        background-color: var(--surface-300);
      }

      .chat-message-attachment-list--mine
        .chat-message-attachment-list__item:hover {
        background-color: var(--surface-400);
      }

      .chat-message-attachment-list__icon {
        margin-left: auto;
      }

      .chat-message-attachment-list__image-wrapper {
        position: relative;
      }

      .chat-message-attachment-list__image {
        object-fit: cover;
        border-radius: 0.4em;
      }

      .chat-message-attachment-list__image-button {
        position: absolute;
        right: 0.8em;
        bottom: 0.8em;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4em;
        background-color: var(--surface-50);
        border: none;
        border-radius: 0.8em;
      }

      .chat-message-attachment-list__image-button:hover {
        background-color: var(--surface-100);
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
                class="chat-message-attachment-list__icon"
                xmlns="http://www.w3.org/2000/svg"
                height="2em"
                viewBox="0 -960 960 960"
                width="2em"
                fill="var(--surface-700)"
              >
                <path
                  d="M360-240h240q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320H360q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm0-160h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z"
                />
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
                  height="2.4em"
                  viewBox="0 -960 960 960"
                  width="2.4em"
                  fill="var(--surface-900)"
                >
                  <path
                    d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
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
    "chat-message-attachment-list": ChatMessageAttachmentList;
  }
}
