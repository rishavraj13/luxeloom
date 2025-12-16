import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col-reverse sm:flex-row-reverse border border-gray-400'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='uppercase font-medium text-sm md:text-base'>Our Bestsellers</p>
          </div>
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed prata-regular'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base uppercase'>shop now</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      <img src={assets.hero_img} alt="" className='w-full sm:w-1/2' />
    </div>
  )
}

export default Hero