'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSagaMonitor = undefined;
exports.DockableSagaView = DockableSagaView;
exports.SagaView = SagaView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _SagaMonitorView = require('./containers/SagaMonitorView');

var _SagaMonitorView2 = _interopRequireDefault(_SagaMonitorView);

var _createSagaMonitor = require('./store/createSagaMonitor');

var _createSagaMonitor2 = _interopRequireDefault(_createSagaMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DockableSagaView(_ref) {
  var monitor = _ref.monitor,
      darkTheme = _ref.darkTheme;

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: monitor.store },
    _react2.default.createElement(_SagaMonitorView.DockedSagaMonitorView, { darkTheme: darkTheme })
  );
}

function SagaView(_ref2) {
  var monitor = _ref2.monitor,
      darkTheme = _ref2.darkTheme;

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: monitor.store },
    _react2.default.createElement(_SagaMonitorView2.default, { darkTheme: darkTheme })
  );
}

exports.createSagaMonitor = _createSagaMonitor2.default;