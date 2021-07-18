'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n'], ['\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  flex: 1;\n  overflow: auto;\n'], ['\n  flex: 1;\n  overflow: auto;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  background-color: gray;\n  height: 2px;\n  cursor: row-resize;\n'], ['\n  background-color: gray;\n  height: 2px;\n  cursor: row-resize;\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require('react-redux');

var _Divider = require('../../components/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _ActionList = require('../ActionList');

var _ActionList2 = _interopRequireDefault(_ActionList);

var _Reactions = require('../Reactions');

var _Reactions2 = _interopRequireDefault(_Reactions);

var _constants = require('../../store/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var actionListStyle = {
  height: '50%',
  overflow: 'auto'
};

var ActionViewContainer = _styledComponents2.default.div(_templateObject);

var ReactionListContainer = _styledComponents2.default.div(_templateObject2);

var cssResize = (0, _styledComponents.css)(_templateObject3);

var ActionView = function (_React$Component) {
  _inherits(ActionView, _React$Component);

  function ActionView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ActionView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionView.__proto__ || Object.getPrototypeOf(ActionView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.onResizeStart = function () {
      _this.heightOrigin = _this.topNode.offsetHeight;
      _this.setState({ isResizing: true });
    }, _this.onResizeEnd = function (e) {
      _this.setState({ isResizing: false });
    }, _this.onResize = function (deltaY) {
      _this.setState({
        topHeight: Math.max(0, _this.heightOrigin - deltaY)
      });
    }, _this.selectAction = function (action) {
      _this.props.setCurrentAction(action);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ActionView, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.setCurrentAction(null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = void 0,
          topStyle = actionListStyle;
      var topHeight = this.state.topHeight;
      if (topHeight) {
        topStyle = _extends({}, topStyle, { height: topHeight });
      }
      style = { cursor: this.state.isResizing ? 'row-resize' : 'default' };

      var action = this.props.currentAction;

      return _react2.default.createElement(
        ActionViewContainer,
        { style: style },
        _react2.default.createElement(
          'div',
          { style: topStyle, ref: function ref(n) {
              return _this2.topNode = n;
            } },
          _react2.default.createElement(_ActionList2.default, { selectedAction: action, onSelectionChange: this.selectAction })
        ),
        _react2.default.createElement(_Divider2.default, {
          orientation: _Divider2.default.HORIZONTAL,
          css: cssResize,
          onResizeStart: this.onResizeStart,
          onResize: this.onResize,
          onResizeEnd: this.onResizeEnd
        }),
        _react2.default.createElement(
          ReactionListContainer,
          null,
          _react2.default.createElement(_Reactions2.default, { action: action })
        )
      );
    }
  }]);

  return ActionView;
}(_react2.default.Component);

ActionView.propTypes = {
  // Injected by Redux
  currentAction: _propTypes2.default.object,
  setCurrentAction: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return { currentAction: state.sharedRef.currentAction };
}, function (dispatch) {
  return {
    setCurrentAction: function setCurrentAction(action) {
      dispatch({
        type: _constants.SET_SHARED_REF,
        key: 'currentAction',
        sharedRef: action
      });
    }
  };
})(ActionView);