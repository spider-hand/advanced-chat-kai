import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("advanced-chat-kai")
export class AdvancedChatKai extends LitElement {
  render() {
    return html` <h1>Hello, world</h1> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "advanced-chat-kai": AdvancedChatKai;
  }
}
