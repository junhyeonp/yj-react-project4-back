import express from "express";
import { postRegisterMember } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", postRegisterMember)

export default userRouter;