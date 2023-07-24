import Notice from "../models/notice.js";

export const rentalNoticeWrite = async (req, res) => {
  const { title, description, writer } = req.body;
  console.log(title, description, writer);
  console.log(title, description, writer);
  try {
    const notice = await Notice.create({
      title,
      description,
      writer,
      createdAt: Date.now(),
    });
    res.json({ ok: "true", notice });
  } catch (error) {
    res.json({ ok: "false", error });
  }
};

export const rentalNotice = async (req, res) => {
  try {
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    const counts = await Notice.count();
    res.json({ ok: "true", notices, counts });
  } catch (error) {
    res.json({ ok: "false", error });
  }
};

// 게시판 디테일
export const rentalNoticeDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await Notice.findById(id);
    res.json({ ok: "true", detail });
  } catch (error) {
    res.json({ ok: "false", error });
  }
};
