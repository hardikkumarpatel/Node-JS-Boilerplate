"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = require("multer");
var _httpStatusCodes = require("http-status-codes");
var _ = require("./..");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ErrorHelper {
  static capture(errors, res) {
    if (errors instanceof _multer.MulterError) {
      console.log("errors", errors);
      if (errors.code === "LIMIT_FILE_SIZE") {
        return res.status(_httpStatusCodes.StatusCodes.REQUEST_TOO_LONG).send(ErrorHelper.json(_httpStatusCodes.StatusCodes.REQUEST_TOO_LONG, errors.code, "File size is too large. Max size is 1MB"));
      } else if (errors.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send(ErrorHelper.json(_httpStatusCodes.StatusCodes.BAD_REQUEST, errors.code, "Unexpected field. ".concat(errors.field)));
      } else if (errors.code === "INVALID_FILE_TYPE") {
        return res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).send(ErrorHelper.json(_httpStatusCodes.StatusCodes.BAD_REQUEST, errors.code, errors.field));
      } else {
        return res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send(ErrorHelper.json(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, errors.code, "An unknown error occurred during the file upload"));
      }
    }
  }
}
_defineProperty(ErrorHelper, "json", function (code, message, error) {
  var stack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return new _.ApiErrorResponseHelper(code, message, error, stack);
});
var _default = exports.default = ErrorHelper;
//# sourceMappingURL=Error.helper.js.map