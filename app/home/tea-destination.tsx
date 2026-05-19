'use client';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';




const TopSearchedSpots = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 100 });
  }, []);

  return (
    <div className='relative w-full bg-[#fffaf0]'>
    <div className='container mx-auto w-full '>
      {/* Heading Section */}
      <div className='py-[20px]'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full'>
          {/* Left Heading */}
          <div className='md:col-span-6' data-aos='zoom-in-up'>
            <h2 className='text-[28px] sm:text-[32px] leading-[32px] text-black font-bold'>
              Our Tea
            </h2>
            <h2 className='text-[28px] sm:text-[32px] text-[#326E3B] leading-[32px] font-bold'>
              From ilam  to
            </h2>
            <h2 className='text-[28px] sm:text-[32px] text-[#326E3B] leading-[32px] font-bold'>
              the over nepal
            </h2>
          </div>

          {/* Right Description */}
          <div className='md:col-start-1 col-span-6' data-aos='zoom-in-up'>
            <p className='text-[16px] leading-[28px] text-gray-700'>
              From Ilam&apos;s hills to All Bhat-Bhateni shelves, our tea
              travels across Nepal and reaches Hong Kong, Australia, the USA,
              and China — delighting tea lovers worldwide.
            </p>
          </div>
        </div>
      </div>

   
     
   </div>
    </div>
  );
};

export default TopSearchedSpots;