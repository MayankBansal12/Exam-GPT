const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const secret = process.env.API_KEY;

const openai = new OpenAI({
  apiKey: secret,
});

const response = async (chats) => {
  const completion = await openai.chat.completions.create({
    messages: chats,
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0]?.message?.content;
};

router.route("/").get((req, res) => {
  res.status(200).send("Working!!");
});

router.route("/response").post(async (req, res) => {
  const { chats } = req.body;
  try {
    const output = await response(chats.filter((chat) => chat.role === "user"));
    return res
      .status(200)
      .json({ msg: "Response Successful!", response: output });
  } catch (err) {
    return res.status(400).json({ msg: "Error!", error: err });
  }
});

module.exports = router;
