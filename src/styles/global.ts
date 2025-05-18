import { css } from "lit";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: inherit;
    color: var(--text);
  }

  button {
    font-size: inherit;
    cursor: pointer;
  }

  :host {
    --base-font-size: 10px;
    font-size: var(--base-font-size);
  }

  :host([theme="light"]) {
    --white: hsl(0deg 0% 100%);
    --black: hsl(0deg 0% 0%);
    --success: hsl(153deg 71% 39%);
    --danger: hsl(354deg 70% 53%);
    --warning: hsl(45deg 100% 51%);
    --info: hsl(211deg 100% 49%);
    --surface-50: hsl(0deg 20% 99%);
    --surface-100: hsl(0deg 23% 97%);
    --surface-200: hsl(0deg 17% 93%);
    --surface-300: hsl(0deg 12% 85%);
    --surface-400: hsl(0deg 7% 75%);
    --surface-500: hsl(0deg 1% 61%);
    --surface-600: hsl(0deg 0% 45%);
    --surface-700: hsl(0deg 0% 32%);
    --surface-800: hsl(0deg 0% 23%);
    --surface-900: hsl(0deg 0% 18%);
    --surface-950: hsl(0deg 0% 16%);
    --text: var(--surface-900);
    --border: var(--surface-200);
    --floating-item-border: none;
    --floating-item-box-shadow: rgb(0 0 0 / 15%) 0 0.1em 0.1em 0;
    --placeholder: var(--surface-500);
    --deleted: hsl(0deg 0% 0% / 10%);
    --overlay: hsl(0deg 0% 0% / 15%);
  }

  :host([theme="dark"]) {
    --white: hsl(0deg 0% 100%);
    --black: hsl(0deg 0% 0%);
    --success: hsl(135deg 69% 69%);
    --danger: hsl(354deg 70% 53%);
    --warning: hsl(46deg 100% 79%);
    --info: hsl(213deg 100% 78%);
    --surface-50: hsl(0deg 0% 16%);
    --surface-100: hsl(0deg 0% 18%);
    --surface-200: hsl(0deg 0% 23%);
    --surface-300: hsl(0deg 0% 32%);
    --surface-400: hsl(0deg 0% 45%);
    --surface-500: hsl(0deg 0% 61%);
    --surface-600: hsl(0deg 7% 75%);
    --surface-700: hsl(0deg 12% 85%);
    --surface-800: hsl(0deg 17% 93%);
    --surface-900: hsl(0deg 23% 97%);
    --surface-950: hsl(0deg 20% 99%);
    --text: var(--surface-800);
    --border: var(--surface-200);
    --floating-item-border: solid 0.1em var(--border);
    --floating-item-box-shadow: none;
    --placeholder: var(--surface-500);
    --deleted: hsl(0deg 0% 100% / 10%);
    --overlay: hsl(1deg 100% 100% / 15%);
  }
`;
