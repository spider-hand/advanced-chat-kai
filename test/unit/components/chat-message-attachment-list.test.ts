import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatMessageAttachmentList } from "../../../src/components/chat-message-attachment-list";
import { ChatMessageAttachment } from "../../../src/types";

describe("chat-message-attachment-list", () => {
  let el: ChatMessageAttachmentList;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(
      html`<chat-message-attachment-list></chat-message-attachment-list>`,
    );

    const list = el.shadowRoot?.querySelector(".chat-message-attachment-list");
    expect(list?.classList.contains("chat-message-attachment-list--mine")).toBe(
      false,
    );

    const items = el.shadowRoot?.querySelectorAll(
      ".chat-message-attachment-list__item",
    );
    expect(items).toHaveLength(0);
  });

  it("renders on my message", async () => {
    el = await fixture(
      html`<chat-message-attachment-list mine></chat-message-attachment-list>`,
    );

    const list = el.shadowRoot?.querySelector(".chat-message-attachment-list");
    expect(list?.classList.contains("chat-message-attachment-list--mine")).toBe(
      true,
    );
  });

  it("renders attachments", async () => {
    const attachments: ChatMessageAttachment[] = [
      {
        id: "1",
        name: "Document",
        meta: "456 KB",
      },
    ];
    el = await fixture(
      html`<chat-message-attachment-list
        .attachments=${attachments}
      ></chat-message-attachment-list>`,
    );

    const texts = el.shadowRoot?.querySelectorAll(
      ".chat-message-attachment-list__text",
    );
    const name = texts?.[0];
    const meta = texts?.[1];
    expect(name?.textContent?.trim()).toBe("Document");
    expect(meta?.textContent?.trim()).toBe("456 KB");

    const icons = el.shadowRoot?.querySelectorAll("svg");
    const icon = icons?.[0];
    expect(icon?.getAttribute("fill")).toBe("var(--surface-700)");
  });

  it("renders attachmensts on my message", async () => {
    const attachments: ChatMessageAttachment[] = [
      {
        id: "1",
        name: "Document",
        meta: "456 KB",
      },
    ];
    el = await fixture(
      html`<chat-message-attachment-list
        .attachments=${attachments}
        mine
      ></chat-message-attachment-list>`,
    );

    const texts = el.shadowRoot?.querySelectorAll(
      ".chat-message-attachment-list__text",
    );
    const name = texts?.[0];
    const meta = texts?.[1];
    expect(name?.textContent?.trim()).toBe("Document");
    expect(meta?.textContent?.trim()).toBe("456 KB");

    const icons = el.shadowRoot?.querySelectorAll("svg");
    const icon = icons?.[0];
    expect(icon?.getAttribute("fill")).toBe("var(--text-on-brand, var(--surface-700))");
  });

  it("dispatches download-attachment event", async () => {
    const attachments: ChatMessageAttachment[] = [
      {
        id: "1",
        name: "Document",
        meta: "456 KB",
      },
    ];
    el = await fixture(
      html`<chat-message-attachment-list
        .attachments=${attachments}
      ></chat-message-attachment-list>`,
    );
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const item = elLocator.getByText("Document");
    await item.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("download-attachment");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      attachment: attachments[0],
    });
  });

  it("renders image attachments", async () => {
    const attachments: ChatMessageAttachment[] = [
      {
        id: "1",
        name: "Image",
        meta: "123 KB",
        imageUrl: "image.png",
      },
    ];
    el = await fixture(
      html`<chat-message-attachment-list
        .attachments=${attachments}
      ></chat-message-attachment-list>`,
    );

    const images = el.shadowRoot?.querySelectorAll(
      ".chat-message-attachment-list__image",
    );
    expect(images).toHaveLength(1);
    expect(images![0].getAttribute("src")).toBe("image.png");
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-message-attachment-list></chat-message-attachment-list>`,
    );
    await a11y.isAccessible(el);
  });
});
