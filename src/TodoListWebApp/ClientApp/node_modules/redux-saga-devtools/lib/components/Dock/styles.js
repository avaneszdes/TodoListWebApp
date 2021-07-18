'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockPanelBody = exports.DockPanel = exports.DockToggle = exports.DockOverlay = exports.DockContainer = exports.cssResize = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  position: absolute;\n  opacity: 0;\n  left: -5px;\n  width: 10px;\n  top: 0;\n  height: 100%;\n  cursor: col-resize;\n'], ['\n  position: absolute;\n  opacity: 0;\n  left: -5px;\n  width: 10px;\n  top: 0;\n  height: 100%;\n  cursor: col-resize;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: fixed;\n  width: 0px;\n  height: 0px;\n  top: 0px;\n  left: 0px;\n  z-index: 99999999;\n'], ['\n  position: fixed;\n  width: 0px;\n  height: 0px;\n  top: 0px;\n  left: 0px;\n  z-index: 99999999;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  position: fixed;\n  left: 0px;\n  right: 0px;\n  top: 0px;\n  bottom: 0px;\n  z-index: 0;\n  background: rgba(0, 0, 0, 0);\n  opacity: 1;\n  pointer-events: none;\n'], ['\n  position: fixed;\n  left: 0px;\n  right: 0px;\n  top: 0px;\n  bottom: 0px;\n  z-index: 0;\n  background: rgba(0, 0, 0, 0);\n  opacity: 1;\n  pointer-events: none;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  position: fixed;\n  top: 0;\n  right: 0;\n  z-index: 1;\n  margin: 2px;\n'], ['\n  position: fixed;\n  top: 0;\n  right: 0;\n  z-index: 1;\n  margin: 2px;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  position: fixed;\n  z-index: 1;\n  box-shadow: rgba(0, 0, 0, 0.298039) 0px 0px 4px;\n  background: white;\n  right: 0;\n  top: 0px;\n  width: 40%;\n  height: 100%;\n\n  ', '\n'], ['\n  position: fixed;\n  z-index: 1;\n  box-shadow: rgba(0, 0, 0, 0.298039) 0px 0px 4px;\n  background: white;\n  right: 0;\n  top: 0px;\n  width: 40%;\n  height: 100%;\n\n  ', '\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n        border-left: 1px solid rgb(200,200,200);\n      '], ['\n        border-left: 1px solid rgb(200,200,200);\n      ']),
    _templateObject7 = _taggedTemplateLiteral(['\n        transition: width 0.1s ease-out;\n      '], ['\n        transition: width 0.1s ease-out;\n      ']),
    _templateObject8 = _taggedTemplateLiteral(['\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n'], ['\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var cssResize = exports.cssResize = (0, _styledComponents.css)(_templateObject);

var DockContainer = exports.DockContainer = _styledComponents2.default.div(_templateObject2);

var DockOverlay = exports.DockOverlay = _styledComponents2.default.div(_templateObject3);

var DockToggle = exports.DockToggle = _styledComponents2.default.button(_templateObject4);

var DockPanel = exports.DockPanel = _styledComponents2.default.div(_templateObject5, function (p) {
  return p.resizing ? (0, _styledComponents.css)(_templateObject6) : (0, _styledComponents.css)(_templateObject7);
});

var DockPanelBody = exports.DockPanelBody = _styledComponents2.default.div(_templateObject8);