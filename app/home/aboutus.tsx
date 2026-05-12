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
    <section className=" mx-auto  bg-white">
      <div className=" container py-[60px] md:py-[80px] lg:py-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center w-full">

          {/* Text Section */}
          <div
            className="col-span-1 md:col-span-1 lg:col-span-6 text-center md:text-left"
            data-aos="fade-up"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Discover
            </h2>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#326E3B] leading-tight">
              Ramfok Green 
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#326E3B] leading-tight">
              Tea 
            </h2>

            <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-6 max-w-xl mx-auto md:mx-0">
              Green tea is a timeless beverage cherished for its delicate
              flavor, calming aroma, and numerous health benefits. Rich in
              antioxidants, it supports relaxation, focus, and overall wellness.
              Whether enjoyed hot or cold, it brings balance to your everyday
              life.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              
              <Link href="/about">
                <button className="bg-[#326E3B] hover:bg-green-800 text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition duration-300">
                  Learn More
                </button>
              </Link>

              <Link href="/shop">
                <button className="border border-[#326E3B] text-[#326E3B] hover:bg-[#326E3B] hover:text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold transition duration-300">
                  Shop Now
                </button>
              </Link>

            </div>
          </div>

          {/* Image Section */}
          <div
            className="lg:col-start-7 lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10]"
            data-aos="fade-left"
          >
            <Image
              src="/image/rampokh-about-us.jpg"
              alt="Green Tea"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition duration-500"
            />

            {/* Soft overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;