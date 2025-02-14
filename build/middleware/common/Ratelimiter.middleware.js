"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _httpStatusCodes = require("http-status-codes");
var _helpers = require("../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class RateLimiterMiddleware {
  constructor() {
    _defineProperty(this, "limiter", (0, _expressRateLimit.default)({
      windowMs: 5 * 1000 /** in milliseconds */,
      max: 2,
      // Limit each IP to 2 requests per `window` (here, per 5 seconds)
      message: "You have exceeded the request! please try after some time",
      standardHeaders: true,
      legacyHeaders: false,
      handler: (_, res, __, options) => {
        return res.status(options.statusCode).send(new _helpers.ApiErrorResponseHelper(options.statusCode, options.message, (0, _httpStatusCodes.getReasonPhrase)(options.statusCode)));
      }
    }));
  }
}
var _default = exports.default = RateLimiterMiddleware;
//# sourceMappingURL=Ratelimiter.middleware.js.map