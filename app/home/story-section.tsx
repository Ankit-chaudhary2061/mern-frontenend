'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { div } from 'framer-motion/client';

const StorySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <section className="bg-amber-50">
      <div className="container mx-auto px-[200px] py-[72px]">
        <div className="py-[60px] md:py-[80px] lg:py-[100px]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center">

            {/* TEXT SECTION */}
            <div
              className="lg:col-span-5 text-center md:text-left"
              data-aos="zoom-in-up"
            >
              <h2 className="text-[26px] md:text-[30px] lg:text-[32px] font-bold text-black">
                Story We Share
              </h2>

              <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-[22px] md:leading-[24px] text-black py-[20px] md:py-[24px] lg:py-[32px]">
                Green tea is a timeless beverage cherished for its delicate
                flavor, calming aroma, and numerous health benefits. Originating
                from ancient China and Japan, this natural elixir is rich in
                antioxidants and known to promote relaxation, focus, and overall
                wellness.
              </p>
            </div>

            {/* IMAGE SECTION */}
            <div
              className="lg:col-start-7 lg:col-span-6 rounded-xl overflow-hidden"
              data-aos="zoom-in-up"
            >
              <Image
                src="/image/rampokh-about-us.jpg"
                alt="Green Tea"
                width={708}
                height={708}
                className="w-full h-[250px] md:h-[300px] lg:h-[350px] object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;