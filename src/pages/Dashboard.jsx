import React, { useEffect, useState } from "react";
import StatCard from "../components/ui/StatCard";
import AttendanceTable from "../components/table/AttendanceTable";
import { fetchAttendance } from "../services/attendanceService";
import { captureAttendance } from "../services/mlService";
import CaptureButton from "../components/ui/CaptureButton";
import CameraPreview from "../components/ui/CameraPreview";

import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaExclamationTriangle
} from "react-icons/fa";

const Dashboard = () => {

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());

  async function loadData() {
    const data = await fetchAttendance();
    setAttendance(data);
  }

  async function handleCapture() {
    try {
      setLoading(true);
      await captureAttendance();
      await loadData();
    } catch (err) {
      alert("Failed to capture attendance");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  const total = attendance.length;

  const present = attendance.filter(
    (a) => a.name !== "Unknown" && a.name !== "Spoof Detected"
  ).length;

  const unknown = attendance.filter((a) => a.name === "Unknown").length;

  const spoof = attendance.filter((a) => a.name === "Spoof Detected").length;

  return (

    <div className="min-h-screen bg-gray-50 p-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-2xl font-bold text-gray-800">
              Smart Attendance System
            </h1>

            <p className="text-gray-500 text-sm">
              AI Face Recognition + Liveness Detection
            </p>

            <p className="text-green-600 text-sm font-medium mt-1">
              ● AI Model Active
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500 mb-2">
              {time.toLocaleTimeString()}
            </p>

            <CaptureButton
              onClick={handleCapture}
              loading={loading}
            />

          </div>

        </div>

        {/* CAMERA + STATS */}

        <div className="grid grid-cols-3 gap-6 mb-6">

          {/* CAMERA */}

          <div>

            <h2 className="text-md font-semibold mb-2">
              Live Camera
            </h2>

            <CameraPreview />

          </div>


          {/* STATS */}

          <div className="col-span-2 grid grid-cols-2 gap-4">

            <StatCard
              title="Total Entries"
              value={total}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
              icon={<FaUsers />}
            />

            <StatCard
              title="Present"
              value={present}
              color="bg-gradient-to-r from-green-500 to-green-600"
              icon={<FaUserCheck />}
            />

            <StatCard
              title="Unknown"
              value={unknown}
              color="bg-gradient-to-r from-yellow-400 to-yellow-500"
              icon={<FaUserTimes />}
            />

            <StatCard
              title="Spoof Attempts"
              value={spoof}
              color="bg-gradient-to-r from-red-500 to-red-600"
              icon={<FaExclamationTriangle />}
            />

          </div>

        </div>

        {/* SCANNER */}

        <div className="bg-white p-4 rounded-xl shadow mb-6">

          <h2 className="text-md font-semibold mb-2">
            Attendance Scanner
          </h2>

          <p className="text-gray-500 mb-3 text-sm">
            Click the button to scan face and mark attendance.
          </p>

          <CaptureButton
            onClick={handleCapture}
            loading={loading}
          />

        </div>

        {/* TABLE */}

        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-md font-semibold text-gray-700">
              Live Attendance
            </h2>

            <span className="text-xs text-gray-400">
              Auto refresh every 5 seconds
            </span>

          </div>

          {attendance.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              No attendance records yet
            </div>
          ) : (
            <AttendanceTable data={attendance} />
          )}

        </div>

      </div>

    </div>

  );
};

export default Dashboard;