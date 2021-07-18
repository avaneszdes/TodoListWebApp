'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  font-size: 90%;\n  display: block;\n'], ['\n  font-size: 90%;\n  display: block;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  padding: 5px;\n  color: ', ';\n  background-color: ', ';\n  border-left: 1px solid rgb(204, 204, 204);\n  position: relative;\n\n  &:hover {\n    background-color: ', ';\n  }\n'], ['\n  cursor: pointer;\n  padding: 5px;\n  color: ', ';\n  background-color: ', ';\n  border-left: 1px solid rgb(204, 204, 204);\n  position: relative;\n\n  &:hover {\n    background-color: ', ';\n  }\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Layout = require('../Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ifSelected(ifTrue, ifNot) {
  return function (p) {
    return p.selected ? ifTrue : ifNot;
  };
}

var BreadcrumbContainer = _styledComponents2.default.div(_templateObject);

var BreadcrumbElement = _styledComponents2.default.div(_templateObject2, ifSelected('white'), ifSelected(function (props) {
  return props.theme.selectedBreadcrumb;
}, function (props) {
  return props.theme.footerBackground;
}), ifSelected(function (props) {
  return props.theme.selectedBreadcrumb;
}, function (props) {
  return props.theme.footerHighlight;
}));

function Breadcrumb(_ref) {
  var selectedIdx = _ref.selectedIdx,
      nodes = _ref.nodes;

  return _react2.default.createElement(
    _Layout.Row,
    null,
    _react2.default.createElement(
      BreadcrumbContainer,
      null,
      nodes.map(function (node, idx) {
        return _react2.default.createElement(
          _Layout.Cell,
          { key: idx },
          _react2.default.createElement(
            BreadcrumbElement,
            { selected: idx === selectedIdx },
            node
          )
        );
      })
    )
  );
}

Breadcrumb.propTypes = {
  selectedIdx: _propTypes2.default.number.isRequired,
  nodes: _propTypes2.default.array.isRequired
};

exports.default = Breadcrumb;