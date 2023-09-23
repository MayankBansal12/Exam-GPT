const express = require("express");
const router = express.Router();

router.post("/upload", (req, res) => {
  const file = req.body.file;
  console.log("File Received: ", file);
});

module.exports = router;
