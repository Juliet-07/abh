import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import moment from "moment";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrders = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("vendorToken");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [allOrders, setAllOrders] = useState([]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  useEffect(() => {
    const getAllOrders = () => {
      axios
        .get(`${apiURL}/vendors-dashboard/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.orders);
          setAllOrders(response.data.data.orders);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllOrders();
  }, []);

  const filteredOrders = allOrders.filter((order) => {
    if (activeTab === "All") return true;
    return order.deliveryStatus?.toLowerCase() === activeTab.toLowerCase();
  });

  // const searchForProducts = (keyword) => {
  //   setFilteredProducts(
  //     productsData.filter((product, index) => {
  //       return (
  //         product.name.toLowerCase().includes(keyword.toLowerCase()) ||
  //         product.address.toLowerCase().includes(keyword.toLowerCase()) ||
  //         product.date.toLowerCase().includes(keyword.toLowerCase()) ||
  //         product.order_status.toLowerCase().includes(keyword.toLowerCase())
  //       );
  //     })
  //   );

  //   console.log(keyword);
  // };

  // const tabbedFilter = (keyword) => {
  //   setfilterKeyword(keyword);
  //   setFilteredProducts(
  //     productsData.filter((product, index) => {
  //       return product.order_status
  //         .toLowerCase()
  //         .includes(keyword.toLowerCase());
  //     })
  //   );

  //   console.log(keyword);
  //   console.log(FilteredProducts);
  // };

  const handleOrderDetails = (data) => {
    // Navigate to the new page and pass the data through state
    console.log("handleViewDetails called with:", data);
    navigate("/dashboard/orderDetails", { state: { data } });
  };

  const getOrderStatusStyles = (status) => {
    // Check if status is defined and is a string
    if (typeof status === "string") {
      switch (status.toLowerCase()) {
        case "pending":
          return { dotsColor: "bg-[#E3140F]" };
        case "shipped":
          return { dotsColor: "bg-[#9747FF]" };
        case "ready":
          return { dotsColor: "bg-[#FFA500]" };
        case "processing":
          return { dotsColor: "bg-[#081E93]" };
        case "delivered":
          return { dotsColor: "bg-[#08932E]" };
        case "returned":
          return { dotsColor: "bg-[#DFE30F]" };
        default:
          return { dotsColor: "bg-gray-200" };
      }
    } else {
      // Fallback if status is undefined or not a string
      return { dotsColor: "bg-gray-200" };
    }
  };

  const getPaymentStatusStyles = (status) => {
    // Check if status is defined and is a string
    if (typeof status === "string") {
      switch (status.toLowerCase()) {
        case "paid":
          return {
            bgColor: "bg-[#08932E]/[12%]",
            textColor: "text-[#08932E]",
            dotColor: "bg-[#08932E]",
          };
        case "pending":
          return {
            bgColor: "bg-[#E3140F]/[12%]",
            textColor: "text-[#E3140F]",
            dotColor: "bg-[#E3140F]",
          };
        default:
          return { bgColor: "bg-gray-200", textColor: "text-gray-800" };
      }
    } else {
      // Fallback if status is undefined or not a string
      return { bgColor: "bg-gray-200", textColor: "text-gray-800" };
    }
  };

  const tabs = [
    "All",
    "Pending",
    "Processing",
    "Ready",
    "Shipped",
    "Delivered",
    "Returned",
    "Declined",
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const extractFiveDigits = (id) => {
    return id.substring(0, 5); // Extract the first 5 characters
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // bodyClassName={"bg-[red]"}
        theme="colored"
        transition={Bounce}
      />

      <>
        <div className="w-full flex flex-col">
          <p className="w-full font-primaryBold">All Orders</p>
          {/* <div className="w-full md:max-w-[534px] h-10 bg-white p-3 flex items-center rounded-md">
            <input
              type="text"
              className="w-full placeholder:text-xs placeholder:text-[#37343566] font-primaryRegular"
              placeholder="Search for products"
              onInput={(e) => {
                setfilterKeyword(e.target.value);
                searchForProducts(e.target.value);
              }}
            />
            <FiSearch width={16} height={16} color="#37343566" />
          </div> */}

          {/* Tab Navigation */}
          <div className="my-4 w-full overflow-x-auto font-primaryRegular">
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded ${
                    activeTab === tab
                      ? "bg-[#359E52] text-white"
                      : "bg-gray-200 text-sm"
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
          </div>

          {paginatedOrders.length > 0 ? (
            <div className="w-full bg-white p-3">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white font-primaryRegular">
                  <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                    <tr>
                      <th className="text-center p-3">Order ID</th>
                      <th className="text-center p-3">Date</th>
                      <th className="text-center p-3">Customer Name</th>
                      <th className="text-center p-3">Address</th>
                      <th className="text-center p-3">Payment Status</th>
                      <th className="text-center p-3">Order Status</th>
                      <th className="text-center p-3">Items</th>
                      <th className="text-center p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order, index) => {
                      const { dotsColor } = getOrderStatusStyles(
                        order.deliveryStatus
                      );
                      const { bgColor, textColor, dotColor } =
                        getPaymentStatusStyles(order.status);
                      return (
                        <tr
                          key={index}
                          className="border text-xs font-primaryMedium mb-4"
                        >
                          <td className="p-4 text-center">
                            {extractFiveDigits(order._id)}
                          </td>
                          <td className="p-4 text-center">
                            {formatDate(order.created_at)}
                          </td>
                          <td className="p-4 text-center">
                            {order?.userId?.firstName +
                              " " +
                              order?.userId?.lastName}
                          </td>
                          <td className="p-4 text-center">
                            {order.shippingAddress.street +
                              " " +
                              order.shippingAddress.city +
                              " " +
                              order.shippingAddress.state}
                          </td>
                          <td className="p-4 text-center">
                            <div
                              className={`w-full h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                            >
                              <div
                                className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                              />
                              <p className={`${textColor} text-xs`}>
                                {order.status}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div
                              className={`w-full h-10 p-3 flex items-center justify-center gap-[10px]`}
                            >
                              <div
                                className={`w-[8px] h-[8px] ${dotsColor} rounded-[100px]`}
                              />
                              <p className="text-xs">{order.deliveryStatus}</p>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            {order?.products?.length}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleOrderDetails(order)}
                              className="text-[#359E52]"
                            >
                              <FaEye size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="text-xl font-primaryRegular">
                No Orders To Display Yet
              </div>
              {/* <div className="my-10 md:p-10">
              <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
            </div> */}
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default AllOrders;
