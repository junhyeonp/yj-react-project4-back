"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _rentalControllers = require("../controllers/rentalControllers.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rentalRouter = _express["default"].Router();
rentalRouter.get("/notice", _rentalControllers.rentalNotice);
rentalRouter.post("/notice-write", _rentalControllers.rentalNoticeWrite);
rentalRouter.get("/notice-detail/:id", _rentalControllers.rentalNoticeDetail);
var _default = rentalRouter;
exports["default"] = _default;