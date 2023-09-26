const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const secret = process.env.API_KEY;

const messages = [
  {
    role: "user",
    content:
      "I want you to act as an examiner. I will be the student and you will ask me the questions. I will provide you with details of a specific topic and you will have to conduct an exam where you will ask questions from student one by one. Based on the answer you can counter question or ask further questions. I want you to only reply as the examiner. Do not write all the conservation at once. I want you to only do the exam with me. Ask me the questions and wait for my answers. Do not write explanations, Ask me the questions one by one like an examiner does and wait for my answers. My first sentence will be 'I am ready to start' and then you can start the exam.",
  },
];

const openai = new OpenAI({
  apiKey: secret,
});

const response = async (input) => {
  messages.push({ role: "user", content: input });
  console.log(messages);
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0]?.message?.content;
};

router.route("/upload").post((req, res) => {
  const text = req.body.text;
  messages.push({
    role: "user",
    content: `Here are the details about topic: ${text}`,
  });
  console.log(messages);
  // Start the text
  // Get input from user
  // Give it to response function to get response
});

// Create a function to handle conversation: Call input to get input from user and output to get response from gpt and send it back to user

module.exports = router;
