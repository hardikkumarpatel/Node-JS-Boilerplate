"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _controller = require("../../../controller");
var _middleware = require("../../../middleware");
var _Roles = require("../../../config/role/Roles.config");
var UserRoutes = (0, _express.Router)();
UserRoutes.use(_middleware.ApiAuthMiddleware.use);
UserRoutes.route("/create").get(_middleware.ApiRoleMiddleware.role(_Roles.Permissions.READ), _controller.UserController.getUsersController);
var _default = exports.default = UserRoutes;
//# sourceMappingURL=User.routes.js.map