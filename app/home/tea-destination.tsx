'use client';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

const destinations = [
  {
    name: 'Thailand',
    image: '/images/thailand.jpg',
    location: 'Bangkok',
    mapsUrl: 'https://www.google.com/maps/place/Bangkok,+Thailand',
  },
  {
    name: 'New Zealand',
    image: '/images/newzealand.jpg',
    location: 'Auckland',
    mapsUrl: 'https://www.google.com/maps/place/Auckland,+New+Zealand',
  },
  {
    name: 'Australia',
    image: '/images/australia.jpg',
    location: 'Sydney',
    mapsUrl: 'https://www.google.com/maps/place/Sydney,+Australia',
  },
  {
    name: 'France',
    image: '/images/france.jpg',
    location: 'Paris',
    mapsUrl: 'https://www.google.com/maps/place/Paris,+France',
  },
  {
    name: 'Norway',
    image: '/images/norway.jpg',
    location: 'Oslo',
    mapsUrl: 'https://www.google.com/maps/place/Oslo,+Norway',
  },
  {
    name: 'Maldives',
    image: '/images/maldives.jpg',
    location: 'Malé',
    mapsUrl: 'https://www.google.com/maps/place/Malé,+Maldives',
  },
  {
    name: 'Canada',
    image: '/images/canada.jpg',
    location: 'Toronto',
    mapsUrl: 'https://www.google.com/maps/place/Toronto,+Canada',
  },
  {
    name: 'Italy',
    image: '/images/italy.jpg',
    location: 'Rome',
    mapsUrl: 'https://www.google.com/maps/place/Rome,+Italy',
  },
];

const TopSearchedSpots = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 100 });
  }, []);

  return (
    <div className='container mx-auto w-full '>
      {/* Heading Section */}
      <div className='py-[20px]'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full'>
          {/* Left Heading */}
          <div className='md:col-span-6' data-aos='zoom-in-up'>
            <h2 className='text-[28px] sm:text-[32px] leading-[32px] font-bold'>
              Our Tea
            </h2>
            <h2 className='text-[28px] sm:text-[32px] text-[#326E3B] leading-[32px] font-bold'>
              From Nepal to
            </h2>
            <h2 className='text-[28px] sm:text-[32px] text-[#326E3B] leading-[32px] font-bold'>
              the World
            </h2>
          </div>

          {/* Right Description */}
          <div className='md:col-start-1 col-span-6' data-aos='zoom-in-up'>
            <p className='text-[16px] leading-[28px] text-gray-700'>
              From Ilam&apos;s hills to All Bhat-Bhateni shelves, our tea
              travels across Nepal and reaches Hong Kong, Australia, the USA,
              and China — delighting tea lovers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className='py-[20px]'>
        <div
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto'
          data-aos='zoom-in-up'
        >
          {destinations.map((place, index) => (
            <a
              key={index}
              href={place.mapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='cursor-pointer'
            >
              <div
                className='bg-white shadow-md border border-gray-400 rounded-xl py-[8px] px-[20px] flex justify-start items-center gap-4 hover:shadow-lg transition'
                data-aos='zoom-in-up'
              >
                {/* Image */}
                <div className='relative w-16 h-16 rounded-full overflow-hidden'>
                  <Image
                    src={place.image}
                    alt={`${place.name} - ${place.location}`}
                    fill
                    sizes='64px'
                    className='object-cover rounded-full'
                  />
                </div>

                {/* Text */}
                <div className='flex justify-between items-center w-full'>
                  <div className='gap-1'>
                    <h3 className='text-gray-800 text-[16px] leading-[16px] font-bold'>
                      {place.name}
                    </h3>
                  </div>
                  <ArrowRight className='text-[#326E3B]' size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSearchedSpots;