import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiMapPin, FiBell } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import { notifySuccess } from "@utils/toast";
import InputArea from "@component/form/InputArea";
import Sidebar from "./sidebar";

const Orders = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let ordersData;
    const getMyOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL}/orders/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        console.log(response.data.data.data, "Orders");
        ordersData = response.data.data.data;
        setOrders(ordersData.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    getMyOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "All") return true;
    return order.deliveryStatus?.toLowerCase() === activeTab.toLowerCase();
  });

  const tabs = [
    "All",
    "Pending",
    "Processing",
    "Ready To Ship",
    "Shipped",
    "Delivered",
    "Returned",
  ];

  const handleOrderDetails = (order) => {
    // Navigate to the new page and pass the order ID via query parameters
    router.push({
      pathname: "/dashboard/orderDetails",
      query: { id: order._id }, // Pass order ID as query parameter
    });
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedTable = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // const handleOrderDetails = (data) => {
  //   // Navigate to the new page and pass the data through state
  //   console.log("handleViewDetails called with:", data);
  //   router.push("/dashboard/orderDetails", { state: { data } });
  // };
  return (
    <>
      <Sidebar>
        <div className="flex-grow p-6">
          <div className="w-full font-primaryRegular">
            {/* tabs */}
            <div className="w-full flex gap-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-1 md:px-3 py-1 rounded ${
                    activeTab === tab
                      ? "bg-[#359E52] text-white text-xs md:text-sm"
                      : "bg-[#C1C6C5] text-xs md:text-sm"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* table proper */}
            {filteredOrders.length > 0 ? (
              <div className="my-10 space-y-10">
                {paginatedTable.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#0B63B2]/[4%] rounded-md p-4 flex items-center md:space-x-4 border-l border-l-[#8BCB90]"
                  >
                    <Image
                      src="/orderCart.jpg"
                      alt={order.product}
                      width={117}
                      height={112}
                      className="hidden md:block rounded-md"
                    />
                    <Image
                      src="/orderCart.jpg"
                      alt={order.product}
                      width={50}
                      height={50}
                      className="block md:hidden rounded-md"
                    />
                    <div className="flex-grow mx-2 md:mx-3">
                      <h3 className="text-sm md:text-base font-primaryMedium text-[#373435]">
                        {order.product}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        Order: {order?._id?.substring(20, 24)}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        Quantity: {order?.products?.length} product(s)
                      </p>
                    </div>
                    <div className="text-right p-2">
                      <div
                        className={`h-[35px] flex items-center justify-center space-x-1 ${
                          order.deliveryStatus.toLowerCase() === "Pending"
                            ? "text-red-600 bg-red-100"
                            : order.deliveryStatus.toLowerCase() ===
                              "Processing"
                            ? "text-blue-600 bg-blue-100"
                            : "text-gray-600 bg-gray-100"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            order.deliveryStatus.toLowerCase() === "Pending"
                              ? "bg-red-600"
                              : order.deliveryStatus.toLowerCase() ===
                                "Processing"
                              ? "bg-blue-600"
                              : "bg-gray-600"
                          }`}
                        />
                        <span className="text-xs">{order.deliveryStatus}</span>
                      </div>
                      <p className="text-[7px] md:text-xs text-gray-500">
                        On {dayjs(order.created_at).format("MMMM D, YYYY")}
                      </p>
                      <div
                        // href={`/dashboard/orderDetails/${order._id}`}
                        onClick={() => handleOrderDetails(order)}
                        className="text-xs text-green-600 cursor-pointer"
                      >
                        See Details
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end mt-4 mb-2 font-primaryMedium">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-8 rounded mx-1 p-2 ${
                        currentPage === index + 1
                          ? "bg-[#359E52] text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <table className="my-10 w-full">
                <thead className="bg-[#F1F4F2]">
                  <tr className="text-[#000000] text-sm">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Payment status</th>
                    <th className="p-4">Order status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-[#373435] font-primaryMedium">
                          No recent orders
                        </p>
                        <img
                          width={400}
                          height={400}
                          src="/order-dashboard.png"
                          alt="No orders"
                          className="mt-4"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Orders;
