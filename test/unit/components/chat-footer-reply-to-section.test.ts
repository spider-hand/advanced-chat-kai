import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatFooterReplyToSection } from "../../../src/components/chat-footer-reply-to-section";
import { ChatMessageReply } from "../../../src/types";

describe("chat-footer-reply-to-section", () => {
  let el: ChatFooterReplyToSection;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with props", async () => {
    const replyTo: ChatMessageReply = {
      id: "123",
      type: "message",
      roomId: "room1",
      senderId: "user1",
      senderName: "User One",
      content: "This is a reply",
      timestamp: "12:34 PM",
      attachments: [],
      reactions: new Map(),
      isDeleted: false,
      isSelected: false,
    };

    el = await fixture(
      html`<chat-footer-reply-to-section
        .replyTo="${replyTo}"
      ></chat-footer-reply-to-section>`,
    );

    const section = el.shadowRoot?.querySelector(
      ".chat-footer-reply-to-section",
    );
    const name = el.shadowRoot?.querySelector(
      ".chat-footer-reply-to-section__name",
    );
    expect(section?.textContent?.trim()).toContain("Reply to");
    expect(name?.textContent?.trim()).toBe("User One");
  });

  it("dispatches cancel-reply event", async () => {
    const replyTo: ChatMessageReply = {
      id: "123",
      type: "message",
      roomId: "room1",
      senderId: "user1",
      senderName: "User One",
      content: "This is a reply",
      timestamp: "12:34 PM",
      attachments: [],
      reactions: new Map(),
      isDeleted: false,
      isSelected: false,
    };

    el = await fixture(
      html`<chat-footer-reply-to-section
        .replyTo="${replyTo}"
      ></chat-footer-reply-to-section>`,
    );
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const button = elLocator.getByRole("button");
    await button.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("cancel-reply");
  });

  it("is accessible", async () => {
    const replyTo: ChatMessageReply = {
      id: "123",
      type: "message",
      roomId: "room1",
      senderId: "user1",
      senderName: "User One",
      content: "This is a reply",
      timestamp: "12:34 PM",
      attachments: [],
      reactions: new Map(),
      isDeleted: false,
      isSelected: false,
    };
    el = await fixture(
      html`<chat-footer-reply-to-section
        .replyTo="${replyTo}"
      ></chat-footer-reply-to-section>`,
    );
    await a11y.isAccessible(el);
  });
});
