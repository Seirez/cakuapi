const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 8000;
const { readdirSync } = require("fs");

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

readdirSync("./routes").map((file) => app.use("/api/", require("./routes/" + file)));

app.get("/", (req, res) => {
  res.send("Wazzup!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});