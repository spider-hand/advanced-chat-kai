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
    --chat-background: oklch(100% 0 0deg);
    --chat-foreground: oklch(14.5% 0 0deg);
    --chat-card: oklch(100% 0 0deg);
    --chat-card-foreground: oklch(14.5% 0 0deg);
    --chat-popover: oklch(100% 0 0deg);
    --chat-popover-foreground: oklch(14.5% 0 0deg);
    --chat-primary: oklch(20.5% 0 0deg);
    --chat-primary-foreground: oklch(98.5% 0 0deg);
    --chat-secondary: oklch(97% 0 0deg);
    --chat-secondary-foreground: oklch(20.5% 0 0deg);
    --chat-muted: oklch(97% 0 0deg);
    --chat-muted-foreground: oklch(55.6% 0 0deg);
    --chat-accent: oklch(97% 0 0deg);
    --chat-accent-foreground: oklch(20.5% 0 0deg);
    --chat-destructive: oklch(57.7% 0.245 27.325deg);
    --chat-destructive-foreground: oklch(57.7% 0.245 27.325deg);
    --chat-border: oklch(92.2% 0 0deg);
    --chat-input: oklch(92.2% 0 0deg);
    --chat-ring: oklch(70.8% 0 0deg);
    --chat-radius: 0.625rem;
    --chat-sidebar: oklch(98.5% 0 0deg);
    --chat-sidebar-foreground: oklch(14.5% 0 0deg);
    --chat-sidebar-primary: oklch(20.5% 0 0deg);
    --chat-sidebar-primary-foreground: oklch(98.5% 0 0deg);
    --chat-sidebar-accent: oklch(97% 0 0deg);
    --chat-sidebar-accent-foreground: oklch(20.5% 0 0deg);
    --chat-sidebar-border: oklch(92.2% 0 0deg);
    --chat-sidebar-ring: oklch(70.8% 0 0deg);
    --chat-message-mine: var(--chat-accent);
    --chat-message-mine-foreground: var(--chat-accent-foreground);
    --chat-success: oklch(62.7% 0.194 145.022deg);
    --chat-success-foreground: oklch(100% 0 0deg);
    --chat-danger: var(--chat-destructive);
    --chat-danger-foreground: oklch(100% 0 0deg);
    --chat-warning: oklch(76.9% 0.188 70.08deg);
    --chat-warning-foreground: oklch(100% 0 0deg);
    --chat-info: oklch(54.6% 0.245 262.881deg);
    --chat-info-foreground: oklch(100% 0 0deg);
  }

  :host([theme="dark"]) {
    --chat-background: oklch(14.5% 0 0deg);
    --chat-foreground: oklch(98.5% 0 0deg);
    --chat-card: oklch(20.5% 0 0deg);
    --chat-card-foreground: oklch(98.5% 0 0deg);
    --chat-popover: oklch(26.9% 0 0deg);
    --chat-popover-foreground: oklch(98.5% 0 0deg);
    --chat-primary: oklch(92.2% 0 0deg);
    --chat-primary-foreground: oklch(20.5% 0 0deg);
    --chat-secondary: oklch(26.9% 0 0deg);
    --chat-secondary-foreground: oklch(98.5% 0 0deg);
    --chat-muted: oklch(26.9% 0 0deg);
    --chat-muted-foreground: oklch(70.8% 0 0deg);
    --chat-accent: oklch(37.1% 0 0deg);
    --chat-accent-foreground: oklch(98.5% 0 0deg);
    --chat-destructive: oklch(70.4% 0.191 22.216deg);
    --chat-destructive-foreground: oklch(70.4% 0.191 22.216deg);
    --chat-border: oklch(100% 0 0deg / 10%);
    --chat-input: oklch(100% 0 0deg / 15%);
    --chat-ring: oklch(55.6% 0 0deg);
    --chat-radius: 0.625rem;
    --chat-sidebar: oklch(20.5% 0 0deg);
    --chat-sidebar-foreground: oklch(98.5% 0 0deg);
    --chat-sidebar-primary: oklch(48.8% 0.243 264.376deg);
    --chat-sidebar-primary-foreground: oklch(98.5% 0 0deg);
    --chat-sidebar-accent: oklch(26.9% 0 0deg);
    --chat-sidebar-accent-foreground: oklch(98.5% 0 0deg);
    --chat-sidebar-border: oklch(100% 0 0deg / 10%);
    --chat-sidebar-ring: oklch(43.9% 0 0deg);
    --chat-message-mine: var(--chat-accent);
    --chat-message-mine-foreground: var(--chat-accent-foreground);
    --chat-success: oklch(72.3% 0.219 142.136deg);
    --chat-success-foreground: oklch(14.5% 0 0deg);
    --chat-danger: var(--chat-destructive);
    --chat-danger-foreground: oklch(14.5% 0 0deg);
    --chat-warning: oklch(82.1% 0.167 75.367deg);
    --chat-warning-foreground: oklch(14.5% 0 0deg);
    --chat-info: oklch(70.7% 0.165 254.624deg);
    --chat-info-foreground: oklch(14.5% 0 0deg);
  }
`;
