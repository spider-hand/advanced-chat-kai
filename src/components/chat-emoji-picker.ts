import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import "emoji-picker-element";

@customElement("chat-emoji-picker")
export class ChatEmojiPicker extends LitElement {
  @property({ type: Number }) width = 300;
  @property({ type: Number }) height = 300;

  @query("emoji-picker") emojiPicker!: HTMLDivElement;

  constructor() {
    super();
    this._onClickOutside = this._onClickOutside.bind(this);
  }

  private _onClickOutside = (event: MouseEvent) => {
    if (!event.composedPath().includes(this.emojiPicker)) {
      this.dispatchEvent(new CustomEvent("close"));
    }
  };

  private _onClickEmoji = (event: CustomEvent) => {
    this.dispatchEvent(
      new CustomEvent("select-emoji", {
        detail: event.detail.unicode,
        composed: true,
      }),
    );
  };

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener("mousedown", this._onClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener("mousedown", this._onClickOutside);
  }

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
      }

      emoji-picker {
        --background: var(--gray-50);
        --border-color: var(--border);
        --border-radius: 8px;
        --button-active-background: var(--gray-100);
        --button-hover-background: var(--gray-100);
        --category-font-color: var(--gray-900);
        --category-font-size: 12px;
        --emoji-padding: 8px;
        --emoji-size: 16px;
        --indicator-color: var(--gray-700);
        --indicator-height: 4px;
        --input-border-color: var(--border);
        --input-border-radius: 8px;
        --input-border-size: 1px;
        --input-font-color: var(--gray-900);
        --input-font-size: 14px;
        --input-padding: 8px;
        --input-placeholder-color: var(--placeholder);
      }
    `,
  ];

  render() {
    return html`<emoji-picker
      style="width: ${this.width}px; height: ${this.height}px"
      @emoji-click="${this._onClickEmoji}"
    ></emoji-picker>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-emoji-picker": ChatEmojiPicker;
  }
}
