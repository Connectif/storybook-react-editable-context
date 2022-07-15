function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { makeDecorator, useGlobals } from "@storybook/addons";
import React from "react";
import { EditableContext } from "./ReactEditableContext";
var editableContext = {};

var editableContextDecorator = function editableContextDecorator(Ctx, params) {
  editableContext.params = params;
  editableContext.val = {};
  editableContext.params.forEach(function (param) {
    return editableContext.val[param.field] = param["default"];
  });
  return makeDecorator({
    name: "EditableContextDecorator",
    parameterName: "",
    wrapper: function wrapper(Story) {
      var _useGlobals = useGlobals(),
          _useGlobals2 = _slicedToArray(_useGlobals, 2),
          ctx = _useGlobals2[0].context,
          updateGlobals = _useGlobals2[1];

      if (ctx === undefined || ctx === null) {
        ctx = editableContext;
        updateGlobals({
          context: ctx
        });
      }

      return /*#__PURE__*/React.createElement(Ctx.Provider, {
        value: ctx.val
      }, /*#__PURE__*/React.createElement(Story, null));
    }
  });
};

export { editableContextDecorator, editableContext };