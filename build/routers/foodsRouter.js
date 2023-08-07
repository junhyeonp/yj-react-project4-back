"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _getJoonguFoods = require("../controllers/getJoonguFoods.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var foodsRouter = _express["default"].Router();
foodsRouter.get("/joongu", _getJoonguFoods.getJoonguFoods);
var _default = foodsRouter;
exports["default"] = _default;