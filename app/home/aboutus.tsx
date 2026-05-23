'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    // <section className="relative w-full   bg-white">
    //   <div className=" container max-auto">
    //     <div className="px-[200px] py-[72px]">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center w-full">

    //       {/* Text Section */}
    //       <div
    //         className="col-span-1 md:col-span-1 lg:col-span-6  py-[32px] text-center md:text-left"
    //         data-aos="fade-up"
    //       >
    //         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
    //           Discover
    //         </h2>

    //         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#326E3B] leading-tight">
    //           Ramfok Green 
    //         </h2>
    //         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#326E3B] leading-tight">
    //           Tea 
    //         </h2>

    //         <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-6 max-w-xl mx-auto md:mx-0">
    //           Green tea is a timeless beverage cherished for its delicate
    //           flavor, calming aroma, and numerous health benefits. Rich in
    //           antioxidants, it supports relaxation, focus, and overall wellness.
    //           Whether enjoyed hot or cold, it brings balance to your everyday
    //           life.
    //         </p>

    //         {/* Buttons */}
           
    //       </div>

    //       {/* Image Section */}
    //       <div
    //         className="col-span-1 md:col-span-1 lg:col-start-8 lg:col-span-5 relative rounded-xl overflow-hidden mt-6 md:mt-0 aspect-[16/9]"
    //         data-aos="fade-left"
    //       >
    //         <Image
    //           src="/image/rampokh-about-us.jpg"
    //           alt="Green Tea"
    //           fill
    //           className="object-cover hover:scale-105 transition duration-500"
    //         />

    //         {/* Soft overlay for premium feel */}
    //         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    //       </div>

    //     </div>
    //     </div>
    //   </div>
    // </section>
   <section className="w-full bg-white">
  <div className="container mx-auto px-[200px] py-16 lg:py-24">

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

      {/* LEFT CONTENT */}
      <div
        className="lg:col-span-6 text-center lg:text-left"
        data-aos="fade-up"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          Discover
        </h2>

        <h2 className="text-4xl md:text-5xl font-bold text-[#326E3B] leading-tight">
          Ramfok Green
        </h2>

        <h2 className="text-4xl md:text-5xl font-bold text-[#326E3B] leading-tight">
          Tea
        </h2>

        <p className="text-gray-700 text-base leading-8 mt-6 max-w-xl mx-auto lg:mx-0">
          Green tea is a timeless beverage cherished for its delicate
          flavor, calming aroma, and numerous health benefits.
          Rich in antioxidants, it supports relaxation, focus,
          and overall wellness.
        </p>
      </div>

      {/* RIGHT IMAGE */}
      <div
        className="lg:col-start-8 lg:col-span-5 relative aspect-[16/9] rounded-2xl overflow-hidden"
        data-aos="fade-left"
      >
        <Image
          src="/image/rampokh-about-us.jpg"
          alt="Green Tea"
          fill
          className="object-cover hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

    </div>
  </div>
</section>
  );
};

export default AboutUs;