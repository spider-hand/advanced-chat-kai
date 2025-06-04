import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatSuggestionList } from "../../../src/components/chat-suggestion-list";
import { ChatMessageSuggestion } from "../../../src/types";

describe("chat-suggestion-list", () => {
  let el: ChatSuggestionList;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(html`<chat-suggestion-list></chat-suggestion-list>`);

    const items = el.shadowRoot?.querySelectorAll(
      ".chat-suggestion-list__item",
    );
    expect(items?.length).toBe(0);
  });

  it("renders suggestions", async () => {
    const suggestions: ChatMessageSuggestion[] = [
      {
        text: "Suggestion 1",
        value: "suggestion1",
      },
      {
        text: "Suggestion 2",
        value: "suggestion2",
      },
    ];
    el = await fixture(
      html`<chat-suggestion-list
        .suggestions=${suggestions}
      ></chat-suggestion-list>`,
    );

    const items = el.shadowRoot?.querySelectorAll(
      ".chat-suggestion-list__item",
    );
    expect(items).toHaveLength(2);
    expect(items![0].textContent?.trim()).toBe("Suggestion 1");
    expect(items![1].textContent?.trim()).toBe("Suggestion 2");
    expect(items![0].getAttribute('style')).toContain("margin-left: auto");
  });

  it("renders left aligned suggestions", async () => {
    const suggestions: ChatMessageSuggestion[] = [
      {
        text: "Suggestion 1",
        value: "suggestion1",
      },
    ];
    el = await fixture(
      html`<chat-suggestion-list
        .suggestions=${suggestions}
        alignMyMessagesLeft
      ></chat-suggestion-list>`,
    );

    const items = el.shadowRoot?.querySelectorAll(
      ".chat-suggestion-list__item",
    );
    expect(items).toHaveLength(1);
    expect(items![0].textContent?.trim()).toBe("Suggestion 1");
    expect(items![0].getAttribute('style')).toContain("margin-left: 4em");
  });

  it("dispatches select-suggestion event on item click", async () => {
    const suggestions: ChatMessageSuggestion[] = [
      {
        text: "Suggestion 1",
        value: "suggestion1",
      },
      {
        text: "Suggestion 2",
        value: "suggestion2",
      },
    ];
    el = await fixture(
      html`<chat-suggestion-list
        .suggestions=${suggestions}
      ></chat-suggestion-list>`,
    );
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const item = elLocator.getByText("Suggestion 1");
    await item.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("select-suggestion");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      suggestion: suggestions[0],
    });
  });

  it("is accessible", async () => {
    el = await fixture(html`<chat-suggestion-list></chat-suggestion-list>`);
    await a11y.isAccessible(el);
  });
});
