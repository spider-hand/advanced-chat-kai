import { html } from "lit";
import { expect, it, describe, afterAll } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import { ChatContainer } from "../../../src/components/chat-container";
import { Dialog } from "../../../src/types";

// Mock child components
class MockChatHeader extends HTMLElement {}
class MockChatMessageList extends HTMLElement {}
class MockChatFooter extends HTMLElement {}
class MockChatDialog extends HTMLElement {}

customElements.define("chat-container", ChatContainer);
customElements.define("chat-header", MockChatHeader);
customElements.define("chat-message-list", MockChatMessageList);
customElements.define("chat-footer", MockChatFooter);
customElements.define("chat-dialog", MockChatDialog);

describe("chat-container", () => {
  let el: ChatContainer;

  afterAll(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(html`<chat-container></chat-container>`);

    const container = el.shadowRoot?.querySelector("div");
    expect(container).toBeTruthy();
    expect(container?.classList.contains("chat-container")).toBe(true);
    expect(container?.classList.contains("chat-container--mobile")).toBe(false);
    expect(container?.classList.contains("chat-container--hidden")).toBe(false);

    const dialog = el.shadowRoot?.querySelector("chat-dialog");
    expect(dialog).toBeFalsy();
  });

  it("renders with isMobile prop", async () => {
    el = await fixture(html`<chat-container isMobile></chat-container>`);

    const container = el.shadowRoot?.querySelector("div");
    expect(container?.classList.contains("chat-container--mobile")).toBe(true);
  });

  it("will be hidden when showing room list and sidebar on mobile", async () => {
    el = await fixture(
      html`<chat-container
        .isSingleRoom=${false}
        .isMobile=${true}
        .showSidebar=${true}
      ></chat-container>`,
    );

    const container = el.shadowRoot?.querySelector("div");
    expect(container?.classList.contains("chat-container--hidden")).toBe(true);
  });

  it("renders chat-dialog when dialog prop is set", async () => {
    const dialog: Dialog = {
      event: "test-event",
      body: "Test body",
      leftButton: {
        text: "Left",
      },
      rightButton: {
        text: "Right",
      },
    };

    el = await fixture(html`
      <chat-container .dialog=${dialog}></chat-container>
    `);

    const chatDialog = el.shadowRoot?.querySelector("chat-dialog");
    expect(chatDialog).toBeTruthy();
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-container></chat-container>`);
    await a11y.isAccessible(el);
  });
});
