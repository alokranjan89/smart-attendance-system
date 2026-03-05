const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: String, required: true },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
