import { html } from "lit";
import { afterEach, describe, expect, it } from "vitest";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatLoader } from "../../../src/components/chat-loader";

describe("chat-loader", () => {
  let el: ChatLoader;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(html`<chat-loader></chat-loader>`);

    const loader = el.shadowRoot?.querySelector(".chat-loader");
    expect(loader?.getAttribute("style")).toContain("width: 3.2em");
    expect(loader?.getAttribute("style")).toContain("height: 3.2em");
  });

  it("renders with custom size", async () => {
    el = await fixture(html`<chat-loader size="4.8"></chat-loader>`);

    const loader = el.shadowRoot?.querySelector(".chat-loader");
    expect(loader?.getAttribute("style")).toContain("width: 4.8em");
    expect(loader?.getAttribute("style")).toContain("height: 4.8em");
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-loader></chat-loader>`);
    await a11y.isAccessible(el);
  });
});
