"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _helpers = require("../../../helpers");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class MongoDBConnection {
  static connect() {
    return _asyncToGenerator(function* () {
      /* eslint-disable no-useless-catch */
      try {
        var connection = yield _mongoose.default.connect("");
        global.MongoDB = typeof connection;
        _helpers.Log.info("MongoDB Database connected. 🌱");
      } catch (MongoDBConnectionException) {
        throw MongoDBConnectionException;
      }
    })();
  }
}
exports.default = MongoDBConnection;
//# sourceMappingURL=Mongodb.connections.js.map