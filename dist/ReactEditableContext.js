"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditableContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _components = require("@storybook/components");

var _constants = require("./constants");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = require("@storybook/core-events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createSelectorItem = function createSelectorItem(name, value, change, active) {
  return {
    id: name,
    title: name,
    onClick: function onClick() {
      change({
        selected: value,
        name: name
      });
    },
    value: value,
    active: active
  };
};

var getDisplayedItems = function getDisplayedItems(items, selectedValue, change) {
  var backgroundSelectorItems = items.map(function (_ref) {
    var name = _ref.name,
        value = _ref.value;
    return createSelectorItem(name, value, change, value === selectedValue);
  });
  return backgroundSelectorItems;
};

var EditableContext = function EditableContext() {
  var _useGlobals = (0, _api.useGlobals)(),
      _useGlobals2 = _slicedToArray(_useGlobals, 2),
      _useGlobals2$ = _useGlobals2[0],
      context = _useGlobals2$.context,
      myAddon = _useGlobals2$.myAddon,
      updateGlobals = _useGlobals2[1];

  var contextData = _objectSpread({}, context);

  var toggleMyTool = (0, _react.useCallback)(function () {
    return updateGlobals({
      myAddon: myAddon ? undefined : true
    });
  }, [myAddon]);

  var updateVal = function updateVal() {
    updateGlobals({
      context: contextData
    });

    _addons["default"].getChannel().emit(_coreEvents.FORCE_RE_RENDER);
  };

  if (context === undefined) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
  }

  context.params.forEach(function (param) {
    if (contextData.val[param.field] === undefined) contextData.val[param.field] = param["default"];
  });
  return /*#__PURE__*/_react["default"].createElement(_components.WithTooltip, {
    placement: "top",
    trigger: "click",
    tooltip: context.params.map(function (param) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: param.field,
        className: "editable-context-param"
      }, /*#__PURE__*/_react["default"].createElement("h2", {
        style: {
          padding: "7px 15px",
          fontSize: "14px",
          fontWeight: "bold"
        }
      }, param.name), /*#__PURE__*/_react["default"].createElement(_components.TooltipLinkList, {
        links: getDisplayedItems(param.vals.map(function (value, index) {
          return {
            name: param.names[index],
            value: value
          };
        }), contextData.val[param.field], function (_ref2) {
          var selected = _ref2.selected;
          contextData.val[param.field] = selected;
          updateVal();
        })
      }));
    })
  }, /*#__PURE__*/_react["default"].createElement(_components.IconButton, {
    key: _constants.TOOL_ID,
    active: myAddon,
    title: "ReactEditableContext",
    onClick: toggleMyTool
  }, /*#__PURE__*/_react["default"].createElement(_components.Icons, {
    icon: "cog"
  })));
};

exports.EditableContext = EditableContext;