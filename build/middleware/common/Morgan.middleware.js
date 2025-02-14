"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var _helpers = require("../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class MorganLogMiddleware {
  constructor() {
    _defineProperty(this, "success", (0, _morgan.default)("short", {
      skip: (_, res) => res.statusCode >= 400,
      stream: {
        write: _helpers.Log.http
      }
    }));
    _defineProperty(this, "error", (0, _morgan.default)("short", {
      skip: (_, res) => res.statusCode < 400,
      stream: {
        write: _helpers.Log.error
      }
    }));
    _morgan.default.token("message", (_, res) => res.locals.message || "");
  }
}
var _default = exports.default = MorganLogMiddleware;
//# sourceMappingURL=Morgan.middleware.js.map