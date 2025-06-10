import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatMessageMenu } from "../../../src/components/chat-message-menu";
import { ChatMessage } from "../../../src/types";

describe("chat-message-menu", () => {
  let el: ChatMessageMenu;
  let elLocator: LocatorSelectors;

  const message: ChatMessage = {
    id: "1",
    type: "message",
    roomId: "room1",
    senderId: "user1",
    senderName: "User One",
    content: "Hello, world!",
    timestamp: "12:34 PM",
    reactions: new Map(),
    attachments: [],
    isDeleted: false,
    isSelected: false,
    replyTo: null,
  };

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with the default props", async () => {
    el = await fixture(
      html`<chat-message-menu .message=${message}></chat-message-menu>`,
    );

    const menu = el.shadowRoot?.querySelector(".chat-message-menu");
    expect(menu?.classList.contains("chat-message-menu--mine")).toBe(false);

    const reactionButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Add emoji reaction']",
    );
    expect(reactionButton).toBeFalsy();

    const replyButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Reply to message']",
    );
    expect(replyButton).toBeFalsy();

    const actionButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Message actions']",
    );
    expect(actionButton).toBeFalsy();
  });

  it("renders on my message", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .mine=${true}
      ></chat-message-menu>`,
    );

    const menu = el.shadowRoot?.querySelector(".chat-message-menu");
    expect(menu?.classList.contains("chat-message-menu--mine")).toBe(true);
  });

  it("renders with emoji reaction button", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isEmojiReactionAvailable=${true}
      ></chat-message-menu>`,
    );

    const reactionButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Add emoji reaction']",
    );
    expect(reactionButton).toBeTruthy();
    
    const icon = reactionButton?.querySelector("svg");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("fill")).toBe("var(--chat-surface-700)");
  });

  it("renders with emoji reaction button on my message", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isEmojiReactionAvailable=${true}
        .mine=${true}
      ></chat-message-menu>`,
    );

    const reactionButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Add emoji reaction']",
    );
    expect(reactionButton).toBeTruthy();
    
    const icon = reactionButton?.querySelector("svg");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("fill")).toBe("var(--chat-text-on-brand, var(--chat-surface-700))");
  })

  it("dispatches click-emoji-button event when clicking emoji button", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isEmojiReactionAvailable=${true}
      ></chat-message-menu>`,
    );

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    elLocator = getElementLocatorSelectors(el);
    const reactionButton = elLocator.getByLabelText("Add emoji reaction");
    await reactionButton.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("click-emoji-button");
  });

  it("renders with reply button", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isReplyAvailable=${true}
      ></chat-message-menu>`,
    );

    const replyButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Reply to message']",
    );
    expect(replyButton).toBeTruthy();

    const icon = replyButton?.querySelector("svg");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("fill")).toBe("var(--chat-surface-700)");
  });

  it("renders with reply button on my message", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isReplyAvailable=${true}
        .mine=${true}
      ></chat-message-menu>`,
    );

    const replyButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Reply to message']",
    );
    expect(replyButton).toBeTruthy();

    const icon = replyButton?.querySelector("svg");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("fill")).toBe("var(--chat-text-on-brand, var(--chat-surface-700))");
  })

  it("dispatches reply-to-message event when clicking reply button", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isReplyAvailable=${true}
      ></chat-message-menu>`,
    );

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    elLocator = getElementLocatorSelectors(el);
    const replyButton = elLocator.getByLabelText("Reply to message");
    await replyButton.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("reply-to-message");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      replyTo: { ...message, replyTo: undefined },
    });
  });

  it("renders with action button", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isMessageActionAvailable=${true}
      ></chat-message-menu>`,
    );

    const actionButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Message actions']",
    );
    expect(actionButton).toBeTruthy();

    const icon = actionButton?.querySelector("svg");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("fill")).toBe("var(--chat-surface-700)");
  });

  it("renders with action button on my message", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isMessageActionAvailable=${true}
        .mine=${true}
      ></chat-message-menu>`,
    );

    const actionButton = el.shadowRoot?.querySelector(
      ".chat-message-menu__button[aria-label='Message actions']",
    );
    expect(actionButton).toBeTruthy();

    const icon = actionButton?.querySelector("svg");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("fill")).toBe("var(--chat-text-on-brand, var(--chat-surface-700))");
  });

  it("dispatches click-action-button event when clicking action button", async () => {
    el = await fixture(
      html`<chat-message-menu
        .message=${message}
        .isMessageActionAvailable=${true}
      ></chat-message-menu>`,
    );

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    elLocator = getElementLocatorSelectors(el);
    const actionButton = elLocator.getByLabelText("Message actions");
    await actionButton.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("click-action-button");
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-message-menu .message=${message}></chat-message-menu>`,
    );
    await a11y.isAccessible(el);
  });
});
