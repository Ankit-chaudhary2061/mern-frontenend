"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { Status } from "@/src/lib/store/types/global-types";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchMyOrderDetails,
  updateOrderStatus,
  updateOrderStatusAsync,
} from "@/src/lib/store/checkout/checkout-slice";
import {
  OrderStatus,
  OrderDetails,
  MyOrderData,
} from "@/src/lib/store/checkout/checkout-slice-types";

const MyOrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const orderDetails = useAppSelector(
    (store) => store.order.orderDetails
  ) as OrderDetails[];
  const status = useAppSelector(
    (store) => store.order.status
  );

  // FETCH ORDER DETAILS
  useEffect(() => {
    if (id) {
      dispatch(fetchMyOrderDetails(id));
    }
  }, [id, dispatch]);

  // CANCEL ORDER
  console.log("Order Details:", orderDetails);
  orderDetails.forEach((item) => {
    console.log(item.product?.coverImage?.path);
  });

  // LOADING
  if (status === Status.LOADING) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading order details...
        </p>
      </div>
    );
  }

  // EMPTY
  if (!orderDetails || orderDetails.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No order details found
          </h2>

          <button
            onClick={() => router.push("/my-order")}
            className="mt-5 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const order: MyOrderData | undefined = orderDetails[0]?.order;

  return (
    // <div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-green-50 px-4 py-10">
    //   <div className="mx-auto max-w-7xl space-y-8">
    //     {/* HEADER */}
    //     <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-lg">
    //       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    //         <div>
    //           <h1 className="text-4xl font-bold text-green-700">
    //             Order Details
    //           </h1>

    //           <p className="mt-2 text-gray-600">
    //             Order ID:
    //             <span className="ml-2 font-semibold text-orange-600">
    //               #{order?._id?.slice(0, 12)}
    //             </span>
    //           </p>

    //           <p className="mt-1 text-sm text-gray-500">
    //             Placed on{" "}
    //             {new Date(order?.createdAt).toLocaleDateString()}
    //           </p>
    //         </div>

    //         <div>
    //           <span
    //             className={`rounded-full px-5 py-2 text-sm font-bold ${
    //               order?.orderStatus === OrderStatus.DELIVERED
    //                 ? "bg-green-100 text-green-700"
    //                 : order?.orderStatus === OrderStatus.PENDING
    //                 ? "bg-yellow-100 text-yellow-700"
    //                 : order?.orderStatus === OrderStatus.CANCELED
    //                 ? "bg-red-100 text-red-700"
    //                 : "bg-orange-100 text-orange-700"
    //             }`}
    //           >
    //             {order?.orderStatus}
    //           </span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* MAIN */}
    //     <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
    //       {/* LEFT */}
    //       <div className="space-y-8 lg:col-span-2">
    //         {/* PRODUCTS */}
    //         <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-lg">
    //           <h2 className="mb-8 text-2xl font-bold text-gray-800">
    //             Ordered Products
    //           </h2>

    //           <div className="space-y-6">
    //             {orderDetails.map((item) => {
                 

    //               return (
    //                 <div
    //                   key={item._id}
    //                   className="flex flex-col gap-5 rounded-2xl border border-orange-100 bg-orange-50/30 p-5 transition-all duration-300 hover:shadow-md md:flex-row"
    //                 >
    //                   {/* IMAGE */}
    //                   <div className="relative h-32 w-full overflow-hidden rounded-2xl border bg-white md:w-32">
    //                     <Image
    //                       src={item.product?.coverImage?.path || "/placeholder.png"}
    //                       alt={item.product?.name || "product"}
    //                       fill
    //                       className="object-cover"
    //                     />
    //                   </div>

    //                   {/* INFO */}
    //                   <div className="flex flex-1 flex-col justify-between">
    //                     <div>
    //                       <h3 className="text-2xl font-bold text-gray-800">
    //                         {item.product?.name}
    //                       </h3>

    //                       <p className="mt-2 text-sm leading-6 text-gray-600">
    //                         {item.product?.description}
    //                       </p>
    //                     </div>

    //                     <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
    //                       <div className="space-y-1">
    //                         <p className="text-sm text-gray-500">
    //                           Quantity
    //                         </p>

    //                         <p className="font-semibold text-gray-800">
    //                           {item.quantity}
    //                         </p>
    //                       </div>

    //                       <div className="space-y-1">
    //                         <p className="text-sm text-gray-500">
    //                           Unit Price
    //                         </p>

    //                         <p className="font-semibold text-orange-600">
    //                           Rs. {item.price}
    //                         </p>
    //                       </div>

    //                       <div className="space-y-1">
    //                         <p className="text-sm text-gray-500">
    //                           Total
    //                         </p>

    //                         <p className="text-2xl font-bold text-green-700">
    //                           Rs. {item.price * item.quantity}
    //                         </p>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         </div>

    //         {/* ORDER SUMMARY */}
    //         <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-lg">
    //           <h2 className="mb-6 text-2xl font-bold text-gray-800">
    //             Payment Summary
    //           </h2>

    //           <div className="space-y-5">
    //             <div className="flex items-center justify-between">
    //               <span className="text-gray-600">
    //                 Payment Method
    //               </span>

    //               <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
    //                 {order?.payment?.paymentMethod}
    //               </span>
    //             </div>

    //             <div className="flex items-center justify-between">
    //               <span className="text-gray-600">
    //                 Payment Status
    //               </span>

    //               <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
    //                 {order?.payment?.paymentStatus}
    //               </span>
    //             </div>

    //             <div className="flex items-center justify-between">
    //               <span className="text-gray-600">
    //                 Order Status
    //               </span>

    //               <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
    //                 {order?.orderStatus}
    //               </span>
    //             </div>

    //             <div className="border-t pt-5">
    //               <div className="flex items-center justify-between">
    //                 <span className="text-2xl font-bold text-gray-800">
    //                   Total Amount
    //                 </span>

    //                 <span className="text-3xl font-bold text-green-700">
    //                   Rs. {order?.totalAmount}
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* RIGHT */}
    //       <div className="h-fit rounded-3xl border border-yellow-100 bg-white p-8 shadow-lg">
    //         <h2 className="mb-6 text-2xl font-bold text-gray-800">
    //           Customer Information
    //         </h2>

    //         <div className="space-y-5">
    //           <div>
    //             <p className="text-sm text-gray-500">
    //               Shipping Address
    //             </p>

    //             <p className="mt-1 font-semibold text-gray-800">
    //               {order?.shippingAddress}
    //             </p>
    //           </div>

    //           <div>
    //             <p className="text-sm text-gray-500">
    //               Phone Number
    //             </p>

    //             <p className="mt-1 font-semibold text-gray-800">
    //               {order?.phoneNumber}
    //             </p>
    //           </div>
    //         </div>

    //         {/* ACTION BUTTONS */}
    //         <div className="mt-10 space-y-4">
              
    //           <button
    //             onClick={() => router.push("/my-order")}
    //             className="w-full rounded-2xl bg-green-600 py-4 font-semibold text-white transition-all duration-300 hover:bg-green-700"
    //           >
    //             Back to Orders
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-green-50 py-10">

  <div className="container mx-auto px-[200px] space-y-8">

    {/* HEADER */}
    <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-lg">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-green-700">
            Order Details
          </h1>

          <p className="mt-2 text-gray-600">
            Order ID:
            <span className="ml-2 font-semibold text-orange-600">
              #{order?._id?.slice(0, 12)}
            </span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Placed on{" "}
            {new Date(order?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span className={`rounded-full px-5 py-2 text-sm font-bold ${
          order?.orderStatus === OrderStatus.DELIVERED
            ? "bg-green-100 text-green-700"
            : order?.orderStatus === OrderStatus.PENDING
            ? "bg-yellow-100 text-yellow-700"
            : order?.orderStatus === OrderStatus.CANCELED
            ? "bg-red-100 text-red-700"
            : "bg-orange-100 text-orange-700"
        }`}>
          {order?.orderStatus}
        </span>

      </div>
    </div>

    {/* MAIN */}
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      {/* LEFT */}
      <div className="space-y-8 lg:col-span-2">

        {/* PRODUCTS */}
        <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-lg">

          <h2 className="mb-8 text-2xl font-bold text-gray-800">
            Ordered Products
          </h2>

          <div className="space-y-6">

            {orderDetails.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-5 rounded-2xl border border-orange-100 bg-orange-50/30 p-5 transition hover:shadow-md md:flex-row"
              >

                {/* IMAGE */}
                <div className="relative h-32 w-full overflow-hidden rounded-2xl border bg-white md:w-32">

                  <Image
                    src={item.product?.coverImage?.path || "/placeholder.png"}
                    alt={item.product?.name || "product"}
                    fill
                    className="object-cover"
                  />

                </div>

                {/* INFO */}
                <div className="flex flex-1 flex-col justify-between">

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {item.product?.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.product?.description}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-semibold">{item.quantity}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Unit Price</p>
                      <p className="font-semibold text-orange-600">
                        Rs. {item.price}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-2xl font-bold text-green-700">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Payment Summary
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                {order?.payment?.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status</span>
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                {order?.payment?.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Order Status</span>
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {order?.orderStatus}
              </span>
            </div>

            <div className="border-t pt-5 flex justify-between">
              <span className="text-2xl font-bold text-gray-800">
                Total Amount
              </span>

              <span className="text-3xl font-bold text-green-700">
                Rs. {order?.totalAmount}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="h-fit rounded-3xl border border-yellow-100 bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Customer Information
        </h2>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">Shipping Address</p>
            <p className="mt-1 font-semibold text-gray-800">
              {order?.shippingAddress}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="mt-1 font-semibold text-gray-800">
              {order?.phoneNumber || "N/A"}
            </p>
          </div>

        </div>

        <button
          onClick={() => router.push("/my-order")}
          className="mt-10 w-full rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700"
        >
          Back to Orders
        </button>

      </div>

    </div>

  </div>
</div>
  );
};

export default MyOrderDetailsPage;