import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles/global";
import { ClickDialogButtonDetail, Dialog } from "../types";

export class ChatDialog extends LitElement {
  @property({ type: Object }) dialog!: Dialog;

  onClickLeftButton() {
    this.dispatchEvent(
      new CustomEvent<ClickDialogButtonDetail>("click-dialog-button", {
        detail: { event: this.dialog.event, side: "left" },
        composed: true,
      }),
    );
  }

  onClickRightButton() {
    this.dispatchEvent(
      new CustomEvent<ClickDialogButtonDetail>("click-dialog-button", {
        detail: { event: this.dialog.event, side: "right" },
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

      .chat-dialog {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: var(--overlay);
      }

      .chat-dialog__window {
        display: flex;
        flex-direction: column;
        gap: 1.2em;
        width: 20em;
        padding: 1.6em;
        background-color: var(--surface-50);
        border-radius: 0.8em;
      }

      .chat-dialog__body {
        font-size: 1.4em;
        color: var(--surface-600);
      }

      .chat-dialog__footer {
        display: flex;
        flex-direction: row;
        gap: 1.2em;
        align-items: center;
        justify-content: flex-end;
      }

      .chat-dialog__button {
        font-size: 1.4em;
        color: var(--text);
        background-color: transparent;
        border: none;
      }

      .chat-dialog__button--success {
        color: var(--success);
      }

      .chat-dialog__button--danger {
        color: var(--danger);
      }

      .chat-dialog__button--warning {
        color: var(--warning);
      }

      .chat-dialog__button--info {
        color: var(--info);
      }
    `,
  ];

  render() {
    return html`<div class="chat-dialog">
      <div class="chat-dialog__window">
        <div class="chat-dialog__body">${this.dialog.body}</div>
        <div class="chat-dialog__footer">
          <button
            class="${classMap({
              "chat-dialog__button": true,
              "chat-dialog__button--success":
                this.dialog.leftButton.variant === "success",
              "chat-dialog__button--danger":
                this.dialog.leftButton.variant === "danger",
              "chat-dialog__button--warning":
                this.dialog.leftButton.variant === "warning",
              "chat-dialog__button--info":
                this.dialog.leftButton.variant === "info",
            })}"
            @click="${this.onClickLeftButton}"
          >
            ${this.dialog.leftButton.text}
          </button>
          <button
            class="${classMap({
              "chat-dialog__button": true,
              "chat-dialog__button--success":
                this.dialog.rightButton.variant === "success",
              "chat-dialog__button--danger":
                this.dialog.rightButton.variant === "danger",
              "chat-dialog__button--warning":
                this.dialog.rightButton.variant === "warning",
              "chat-dialog__button--info":
                this.dialog.rightButton.variant === "info",
            })}"
            @click="${this.onClickRightButton}"
          >
            ${this.dialog.rightButton.text}
          </button>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-dialog": ChatDialog;
  }
}
