import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatSearch } from "../../../src/components/chat-search";
import { DEFAULT_I18N } from "../../../src/consts";

describe("chat-search", () => {
  let el: ChatSearch;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(
      html`<chat-search .i18nContext=${{ i18n: DEFAULT_I18N }}></chat-search>`,
    );

    const input = el.shadowRoot?.querySelector("input");
    expect(input?.placeholder).toBe(DEFAULT_I18N.CHAT_SEARCH_PLACEHOLDER);
  });

  it("renders with custom placeholder", async () => {
    const customPlaceholder = "custom placeholder";
    el = await fixture(
      html`<chat-search
        .i18nContext=${{
          i18n: { ...DEFAULT_I18N, CHAT_SEARCH_PLACEHOLDER: customPlaceholder },
        }}
      ></chat-search>`,
    );

    const input = el.shadowRoot?.querySelector("input");
    expect(input?.placeholder).toBe(customPlaceholder);
  });

  it("dispatches search event on input", async () => {
    el = await fixture(
      html`<chat-search .i18nContext=${{ i18n: DEFAULT_I18N }}></chat-search>`,
    );
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const input = elLocator.getByPlaceholder(DEFAULT_I18N.CHAT_SEARCH_PLACEHOLDER);
    await input.fill("test");

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("search-room");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      value: "test",
    });
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-search .i18nContext=${{ i18n: DEFAULT_I18N }}></chat-search>`);
    await a11y.isAccessible(el);
  });
});
