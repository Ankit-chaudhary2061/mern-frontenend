import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <section className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/image/tea-garden-banner.jpg"
        alt="Tea Garden"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Discover Premium Tea
        </h1>

        <p className="text-white text-sm sm:text-lg mb-6 max-w-xl">
          Experience the finest handpicked teas from lush gardens.
        </p>

        {/* Shop Now Button */}
        <Link href="/shop">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition duration-300 shadow-lg">
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;