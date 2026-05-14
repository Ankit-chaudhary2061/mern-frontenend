"use client";

import { fetchMyOrders } from "@/src/lib/store/checkout/checkout-slice";
import { OrderStatus } from "@/src/lib/store/checkout/checkout-slice-types";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { useEffect, useState } from "react";
import Link from "next/link";
const OrderPage = () => {
  const dispatch = useAppDispatch();

  const { myorders } = useAppSelector((store) => store.order);

  const [selectedItem, setSelectedItem] = useState<OrderStatus>(
    OrderStatus.ALL
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [date, setDate] = useState<string>("");

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";

      case OrderStatus.PROCESSING:
        return "bg-orange-100 text-orange-700 border border-orange-300";

      case OrderStatus.SHIPPED:
        return "bg-amber-100 text-amber-700 border border-amber-300";

      case OrderStatus.DELIVERED:
        return "bg-green-100 text-green-700 border border-green-300";

      case OrderStatus.CANCELED:
        return "bg-red-100 text-red-700 border border-red-300";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const filteredOrders = myorders
    .filter(
      (order) =>
        selectedItem === OrderStatus.ALL ||
        order.orderStatus === selectedItem
    )

    .filter(
      (order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.payment?.paymentMethod
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.totalAmount.toString().includes(searchTerm)
    )

    .filter(
      (order) =>
        date === "" ||
        new Date(order.createdAt).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-green-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-700">
              My Orders
            </h1>

            <p className="text-gray-600 mt-2">
              Track and manage your recent orders
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl px-6 py-4 border border-orange-100">
            <h3 className="text-sm text-gray-500">Total Orders</h3>

            <p className="text-3xl font-bold text-orange-600">
              {filteredOrders.length}
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-yellow-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* STATUS */}
            <select
              value={selectedItem}
              onChange={(e) =>
                setSelectedItem(e.target.value as OrderStatus)
              }
              className="w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value={OrderStatus.ALL}>All Orders</option>

              <option value={OrderStatus.PENDING}>Pending</option>

              <option value={OrderStatus.PROCESSING}>
                Processing
              </option>

              <option value={OrderStatus.SHIPPED}>Shipped</option>

              <option value={OrderStatus.DELIVERED}>
                Delivered
              </option>

              <option value={OrderStatus.CANCELED}>
                Canceled
              </option>
            </select>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search by order id or payment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* DATE */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r bg-green-500">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Order ID
                  </th>

                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Total Amount
                  </th>

                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Payment Status
                  </th>

                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Order Status
                  </th>

                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Ordered Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((orders, index) => {
                    return (
                      <tr
                        key={orders._id}
                        className={`transition hover:bg-orange-50 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-yellow-50/40"
                        }`}
                      >
                        {/* ORDER ID */}
                        <td className="px-6 py-5 border-b border-orange-100">
                          <Link href={`/my-order/${orders._id}`}>
                            <p className="font-semibold text-green-700 hover:text-orange-600 underline duration-300">
                              #{orders._id.slice(0, 12)}
                            </p>
                          </Link>
                        </td>

                        {/* AMOUNT */}
                        <td className="px-6 py-5 border-b border-orange-100">
                          <p className="font-bold text-orange-600 text-lg">
                            Rs. {orders.totalAmount}
                          </p>
                        </td>

                        {/* PAYMENT */}
                        <td className="px-6 py-5 border-b border-orange-100">
                          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                            {orders.payment?.paymentStatus ?? "N/A"}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5 border-b border-orange-100">
                          <span
                            className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                              orders.orderStatus
                            )}`}
                          >
                            {orders.orderStatus}
                          </span>
                        </td>

                        {/* DATE */}
                        <td className="px-6 py-5 border-b border-orange-100">
                          <p className="text-gray-700 font-medium">
                            {new Date(
                              orders.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-16"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-6xl mb-4">📦</div>

                        <h2 className="text-2xl font-bold text-gray-700">
                          No Orders Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                          Try changing filters or place a new order
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-green-100 px-6 py-4 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-700 font-medium">
              Showing{" "}
              <span className="font-bold text-green-700">
                {filteredOrders.length}
              </span>{" "}
              orders
            </p>

            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition">
                Prev
              </button>

              <button className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;