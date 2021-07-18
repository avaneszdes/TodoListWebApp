'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.JSObject = JSObject;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Collapse = require('../Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vnull = _react2.default.createElement(_styles.VNull, null);
var vfuncKeyword = _react2.default.createElement(
  _styles.Keyword,
  null,
  'function'
);

function renderValue(value, isIdentifier, label, onlyPrimitive) {

  if (value === null || value === undefined) {
    return vnull;
  } else if (value instanceof RegExp) {
    return _react2.default.createElement(
      _styles.VQuoted,
      null,
      value
    );
  }

  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type === 'string') {
    if (isIdentifier) {
      return _react2.default.createElement(
        _styles.Identifier,
        null,
        value
      );
    } else {
      return _react2.default.createElement(
        _styles.VQuoted,
        null,
        '\'',
        value,
        '\''
      );
    }
  }
  if (type === 'symbol' || type === 'number' || type === 'boolean') {
    return _react2.default.createElement(
      _styles.VUnquoted,
      null,
      String(value)
    );
  } else if (type === 'function') {
    return _react2.default.createElement(
      _styles.VFunction,
      null,
      vfuncKeyword,
      value.name,
      '()'
    );
  } else if (!onlyPrimitive) {
    if (typeof label === 'string') {
      _react2.default.createElement(
        _styles.Identifier,
        null,
        label
      );
    }
    return _react2.default.createElement(JSObject, { data: value, preview: label });
  }
}

function getObjectSummary(obj) {
  return Array.isArray(obj) ? 'Array[' + obj.length + ']' : obj.constructor.name;
}

function JSValue(_ref) {
  var value = _ref.value,
      isIdentifier = _ref.isIdentifier,
      label = _ref.label;

  return renderValue(value, isIdentifier, label, false);
}

JSValue.propTypes = {
  value: _propTypes2.default.any,
  isIdentifier: _propTypes2.default.bool,
  label: _propTypes2.default.any
};

function JSObject(_ref2) {
  var data = _ref2.data,
      renderLabel = _ref2.renderLabel,
      preview = _ref2.preview,
      ignoreLabelClick = _ref2.ignoreLabelClick;

  var keys = Object.keys(data);
  if (!keys.length) {
    return renderLabel ? renderLabel() : _react2.default.createElement(
      'span',
      null,
      '\'',
      '\''
    );
  }

  if (!renderLabel) {
    renderLabel = function defaultRenderLabel(onClick, collapsed) {
      return _react2.default.createElement(
        _styles.Label,
        { onClick: !ignoreLabelClick ? onClick : null },
        _react2.default.createElement(_Collapse2.default, { onClick: ignoreLabelClick ? onClick : null, collapsed: collapsed }),
        preview || getObjectSummary(data)
      );
    };
  }

  return _react2.default.createElement(
    'div',
    _utils.trapMouseDown,
    _react2.default.createElement(
      _TreeView2.default,
      { renderLabel: renderLabel, defaultCollapsed: true },
      function () {
        return renderObjectDetails(keys, data);
      }
    )
  );
}

function renderObjectDetails(keys, data) {
  return keys.map(function (key) {
    var value = data[key];
    var node = renderValue(value, false, null, true);
    if (node) {
      return _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(_Collapse2.default, { hidden: true }),
        _react2.default.createElement(
          _styles.Key,
          { title: key },
          key,
          ':'
        ),
        _react2.default.createElement(
          _styles.Value,
          null,
          node
        )
      );
    } else {
      var renderRowLabel = function renderRowLabel(onClick, collapsed) {
        return _react2.default.createElement(
          'div',
          { onClick: onClick },
          _react2.default.createElement(_Collapse2.default, { collapsed: collapsed }),
          _react2.default.createElement(
            _styles.Key,
            { title: key },
            key,
            ': '
          ),
          _react2.default.createElement(
            _styles.Value,
            null,
            getObjectSummary(value)
          )
        );
      };
      return _react2.default.createElement(JSObject, { key: key, data: value, renderLabel: renderRowLabel });
    }
  });
}

JSObject.propTypes = {
  data: _propTypes2.default.any.isRequired,
  renderLabel: _propTypes2.default.func,
  preview: _propTypes2.default.any,
  ignoreLabelClick: _propTypes2.default.bool
};

exports.default = JSValue;