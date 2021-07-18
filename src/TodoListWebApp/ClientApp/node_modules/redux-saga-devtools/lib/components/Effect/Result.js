'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Result;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Icons = require('../Icons');

var _Layout = require('../Layout');

var _JSValue = require('../JSValue');

var _JSValue2 = _interopRequireDefault(_JSValue);

var _SagaValue = require('../SagaValue');

var _SagaValue2 = _interopRequireDefault(_SagaValue);

var _constants = require('../../store/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  separator: {
    margin: '0 0.5em'
  },
  winner: {
    color: 'rgb(85, 139, 47)'
  },
  cancelled: {
    color: 'rgb(233, 30, 99)'
  },
  error: {
    color: 'rgb(230, 25, 25)'
  },
  pending: {
    fontSize: '0.6em',
    verticalAlign: 'super'
  }
};

var separator = _react2.default.createElement(
  'span',
  { style: styles.separator },
  '\u2192'
);

var pendingIcon = _react2.default.createElement(
  _Layout.Cell,
  { style: styles.pending },
  _react2.default.createElement(_Icons.IconPending, null)
);

var winnerIcon = _react2.default.createElement(
  _Layout.Cell,
  { style: styles.winner },
  _react2.default.createElement(_Icons.IconOk, null)
);

var errorIcon = _react2.default.createElement(
  _Layout.Cell,
  { style: styles.error },
  _react2.default.createElement(_Icons.IconError, null)
);

var cancelIcon = _react2.default.createElement(
  _Layout.Cell,
  { style: styles.cancelled },
  _react2.default.createElement(_Icons.IconCancel, null)
);

function renderResolved(result, winner) {
  return _react2.default.createElement(
    'div',
    null,
    separator,
    winner ? winnerIcon : null,
    _react2.default.createElement(
      _Layout.Cell,
      null,
      _react2.default.createElement(_SagaValue2.default, { value: result })
    )
  );
}

function renderRejected(error) {
  return _react2.default.createElement(
    'div',
    null,
    separator,
    errorIcon,
    _react2.default.createElement(
      _Layout.Cell,
      null,
      _react2.default.createElement(_JSValue2.default, { value: error })
    )
  );
}

function Result(_ref) {
  var status = _ref.status,
      result = _ref.result,
      error = _ref.error,
      winner = _ref.winner;

  switch (status) {
    case _constants.STATUS_PENDING:
      return pendingIcon;
    case _constants.STATUS_RESOLVED:
      return renderResolved(result, winner);
    case _constants.STATUS_REJECTED:
      return renderRejected(error);
    case _constants.STATUS_CANCELLED:
      return cancelIcon;
    default:
  }
}