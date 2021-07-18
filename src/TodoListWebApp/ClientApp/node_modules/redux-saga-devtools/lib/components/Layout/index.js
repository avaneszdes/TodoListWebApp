'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = exports.Row = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  margin: 0;\n  padding: 0;\n  white-space: nowrap;\n  width: 100%;\n  height: 100%;\n'], ['\n  margin: 0;\n  padding: 0;\n  white-space: nowrap;\n  width: 100%;\n  height: 100%;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: inline-block;\n  vertical-align: top;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin: 0;\n  padding: 0;\n'], ['\n  display: inline-block;\n  vertical-align: top;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin: 0;\n  padding: 0;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Row = exports.Row = _styledComponents2.default.div(_templateObject);

var Cell = exports.Cell = _styledComponents2.default.div(_templateObject2);