const ML_URL = "http://localhost:5000/detect";

export async function captureAttendance() {
  const res = await fetch(ML_URL);
  if (!res.ok) throw new Error("Failed to capture attendance");
  return res.json();
}
