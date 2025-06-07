import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatDeletedMessage } from "../../../src/components/chat-deleted-message";
import { DEFAULT_I18N } from "../../../src/consts";

describe("chat-deleted-message", () => {
  let el: ChatDeletedMessage;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(
      html`<chat-deleted-message
        .i18nContext=${{ i18n: { ...DEFAULT_I18N } }}
      ></chat-deleted-message>`,
    );

    const message = el.shadowRoot?.querySelector(".chat-deleted-message");
    expect(message).toBeTruthy();
    expect(message?.textContent?.trim()).toBe(DEFAULT_I18N.DELETED_MESSAGE);
    expect(message?.getAttribute("style")).toContain("font-size:1em");
    expect(message?.getAttribute("style")).toContain(
      "color:var(--surface-700)",
    );
  });

  it("renders with custom font size", async () => {
    el = await fixture(html`
      <chat-deleted-message
        .i18nContext=${{ i18n: { ...DEFAULT_I18N } }}
        fontSize="2"
      ></chat-deleted-message>
    `);

    const message = el.shadowRoot?.querySelector(".chat-deleted-message");
    expect(message).toBeTruthy();
    expect(message?.getAttribute("style")).toContain("font-size:2em");
  });

  it("renders with reply on my message style", async () => {
    el = await fixture(html`
      <chat-deleted-message
        .i18nContext=${{ i18n: { ...DEFAULT_I18N } }}
        isReplyOnMyMessage
      ></chat-deleted-message>
    `);

    const message = el.shadowRoot?.querySelector(".chat-deleted-message");
    expect(message).toBeTruthy();
    expect(message?.getAttribute("style")).toContain(
      "color:var(--text-on-brand, var(--surface-700))",
    );
  });

  it("renders with custom message", async () => {
    const customMessage = "custom deleted message";
    el = await fixture(html`
      <chat-deleted-message
        .i18nContext=${{
          i18n: { ...DEFAULT_I18N, DELETED_MESSAGE: customMessage },
        }}
      ></chat-deleted-message>
    `);

    const message = el.shadowRoot?.querySelector(".chat-deleted-message");
    expect(message).toBeTruthy();
    expect(message?.textContent?.trim()).toBe(customMessage);
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-deleted-message
        .i18nContext=${{ i18n: { ...DEFAULT_I18N } }}
      ></chat-deleted-message>`,
    );
    await a11y.isAccessible(el);
  });
});
