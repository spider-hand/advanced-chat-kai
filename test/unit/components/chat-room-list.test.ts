import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatRoomList } from "../../../src/components/chat-room-list";
import { ChatRoom } from "../../../src/types";

class MockChatRoomItem extends HTMLElement {}
class MockChatLoader extends HTMLElement {}

customElements.define("chat-room-list", ChatRoomList);
customElements.define("chat-room-item", MockChatRoomItem);
customElements.define("chat-loader", MockChatLoader);

describe("chat-room-list", () => {
  let el: ChatRoomList;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with the default props", async () => {
    el = await fixture(
      html`<chat-room-list
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-room-list>`,
    );

    const chatLoader = el.shadowRoot?.querySelector("chat-loader");
    expect(chatLoader).toBeFalsy();

    const chatRoomItems = el.shadowRoot?.querySelectorAll("chat-room-item");
    expect(chatRoomItems?.length).toBe(0);
  });

  it("renders chat-loader when loading the initial rooms", async () => {
    el = await fixture(
      html`<chat-room-list
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: true,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-room-list>`,
    );

    const chatLoader = el.shadowRoot?.querySelector("chat-loader");
    expect(chatLoader).toBeTruthy();
    expect(chatLoader?.getAttribute("style")).toContain("position: absolute");

    const chatRoomItems = el.shadowRoot?.querySelectorAll("chat-room-item");
    expect(chatRoomItems?.length).toBe(0);
  });

  it("renders chat-loader when loading more rooms", async () => {
    el = await fixture(
      html`<chat-room-list
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: true,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-room-list>`,
    );

    const chatLoader = el.shadowRoot?.querySelector("chat-loader");
    expect(chatLoader).toBeTruthy();
    expect(chatLoader?.getAttribute("style")).toContain("padding: 1.6em 0");

    const chatRoomItems = el.shadowRoot?.querySelectorAll("chat-room-item");
    expect(chatRoomItems?.length).toBe(0);
  });

  it("renders chat-room-item for each room", async () => {
    const rooms: ChatRoom[] = [
      {
        id: "room1",
        headerTitle: "Room 1",
        headerSubtitle: "This is Room 1",
        sidebarTitle: "Room 1",
        sidebarSubtitle: "This is Room 1",
        meta: "",
        hasEnded: false,
      },
      {
        id: "room2",
        headerTitle: "Room 2",
        headerSubtitle: "This is Room 2",
        sidebarTitle: "Room 2",
        sidebarSubtitle: "This is Room 2",
        meta: "",
        hasEnded: false,
      },
    ];

    el = await fixture(
      html`<chat-room-list
        .roomContext=${{
          rooms,
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-room-list>`,
    );

    const chatRoomItems = el.shadowRoot?.querySelectorAll("chat-room-item");
    expect(chatRoomItems?.length).toBe(2);
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-room-list
        .roomContext=${{
          rooms: [],
          selectedRoomId: null,
          isLoadingRoom: false,
          isLoadingMoreRooms: false,
          showRoomAvatar: false,
          roomActions: [],
        }}
      ></chat-room-list>`,
    );

    await a11y.isAccessible(el);
  });
});
