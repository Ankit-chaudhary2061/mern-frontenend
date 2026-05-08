'use client';

import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const PRODUCTS = [
  {
    id: '1',
    title: 'Roasted Green Tea',
    description:
      'Expertly crafted from freshly picked leaves, our roasted green tea offers a smooth, rich flavor with a distinctive aroma.',
    image: '/image/rampokh-about-us.jpg',
  },
  {
    id: '2',
    title: 'Orthodox Black Tea',
    description:
      'Bold, rich, and handcrafted black tea fully oxidized for deep flavor and smooth finish.',
    image: '/image/rampokh-about-us.jpg',
  },
  {
    id: '3',
    title: 'Pearl Green Tea',
    description:
      'Delicately rolled green tea with natural sweetness and rich antioxidants.',
    image: '/image/rampokh-about-us.jpg',
  },
  {
    id: '4',
    title: 'Oolong Tea',
    description:
      'Partially fermented tea with smooth aroma and premium taste.',
    image: '/image/rampokh-about-us.jpg',
  },
];

const Product = () => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  const visibleProducts = showAll ? PRODUCTS : PRODUCTS.slice(0, 3);

  return (
    <div className='bg-[rgb(247,244,244)] w-full'>
      <div className='container mx-auto'>
        <div className='pt-[64px]'>

          <h2 className='text-[32px] leading-[32px] font-bold'>
            Our Products
          </h2>

          <div className='pt-[54px]'>

            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className='col-span-12 md:col-span-12 mb-[32px]'
                data-aos='zoom-in-up'
              >

                {/* MOBILE VIEW (UNCHANGED) */}
                <div className='md:hidden'>
                  <div className='relative w-full rounded-xl overflow-hidden aspect-[16/9] mb-4'>
                    <Image
                      src={product.image}
                      alt={product.title}
                      className='object-cover'
                      fill
                      sizes='100vw'
                    />
                  </div>

                  <h3 className='text-[24px] leading-[28px] font-bold text-[#326E3B] mb-2'>
                    {product.title}
                  </h3>

                  <p className='text-[14px] leading-[24px] text-gray-700'>
                    {product.description}
                  </p>
                </div>

                {/* DESKTOP VIEW (UNCHANGED STRUCTURE) */}
                <div className='hidden md:grid md:grid-cols-12 md:gap-6 md:items-center'>

                  {index % 2 === 0 ? (
                    <>
                      <div className='col-span-6 mb-[32px] relative h-[350px] rounded-xl overflow-hidden'>
                        <Image
                          src={product.image}
                          alt={product.title}
                          className='object-cover'
                          fill
                          sizes='50vw'
                        />
                      </div>

                      <div className='col-start-8 col-span-5 mb-[32px]'>
                        <h3 className='text-[32px] leading-[32px] font-bold text-[#326E3B] mb-[32px]'>
                          {product.title}
                        </h3>
                        <p className='text-[16px] leading-[28px] text-gray-700'>
                          {product.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='col-span-5 mb-[32px]'>
                        <h3 className='text-[32px] leading-[32px] font-bold text-[#326E3B] mb-[32px]'>
                          {product.title}
                        </h3>
                        <p className='text-[16px] leading-[28px] text-gray-700'>
                          {product.description}
                        </p>
                      </div>

                      <div className='col-start-7 col-span-6 mb-[32px] relative h-[350px] rounded-xl overflow-hidden'>
                        <Image
                          src={product.image}
                          alt={product.title}
                          className='object-cover'
                          fill
                          sizes='50vw'
                        />
                      </div>
                    </>
                  )}

                </div>
              </div>
            ))}

            {/* BUTTON */}
            <div className='flex justify-center pb-[33px]'>
              <button
                onClick={() => setShowAll(!showAll)}
                className='bg-[#326E3B] hover:bg-[#2a5a32] text-white px-[32px] py-[16px] font-bold text-[16px] transition-colors duration-200 flex items-center gap-2 rounded-md cursor-pointer'
              >
                {showAll ? 'Show Less' : 'View More Products'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;