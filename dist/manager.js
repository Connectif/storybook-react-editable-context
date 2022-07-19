"use strict";

var _addons = require("@storybook/addons");

var _constants = require("constants");

var _EditableContextDecorator = require("EditableContextDecorator");

// Register the addon
_addons.addons.register(_constants.ADDON_ID, function () {
  _addons.addons.add(_constants.TOOL_ID, {
    type: _addons.types.TOOL,
    title: "ReactEditableContext",
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return !!(viewMode && viewMode.match(/^(story|docs)$/));
    },
    render: _EditableContextDecorator.EditableContext
  });
});