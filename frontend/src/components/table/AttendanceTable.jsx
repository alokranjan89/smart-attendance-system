import StatusBadge from "../ui/StatusBadge";

import React from 'react'

const AttendanceTable = ({data}) => {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
         <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className="border-t hover:bg-slate-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-medium">{item.name}</td>
              <td className="p-3">{item.time || "—"}</td>
              <td className="p-3">
                <StatusBadge name={item.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AttendanceTable
