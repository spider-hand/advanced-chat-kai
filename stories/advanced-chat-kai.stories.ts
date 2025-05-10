import type { Meta, StoryObj } from "@storybook/web-components";
import "../src/main.ts";
import { defaultProps } from "./props.ts";

const meta: Meta = {
  component: "advanced-chat-kai",
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: defaultProps,
};
