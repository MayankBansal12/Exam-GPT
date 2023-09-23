const express = require("express");
const router = express.Router();

router.route("/upload").post((req, res) => {
  const text = req.body.text;
  console.log("Text Received: ", text);
});

module.exports = router;
