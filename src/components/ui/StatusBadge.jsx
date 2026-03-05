import React from "react";
import { FaUserCheck, FaUserTimes, FaExclamationTriangle } from "react-icons/fa";

const StatusBadge = ({ name }) => {

  if (name === "Spoof Detected")
    return (
      <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
        <FaExclamationTriangle /> SPOOF
      </span>
    );

  if (name === "Unknown")
    return (
      <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
        <FaUserTimes /> UNKNOWN
      </span>
    );

  return (
    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
      <FaUserCheck /> PRESENT
    </span>
  );
};

export default StatusBadge;