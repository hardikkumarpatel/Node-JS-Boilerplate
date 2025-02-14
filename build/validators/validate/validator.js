"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;
var _expressValidator = require("express-validator");
var _httpStatusCodes = require("http-status-codes");
var _helpers = require("../../helpers");
var validate = (req, res, next) => {
  var errors = (0, _expressValidator.validationResult)(req);
  if (errors.isEmpty()) {
    return next();
  }
  var extractedErrors = [];
  errors.array().map(_ref => {
    var {
      msg
    } = _ref;
    return extractedErrors.push(msg);
  });
  throw new _helpers.ApiErrorResponseHelper(_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, "Validation Error", extractedErrors);
};
exports.validate = validate;
//# sourceMappingURL=validator.js.map