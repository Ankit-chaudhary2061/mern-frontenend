"use client";

import { fetchCartItems, clearCart } from "@/src/lib/store/cart/cart-slice";
import { orderItem } from "@/src/lib/store/checkout/checkout-slice";

import {
  ItemDetails,
  OrderData,
  PaymentMethod,
} from "@/src/lib/store/checkout/checkout-slice-types";

import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";

import { Status } from "@/src/lib/store/types/global-types";

import { useRouter } from "next/navigation";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

const CheckoutPage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();


  const { items = [], status: cartStatus } =
    useAppSelector((store) => store.cart);


  const {
  
    status: orderStatus,
  } = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);


  const subtotal = items.reduce(
    (total, item) =>
      total +
      item.quantity *
        Number(item.product?.price || 0),
    0
  );

  const shippingFee = 200;

  const totalAmount = subtotal + shippingFee;

  // ✅ PAYMENT METHOD
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod | "">("");

  // ✅ FORM DATA
  const [data, setData] = useState<OrderData>({
    shippingAddress: "",
    phoneNumber: "",
    totalAmount: 0,

    paymentDetails: {
      paymentMethod: PaymentMethod.COD,
    },

    items: [],
  });

  // ✅ TRACK IF ORDER WAS SUBMITTED
  const [orderSubmitted, setOrderSubmitted] =
    useState(false);


  const handlePaymentMethod = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.value as PaymentMethod;

    setPaymentMethod(value);

    setData((prev) => ({
      ...prev,

      paymentDetails: {
        paymentMethod: value,
      },
    }));
  };

  
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!paymentMethod) {
    toast.error("Please select payment method");
    return;
  }

  if (!data.phoneNumber || !data.phoneNumber.trim()) {
    toast.error("Phone number is required");
    return;
  }

  if (!data.shippingAddress || !data.shippingAddress.trim()) {
    toast.error("Shipping address is required");
    return;
  }

  if (!items.length) {
    toast.error("Cart is empty");
    return;
  }

  const itemDetails: ItemDetails[] = items.map((item) => ({
    productId: item.productId || item.product?._id || "",
    quantity: item.quantity,
  }));

  const orderData: OrderData = {
    ...data,
    items: itemDetails,
    totalAmount,
    paymentDetails: {
      paymentMethod,
    },
  };

  // setOrderSubmitted(true);
  // await dispatch(orderItem(orderData));
  setOrderSubmitted(true);

const responseData = await dispatch(
  orderItem(orderData) as any
);

console.log(responseData);

// ================= Khalti =================
if (
  responseData?.payment_url &&
  responseData?.pidx
) {

  window.location.href =
    responseData.payment_url;

  return;
}

// ================= eSewa =================
if (
  responseData?.payment_url &&
  responseData?.data
) {

  window.location.href =
    responseData.payment_url;

  return;
}
};

  // ✅ SUCCESS / REDIRECT
