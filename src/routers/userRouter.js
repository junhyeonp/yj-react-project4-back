import express from "express";
import {
    getLoginSuccess,
    kakaoLogin,
    logout,
    postRegisterMember,
    postUsernameSignIn,
} from "../controllers/userController.js";

const userRouter = express.Router();

// 회원가입
userRouter.post("/register", postRegisterMember);
// 로그인
userRouter.post("/signin", postUsernameSignIn);
// 로그인 확인
userRouter.get("/login/success", getLoginSuccess);
// 로그아웃
userRouter.post("/logout", logout);
// 카카오로그인
userRouter.post("/kakao", kakaoLogin);
export default userRouter;
