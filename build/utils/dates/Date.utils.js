"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateTimeLocaleFormat = void 0;
var getDateTimeLocaleFormat = date => {
  date = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  return date.toLocaleString("en-US", options);
};
exports.getDateTimeLocaleFormat = getDateTimeLocaleFormat;
//# sourceMappingURL=Date.utils.js.map