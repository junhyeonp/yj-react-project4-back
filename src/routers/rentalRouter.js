import express from "express";

const rentalRouter = express.Router();

rentalRouter.get("/notice", (req, res) => res.json({ data: "notice" }));

export default rentalRouter;
