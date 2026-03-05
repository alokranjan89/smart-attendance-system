// allow overriding at build time with VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/attendance";

export async function fetchAttendance() {
    console.log("🔄 Fetching attendance from:", API_URL);
    try {
        const res = await fetch(API_URL);
        console.log("📡 API Response status:", res.status);
        if(!res.ok) {
            console.error("❌ API Error:", res.status, res.statusText);
            throw new Error("Failed to fetch attendance");
        }
        const data = await res.json();
        console.log("✅ Attendance data received:", data);
        return data;
    } catch (error) {
        console.error("❌ Fetch error:", error);
        throw error;
    }
}

export async function saveAttendance(attendanceData) {
    console.log("💾 Saving attendance:", attendanceData);
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceData),
        });
        console.log("💾 Save response status:", res.status);
        if (!res.ok) {
            console.error("❌ Save failed:", res.status, res.statusText);
            throw new Error("Failed to save attendance");
        }
        const result = await res.json();
        console.log("✅ Attendance saved:", result);
        return result;
    } catch (error) {
        console.error("❌ Save error:", error);
        throw error;
    }
}


