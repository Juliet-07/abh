import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowNarrowLeftIcon, CheckIcon, XIcon } from "@heroicons/react/solid";
import AddWholesaleProduct from "./wholesale";
import AddRetailProduct from "./retail";
import AddSampleProduct from "./sample";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [showPreview, setPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("wholesale");

  const renderForm = () => {
    switch (activeTab) {
      case "wholesale":
        return <AddWholesaleProduct />;
      case "retail":
        return <AddRetailProduct />;
      case "sample":
        return <AddSampleProduct />;
      default:
        return null;
    }
  };

  return (
    <>
      <ToastContainer />
      {showPreview && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-[100vh]  bg-[#000000a8] z-[10000] fixed top-0 left-0 flex flex-col items-center justify-center font-primaryRegular"
        >
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="w-[50px] h-[50px] rounded-[100px] border-[#08932E] border flex flex-col items-center justify-center">
              <CheckIcon width={30} height={30} color="#08932E" />
            </div>
            <b>Product received</b>
            <p className="w-full text-center">
              Your product has been received and <br />
              is you will be notified once it is live
            </p>
            <br />
            <button
              onClick={() => setPreview(false)}
              className="w-[150px] h-10 rounded-md bg-[#4CBD6B] text-white font-semibold"
            >
              Okay
            </button>
          </div>
        </div>
      )}
      <header className="w-full h-10 flex  bg-white  flex-row items-center justify-between p-4">
        <div className="flex flex-row gap-[10px] items-center ">
          <ArrowNarrowLeftIcon
            width={20}
            height={20}
            onClick={() => navigate("/dashboard/myProducts")}
          />
          <p className="font-primaryRegular">Add Product</p>
        </div>
      </header>
      <div className="w-full my-4">
        <div className="md:w-[582px] p-3 rounded-3xl md:rounded-[100px] flex gap-4 bg-white font-primaryMedium text-sm md:text-base">
          <button
            className={`p-2 rounded-md ${
              activeTab === "wholesale"
                ? "bg-[#F0F0F0] border-[#359E52] text-[#359E52]"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("wholesale")}
          >
            Wholesale Products
          </button>
          <button
            className={`p-2 rounded-md ${
              activeTab === "retail"
                ? "bg-[#F0F0F0] border-[#359E52] text-[#359E52]"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("retail")}
          >
            Retail Products
          </button>
          <button
            className={` p-2 rounded-md ${
              activeTab === "sample"
                ? "bg-[#F0F0F0] border-[#359E52] text-[#359E52]"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("sample")}
          >
            Sell Sample Products
          </button>
        </div>
        {renderForm()}
      </div>
    </>
  );
};

export default AddProduct;
