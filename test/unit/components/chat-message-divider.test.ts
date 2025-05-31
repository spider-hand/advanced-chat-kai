import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatMessageDivider } from "../../../src/components/chat-message-divider";
import { ChatDivider } from "../../../src/types";

describe("chat-message-divider", () => {
  let el: ChatMessageDivider;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with props", async () => {
    const message: ChatDivider = {
      id: "1",
      roomId: "room1",
      type: "divider",
      content: "May 1",
    };
    el = await fixture(
      html`<chat-message-divider .message=${message}></chat-message-divider>`,
    );

    const divider = el.shadowRoot?.querySelector(".chat-message-divider");
    expect(divider?.textContent?.trim()).toBe(message.content);
  });

  it("is accessible", async () => {
    const message: ChatDivider = {
      id: "1",
      roomId: "room1",
      type: "divider",
      content: "May 1",
    };
    el = await fixture(
      html`<chat-message-divider .message=${message}></chat-message-divider>`,
    );
    await a11y.isAccessible(el);
  });
});
