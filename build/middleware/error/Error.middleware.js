"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = require("multer");
var _httpStatusCodes = require("http-status-codes");
var _helpers = require("../../helpers");
var _Error = _interopRequireDefault(require("../../helpers/app/Error.helper"));
var _config = require("../../config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ApiErrorMiddleware {}
// eslint-disable-next-line no-unused-vars
_defineProperty(ApiErrorMiddleware, "use", (errors, _req, res, _next) => {
  if (errors instanceof _multer.MulterError) {
    return _Error.default.capture(errors, res);
  }
  var error = errors;
  if (!error.statusCode) {
    error = new _helpers.ApiErrorResponseHelper(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, (0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR), errors.message, errors.stack);
  }
  if (_config.Config.isDev()) {
    _helpers.Log.error(error.message, error);
  }
  if (_config.Config.isProduction()) {
    error.errors.map(err => {
      if (err.extensions && err.extensions.stacktrace) {
        err.extensions.stacktrace = [];
      }
    });
  }
  var response = _objectSpread({}, error);
  return res.status(error.statusCode).json(response);
});
var _default = exports.default = ApiErrorMiddleware;
//# sourceMappingURL=Error.middleware.js.map