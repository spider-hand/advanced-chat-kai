import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatMessageTyping } from "../../../src/components/chat-message-typing";

describe("chat-message-typing", () => {
  let el: ChatMessageTyping;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(html`<chat-message-typing></chat-message-typing>`);

    expect(el.shadowRoot?.querySelector(".chat-message-typing")).toBeTruthy();
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-message-typing></chat-message-typing>`);
    await a11y.isAccessible(el);
  });
});
