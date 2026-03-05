import React from "react";
import { FaCamera } from "react-icons/fa";

const CaptureButton = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition duration-200 shadow-md
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
      }`}
    >
      {loading ? (
        <>
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          Capturing...
        </>
      ) : (
        <>
          <FaCamera />
          Mark Attendance
        </>
      )}
    </button>
  );
};

export default CaptureButton;