"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _helpers = require("./helpers");
var _middleware = require("./middleware");
var _routes = _interopRequireDefault(require("./routes"));
var _config2 = require("./config");
var _swagger = require("./swagger");
var _mongodb = require("./database/mongodb");
var _sql = require("./database/sql");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
class ExpressEngine {
  constructor() {
    this.app = (0, _express.default)();
    this.PORT = _config2.Config.get(_config2.IConfig.PORT);
  }
  run() {
    var _this = this;
    return _asyncToGenerator(function* () {
      if (!(yield _helpers.AppHelper.validate())) process.exit(1);
      yield _this.startApp().then(_helpers.AppHelper.signalListening).catch(_helpers.Log.error);
    })();
  }
  startApp() {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      _this2.server = _http.default.createServer(_this2.app);
      _this2.app.set("port", _this2.PORT);
      _this2.server.on("error", _helpers.AppHelper.serverErrorListening);
      _this2.server.on("close", _helpers.Log.info);
      _this2.server.on("listening", /*#__PURE__*/_asyncToGenerator(function* () {
        yield _helpers.AppHelper.serverListening(_this2.server).then(_this2.initialize());
      }));
      _this2.server.listen(_this2.PORT);
      return _this2.server;
    })();
  }
  initialize() {
    var _this3 = this;
    return _asyncToGenerator(function* () {
      // await MongoDBConnection.connect();
      // await SequelizeDBConnection.connect();
      yield _this3.initializeMiddleware();
      yield _this3.initializeRoutes();
      yield _this3.initializeSwaggerDocs();
      yield _this3.initializeSocketApp();
      yield _this3.initializeGlobalMiddleware();
    })();
  }
  initializeMiddleware() {
    var _this4 = this;
    return _asyncToGenerator(function* () {
      _this4.app.use(_express.default.urlencoded({
        extended: true
      }));
      _this4.app.use(_express.default.json({
        limit: "6kb"
      }));
      _this4.app.use(new _middleware.MorganLogMiddleware().success);
      _this4.app.use(new _middleware.MorganLogMiddleware().error);
      _this4.app.use("/upload", _express.default.static(_path.default.resolve("src", "upload")));
      _this4.app.use((0, _cors.default)({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "OPTIONS", "PATCH", "POST", "DELETE"]
      }));
      _this4.app.use((0, _helmet.default)({
        contentSecurityPolicy: false
      }));
      _this4.app.use((0, _cookieParser.default)());
    })();
  }
  initializeRoutes() {
    var _this5 = this;
    return _asyncToGenerator(function* () {
      _this5.app.use("/health", _helpers.ApiCommonHelper.useHealthHelper);
      _this5.app.use(_routes.default);
    })();
  }
  initializeSwaggerDocs() {
    var _this6 = this;
    return _asyncToGenerator(function* () {
      yield new _swagger.SwaggerApp(_this6.app).initialize().then(_helpers.Log.info).catch(_helpers.Log.error);
    })();
  }
  initializeSocketApp() {
    var _this7 = this;
    return _asyncToGenerator(function* () {
      yield new _helpers.SocketAppHelper(_this7.server).initialize().then(_helpers.Log.info).catch(_helpers.Log.error);
    })();
  }
  initializeGlobalMiddleware() {
    var _this8 = this;
    return _asyncToGenerator(function* () {
      _this8.app.use("*", _helpers.ApiCommonHelper.useNotFoundHelper);
      _this8.app.use(_middleware.ApiErrorMiddleware.use);
    })();
  }
}
var _default = exports.default = ExpressEngine;
//# sourceMappingURL=app.js.map