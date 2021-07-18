'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  padding: 2px 60px 2px 10px;\n  position: relative;\n\n  &:hover .effect-entry-toolbar {\n    visibility: visible;\n  }\n\n  &:hover .effect-entry-info {\n    visibility: hidden;\n  }\n'], ['\n  padding: 2px 60px 2px 10px;\n  position: relative;\n\n  &:hover .effect-entry-toolbar {\n    visibility: visible;\n  }\n\n  &:hover .effect-entry-info {\n    visibility: hidden;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  position: absolute;\n  right: 0;\n  top:0;\n  visibility: hidden;\n'], ['\n  cursor: pointer;\n  position: absolute;\n  right: 0;\n  top:0;\n  visibility: hidden;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  position: absolute;\n  right: 2px;\n  top:2px;\n  font-style: italic;\n  font-size: 90%;\n  color: gray;\n'], ['\n  position: absolute;\n  right: 2px;\n  top:2px;\n  font-style: italic;\n  font-size: 90%;\n  color: gray;\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require('react-redux');

var _Icons = require('../../components/Icons');

var _Layout = require('../../components/Layout');

var _Collapse = require('../../components/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _Effect = require('../../components/Effect');

var _Effect2 = _interopRequireDefault(_Effect);

var _constants = require('../../store/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var EffectEntryContainer = _styledComponents2.default.div(_templateObject);

var Toolbar = _styledComponents2.default.span(_templateObject2);

var Info = _styledComponents2.default.span(_templateObject3);

var EffectEntry = function (_React$Component) {
  _inherits(EffectEntry, _React$Component);

  function EffectEntry() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EffectEntry);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EffectEntry.__proto__ || Object.getPrototypeOf(EffectEntry)).call.apply(_ref, [this].concat(args))), _this), _this.effectId = _this.props.effectId, _this.onSelect = function () {
      return _this.props.onSelect(_this.effectId);
    }, _this.onCollapse = function () {
      return _this.props.onCollapse(_this.effectId);
    }, _this.onPin = function () {
      return _this.props.onPin(_this.effectId);
    }, _this.onUnpin = function () {
      return _this.props.onUnpin(-1);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EffectEntry, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          effect = _props.effect,
          collapsed = _props.collapsed,
          pinned = _props.pinned,
          hasChildren = _props.hasChildren;


      var pinNode = void 0;
      if (!effect.root) {
        pinNode = pinned ? _react2.default.createElement(
          'div',
          { onClick: this.onUnpin },
          _react2.default.createElement(_Icons.IconUnpin, null)
        ) : _react2.default.createElement(
          'div',
          { onClick: this.onPin },
          _react2.default.createElement(_Icons.IconPin, null)
        );
      }

      return _react2.default.createElement(
        EffectEntryContainer,
        null,
        _react2.default.createElement(
          _Layout.Row,
          { onMouseDown: this.onSelect },
          _react2.default.createElement(
            _Layout.Cell,
            null,
            _react2.default.createElement(_Collapse2.default, {
              collapsed: collapsed,
              hidden: !hasChildren,
              onClick: this.onCollapse
            })
          ),
          _react2.default.createElement(
            _Layout.Cell,
            null,
            _react2.default.createElement(_Effect2.default, { effect: effect })
          )
        ),
        effect.root ? null : _react2.default.createElement(
          Toolbar,
          { className: 'effect-entry-toolbar' },
          pinNode
        ),
        effect.status === _constants.STATUS_PENDING ? null : _react2.default.createElement(
          Info,
          { className: 'effect-entry-info' },
          effect.time.toFixed(0),
          ' ms'
        )
      );
    }
  }]);

  return EffectEntry;
}(_react2.default.Component);

EffectEntry.propTypes = {
  // passed by the parent component
  effectId: _propTypes2.default.number.isRequired,
  selected: _propTypes2.default.bool.isRequired,
  collapsed: _propTypes2.default.bool.isRequired,
  onCollapse: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  // injected by Redux store
  effect: _propTypes2.default.object.isRequired,
  hasChildren: _propTypes2.default.bool.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state, _ref2) {
  var effectId = _ref2.effectId;

  var effect = state.effectsById[effectId];
  return {
    effect: effect,
    hasChildren: state.effectsByParentId[effectId]
  };
})(EffectEntry);