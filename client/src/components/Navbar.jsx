import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { LogIn } from 'lucide-react';


const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        navigate('/login');
    }

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            {/* <img src={assets.logo} alt="logo" className='w-36' /> */}
            <Link to={`/`} className='w-44 flex items-center justify-start'>
                <h1 className='uppercase text-4xl sirin-stencil-regular'>LUXELOOM</h1>
                {/* <div className='bg-rose-300 rounded-full size-2.5 translate-y-2.5 translate-x-0.5'></div> */}
                <img src={assets.logo} alt="" className='rounded-full size-2.5 translate-y-2.5 translate-x-0.5' />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className="flex flex-col items-center gap-1 uppercase">
                    <p>Home</p>
                    <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className="flex flex-col items-center gap-1 uppercase">
                    <p>Collection</p>
                    <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className="flex flex-col items-center gap-1 uppercase">
                    <p>About</p>
                    <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className="flex flex-col items-center gap-1 uppercase">
                    <p>Contact</p>
                    <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className="flex items-center gap-6">
                <img onClick={() => { setShowSearch(true), navigate('/collection') }} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
                {
                    token !== '' ? (
                        <div className="group relative">
                            <div><img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' /></div>
                            <div className='group-hover:block hidden absolute dropdown-menu -right-16 pt-4'>
                                <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 border border-gray-300 text-gray-500 rounded-lg animate-dropdown">
                                    <p className='cursor-pointer hover:text-black'>Profile</p>
                                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                }
                {
                    token !== '' ? (
                        <Link to='/cart' className='relative'>
                            <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{getCartCount()}</p>
                        </Link>
                    ) : (
                        <></>
                    )
                }
                {
                    token === '' ? (
                        <button onClick={() => navigate('/login')} className='bg-[#ffdbd7] border border-[#b28878] px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm text-[#505050] font-medium flex gap-2 items-center justify-between cursor-pointer'><LogIn />Login</button>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar