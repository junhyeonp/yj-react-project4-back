"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var noticeSchema = new _mongoose["default"].Schema({
  title: String,
  description: String,
  createdAt: Date,
  writer: String
});
var Notice = _mongoose["default"].model("Notice", noticeSchema);
var _default = Notice;
exports["default"] = _default;