"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../../config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class JWTHelper {
  constructor() {}
}
_defineProperty(JWTHelper, "generateAccessToken", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (user) {
    var {
      id,
      email
    } = user;
    return _jsonwebtoken.default.sign({
      id,
      email
    }, _config.Config.get(_config.IConfig.ACCESS_TOKEN_SECRET), {
      expiresIn: _config.Config.get(_config.IConfig.ACCESS_TOKEN_EXPIRY)
    });
  });
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
_defineProperty(JWTHelper, "generateRefreshToken", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (user) {
    var {
      id
    } = user;
    return _jsonwebtoken.default.sign({
      id
    }, _config.Config.get(_config.IConfig.REFRESH_TOKEN_SECRET), {
      expiresIn: _config.Config.get(_config.IConfig.REFRESH_TOKEN_EXPIRY)
    });
  });
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(JWTHelper, "generateResetPasswordToken", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (user) {
    var {
      id,
      email
    } = user;
    return _jsonwebtoken.default.sign({
      id,
      email
    }, _config.Config.get(_config.IConfig.RESET_PASSWORD_TOKEN_SECRET), {
      expiresIn: _config.Config.get(_config.IConfig.RESET_PASSWORD_TOKEN_EXPIRY)
    });
  });
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
_defineProperty(JWTHelper, "verifyToken", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (token, secret) {
    return _jsonwebtoken.default.verify(token, secret);
  });
  return function (_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = exports.default = JWTHelper;
//# sourceMappingURL=JWT.helper.js.map