"use client"


import { addToCart, fetchCartItems, setItems } from "@/src/lib/store/cart/cart-slice"
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook"
import { fetchSingleProduct } from "@/src/lib/store/product/product-slice"
import { Status } from "@/src/lib/store/types/global-types"
import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"







const SingleProducts = ()=>{
 const params = useParams()
  const id = params?.id as string
  const dispatch = useAppDispatch()
  const router = useRouter()

    const { status, singleProduct } = useAppSelector(
    (store) => store.product
  )
  const { user } = useAppSelector((store) => store.auth)

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id))
    }
  }, [id, dispatch])

  
  if (status === Status.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading product...</p>
      </div>
    )
  }
console.log(singleProduct,':single product')
  if (!singleProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Product not found</p>
      </div>
    )
  }
   const handleAddToCart = async() => {
    if (!user) {
      router.push('/login');
      return;
    }
   if (id && singleProduct) {
  await dispatch(addToCart(id));
await dispatch(fetchCartItems()); 
}
  }
    return(
        <>
       
          <section className="min-h-screen bg-gray-50 dark:bg-[#0A2025] py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">

        {/* 🖼️ Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={singleProduct.coverImage.path}
            alt={singleProduct.name}
            className="w-80 h-80 object-contain rounded-xl bg-gray-100 dark:bg-gray-800 p-4"
          />
        </div>

        {/* 📦 Product Info */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {singleProduct.name}
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Category:
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-200">
              {singleProduct.category?.categoryName || 'N/A'}
            </span>
          </div>

          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            ₹{singleProduct.price.toLocaleString()}
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {singleProduct.description}
          </p>

          {/* 🛒 Actions */}
          <div className="flex gap-4 mt-6">
            <button 
              onClick={handleAddToCart} 
              className="flex-1 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            
            >
              Add to Cart
            </button>

            <button 
              className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
           
            >
              Favourite
            </button>
          </div>
        </div>
      </div>
    </section>
        </>
    )
}

export default SingleProducts