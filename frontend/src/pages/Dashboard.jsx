import React, { useEffect, useState } from 'react'
import StatCard from '../components/ui/StatCard'
import AttendanceTable from '../components/table/AttendanceTable'
import { fetchAttendance } from '../services/attendanceService'
import { captureAttendance } from "../services/mlService";
import CaptureButton from "../components/ui/CaptureButton";

const Dashboard = () => {

    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);

 

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
    },[]);



    const total = attendance.length;
    const present = attendance.filter(a => a.name !== "Unknown" && a.name !== "Spoof Detected").length;
    const unknown = attendance.filter(a => a.name === "Unknown").length;
    const spoof = attendance.filter(a => a.name === "Spoof Detected").length;
  return (
    <div className='p-6 max-w-7xl mx-auto'>
        <div className="flex justify-end mb-4">
        <CaptureButton onClick={handleCapture} loading={loading} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <StatCard title="Total Entries" value={total} color="bg-blue-600"/>
        <StatCard title="Present" value={present} color="bg-green-600"/>
        <StatCard title="Unknown" value={unknown} color="bg-yellow-600"/>
        <StatCard title="Spoof Attempts" value={spoof} color="bg-red-600"/>
      </div>
      <div className='bg-white p-5 rounded-xl shadow'>
        <h2 className='text-lg font-semibold mb-4'>Live Attendance</h2>
        <AttendanceTable data={attendance}/>

      </div>

    </div>
  )
}

export default Dashboard
