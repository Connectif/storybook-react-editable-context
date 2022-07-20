import { addons, types } from "@storybook/addons";

import { ADDON_ID, TOOL_ID } from "./constants";

import { EditableContext } from "./ReactEditableContext";

// Register the addon
addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "React Editable Context",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: EditableContext,
  });
});
