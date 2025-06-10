import { html } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type LocatorSelectors } from "@vitest/browser/context";
import { getElementLocatorSelectors } from "@vitest/browser/utils";
import { assert as a11y, fixture, fixtureCleanup } from "@open-wc/testing";
import "../../../src/define";
import { ChatDialog } from "../../../src/components/chat-dialog";
import { Dialog, VariantType } from "../../../src/types";

describe("chat-dialog", () => {
  let el: ChatDialog;
  let elLocator: LocatorSelectors;

  afterEach(() => {
    fixtureCleanup();
  });

  it("renders with props", async () => {
    const dialog: Dialog = {
      event: "test-event",
      body: "This is a test dialog",
      leftButton: { text: "Cancel" },
      rightButton: { text: "Confirm", variant: "success" },
    };
    el = await fixture(html`<chat-dialog .dialog=${dialog}></chat-dialog>`);

    const body = el.shadowRoot?.querySelector(".chat-dialog__body");
    expect(body?.textContent?.trim()).toBe(dialog.body);
    const buttons = el.shadowRoot?.querySelectorAll(".chat-dialog__button");
    const leftButton = buttons![0];
    const rightButton = buttons![1];

    expect(leftButton.textContent?.trim()).toBe(dialog.leftButton.text);
    expect(rightButton.textContent?.trim()).toBe(dialog.rightButton.text);
  });

  it.each(["success", "warning", "danger", "info"] as VariantType[])(
    "renders with correct button variants",
    async (variant) => {
      const el = await fixture<ChatDialog>(
        html`<chat-dialog
          .dialog=${{
            event: "test-event",
            body: "This is a test dialog",
            leftButton: { text: "Cancel", variant },
            rightButton: { text: "Confirm", variant },
          }}
        ></chat-dialog>`,
      );

      const buttons = el.shadowRoot?.querySelectorAll(".chat-dialog__button");
      const leftButton = buttons![0];
      const rightButton = buttons![1];

      expect(leftButton.classList).toContain(`chat-dialog__button--${variant}`);
      expect(rightButton.classList).toContain(
        `chat-dialog__button--${variant}`,
      );
    },
  );

  it("dispatches events on left button click", async () => {
    const dialog: Dialog = {
      event: "test-event",
      body: "This is a test dialog",
      leftButton: { text: "Cancel" },
      rightButton: { text: "Confirm", variant: "success" },
    };
    el = await fixture(html`<chat-dialog .dialog=${dialog}></chat-dialog>`);
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const leftButton = elLocator.getByText("Cancel");

    await leftButton.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("click-dialog-button");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      event: dialog.event,
      side: "left",
    });
  });

  it("dispatches events on right button click", async () => {
    const dialog: Dialog = {
      event: "test-event",
      body: "This is a test dialog",
      leftButton: { text: "Cancel" },
      rightButton: { text: "Confirm", variant: "success" },
    };
    el = await fixture(html`<chat-dialog .dialog=${dialog}></chat-dialog>`);
    elLocator = getElementLocatorSelectors(el);

    const spyEvent = vi.spyOn(el, "dispatchEvent");
    const rightButton = elLocator.getByText("Confirm");

    await rightButton.click();

    expect(spyEvent.mock.calls.length).toBe(1);
    expect(spyEvent.mock.calls[0][0].type).toBe("click-dialog-button");
    expect((spyEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      event: dialog.event,
      side: "right",
    });
  });

  it("is accessible", async () => {
    const dialog: Dialog = {
      event: "test-event",
      body: "This is a test dialog",
      leftButton: { text: "Cancel" },
      rightButton: { text: "Confirm", variant: "success" },
    };
    el = await fixture(html`<chat-dialog .dialog=${dialog}></chat-dialog>`);
    await a11y.isAccessible(el);
  });
});
