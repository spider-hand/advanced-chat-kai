import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatSearch } from "../../../src/components/chat-search";
import { defaultI18n } from "../../../src/consts";

describe("chat-search", () => {
  let el: ChatSearch;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(
      html`<chat-search .i18nContext=${{ i18n: defaultI18n }}></chat-search>`,
    );

    const input = el.shadowRoot?.querySelector("input");
    expect(input?.placeholder).toBe(defaultI18n.chatSearchPlaceholder);
  });

  it("renders with custom placeholder", async () => {
    const customPlaceholder = "custom placeholder";
    el = await fixture(
      html`<chat-search
        .i18nContext=${{
          i18n: { ...defaultI18n, chatSearchPlaceholder: customPlaceholder },
        }}
      ></chat-search>`,
    );

    const input = el.shadowRoot?.querySelector("input");
    expect(input?.placeholder).toBe(customPlaceholder);
  });

  it("dispatches search event on input", async () => {
    el = await fixture(
      html`<chat-search .i18nContext=${{ i18n: defaultI18n }}></chat-search>`,
    );
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const input = elLocator.getByPlaceholder(defaultI18n.chatSearchPlaceholder);
    await input.fill("test");

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("search-room");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      value: "test",
    });
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-search .i18nContext=${{ i18n: defaultI18n }}></chat-search>`);
    await a11y.isAccessible(el);
  });
});
