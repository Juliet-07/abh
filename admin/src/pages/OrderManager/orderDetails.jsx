import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon, DownloadIcon } from "@heroicons/react/outline";
import { IoIosPerson } from "react-icons/io";
import { TbTruckDelivery, TbPackage } from "react-icons/tb";

const OrderDetails = () => {
  const location = useLocation();
  const orderDetails = location.state && location.state.order;
  console.log("detailing", orderDetails);
  const navigate = useNavigate();

  if (!orderDetails) {
    return <div>No details available</div>;
  }

  const getOrderStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[#E3140F]"; // Red
      case "processing":
        return "bg-[#0000FF]"; // Blue
      case "ready to ship":
        return "bg-[#008000]"; // Green
      default:
        return "bg-[#C1C6C5]"; // Default grey color
    }
  };

  return (
    <>
      <header className="w-full h-[70px] bg-white flex flex-row items-center justify-between p-4 font-primaryRegular">
        <div className="flex flex-row gap-6 cursor-pointer">
          <ArrowLeftIcon
            width={20}
            height={20}
            onClick={() => navigate("/allOrders")}
          />
          <p>Order Details</p>
        </div>

        <div className="flex flex-row gap-6">
          {/* button pops up when action has been taken on order (Accept or Cancel) */}
          <button className="h-[40px] w-[150px] rounded-[6px] bg-none text-[#373435] border-[1px] border-[#373435] hidden md:block">
            Change status
          </button>
          <div className="bg-[#8BCB901F] md:w-[197px] w-[40px] h-[40px] p-[10px] gap-[11px] flex flex-row items-center justify-center rounded-[6px] ">
            <DownloadIcon width={14} height={14} color="#359E52" />
            <p className="text-[16px] text-[#359E52] hidden md:flex">
              Download invoice
            </p>
          </div>
        </div>
      </header>
      <div className="w-full my-4 md:my-6 flex flex-col">
        <div className="w-full flex flex-col ">
          <div className="w-full mb-4">
            {/* {acceptOrder && ( */}
            <button className="h-[40px] w-[150px] rounded-[6px] bg-none text-[#373435] border border-[#373435] md:hidden block font-primaryRegular">
              Change status
            </button>
            {/* )} */}
          </div>
          {/* Details */}
          <div className="w-full bg-white flex flex-col font-primaryRegular">
            {/* order info price section */}
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-[#CFCBCB] p-4">
              <div className="flex flex-col items-center justify-center text-xs md:text-base flex-grow">
                <p className="font-primarySemibold">
                  Order ID #{orderDetails._id}
                </p>
                <p>{orderDetails.date}</p>
              </div>
              <div className="flex flex-col items-center justify-center text-xs md:text-base flex-grow">
                <p>Total price</p>
                <p className="font-primarySemibold">{orderDetails.price}</p>
              </div>
              <div className="flex flex-col items-center justify-center flex-grow">
                <p className="text-sm md:text-base">Order status</p>
                <div className="flex gap-4 items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-[100px] ${getOrderStatusColor(
                      orderDetails.deliveryStatus
                    )}`}
                  />
                  <p className="text-sm md:text-base font-primarySemibold">
                    {orderDetails.deliveryStatus}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center flex-grow">
                <p className="text-sm md:text-base">Vendor</p>
                <div className="flex gap-4 items-center justify-center">
                  <p className="text-[#359E52]">Michael Farasin</p>
                  <p className="text-xs text-[#E7711A] ">See details</p>
                </div>
              </div>
            </div>

            {/*  order info delivery section*/}
            <div className="w-full flex gap-10 border-b border-[#CFCBCB] flex-wrap">
              {/* Customer */}
              <div className="flex flex-col items-start p-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-[#373435] rounded-[100px] text-white flex items-center justify-center">
                    <IoIosPerson size={20} />
                  </div>
                  <b>Customers</b>
                </div>
                <div className="grid gap-4">
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Full Name:</p>
                    <p>{orderDetails.name}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Email:</p>
                    <p>mathewjones@gmail.com</p>
                  </div>
                  <div className="flex flex-row gap-[10px] w-full">
                    <p className="text-sm font-semibold">Phone:</p>
                    <p className="text-sm">234-812-411-777-01</p>
                  </div>
                </div>
              </div>
              {/* Order Info */}
              <div className="flex flex-col items-start p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#373435] rounded-[100px] text-white flex items-center justify-center">
                    <TbPackage size={20} />
                  </div>
                  <b>Order Details</b>
                </div>
                <div className="grid gap-4">
                  <div className="flex gap-3 items-center">
                    <p className="text-sm font-primarySemibold">Payment:</p>
                    <div className="min-w-[66px] h-[35px] bg-[#08932E14] p-3 flex items-center justify-center gap-3">
                      <div className="w-2 h-2 bg-[#08932E] rounded-[100px]" />
                      <p className="text-[#08932E] text-xs">Paid</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Delivery:</p>
                    <p>Deliver before tuesday 05/12/2023</p>
                  </div>
                </div>
              </div>
              {/* Delivery Info */}
              <div className="flex flex-col items-start p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#373435] rounded-[100px] text-white flex items-center justify-center">
                    <TbTruckDelivery size={20} />
                  </div>
                  <b>Delivery</b>
                </div>
                <div className="grid gap-4">
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">City:</p>
                    <p>Lagos</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">State:</p>
                    <p>New york</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Address:</p>
                    <p>{orderDetails.address}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Info */}
            <div className="w-full flex items-center flex-wrap p-4 gap-4">
              <div className="w-[175px] border border-[#CFCBCB] h-[120px] rounded-lg"></div>
              <div className="flex items-center  gap-10">
                <div className="flex flex-col items-center">
                  <b className="text-sm">Apples</b>
                  <p className="text-xs">Grocery</p>
                </div>
                <div className="flex flex-col items-center">
                  <b className="text-sm">QTY</b>
                  <p className="text-xs">10</p>
                </div>
                <div className="flex flex-col items-center">
                  <b className="text-sm">Total Price</b>
                  <p className="text-xs">$230</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
