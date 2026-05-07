'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import AOS from 'aos';

interface ProductData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const PRODUCTS: ProductData[] = [
  {
    id: 'orthodox-black',
    title: 'Orthodox Black Tea',
    description:
      'Bold, rich, and handcrafted, our Orthodox Black Tea is fully oxidized for a deep flavor and smooth finish. Made from premium Camellia sinensis leaves, it is rich in unique antioxidants that support heart health, digestion, and overall wellness — a perfect energizing brew for tea lovers seeking both strength and benefits.',
    imageSrc: '/image/rampokh-about-us.jpg',
    imageAlt: 'Orthodox Black Tea',
  },
  {
    id: 'pearl-green',
    title: 'Pearl Green Tea',
    description:
      'Crafted from tender, hand-picked second-flush leaves, our Pearl Green Tea is delicately rolled for a smooth, refreshing taste with natural sweetness. Rich in antioxidants and nutrients, it supports overall wellness while offering exceptional flavor — a perfect balance of health and taste.',
    imageSrc: '/image/rampokh-about-us.jpg',
    imageAlt: 'Pearl Green Tea',
  },
  {
    id: 'oolong-tea',
    title: 'Premium Oolong Tea',
    description:
      'Partially fermented and carefully rolled, our Premium Oolong Tea delivers a delicate aroma and a smooth taste. Rich in antioxidants, it supports metabolism and overall health — a refined tea experience for connoisseurs.',
    imageSrc: '/image/rampokh-about-us.jpg',
    imageAlt: 'Premium Oolong Tea',
  },
];

const ProductCard: React.FC<{ product: ProductData; index: number }> = ({
  product,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className='bg-[rgb(247,244,244)] w-full'>
      <div className='container mx-auto'>
        <div className='mb-8'>
          {/* Mobile view */}
          <div className='md:hidden flex flex-col gap-4'>
            <div className='relative h-[250px] w-full rounded-xl overflow-hidden'>
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                className='object-cover'
                fill
                sizes='100vw'
              />
            </div>
            <h3 className='text-[24px] font-bold text-[#326E3B] leading-[28px]'>
              {product.title}
            </h3>
            <p className='text-[14px] leading-[24px] text-black'>
              {product.description}
            </p>
          </div>

          {/* Tablet/Desktop view */}
          <div className='hidden md:grid md:grid-cols-12 md:gap-6 md:items-center'>
            {isEven ? (
              <>
                <div className='col-span-5' data-aos='zoom-in-up'>
                  <h3 className='text-[32px] font-bold text-[#326E3B] mb-[32px] leading-[32px]'>
                    {product.title}
                  </h3>
                  <p className='text-[16px] leading-[28px] text-gray-700'>
                    {product.description}
                  </p>
                </div>
                <div
                  className='col-start-7 col-span-6 relative h-[350px] rounded-xl overflow-hidden'
                  data-aos='zoom-in-up'
                >
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className='object-cover'
                    fill
                    sizes='50vw'
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  className='col-span-6 relative h-[350px] rounded-xl overflow-hidden'
                  data-aos='zoom-in-up'
                >
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className='object-cover'
                    fill
                    sizes='50vw'
                  />
                </div>
                <div className='col-start-8 col-span-5' data-aos='zoom-in-up'>
                  <h3 className='text-[32px] font-bold text-[#326E3B] mb-[32px] leading-[32px]'>
                    {product.title}
                  </h3>
                  <p className='text-[16px] leading-[28px] text-gray-700'>
                    {product.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowHideProduct: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleShowMore = useCallback(() => {
    if (containerRef.current) {
      setScrollPosition(window.scrollY);
    }
    setIsVisible(true);
  }, []);

  const handleShowLess = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }, 600);
  }, [scrollPosition]);

  return (
    <div className='bg-[rgb(247,244,244)] w-full'>
      <div data-aos='zoom-in-up' ref={containerRef}>
        {!isVisible && (
          <div className='flex justify-center pb-[33px]' data-aos='zoom-in-up'>
            <button
              onClick={handleShowMore}
              className='bg-[#326E3B] hover:bg-[#2a5a32] text-white px-[32px] py-[16px] font-bold text-[16px] transition-colors duration-200 flex items-center gap-2 rounded-md cursor-pointer'
              aria-label='View all product components'
            >
              View More Products
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div>
              {PRODUCTS.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className='flex justify-center px-[33px] pb-[33px]' data-aos='zoom-in-up'>
              <button
                onClick={handleShowLess}
                className='bg-[#326E3B] hover:bg-[#2a5a32] text-white px-[32px] py-[16px] font-bold text-[16px] transition-colors duration-200 flex items-center gap-2 rounded-md cursor-pointer'
                aria-label='Show less product components'
              >
                Show Less
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowHideProduct;