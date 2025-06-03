import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatNotificationBadge } from "../../../src/components/chat-notification-badge";
import { DEFAULT_I18N } from "../../../src/consts";

describe("chat-notification-badge", () => {
  let el: ChatNotificationBadge;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with props", async () => {
    el = await fixture(
      html`<chat-notification-badge
        .i18nContext=${{ i18n: DEFAULT_I18N }}
      ></chat-notification-badge>`,
    );

    const badge = el.shadowRoot?.querySelector(".chat-notification-badge");
    expect(badge?.textContent?.trim()).toBe(
      DEFAULT_I18N.NEW_MESSAGE_NOTIFICATION,
    );
  });

  it("renders with custom text", async () => {
    el = await fixture(
      html`<chat-notification-badge
        .i18nContext=${{
          i18n: { ...DEFAULT_I18N, NEW_MESSAGE_NOTIFICATION: "custom message" },
        }}
      ></chat-notification-badge>`,
    );

    const badge = el.shadowRoot?.querySelector(".chat-notification-badge");
    expect(badge?.textContent?.trim()).toBe("custom message");
  });

  it("dispatches click-notification-badge event", async () => {
    el = await fixture(
      html`<chat-notification-badge
        .i18nContext=${{ i18n: DEFAULT_I18N }}
      ></chat-notification-badge>`,
    );
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const badge = elLocator.getByText(DEFAULT_I18N.NEW_MESSAGE_NOTIFICATION);
    await badge.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("click-notification-badge");
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-notification-badge
        .i18nContext=${{ i18n: DEFAULT_I18N }}
      ></chat-notification-badge>`,
    );
    await a11y.isAccessible(el);
  });
});
