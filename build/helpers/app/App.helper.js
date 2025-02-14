"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeHttp = _interopRequireDefault(require("node:http"));
var _config = require("../../config");
var _ = require("./..");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class AppHelper {
  static serverErrorListening(error) {
    return _asyncToGenerator(function* () {
      if ((error === null || error === void 0 ? void 0 : error.syscall) !== "listen") {
        throw error;
      }
      switch (error === null || error === void 0 ? void 0 : error.code) {
        case "EACCES":
          _.Log.info("Requires privileges");
          return process.exit(1);
        case "EADDRINUSE":
          _.Log.error("port ".concat(_config.Config.get(_config.IConfig.PORT), " is already in use"));
          return process.exit(1);
        default:
          throw error;
      }
    })();
  }
  static serverListening(server) {
    return _asyncToGenerator(function* () {
      if (server instanceof _nodeHttp.default.Server) {
        var address = server.address();
        _.Log.info("Express engine is running on ".concat(address.port, " \uD83D\uDE80"));
      }
    })();
  }
  static signalListening(http) {
    process.on("SIGINT", /*#__PURE__*/_asyncToGenerator(function* () {
      try {
        if (http instanceof _nodeHttp.default.Server) {
          http.close();
        }
      } catch (SIGINTError) {
        if (SIGINTError instanceof Error) {
          _.Log.error("Error occurred during shutdown server", SIGINTError);
        }
      } finally {
        _.Log.info("Express engine shutdown successfully \uD83C\uDF31");
        process.exit(1);
      }
    })).on("SIGHUP", () => {
      process.kill(process.pid, "SIGTERM");
    }).on("uncaughtException", UncaughtError => {
      _.Log.error("Uncaught Exception thrown", UncaughtError);
      if (http instanceof _nodeHttp.default.Server) {
        http.close();
      }
      process.exit(1);
    }).on("unhandledRejection", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (UncaughtReason) {
        _.Log.error("Unhandled Rejection thrown", UncaughtReason);
        if (http instanceof _nodeHttp.default.Server) {
          http.close();
        }
        process.exit(1);
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
  static validate() {
    return _asyncToGenerator(function* () {
      if (!_config.Config.get(_config.IConfig.PORT) || !_config.Config.get(_config.IConfig.NODE_ENV)) {
        _.Log.error("The node env or PORT mapping is missing! Please check the .env file for the correct mapping.");
        _.Log.error("x-----------------------------------------------x");
        _.Log.error("x==================== ERROR ====================x");
        _.Log.error("x-----------------------------------------------x");
        return false;
      }
      return true;
    })();
  }
}
var _default = exports.default = AppHelper;
//# sourceMappingURL=App.helper.js.map