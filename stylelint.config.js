/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  customSyntax: "postcss-lit",
  rules: {
    "selector-class-pattern": null,
  },
};
