import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatSidebar } from "../../../src/components/chat-sidebar";

class MockChatSearch extends HTMLElement {}
class MockChatRoomList extends HTMLElement {}

customElements.define("chat-sidebar", ChatSidebar);
customElements.define("chat-search", MockChatSearch);
customElements.define("chat-room-list", MockChatRoomList);

describe("chat-sidebar", () => {
  let el: ChatSidebar;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(html`<chat-sidebar></chat-sidebar>`);

    const sidebar = el.shadowRoot?.querySelector(".chat-sidebar");
    expect(sidebar?.classList.contains("chat-sidebar--hidden")).toBe(true);
    expect(sidebar?.classList.contains("chat-sidebar--mobile")).toBe(false);
  });

  it("shows sidebar", async () => {
    el = await fixture(html`<chat-sidebar show></chat-sidebar>`);

    const sidebar = el.shadowRoot?.querySelector(".chat-sidebar");
    expect(sidebar?.classList.contains("chat-sidebar--hidden")).toBe(false);
  });

  it("renders on mobile", async () => {
    el = await fixture(html`<chat-sidebar isMobile></chat-sidebar>`);

    const sidebar = el.shadowRoot?.querySelector(".chat-sidebar");
    expect(sidebar?.classList.contains("chat-sidebar--mobile")).toBe(true);
  });

  it("dispatches close event", async () => {
    el = await fixture(html`<chat-sidebar show></chat-sidebar>`);
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const closeButton = elLocator.getByLabelText("Close Sidebar");
    await closeButton.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("close");
  });

  it("dispatches add-room event", async () => {
    el = await fixture(html`<chat-sidebar show></chat-sidebar>`);
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const addRoomButton = elLocator.getByLabelText("Add Room");
    await addRoomButton.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("add-room");
  });

  it("closes sidebar when a room is selected on mobile", async () => {
    el = await fixture(html`<chat-sidebar show isMobile></chat-sidebar>`);
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const roomList = el.shadowRoot?.querySelector("chat-room-list");
    const selectRoomEvent = new CustomEvent("select-room", {});
    roomList?.dispatchEvent(selectRoomEvent);

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("close");
  })

  it("does not close sidebar when a room is selected on other devices", async () => {
    el = await fixture(html`<chat-sidebar show></chat-sidebar>`);
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const roomList = el.shadowRoot?.querySelector("chat-room-list");
    const selectRoomEvent = new CustomEvent("select-room", {});
    roomList?.dispatchEvent(selectRoomEvent);

    expect(spyEvent.mock.calls.length).toBe(0);
  })

  it("is accessible", async () => {
    el = await fixture(html`<chat-sidebar show></chat-sidebar>`);
    await a11y.isAccessible(el);
  });
});
