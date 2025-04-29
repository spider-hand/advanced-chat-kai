import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { globalStyles } from "./styles/global";
import "./components/chat-container";
import "./components/chat-sidebar";
import { sidebarContext } from "./contexts/sidebar-context";
import { deviceContext } from "./contexts/device-context";

@customElement("advanced-chat-kai")
export class Main extends LitElement {
  @provide({ context: sidebarContext })
  @property({ type: Boolean })
  showSidebar = true;
  @provide({ context: deviceContext })
  @property({ type: Boolean })
  isMobile = false;

  // TODO: Props
  private get _height() {
    return window.innerHeight;
  }

  private _closeSidebar() {
    this.showSidebar = false;
  }

  private _openSidebar() {
    this.showSidebar = true;
  }

  static styles = [
    globalStyles,
    css`
      .main {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: hidden;
        background-color: var(--white);
        border: 0.1em solid var(--border);
        border-radius: 1.6em;
        box-shadow: rgb(0 0 0 / 15%) 0 0.3em 0.3em 0;
      }
    `,
  ];

  render() {
    return html`<div class="main" style="height: ${this._height}px">
      <chat-sidebar
        .show="${this.showSidebar}"
        @close="${this._closeSidebar}"
      ></chat-sidebar>
      <chat-container @open-sidebar="${this._openSidebar}"></chat-container>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "advanced-chat-kai": Main;
  }
}
