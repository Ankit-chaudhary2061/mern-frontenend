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

const FALLBACK_IMAGES = [
  '/image/picking-tea.jpg',
  '/image/rampokh-about-us.jpg',
  '/image/tea-garden-banner.jpg',
];

const SliderGallery = () => {
  const dispatch = useAppDispatch();
  const { gallery } = useAppSelector((state) => state.gallery);

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

  const galleryImages =
    gallery
      ?.flatMap((item) => item?.image ?? [])
      .map((img) => img?.path)
      .filter((path): path is string => Boolean(path)) ?? [];

  const imageSources = galleryImages.length > 0 ? galleryImages : FALLBACK_IMAGES;

  return (
   <section className="relative w-full bg-white">
  <div className="container mx-auto px-[200px] py-[60px]" data-aos="zoom-in-up">

    <div className="pb-16">

      {/* HEADER TEXT */}
      <div className="mb-10 text-center" data-aos="fade-up">
        <p className="text-sm uppercase tracking-[0.35em] text-[#326E3B] font-semibold mb-3">
          Tea Gallery
        </p>

        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-slate-900">
          Moments from the garden to your cup
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Experience our premium green tea journey through vivid farm and product images curated from the latest collection.
        </p>
      </div>

      {/* SWIPER WRAPPER */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[419px]">

        {/* NAVIGATION BUTTONS */}
        <button
          className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-gray-300/60 rounded-full shadow-md hover:bg-gray-400/80 transition"
          aria-label="Previous Slide"
        >
          ❮
        </button>

        <button
          className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-gray-300/60 rounded-full shadow-md hover:bg-gray-400/80 transition"
          aria-label="Next Slide"
        >
          ❯
        </button>

        {/* SWIPER */}
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
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
              <div className="relative h-[250px] sm:h-[300px] md:h-[419px] w-full rounded-xl overflow-hidden">

                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  </div>
</section>
  );
};

export default SliderGallery;