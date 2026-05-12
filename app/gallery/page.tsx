'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hook';
import { fetchGallery } from '@/src/lib/store/gallery/gallery-slice';

const FALLBACK_IMAGES = Array.from(
  { length: 18 },
  (_, i) => `/images/section${i + 1}.jpg`
);

const SliderGallery = () => {
  const dispatch = useAppDispatch();
  const { gallery, status } = useAppSelector((state) => state.gallery);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const imageSources =
    gallery.flatMap((item) => item.image.map((img) => img.path)) || FALLBACK_IMAGES;

  return (
    <div className='container mx-auto ' data-aos='zoom-in-up'>
      <div className='pb-16'>
        <div className='relative h-[300px] sm:h-[350px] md:h-[419px]'>
          {/* Custom Navigation */}
          <button
            className='swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-gray-300 bg-opacity-60 rounded-full shadow-md hover:bg-gray-400 hover:bg-opacity-90 transition'
            aria-label='Previous Slide'
          >
            ❮
          </button>
          <button
            className='swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-gray-300 bg-opacity-60 rounded-full shadow-md hover:bg-gray-400 hover:bg-opacity-90 transition'
            aria-label='Next Slide'
          >
            ❯
          </button>

          {/* Swiper Component */}
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
          >
            {imageSources.map((src, index) => (
              <SwiperSlide key={src + index}>
                <div className='relative h-[250px] sm:h-[300px] md:h-[419px] w-full rounded-xl overflow-hidden'>
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className='object-cover transition-transform duration-500 hover:scale-105'
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderGallery;