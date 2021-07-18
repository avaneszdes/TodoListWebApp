'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SagaMonitorBody = exports.SagaMonitorOption = exports.SagaMonitorHeader = exports.SagaMonitorContainer = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  font-family: monospace;\n  font-size: 13px;\n  color: ', ';\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background-color: ', ';\n\n  & * {\n    box-sizing: border-box;\n  }\n\n  & [hidden] {\n    visibility: hidden;\n  }\n'], ['\n  font-family: monospace;\n  font-size: 13px;\n  color: ', ';\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background-color: ', ';\n\n  & * {\n    box-sizing: border-box;\n  }\n\n  & [hidden] {\n    visibility: hidden;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  background-color: ', ';\n  border-bottom: 1px solid ', ';\n  position: relative;\n  flex: none;\n\n  & hr {\n    background-color: ', ';\n    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\n    border: none;\n    height: 2px;\n    margin: 0;\n    position: absolute;\n    bottom: -1px;\n    transition: .2s ease-in-out;\n  }\n'], ['\n  background-color: ', ';\n  border-bottom: 1px solid ', ';\n  position: relative;\n  flex: none;\n\n  & hr {\n    background-color: ', ';\n    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\n    border: none;\n    height: 2px;\n    margin: 0;\n    position: absolute;\n    bottom: -1px;\n    transition: .2s ease-in-out;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding: 5px 10px;\n  width: 80px;\n  cursor: pointer;\n\n  &:hover {\n    background-color: ', ';\n  }\n'], ['\n  padding: 5px 10px;\n  width: 80px;\n  cursor: pointer;\n\n  &:hover {\n    background-color: ', ';\n  }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  flex: auto;\n  margin-top: 10px;\n'], ['\n  display: flex;\n  flex-direction: column;\n  flex: auto;\n  margin-top: 10px;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SagaMonitorContainer = exports.SagaMonitorContainer = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.fontColor;
}, function (props) {
  return props.theme.background;
});

var SagaMonitorHeader = exports.SagaMonitorHeader = _styledComponents2.default.section(_templateObject2, function (props) {
  return props.theme.headerBackground;
}, function (props) {
  return props.theme.border;
}, function (props) {
  return props.theme.selectedHeader;
});

var SagaMonitorOption = exports.SagaMonitorOption = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.headerHighlight;
});

var SagaMonitorBody = exports.SagaMonitorBody = _styledComponents2.default.section(_templateObject4);