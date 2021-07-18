'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Divider = require('../Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_CODE_F9 = 120;

var Dock = function (_React$Component) {
    _inherits(Dock, _React$Component);

    function Dock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Dock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dock.__proto__ || Object.getPrototypeOf(Dock)).call.apply(_ref, [this].concat(args))), _this), _this.node = null, _this.state = {
            visible: false,
            width: 500,
            isResizing: false
        }, _this.handleKeyUp = function (e) {
            return e.keyCode === KEY_CODE_F9 ? _this.onToggleDock() : null;
        }, _this.componentDidMount = function () {
            return document.addEventListener('keyup', _this.handleKeyUp);
        }, _this.componentWillUnmount = function () {
            return document.removeEventListener('keyup', _this.handleKeyUp);
        }, _this.onToggleDock = function () {
            _this.setState(function (state) {
                return { visible: !state.visible };
            });
        }, _this.onResizeStart = function () {
            _this.widthOrigin = _this.state.width;
            _this.setState({ isResizing: true });
        }, _this.onResizeEnd = function (e) {
            _this.setState({ isResizing: false });
        }, _this.onResize = function (deltaX) {
            _this.setState(function (state) {
                return {
                    width: Math.max(0, _this.widthOrigin + deltaX)
                };
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    } //F9

    _createClass(Dock, [{
        key: 'render',
        value: function render() {
            var style = {
                width: this.state.visible ? this.state.width : 0
            };

            return _react2.default.createElement(
                _styles.DockContainer,
                null,
                _react2.default.createElement(
                    _styles.DockPanel,
                    { resizing: this.state.isResizing, style: style },
                    _react2.default.createElement(_styles.DockOverlay, null),
                    this.state.visible ? _react2.default.createElement(
                        _styles.DockToggle,
                        { onClick: this.onToggleDock },
                        'Toggle'
                    ) : null,
                    _react2.default.createElement(_Divider2.default, {
                        css: _styles.cssResize,
                        onResizeStart: this.onResizeStart,
                        onResize: this.onResize,
                        onResizeEnd: this.onResizeEnd
                    }),
                    _react2.default.createElement(
                        _styles.DockPanelBody,
                        null,
                        this.props.children
                    )
                )
            );
        }
    }]);

    return Dock;
}(_react2.default.Component);

exports.default = Dock;