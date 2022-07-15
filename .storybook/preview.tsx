/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators#gatsby-focus-wrapper
 */
import { editableContextDecorator } from "../src/EditableContextDecorator";
import MyContext from "../src/MyContext";

const decorators = [
  editableContextDecorator(MyContext, [
    {
      name: "Color",
      field: "color",
      vals: ["#ffffff", "#000000"],
      names: ["White", "Black"],
      default: "#ffffff",
    },
    {
      name: "Background color",
      field: "backgroundColor",
      vals: ["#222222", "#cccccc", "#000044"],
      names: ["Dark grey", "Light grey", "Dark blue"],
      default: "#cccccc",
    },
  ]),
];

const globalTypes = {
  context: {},
};

export { decorators, globalTypes };
