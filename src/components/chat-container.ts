import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles/global";
import "./chat-header";
import "./chat-message-list";
import "./chat-footer";
import { DeviceContext, deviceContext } from "../contexts/device-context";
import { sidebarContext } from "../contexts/sidebar-context";
import { ReplyToMessageDetail } from "../types";

@customElement("chat-container")
export class ChatContainer extends LitElement {
  @consume({ context: deviceContext, subscribe: true })
  @property({ type: Object })
  deviceContext!: DeviceContext;
  @consume({ context: sidebarContext, subscribe: true })
  @property({ type: Boolean })
  showSidebar!: boolean;

  @state() private _replyTo: ReplyToMessageDetail | null = null;

  private get _show() {
    return this.deviceContext.isMobile && this.showSidebar ? false : true;
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
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        height: 100%;
        background-color: var(--gray-50);
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
        "chat-container--mobile": this.deviceContext.isMobile,
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
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-container": ChatContainer;
  }
}
