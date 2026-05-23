"use client";

import {
  addToCart,
  fetchCartItems,
} from "@/src/lib/store/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { fetchSingleProduct } from "@/src/lib/store/product/product-slice";
import { Status } from "@/src/lib/store/types/global-types";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SingleProducts = () => {
  const params = useParams();
  const id = params?.id as string;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { status, singleProduct } = useAppSelector(
    (store) => store.product
  );

  const { user } = useAppSelector((store) => store.auth);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  if (status === Status.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading product...</p>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

  const images =
    singleProduct.image?.length > 0
      ? singleProduct.image
      : [singleProduct.coverImage];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (id && singleProduct) {
      await dispatch(addToCart(id));
      await dispatch(fetchCartItems());
    }
  };

  return (
//     <>
//       <section className="min-h-screen bg-white dark:bg-[#0A2025] py-12 px-6">
//         <div className="max-w-6xl mx-auto bg-[#fff8e1] dark:bg-[#1E293B] rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10 border border-[#326E3B]/10">
          
//           {/* 🖼️ Product Gallery */}
//           <div>
//             {/* Main Image */}
//             <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
//               <img
//                 src={images[currentIndex]?.path}
//                 alt={singleProduct.name}
//                 className="w-full h-[400px] object-contain"
//               />

//               {/* Prev Button */}
//               <button
//                 onClick={prevSlide}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black shadow-lg rounded-full p-2 hover:scale-105 transition"
//               >
//                 <ChevronLeft size={22} />
//               </button>

//               {/* Next Button */}
//               <button
//                 onClick={nextSlide}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black shadow-lg rounded-full p-2 hover:scale-105 transition"
//               >
//                 <ChevronRight size={22} />
//               </button>
//             </div>

//             {/* Thumbnail Images */}
//             <div className="flex gap-3 mt-4 overflow-x-auto">
//               {images.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`min-w-[85px] h-[85px] rounded-xl overflow-hidden border-2 transition-all ${
//                     currentIndex === index
//                       ? "border-black dark:border-white"
//                       : "border-transparent"
//                   }`}
//                 >
//                   <img
//                     src={img.path}
//                     alt={`thumb-${index}`}
//                     className="w-full h-full object-cover bg-gray-100 dark:bg-gray-800"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* 📦 Product Info */}
//           {/* 📦 Product Info */}
// <div className="flex flex-col justify-center space-y-6">

//   {/* Category */}
//   <span className="w-fit px-4 py-1 rounded-full bg-[#326E3B]/10 text-sm font-medium text-[#326E3B] dark:bg-white/10 dark:text-white">
//     {singleProduct.category?.categoryName || "N/A"}
//   </span>

//   {/* Product Name */}
//   <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
//     {singleProduct.name}
//   </h1>

//   {/* Price */}
//   <div className="flex items-center gap-3">
//     <p className="text-3xl font-bold text-[#326E3B] dark:text-white">
//       ₹{singleProduct.price.toLocaleString()}
//     </p>

//     <span className="text-sm font-medium text-white bg-[#326E3B] px-3 py-1 rounded-full">
//       In Stock
//     </span>
//   </div>

//   {/* Description */}
//   <p className="text-gray-600 dark:text-gray-300 leading-8 text-base">
//     {singleProduct.description}
//   </p>

//   {/* Divider */}
//   <div className="border-t border-gray-200 dark:border-gray-700"></div>

//   {/* Buttons */}
//   <div className="flex flex-col sm:flex-row gap-4">
    
//     {/* Add to Cart */}
//     <button
//       onClick={handleAddToCart}
//       className="flex-1 py-4 rounded-xl bg-[#326E3B] text-white font-semibold hover:bg-[#25522d] transition-all duration-300"
//     >
//       Add to Cart
//     </button>

//     {/* Favourite */}
//     <button
//       className="flex-1 py-4 rounded-xl border border-[#326E3B] text-[#326E3B] font-semibold hover:bg-[#326E3B] hover:text-white transition-all duration-300"
//     >
//       Favourite
//     </button>
//   </div>



// </div>
//         </div>
//       </section>
//     </>
<section className="min-h-screen bg-white dark:bg-[#0A2025] py-12">

  <div className="container mx-auto px-[200px]">

    <div className="bg-[#fff8e1] dark:bg-[#1E293B] rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10 border border-[#326E3B]/10">

      {/* 🖼️ Product Gallery */}
      <div>

        {/* Main Image */}
        <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">

          <img
            src={images[currentIndex]?.path}
            alt={singleProduct.name}
            className="w-full h-[400px] object-contain"
          />

          {/* Prev */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black shadow-lg rounded-full p-2 hover:scale-105 transition"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black shadow-lg rounded-full p-2 hover:scale-105 transition"
          >
            <ChevronRight size={22} />
          </button>

        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4 overflow-x-auto">

          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`min-w-[85px] h-[85px] rounded-xl overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? "border-[#326E3B]"
                  : "border-transparent"
              }`}
            >
              <img
                src={img.path}
                alt={`thumb-${index}`}
                className="w-full h-full object-cover bg-gray-100 dark:bg-gray-800"
              />
            </button>
          ))}

        </div>

      </div>

      {/* 📦 Product Info */}
      <div className="flex flex-col justify-center space-y-6">

        {/* Category */}
        <span className="w-fit px-4 py-1 rounded-full bg-[#326E3B]/10 text-sm font-medium text-[#326E3B] dark:bg-white/10 dark:text-white">
          {singleProduct.category?.categoryName || "N/A"}
        </span>

        {/* Name */}
        <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
          {singleProduct.name}
        </h1>

        {/* Price */}
        <div className="flex items-center gap-3">

          <p className="text-3xl font-bold text-[#326E3B] dark:text-white">
            ₹{singleProduct.price.toLocaleString()}
          </p>

          <span className="text-sm font-medium text-white bg-[#326E3B] px-3 py-1 rounded-full">
            In Stock
          </span>

        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-8 text-base">
          {singleProduct.description}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 rounded-xl bg-[#326E3B] text-white font-semibold hover:bg-[#25522d] transition"
          >
            Add to Cart
          </button>

          <button
            className="flex-1 py-4 rounded-xl border border-[#326E3B] text-[#326E3B] font-semibold hover:bg-[#326E3B] hover:text-white transition"
          >
            Favourite
          </button>

        </div>

      </div>

    </div>

  </div>

</section>
  );
};

export default SingleProducts;