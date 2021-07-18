'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identifier = exports.Keyword = exports.VFunction = exports.VUnquoted = exports.VQuoted = exports.VNull = exports.Value = exports.Key = exports.Entry = exports.Label = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  cursor: pointer;\n'], ['\n  cursor: pointer;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n'], ['\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: inline-block;\n  max-width: 140px;\n  padding-right: 10px;\n  vertical-align: top;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: right;\n  color: ', ';\n'], ['\n  display: inline-block;\n  max-width: 140px;\n  padding-right: 10px;\n  vertical-align: top;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: right;\n  color: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: inline-block;\n  vertical-align: top;\n'], ['\n  display: inline-block;\n  vertical-align: top;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  color: rgb(128, 128, 128);\n  font-style: italic;\n'], ['\n  color: rgb(128, 128, 128);\n  font-style: italic;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  color: rgb(233, 63, 59);\n  white-space: pre;\n'], ['\n  color: rgb(233, 63, 59);\n  white-space: pre;\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  color: ', ';\n'], ['\n  color: ', ';\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  font-style: italic;\n'], ['\n  font-style: italic;\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  color: rgb(242, 85, 217);\n'], ['\n  color: rgb(242, 85, 217);\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Label = exports.Label = _styledComponents2.default.div(_templateObject);

var Entry = exports.Entry = _styledComponents2.default.div(_templateObject2);

var Key = exports.Key = _styledComponents2.default.span(_templateObject3, function (props) {
  return props.theme.identifier;
});

var Value = exports.Value = _styledComponents2.default.div(_templateObject4);

var VNull = exports.VNull = _styledComponents2.default.span(_templateObject5);

var VQuoted = exports.VQuoted = _styledComponents2.default.span(_templateObject6);

var VUnquoted = exports.VUnquoted = _styledComponents2.default.span(_templateObject7, function (props) {
  return props.theme.unquoted;
});

var VFunction = exports.VFunction = _styledComponents2.default.span(_templateObject8);

var Keyword = exports.Keyword = _styledComponents2.default.span(_templateObject9);

var Identifier = exports.Identifier = _styledComponents2.default.span(_templateObject7, function (props) {
  return props.theme.identifier;
});