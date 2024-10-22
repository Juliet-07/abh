import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon, DownloadIcon } from "@heroicons/react/outline";
import { IoIosPerson } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { XIcon } from "@heroicons/react/solid";
import axios from "axios";

const OrderDetails = () => {
  const location = useLocation();
  const orderDetails = location.state && location.state.data;
  console.log("detailing", orderDetails);
  const navigate = useNavigate();
  const [changeStatusPreview, setChangeStatusPreview] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(orderDetails.order_status); // Initial status

  if (!orderDetails) {
    return <div>No details available</div>;
  }

  const getOrderStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[#E3140F]"; // Red
      case "processing":
        return "bg-[#081E93]"; // Blue
      case "ready to ship":
        return "bg-[#FFA500]"; // Orange
      case "shipped":
        return "bg-[#08932E]"; // Green
      case "delivered":
        return "bg-[#0000FF]"; // Blue
      case "returned":
        return "bg-[#FFFF00]"; // Yellow
      default:
        return "bg-[#C1C6C5]"; // Default grey color
    }
  };

  const getPaymentStatusStyles = (status) => {
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
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-800",
          dotColor: "bg-gray-800",
        };
    }
  };

  const showChangeStatusButton = () => {
    const status = orderDetails.order_status.toLowerCase();
    return status === "processing" || status === "ready to ship";
  };

  const showActionButtons = () => {
    const status = orderDetails.order_status.toLowerCase();
    return status === "pending";
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleUpdateStatus = () => {
    const token = localStorage.getItem("vendorToken");
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/orders/${orderDetails.id}/status`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        console.log("Status updated:", response.data);
        orderDetails.order_status = selectedStatus; // Update the orderDetails object
        setChangeStatusPreview(false);
        alert("Status updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Failed to update status. Please try again.");
      });
  };

  return (
    <>
      {changeStatusPreview && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-primaryRegular">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md ">
            <div className="flex justify-between items-center">
              <div></div>{" "}
              <XIcon
                width={20}
                height={20}
                color="red"
                onClick={() => setChangeStatusPreview(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center font-primarySemibold text-lg">
              Change Status
            </div>
            <div className="grid grid-cols-2 gap-6 my-6">
              <button
                className={`p-2 border rounded flex items-center justify-center ${
                  selectedStatus === "Ready to ship" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleStatusChange("READY")}
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                Ready to ship
              </button>
              <button
                className={`p-2 border rounded flex items-center justify-center ${
                  selectedStatus === "Shipped" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleStatusChange("Shipped")}
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                Shipped
              </button>
              <button
                className={`p-2 border rounded flex items-center justify-center ${
                  selectedStatus === "Delivered" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleStatusChange("Delivered")}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Delivered
              </button>
              <button
                className={`p-2 border rounded flex items-center justify-center ${
                  selectedStatus === "Returned" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleStatusChange("Returned")}
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                Returned
              </button>
            </div>
            <div className="flex items-center gap-6 font-primarySemibold">
              <button
                onClick={handleUpdateStatus}
                className="h-[46px] w-[186px] rounded-md bg-[#359E52] text-white"
              >
                Update
              </button>
              <button
                onClick={() => setChangeStatusPreview(false)}
                className="h-[46px] w-[186px] rounded-md bg-white text-black border border-[#CFCBCB]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="w-full h-[70px] bg-white flex flex-row items-center justify-between p-4 font-primaryRegular">
        <div className="flex flex-row gap-6 cursor-pointer">
          <ArrowLeftIcon
            width={20}
            height={20}
            onClick={() => navigate("/dashboard/allOrders")}
          />
          <p>Order Details</p>
        </div>

        <div className="flex flex-row gap-6">
          {showChangeStatusButton() && (
            <button
              onClick={() => setChangeStatusPreview(true)}
              className="hidden md:block h-[40px] w-[150px] rounded-[6px] bg-none text-[#373435] border-[1px] border-[#373435]"
            >
              Change status
            </button>
          )}
          <div className="bg-[#8BCB901F] md:w-[197px] w-[40px] h-[40px] p-[10px] gap-[11px] flex flex-row items-center justify-center rounded-[6px]">
            <DownloadIcon width={14} height={14} color="#359E52" />
            <p className="text-[16px] text-[#359E52] hidden md:flex">
              Download invoice
            </p>
          </div>
        </div>
      </header>
      <div className="w-full mt-6 md:mt-10 flex flex-col">
        <div className="w-full flex flex-col">
          <div className="w-full mb-4 font-primaryRegular">
            {showChangeStatusButton() && (
              <button
                onClick={() => setChangeStatusPreview(true)}
                className="block md:hidden h-[40px] w-[150px] rounded-[6px] bg-none text-[#373435] border-[1px] border-[#373435]"
              >
                Change status
              </button>
            )}
          </div>
          <div className="w-full bg-white flex flex-col font-primaryRegular">
            <div className="w-full flex gap-10 border-b border-[#CFCBCB] p-4">
              <div className="flex flex-col items-center justify-center text-xs md:text-base">
                <p className="font-primarySemibold">
                  Order ID #{orderDetails.order_id}
                </p>
                <p
                  className={`text-white px-4 py-1 rounded-full mt-2 text-xs md:text-sm ${getOrderStatusColor(
                    orderDetails.order_status
                  )}`}
                >
                  {orderDetails.order_status}
                </p>
              </div>
              <div className="h-[100px] bg-[#CFCBCB] w-[1px] hidden md:flex"></div>
              <div className="flex flex-row md:gap-6 gap-4 text-xs md:text-sm items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
                  <IoIosPerson size={16} />
                  <div className="flex flex-col items-center justify-center">
                    <p>{orderDetails.customer_name}</p>
                    <p className="text-[#373435]">{orderDetails.customer_phone}</p>
                  </div>
                </div>
                <div className="h-[40px] bg-[#CFCBCB] w-[1px] md:hidden flex"></div>
                <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
                  <TbTruckDelivery size={16} />
                  <div className="flex flex-col items-center justify-center">
                    <p>{orderDetails.delivery_address}</p>
                    <p className="text-[#373435]">{orderDetails.delivery_method}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="w-full flex flex-row border-b border-[#CFCBCB] p-4 items-center text-[#373435] text-xs md:text-sm">
                <div className="flex flex-row gap-4 items-center justify-start md:justify-center w-[40%]">
                  <img
                    src={orderDetails.product_image_url}
                    alt="product-img"
                    className="md:w-[60px] md:h-[60px] w-[46px] h-[46px] object-cover"
                  />
                  <p className="text-xs md:text-base">{orderDetails.product_name}</p>
                </div>

                <div className="flex items-center justify-center w-[20%]">
                  <p className="text-xs md:text-base">{orderDetails.product_size}</p>
                </div>

                <div className="flex items-center justify-center w-[20%]">
                  <p className="text-xs md:text-base">x{orderDetails.product_quantity}</p>
                </div>

                <div className="flex items-center justify-center w-[20%]">
                  <p className="text-xs md:text-base">₦{orderDetails.product_price}</p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row justify-end p-4 items-center gap-2 md:gap-4 text-xs md:text-sm">
              <div
                className={`rounded-full w-2 h-2 ${getPaymentStatusStyles(orderDetails.payment_status).dotColor}`}
              ></div>
              <div
                className={`w-[107px] flex items-center justify-center h-[33px] ${getPaymentStatusStyles(orderDetails.payment_status).bgColor} ${getPaymentStatusStyles(orderDetails.payment_status).textColor} rounded-full`}
              >
                {orderDetails.payment_status}
              </div>
              <p className="font-primarySemibold text-xs md:text-base">
                ₦{orderDetails.total_price}
              </p>
            </div>

            {showActionButtons() && (
              <div className="flex flex-row items-center justify-center gap-2 p-4">
                <button className="text-sm text-white bg-[#359E52] rounded-lg px-4 py-2">
                  Accept order
                </button>
                <button className="text-sm text-black bg-gray-300 rounded-lg px-4 py-2">
                  Decline order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
