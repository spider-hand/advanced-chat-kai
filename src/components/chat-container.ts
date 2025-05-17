import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles/global";
import "./chat-header";
import "./chat-message-list";
import "./chat-footer";
import "./chat-dialog";
import { sidebarContext } from "../contexts/sidebar-context";
import { Dialog, ReplyToMessageDetail } from "../types";

export class ChatContainer extends LitElement {
  @consume({ context: sidebarContext, subscribe: true })
  @property({ type: Boolean })
  showSidebar!: boolean;

  @property({ type: Boolean }) isMobile = false;
  @property({ type: Boolean }) isSingleRoom = false;
  @property({ type: Object }) dialog: Dialog = null;

  @state() private _replyTo: ReplyToMessageDetail | null = null;

  private get _show() {
    return this.isSingleRoom || !(this.isMobile && this.showSidebar);
  }

  private _onReplyToMessage(e: CustomEvent<ReplyToMessageDetail>) {
    this._replyTo = e.detail;
  }

  private _onCancelReply() {
    this._replyTo = null;
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        flex-grow: 1;
      }

      .chat-container {
        position: relative;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        height: 100%;
        background-color: var(--surface-50);
        border-left: 0.1em solid var(--border);
      }

      .chat-container--mobile {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }

      .chat-container--hidden {
        display: none;
      }
    `,
  ];

  render() {
    return html`<div
      class="${classMap({
        "chat-container": true,
        "chat-container--mobile": this.isMobile,
        "chat-container--hidden": !this._show,
      })}"
    >
      <chat-header></chat-header
      ><chat-message-list
        .replyTo="${this._replyTo}"
        @reply-to-message="${this._onReplyToMessage}"
      ></chat-message-list
      ><chat-footer
        .replyTo="${this._replyTo}"
        @cancel-reply="${this._onCancelReply}"
      ></chat-footer>
      ${this.dialog
        ? html`<chat-dialog .dialog="${this.dialog}"></chat-dialog>`
        : nothing}
    </div>`;
  }
}

if (!customElements.get("chat-container")) {
  customElements.define("chat-container", ChatContainer);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-container": ChatContainer;
  }
}
