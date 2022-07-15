import { addons, types } from "@storybook/addons";
import { ADDON_ID, TOOL_ID } from "../constants";
import { EditableContext } from "../EditableContextDecorator"; // Register the addon

addons.register(ADDON_ID, function () {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "ReactEditableContext",
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return !!(viewMode && viewMode.match(/^(story|docs)$/));
    },
    render: EditableContext
  });
});