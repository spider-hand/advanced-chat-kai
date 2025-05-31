import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatActionList } from "../../../src/components/chat-action-list";
import { ChatAction } from "../../../src/types";

describe("chat-action-list", () => {
  let el: ChatActionList;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(html`<chat-action-list></chat-action-list>`);

    const items = el.shadowRoot?.querySelectorAll(".chat-action-list__item");
    expect(items).toHaveLength(0);
  });

  it("renders with actions", async () => {
    const actions: ChatAction<string>[] = [
      { label: "Action 1", value: "action1" },
      { label: "Action 2", value: "action2" },
    ];
    el = await fixture(html`
      <chat-action-list .actions="${actions}"></chat-action-list>
    `);

    const items = el.shadowRoot?.querySelectorAll(".chat-action-list__item");
    expect(items).toHaveLength(2);
    expect(items![0].textContent?.trim()).toBe("Action 1");
    expect(items![1].textContent?.trim()).toBe("Action 2");
  });

  it("dispatches select-room-action event", async () => {
    const actions: ChatAction<string>[] = [
      { label: "Action 1", value: "action1" },
    ];
    el = await fixture(html`
      <chat-action-list
        .actions="${actions}"
        actionType="room"
        roomId="123"
      ></chat-action-list>
    `);
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const item = elLocator.getByText("Action 1");
    await item.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("select-room-action");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      label: "Action 1",
      value: "action1",
      roomId: "123",
    });
  });

  it("dispatches select-message-action", async () => {
    const actions: ChatAction<string>[] = [
      { label: "Action 1", value: "action1" },
    ];
    el = await fixture(html`
      <chat-action-list
        .actions="${actions}"
        actionType="message"
        messageId="456"
      ></chat-action-list>
    `);
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const item = elLocator.getByText("Action 1");
    await item.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("select-message-action");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      label: "Action 1",
      value: "action1",
      messageId: "456",
    });
  });

  it("closes on outside click", async () => {
    const actions: ChatAction<string>[] = [
      { label: "Action 1", value: "action1" },
    ];
    el = await fixture(html`
      <chat-action-list
        .actions="${actions}"
        actionType="message"
        messageId="456"
      ></chat-action-list>
    `);

    const spyCloseEvent = vi.spyOn(el, "dispatchEvent");
    const outsideClickEvent = new MouseEvent("mousedown", {});
    outsideClickEvent.composedPath = () => [];
    window.dispatchEvent(outsideClickEvent);

    expect(spyCloseEvent.mock.calls.length).toBe(1);
    expect(spyCloseEvent.mock.calls[0][0].type).toBe("close");
  });

  it("does not close on click inside", async () => {
    const actions: ChatAction<string>[] = [
      { label: "Action 1", value: "action1" },
    ];
    el = await fixture(html`
      <chat-action-list
        .actions="${actions}"
        actionType="message"
        messageId="456"
      ></chat-action-list>
    `);

    const spyCloseEvent = vi.spyOn(el, "dispatchEvent");
    const insideClickEvent = new MouseEvent("mousedown", {});
    insideClickEvent.composedPath = () => [
      el.shadowRoot!.querySelector(".chat-action-list")!,
    ];
    window.dispatchEvent(insideClickEvent);

    expect(spyCloseEvent.mock.calls.length).toBe(0);
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-action-list></chat-action-list>`);
    await a11y.isAccessible(el);
  });
});
