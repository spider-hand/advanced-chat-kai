import { LitElement, css, html } from "lit";
import { consume } from "@lit/context";
import { property } from "lit/decorators.js";
import { globalStyles } from "../../../styles";
import { I18nContext, i18nContext } from "../../../contexts";

export class ChatNotificationBadge extends LitElement {
  @consume({ context: i18nContext, subscribe: true })
  @property({ type: Object })
  i18nContext!: I18nContext;

  private _onClickNotificationBadge = () => {
    this.dispatchEvent(new CustomEvent("click-notification-badge"));
  };

  static styles = [
    globalStyles,
    css`
      :host {
        position: sticky;
        bottom: var(--chat-spacing-4);
        display: flex;
        align-self: center;
      }

      .notification-badge {
        padding: var(--chat-spacing-2);
        color: var(--chat-primary-foreground);
        background-color: var(--chat-primary);
        border: none;
        border-radius: var(--chat-radius-full);
        box-shadow: var(--chat-shadow-sm);
      }
    `,
  ];

  render() {
    return html`<button
      class="notification-badge"
      @click="${this._onClickNotificationBadge}"
    >
      ${this.i18nContext.i18n.NEW_MESSAGE_NOTIFICATION}
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-notification-badge": ChatNotificationBadge;
  }
}
