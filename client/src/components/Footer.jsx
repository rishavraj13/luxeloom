import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div className=''>
                    <div className='w-44 flex items-center justify-start mb-5'>
                        <h1 className='uppercase text-4xl sirin-stencil-regular'>LUXELOOM</h1>
                        <div className='bg-rose-300 rounded-full size-2.5 translate-y-2.5 translate-x-0.5'></div>
                    </div>
                    <p className='w-full md:w-2/3 text-gray-600'>
                    Luxeloom is where elegance meets comfort, redefining fashion with premium fabrics and timeless designs. From essentials to statement pieces, each creation embodies sophistication and style. Elevate your wardrobe with Luxeloom’s unmatched quality.</p>
                </div>
                <div>
                    <p className='uppercase text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About us</Link></li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='uppercase text-xl font-medium mb-5'>Get in touch</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 9876543210</li>
                        <li>contact@luxeloom.vercel.app</li>
                        <li>Instagram</li>
                        <li>Facebook</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center '>Copyright 2025@ luxeloom.vercel.app - All Right Reserved.</p>
                <hr className='md:hidden mb-20 md:mb-0' />
            </div>
        </div>
    )
}

export default Footer