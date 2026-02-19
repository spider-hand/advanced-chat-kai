import { LitElement, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "../../styles";
import { SelectEmojiDetail } from "../../types";
import { currentUserIdContext } from "../../contexts";

export class ChatEmojiPicker extends LitElement {
  @consume({ context: currentUserIdContext, subscribe: true })
  @property({ type: String })
  currentUserId: string | null = null;

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
      new CustomEvent<SelectEmojiDetail>("select-emoji", {
        detail: {
          messageId: this.messageId as string,
          currentUserId: this.currentUserId,
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
        overflow: hidden;
        border-radius: var(--chat-radius-lg);
        box-shadow: 0 0.25rem 0.5rem oklch(0% 0 0deg / 15%);
      }

      emoji-picker {
        --background: var(--chat-popover);
        --border-color: var(--chat-border);
        --border-radius: var(--chat-radius-lg);
        --button-active-background: var(--chat-accent);
        --button-hover-background: var(--chat-accent);
        --category-font-color: var(--chat-foreground);
        --category-font-size: var(--chat-text-xs);
        --emoji-padding: var(--chat-spacing-2);
        --emoji-size: var(--chat-spacing-4);
        --indicator-color: var(--chat-primary);
        --indicator-height: 4px;
        --input-border-color: var(--chat-input);
        --input-border-radius: var(--chat-radius-lg);
        --input-border-size: 1px;
        --input-font-color: var(--chat-foreground);
        --input-font-size: var(--chat-text-sm);
        --input-padding: var(--chat-spacing-2);
        --input-placeholder-color: var(--chat-muted-foreground);
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

declare global {
  interface HTMLElementTagNameMap {
    "chat-emoji-picker": ChatEmojiPicker;
  }
}
