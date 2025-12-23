import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-slate-900 text-white px-6 py-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Smart Attendance System</h1>
        <span className='text-sm text-slate-300'>AI Face Recognition + Liveness</span>
    </header>
  );
};

export default Navbar
