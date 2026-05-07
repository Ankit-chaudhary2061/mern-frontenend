'use client';

import Image from 'next/image';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

const ProductFeature = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <section className='relative w-full'>
      <div
        className='relative w-full mx-auto aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9]  overflow-hidden'
        data-aos='zoom-in-up'
      >
        <Image
          src='/images/picking-tea.jpg'
          alt='GreenTea garden'
          fill
          className='object-cover'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-black/30'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
            Fresh from the Tea Gardens of Ilam
          </h2>
          <p className='mt-4 text-base sm:text-lg md:text-xl font-medium max-w-2xl'>
            Experience the finest hand-picked green tea leaves, straight from
            nature&apos;s heart.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductFeature;