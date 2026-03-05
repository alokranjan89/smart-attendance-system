// allow overriding at build time with VITE_ML_URL
const ML_URL = import.meta.env.VITE_ML_URL || "http://localhost:5000/detect";
import { saveAttendance } from './attendanceService.js';

export async function captureAttendance() {
  console.log("🤖 Calling ML service:", ML_URL);
  try {
    const res = await fetch(ML_URL);
    console.log("🤖 ML Response status:", res.status);
    if (!res.ok) {
      console.error("❌ ML service error:", res.status, res.statusText);
      throw new Error("Failed to capture attendance");
    }
    const mlData = await res.json();
    console.log("✅ ML Detection result:", mlData);

    // Save the attendance data to backend
    console.log("💾 Saving ML result to backend...");
    await saveAttendance(mlData);
    console.log("✅ Attendance saved successfully!");

    return mlData;
  } catch (error) {
    console.error("❌ ML service fetch error:", error);
    throw error;
  }
}
