import React from 'react'

const CaptureButton = ({onClick, loading}) => {
  return (
    <button onClick={onClick}
    disabled={loading}
    className={`px-6 py-3 rounded-lg font-semibold text-white ${loading ? "bg-gray-400" :"bg-indigo-600 hover:bg-indigo-700"}` }
    >

        {loading ? "Capturing....." : "Mark Attendance"}
    </button>
  )
}

export default CaptureButton
