"use client";
import Link from "next/link";

import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { deleteCartItem, fetchCartItems, updateCartItem} from "@/src/lib/store/cart/cart-slice";


const CartPage = ()=>{
  
const dispatch = useAppDispatch();
const { items, status } = useAppSelector((store) => store.cart);
  console.log(items,':cartitems')

useEffect(() => {
  dispatch(fetchCartItems());
}, [dispatch]);

const totalItemInCarts = items.reduce(
  (total, item) => total + (item.quantity || 0),
  0
);

const totalPriceInCarts = items.reduce((total, item) => {
  const price = item.product?.price || 0;
  return total + price * (item.quantity || 0);
}, 0);
    // Loading State
const handleDelete =  async(productId: string) => {
  await dispatch(deleteCartItem(productId));
   console.log("DELETE clicked, productId =", productId);;
  dispatch(fetchCartItems());
}

const handleUpdate = async (productId: string, quantity: number) => {
  await dispatch(updateCartItem(productId, quantity));
  dispatch(fetchCartItems());
};

  if (status === 'loading') {
    return (
      <>
     
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-lg font-medium">Loading cart...</p>
        </div>
      
      </>
    );
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <>

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600">Add some products to get started!</p>
          </div>
        </div>
     
      </>
    );
  }
    return(
        <>
      
 <div className="min-h-screen bg-[#f7fff4] py-12">
  <div className="container mx-auto px-[200px]">

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* CART SECTION */}
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-[#d9f2d2] p-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#2d6a4f]">
            Shopping Cart
          </h2>

          <div className="bg-[#e9f9e5] text-[#2d6a4f] px-4 py-2 rounded-full text-sm font-semibold">
            {totalItemInCarts} Items
          </div>
        </div>

        <div className="space-y-6">

          {items.map((item, index) => {
            const product = item.product;
            if (!product) return null;

            const productId = item.productId || product?._id || "";

            const imageSrc = product?.coverImage?.path
              ? product.coverImage.path.startsWith("http")
                ? product.coverImage.path
                : `http://localhost:5000/${product.coverImage.path}`
              : "/placeholder.png";

            const price = product?.price || 0;

            return (
              <div
                key={productId || `${product?.name}-${index}`}
                className="border border-[#dff3d7] rounded-2xl p-5 hover:shadow-md transition-all duration-300 bg-[#fcfffb]"
              >

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                  {/* IMAGE */}
                  <div className="w-full md:w-[140px] h-[140px] relative overflow-hidden rounded-2xl bg-[#f4fff1] border border-[#dff3d7]">
                    <Image
                      src={imageSrc}
                      alt={product?.name || "product"}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#2d6a4f] mb-2">
                      {product?.name}
                    </h3>

                    <p className="text-gray-600 leading-7 text-sm">
                      {product?.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-[#f59e0b] text-2xl font-bold">
                        ₹{price}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-4 items-start md:items-end">

                    {/* QUANTITY */}
                    <div className="flex items-center bg-[#f3fff0] border border-[#ccebc5] rounded-xl overflow-hidden">

                      <button
                        onClick={() => handleUpdate(productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 text-lg font-bold text-[#2d6a4f] hover:bg-[#dff3d7] disabled:opacity-40"
                      >
                        -
                      </button>

                      <span className="w-12 text-center font-semibold text-[#2d6a4f]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleUpdate(productId, item.quantity + 1)}
                        disabled={item.quantity >= (product?.stock || 0)}
                        className="w-10 h-10 text-lg font-bold text-[#2d6a4f] hover:bg-[#dff3d7] disabled:opacity-40"
                      >
                        +
                      </button>

                    </div>

                    {/* TOTAL */}
                    <p className="text-xl font-bold text-[#2d6a4f]">
                      ₹{(price * item.quantity).toLocaleString()}
                    </p>

                    {/* REMOVE */}
                    <button
                      onClick={() => handleDelete(productId)}
                      className="bg-[#fff4e5] hover:bg-[#ffe7bf] text-[#f59e0b] px-5 py-2 rounded-xl font-semibold transition-all"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white rounded-3xl shadow-md border border-[#d9f2d2] p-8 h-fit sticky top-6">

        <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8">
          Order Summary
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between text-gray-700">
            <span>Total Items</span>
            <span className="font-semibold">{totalItemInCarts}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">
              ₹{totalPriceInCarts.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span className="font-semibold text-[#f59e0b]">
              ₹200
            </span>
          </div>

          <div className="border-t border-[#dff3d7] pt-5 flex justify-between text-2xl font-bold text-[#2d6a4f]">
            <span>Total</span>
            <span>
              ₹{(totalPriceInCarts + 200).toLocaleString()}
            </span>
          </div>

        </div>

        <Link href="/checkout">
          <button className="w-full mt-8 bg-[#2d6a4f] hover:bg-[#245c43] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-xl">
            Checkout Now
          </button>
        </Link>

        <div className="mt-6 bg-[#fff8ed] border border-[#ffe2b5] rounded-2xl p-4">
          <p className="text-sm text-[#d97706] leading-6">
            Secure checkout with fast delivery and premium tea products.
          </p>
        </div>

      </div>

    </div>
  </div>
</div>

        
        
        </>
    )
}


export default CartPage