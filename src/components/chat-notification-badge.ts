import { LitElement, css, html } from "lit";
import { consume } from "@lit/context";
import { property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import { I18nContext, i18nContext } from "../contexts/i18n-context";

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
        bottom: 1.6em;
        display: flex;
        align-self: center;
      }

      .chat-notification-badge {
        padding: 0.8em;
        color: var(--chat-notification-badge-text);
        background-color: var(--chat-notification-badge-background);
        border: none;
        border-radius: 10em;
        box-shadow: var(--floating-item-box-shadow);
      }
    `,
  ];

  render() {
    return html`<button
      class="chat-notification-badge"
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
