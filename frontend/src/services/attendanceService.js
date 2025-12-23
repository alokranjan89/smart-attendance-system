const API_URL = "http://localhost:8000/attendance";

export async function fetchAttendance() {
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("Failed to fetch attendance");
    return res.json();
}


