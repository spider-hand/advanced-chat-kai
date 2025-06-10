import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatRoomItem } from "../../../src/components/chat-room-item";
import { ChatRoom, VariantType } from "../../../src/types";

class MockChatActionList extends HTMLElement {}
class MockChatAvatar extends HTMLElement {}

customElements.define("chat-room-item", ChatRoomItem);
customElements.define("chat-action-list", MockChatActionList);
customElements.define("chat-avatar", MockChatAvatar);

describe("chat-room-item", () => {
  let el: ChatRoomItem;
  let elLocator: LocatorSelectors;

  const room: ChatRoom = {
    id: "room1",
    headerTitle: "Room 1",
    headerSubtitle: "This is Room 1",
    sidebarTitle: "Room 1",
    sidebarSubtitle: "This is Room 1",
    meta: "",
    hasEnded: false,
  };

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with the default props", async () => {
    el = await fixture(html`<chat-room-item .room=${room}></chat-room-item>`);

    const item = el.shadowRoot?.querySelector(".chat-room-item");
    expect(item?.classList.contains("chat-room-item--active")).toBe(false);

    const chatAvatar = el.shadowRoot?.querySelector("chat-avatar");
    expect(chatAvatar).toBeFalsy();

    const title = el.shadowRoot?.querySelector(".chat-room-item__title");
    expect(title?.textContent?.trim()).toBe("Room 1");

    const subtitle = el.shadowRoot?.querySelector(".chat-room-item__subtitle");
    expect(subtitle?.textContent?.trim()).toBe("This is Room 1");

    const toggleActionListButton = el.shadowRoot?.querySelector(
      ".chat-room-item__buton[aria-label='Open room actions']",
    );
    expect(toggleActionListButton).toBeFalsy();

    const menu = el.shadowRoot?.querySelector(".chat-room-item__menu");
    expect(menu).toBeTruthy();

    const meta = menu?.querySelector("span");
    expect(meta?.textContent?.trim()).toBe(room.meta);

    const actionList = el.shadowRoot?.querySelector("chat-action-list");
    expect(actionList).toBeFalsy();
  });

  it("renders with active prop", async () => {
    el = await fixture(html`
      <chat-room-item .room=${room} active></chat-room-item>
    `);

    const item = el.shadowRoot?.querySelector(".chat-room-item");
    expect(item?.classList.contains("chat-room-item--active")).toBe(true);
  });

  it("renders with showAvatar prop", async () => {
    const roomWithAvatar: ChatRoom = { ...room, avatar: "avatar.png" };

    el = await fixture(html`
      <chat-room-item .room=${roomWithAvatar} showAvatar></chat-room-item>
    `);

    const chatAvatar = el.shadowRoot?.querySelector("chat-avatar");
    expect(chatAvatar).toBeTruthy();
    expect(chatAvatar?.src).toBe("avatar.png");
  });

  it("shows and hides the button to toggle action list when hovering the room item", async () => {
    el = await fixture(html`
      <chat-room-item
        .room=${room}
        .actions=${[{ label: "Action", value: "action" }]}
      >
      </chat-room-item>
    `);

    const item = el.shadowRoot?.querySelector(".chat-room-item");
    item?.dispatchEvent(new MouseEvent("mouseenter"));

    await el.updateComplete;

    const toggleButton = el.shadowRoot?.querySelector(
      ".chat-room-item__button[aria-label='Open room actions']",
    );
    expect(toggleButton).toBeTruthy();

    item?.dispatchEvent(new MouseEvent("mouseleave"));

    await el.updateComplete;

    const toggleButtonAfterLeave = el.shadowRoot?.querySelector(
      ".chat-room-item__button[aria-label='Open room actions']",
    );
    expect(toggleButtonAfterLeave).toBeFalsy();
  });

  it("toggles the action list when clicking the toggle button", async () => {
    el = await fixture(html`
      <chat-room-item
        .room=${room}
        .actions=${[{ label: "Action", value: "action" }]}
      >
      </chat-room-item>
    `);

    const item = el.shadowRoot?.querySelector(".chat-room-item");
    item?.dispatchEvent(new MouseEvent("mouseenter"));

    await el.updateComplete;

    const toggleButton = el.shadowRoot?.querySelector(
      ".chat-room-item__button[aria-label='Open room actions']",
    );
    expect(toggleButton).toBeTruthy();

    toggleButton?.dispatchEvent(new MouseEvent("click"));

    await el.updateComplete;

    const actionList = el.shadowRoot?.querySelector("chat-action-list");
    expect(actionList).toBeTruthy();

    toggleButton?.dispatchEvent(new MouseEvent("click"));

    await el.updateComplete;

    const actionListAfterClose =
      el.shadowRoot?.querySelector("chat-action-list");
    expect(actionListAfterClose).toBeFalsy();
  });

  it("closes the action list when an action is selected", async () => {
    el = await fixture(html`
      <chat-room-item
        .room=${room}
        .actions=${[{ label: "Action", value: "action" }]}
      >
      </chat-room-item>
    `);

    const item = el.shadowRoot?.querySelector(".chat-room-item");
    item?.dispatchEvent(new MouseEvent("mouseenter"));

    await el.updateComplete;

    const toggleButton = el.shadowRoot?.querySelector(
      ".chat-room-item__button[aria-label='Open room actions']",
    );
    expect(toggleButton).toBeTruthy();

    toggleButton?.dispatchEvent(new MouseEvent("click"));

    await el.updateComplete;

    const actionList = el.shadowRoot?.querySelector("chat-action-list");
    expect(actionList).toBeTruthy();

    const selectActionEvent = new CustomEvent("select-action", {});
    actionList?.dispatchEvent(selectActionEvent);

    await el.updateComplete;

    const actionListAfterSelect =
      el.shadowRoot?.querySelector("chat-action-list");
    expect(actionListAfterSelect).toBeFalsy();
  });

  it("closes the action list when closing it", async () => {
    el = await fixture(html`
      <chat-room-item
        .room=${room}
        .actions=${[{ label: "Action", value: "action" }]}
      >
      </chat-room-item>
    `);

    const item = el.shadowRoot?.querySelector(".chat-room-item");
    item?.dispatchEvent(new MouseEvent("mouseenter"));

    await el.updateComplete;

    const toggleButton = el.shadowRoot?.querySelector(
      ".chat-room-item__button[aria-label='Open room actions']",
    );
    expect(toggleButton).toBeTruthy();

    toggleButton?.dispatchEvent(new MouseEvent("click"));

    await el.updateComplete;

    const actionList = el.shadowRoot?.querySelector("chat-action-list");
    expect(actionList).toBeTruthy();

    const closeActionEvent = new CustomEvent("close", {});
    actionList?.dispatchEvent(closeActionEvent);

    await el.updateComplete;

    const actionListAfterSelect =
      el.shadowRoot?.querySelector("chat-action-list");
    expect(actionListAfterSelect).toBeFalsy();
  });

  it("dispatches select-room event when clicking the room item", async () => {
    el = await fixture(html`<chat-room-item .room=${room}></chat-room-item>`);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    elLocator = getElementLocatorSelectors(el);
    const item = elLocator.getByTestId("chat-room-item");
    await item.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("select-room");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      room: room,
    });
  });

  it.each(["success", "danger", "warning", "info"] as VariantType[])(
    "renders with a badge",
    async (variant) => {
      const roomWithBadge: ChatRoom = {
        ...room,
        badge: { label: "New", type: variant },
      };

      el = await fixture(html`
        <chat-room-item .room=${roomWithBadge}></chat-room-item>
      `);

      const badge = el.shadowRoot?.querySelector(".chat-room-item__badge");
      expect(badge).toBeTruthy();
      expect(badge?.textContent?.trim()).toBe("New");
      expect(
        badge?.classList.contains(`chat-room-item__badge--${variant}`),
      ).toBe(true);
    },
  );

  it("is accessible", async () => {
    el = await fixture(html`<chat-room-item .room=${room}></chat-room-item>`);

    await a11y.isAccessible(el);
  });
});
