import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatMessageReplyTo } from "../../../src/components/chat-message-reply-to";
import { ChatMessageReply } from "../../../src/types";

class MockChatAvatar extends HTMLElement {}
class MockChatDeletedMessage extends HTMLElement {}

customElements.define("chat-message-reply-to", ChatMessageReplyTo);
customElements.define("chat-avatar", MockChatAvatar);
customElements.define("chat-deleted-message", MockChatDeletedMessage);

describe("chat-message-reply-to", () => {
  let el: ChatMessageReplyTo;

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

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with props", async () => {
    el = await fixture(
      html`<chat-message-reply-to .replyTo=${replyTo}></chat-message-reply-to>`,
    );

    const avatar = el.shadowRoot?.querySelector("chat-avatar");
    const texts = el.shadowRoot?.querySelectorAll("span");
    const name = texts?.[0];
    const content = texts?.[1];
    expect(avatar).toBeFalsy();
    expect(name?.textContent?.trim()).toBe("User One");
    expect(name?.classList.contains("chat-message-reply-to__text--mine")).toBe(false);
    expect(content?.textContent?.trim()).toBe("This is a reply");
    expect(content?.classList.contains("chat-message-reply-to__text--mine")).toBe(false);
  });

  it("renders with avatar", async () => {
    const customReplyTo: ChatMessageReply = {
      ...replyTo,
      senderAvatar: "avatar.png",
    };
    el = await fixture(
      html`<chat-message-reply-to
        .replyTo=${customReplyTo}
      ></chat-message-reply-to>`,
    );

    const avatar = el.shadowRoot?.querySelector("chat-avatar");
    expect(avatar).toBeTruthy();
  });

  it("renders on my message", async () => {
    el = await fixture(
      html`<chat-message-reply-to
        .replyTo=${replyTo}
        .mine=${true}
      ></chat-message-reply-to>`,
    );

    const texts = el.shadowRoot?.querySelectorAll("span");
    const name = texts?.[0];
    const content = texts?.[1];
    expect(name?.classList.contains("chat-message-reply-to__text--mine")).toBe(true);
    expect(content?.classList.contains("chat-message-reply-to__text--mine")).toBe(true);
  });

  it("renders deleted message", async () => {
    const deletedReplyTo: ChatMessageReply = {
      ...replyTo,
      isDeleted: true,
    };
    el = await fixture(
      html`<chat-message-reply-to
        .replyTo=${deletedReplyTo}
      ></chat-message-reply-to>`,
    );

    const deletedMessage = el.shadowRoot?.querySelector("chat-deleted-message");
    const texts = el.shadowRoot?.querySelectorAll("span");
    const name = texts?.[0];
    const content = texts?.[1];
    expect(name?.textContent?.trim()).toBe("User One");
    expect(content).toBeFalsy();
    expect(deletedMessage).toBeTruthy();
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-message-reply-to .replyTo=${replyTo}></chat-message-reply-to>`,
    );
    await a11y.isAccessible(el);
  });
});
