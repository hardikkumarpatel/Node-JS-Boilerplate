"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _Sequelize = _interopRequireDefault(require("../connections/Sequelize.connection"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class User extends _sequelize.Model {}
User.init({}, {
  sequelize: _Sequelize.default.connection,
  modelName: "user",
  freezeTableName: true
});
var _default = exports.default = User;
//# sourceMappingURL=User.entity.js.map