import { css } from "lit";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    font-size: inherit;
    cursor: pointer;
  }

  :host {
    --chat-base-font-size: 10px;
    font-size: var(--chat-base-font-size);
  }

  :host([theme="light"]) {
    --chat-white: hsl(0deg 0% 100%);
    --chat-black: hsl(0deg 0% 0%);
    --chat-success: hsl(153deg 71% 39%);
    --chat-danger: hsl(354deg 70% 53%);
    --chat-warning: hsl(45deg 100% 51%);
    --chat-info: hsl(211deg 100% 49%);
    --chat-surface-50: hsl(0deg 20% 99%);
    --chat-surface-100: hsl(0deg 23% 97%);
    --chat-surface-200: hsl(0deg 17% 93%);
    --chat-surface-300: hsl(0deg 12% 85%);
    --chat-surface-400: hsl(0deg 7% 75%);
    --chat-surface-500: hsl(0deg 1% 61%);
    --chat-surface-600: hsl(0deg 0% 45%);
    --chat-surface-700: hsl(0deg 0% 32%);
    --chat-surface-800: hsl(0deg 0% 23%);
    --chat-surface-900: hsl(0deg 0% 18%);
    --chat-surface-950: hsl(0deg 0% 16%);
    --chat-text: var(--chat-surface-900);
    --chat-subtext: var(--chat-surface-700);
    --chat-border: var(--chat-surface-200);
    --chat-floating-item-border: none;
    --chat-floating-item-box-shadow: rgb(0 0 0 / 15%) 0 0.1em 0.1em 0;
    --chat-placeholder: var(--chat-surface-500);
    --chat-deleted: hsl(0deg 0% 0% / 10%);
    --chat-overlay: hsl(0deg 0% 0% / 15%);
    --chat-notification-badge-background: var(--chat-info);
    --chat-notification-badge-text: var(--chat-white);
  }

  :host([theme="dark"]) {
    --chat-white: hsl(0deg 0% 100%);
    --chat-black: hsl(0deg 0% 0%);
    --chat-success: hsl(135deg 69% 69%);
    --chat-danger: hsl(354deg 70% 53%);
    --chat-warning: hsl(46deg 100% 79%);
    --chat-info: hsl(211deg 100% 53%);
    --chat-surface-50: hsl(0deg 0% 16%);
    --chat-surface-100: hsl(0deg 0% 18%);
    --chat-surface-200: hsl(0deg 0% 23%);
    --chat-surface-300: hsl(0deg 0% 32%);
    --chat-surface-400: hsl(0deg 0% 45%);
    --chat-surface-500: hsl(0deg 0% 61%);
    --chat-surface-600: hsl(0deg 7% 75%);
    --chat-surface-700: hsl(0deg 12% 85%);
    --chat-surface-800: hsl(0deg 17% 93%);
    --chat-surface-900: hsl(0deg 23% 97%);
    --chat-surface-950: hsl(0deg 20% 99%);
    --chat-text: var(--chat-surface-800);
    --chat-subtext: var(--chat-surface-600);
    --chat-border: var(--chat-surface-200);
    --chat-floating-item-border: solid 0.1em var(--chat-border);
    --chat-floating-item-box-shadow: none;
    --chat-placeholder: var(--chat-surface-500);
    --chat-deleted: hsl(0deg 0% 100% / 10%);
    --chat-overlay: hsl(1deg 100% 100% / 15%);
    --chat-notification-badge-background: var(--chat-info);
    --chat-notification-badge-text: var(--chat-white);
  }
`;
