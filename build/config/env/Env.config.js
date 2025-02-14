"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IConfig = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var IConfig = exports.IConfig = Object.freeze({
  NODE_ENV: "NODE_ENV",
  PORT: "PORT",
  DB_HOST: "DB_HOST",
  DB_USER: "DB_USER",
  DB_PASS: "DB_PASS",
  DB_NAME: "DB_NAME",
  DB_DIALECT: "DB_DIALECT",
  DB_PORT: "DB_PORT",
  ACCESS_TOKEN_SECRET: "ACCESS_TOKEN_SECRET",
  ACCESS_TOKEN_EXPIRY: "ACCESS_TOKEN_EXPIRY",
  REFRESH_TOKEN_SECRET: "REFRESH_TOKEN_SECRET",
  REFRESH_TOKEN_EXPIRY: "REFRESH_TOKEN_EXPIRY",
  RESET_PASSWORD_TOKEN_SECRET: "RESET_PASSWORD_TOKEN_SECRET",
  RESET_PASSWORD_TOKEN_EXPIRY: "RESET_PASSWORD_TOKEN_EXPIRY",
  LOG_LEVEL: "LOG_LEVEL",
  AUTH_PASSWORD: "AUTH_PASSWORD"
});
class Config {
  constructor() {
    _defineProperty(this, "config", new Map());
    this.load();
  }
  load() {
    Object.keys(process.env).forEach(key => this.config.set(key, process.env[key]));
  }
  get(key) {
    return this.config.get(key);
  }
  isProduction() {
    return this.get(IConfig.NODE_ENV) === "production";
  }
  isStaging() {
    return this.get(IConfig.NODE_ENV) === "staging";
  }
  isDev() {
    return !this.isProduction() && !this.isStaging();
  }
}
var _default = exports.default = new Config();
//# sourceMappingURL=Env.config.js.map