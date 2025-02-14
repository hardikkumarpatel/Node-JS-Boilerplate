"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROLES = exports.Permissions = void 0;
var ROLES = exports.ROLES = Object.freeze([{
  name: "SUPER_ADMIN",
  permissions: ["create", "read", "update", "delete"]
}, {
  name: "ADMIN",
  permissions: ["create", "read", "update"]
}, {
  name: "EMPLOYEE",
  permissions: ["read"]
}, {
  name: "ANONYMOUES",
  permissions: ["read"]
}]);
var Permissions = exports.Permissions = Object.freeze({
  CREATE: "create",
  UPDATE: "update",
  READ: "read",
  DELETE: "delete"
});
//# sourceMappingURL=Roles.config.js.map