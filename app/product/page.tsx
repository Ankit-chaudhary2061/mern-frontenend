'use client';

import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hook';
import { fetchProduct } from '@/src/lib/store/product/product-slice';
import Link from 'next/link';
import { addToCart, fetchCartItems } from '@/src/lib/store/cart/cart-slice';
import { useRouter } from 'next/navigation';

const Product = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store.product);
  const { user } = useAppSelector((store) => store.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  const visibleProducts = showAll ? product : product.slice(0, 3);

const handleAddToCart = async (productId: string) => {
  if (!user) {
    router.push('/login');
    return;
  }

  await dispatch(addToCart(productId));
};
const handleShopNow = async (productId: string) => {
  if (!user) {
    router.push('/login');
    return;
  }

  await dispatch(addToCart(productId));

  router.push('/checkout');
};;

  return (
    <div className='bg-[rgb(247,244,244)] w-full'>
      <div className='container mx-auto'>
        <div className='pt-16'>

          <h2 className='text-3xl leading-8 font-bold text-black'>
            Our Products
          </h2>

          <div className='pt-14'>

           {visibleProducts.map((product) => (
  <div
    key={product._id}
    className='col-span-12 md:col-span-12 mb-8 cursor-pointer'
    data-aos='zoom-in-up'
  >

                {/* MOBILE VIEW (UNCHANGED) */}
                <div className='md:hidden'>
                  <Link href={`/product/${product._id}`}>
                    <div className='relative w-full rounded-xl overflow-hidden aspect-video mb-4'>
                      <Image
                        src={product.image?.[0]?.path}
                        alt={product.name}
                        className='object-cover'
                        fill
                        sizes='100vw'
                      />
                    </div>

                    <h3 className='text-2xl leading-7 font-bold text-[#326E3B] mb-2'>
                      {product.name}
                    </h3>

                    <p className='text-sm leading-6 text-gray-700'>
                      {product.description}
                    </p>
                  </Link>
                  <div className='flex gap-2 mt-4'>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className='flex-1 bg-[#326E3B] text-white py-2 px-4 rounded-md font-medium hover:bg-[#2a5a32] transition'
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleShopNow(product._id)}
                      className='flex-1 border border-[#326E3B] text-[#326E3B] py-2 px-4 rounded-md font-medium hover:bg-[#326E3B] hover:text-white transition'
                    >
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* DESKTOP VIEW (UNCHANGED STRUCTURE) */}
                <div className='hidden md:grid md:grid-cols-12 md:gap-6 md:items-center'>

                  {visibleProducts.indexOf(product) % 2 === 0 ? (
                    <>
                      <Link href={`/product/${product._id}`} className='col-span-6 mb-8 relative h-87.5 rounded-xl overflow-hidden'>
                        <Image
                          src={product.image?.[0]?.path}
                          alt={product.name}
                          className='object-cover'
                          fill
                          sizes='50vw'
                        />
                      </Link>

                      <div className='col-start-8 col-span-5 mb-8'>
                        <Link href={`/product/${product._id}`}>
                          <h3 className='text-3xl leading-8 font-bold text-[#326E3B] mb-8'>
                            {product.name}
                          </h3>
                          <p className='text-base leading-7 text-gray-700'>
                            {product.description}
                          </p>
                        </Link>
                        <div className='flex gap-2 mt-4'>
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className='flex-1 bg-[#326E3B] text-white py-2 px-4 rounded-md font-medium hover:bg-[#2a5a32] transition'
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleShopNow(product._id)}
                            className='flex-1 border border-[#326E3B] text-[#326E3B] py-2 px-4 rounded-md font-medium hover:bg-[#326E3B] hover:text-white transition'
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='col-span-5 mb-8'>
                        <Link href={`/product/${product._id}`}>
                          <h3 className='text-3xl leading-8 font-bold text-[#326E3B] mb-8'>
                            {product.name}
           
                          </h3>
                          <p className='text-base leading-7 text-gray-700'>
                            {product.description}
                          </p>
                        </Link>
                        <div className='flex gap-2 mt-4'>
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className='flex-1 bg-[#326E3B] text-white py-2 px-4 rounded-md font-medium hover:bg-[#2a5a32] transition'
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleShopNow(product._id)}
                            className='flex-1 border border-[#326E3B] text-[#326E3B] py-2 px-4 rounded-md font-medium hover:bg-[#326E3B] hover:text-white transition'
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>

                      <Link href={`/product/${product._id}`} className='col-start-7 col-span-6 mb-8 relative h-87.5 rounded-xl overflow-hidden'>
                        <Image
                          src={product.image?.[0]?.path}
                          alt={product.name}
                          className='object-cover'
                          fill
                          sizes='50vw'
                        />
                      </Link>
                    </>
                  )}

                </div>
              </div>
            ))}

            {/* BUTTON */}
            <div className='flex justify-center pb-8'>
              <button
                onClick={() => setShowAll(!showAll)}
                className='bg-[#326E3B] hover:bg-[#2a5a32] text-white px-8 py-4 font-bold text-base transition-colors duration-200 flex items-center gap-2 rounded-md cursor-pointer'
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