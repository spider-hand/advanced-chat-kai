import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles";
import { I18nContext, i18nContext } from "../contexts";

export class ChatDeletedMessage extends LitElement {
  @consume({ context: i18nContext, subscribe: true })
  @property({ type: Object })
  i18nContext!: I18nContext;

  @property({ type: Boolean }) isReplyOnMyMessage = false;

  @property({ type: Number }) fontSize = 1;

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      .chat-deleted-message {
        color: var(--chat-surface-700);
      }

      .chat-deleted-message__icon {
        margin-right: 0.2em;
        margin-bottom: 0.2em;
        vertical-align: middle;
      }
    `,
  ];

  render() {
    return html`<span
      class="chat-deleted-message"
      style=${styleMap({
        fontSize: `${this.fontSize}em`,
        color: this.isReplyOnMyMessage
          ? "var(--chat-text-on-brand, var(--chat-surface-700))"
          : "var(--chat-surface-700)",
      })}
      ><svg
        class="chat-deleted-message__icon"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 -960 960 960"
        width="1em"
        fill=${this.isReplyOnMyMessage
          ? "var(--chat-text-on-brand, var(--chat-surface-700))"
          : "var(--chat-surface-700)"}
      >
        <path
          d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"
        /></svg
      >${this.i18nContext.i18n.DELETED_MESSAGE}</span
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-deleted-message": ChatDeletedMessage;
  }
}
