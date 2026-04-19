const express = require("express");
const app = express();

const router = require("./routes/api");
const db = require("./config/database"); // Memanggil koneksi database

app.use(express.json());
app.use("/api", router);

module.exports = app;
