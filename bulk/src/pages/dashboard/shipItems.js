import React, { useState, useEffect, useCallback } from "react";
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
import Link from "next/link";
import Select from "react-select";
import { ChevronRightIcon } from "@heroicons/react/outline";
import DropdownComponent from "@pages/state-selection";
import InputShipping from "@component/form/InputShipping";
import InputPayment from "@component/form/InputPayment";
import { IoBagHandle, IoWalletSharp } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";

const ShipItems = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const router = useRouter();
  const { handleSubmit } = useForm();
  const currency = "₦";
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [data, setData] = useState({});
  const [address, setAddress] = useState("");
  const [quantityToBeShipped, setQuantityToBeShipped] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentGateway, setPaymentGateway] = useState("");
  const [logisticsGateway, setLogisticsGateway] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [townId, setTownId] = useState("");

  const optionMeasure = [
    { value: "Carton", label: "Carton" },
    { value: "Unit", label: "Unit" },
  ];

  const handleStateInfo = useCallback((data) => {
    console.log({ data });
    setState(data.state);
    setCity(data.cityName);
    setTownId(data.townId);
    setTown(data.town);
    console.log(city, "checking state");
  }, []);

  const handleLogisticsSelect = (value) => {
    setLogisticsGateway(value);
  };

  const handlePaymentSelect = (value) => {
    setPaymentGateway(value);
  };

  // Fetch delivery fee
  const fetchDeliveryFee = async () => {
    let costData;
    let cost;
    try {
      const payload = {
        Origin: data?.vendorId?.state,
        Destination: state,
        // Weight: items.reduce(
        //   (total, item) => total + item.weight * item.quantity,
        //   0
        // ),
        // Weight: totalWeight,
        Weight: data?.productId?.weight,
        // OnforwardingTownID: String(townId),
        OnforwardingTownID: townId,
        // PickupType: "1",
      };
      console.log(payload);
      const response = await axios.post(
        `${apiURL}/logistic/delivery-fee`,
        payload
      );
      console.log(response.data.data, "response from delivery fee");
      costData = response.data.data;
      cost = parseFloat(costData[0]?.TotalAmount);
      console.log(cost, "actual amount");
      setShippingCost(cost);
      return isNaN(cost) ? 0 : cost;
    } catch (error) {
      console.error("Error fetching delivery fee:", error);
    }
  };

  // const calculateTotalDeliveryFee = async () => {
  //   try {
  //     let vendorOrigins = items.map((origin) => origin?.vendor?.state);
  //     console.log(vendorOrigins, "places of the vendor");

  //     const uniqueOrigins = [...new Set(vendorOrigins)];

  //     const deliveryFeePromises = uniqueOrigins.map((origin) =>
  //       fetchDeliveryFee(origin)
  //     );

  //     const deliveryFees = await Promise.all(deliveryFeePromises);
  //     console.log("Fetched delivery fees:", deliveryFees);

  //     const totalDeliveryFee = deliveryFees.reduce((total, fee) => {
  //       const numericFee = parseFloat(fee);
  //       return total + (isNaN(numericFee) ? 0 : numericFee);
  //     }, 0);

  //     setShippingCost(totalDeliveryFee);

  //     console.log("Total Delivery Fee:", totalDeliveryFee);
  //   } catch (error) {
  //     console.error("Error calculating total delivery fee:", error);
  //   }
  // };

  const handleCalculateDeliveryFee = () => {
    fetchDeliveryFee();
  };

  const submitOrder = () => {
    let orderResponse;
    let url;
    // const payload = {

    //   personaInfo: {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     phoneNumber: phoneNumber,
    //   },
    //   shippingAddress: {
    //     street: street,
    //     city: city,
    //     state: state,
    //     country: country,
    //   },
    //   shippingFee: shippingCost,
    //   shippingMethod: logisticsGateway,
    //   paymentGateway: paymentGateway,
    //   products: items.map((item) => ({
    //     productId: item._id,
    //     quantity: item.quantity,
    //   })),
    // };

    const payload = {
      shippingAddress: {
        street: address,
        city: city,
        state: state,
        country: "Nigeria",
        town: town,
      },
      shippingFee: shippingCost,
      shippingMethod: logisticsGateway,
      paymentGateway: paymentGateway,
      products: [
        {
          productId: data?.productId?._id,
          quantity: quantityToBeShipped,
        },
      ],
    };
    console.log(payload, "create order payload");
    setIsCheckoutSubmit(true);

    try {
      axios
        .post(`${apiURL}/shipping`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((order) => {
          console.log(order.data);
          if (order.status === 201) {
            notifySuccess("Order Successfully created");
          }
          orderResponse = order.data.data;
          url = orderResponse.paymentResponse.data.url;
          // emptyCart();
          router.push(url);
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        });
    } catch (error) {
      console.log("Unexpected Error:", error);
    }
  };

  useEffect(() => {
    const getMyInventoryDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL}/dropshipping/inventories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        console.log(response.data.data, "Inventory By ID");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // notifyError("Failed to fetch orders");
        setLoading(false);
      }
    };

    getMyInventoryDetails();
  }, [router]);
  return (
    <>
      <Sidebar>
        <div className="flex-grow md:px-6">
          <div className="w-full h-[60px] bg-white mb-8 flex items-center px-5 font-primarySemibold shadow-md">
            Ship Items
          </div>
          <div className="w-full h-full flex lg:flex-row flex-col flex-wrap gap-10">
            <div className="flex flex-[50] flex-col p-5 bg-white shadow-lg ">
              <div className="w-full flex flex-row items-center justify-between text-[16px]">
                <b>Product Summary</b>
              </div>
              <br />
              <div className="w-full flex gap-10">
                <div>
                  <img
                    src={data?.productId?.featured_image}
                    className="w-[100px] h-[100px]"
                  />
                </div>
                <div>
                  <p>{data?.productId?.name}</p>
                  <p>{data?.quantity} cartons</p>
                </div>
              </div>
            </div>

            <div className="flex flex-[50] flex-col p-5 bg-white shadow-lg">
              <b className="w-full">Drop-shipment Summary</b>
              <br />
              <form
                onSubmit={handleSubmit(submitOrder)}
                className="w-full h-full grid gap-4"
              >
                {/* <p className="mb-2">Items to be shipped</p>
                <Select
                  isMulti
                  name="colors"
                  // options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Products listed her will be names of the products selected"
                />
                <br />
                <p className="mb-2">Measure</p>
                <Select options={optionMeasure} /> */}
                {/* <br /> */}
                <div>
                  <Label label="Quantity to be shipped" />
                  <input
                    className="w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-[#359E52] h-11 md:h-12 p-3"
                    placeholder="Input the number of cartons you intend to ship"
                    value={quantityToBeShipped}
                    onChange={(e) => setQuantityToBeShipped(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Address" />
                  <input
                    className="w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-[#359E52] h-11 md:h-12 p-3"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <DropdownComponent onForm={handleStateInfo} />
                <div>
                  <Label label="Shipping Cost" />
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <InputShipping
                        currency={currency}
                        handleShippingCost={handleCalculateDeliveryFee}
                        // register={register}
                        value="REDSTAR_LOGISTICS"
                        description="Delivery Cost: "
                        cost={shippingCost}
                        onClick={handleLogisticsSelect}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <InputShipping
                        currency={currency}
                        handleShippingCost={handleCalculateDeliveryFee}
                        // register={register}
                        value="DHL"
                        description="Delivery Cost: "
                        cost={shippingCost}
                        onClick={handleLogisticsSelect}
                      />
                    </div>
                  </div>
                </div>
                <div className="my-2">
                  <Label label="Payment Gateway" />
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <InputPayment
                        // setShowCard={setShowCard}
                        // register={register}
                        name="Hydrogen Pay"
                        value="HYDROGENPAY"
                        Icon={IoWalletSharp}
                        // onClick={() => handlePaymentSelect("HYDROGENPAY")}
                        onClick={handlePaymentSelect}
                      />
                      {/* <Error errorName={errors.paymentMethod} /> */}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <InputPayment
                        // setShowCard={setShowCard}
                        // register={register}
                        name="Providus Bank"
                        value="PROVIDUS"
                        Icon={ImCreditCard}
                        // onClick={() => handlePaymentSelect("PROVIDUS")}
                        onClick={handlePaymentSelect}
                      />
                      {/* <Error errorName={errors.paymentMethod} /> */}
                    </div>
                  </div>
                </div>

                <div
                  // href={`/order-status/${id}`}
                  className=" w-full flex items-center justify-center"
                >
                  <button
                    type="submit"
                    className="flex w-[80%] max-w-[200px] h-10 rounded-[5px] text-sm p-2 bg-[#4CBD6B] items-center justify-center text-white font-primarySemibold"
                  >
                    {isCheckoutSubmit ? (
                      <span className="flex justify-center text-center">
                        {" "}
                        <img
                          src="/loader/spinner.gif"
                          alt="Loading"
                          width={20}
                          height={10}
                        />{" "}
                        <span className="ml-2">Processing</span>
                      </span>
                    ) : (
                      <span className="flex justify-center text-center">
                        Create Order
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default ShipItems;
