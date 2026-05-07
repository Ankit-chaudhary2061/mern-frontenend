'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

const StorySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <div className='container mx-auto'>
      <div className='py-[60px] md:py-[80px] lg:py-[100px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start w-full'>
          {/* Text Section */}
          <div
            className='col-span-1 md:col-span-1 lg:col-span-5 self-center text-center md:text-left'
            data-aos='zoom-in-up'
          >
            <h2 className='text-[26px] md:text-[30px] lg:text-[32px] leading-[32px] font-bold text-[#000000]'>
              Story We Share
            </h2>
            <p className='text-[14px] md:text-[15px] lg:text-[16px] leading-[22px] md:leading-[24px] text-[#000000] py-[20px] md:py-[24px] lg:py-[32px]'>
              Green tea is a timeless beverage cherished for its delicate
              flavor, calming aroma, and numerous health benefits. Originating
              from ancient China and Japan, this natural elixir is rich in
              antioxidants and known to promote relaxation, focus, and overall
              wellness. Whether sipped hot on a quiet morning or served cold on
              a sunny afternoon, green tea offers a refreshing ritual that
              soothes the body and mind.
            </p>
            <div className='flex justify-center md:justify-start'>
              <button className='bg-[#326E3B] hover:bg-green-800 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer'>
                <p className='text-[14px] md:text-[15px] lg:text-[16px] font-bold leading-[16px] text-white py-[12px] md:py-[14px] lg:py-[16px] px-[24px] md:px-[28px] lg:px-[32px] font-merriweather text-center'>
                  Learn More
                </p>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div
            className='col-span-1 md:col-span-1 lg:col-start-7 lg:col-span-6 rounded-xl overflow-hidden mt-6 md:mt-0'
            data-aos='zoom-in-up'
          >
            <Image
              src='/image/rampokh-about-us.jpg'
              alt='Green Tea'
              className='object-cover w-full h-[250px] md:h-[300px] lg:h-[350px]'
              width={708}
              height={708}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;