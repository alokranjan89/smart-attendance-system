import React from "react";

const StatCard = ({ title, value, color, icon }) => {
  return (
    <div
      className={`rounded-xl p-5 text-white ${color} shadow-md hover:shadow-lg transition duration-200 flex items-center justify-between`}
    >
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>

      {icon && (
        <div className="text-3xl opacity-80">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;