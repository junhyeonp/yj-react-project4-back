import express from "express";
import {
  rentalNotice,
  rentalNoticeDetail,
  rentalNoticeWrite,
} from "../controllers/rentalControllers.js";

const rentalRouter = express.Router();

rentalRouter.get("/notice", rentalNotice);
rentalRouter.post("/notice-write", rentalNoticeWrite);
rentalRouter.get("/notice-detail/:id", rentalNoticeDetail);

export default rentalRouter;
