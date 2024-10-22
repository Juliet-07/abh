import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/dropshipping.png";
import axios from "axios";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa";

const AllDropShipping = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [activeTab, setActiveTab] = useState("New");
  // const [orders, setOrders] = useState([]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const orders = [
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Instant Payment",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Post Purchase",
      orderStatus: "Processing",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Post Purchase",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Instant payment",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Instant Payement",
      orderStatus: "Processing",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Post Purchase",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Post Purchase",
      orderStatus: "Pending",
      items: "10",
    },
  ];

  // useEffect(() => {
  //   const getOrders = () => {
  //     axios
  //       .get(`${apiURL}/vendors`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data.data.data);
  //         setVendors(response.data.data.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching vendors:", error);
  //       });
  //   };

  //   getOrders();
  // }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "New") return true;
    return order.orderStatus === activeTab;
  });

  const handleViewMore = (order) => {
    console.log("handleViewDetails called with:", order);
    navigate("/orderDetails", { state: { order } });
  };

  const getOrderStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          dotsColor: "bg-[#E3140F]",
        };
      case "shipped":
        return {
          dotsColor: "bg-[#08932E]",
        };
      case "ready to ship":
        return {
          dotsColor: "bg-[#FFA500]",
        };
      case "processing":
        return {
          dotsColor: "bg-[#081E93]",
        };
      default:
        return {
          dotsColor: "bg-gray-200",
        };
    }
  };

  const tabs = ["New", "All", "Order Progress"];

  const renderForm = () => {
    switch (activeTab.toLowerCase()) {
      case "new":
        return <New />;
      case "all":
        return <All />;
      case "order progress":
        return <OrderProgress />;
      default:
        return null;
    }
  };

  const New = () => (
    <>
      {filteredOrders.length > 0 ? (
        <div className="w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  <th className="text-center p-3">Date</th>
                  <th className="text-center p-3">Customer Name</th>
                  <th className="text-center p-3">Product</th>
                  <th className="text-center p-3">Payment Option</th>
                  <th className="text-center p-3">Status</th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const { dotsColor } = getOrderStatusStyles(order.orderStatus);

                  return (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">Jun 16, 2024</td>
                      <td className="p-4 text-center">{order.name}</td>
                      <td className="p-4 text-center">{order.address}</td>
                      <td className="p-4 text-center">{order.paymentStatus}</td>
                      <td className="p-4 text-center">
                        <div
                          className={`w-full h-10 p-3 flex items-center justify-center gap-[10px]`}
                        >
                          <div
                            className={`w-[8px] h-[8px] ${dotsColor} rounded-[100px]`}
                          />
                          <p className="text-xs">{order.orderStatus}</p>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          // onClick={() => handleViewMore(order)}
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
        </div>
      ) : (
        <div className="w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  <th className="text-center p-3">Date</th>
                  <th className="text-center p-3">Customer Name</th>
                  <th className="text-center p-3">Product</th>
                  <th className="text-center p-3">Payment Option</th>
                  <th className="text-center p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center p-10">
                    <div className="w-full flex flex-col items-center justify-center">
                      <div>No products added by drop-shippers yet</div>
                      <div className="my-10 md:p-10">
                        <img
                          src={Avatar}
                          alt="no-new-vendor"
                          className="w-full h-full max-w-xs" // Ensure image size doesn't overflow
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );

  const All = () => (
    <>
      {orders.length > 0 ? (
        <div className="w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  <th className="text-center p-3">Date</th>
                  <th className="text-center p-3">Customer Name</th>
                  <th className="text-center p-3">Product</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3">Payment Option</th>
                  <th className="text-center p-3">Quantity Shipped</th>
                  <th className="text-center p-3">Quantity Left</th>
                  <th className="text-center p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const { dotsColor } = getOrderStatusStyles(order.orderStatus);
                  return (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">Jun 16, 2024</td>
                      <td className="p-4 text-center">{order.name}</td>
                      <td className="p-4 text-center">{order.address}</td>
                      <td className="p-4 text-center">10 cartons</td>
                      <td className="p-4 text-center">{order.paymentStatus}</td>
                      <td className="p-4 text-center">4 cartons</td>
                      <td className="p-4 text-center">6 cartons</td>
                      <td className="p-4 text-center">Active</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  <th className="text-center p-3">Date</th>
                  <th className="text-center p-3">Customer Name</th>
                  <th className="text-center p-3">Product</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3">Payment Option</th>
                  <th className="text-center p-3">Quantity Shipped</th>
                  <th className="text-center p-3">Quantity Left</th>
                  <th className="text-center p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center p-10">
                    <div className="w-full flex flex-col items-center justify-center">
                      <div>No products added by drop-shippers yet</div>
                      <div className="my-10 md:p-10">
                        <img
                          src={Avatar}
                          alt="no-new-vendor"
                          className="w-full h-full max-w-xs" // Ensure image size doesn't overflow
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );

  const OrderProgress = () => (
    <>
      {orders.length > 0 ? (
        <div className="w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  <th className="text-center p-3">Order ID</th>
                  <th className="text-center p-3">Date</th>
                  <th className="text-center p-3">Customer Name</th>
                  <th className="text-center p-3">Product</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3">
                    Drop-shipper payment status
                  </th>
                  <th className="text-center p-3">Order status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const { dotsColor } = getOrderStatusStyles(order.orderStatus);

                  return (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">120381</td>
                      <td className="p-4 text-center">Jun 16, 2024</td>
                      <td className="p-4 text-center">{order.name}</td>
                      <td className="p-4 text-center">{order.address}</td>
                      <td className="p-4 text-center">15 cartons</td>
                      <td className="p-4 text-center">Paid</td>
                      <td className="p-4 text-center">
                        <div
                          className={`w-full h-10 p-3 flex items-center justify-center gap-[10px]`}
                        >
                          <div
                            className={`w-[8px] h-[8px] ${dotsColor} rounded-[100px]`}
                          />
                          <p className="text-xs">{order.orderStatus}</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  <th className="text-center p-3">Order ID</th>
                  <th className="text-center p-3">Date</th>
                  <th className="text-center p-3">Customer Name</th>
                  <th className="text-center p-3">Product</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3">
                    Drop-shipper payment status
                  </th>
                  <th className="text-center p-3">Order status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center p-10">
                    <div className="w-full flex flex-col items-center justify-center">
                      <div>No products added by drop-shippers yet</div>
                      <div className="my-10 md:p-10">
                        <img
                          src={Avatar}
                          alt="no-new-vendor"
                          className="w-full h-full max-w-xs" // Ensure image size doesn't overflow
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
          <p className="">Drop-shippers</p>
          <div></div>
        </div>
        <div className="my-4 w-full p-3 overflow-x-auto font-primaryRegular">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-[#359E52] text-white"
                    : "bg-gray-200 text-sm"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="my-4">{renderForm()}</div>
        </div>
      </div>
    </>
  );
};

export default AllDropShipping;
