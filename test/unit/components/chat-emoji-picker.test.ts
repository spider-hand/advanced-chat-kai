import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatEmojiPicker } from "../../../src/components/chat-emoji-picker";

describe("chat-emoji-picker", () => {
  let el: ChatEmojiPicker;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders emoji-picker after importing dynamically", async () => {
    el = await fixture(html`<chat-emoji-picker></chat-emoji-picker>`);

    const emojiPicker = el.shadowRoot?.querySelector("emoji-picker");
    expect(emojiPicker).toBeFalsy();

    await el.connectedCallback();

    const emojiPickerAfterLoad = el.shadowRoot?.querySelector("emoji-picker");
    expect(emojiPickerAfterLoad).toBeTruthy();
  });

  it("renders emoji-picker with default width and height", async () => {
    el = await fixture(html`<chat-emoji-picker></chat-emoji-picker>`);

    await el.connectedCallback();

    const emojiPicker = el.shadowRoot?.querySelector("emoji-picker");
    expect(emojiPicker).toBeTruthy();
    expect(emojiPicker?.getAttribute("style")).toContain("width: 300px");
    expect(emojiPicker?.getAttribute("style")).toContain("height: 300px");
  });

  it("renders emoji-picker with custom width and height", async () => {
    el = await fixture(html`
      <chat-emoji-picker width="400" height="400"></chat-emoji-picker>
    `);

    await el.connectedCallback();

    const emojiPicker = el.shadowRoot?.querySelector("emoji-picker");
    expect(emojiPicker).toBeTruthy();
    expect(emojiPicker?.getAttribute("style")).toContain("width: 400px");
    expect(emojiPicker?.getAttribute("style")).toContain("height: 400px");
  });

  it("dispatches select-emoji event when clicking emoji", async () => {
    el = await fixture(html`<chat-emoji-picker></chat-emoji-picker>`);
    await el.connectedCallback();

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const emojiPicker = el.shadowRoot?.querySelector("emoji-picker");
    const emojiDetail = { unicode: "😊" };
    const emojiClickEvent = new CustomEvent("emoji-click", {
      detail: emojiDetail,
    });
    emojiPicker?.dispatchEvent(emojiClickEvent);

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("select-emoji");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      messageId: null,
      currentUserId: null,
      emoji: "😊",
    });
  });

  it("closes emoji picker when clicking outside", async () => {
    el = await fixture(html`<chat-emoji-picker></chat-emoji-picker>`);
    await el.connectedCallback();

    const spyCloseEvent = vi.spyOn(el, "dispatchEvent");
    const outsideClickEvent = new MouseEvent("mousedown", {});
    outsideClickEvent.composedPath = () => [];
    window.dispatchEvent(outsideClickEvent);

    expect(spyCloseEvent.mock.calls.length).toBe(1);
    expect(spyCloseEvent.mock.calls[0][0].type).toBe("close");
  });

  it("does not close emoji picker when clicking inside", async () => {
    el = await fixture(html`<chat-emoji-picker></chat-emoji-picker>`);
    await el.connectedCallback();

    const spyCloseEvent = vi.spyOn(el, "dispatchEvent");
    const insideClickEvent = new MouseEvent("mousedown", {});
    insideClickEvent.composedPath = () => [
      el.shadowRoot!.querySelector("emoji-picker")!,
    ];
    window.dispatchEvent(insideClickEvent);

    expect(spyCloseEvent.mock.calls.length).toBe(0);
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-emoji-picker></chat-emoji-picker>`);
    await el.connectedCallback();
    await a11y.isAccessible(el);
  });
});
