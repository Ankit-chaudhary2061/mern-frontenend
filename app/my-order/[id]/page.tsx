"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { Status } from "@/src/lib/store/types/global-types";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchMyOrderDetails } from "@/src/lib/store/checkout/checkout-slice";

const MyOrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { orderDetails, status } = useAppSelector((store) => store.order);

  useEffect(() => {
    if (id) dispatch(fetchMyOrderDetails(id));
  }, [id, dispatch]);

  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading order details...
      </div>
    );
  }

  if (!orderDetails?.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No order details found
      </div>
    );
  }

  const order = orderDetails[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h1 className="text-3xl font-bold text-gray-800">
            Order Details
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Placed on{" "}
            <span className="font-medium text-gray-700">
              {new Date(order.order.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - ITEMS */}
          <div className="lg:col-span-2 space-y-6">

            {/* ITEMS CARD */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Products
              </h2>

              <div className="space-y-5">
                {orderDetails.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition border"
                  >
                    {/* IMAGE */}
                    <div className="relative w-28 h-28 rounded-lg overflow-hidden border">
                      <Image
                        src={
                          item.product?.image?.[0]?.path ||
                          "/placeholder.png"
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.product.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Unit Price: Rs. {item.price}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </span>

                        <span className="font-bold text-green-700">
                          Rs. {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">
                    {order.order.payment?.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                    {order.order.payment?.paymentStatus}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Order Status</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    {order.order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-700">
                  Rs. {order.order.totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT - CUSTOMER */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit space-y-5">

            <h3 className="text-lg font-semibold text-gray-800">
              Customer Info
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Address</p>
                <p className="font-medium">
                  {order.order.shippingAddress}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">
                  {order.order.phoneNumber}
                </p>
              </div>
            </div>

            <button className="w-full mt-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition">
              Cancel Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyOrderDetailsPage;