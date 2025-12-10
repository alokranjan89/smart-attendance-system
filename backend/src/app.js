const express = require("express");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendance");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/attendance", attendanceRoutes);

module.exports = app;
