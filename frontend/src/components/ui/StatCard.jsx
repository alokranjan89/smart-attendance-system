
import React from 'react'

const StatCard = ({title, value, color}) => {
  return (
    <div className={`rounded-xl p-5 text-white ${color}`}>
        <p className='text-sm opacity-80'>{title}</p>
        <h2 className='text-3xl font-bold mt-1'>{value}</h2>
    </div>
  )
}

export default StatCard
