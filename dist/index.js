"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EditableContextDecorator = require("./EditableContextDecorator");

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

// make it work with --isolatedModules
var _default = {
  editableContextDecorator: _EditableContextDecorator.editableContextDecorator,
  EditableContext: _EditableContextDecorator.EditableContext
};
exports["default"] = _default;