import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { consume } from "@lit/context";
import { globalStyles } from "../../../styles";
import { I18nContext, i18nContext } from "../../../contexts";

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
        color: var(--chat-muted-foreground);
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
          ? "var(--chat-message-mine-foreground)"
          : "var(--chat-muted-foreground)",
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="${this.isReplyOnMyMessage
          ? "var(--chat-message-mine-foreground)"
          : "var(--chat-muted-foreground)"}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="chat-deleted-message__icon"
      >
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
      ${this.i18nContext.i18n.DELETED_MESSAGE}</span
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-deleted-message": ChatDeletedMessage;
  }
}
