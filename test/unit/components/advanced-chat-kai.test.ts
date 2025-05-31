import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { AdvancedChatKai } from "../../../src/components/advanced-chat-kai";

class MockChatContainer extends HTMLElement {}
class MockChatSidebar extends HTMLElement {}

customElements.define("advanced-chat-kai", AdvancedChatKai);
customElements.define("chat-container", MockChatContainer);
customElements.define("chat-sidebar", MockChatSidebar);

describe("advanced-chat-kai", () => {
  let el: AdvancedChatKai;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(html`<advanced-chat-kai></advanced-chat-kai>`);

    const main = el.shadowRoot?.querySelector(".main");
    expect(main?.getAttribute("style")).toContain("width: 80em");
    expect(main?.getAttribute("style")).toContain("height: 60em");
    expect(main?.classList.contains("main--fullscreen")).toBe(false);

    const sidebar = el.shadowRoot?.querySelector("chat-sidebar");
    expect(sidebar).toBeTruthy();
  });

  it("renders with fullscreen mode", async () => {
    el = await fixture(
      html`<advanced-chat-kai
        .width=${"100vw"}
        .height=${"100vh"}
      ></advanced-chat-kai>`,
    );
    const main = el.shadowRoot?.querySelector(".main");
    expect(main?.getAttribute("style")).toContain("width: 100vw");
    expect(main?.getAttribute("style")).toContain("height: 100vh");
    expect(main?.classList.contains("main--fullscreen")).toBe(true);
  });

  it("does not show sidebar on single room mode", async () => {
    el = await fixture(
      html`<advanced-chat-kai .isSingleRoom=${true}></advanced-chat-kai>`,
    );
    const sidebar = el.shadowRoot?.querySelector("chat-sidebar");
    expect(sidebar).toBeFalsy();
  });

  it("toggles the sidebar on events", async () => {
    el = await fixture(html`<advanced-chat-kai></advanced-chat-kai>`);

    expect(el.showSidebar).toBe(true);

    const sidebar = el.shadowRoot?.querySelector("chat-sidebar");
    const closeEvent = new CustomEvent("close");
    sidebar?.dispatchEvent(closeEvent);

    await el.updateComplete;

    expect(el.showSidebar).toBe(false);

    const chatContainer = el.shadowRoot?.querySelector("chat-container");
    const openEvent = new CustomEvent("open-sidebar");
    chatContainer?.dispatchEvent(openEvent);

    await el.updateComplete;

    expect(el.showSidebar).toBe(true);
  });

  it("is accessible", async () => {
    el = await fixture(html`<advanced-chat-kai></advanced-chat-kai>`);
    await a11y.isAccessible(el);
  });
});
