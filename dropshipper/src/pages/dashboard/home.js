import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiMapPin, FiBell, FiDownload } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import { notifySuccess } from "@utils/toast";
import InputArea from "@component/form/InputArea";
import Sidebar from "./sidebar";
import Link from "next/link";

const Dashboard = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedTable = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
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
        setOrders(response.data.data.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    const getMyInventory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL}/dropshipping/my-inventories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        console.log(response.data.data, "My Inventory");
        setInventory(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    getMyInventory();
    getMyOrders();
  }, []);

  return (
    <>
      <Sidebar>
        <div className="flex-grow md:px-6">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-6 p-3 md:p-0">
            <h1 className="text-xl font-primarySemibold">Dashboard</h1>
            {/* <button className="flex items-center space-x-2 bg-[#8BCB90]/[12%] text-green-600 px-4 py-2 text-sm rounded-md font-primarySemibold">
              <FiDownload className="text-sm" />
              <span>Download</span>
            </button> */}
          </div>

          {/* Date Filters */}
          {/* <div className="flex space-x-4 mb-8 overflow-x-auto">
            <button className="px-3 py-1 bg-orange-500 text-white rounded-md">
              Today
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md">
              This week
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md">
              This month
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md">
              Customize date
            </button>
          </div> */}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 bg-slate-100 p-4">
            <div className="bg-white p-4 rounded-md shadow-md border border-[#CFCBCB]">
              <div className="flex justify-between items-center">
                <Image width={18} height={18} src="/sub.png" alt="logo" />
                <span className="text-sm text-[#373435]">
                  Subscription plan
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-[#373435]">Daily</p>
                <div className="flex items-center justify-center space-x-1 bg-[#088D2D]/[12%] text-[#088D2D] font-primarySemibold text-xs p-2">
                  <div className="w-2 h-2 bg-[#088D2D] rounded-full" />
                  <span>Active</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className="text-gray-500">My inventory</p>
              <div className="flex justify-between items-center mt-2">
                <span>Items</span>
                <span className="text-blue-500">{inventory.length}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className="text-gray-500">Total orders</p>
              <div className="flex justify-between items-center mt-2">
                <span>Items</span>
                <span className="text-orange-500">{orders.length}</span>
              </div>
            </div>
            <div></div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-primaryMedium text-[#373435] mb-4">
                Recent Orders
              </h2>
              <Link href="/dashboard/orders" className="text-green-600 text-sm">
                See all
              </Link>
            </div>
            {orders.length > 0 ? (
              <div className="space-y-10">
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
                      <p className="text-xs text-gray-500">
                        On {dayjs(order.created_at).format("MMMM D, YYYY")}
                      </p>
                      <p className="text-xs text-green-600">See Details</p>
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
              <table className="w-full">
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

export default Dashboard;
