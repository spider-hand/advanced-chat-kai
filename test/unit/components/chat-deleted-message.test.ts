import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatDeletedMessage } from "../../../src/components/chat-deleted-message";
import { defaultI18n } from "../../../src/consts";

describe("chat-deleted-message", () => {
  let el: ChatDeletedMessage;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(
      html`<chat-deleted-message
        .i18nContext=${{ i18n: { ...defaultI18n } }}
      ></chat-deleted-message>`,
    );

    const message = el.shadowRoot?.querySelector(".chat-deleted-message");
    expect(message).toBeTruthy();
    expect(message?.textContent?.trim()).toBe(defaultI18n.deletedMessage);
    expect(message?.getAttribute("style")).toContain("font-size: 1em");
  });

  it("renders with custom font size", async () => {
    el = await fixture(html`
      <chat-deleted-message
        .i18nContext=${{ i18n: { ...defaultI18n } }}
        fontSize="2"
      ></chat-deleted-message>
    `);

    const message = el.shadowRoot?.querySelector(".chat-deleted-message");
    expect(message).toBeTruthy();
    expect(message?.getAttribute("style")).toContain("font-size: 2em");
  });

  it("renders with custom message", async () => {
    const customMessage = "custom deleted message";
    el = await fixture(html`
      <chat-deleted-message
        .i18nContext=${{
          i18n: { ...defaultI18n, deletedMessage: customMessage },
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
        .i18nContext=${{ i18n: { ...defaultI18n } }}
      ></chat-deleted-message>`,
    );
    await a11y.isAccessible(el);
  });
});
