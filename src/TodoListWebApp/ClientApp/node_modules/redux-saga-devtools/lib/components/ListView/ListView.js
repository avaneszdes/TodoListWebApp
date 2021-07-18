'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['background-color: rgba(56, 121, 217, 0.1)'], ['background-color: rgba(56, 121, 217, 0.1)']),
    _templateObject2 = _taggedTemplateLiteral(['\n  outline: none;\n  cursor: default;\n  user-select: none;\n'], ['\n  outline: none;\n  cursor: default;\n  user-select: none;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  border-bottom: 1px solid ', ';\n  outline: ', ';\n  ', '\n  ', ';\n\n  &:hover {\n    ', '\n  }\n'], ['\n  border-bottom: 1px solid ', ';\n  outline: ', ';\n  ', '\n  ', ';\n\n  &:hover {\n    ', '\n  }\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var outline = '1px dotted rgb(33,33,33)';
var bgHover = (0, _styledComponents.css)(_templateObject);

var ListViewContainer = _styledComponents2.default.div(_templateObject2);

var ListEntry = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.border;
}, function (p) {
  return p.selected ? outline : 'none';
}, function (p) {
  return p.selected ? bgHover : '';
}, function (p) {
  return p.css;
}, function (p) {
  return !p.selected ? bgHover : '';
});

var DEFAULT_INDENT = 16;

var ListView = function (_React$Component) {
  _inherits(ListView, _React$Component);

  function ListView() {
    _classCallCheck(this, ListView);

    return _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).apply(this, arguments));
  }

  _createClass(ListView, [{
    key: 'render',
    value: function render() {
      var indent = this.props.indent || DEFAULT_INDENT;

      return _react2.default.createElement(
        ListViewContainer,
        null,
        this.props.nodes.map(function (node) {
          var depth = node.props.depth;
          var style = depth ? { marginLeft: depth * indent } : null;

          return _react2.default.createElement(
            ListEntry,
            {
              key: node.props.id,
              selected: node.props.selected,
              css: node.props.css
            },
            _react2.default.createElement(
              'div',
              { style: style },
              node
            )
          );
        })
      );
    }
  }]);

  return ListView;
}(_react2.default.Component);

ListView.propTypes = {
  nodes: _propTypes2.default.array.isRequired
};

exports.default = ListView;