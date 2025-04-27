import { page } from "@vitest/browser/context";
import { beforeEach, describe, expect, it } from "vitest";

import "../src/advanced-chat-kai.ts";

describe("advanced-chat-kai", () => {
  beforeEach(() => {
    document.body.innerHTML = "<advanced-chat-kai></advanced-chat-kai>";
  });

  it("should render 'Hello, world", async () => {
    await expect
      .element(page.getByTestId("text"))
      .toHaveTextContent("Hello, world");
  });
});
