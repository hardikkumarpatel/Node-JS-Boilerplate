"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var routes = (0, _express.Router)();
routes.use("/user", require("./User/User.routes").default);
var _default = exports.default = routes;
//# sourceMappingURL=index.js.map