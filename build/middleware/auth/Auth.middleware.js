"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatusCodes = _interopRequireWildcard(require("http-status-codes"));
var _helpers = require("../../helpers");
var _config = require("../../config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ApiAuthMiddleware {}
_defineProperty(ApiAuthMiddleware, "use", _helpers.ApiAsyncHelper.AsyncHandlerHelper( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, _res, next) {
    var _headers$authorizatio, _headers$authorizatio2;
    var {
      cookies,
      headers
    } = req;
    if (!((_headers$authorizatio = headers.authorization) !== null && _headers$authorizatio !== void 0 && _headers$authorizatio.includes("Bearer"))) {
      throw new _helpers.ApiErrorResponseHelper(_httpStatusCodes.default.UNAUTHORIZED, "Unauthorised request! access token is missing", (0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.default.UNAUTHORIZED));
    }
    var token = (cookies === null || cookies === void 0 ? void 0 : cookies["token"]) || ((_headers$authorizatio2 = headers.authorization) === null || _headers$authorizatio2 === void 0 ? void 0 : _headers$authorizatio2.replace("Bearer ", ""));
    var decodeToken = yield _helpers.JWTHelper.verifyToken(token, _config.Config.get(_config.IConfig.ACCESS_TOKEN_SECRET));
    var {
      email
    } = decodeToken;
    /** Update the middleware logic as per the requirement */
    if (!email) {
      throw new _helpers.ApiErrorResponseHelper(_httpStatusCodes.default.UNAUTHORIZED, "Invalid user access token", (0, _httpStatusCodes.getReasonPhrase)(_httpStatusCodes.default.UNAUTHORIZED));
    }
    req.user = {};
    next();
  });
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));
var _default = exports.default = ApiAuthMiddleware;
//# sourceMappingURL=Auth.middleware.js.map