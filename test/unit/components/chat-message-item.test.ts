import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatMessageItem } from "../../../src/components/chat-message-item";
import { ChatMessage } from "../../../src/types";

vi.mock("lit/directives/unsafe-html.js", () => ({
  unsafeHTML: vi.fn(() => `Mocked markdown content`),
}));

class MockChatAvatar extends HTMLElement {}
class MockChatActionList extends HTMLElement {}
class MockChatEmojiPicker extends HTMLElement {}
class MockChatMessageMenu extends HTMLElement {}
class MockChatMessageReactionList extends HTMLElement {}
class MockChatMessageAttachmentList extends HTMLElement {}
class MockChatMessageReplyTo extends HTMLElement {}
class MockChatMessageDeletedMessage extends HTMLElement {}

customElements.define("chat-message-item", ChatMessageItem);
customElements.define("chat-avatar", MockChatAvatar);
customElements.define("chat-action-list", MockChatActionList);
customElements.define("chat-emoji-picker", MockChatEmojiPicker);
customElements.define("chat-message-menu", MockChatMessageMenu);
customElements.define(
  "chat-message-reaction-list",
  MockChatMessageReactionList,
);
customElements.define(
  "chat-message-attachment-list",
  MockChatMessageAttachmentList,
);
customElements.define("chat-message-reply-to", MockChatMessageReplyTo);
customElements.define(
  "chat-message-deleted-message",
  MockChatMessageDeletedMessage,
);

