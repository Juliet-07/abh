import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";
import Sidebar from "./sidebar";

const Subscription = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  let viewToRender;
  viewToRender = (
    <>
      <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div
              onClick={() => handleTabClick(1)}
              className={`cursor-pointer ${
                activeTab === 1
                  ? "text-green-600 font-medium"
                  : "text-[#C1C6C5]"
              }`}
            >
              Billing Status
            </div>
            <div
              onClick={() => handleTabClick(2)}
              className={`cursor-pointer ${
                activeTab === 2
                  ? "text-green-600 font-medium"
                  : "text-[#C1C6C5]"
              }`}
            >
              Billing Plan
            </div>
          </div>

          {/* Progress Bar just below the tabs */}
          <div className="relative w-full">
            <div className="h-1 bg-[#C1C6C5]">
              <div
                className={`h-1 ${
                  activeTab === 1 ? "w-1/2 bg-green-600" : "w-full bg-green-600"
                } transition-all duration-300`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-4 md:py-10 2xl:py-20">
        {activeTab === 1 && <BillingStatus />}
        {activeTab === 2 && <BillingPlan />}
      </div>
    </>
  );
  return (
    <>
      {showPreview && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-[100vh]  bg-[#000000a8] z-[10000] fixed top-0 left-0 flex flex-col items-center justify-center font-primaryRegular"
        >
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="w-[50px] h-[50px] rounded-[100px] border-[#08932E] border flex flex-col items-center justify-center">
              <FiCheck width={30} height={30} color="#08932E" />
            </div>
            <b>Plan Activated</b>
            <br />
            <button
              onClick={() => setShowPreview(false)}
              className="w-[150px] h-10 rounded-md bg-[#4CBD6B] text-white font-semibold"
            >
              Okay
            </button>
          </div>
        </div>
      )}
      <Sidebar>
        <div className="flex-grow md:px-6">
          {/* Subscription Header */}
          <div className="w-full bg-white rounded-lg border border-[#CFCBCB] font-primarySemibold border-l-4 border-l-[#359E52] p-4 mb-6">
            Subscription
          </div>
          {/* Subscription Details */}
          <div className="bg-white p-4 mt-6">
            <div>{viewToRender}</div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Subscription;

const BillingStatus = () => {
  return (
    <div>
      <div className="w-full p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Name</h3>
          <span className="font-semibold text-gray-700">Roselyn Klein</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Email</h3>
          <span className="font-semibold text-gray-700">johndoe@gmail.com</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Phone</h3>
          <span className="font-semibold text-gray-700">08123122311</span>
        </div>
      </div>
    </div>
  );
};

const BillingPlan = () => {
  const billingPlan = [
    {
      title: "Daily",
      price: "₦500",
      desc: "Daily Total Incl. VAT",
      planItems: [
        "Store items in warehouse for one day",
        "Ship your goods within a day",
      ],
    },
    {
      title: "Weekly",
      price: "₦1,500",
      desc: "Weekly Total Incl. VAT",
      planItems: [
        "Store items in warehouse for one week",
        "Ship your goods within a week",
      ],
    },
    {
      title: "Monthly",
      price: "₦5,000",
      desc: "Monthly Total Incl. VAT",
      planItems: [
        "Store items in warehouse for one month",
        "Ship your goods within a month",
      ],
    },
  ];
  return (
    <div>
      <div className="w-full p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {billingPlan.map((plans) => (
            <div className="min-w-[311px] min-h-[294px] bg-white border border-[#074994] rounded-lg flex flex-col items-center">
              <div className="w-full bg-gradient-to-r from-[#074994] to-[#15A05E]/[60%] rounded-t flex items-center justify-center uppercase text-white font-primaryMedium p-3">
                {plans.title}
              </div>
              <p className="my-1 font-primarySemibold">{plans.price}</p>
              <p className="text-xs italic text-[#888284]">{plans.desc}</p>
              <div className="flex-grow my-2">
                {plans.planItems.map((item) => (
                  <div key={item} className="flex items-center p-2">
                    <LuCheckCircle size={20} color="#30CC83" />
                    <p className="text-gray-500 text-xs mx-3">{item}</p>
                  </div>
                ))}
              </div>
              <button className="min-w-[153px] h-[44px] bg-[#4CBD6B] text-white rounded-lg p-2 font-primarySemibold mb-4">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
