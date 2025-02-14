"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var date = () => {
  return new Date(Date.now()).toISOString();
};
class LoggerHelper {
  static print() {
    return _winston.default.createLogger({
      level: process.env.LOG_LEVEL,
      levels: _winston.default.config.npm.levels,
      transports: [new _winston.default.transports.Console()],
      format: _winston.default.format.combine(_winston.default.format.colorize({
        level: true,
        message: true,
        colors: {
          error: "red",
          info: "green",
          debug: "green",
          http: "blue"
        }
      }), _winston.default.format.timestamp({
        format: date()
      }), _winston.default.format.simple(), _winston.default.format.printf(info => {
        var printMessage = "[".concat(info.timestamp, "] [").concat(info.level, "]: ").concat(info.message);
        if (info.metadata) {
          if (info.metadata instanceof Error) {
            var {
              message,
              stack
            } = info.metadata;
            var errorMessage = JSON.stringify({
              message,
              stack
            }, null, 2);
            return "".concat(printMessage, " | ").concat(errorMessage);
          }
          if (typeof info.metadata === "object") {
            var _message = JSON.stringify(info.metadata, null, 2);
            return "".concat(printMessage, " | ").concat(_message);
          }
          if (typeof info.metadata === "number") {
            return "".concat(printMessage, " | ").concat(info.metadata);
          }
          return "".concat(printMessage, " | ").concat(info.metadata);
        }
        return printMessage;
      }))
    });
  }
  static info(message) {
    return _asyncToGenerator(function* () {
      LoggerHelper.print().info(message);
    })();
  }
  static info(message, metadata) {
    return _asyncToGenerator(function* () {
      LoggerHelper.print().info(message, {
        metadata
      });
    })();
  }
  static debug(message) {
    return _asyncToGenerator(function* () {
      LoggerHelper.print().debug(message);
    })();
  }
  static debug(message, metadata) {
    return _asyncToGenerator(function* () {
      LoggerHelper.print().debug(message, {
        metadata
      });
    })();
  }
  static error(message) {
    return _asyncToGenerator(function* () {
      LoggerHelper.print().error(message);
    })();
  }
  static error(message, metadata) {
    return _asyncToGenerator(function* () {
      LoggerHelper.print().error(message, {
        metadata
      });
    })();
  }
  static http(message) {
    return _asyncToGenerator(function* () {
      LoggerHelper.print().http(message);
    })();
  }
}
var _default = exports.default = LoggerHelper;
//# sourceMappingURL=Logger.helper.js.map