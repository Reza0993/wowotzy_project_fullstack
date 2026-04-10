const express = require("express");
// Membuat object express
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express.js");
});

module.exports = app;
