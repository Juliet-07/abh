import React, { useState } from "react";
import { ArrowLeftIcon, MenuIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import { FiBell, FiUser } from "react-icons/fi";
import Tracker from "../../assets/tracker.png";

const TrackOrders = () => {
  const [showRecords, setRecords] = useState(false);
  return (
    <>
      <div className="w-full flex justify-between  flex-wrap md:flex-nowrap gap-5">
        <div className="w-full md:min-h-[80vh] min-h-[400px]  flex flex-col bg-white md:p-10 p-5">
          <div className="w-full flex items-center justify-center gap-4">
            <img src={Tracker} alt="Tracker" />
            <b className="text-black text-xl font-primaryBold">
              Track a Package
            </b>
          </div>
          <div className="w-full flex items-center h-[100px] md:gap-5 gap-1 font-primaryMedium">
            <div
              className="w-full max-w-[534px] h-10 bg-[#F3F5F4] p-3
              border border-[#CFCBCB]
            flex items-center rounded-md mt-3 "
            >
              <input
                type="text"
                className="w-full  bg-transparent border-none outline-none  placeholder:text-xs placeholder:text-[#37343566]"
                placeholder="Search for products"
              />
            </div>
            <button
              onClick={() => setRecords(true)}
              className={` active:opacity-[0.5] 
                 md:w-[186px] w-[150px] h-10 p-[10px] cursor-pointer flex items-center justify-center rounded-[6px] 
                      bg-[#359E52] text-white
                    `}
            >
              <p className="text-sm flex flex-row flex-nowrap">Track order</p>
            </button>
          </div>

          <div className="flex flex-row items-center justify-center gap-3 font-primaryRegular">
            <p className="md:text-lg text-base flex flex-row items-center gap-2">
              Need Assistance{" "}
              <p className="text-[#359E52] md:text-[18px] cursor-pointer text-base">
                Get help
              </p>
            </p>
          </div>
        </div>

        {showRecords && (
          <div className="w-full max-w-[462px] min-h-[80vh]  flex flex-col bg-white xl:p-[40px] p-[20px] font-primaryRegular ">
            <div className="flex flex-row items-center justify-between">
              <b className=" text-[16px] ">Order ID #312311</b>
              <div className="h-[43px] min-w-[215px] bg-[#08932E] text-white flex items-center justify-center">
                Order ready to ship
              </div>
            </div>

            <div className="flex flex-row items-center gap-[13px] mt-[20px]">
              <div className="rounded-[100px] bg-[#08932E] w-[50px] h-[50px] flex items-center justify-center">
                <CheckIcon width={22} height={22} color="white" />
              </div>
              <div className="flex flex-col">
                <b className="text-[18px] text-[#08932E]">Order Accepted</b>
                <p className="text-[14px]">on Aug 3, 1823</p>
              </div>
            </div>
            <div className="w-full border-l-[2px] h-[58px] ml-[20px] my-2"></div>
            <div className="flex flex-row items-center gap-[13px]">
              <div className="rounded-[100px] bg-[#08932E] w-[50px] h-[50px] flex items-center justify-center">
                <CheckIcon width={22} height={22} color="white" />
              </div>
              <div className="flex flex-col">
                <b className="text-[20px] text-[#08932E]">Order in Process</b>
                <p className="text-[14px]">on Aug 3, 2023</p>
              </div>
            </div>
            <div className="w-full border-l-[2px] h-[58px] ml-[20px] my-2"></div>
            <div className="flex flex-row items-center gap-[13px]">
              <div className="rounded-[100px] bg-[#373435] w-[50px] h-[50px] flex items-center justify-center">
                <CheckIcon width={22} height={22} color="white" />
              </div>
              <div className="flex flex-col">
                <b className="text-[18px] text-[#373435]">
                  Order Ready for Shipment
                </b>
                {/* <p className="text-[16px]">on Aug 3, 2023</p> */}
              </div>
            </div>
            <div className="w-full border-l-[2px] h-[58px] ml-[20px] my-2"></div>
            <div className="flex flex-row items-center gap-[13px]">
              <div className="rounded-[100px] bg-[#373435] w-[50px] h-[50px] flex items-center justify-center">
                <CheckIcon width={22} height={22} color="white" />
              </div>
              <div className="flex flex-col">
                <b className="text-[18px] text-[#373435]">Order Shipped</b>
                {/* <p className="text-[16px]">on Aug 3, 2023</p> */}
              </div>
            </div>
            <div className="w-full border-l-[2px] h-[58px] ml-[20px] my-2"></div>
            <div className="flex flex-row items-center gap-[13px]">
              <div className="rounded-[100px] bg-[#373435] w-[50px] h-[50px] flex items-center justify-center">
                <CheckIcon width={22} height={22} color="white" />
              </div>
              <div className="flex flex-col">
                <b className="text-[18px] text-[#373435]">
                  Order Out for Delivery
                </b>
                {/* <p className="text-[16px]">on Aug 3, 2023</p> */}
              </div>
            </div>
            <div className="w-full border-l-[2px] h-[58px] ml-[20px] my-2"></div>
            <div className="flex flex-row items-center gap-[13px]">
              <div className="rounded-[100px] bg-[#373435] w-[50px] h-[50px] flex items-center justify-center">
                <CheckIcon width={22} height={22} color="white" />
              </div>
              <div className="flex flex-col">
                <b className="text-[18px] text-[#373435]">Delivered</b>
                {/* <p className="text-[16px]">on Aug 3, 2023</p> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TrackOrders;
