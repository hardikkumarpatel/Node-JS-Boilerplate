"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatusCodes = require("http-status-codes");
var _2 = require("./..");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ApiCommonHelper {}
_defineProperty(ApiCommonHelper, "useHealthHelper", (_, res) => {
  var {
    env: {
      NODE_ENV
    },
    platform,
    pid
  } = process;
  return res.status(_httpStatusCodes.StatusCodes.OK).json(new _2.ApiResponseHelper(_httpStatusCodes.StatusCodes.OK, "Welcome to backend! Made in Node with ❤️", {
    mode: NODE_ENV,
    platfrom: platform,
    pid: pid,
    uptime: "".concat(process.uptime(), " seconds"),
    timestamp: Date.now()
  }));
});
_defineProperty(ApiCommonHelper, "useNotFoundHelper", () => {
  throw new _2.ApiErrorResponseHelper(_httpStatusCodes.StatusCodes.NOT_FOUND, "Request resource not found", "The route you are trying to access was not found");
});
var _default = exports.default = ApiCommonHelper;
//# sourceMappingURL=ApiHealth.helper.js.map