describe("chat-message-item", () => {
  let el: ChatMessageItem;

  const currentUserId = null;
  const message: ChatMessage = {
    id: "1",
    type: "message",
    roomId: "room1",
    senderId: "user1",
    senderName: "User One",
    content: "",
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

  it("renders with default props", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${message}
        .currentUserId=${currentUserId}
      ></chat-message-item>`,
    );

    const item = el.shadowRoot?.querySelector(".chat-message-item");
    expect(item?.classList.contains("chat-message-item--mine")).toBe(false);
    expect(item?.classList.contains("chat-message-item--last")).toBe(false);
    expect(item?.classList.contains("chat-message-item--selected")).toBe(false);

    const avatar = el.shadowRoot?.querySelector("chat-avatar");
    expect(avatar).toBeFalsy();

    const meta = el.shadowRoot?.querySelector(".chat-message-item__meta");
    expect(meta).toBeTruthy();

    const sender = meta?.querySelector(".chat-message-item__name");
    expect(sender?.textContent).toContain("User One");

    const date = el.shadowRoot?.querySelector(".chat-message-item__date");
    expect(date?.textContent).toContain("12:34 PM");

    const body = el.shadowRoot?.querySelector(".chat-message-item__body");
    expect(body?.classList.contains("chat-message-item__body--mine")).toBe(
      false,
    );
    expect(body?.classList.contains("chat-message-item__body--deleted")).toBe(
      false,
    );

    const replyTo = el.shadowRoot?.querySelector("chat-message-reply-to");
    expect(replyTo).toBeFalsy();

    const deletedMessage = el.shadowRoot?.querySelector(
      "chat-message-deleted-message",
    );
    expect(deletedMessage).toBeFalsy();

    const span = body?.querySelector("span");
    expect(span).toBeFalsy();

    const attachmentList = el.shadowRoot?.querySelector(
      "chat-message-attachment-list",
    );
    expect(attachmentList).toBeFalsy();

    const chatMessageMenu = el.shadowRoot?.querySelector("chat-message-menu");
    expect(chatMessageMenu).toBeFalsy();

    const actionList = el.shadowRoot?.querySelector("chat-action-list");
    expect(actionList).toBeFalsy();

    const emojiPicker = el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPicker).toBeFalsy();

    const reactionList = el.shadowRoot?.querySelector(
      "chat-message-reaction-list",
    );
    expect(reactionList).toBeFalsy();
  });

  it("renders my message", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, senderId: "test-user-id" }}
        .currentUserId=${"test-user-id"}
      ></chat-message-item>`,
    );

    const item = el.shadowRoot?.querySelector(".chat-message-item");
    expect(item?.classList.contains("chat-message-item--mine")).toBe(true);

    const avatar = el.shadowRoot?.querySelector("chat-avatar");
    expect(avatar).toBeFalsy();

    const meta = el.shadowRoot?.querySelector(".chat-message-item__meta");
    expect(meta?.classList.contains("chat-message-item__meta--mine")).toBe(true);

    const sender = meta?.querySelector(".chat-message-item__name");
    expect(sender).toBeFalsy();

    const date = el.shadowRoot?.querySelector(".chat-message-item__date");
    expect(date?.textContent).toContain("12:34 PM");

    const body = el.shadowRoot?.querySelector(".chat-message-item__body");
    expect(body?.classList.contains("chat-message-item__body--mine")).toBe(
      true,
    );
  });

  it("renders last message", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${message}
        .currentUserId=${currentUserId}
        .last=${true}
      ></chat-message-item>`,
    );

    const item = el.shadowRoot?.querySelector(".chat-message-item");
    expect(item?.classList.contains("chat-message-item--last")).toBe(true);
  });

  it("renders selected message", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, isSelected: true }}
        .currentUserId=${currentUserId}
      ></chat-message-item>`,
    );

    const item = el.shadowRoot?.querySelector(".chat-message-item");
    expect(item?.classList.contains("chat-message-item--selected")).toBe(true);
  });

  it("renders selected message while replying to the message", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message }}
        .currentUserId=${currentUserId}
        .isReplying=${true}
      ></chat-message-item>`,
    );

    const item = el.shadowRoot?.querySelector(".chat-message-item");
    expect(item?.classList.contains("chat-message-item--selected")).toBe(true);
  });

  it("renders avatar for other users", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, senderId: "other-user-id" }}
        .currentUserId=${currentUserId}
        .showTheirAvatar=${true}
      ></chat-message-item>`,
    );

    const avatar = el.shadowRoot?.querySelector("chat-avatar");
    expect(avatar).toBeTruthy();
  });

  it("renders reply to message", async () => {
    const replyToMessage: ChatMessage = {
      id: "2",
      type: "message",
      roomId: "room1",
      senderId: "user2",
      senderName: "User Two",
      content: "This is a reply",
      timestamp: "12:35 PM",
      reactions: new Map(),
      attachments: [],
      isDeleted: false,
      isSelected: false,
      replyTo: null,
    };

    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, replyTo: replyToMessage }}
        .currentUserId=${currentUserId}
      ></chat-message-item>`,
    );

    const replyTo = el.shadowRoot?.querySelector("chat-message-reply-to");
    expect(replyTo).toBeTruthy();
  });

  it("renders deleted message", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, isDeleted: true }}
        .currentUserId=${currentUserId}
      ></chat-message-item>`,
    );

    const deletedMessage = el.shadowRoot?.querySelector("chat-deleted-message");
    expect(deletedMessage).toBeTruthy();

    const body = el.shadowRoot?.querySelector(".chat-message-item__body");
    expect(body?.classList.contains("chat-message-item__body--deleted")).toBe(
      true,
    );
  });

  it("renders content of the message", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, content: "Hello, World!" }}
        .currentUserId=${currentUserId}
      ></chat-message-item>`,
    );

    const body = el.shadowRoot?.querySelector(".chat-message-item__body");
    const span = body?.querySelector("span");
    expect(span?.textContent).toBe("Hello, World!");
  });

  it("renders markdown content", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, content: "**Bold Text**" }}
        .currentUserId=${currentUserId}
        .isMarkdownAvailable=${true}
      ></chat-message-item>`,
    );

    const body = el.shadowRoot?.querySelector(".chat-message-item__body");
    const span = body?.querySelector("span");
    expect(span?.textContent).toBe("Mocked markdown content");
  });

  it("renders attachments", async () => {
    const attachment = {
      id: "attachment1",
      name: "image.png",
      meta: "2 MB",
    };

    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, attachments: [attachment] }}
        .currentUserId=${currentUserId}
      ></chat-message-item>`,
    );

    const attachmentList = el.shadowRoot?.querySelector(
      "chat-message-attachment-list",
    );
    expect(attachmentList).toBeTruthy();
  });

  it.each([
    {
      isEmojiReactionAvailable: true,
      isReplyAvailable: false,
      myMessageActions: [],
      theirMessageActions: [],
      senderId: "my-user-id",
      currentUserId: null,
    },
    {
      isEmojiReactionAvailable: false,
      isReplyAvailable: true,
      myMessageActions: [],
      theirMessageActions: [],
      senderId: "my-user-id",
      currentUserId: null,
    },
    {
      isEmojiReactionAvailable: false,
      isReplyAvailable: false,
      myMessageActions: [
        {
          label: "Action 1",
          value: "action1",
        },
      ],
      theirMessageActions: [],
      senderId: "my-user-id",
      currentUserId: "my-user-id",
    },
    {
      isEmojiReactionAvailable: false,
      isReplyAvailable: false,
      myMessageActions: [],
      theirMessageActions: [
        {
          label: "Action 1",
          value: "action1",
        },
      ],
      senderId: "their-user-id",
      currentUserId: "my-user-id",
    },
  ])(
    "renders menu on hover and one of the action is available",
    async ({
      isEmojiReactionAvailable,
      isReplyAvailable,
      myMessageActions,
      theirMessageActions,
      senderId,
      currentUserId,
    }) => {
      el = await fixture(
        html`<chat-message-item
          .message=${{ ...message, senderId: senderId }}
          .currentUserId=${currentUserId}
          .isEmojiReactionAvailable=${isEmojiReactionAvailable}
          .isReplyAvailable=${isReplyAvailable}
          .myMessageActions=${myMessageActions}
          .theirMessageActions=${theirMessageActions}
        ></chat-message-item>`,
      );

      vi.useFakeTimers();

      const chatMessageMenu = el.shadowRoot?.querySelector("chat-message-menu");
      expect(chatMessageMenu).toBeFalsy();

      const body = el.shadowRoot?.querySelector(".chat-message-item__body");
      body?.dispatchEvent(new MouseEvent("mouseenter"));

      await el.updateComplete;

      const chatMessageMenuAfterHover =
        el.shadowRoot?.querySelector("chat-message-menu");
      expect(chatMessageMenuAfterHover).toBeTruthy();

      // Toggle emoji picker
      if (isEmojiReactionAvailable) {
        const emojiPicker = el.shadowRoot?.querySelector("chat-emoji-picker");
        expect(emojiPicker).toBeFalsy();

        chatMessageMenuAfterHover?.dispatchEvent(
          new CustomEvent("click-emoji-button"),
        );

        await el.updateComplete;

        const emojiPickerAfterToggle =
          el.shadowRoot?.querySelector("chat-emoji-picker");
        expect(emojiPickerAfterToggle).toBeTruthy();

        emojiPickerAfterToggle?.dispatchEvent(new CustomEvent("select-emoji"));

        await el.updateComplete;

        const emojiPickerAfterSelect =
          el.shadowRoot?.querySelector("chat-emoji-picker");
        expect(emojiPickerAfterSelect).toBeFalsy();

        chatMessageMenuAfterHover?.dispatchEvent(
          new CustomEvent("click-emoji-button"),
        );

        await el.updateComplete;

        const emojiPickerAfterReToggle =
          el.shadowRoot?.querySelector("chat-emoji-picker");
        expect(emojiPickerAfterReToggle).toBeTruthy();

        emojiPickerAfterReToggle?.dispatchEvent(new CustomEvent("close"));

        await el.updateComplete;

        const emojiPickerAfterClose =
          el.shadowRoot?.querySelector("chat-emoji-picker");
        expect(emojiPickerAfterClose).toBeFalsy();
      }

      // Toggle action list
      const actionList = el.shadowRoot?.querySelector("chat-action-list");
      expect(actionList).toBeFalsy();

      chatMessageMenuAfterHover?.dispatchEvent(
        new CustomEvent("click-action-button"),
      );

      await el.updateComplete;

      const actionListAfterToggle =
        el.shadowRoot?.querySelector("chat-action-list");
      expect(actionListAfterToggle).toBeTruthy();

      actionListAfterToggle?.dispatchEvent(new CustomEvent("select-action"));

      await el.updateComplete;

      const actionListAfterSelect =
        el.shadowRoot?.querySelector("chat-action-list");
      expect(actionListAfterSelect).toBeFalsy();

      chatMessageMenuAfterHover?.dispatchEvent(
        new CustomEvent("click-action-button"),
      );

      await el.updateComplete;

      const actionListAfterReToggle =
        el.shadowRoot?.querySelector("chat-action-list");
      expect(actionListAfterReToggle).toBeTruthy();

      actionListAfterReToggle?.dispatchEvent(new CustomEvent("close"));

      await el.updateComplete;

      const actionListAfterClose =
        el.shadowRoot?.querySelector("chat-action-list");
      expect(actionListAfterClose).toBeFalsy();

      body?.dispatchEvent(new MouseEvent("mouseleave"));

      vi.advanceTimersByTime(200);

      await el.updateComplete;

      const chatMessageMenuAfterLeave =
        el.shadowRoot?.querySelector("chat-message-menu");

      expect(chatMessageMenuAfterLeave).toBeFalsy();

      vi.useRealTimers();
    },
  );

  it("renders reactions", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${{ ...message, reactions: new Map([["👍", new Set(["2"])]]) }}
        .currentUserId=${currentUserId}
      ></chat-message-item>`,
    );

    const reactionList = el.shadowRoot?.querySelector(
      "chat-message-reaction-list",
    );
    expect(reactionList).toBeTruthy();
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-message-item
        .message=${message}
        .currentUserId=${currentUserId}
      ></chat-message-item>`,
    );
    await a11y.isAccessible(el);
  });
});
