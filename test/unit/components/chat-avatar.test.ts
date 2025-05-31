import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatAvatar } from "../../../src/components/chat-avatar";

describe("chat-avatar", () => {
  let el: ChatAvatar;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(html`<chat-avatar></chat-avatar>`);

    const img = el.shadowRoot?.querySelector("img");
    expect(img).toBeTruthy();
    expect(img?.getAttribute("src")).toBe("");
    expect(img?.getAttribute("alt")).toBe("Avatar");
    expect(img?.style.width).toBe("3.2em");
    expect(img?.style.height).toBe("3.2em");
  });

  it("renders with custom size", async () => {
    el = await fixture(html`<chat-avatar size="4.8"></chat-avatar>`);

    const img = el.shadowRoot?.querySelector("img");
    expect(img?.style.width).toBe("4.8em");
    expect(img?.style.height).toBe("4.8em");
  });

  it("renders with custom src", async () => {
    const src = "avatar.png";
    el = await fixture(html`<chat-avatar src="${src}"></chat-avatar>`);

    const img = el.shadowRoot?.querySelector("img");
    expect(img?.getAttribute("src")).toBe(src);
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-avatar></chat-avatar>`);
    await a11y.isAccessible(el);
  });
});
