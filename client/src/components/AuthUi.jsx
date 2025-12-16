import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const AuthUi = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-[#ffdbd7] overflow-hidden">
            <section className="hidden w-full items-start justify-center bg-brand lg:flex xl:w-2/5">
                <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12 p-2 m-5">
                    <Link to={`/`} className='flex items-start justify-start'>
                        <h1 className='uppercase text-6xl sirin-stencil-regular text-black'>LUXELOOM</h1>
                        <img src={assets.logo} alt="" className='rounded-full size-5 translate-y-10 translate-x-0.5' />
                    </Link>
                    <div className="space-y-5 text-black">
                        <h1 className="text-[34px] leading-[42px] font-bold">Elevate Your Wardrobe Management</h1>
                        <p className="text-[16px] leading-[24px] font-normal">
                            Discover a space where sophistication meets organization. Store and showcase your luxury apparel with the care and elegance it deserves.
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 -rotate-12 infine moving'>
                        <div className='flex justify-start'><img src={assets.auth_bg1} alt="Files" width={250} height={250} className="rounded-lg" /></div>
                        <div className='flex justify-end'><img src={assets.auth_bg2} alt="Files" width={250} height={250} className="rounded-lg" /></div>
                    </div>
                </div>
            </section>
            <section className="flex flex-1 flex-col items-center bg-rose-50 p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                <div className="mb-16 md:hidden flex items-center">
                    <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
                        <Link to={`/`} className='flex items-center justify-start'>
                        <h1 className='uppercase text-6xl sirin-stencil-regular'>LUXELOOM</h1>
                        <img src={assets.logo} alt="" className='rounded-full size-5 translate-y-5 translate-x-0.5' />
                        </Link>
                    </div>
                </div>
                {children}
            </section>
        </div>
    )
}

export default AuthUi