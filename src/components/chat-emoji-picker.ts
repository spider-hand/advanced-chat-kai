import { LitElement, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "../styles/global";
import { ChatUser, SelecteEmojiDetail } from "../types";
import { currentUserContext } from "../contexts/current-user-context";

export class ChatEmojiPicker extends LitElement {
  @consume({ context: currentUserContext, subscribe: true })
  @property({ type: Object })
  currentUser!: ChatUser;

  @property({ type: String }) messageId: string | null = null;
  @property({ type: Number }) width = 300;
  @property({ type: Number }) height = 300;

  @state() private _hasEmojiPickerLoaded = false;

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
      new CustomEvent<SelecteEmojiDetail>("select-emoji", {
        detail: {
          messageId: this.messageId,
          currentUserId: this.currentUser.id,
          emoji: event.detail.unicode,
        },
        composed: true,
      }),
    );
  };

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    if (!this._hasEmojiPickerLoaded) {
      await import("emoji-picker-element");
      this._hasEmojiPickerLoaded = true;
    }

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
    return html`${this._hasEmojiPickerLoaded
      ? html`<emoji-picker
          style="width: ${this.width}px; height: ${this.height}px"
          @emoji-click="${this._onClickEmoji}"
        ></emoji-picker>`
      : nothing}`;
  }
}

if (!customElements.get("chat-emoji-picker")) {
  customElements.define("chat-emoji-picker", ChatEmojiPicker);
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-emoji-picker": ChatEmojiPicker;
  }
}