useEffect(() => {

  if (!orderSubmitted) return;

  // ================= COD =================
  if (
    orderStatus === Status.SUCCESS &&
    paymentMethod === PaymentMethod.COD
  ) {

    toast.success(
      "Order placed successfully!"
    );

    dispatch(clearCart());

    setOrderSubmitted(false);

    setTimeout(() => {
      router.push("/my-order");
    }, 1500);
  }

}, [
  orderStatus,
  paymentMethod,
  router,
  dispatch,
  orderSubmitted,
]);

  // ✅ LOADING
  if (cartStatus === Status.LOADING) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading cart...
      </div>
    );
  }

  return (
//      <div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-green-50">
    
//     {/* Header */}
//     <div className="border-b border-orange-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
//       <div className="mx-auto max-w-7xl px-4 py-6">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Checkout
//         </h1>

//         <p className="mt-2 text-sm text-gray-600">
//           Complete your order securely and quickly
//         </p>
//       </div>
//     </div>

//     {/* Main */}
//     <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2">
      
//       {/* LEFT SIDE */}
//       <div>
//         {/* Title */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             Order Summary
//           </h2>

//           <p className="mt-1 text-sm text-gray-600">
//             Review your selected products
//           </p>
//         </div>

//         {/* Products */}
//         <div className="space-y-6">
//           {items.length > 0 &&
//             items.map((item) => (
//               <div
//                key={`${item.product?._id}-${item.quantity}-${item.productId}`}
//                 className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//               >
//                 {/* Top Glow */}
//                 <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-orange-400 via-yellow-400 to-green-400" />

//                 <div className="flex gap-5">
                  
//                   {/* Image */}
//                   <div className="relative">
//                     <img
//                       src={item.product?.image?.[0]?.path}
//                       alt={item.product?.name}
//                       className="h-32 w-32 rounded-2xl object-cover border border-orange-100"
//                     />

//                     {/* Quantity */}
//                     <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-lg">
//                       {item.quantity}
//                     </span>
//                   </div>

//                   {/* Details */}
//                   <div className="flex flex-1 flex-col justify-between">
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900">
//                         {item.product?.name}
//                       </h3>

//                       <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
//                         {item.product?.category?.categoryName}
//                       </span>
//                     </div>

//                     <div className="mt-5 flex items-end justify-between">
//                       <div>
//                         <p className="text-sm text-gray-500">
//                           Price
//                         </p>

//                         <p className="text-2xl font-bold text-green-600">
//                           Rs.{" "}
//                           {item.product?.price * item.quantity}
//                         </p>
//                       </div>

//                       <div className="rounded-xl bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
//                         Rs. {item.product?.price} each
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* Payment Methods */}
//         {/* Payment Methods */}
// <div className="mt-10 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
//   <h3 className="text-xl font-bold text-gray-900">
//     Payment Method
//   </h3>

//   <div className="mt-6 space-y-4">

//     {/* COD */}
//     <label
//       className="flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300
//       hover:border-blue-400
//       has-checked:border-blue-500
//       has-checked:bg-blue-50"
//     >
//       <input
//         type="radio"
//         name="payment"
//         value={PaymentMethod.COD}
//         checked={paymentMethod === PaymentMethod.COD}
//         onChange={handlePaymentMethod}
//         className="h-5 w-5 accent-blue-500"
//       />

//       <div className="flex-1">
//         <p className="font-semibold text-gray-900">
//           Cash on Delivery
//         </p>

//         <p className="text-sm text-gray-500">
//           Pay after receiving your order
//         </p>
//       </div>

//       <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
//         COD
//       </div>
//     </label>

//     {/* Khalti */}
//     <label
//       className="flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300
//       hover:border-purple-400
//       has-checked:border-purple-500
//       has-checked:bg-purple-50"
//     >
//       <input
//         type="radio"
//         name="payment"
//         value={PaymentMethod.KHALTI}
//         checked={paymentMethod === PaymentMethod.KHALTI}
//         onChange={handlePaymentMethod}
//         className="h-5 w-5 accent-purple-500"
//       />

//       <div className="flex-1">
//         <p className="font-semibold text-gray-900">
//           Khalti Payment
//         </p>

//         <p className="text-sm text-gray-500">
//           Secure online payment using Khalti
//         </p>
//       </div>

//       <div className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
//         Online
//       </div>
//     </label>

//     {/* eSewa */}
//     <label
//       className="flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300
//       hover:border-green-400
//       has-checked:border-green-500
//       has-checked:bg-green-50"
//     >
//       <input
//         type="radio"
//         name="payment"
//         value={PaymentMethod.ESEWA}
//         checked={paymentMethod === PaymentMethod.ESEWA}
//         onChange={handlePaymentMethod}
//         className="h-5 w-5 accent-green-500"
//       />

//       <div className="flex-1">
//         <p className="font-semibold text-gray-900">
//           eSewa Payment
//         </p>

//         <p className="text-sm text-gray-500">
//           Pay securely using your eSewa wallet
//         </p>
//       </div>

//       <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//         eSewa
//       </div>
//     </label>
//   </div>
// </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <form
//         onSubmit={handleSubmit}
//         className="sticky top-24 h-fit overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl"
//       >
//         {/* Top Banner */}
//        {/* Top Banner */}
// <div className="bg-linear-to-r from-green-500 via-emerald-500 to-lime-500 p-6 text-white">
//   <h2 className="text-2xl font-bold">
//     Payment Details
//   </h2>

