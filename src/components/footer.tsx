'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='w-full bg-[#326E3B]'>
      <div className='container mx-auto grid grid-cols-12 gap-6 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[200px] items-center'>
        {/* Logo */}
        <div className='col-span-12 lg:col-span-4 pt-6 flex items-center gap-2 justify-center lg:justify-start'>
          <span className='relative w-[31px] h-[31px]'>
            <Image
              src='/image/logo.png'
              alt='Green Tea'
              fill
              className='object-contain'
            />
          </span>
          <span className='text-[14px] leading-[14px] text-white font-bold'>
            Ramphok Green Tea & Agro Processing Ind.
          </span>
        </div>

        {/* Navigation Links */}
        <div className='col-span-12 lg:col-span-4 pt-6 flex justify-center gap-6 text-white text-[14px] font-normal'>
          <Link href='/'>Home</Link>
          <Link href='/about'>about Us</Link>
          <Link href='/contact'>contact Us</Link>
        </div>

        {/* Contact Info */}
        <div className='col-span-12 lg:col-span-4 pt-6 flex justify-center lg:justify-end text-white text-[14px] font-normal'>
          <a
            href='mailto:info@company.com'
            className='hover:underline hover:text-green-300 transition-colors'
          >
            info@company.com
          </a>
        </div>

        {/* Divider Line */}
        <div className='col-span-12 relative mt-6'>
          <span className='absolute top-0 left-0 w-full h-px bg-white/30'></span>
        </div>

        {/* Copyright */}
        <p className='col-span-12 pt-6 pb-6 text-center text-white text-[14px] font-normal'>
          © 2025 Ramphok Green Tea & Agro Processing Ind. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;