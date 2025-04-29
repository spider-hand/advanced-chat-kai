import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { classMap } from "lit/directives/class-map.js";
import { globalStyles } from "../styles/global";
import "./chat-header";
import "./chat-message-list";
import "./chat-footer";
import { deviceContext } from "../contexts/device-context";
import { sidebarContext } from "../contexts/sidebar-context";

@customElement("chat-container")
export class ChatContainer extends LitElement {
  @consume({ context: deviceContext, subscribe: true })
  @property({ type: Boolean })
  isMobile!: boolean;
  @consume({ context: sidebarContext, subscribe: true })
  @property({ type: Boolean })
  showSidebar!: boolean;

  private get _show() {
    return this.isMobile && this.showSidebar ? false : true;
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
        "chat-container--mobile": this.isMobile,
        "chat-container--hidden": !this._show,
      })}"
    >
      <chat-header></chat-header><chat-message-list></chat-message-list
      ><chat-footer></chat-footer>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-container": ChatContainer;
  }
}
