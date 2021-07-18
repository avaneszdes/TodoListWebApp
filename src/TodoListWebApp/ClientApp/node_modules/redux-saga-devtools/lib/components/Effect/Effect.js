'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  color: ', ';\n  margin-right: 5px;\n'], ['\n  color: ', ';\n  margin-right: 5px;\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('redux-saga/utils');

var _Layout = require('../Layout');

var _SagaValue = require('../SagaValue');

var _SagaValue2 = _interopRequireDefault(_SagaValue);

var _Result = require('./Result');

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var EffectType = _styledComponents2.default.span(_templateObject, function (props) {
  return props.theme.effectType;
});

/* eslint-disable no-cond-assign */

var Effect = function (_React$Component) {
  _inherits(Effect, _React$Component);

  function Effect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Effect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Effect.__proto__ || Object.getPrototypeOf(Effect)).call.apply(_ref, [this].concat(args))), _this), _this.effectId = _this.props.effect.effectId, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Effect, [{
    key: 'renderResult',
    value: function renderResult(status, result, error, winner) {
      return _react2.default.createElement(_Result2.default, { status: status, result: result, error: error, winner: winner });
    }
  }, {
    key: 'render',
    value: function render() {
      var effect = this.props.effect;
      var status = effect.status,
          result = effect.result,
          error = effect.error,
          winner = effect.winner;


      var nodes = [];
      var data = void 0;

      if (effect.root) {
        nodes = nodes.concat(renderFuncCall(effect.effect.saga, effect.effect.args), this.renderResult(status, result, error));
      }

      // ACTION CHANNEL
      else if (data = _utils.asEffect.actionChannel(effect.effect)) {
          nodes = nodes.concat(renderEffectType('actionChannel'), _react2.default.createElement(_SagaValue2.default, { value: data.action, isIdentifier: true }), this.renderResult(status, result, error, winner));
        }

        // ALL
        else if (data = _utils.asEffect.all(effect.effect)) {
            nodes = nodes.concat(renderEffectType('all'), this.renderResult(status, result, error, winner));
          }

          // CALL
          else if (data = _utils.asEffect.call(effect.effect)) {
              nodes = nodes.concat(renderEffectType('call'), renderFuncCall(data.fn, data.args), this.renderResult(status, result, error, winner));
            }

            // CANCEL
            else if (data = _utils.asEffect.cancel(effect.effect)) {
                nodes = nodes.concat(renderEffectType('cancel'), _react2.default.createElement(_SagaValue2.default, { value: data, isIdentifier: true, label: data.name }));
              }

              // CPS
              else if (data = _utils.asEffect.cps(effect.effect)) {
                  nodes = nodes.concat(renderEffectType('cps'), renderFuncCall(data.fn, data.args), this.renderResult(status, result, error, winner));
                }

                // FLUSH
                else if (data = _utils.asEffect.flush(effect.effect)) {
                    nodes = nodes.concat(renderEffectType('flush'), renderFuncCall(data), this.renderResult(status, result, error, winner));
                  }

                  // FORK
                  else if (data = _utils.asEffect.fork(effect.effect)) {
                      nodes = nodes.concat(renderEffectType('fork'), renderFuncCall(data.fn, data.args), this.renderResult(status, result, error, winner));
                    }

                    // GET CONTEXT
                    else if (data = _utils.asEffect.getContext(effect.effect)) {
                        nodes = nodes.concat(renderEffectType('getContext'), _react2.default.createElement(_SagaValue2.default, { value: data, isIdentifier: true }), this.renderResult(status, result, error, winner));
                      }

                      // JOIN
                      else if (data = _utils.asEffect.join(effect.effect)) {
                          nodes = nodes.concat(renderEffectType('join'), _react2.default.createElement(_SagaValue2.default, { value: data, isIdentifier: true, label: data.name }), this.renderResult(status, result, error, winner));
                        }

                        // PUT
                        else if (data = _utils.asEffect.put(effect.effect)) {
                            nodes = nodes.concat(renderEffectType('put'), _react2.default.createElement(_SagaValue2.default, { value: data.channel || data.action, label: data.action.type, isIdentifier: true }));
                          }

                          // RACE
                          else if (data = _utils.asEffect.race(effect.effect)) {
                              nodes = nodes.concat(renderEffectType('race'), this.renderResult(status, result, error, winner));
                            }

                            // SELECT
                            else if (data = _utils.asEffect.select(effect.effect)) {
                                nodes = nodes.concat(renderEffectType('select'), renderFuncCall(data.selector, data.args), this.renderResult(status, result, error, winner));
                              }

                              // SET CONTEXT
                              else if (data = _utils.asEffect.setContext(effect.effect)) {
                                  nodes = nodes.concat(renderEffectType('setContext'), renderFuncCall({ name: "" }, [data]));
                                }

                                // TAKE
                                else if (data = _utils.asEffect.take(effect.effect)) {
                                    nodes = nodes.concat(renderEffectType('take'), _react2.default.createElement(_SagaValue2.default, { value: data.pattern || data.channel, isIdentifier: true }), this.renderResult(status, result, error, winner));
                                  } else if (_utils.is.array(effect.effect)) {
                                    nodes = nodes.concat(renderEffectType('all'));
                                  } else if (data = _utils.asEffect.cancelled(effect.effect)) {
                                    nodes = nodes.concat(renderEffectType('cancelled(?)'), this.renderResult(status, result, error, winner));
                                  } else if (_utils.is.iterator(effect.effect)) {
                                    nodes = nodes.concat(renderEffectType(effect.effect.name), this.renderResult(status, result, error, winner));
                                  } else {
                                    nodes = nodes.concat(renderEffectType('Unknown'), this.renderResult(status, result, error, winner));
                                  }

      return renderEffect(effect, status, nodes);
    }
  }]);

  return Effect;
}(_react2.default.Component);

function renderEffect(effect, status, nodes) {
  return _react2.default.createElement(
    _Layout.Row,
    null,
    nodes.map(function (node, idx) {
      return _react2.default.createElement(
        _Layout.Cell,
        { key: idx },
        node
      );
    })
  );
}

function renderEffectType(type) {
  return _react2.default.createElement(
    EffectType,
    null,
    type
  );
}

function renderFuncCall(fn, args) {
  if (!args.length) {
    return _react2.default.createElement(
      'span',
      null,
      fn.name,
      '()'
    );
  }

  return [_react2.default.createElement(
    'span',
    null,
    fn.name,
    '('
  )].concat(_toConsumableArray(renderFuncArgs(args)), [_react2.default.createElement(
    'span',
    null,
    ')'
  )]);
}

function renderFuncArgs(args) {
  var elements = [];
  args.forEach(function (arg, idx) {
    elements.push(_react2.default.createElement(_SagaValue2.default, { value: arg }));
    if (idx < args.length - 1) {
      elements.push(_react2.default.createElement(
        'span',
        null,
        ', '
      ));
    }
  });
  return elements;
}

Effect.propTypes = {
  effect: _propTypes2.default.object.isRequired
};

exports.default = Effect;