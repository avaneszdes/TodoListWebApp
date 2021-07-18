'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  user-select: none;\n'], ['\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  user-select: none;\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Icons = require('../Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CollapseContainer = _styledComponents2.default.div(_templateObject);

function Collapse(_ref) {
  var collapsed = _ref.collapsed,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['collapsed', 'onClick']);

  return _react2.default.createElement(
    CollapseContainer,
    _extends({ onClick: onClick }, rest),
    collapsed ? _react2.default.createElement(_Icons.IconUnfold, null) : _react2.default.createElement(_Icons.IconFold, null)
  );
}

Collapse.propTypes = {
  collapsed: _propTypes2.default.bool,
  onClick: _propTypes2.default.func
};

exports.default = Collapse;