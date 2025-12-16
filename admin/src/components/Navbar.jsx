import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react';

const Navbar = ({ setToken }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        setToken('');
        navigate('/');
    }
    return (
        <div className='flex items-center justify-between py-2 px-[4%]'>
            <Link to={`/`} className='w-44 flex flex-col items-start justify-center'>
                <div className='flex items-center justify-center'>
                    <h1 className='uppercase text-4xl sirin-stencil-regular'>LUXELOOM</h1>
                    <img src={assets.logo} alt="" className='rounded-full size-2.5 translate-y-2.5 translate-x-0.5' />
                </div>
                <div className='flex items-center justify-start'>
                    <h1 className='text-xl text-[#505050]/70 text-medium uppercase text-prata-regular text-start'>Admin panel</h1>
                </div>
            </Link>
            <button onClick={handleLogout} className='bg-[#ffdbd7] border border-[#b28878] px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm text-[#505050] font-medium flex gap-2 items-center justify-between'><LogOut />Logout</button>
        </div>
    )
}

export default Navbar