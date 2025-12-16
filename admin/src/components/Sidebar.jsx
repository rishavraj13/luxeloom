import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Package, PackagePlus, ShoppingCart, LayoutDashboard, Podcast, Users, Mail } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className='w-[18%] h-[85vh] border-r flex flex-col justify-between'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink to={'/'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
                    <div><LayoutDashboard size={24} /></div>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink to={'/add'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
                    <div><PackagePlus size={24} /></div>
                    <p className='hidden md:block'>Add Products</p>
                </NavLink>
                <NavLink to={'/list'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
                    <div><Package size={24} /></div>
                    <p className='hidden md:block'>List Products</p>
                </NavLink>
                <NavLink to={'/order'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
                    <div><ShoppingCart size={24} /></div>
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
                <NavLink to={'/subscriber'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
                    <div><Podcast size={24} /></div>
                    <p className='hidden md:block'>Subscribers</p>
                </NavLink>
                <NavLink to={'/user'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
                    <div><Users size={24} /></div>
                    <p className='hidden md:block'>Users</p>
                </NavLink>
                <NavLink to={'/message'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
                    <div><Mail size={24} /></div>
                    <p className='hidden md:block'>Messages</p>
                </NavLink>
            </div>
            <div className='md:px-5 text-lg'>
                <div className='flex items-center justify-center md:gap-3 md:bg-[#ffdbd7] md:border md:border-[#b28878] p-0 md:p-3 rounded-full'>
                    <img src={assets.avatar} alt="" className='w-10 h-10 md:w-14 md:h-14 rounded-full' />
                    <div className='hidden md:block'>
                        <div className='flex flex-col'>
                            <p className='text-gray-800'> Admin</p>
                            <p className='text-sm font-normal text-[#505050]'>admin@luxeloom.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar