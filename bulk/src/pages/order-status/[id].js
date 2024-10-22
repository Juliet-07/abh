import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import axios from "axios";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import CardTwo from "@component/cta-card/CardTwo";
import StickyCart from "@component/cart/StickyCart";
import Loading from "@component/preloader/Loading";
import ProductCard from "@component/product/ProductCard";
import FeatureCategory from "@component/category/FeatureCategory";
import CMSkeleton from "@component/preloader/CMSkeleton";
import MainCarousel from "@component/carousel/MainCarousel";
import OfferCard from "@component/offer/OfferCard";
import Banner from "@component/banner/Banner";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/outline";
import Select from "react-select";
import { FiInfo } from "react-icons/fi";

const OrderStatus = ({ params }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();
  const [products, setProducts] = useState([]);
  const [subscriptionPopup, setsubscriptionPopup] = useState(false);

  const [quantity, setquantity] = useState(0);
  const [SelectedSubscription, setSelectedSubscription] =
    useState("Daily plan");
  const [Subscription, setSubscription] = useState([
    "Daily plan",
    "Weekly plan",
    "Monthly plan",
  ]);
  const options = [
    {
      value: "C Idea 8 Inches Andriod Tablet",
      label: "C Idea 8 Inches Andriod Tablet",
    },
    { value: "None", label: "None" },
  ];

  const QuantityOptions = [
    { value: "1", label: "1 carton" },
    { value: "6", label: "6 units" },
    { value: "12", label: "12 units" },
    { value: "18", label: "18 units" },
    { value: "20", label: "20 units" },
    { value: "0", label: "none" },
  ];

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen  mx-auto max-w-screen-2xl flex items-center justify-center py-5">
            <div className="w-[90%] min-h-[80vh] bg-white rounded-xl border flex flex-col py-4">
              <div className="w-full flex md:flex-row md:items-center justify-between text-[16px] md:p-8 p-4 flex-wrap flex-col">
                <b>Thank you! Your order has been placed.</b>
                <Link href="/all-products" className="text-[#359E52] active:opacity-[0.5] cursor-pointer text-[12px] md:text-[14px]">
                  Shop more
                </Link>
              </div>
              <div className="flex md:flex-row w-full flex-col">
                <div className="flex flex-[60]  md:p-8 p-4 min-h-[400px] flex-col">
                  <div className="w-full  flex-row grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 lg:gap-4 mb-4">
                    <div className="border max-h-[90px] max-w-[180px] rounded-md flex flex-col items-center justify-between md:p-4 p-2">
                      <p className="text-[12px] md:text-[16px] text-center">
                        Order Number
                      </p>
                      <p className="text-[12px] md:text-[16px]">#312235</p>
                    </div>
                    <div className="border max-h-[90px] max-w-[180px] rounded-md flex flex-col items-center justify-between md:p-4 p-2">
                      <p className="text-[12px] md:text-[16px] text-center">
                        Date placed
                      </p>
                      <p className="text-[12px] md:text-[16px]">
                        July 18, 2023
                      </p>
                    </div>
                    <div className="border max-h-[90px] max-w-[180px] rounded-md flex flex-col items-center justify-between   p-2">
                      <p className="text-[12px] md:text-[16px] text-center">
                        Quantity_Shipped
                      </p>
                      <p className="text-[12px] md:text-[16px]">12 units</p>
                    </div>
                    <div className="border max-h-[90px] max-w-[180px] rounded-md flex flex-col items-center justify-between  p-2">
                      <p className="text-[12px] md:text-[16px] text-center">
                        Payment status
                      </p>
                      <p className="text-[12px] md:text-[16px] text-[#F58634]">
                        paid
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-between mt-4 flex-wrap">
                    <p className="font-[600]">
                      Order placed on 02/02.2024 10:04 AM
                    </p>
                    <div className="flex flex-col">
                      <p className="font-[600]">Shipping Address</p>
                      <p>John Klein Doe</p>
                      <p>7, Isaac Jones Street, Ikeja, Lagos</p>
                      <p>091-222-121-11</p>
                    </div>
                  </div>
                  <br />
                  <div className="bg-[#4CBD6B1F]  min-h-[42px] flex flex-row items-start p-2 mt-2 gap-2  ">
                    <span>
                      <FiInfo color="green" size={20} />
                    </span>
                    <p className="text-[14px]">
                      Some orders may arrive separately from different
                      suplliers. Track each order individually{" "}
                      <span className="text-[#359E52] cursor-pointer active:opacity-5">
                        here
                      </span>
                      .
                    </p>
                  </div>
                  <br />
                  <div className="flex flex-row gap-2 items-center mt-10">
                    <img width={44} height={44} src="/car_icon.svg" />{" "}
                    <p>
                      You ‘ll get an email with tracking info once your item
                      ships
                    </p>{" "}
                  </div>
                </div>
                <div className="flex flex-[40] min-h-[80vh] flex-col px-4 ">
                  <div className="w-full h-[60px] rounded-md border flex items-center px-4 mt-4">
                    <p className="font-[bold]">Summary</p>
                  </div>
                  <div className="w-full h-[300px] rounded-md border flex items-center px-4 mt-4  flex-col py-4">
                    <p className="font-[500]">1 Item(s) in total Add to cart</p>
                    <br />
                    <div className="flex w-full items-cener justify-between">
                      <p className="font-[500]">Item(s)</p>
                      <p className="font-[500]">₦150,000</p>
                    </div>
                    <br />
                    <div className="flex w-full items-cener justify-between">
                      <p className="font-[500]">Shipping fee</p>
                      <p className="font-[500]">₦1,500</p>
                    </div>
                    <br />
                    <div className="flex w-full items-cener justify-between">
                      <b className="">Total</b>
                      <b className=" text-[20px]">₦151,500</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default OrderStatus;
