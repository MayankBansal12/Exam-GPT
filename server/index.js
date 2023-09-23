const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();
const homeRouter = require("./routes/homeRouter");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/", homeRouter);

app.listen(port, () => {
  console.log("Server is running on", port);
});
