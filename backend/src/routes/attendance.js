const router = require("express").Router();
const Attendance = require("../models/Attendance");

// Save attendance
router.post("/", async (req, res) => {
    try {
        console.log("📥 Received request:", req.body);  // <-- NEW LOG

        const { name, time } = req.body;
        const entry = new Attendance({ name, time });

        await entry.save();

        console.log("✅ Saved to MongoDB"); // <-- NEW LOG

        res.json({ success: true, entry });
    } catch (err) {
        console.log("❌ Error:", err.message);  // <-- NEW LOG
        res.status(500).json({ error: err.message });
    }
});

// Get attendance list
router.get("/", async (req, res) => {
    const data = await Attendance.find();
    res.json(data);
});

module.exports = router;
