"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireWildcard(require("multer"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _nodeFs = _interopRequireDefault(require("node:fs"));
var _UploadMiddleware;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class UploadMiddleware {}
_UploadMiddleware = UploadMiddleware;
_defineProperty(UploadMiddleware, "MAX_SIZE", 1 * 1000 * 1000);
/** 1MB */
_defineProperty(UploadMiddleware, "storage", _multer.default.diskStorage({
  destination(_req, file, callback) {
    var folder = file.mimetype.startsWith("image/") ? "image" : "pdf";
    var location = _nodePath.default.resolve("src", "upload", folder);
    if (!_nodeFs.default.existsSync(location)) {
      _nodeFs.default.mkdirSync(location, {
        recursive: true
      });
    }
    callback(null, location);
  },
  filename(_req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  }
}));
_defineProperty(UploadMiddleware, "filter", (_req, file, callback) => {
  var FILES_EXT_TYPES = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
  if (FILES_EXT_TYPES.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new _multer.MulterError("INVALID_FILE_TYPE", "Invalid file type. Only ".concat(FILES_EXT_TYPES.join(", "), " files are allowed")));
  }
});
_defineProperty(UploadMiddleware, "upload", (0, _multer.default)({
  storage: _UploadMiddleware.storage,
  limits: {
    fileSize: _UploadMiddleware.MAX_SIZE
  },
  fileFilter: _UploadMiddleware.filter
}));
var _default = exports.default = UploadMiddleware;
//# sourceMappingURL=Upload.middleware.js.map