import { css } from "lit";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: inherit;
    color: var(--gray-900);
  }

  button {
    font-size: inherit;
    cursor: pointer;
  }

  :host {
    --white: hsl(0deg 0% 100%);
    --black: hsl(0deg 0% 0%);
    --gray-50: hsl(0deg 20% 99%);
    --gray-100: hsl(0deg 23% 97%);
    --gray-200: hsl(0deg 17% 93%);
    --gray-300: hsl(0deg 12% 85%);
    --gray-400: hsl(0deg 8% 75%);
    --gray-500: hsl(0deg 0% 61%);
    --gray-600: hsl(0deg 0% 45%);
    --gray-700: hsl(0deg 0% 32%);
    --gray-800: hsl(0deg 0% 23%);
    --gray-900: hsl(0deg 0% 18%);
    --gray-950: hsl(0deg 0% 16%);
    --border: var(--gray-200);
    --placeholder: var(--gray-500);
    --deleted: rgb(0 0 0 / 10%);
    --base-font-size: 10px;
    font-size: var(--base-font-size);
  }
`;