//   <p className="mt-2 text-sm text-white/90">
//     Enter your delivery information
//   </p>
// </div>

//         <div className="p-6">
          
//           {/* Inputs */}
//           <div className="space-y-5">

//             {/* Phone */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Phone Number
//               </label>

//               <input
//                 type="text"
//                 onChange={handleChange}
//                 name="phoneNumber"
//                 value={data.phoneNumber}
//                 placeholder="98XXXXXXXX"
//                 required
//                 className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm outline-none transition-all duration-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
//               />
//             </div>

//             {/* Address */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Shipping Address
//               </label>

//               <input
//                 type="text"
//                 name="shippingAddress"
//                 value={data.shippingAddress}
//                 onChange={handleChange}
//                 placeholder="Enter your full address"
//                 required
//                 className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm outline-none transition-all duration-300 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-100"
//               />
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="mt-8 rounded-2xl bg-linear-to-br from-orange-50 via-yellow-50 to-green-50 p-5">
            
//             <h3 className="text-lg font-bold text-gray-900">
//               Order Summary
//             </h3>

//             <div className="mt-5 space-y-4 text-sm">
              
//               <div className="flex justify-between">
//                 <span className="text-gray-600">
//                   Subtotal
//                 </span>

//                 <span className="font-semibold">
//                   Rs.{" "}
//                   {subtotal}
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">
//                   Shipping Fee
//                 </span>

//                 <span className="font-semibold text-orange-600">
//                   Rs. 200
//                 </span>
//               </div>

//               <div className="border-t border-orange-200 pt-4">
//                 <div className="flex justify-between">
//                   <span className="text-lg font-bold text-gray-900">
//                     Total
//                   </span>

//                   <span className="text-2xl font-bold text-green-600">
//                     Rs.{" "}
//                     {totalAmount}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Button */}
//          {/* COD */}
// {paymentMethod === PaymentMethod.COD && (
//   <button
//     type="submit"
//     className="mt-8 w-full rounded-2xl bg-linear-to-r from-blue-500 to-blue-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
//   >
//     Place Order
//   </button>
// )}

// {/* Khalti */}
// {paymentMethod === PaymentMethod.KHALTI && (
//   <button
//     type="submit"
//     className="mt-8 w-full rounded-2xl bg-linear-to-r from-purple-500 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
//   >
//     Pay with Khalti
//   </button>
// )}

// {/* eSewa */}
// {paymentMethod === PaymentMethod.ESEWA && (
//   <button
//     type="submit"
//     className="mt-8 w-full rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
//   >
//     Pay with eSewa
//   </button>
// )}

