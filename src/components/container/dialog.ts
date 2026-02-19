import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../../styles";
import { ClickDialogButtonDetail, Dialog } from "../../types";

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
        background-color: oklch(0% 0 0deg / 50%);
      }

      .chat-dialog__window {
        display: flex;
        flex-direction: column;
        gap: var(--chat-spacing-3);
        width: 12.5rem;
        padding: var(--chat-spacing-4);
        background-color: var(--chat-popover);
        border-radius: var(--chat-radius-lg);
      }

      .chat-dialog__body {
        font-size: var(--chat-text-sm);
        color: var(--chat-popover-foreground);
      }

      .chat-dialog__footer {
        display: flex;
        flex-direction: row;
        gap: var(--chat-spacing-3);
        align-items: center;
        justify-content: flex-end;
      }

      .chat-dialog__button {
        font-size: var(--chat-text-sm);
        color: var(--chat-foreground);
        background-color: transparent;
        border: none;
      }

      .chat-dialog__button--success {
        color: var(--chat-primary);
      }

      .chat-dialog__button--danger {
        color: var(--chat-destructive);
      }

      .chat-dialog__button--warning {
        color: var(--chat-primary);
      }

      .chat-dialog__button--info {
        color: var(--chat-primary);
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
              [`chat-dialog__button--${this.dialog.leftButton.variant}`]:
                this.dialog.leftButton.variant !== undefined,
            })}"
            @click="${this.onClickLeftButton}"
          >
            ${this.dialog.leftButton.text}
          </button>
          <button
            class="${classMap({
              "chat-dialog__button": true,
              [`chat-dialog__button--${this.dialog.rightButton.variant}`]:
                this.dialog.rightButton.variant !== undefined,
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
