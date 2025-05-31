import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatFooter } from "../../../src/components/chat-footer";
import { ChatRoom } from "../../../src/types";
import { defaultI18n } from "../../../src/consts";

class MockChatFooterAttachmentSection extends HTMLElement {}
class MockChatFooterReplyToSection extends HTMLElement {}
class MockChatEmojiPicker extends HTMLElement {}

customElements.define("chat-footer", ChatFooter);
customElements.define(
  "chat-footer-attachment-section",
  MockChatFooterAttachmentSection,
);
customElements.define(
  "chat-footer-reply-to-section",
  MockChatFooterReplyToSection,
);
customElements.define("chat-emoji-picker", MockChatEmojiPicker);

describe("chat-footer", () => {
  let el: ChatFooter;
  let elLocator: LocatorSelectors;

  const currentUserId = null;

  const roomContext = {
    rooms: [] as ChatRoom[],
    selectedRoomId: null,
    isLoadingRoom: false,
    isLoadingMoreRooms: false,
    showRoomAvatar: false,
    actions: [],
  };

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

  const footerContext = {
    isEmojiPickerAvailable: false,
    isMessageAttachmentAvailable: false,
    inputMessage: "",
    attachments: [],
  };

  const i18nContext = { ...defaultI18n };

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with props", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${footerContext}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const closedRoomMessage = el.shadowRoot?.querySelector(
      "chat-footer__message",
    );
    expect(closedRoomMessage).toBeFalsy();

    const attachmentSection = el.shadowRoot?.querySelector(
      "chat-footer-attachment-section",
    );
    expect(attachmentSection).toBeFalsy();

    const replyToSection = el.shadowRoot?.querySelector(
      "chat-footer-reply-to-section",
    );
    expect(replyToSection).toBeFalsy();

    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea).toBeTruthy();
    expect(textarea?.getAttribute("placeholder")).toBe(
      i18nContext.chatFooterTextareaPlaceholder,
    );
    expect(textarea?.value).toBe("");

    const selectFileButton = el.shadowRoot?.querySelector(
      ".chat-footer__button[aria-label='Select file']",
    );
    expect(selectFileButton).toBeFalsy();

    const fileInput = el.shadowRoot?.querySelector("input[type='file']");
    expect(fileInput).toBeFalsy();

    const toggleEmojiPickerButton = el.shadowRoot?.querySelector(
      ".chat-footer__button[aria-label='Toggle emoji picker']",
    );
    expect(toggleEmojiPickerButton).toBeFalsy();

    const sendButton = el.shadowRoot?.querySelector(
      ".chat-footer__button[aria-label='Send message']",
    );
    expect(sendButton).toBeTruthy();
    expect(sendButton?.getAttribute("disabled")).toBeDefined();
    expect(
      sendButton?.classList.contains("chat-footer__button--disabled"),
    ).toBeTruthy();

    const emojiPicker = el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPicker).toBeFalsy();
  });

  it("renders with closed room message if the selected room has been ended", async () => {
    const closedRoom: ChatRoom = {
      id: "room1",
      headerTitle: "Room 1",
      headerSubtitle: "This is Room 1",
      sidebarTitle: "Room 1",
      sidebarSubtitle: "This is Room 1",
      meta: "",
      hasEnded: true,
    };
    el = await fixture(
      html`<chat-footer
        .roomContext="${{
          ...roomContext,
          selectedRoomId: closedRoom.id,
          rooms: [closedRoom],
        }}"
        .messageContext="${messageContext}"
        .footerContext="${footerContext}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const closedRoomMessage = el.shadowRoot?.querySelector(
      ".chat-footer__message",
    );
    expect(closedRoomMessage).toBeTruthy();
    expect(closedRoomMessage?.textContent?.trim()).toBe(
      i18nContext.closedRoomMessage,
    );
  });

  it("renders with custom closed room message", async () => {
    const customClosedRoomMessage = "custom message";
    const closedRoom: ChatRoom = {
      id: "room1",
      headerTitle: "Room 1",
      headerSubtitle: "This is Room 1",
      sidebarTitle: "Room 1",
      sidebarSubtitle: "This is Room 1",
      meta: "",
      hasEnded: true,
    };
    el = await fixture(
      html`<chat-footer
        .roomContext="${{
          ...roomContext,
          selectedRoomId: closedRoom.id,
          rooms: [closedRoom],
        }}"
        .messageContext="${messageContext}"
        .footerContext="${footerContext}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{
          i18n: { ...i18nContext, closedRoomMessage: customClosedRoomMessage },
        }}"
      ></chat-footer>`,
    );

    const closedRoomMessage = el.shadowRoot?.querySelector(
      ".chat-footer__message",
    );
    expect(closedRoomMessage).toBeTruthy();
    expect(closedRoomMessage?.textContent?.trim()).toBe(
      customClosedRoomMessage,
    );
  });

  it("renders with attachment section", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          attachments: [
            {
              id: "1",
              name: "Document",
              meta: "456 KB",
            },
          ],
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const attachmentSection = el.shadowRoot?.querySelector(
      "chat-footer-attachment-section",
    );
    expect(attachmentSection).toBeTruthy();
  });

  it("renders with reply to section", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${{
          ...messageContext,
          replyTo: {
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
          },
        }}"
        .footerContext="${footerContext}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const replyToSection = el.shadowRoot?.querySelector(
      "chat-footer-reply-to-section",
    );
    expect(replyToSection).toBeTruthy();
  });

  it("renders with custom placeholder", async () => {
    const customPlaceholder = "custom placeholder";
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${footerContext}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{
          i18n: {
            ...i18nContext,
            chatFooterTextareaPlaceholder: customPlaceholder,
          },
        }}"
      ></chat-footer>`,
    );

    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea?.getAttribute("placeholder")).toBe(customPlaceholder);
  });

  it("updates the textarea value when inputMessage changes", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          inputMessage: "Initial message",
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    elLocator = getElementLocatorSelectors(el);
    const textarea = elLocator.getByText("Initial message");
    expect(textarea).toBeTruthy();

    el.footerContext = {
      ...footerContext,
      inputMessage: "Updated message",
    };
   
    await el.updateComplete;

    const updatedTextarea = elLocator.getByText("Updated message");
    expect(updatedTextarea).toBeTruthy();
  });

  it("updates the textarea value on input event", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${footerContext}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    elLocator = getElementLocatorSelectors(el);
    const textarea = elLocator.getByPlaceholder(
      i18nContext.chatFooterTextareaPlaceholder,
    );
    const textareaQuery = el.shadowRoot?.querySelector("textarea");
    expect(textareaQuery?.value).toBe("");

    await textarea.fill("Hello, world!");

    const textareaQueryAfterInput = el.shadowRoot?.querySelector("textarea");
    expect(textareaQueryAfterInput?.value).toBe("Hello, world!");
  });

  it("renders with file input", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          isMessageAttachmentAvailable: true,
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const selectFileButton = el.shadowRoot?.querySelector(
      ".chat-footer__button[aria-label='Select file']",
    );
    expect(selectFileButton).toBeTruthy();

    const fileInput = el.shadowRoot?.querySelector("input[type='file']");
    expect(fileInput).toBeTruthy();
  });

  it("triggers file input click on select file button click", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          isMessageAttachmentAvailable: true,
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    elLocator = getElementLocatorSelectors(el);
    const selectFileButton = elLocator.getByLabelText("Select file");

    const fileInput = el.shadowRoot?.querySelector("input[type='file']");
    const spyClick = vi.spyOn(fileInput as HTMLInputElement, "click");

    await selectFileButton.click();

    expect(spyClick).toHaveBeenCalled();
  });

  it("dispatches select-file event on file input change", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          isMessageAttachmentAvailable: true,
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const fileInput = el.shadowRoot?.querySelector("input[type='file']");
    const spyEvent = vi.spyOn(el, "dispatchEvent");

    const mockFile = new File([], "test.txt", { type: "text/plain" });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(mockFile);
    (fileInput as HTMLInputElement)!.files = dataTransfer.files;

    fileInput?.dispatchEvent(new Event("change"));

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("select-file");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      file: mockFile,
    });
  });

  it("renders with emoji picker", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          isEmojiPickerAvailable: true,
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const toggleEmojiPickerButton = el.shadowRoot?.querySelector(
      ".chat-footer__button[aria-label='Toggle emoji picker']",
    );
    expect(toggleEmojiPickerButton).toBeTruthy();

    const emojiPicker = el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPicker).toBeTruthy();
  });

  it("toggles emoji picker visibility on button click", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          isEmojiPickerAvailable: true,
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    elLocator = getElementLocatorSelectors(el);
    const toggleEmojiPickerButton = elLocator.getByLabelText(
      "Toggle emoji picker",
    );
    const emojiPicker = el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPicker?.getAttribute("style")).toContain("display: none");

    await toggleEmojiPickerButton.click();

    const emojiPickerAfterClick =
      el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPickerAfterClick?.getAttribute("style")).toContain(
      "display: block",
    );
  });

  it("adds emoji to input message and closes emoji picker on emoji picker select", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          isEmojiPickerAvailable: true,
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    elLocator = getElementLocatorSelectors(el);

    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea?.value).toBe("");

    const toggleEmojiPickerButton = elLocator.getByLabelText(
      "Toggle emoji picker",
    );
    await toggleEmojiPickerButton.click();

    const emojiPicker = el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPicker?.getAttribute("style")).toContain("display: block");
    emojiPicker?.dispatchEvent(
      new CustomEvent("select-emoji", {
        detail: { emoji: "😀" },
      }),
    );

    await el.updateComplete;

    const textareaAfterEmojiClick = el.shadowRoot?.querySelector("textarea");
    expect(textareaAfterEmojiClick?.value).toBe("😀");

    const emojiPickerAfterEmojiClick =
      el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPickerAfterEmojiClick?.getAttribute("style")).toContain(
      "display: none",
    );
  });

  it("closes emoji picker when closing it", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          isEmojiPickerAvailable: true,
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    elLocator = getElementLocatorSelectors(el);
    const toggleEmojiPickerButton = elLocator.getByLabelText(
      "Toggle emoji picker",
    );
    await toggleEmojiPickerButton.click();

    const emojiPicker = el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPicker?.getAttribute("style")).toContain("display: block");

    emojiPicker?.dispatchEvent(new CustomEvent("close"));

    await el.updateComplete;

    const emojiPickerAfterClose =
      el.shadowRoot?.querySelector("chat-emoji-picker");
    expect(emojiPickerAfterClose?.getAttribute("style")).toContain(
      "display: none",
    );
  });

  it("enables send button when input message is not empty", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${footerContext}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const sendButton = el.shadowRoot?.querySelector(
      ".chat-footer__button[aria-label='Send message']",
    );
    expect(sendButton?.getAttribute("disabled")).toBeDefined();
    expect(
      sendButton?.classList.contains("chat-footer__button--disabled"),
    ).toBeTruthy();

    const elLocator = getElementLocatorSelectors(el);
    const textarea = elLocator.getByPlaceholder(
      i18nContext.chatFooterTextareaPlaceholder,
    );
    await textarea.fill("Hello, world!");

    expect(sendButton?.getAttribute("disabled")).toBeNull();
    expect(
      sendButton?.classList.contains("chat-footer__button--disabled"),
    ).toBeFalsy();
  });

  it("enables send button when there is an attachment", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${{
          ...footerContext,
          attachments: [
            {
              id: "1",
              name: "Document",
              meta: "456 KB",
            },
          ],
        }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    const sendButton = el.shadowRoot?.querySelector(
      ".chat-footer__button[aria-label='Send message']",
    );
    expect(sendButton?.getAttribute("disabled")).toBeNull();
    expect(
      sendButton?.classList.contains("chat-footer__button--disabled"),
    ).toBeFalsy();
  });

  it("dispatches send-message event on send button click", async () => {
    const currentUserId = "test-user-id";
    const selectedRoomId = "test-room-id";
    const textareaValue = "Hello, world!";
    el = await fixture(
      html`<chat-footer
        .roomContext="${{ ...roomContext, selectedRoomId: selectedRoomId }}"
        .messageContext="${messageContext}"
        .footerContext="${{ ...footerContext, inputMessage: textareaValue }}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    elLocator = getElementLocatorSelectors(el);
    const sendButton = elLocator.getByLabelText("Send message");
    const spyEvent = vi.spyOn(el, "dispatchEvent");

    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea?.value).toBe(textareaValue);

    await sendButton.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("send-message");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      roomId: selectedRoomId,
      senderId: currentUserId,
      content: textareaValue,
    });

    const textareaAfterSend = el.shadowRoot?.querySelector("textarea");
    expect(textareaAfterSend?.value).toBe("");
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-footer
        .roomContext="${roomContext}"
        .messageContext="${messageContext}"
        .footerContext="${footerContext}"
        .currentUserId="${currentUserId}"
        .i18nContext="${{ i18n: i18nContext }}"
      ></chat-footer>`,
    );

    await a11y.isAccessible(el);
  });
});
