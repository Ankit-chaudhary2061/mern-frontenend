"use client";

import { addToCart, fetchCartItems } from "@/src/lib/store/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";

import { Status } from "@/src/lib/store/types/global-types";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchMyOrderDetails } from "@/src/lib/store/checkout/checkout-slice";



export const MyOrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { orderDetails, status } = useAppSelector((store) => store.order)

  useEffect(() => {
    if (id) dispatch(fetchMyOrderDetails(id))
  }, [id, dispatch])

  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-medium">
        Loading order details...
      </div>
    )
  }

  if (!orderDetails?.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No order details found
      </div>
    )
  }

  const order = orderDetails[0]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        <p className="text-sm text-gray-500">
          Placed on {new Date(order.order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Order Items */}
        <div className="xl:col-span-2 space-y-6">

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">My Order</h2>

            <div className="space-y-6">
              {orderDetails.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row gap-6 border-b pb-6 last:border-none"
                >
                  <img
                    src={item.product.coverImage.path}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />

                  <div className="flex-1 space-y-2">
                    <p className="font-medium text-lg">
                      {item.product.name}
                    </p>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Price: Rs. {item.price}</span>
                      <span>Qty: {item.quantity}</span>
                      <span className="font-semibold text-gray-800">
                        Rs. {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span>{order.order.payment?.paymentMethod}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Status</span>
                <span>{order.order.payment?.paymentStatus}</span>
              </div>

              <div className="flex justify-between">
                <span>Order Status</span>
                <span>{order.order.orderStatus}</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>Rs. {order.order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6 h-fit">
          <h3 className="text-lg font-semibold">Customer Details</h3>

          <div className="text-sm space-y-2">
            <p>
              <span className="font-medium">Address:</span>{" "}
              {order.order.shippingAddress}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {order.order.phoneNumber}
            </p>
          </div>

          <button
            className="w-full py-3 border border-red-500 text-red-500 rounded-md
                       hover:bg-red-50 transition font-medium"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  )
}