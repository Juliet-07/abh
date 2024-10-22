import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import {
  FiMail,
  FiMapPin,
  FiBell,
  FiCheckCircle,
  FiCheck,
} from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import { notifySuccess, notifyError } from "@utils/toast";
import InputArea from "@component/form/InputArea";
import Sidebar from "./sidebar";

const OrderDetails = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getMyOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL}/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        console.log(response.data.data, "Order By ID");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        notifyError("Failed to fetch orders");
        setLoading(false);
      }
    };

    getMyOrderDetails();
  }, [router]);

  const statusTimeline = [
    { status: "Order Placed", date: data?.created_at, completed: true },
    {
      status: "Order Confirmed",
      date: "",
      completed: data?.status === "Confirmed",
    },
    {
      status: "Order in Process",
      date: "",
      completed: data?.status === "In Process",
    },
    {
      status: "Order Shipped",
      date: "",
      completed: data?.status === "Shipped",
    },
    { status: "Delivered", date: "", completed: data?.status === "Delivered" },
  ];
  return (
    <>
      <Sidebar>
        <div className="flex-grow md:px-6">
          <div className="w-full h-[60px] bg-white mb-8 flex items-center px-5 font-primaryMedium shadow-md">
            Order Details
          </div>
          <div className="w-full bg-white p-4">
            {/* Blocks */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-10">
              <div className="min-w-[150px] min-h-[87px] border border-[#C1C6C5] rounded-lg flex flex-col items-center p-2 text-sm md:text-base">
                <p>Order Number</p>
                <p>{data?._id?.substring(20, 24)}</p>
              </div>
              <div className="min-w-[150px] min-h-[87px] border border-[#C1C6C5] rounded-lg flex flex-col items-center p-2 text-sm md:text-base">
                <p>Date Placed</p>
                <p>{dayjs(data.created_at).format("MMMM D, YYYY")}</p>
              </div>
              <div className="min-w-[150px] min-h-[87px] border border-[#C1C6C5] rounded-lg flex flex-col items-center p-2 text-sm md:text-base">
                <p>Quantity Shipped</p>
                <p>{data?.products?.length}</p>
              </div>
              <div className="min-w-[150px] min-h-[87px] border border-[#C1C6C5] rounded-lg flex flex-col items-center p-2 text-sm md:text-base">
                <p>Total Amount</p>
                <p>₦ {data?.totalAmount.toLocaleString()}</p>
              </div>
              <div className="hidden min-w-[178px] min-h-[87px] border border-[#C1C6C5] rounded-lg md:flex flex-col items-center p-2">
                <p>Payment Status</p>
                <p className="text-green-600">{data?.status}</p>
              </div>
            </div>
            {/* Products */}
            <div className="my-8">
              <p className="my-4 text-sm md:text-base">Item(s) Placed</p>
              <div className="grid gap-4">
                {data?.products?.map((product) => (
                  <div className="w-full border border-[#C1C6C5] rounded-xl flex flex-col md:flex-row items-center md:gap-20 p-2 text-xs md:text-base">
                    <p>Order #{product._id.substring(20, 24)}</p>
                    <div className="flex items-center gap-4 p-2">
                      <img
                        src={product?.productId?.featured_image}
                        className="w-20 h-20"
                      />
                      <div>
                        <p>{product?.productId?.name}</p>
                        <p>₦{product?.productId?.sellingPrice.toLocaleString()}</p>
                        <p>Quantity: {product?.quantity}</p>
                      </div>
                      <div className="flex gap-4">
                        <p>Status:</p>
                        <p className="text-red-300">{data?.deliveryStatus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm md:text-lg">Order Tracking</h3>

              {statusTimeline.map((step) => (
                <>
                  <div className="flex flex-row items-center gap-[13px] mt-[20px]">
                    <div
                      className={`${
                        step?.completed ? " bg-[#08932E] " : " bg-[#373435] "
                      } rounded-[100px] w-10 md:w-[50px] h-10 md:h-[50px] flex items-center justify-center`}
                    >
                      <FiCheck size={20} color="white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-primarySemibold text-sm md:text-base">{step.status}</h3>
                      {step.date && (
                        <p className="text-gray-500 text-sm md:text-base">
                          on {dayjs(step.date).format("MMM D, YYYY, h:mm A")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full border-l-[2px] h-[50px] ml-[20px] my-2"></div>
                </>
              ))}
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default OrderDetails;
