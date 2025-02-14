"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _expressValidator = require("express-validator");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class UserValidator {
  constructor() {}
}
_defineProperty(UserValidator, "loginUserValidator", () => {
  return [(0, _expressValidator.body)("email").trim().notEmpty().withMessage("email is required").isEmail().withMessage("email please use the correct email format: mailto:user@example.com"), (0, _expressValidator.body)("password").trim().notEmpty().withMessage("password is required")];
});
var _default = exports.default = UserValidator;
//# sourceMappingURL=User.validator.js.map