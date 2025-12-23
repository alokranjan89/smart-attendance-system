import React from 'react'

const StatusBadge = ({name}) => {
        if (name === "Spoof Detected")
               return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">SPOOF</span>;

        if (name === "Unknown")
            return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">UNKNOWN</span>;

         return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">PRESENT</span>;
    
}

export default StatusBadge
