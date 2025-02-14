"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MongoDBConnection", {
  enumerable: true,
  get: function get() {
    return _Mongodb.default;
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _User.User;
  }
});
var _User = require("./models/User.model");
var _Mongodb = _interopRequireDefault(require("./connections/Mongodb.connections"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//# sourceMappingURL=index.js.map