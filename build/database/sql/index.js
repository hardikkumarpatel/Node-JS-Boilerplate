"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SequelizeDBConnection", {
  enumerable: true,
  get: function get() {
    return _Sequelize.default;
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _User.default;
  }
});
var _User = _interopRequireDefault(require("./entities/User.entity"));
var _Sequelize = _interopRequireDefault(require("./connections/Sequelize.connection"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//# sourceMappingURL=index.js.map