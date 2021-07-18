'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  position: relative;\n  width: 100%;\n  height: 100%;\n'], ['\n  position: relative;\n  width: 100%;\n  height: 100%;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  color: rgb(211, 211, 211);\n  position: absolute;\n  text-align: center;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n'], ['\n  color: rgb(211, 211, 211);\n  position: absolute;\n  text-align: center;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require('react-redux');

var _EffectView = require('../EffectView');

var _EffectView2 = _interopRequireDefault(_EffectView);

var _selectors = require('../../store/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ReactionsContainer = _styledComponents2.default.div(_templateObject);

var EmptyMsg = _styledComponents2.default.h1(_templateObject2);

var NoSelectedAction = _react2.default.createElement(
  EmptyMsg,
  null,
  'Select an action from the top panel to view its Reactions'
);

var NoReactions = function NoReactions(_ref) {
  var action = _ref.action;
  return _react2.default.createElement(
    EmptyMsg,
    null,
    'No Reaction was found for ',
    action.action.type
  );
};

var Reactions = function (_React$Component) {
  _inherits(Reactions, _React$Component);

  function Reactions() {
    _classCallCheck(this, Reactions);

    return _possibleConstructorReturn(this, (Reactions.__proto__ || Object.getPrototypeOf(Reactions)).apply(this, arguments));
  }

  _createClass(Reactions, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          action = _props.action,
          reactions = _props.reactions;


      return _react2.default.createElement(
        ReactionsContainer,
        null,
        !action ? NoSelectedAction : reactions && reactions.length ? _react2.default.createElement(_EffectView2.default, { rootEffectIds: reactions }) : _react2.default.createElement(NoReactions, { action: action })
      );
    }
  }]);

  return Reactions;
}(_react2.default.Component);

Reactions.propTypes = {
  // Provided by the parent Component
  action: _propTypes2.default.object,
  // Injected by Redux
  reactions: _propTypes2.default.array
};

exports.default = (0, _reactRedux.connect)(function (state, props) {
  return {
    reactions: props.action ? (0, _selectors.getReactions)(state, props.action.action) : null
  };
})(Reactions);