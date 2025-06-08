import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatHeader } from "../../../src/components/chat-header";
import { ChatAction, ChatRoom } from "../../../src/types";

class MockChatActionList extends HTMLElement {}

customElements.define("chat-header", ChatHeader);
customElements.define("chat-action-list", MockChatActionList);

describe("chat-header", () => {
  let el: ChatHeader;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("shows the button to toggle sidebar", async () => {
    el = await fixture(
      html`<chat-header
        .showSidebar=${false}
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-header>`,
    );

    const button = el.shadowRoot?.querySelector(".chat-header__button");
    expect(button?.getAttribute("style")).toContain("display: block");
  });

  it("hides the button to toggle sidebar", async () => {
    el = await fixture(
      html`<chat-header
        .showSidebar=${true}
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-header>`,
    );

    const button = el.shadowRoot?.querySelector(".chat-header__button");
    expect(button?.getAttribute("style")).toContain("display: none");
  });

  it("dispatches open-sidebar", async () => {
    el = await fixture(
      html`<chat-header
        .showSidebar=${false}
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-header>`,
    );

    elLocator = getElementLocatorSelectors(el);
    const button = elLocator.getByLabelText("Open sidebar");
    const spyEvent = vi.spyOn(el, "dispatchEvent");

    await button.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("open-sidebar");
  });

  it("renders title and subtitle of the selected room", async () => {
    const roomContext = {
      rooms: [
        {
          id: "room1",
          headerTitle: "Room 1",
          headerSubtitle: "This is Room 1",
          sidebarTitle: "Room 1",
          sidebarSubtitle: "This is Room 1",
          meta: "",
          hasEnded: false,
        },
      ] as ChatRoom[],
      selectedRoomId: "room1",
      isLoadingRoom: false,
      isLoadingMoreRooms: false,
      showRoomAvatar: false,
      roomActions: [],
    };

    el = await fixture(
      html`<chat-header
        .showSidebar=${false}
        .roomContext=${roomContext}
      ></chat-header>`,
    );

    const title = el.shadowRoot?.querySelector(".chat-header__title");
    const subtitle = el.shadowRoot?.querySelector(".chat-header__subtitle");

    expect(title?.textContent?.trim()).toBe("Room 1");
    expect(subtitle?.textContent?.trim()).toBe("This is Room 1");
  });

  it("renders a button to show the list of actions", async () => {
    el = await fixture(
      html`<chat-header
        .showSidebar=${false}
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [
            { label: "Actions", value: "actions" },
          ] as ChatAction<string>[],
        }}
      ></chat-header>`,
    );

    const button = el.shadowRoot?.querySelector(
      ".chat-header__button[aria-label='Show actions']",
    );
    expect(button).toBeTruthy();
  });

  it("toggles the action list", async () => {
    el = await fixture(
      html`<chat-header
        .showSidebar=${false}
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [
            { label: "Actions", value: "actions" },
          ] as ChatAction<string>[],
        }}
      ></chat-header>`,
    );

    elLocator = getElementLocatorSelectors(el);
    const button = elLocator.getByLabelText("Show actions");
    await button.click();

    const actionList = el.shadowRoot?.querySelector("chat-action-list");
    expect(actionList).toBeTruthy();

    await button.click();

    const actionListAfterClose =
      el.shadowRoot?.querySelector("chat-action-list");
    expect(actionListAfterClose).toBeFalsy();
  });

  it("closes the action list when an action is selected", async () => {
    el = await fixture(
      html`<chat-header
        .showSidebar=${false}
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [
            { label: "Actions", value: "actions" },
          ] as ChatAction<string>[],
        }}
      ></chat-header>`,
    );

    elLocator = getElementLocatorSelectors(el);

    const button = elLocator.getByLabelText("Show actions");
    await button.click();

    const actionList = el.shadowRoot?.querySelector("chat-action-list");
    expect(actionList).toBeTruthy();

    const selectActionEvent = new CustomEvent("select-action", {});
    actionList?.dispatchEvent(selectActionEvent);

    await el.updateComplete;

    const actionListAfterSelect =
      el.shadowRoot?.querySelector("chat-action-list");
    expect(actionListAfterSelect).toBeFalsy();
  });

  it("closes the action list when close event is dispatched", async () => {
    el = await fixture(
      html`<chat-header
        .showSidebar=${false}
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [
            { label: "Actions", value: "actions" },
          ] as ChatAction<string>[],
        }}
      ></chat-header>`,
    );

    elLocator = getElementLocatorSelectors(el);

    const button = elLocator.getByLabelText("Show actions");
    await button.click();

    const actionList = el.shadowRoot?.querySelector("chat-action-list");
    expect(actionList).toBeTruthy();

    const closeEvent = new CustomEvent("close", {});
    actionList?.dispatchEvent(closeEvent);

    await el.updateComplete;

    const actionListAfterClose =
      el.shadowRoot?.querySelector("chat-action-list");
    expect(actionListAfterClose).toBeFalsy();
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-header
        .showSidebar=${false}
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-header>`,
    );

    await a11y.isAccessible(el);
  });
});
