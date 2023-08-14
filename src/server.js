import "./db.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rentalRouter from "./routers/rentalRouter.js";
import cors from "cors";
import foodsRouter from "./routers/foodsRouter.js";
import userRouter from "./routers/userRouter.js";

const PORT = 8080;
const app = express();

// 도메인이 다를 때 통신이 안되는 것을 해결하기 위해 허락하는 것임
const corsOptions = {
  origin: ["http://localhost:3000","https://regal-bienenstitch-5b5903.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true,
};

// 미들웨어: 모든 영역에 다 적용???
app.use(cookieParser());
app.use(cors(corsOptions));
// morgan -> GET / 404 등 메시지 뜸
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/rental", rentalRouter);
app.use("/api/foods", foodsRouter);
app.use("/api/users", userRouter)


const handleListening = () =>
  console.log(`❤ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
