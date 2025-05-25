import { beforeEach, describe, expect, it } from "vitest";

import "../src/components/advanced-chat-kai";

describe("main", () => {
  beforeEach(() => {
    document.body.innerHTML = "<advanced-chat-kai></advanced-chat-kai>";
  });

  it("should be true", () => {
    expect(true).toBe(true);
  });
});
