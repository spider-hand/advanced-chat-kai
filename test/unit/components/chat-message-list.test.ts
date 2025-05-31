import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatMessageList } from "../../../src/components/chat-message-list";
import { ChatItemType } from "../../../src/types";

class MockChatMessageItem extends HTMLElement {}
class MockChatLoader extends HTMLElement {}
class MockChatSuggestionList extends HTMLElement {}
class MockChatMessageTyping extends HTMLElement {}
class MockChatMessageDivider extends HTMLElement {}
class MockChatNotificationBadge extends HTMLElement {}

customElements.define("chat-message-list", ChatMessageList);
customElements.define("chat-message-item", MockChatMessageItem);
customElements.define("chat-loader", MockChatLoader);
customElements.define("chat-suggestion-list", MockChatSuggestionList);
customElements.define("chat-message-typing", MockChatMessageTyping);
customElements.define("chat-message-divider", MockChatMessageDivider);
customElements.define("chat-notification-badge", MockChatNotificationBadge);

const observerCallback = vi.fn();
const observeMock = vi.fn();
vi.stubGlobal(
  "IntersectionObserver",
  vi.fn((callback) => {
    observerCallback.mockImplementation(callback);
    return {
      observe: observeMock,
    };
  }),
);

describe("chat-message-list", () => {
  let el: ChatMessageList;

  const messageContext = {
    messages: [],
    suggestions: [],
    replyTo: null,
    isLoadingMessage: false,
    isLoadingMoreMessages: false,
    isMarkdownAvailable: false,
    myMessageActions: [],
    theirMessageActions: [],
    isEmojiReactionAvailable: false,
    isReplyAvailable: false,
    isTyping: false,
    showTheirAvatar: false,
  };

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with props", async () => {
    el = await fixture(
      html`<chat-message-list
        .messageContext=${messageContext}
      ></chat-message-list>`,
    );

    const chatLoader = el.shadowRoot?.querySelector("chat-loader");
    expect(chatLoader).toBeFalsy();

    const chatMessageItem = el.shadowRoot?.querySelector("chat-message-item");
    expect(chatMessageItem).toBeFalsy();

    const chatMessageDivider = el.shadowRoot?.querySelector(
      "chat-message-divider",
    );
    expect(chatMessageDivider).toBeFalsy();

    const chatMessageTyping = el.shadowRoot?.querySelector(
      "chat-message-typing",
    );
    expect(chatMessageTyping).toBeFalsy();

    const chatSuggestionList = el.shadowRoot?.querySelector(
      "chat-suggestion-list",
    );
    expect(chatSuggestionList).toBeFalsy();

    const flaotingButton = el.shadowRoot?.querySelector(
      ".chat-message-list__button",
    );
    expect(flaotingButton?.getAttribute("style")).toContain("display: none");

    const chatNotificationBadge = el.shadowRoot?.querySelector(
      "chat-notification-badge",
    );
    expect(chatNotificationBadge).toBeFalsy();
  });

  it("renders with loader when loading initial messages", async () => {
    el = await fixture(
      html`<chat-message-list
        .messageContext=${{
          ...messageContext,
          isLoadingMessage: true,
        }}
      ></chat-message-list>`,
    );

    const chatLoader = el.shadowRoot?.querySelector("chat-loader");
    expect(chatLoader).toBeTruthy();
  });

  it("renders with loader when loading more messages", async () => {
    el = await fixture(
      html`<chat-message-list
        .messageContext=${{
          ...messageContext,
          isLoadingMoreMessages: true,
        }}
      ></chat-message-list>`,
    );

    const chatLoader = el.shadowRoot?.querySelector("chat-loader");
    expect(chatLoader).toBeTruthy();
  });

  it("renders messages and divider", async () => {
    const messages: ChatItemType[] = [
      {
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
      },
      {
        id: "2",
        type: "message",
        roomId: "room1",
        senderId: "user2",
        senderName: "User Two",
        content: "Hi there!",
        timestamp: "12:35 PM",
        reactions: new Map(),
        attachments: [],
        isDeleted: false,
        isSelected: false,
        replyTo: null,
      },
      {
        id: "3",
        type: "divider",
        roomId: "room1",
        content: "Divider content",
      },
    ];

    el = await fixture(
      html`<chat-message-list
        .messageContext=${{
          ...messageContext,
          messages,
          isMarkdownAvailable: true,
          myMessageActions: [],
          theirMessageActions: [],
          isEmojiReactionAvailable: true,
          isReplyAvailable: true,
          showTheirAvatar: true,
        }}
      ></chat-message-list>`,
    );

    const chatMessageItems =
      el.shadowRoot?.querySelectorAll("chat-message-item");
    expect(chatMessageItems?.length).toBe(2);

    const chatMessageDividers = el.shadowRoot?.querySelectorAll(
      "chat-message-divider",
    );
    expect(chatMessageDividers?.length).toBe(1);
  });

  it("renders typing indicator", async () => {
    el = await fixture(
      html`<chat-message-list
        .messageContext=${{
          ...messageContext,
          isTyping: true,
        }}
      ></chat-message-list>`,
    );

    const chatMessageTyping = el.shadowRoot?.querySelector(
      "chat-message-typing",
    );
    expect(chatMessageTyping).toBeTruthy();
  });

  it("renders suggestions", async () => {
    const suggestions = [{ text: "Suggestion 1", value: "value1" }];

    el = await fixture(
      html`<chat-message-list
        .messageContext=${{
          ...messageContext,
          suggestions,
        }}
      ></chat-message-list>`,
    );

    const chatSuggestionList = el.shadowRoot?.querySelector(
      "chat-suggestion-list",
    );
    expect(chatSuggestionList).toBeTruthy();
  });

  it("toggles the floating button when scrolling around the bottom", async () => {
    el = await fixture<ChatMessageList>(
      html`<chat-message-list
        .messageContext=${messageContext}
      ></chat-message-list>`,
    );

    const flaotingButton = el.shadowRoot?.querySelector(
      ".chat-message-list__button",
    );
    expect(flaotingButton?.getAttribute("style")).toContain("display: none");

    // Scroll up
    const mockEntry1 = {
      target: {
        classList: {
          contains: (cls: string) => cls === "chat-message-list__bottom",
        },
      },
      isIntersecting: false,
    };
    observerCallback([{ ...mockEntry1 }]);

    expect(observeMock).toHaveBeenCalled();
    expect(observerCallback).toHaveBeenCalled();

    await el.updateComplete;

    const flaotingButtonAfter = el.shadowRoot?.querySelector(
      ".chat-message-list__button",
    );
    expect(flaotingButtonAfter?.getAttribute("style")).toContain(
      "display: flex",
    );

    // Scroll down to the bottom
    const mockEntry2 = {
      target: {
        classList: {
          contains: (cls: string) => cls === "chat-message-list__bottom",
        },
      },
      isIntersecting: true,
    };
    observerCallback([{ ...mockEntry2 }]);

    expect(observeMock).toHaveBeenCalled();
    expect(observerCallback).toHaveBeenCalled();

    await el.updateComplete;

    const flaotingButtonAfterScrollDown = el.shadowRoot?.querySelector(
      ".chat-message-list__button",
    );
    expect(flaotingButtonAfterScrollDown?.getAttribute("style")).toContain(
      "display: none",
    );
  });

  it("dispatches load-more-messages event when scrolling to the top", async () => {
    el = await fixture<ChatMessageList>(
      html`<chat-message-list
        .messageContext=${messageContext}
      ></chat-message-list>`,
    );

    const spyEvent = vi.spyOn(el, "dispatchEvent");

    const mockEntry = {
      target: {
        classList: {
          contains: (cls: string) => cls === "chat-message-list__top",
        },
      },
      isIntersecting: true,
    };
    observerCallback([{ ...mockEntry }]);

    expect(observeMock).toHaveBeenCalled();
    expect(observerCallback).toHaveBeenCalled();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("load-more-messages");
  });

  it("scrolls to the bottom when the selected room changes", async () => {
    vi.useFakeTimers();

    el = await fixture<ChatMessageList>(
      html`<chat-message-list
        .messageContext=${{
          ...messageContext,
          messages: [],
        }}
      ></chat-message-list>`,
    );

    const spyScrollToBottom = vi.spyOn(
      el as unknown as { _scrollToBottom: () => void },
      "_scrollToBottom",
    );

    el.messageContext = {
      ...messageContext,
      messages: [
        {
          id: "1",
          type: "message",
          roomId: "room2",
          senderId: "user1",
          senderName: "User One",
          content: "Hello, world!",
          timestamp: "12:34 PM",
          reactions: new Map(),
          attachments: [],
          isDeleted: false,
          isSelected: false,
          replyTo: null,
        },
      ],
    };

    await el.updateComplete;

    vi.runAllTimers();

    expect(spyScrollToBottom).toHaveBeenCalledWith(null, "instant");

    vi.useRealTimers();
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-message-list
        .messageContext=${messageContext}
      ></chat-message-list>`,
    );
    await a11y.isAccessible(el);
  });
});
