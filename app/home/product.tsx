'use client';

import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Product = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <div className='bg-[rgb(247,244,244)] w-full'>
      <div className='container mx-auto'>
        <div className='pt-[64px]'>
          <div className='grid grid-cols-12 gap-6 items-start w-full'>
            <div className='col-span-12' data-aos='zoom-in-up'>
              <h2 className='text-[32px] leading-[32px] font-bold'>
                Our Products
              </h2>
              <div
                className='pt-[54px] grid grid-cols-12 gap-6 items-center w-full'
                data-aos='zoom-in-up'
              >
                {/* --- Product 1 --- */}
                <div className='col-span-12 md:col-span-12 mb-[32px]'>
                  {/* Mobile view */}
                  <div className='md:hidden'>
                    <div className='relative w-full rounded-xl overflow-hidden aspect-[16/9] mb-4'>
                      <Image
                        src='/image/rampokh-about-us.jpg'
                        alt='Roasted Green Tea'
                        className='object-cover'
                        fill
                        sizes='100vw'
                      />
                    </div>

                    <h3 className='text-[24px] leading-[28px] font-bold text-[#326E3B] mb-2'>
                      Roasted Green Tea
                    </h3>
                    <p className='text-[14px] leading-[24px] text-gray-700'>
                      Expertly crafted from freshly picked leaves, our roasted
                      green tea offers a smooth, rich flavor with a distinctive
                      aroma. Carefully roasted and dried to preserve its natural
                      qualities, it is rich in antioxidants and known for
                      promoting brain function, supporting metabolism, and
                      enhancing overall well-being.
                    </p>
                  </div>

                  {/* Desktop/tablet view */}
                  <div className='hidden md:grid md:grid-cols-12 md:gap-6 md:items-center'>
                    <div className='col-span-6 mb-[32px] relative h-[350px] rounded-xl overflow-hidden'>
                      <Image
                        src='/image/rampokh-about-us.jpg'
                        alt='Roasted Green Tea'
                        className='object-cover'
                        fill
                        sizes='50vw'
                      />
                    </div>
                    <div className='col-start-8 col-span-5 mb-[32px]'>
                      <h3 className='text-[32px] leading-[32px] font-bold text-[#326E3B] mb-[32px]'>
                        Roasted Green Tea
                      </h3>
                      <p className='text-[16px] leading-[28px] text-gray-700'>
                        Expertly crafted from freshly picked leaves, our roasted
                        green tea offers a smooth, rich flavor with a
                        distinctive aroma. Carefully roasted and dried to
                        preserve its natural qualities, it is rich in
                        antioxidants and known for promoting brain function,
                        supporting metabolism, and enhancing overall well-being.
                      </p>
                    </div>
                  </div>
                </div>

                {/* --- Product 2 --- */}
                <div className='col-span-12 md:col-span-12 mb-[32px]'>
                  {/* Mobile view */}
                  <div className='md:hidden'>
                    <div className='relative h-[250px] w-full rounded-xl overflow-hidden mb-4'>
                      <Image
                        src='/image/rampokh-about-us.jpg'
                        alt='Orthodox Black Tea'
                        className='object-cover'
                        fill
                        sizes='100vw'
                      />
                    </div>
                    <h3 className='text-[24px] leading-[28px] font-bold text-[#326E3B] mb-2'>
                      Orthodox Black Tea
                    </h3>
                    <p className='text-[14px] leading-[24px] text-gray-700'>
                      Bold, rich, and handcrafted, our Orthodox Black Tea is
                      fully oxidized for a deep flavor and smooth finish. Made
                      from premium Camellia sinensis leaves, it&apos;s rich in
                      unique antioxidants that support heart health, digestion,
                      and overall wellness — a perfect energizing brew for tea
                      lovers.
                    </p>
                  </div>

                  {/* Desktop/tablet view */}
                  <div className='hidden md:grid md:grid-cols-12 md:gap-6 md:items-center'>
                    <div className='col-span-5 mb-[32px]'>
                      <h3 className='text-[32px] leading-[32px] font-bold text-[#326E3B] mb-[32px]'>
                        Orthodox Black Tea
                      </h3>
                      <p className='text-[16px] leading-[28px] text-gray-700'>
                        Bold, rich, and handcrafted, our Orthodox Black Tea is
                        fully oxidized for a deep flavor and smooth finish. Made
                        from premium Camellia sinensis leaves, it&apos;s rich in
                        unique antioxidants that support heart health,
                        digestion, and overall wellness — a perfect energizing
                        brew for tea lovers seeking both strength and benefits.
                      </p>
                    </div>
                    <div className='col-start-7 col-span-6 mb-[32px] relative h-[350px] rounded-xl overflow-hidden'>
                      <Image
                        src='/image/rampokh-about-us.jpg'
                        alt='Orthodox Black Tea'
                        className='object-cover'
                        fill
                        sizes='50vw'
                      />
                    </div>
                  </div>
                </div>

                {/* --- Product 3 --- */}
                <div className='col-span-12 md:col-span-12 mb-[32px]'>
                  {/* Mobile view */}
                  <div className='md:hidden'>
                    <div className='relative h-[250px] w-full rounded-xl overflow-hidden mb-4'>
                      <Image
                        src='/image/rampokh-about-us.jpg'
                        alt='Pearl Green Tea'
                        className='object-cover'
                        fill
                        sizes='100vw'
                      />
                    </div>
                    <h3 className='text-[24px] leading-[28px] font-bold text-[#326E3B] mb-2'>
                      Pearl Green Tea
                    </h3>
                    <p className='text-[14px] leading-[24px] text-gray-700'>
                      Crafted from tender, hand-picked second-flush leaves, our
                      Pearl Green Tea is delicately rolled for a smooth,
                      refreshing taste with natural sweetness. Rich in
                      antioxidants and nutrients, it supports overall wellness
                      while offering exceptional flavor — a perfect balance of
                      health and taste.
                    </p>
                  </div>

                  {/* Desktop/tablet view */}
                  <div className='hidden md:grid md:grid-cols-12 md:gap-6 md:items-center'>
                    <div className='col-span-6 mb-[32px] relative h-[350px] rounded-xl overflow-hidden'>
                      <Image
                        src='/image/rampokh-about-us.jpg'
                        alt='Pearl Green Tea'
                        className='object-cover'
                        fill
                        sizes='50vw'
                      />
                    </div>
                    <div className='col-start-8 col-span-5 mb-[32px]'>
                      <h3 className='text-[32px] leading-[32px] font-bold text-[#326E3B] mb-[32px]'>
                        Pearl Green Tea
                      </h3>
                      <p className='text-[16px] leading-[28px] text-gray-700'>
                        Crafted from tender, hand-picked second-flush leaves,
                        our Pearl Green Tea is delicately rolled for a smooth,
                        refreshing taste with natural sweetness. Rich in
                        antioxidants and nutrients, it supports overall wellness
                        while offering exceptional flavor — a perfect balance of
                        health and taste.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;