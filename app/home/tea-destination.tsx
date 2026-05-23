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
    <div className="relative w-full bg-[#fffaf0]">
  <div className="container mx-auto px-[200px] py-[72px]">

    {/* HEADING SECTION */}
    <div className="py-[20px]">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

        {/* LEFT HEADING */}
        <div className="md:col-span-6" data-aos="zoom-in-up">
          <h2 className="text-[28px] sm:text-[32px] leading-[32px] font-bold text-black">
            Our Tea
          </h2>

          <h2 className="text-[28px] sm:text-[32px] leading-[32px] font-bold text-[#326E3B]">
            From Ilam to
          </h2>

          <h2 className="text-[28px] sm:text-[32px] leading-[32px] font-bold text-[#326E3B]">
            {/* the whole of Nepal */}
            over the world
          </h2>
        </div>

        {/* RIGHT DESCRIPTION */}
        <div className="md:col-span-6" data-aos="zoom-in-up">
          <p className="text-[16px] leading-[28px] text-gray-700">
           From Ilam to every corner of Nepal, our tea carries the essence of the hills to the world, reaching tea lovers in Hong Kong, Australia, the USA, and China with unmatched freshness and taste.
          </p>
        </div>

      </div>
    </div>

  </div>
</div>
  );
};

export default TopSearchedSpots;