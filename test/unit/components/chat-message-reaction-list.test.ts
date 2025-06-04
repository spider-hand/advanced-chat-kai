import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatMessageReactionList } from "../../../src/components/chat-message-reaction-list";

describe("chat-message-reaction-list", () => {
  let el: ChatMessageReactionList;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    const messageId = "test-message-id";
    const reactions = new Map<string, Set<string>>();
    el = await fixture(
      html`<chat-message-reaction-list
        .messageId=${messageId}
        .reactions=${reactions}
      ></chat-message-reaction-list>`,
    );

    const reactionList = el.shadowRoot?.querySelector(
      ".chat-message-reaction-list",
    );

    expect(
      reactionList?.classList.contains("chat-message-reaction-list--mine"),
    ).toBe(false);
    expect(
      reactionList?.classList.contains(
        "chat-message-reaction-list--right-aligned",
      ),
    ).toBe(false);

    const buttons = el.shadowRoot?.querySelectorAll("button");
    expect(buttons).toHaveLength(0);
  });

  it("renders reaction list on my message", async () => {
    const messageId = "test-message-id";
    const reactions = new Map<string, Set<string>>();
    el = await fixture(
      html`<chat-message-reaction-list
        .messageId=${messageId}
        .reactions=${reactions}
        .alignMyMessagesLeft=${false}
        mine
      ></chat-message-reaction-list>`,
    );

    const reactionList = el.shadowRoot?.querySelector(
      ".chat-message-reaction-list",
    );

    expect(
      reactionList?.classList.contains("chat-message-reaction-list--mine"),
    ).toBe(true);
    expect(
      reactionList?.classList.contains(
        "chat-message-reaction-list--right-aligned",
      ),
    ).toBe(true);
  });

  it("alignes reaction list left on my message", async () => {
    const messageId = "test-message-id";
    const reactions = new Map<string, Set<string>>();
    el = await fixture(
      html`<chat-message-reaction-list
        .messageId=${messageId}
        .reactions=${reactions}
        .alignMyMessagesLeft=${true}
        mine
      ></chat-message-reaction-list>`,
    );

    const reactionList = el.shadowRoot?.querySelector(
      ".chat-message-reaction-list",
    );

    expect(
      reactionList?.classList.contains("chat-message-reaction-list--mine"),
    ).toBe(true);
    expect(
      reactionList?.classList.contains(
        "chat-message-reaction-list--right-aligned",
      ),
    ).toBe(false);
  });

  it("renders reactions", async () => {
    const messageId = "test-message-id";
    const reactions = new Map<string, Set<string>>([
      ["👍", new Set(["user1", "user2"])],
      ["❤️", new Set(["user3"])],
    ]);
    el = await fixture(
      html`<chat-message-reaction-list
        .messageId=${messageId}
        .reactions=${reactions}
      ></chat-message-reaction-list>`,
    );

    const buttons = el.shadowRoot?.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
    const button1 = buttons?.[0];
    const emoji1 = button1?.querySelectorAll("span")[0];
    const size1 = button1?.querySelectorAll("span")[1];
    expect(emoji1?.textContent?.trim()).toBe("👍");
    expect(size1?.textContent?.trim()).toBe("2");

    const button2 = buttons?.[1];
    const emoji2 = button2?.querySelectorAll("span")[0];
    const size2 = button2?.querySelectorAll("span")[1];
    expect(emoji2?.textContent?.trim()).toBe("❤️");
    expect(size2?.textContent?.trim()).toBe("1");
  });

  it("renders reactions as the one already reacted", async () => {
    const currentUserId = "user1";
    const messageId = "test-message-id";
    const reactions = new Map<string, Set<string>>([
      ["👍", new Set(["user1"])],
      ["❤️", new Set(["user2"])],
    ]);
    el = await fixture(
      html`<chat-message-reaction-list
        .currentUserId=${currentUserId}
        .messageId=${messageId}
        .reactions=${reactions}
        mine
      ></chat-message-reaction-list>`,
    );

    const buttons = el.shadowRoot?.querySelectorAll("button");
    const button1 = buttons?.[0];
    const button2 = buttons?.[1];
    expect(
      button1?.classList.contains(
        "chat-message-reaction-list__button--reacted",
      ),
    ).toBe(true);
    expect(
      button2?.classList.contains(
        "chat-message-reaction-list__button--reacted",
      ),
    ).toBe(false);
  });

  it("dispatches click-reaction event", async () => {
    const messageId = "test-message-id";
    const reactions = new Map<string, Set<string>>([
      ["👍", new Set(["user1"])],
    ]);
    el = await fixture(
      html`<chat-message-reaction-list
        .messageId=${messageId}
        .reactions=${reactions}
      ></chat-message-reaction-list>`,
    );
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const button = elLocator.getByText("👍");
    await button.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("click-reaction");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      messageId: messageId,
      reaction: {
        emoji: "👍",
        users: new Set(["user1"]),
      },
    });
  });

  it("is accessible", async () => {
    const messageId = "test-message-id";
    const reactions = new Map<string, Set<string>>();
    el = await fixture(
      html`<chat-message-reaction-list
        .messageId=${messageId}
        .reactions=${reactions}
      ></chat-message-reaction-list>`,
    );
    await a11y.isAccessible(el);
  });
});
