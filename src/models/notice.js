import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  writer: String,
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