// {/* DEFAULT - NO PAYMENT METHOD SELECTED */}
// {!paymentMethod && (
//   <button
//     type="button"
//     disabled
//     className="mt-8 w-full rounded-2xl bg-gray-300 py-4 text-lg font-semibold text-gray-500 shadow-lg cursor-not-allowed"
//   >
//     Select Payment Method
//   </button>
// )}
//         </div>
//       </form>
//     </div>
//   </div>
<div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-green-50">

  {/* HEADER */}
  <div className="border-b border-orange-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
    <div className="container mx-auto px-[200px] py-6">

      <h1 className="text-3xl font-bold text-gray-900">
        Checkout
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Complete your order securely and quickly
      </p>

    </div>
  </div>

  {/* MAIN */}
  <div className="container mx-auto px-[200px] grid grid-cols-1 lg:grid-cols-2 gap-8 py-10">

    {/* LEFT SIDE */}
    <div>

      {/* TITLE */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Order Summary
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Review your selected products
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="space-y-6">

        {items.map((item) => (
          <div
            key={`${item.product?._id}-${item.quantity}-${item.productId}`}
            className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

           

            <div className="flex gap-5">

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.product?.image?.[0]?.path}
                  alt={item.product?.name}
                  className="h-32 w-32 rounded-2xl object-cover border border-orange-100"
                />

                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-lg">
                  {item.quantity}
                </span>
              </div>

              {/* DETAILS */}
              <div className="flex flex-1 flex-col justify-between">

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.product?.name}
                  </h3>

                  <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                    {item.product?.category?.categoryName}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Price
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                      Rs. {item.product?.price * item.quantity}
                    </p>
                  </div>

                  <div className="rounded-xl bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
                    Rs. {item.product?.price} each
                  </div>

                </div>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* PAYMENT METHODS */}
     <div className="mt-10 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm text-black">

  <h3 className="text-xl font-bold text-black">
    Payment Method
  </h3>

  <div className="mt-6 space-y-4">

    {/* COD */}
    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all hover:border-blue-400 has-checked:border-blue-500 has-checked:bg-blue-50 text-black">
      <input
        type="radio"
        name="payment"
        value={PaymentMethod.COD}
        checked={paymentMethod === PaymentMethod.COD}
        onChange={handlePaymentMethod}
        className="h-5 w-5 accent-blue-500"
      />

      <div className="flex-1">
        <p className="font-semibold text-black">Cash on Delivery</p>
        <p className="text-sm text-black">
          Pay after receiving your order
        </p>
      </div>
    </label>

    {/* KHALTI */}
    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all hover:border-purple-400 has-checked:border-purple-500 has-checked:bg-purple-50 text-black">
      <input
        type="radio"
        name="payment"
        value={PaymentMethod.KHALTI}
        checked={paymentMethod === PaymentMethod.KHALTI}
        onChange={handlePaymentMethod}
        className="h-5 w-5 accent-purple-500"
      />

      <div className="flex-1">
        <p className="font-semibold text-black">Khalti Payment</p>
        <p className="text-sm text-black">
          Secure online payment
        </p>
      </div>
    </label>

    {/* ESEWA */}
    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all hover:border-green-400 has-checked:border-green-500 has-checked:bg-green-50 text-black">
      <input
        type="radio"
        name="payment"
        value={PaymentMethod.ESEWA}
        checked={paymentMethod === PaymentMethod.ESEWA}
        onChange={handlePaymentMethod}
        className="h-5 w-5 accent-green-500"
      />

      <div className="flex-1">
        <p className="font-semibold text-black">eSewa Payment</p>
        <p className="text-sm text-black">
          Pay using wallet
        </p>
      </div>
    </label>

  </div>
</div>
    </div>

    {/* RIGHT SIDE */}
    <form
      onSubmit={handleSubmit}
      className="sticky top-24 h-fit overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl"
    >

      <div className="bg-[#326E3B] p-6 text-white">
        <h2 className="text-2xl font-bold">
          Payment Details
        </h2>

        <p className="mt-2 text-sm text-white/90">
          Enter your delivery information
        </p>
      </div>

      <div className="p-6 space-y-5 text-black">

  <input
    type="text"
    name="phoneNumber"
    value={data.phoneNumber}
    onChange={handleChange}
    placeholder="Phone Number"
    className="w-full rounded-2xl border px-4 py-4 text-black"
  />

  <input
    type="text"
    name="shippingAddress"
    value={data.shippingAddress}
    onChange={handleChange}
    placeholder="Shipping Address"
    className="w-full rounded-2xl border px-4 py-4 text-black"
  />

  {/* SUMMARY */}
  <div className="rounded-2xl bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-5 text-black">

    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>Rs. {subtotal}</span>
    </div>

    <div className="flex justify-between">
      <span>Shipping</span>
      <span>Rs. 200</span>
    </div>

    <div className="border-t mt-4 pt-4 flex justify-between text-xl font-bold">
      <span>Total</span>
      <span>Rs. {totalAmount}</span>
    </div>

  </div>

  {/* BUTTONS */}
  {!paymentMethod && (
    <button disabled className="w-full bg-gray-300 py-4 rounded-2xl text-black">
      Select Payment Method
    </button>
  )}

  {paymentMethod === PaymentMethod.COD && (
    <button className="w-full bg-blue-500 text-white py-4 rounded-2xl">
      Place Order
    </button>
  )}

  {paymentMethod === PaymentMethod.KHALTI && (
    <button className="w-full bg-purple-500 text-white py-4 rounded-2xl">
      Pay with Khalti
    </button>
  )}

  {paymentMethod === PaymentMethod.ESEWA && (
    <button className="w-full bg-green-500 text-white py-4 rounded-2xl">
      Pay with eSewa
    </button>
  )}

</div>
    </form>

  </div>
</div>
  );
};

export default CheckoutPage;