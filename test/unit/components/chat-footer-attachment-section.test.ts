import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatFooterAttachmentSection } from "../../../src/components/chat-footer-attachment-section";
import { ChatMessageAttachment } from "../../../src/types";

describe("chat-footer-attachment-section", () => {
  let el: ChatFooterAttachmentSection;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with default props", async () => {
    el = await fixture(
      html`<chat-footer-attachment-section></chat-footer-attachment-section>`,
    );

    const items = el.shadowRoot?.querySelectorAll(
      ".chat-footer-attachment-section__item",
    );
    expect(items).toHaveLength(0);
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
      html`<chat-footer-attachment-section
        .attachments=${attachments}
      ></chat-footer-attachment-section>`,
    );

    const texts = el.shadowRoot?.querySelectorAll(
      ".chat-footer-attachment-section__text",
    );
    const name = texts?.[0];
    const meta = texts?.[1];
    expect(name?.textContent?.trim()).toBe("Document");
    expect(meta?.textContent?.trim()).toBe("456 KB");
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
      html`<chat-footer-attachment-section
        .attachments=${attachments}
      ></chat-footer-attachment-section>`,
    );

    const image = el.shadowRoot?.querySelector("img");
    expect(image).toBeTruthy();
    expect(image?.getAttribute("src")).toBe("image.png");
  });

  it("dispatches remove-attachment event", async () => {
    const attachments: ChatMessageAttachment[] = [
      {
        id: "1",
        name: "Image",
        meta: "123 KB",
        imageUrl: "https://example.com/image.jpg",
      },
    ];
    el = await fixture(
      html`<chat-footer-attachment-section
        .attachments=${attachments}
      ></chat-footer-attachment-section>`,
    );
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const button = elLocator.getByRole("button");
    await button.click();

    expect(spyEvent).toHaveBeenCalledTimes(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("remove-attachment");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      attachment: attachments[0],
    });
  });

  it("is accessible", async () => {
    el = await fixture(
      html`<chat-footer-attachment-section></chat-footer-attachment-section>`,
    );
    await a11y.isAccessible(el);
  });
});
