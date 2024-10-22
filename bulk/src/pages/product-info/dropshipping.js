import { useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import axios from "axios";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import Loading from "@component/preloader/Loading";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/outline";
import Select from "react-select";
import { useCart } from "react-use-cart";
import { useForm } from "react-hook-form";
import CartItem from "@component/cart/CartItem";
import { IoBagHandle, IoWalletSharp } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import InputPayment from "@component/form/InputPayment";
import { notifySuccess } from "@utils/toast";

const PaymentSummary = ({ params }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();
  const { handleSubmit } = useForm();
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [product, setProduct] = useState(null);
  const { items, emptyCart } = useCart();
  const [subscriptionPopup, setsubscriptionPopup] = useState(false);
  const currency = "#";
  const [shippingCost, setShippingCost] = useState(0);
  const [SelectedSubscription, setSelectedSubscription] =
    useState("Daily plan");
  const [paymentGateway, setPaymentGateway] = useState("");

  const [Subscription, setSubscription] = useState([
    "Daily plan",
    "Weekly plan",
    "Monthly plan",
  ]);

  const handlePaymentSelect = (value) => {
    setPaymentGateway(value);
  };

  // Calculate subscription fee based on the selected plan
  const subscriptionFee = useMemo(() => {
    switch (SelectedSubscription) {
      case "Daily plan":
        return 500;
      case "Weekly plan":
        return 1000;
      case "Monthly plan":
        return 5000;
      default:
        return 0;
    }
  }, [SelectedSubscription]);

  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + item.sellingPrice * item.quantity;
    }, 0);
  }, [items]);
  const totalCost = cartTotal + shippingCost + subscriptionFee;

  const QuantityOptions = [
    { value: "1", label: "1 carton" },
    { value: "6", label: "6 units" },
    { value: "12", label: "12 units" },
    { value: "18", label: "18 units" },
    { value: "20", label: "20 units" },
    { value: "0", label: "none" },
  ];
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `${apiURL}/products/list/wholesale/${productId}`
      );
      const data = await response.json();
      console.log(data.data, "product details");
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const handleDropshipOrder = () => {
    let orderResponse;
    let url;
    const payload = {
      subscriptionDetails: {
        plan: SelectedSubscription,
        // plan: "MONTHLY",
        amount: subscriptionFee,
      },
      paymentGateway: paymentGateway,
      products: items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };
    console.log(payload, "create order payload");
    setIsCheckoutSubmit(true);

    try {
      axios
        .post(`${apiURL}/dropshipping`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((order) => {
          console.log(order.data);
          if (order.status === 201) {
            notifySuccess("Inventory Successfully created");
          }
          orderResponse = order.data.data;
          url = orderResponse.paymentResponse.data.url;
          emptyCart();
          router.push(url);
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        });
    } catch (error) {
      console.log("Unexpected Error:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen  mx-auto max-w-screen-2xl ">
            {/* Header */}
            <div className="w-full h-[60px] flex flex-row items-center px-3 sm:px-10 gap-2 flex-wrap ">
              <div className=" text-[12px] md:text-[14px] text-black">Home</div>{" "}
              <ChevronRightIcon width={14} height={14} />{" "}
              <div className=" text-[12px] md:text-[14px] text-black">
                Product Details
              </div>
              <ChevronRightIcon width={14} height={14} />{" "}
              <div className=" text-[12px] text-[#10B981] md:text-[14px]">
                Payment Summary
              </div>
            </div>
            {/* Form Proper */}
            <form
              onSubmit={handleSubmit(handleDropshipOrder)}
              className=" w-full min-h-[100vh] flex lg:flex-row flex-col flex-wrap px-3 sm:px-10 gap-8"
            >
              <div className="flex flex-[50] flex-col px-3 sm:px-10 py-10 bg-white ">
                <div className="w-full flex flex-row items-center justify-between text-[16px]">
                  <b>Payment Summary</b>
                </div>
                <br />
                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-[200px] bg-gray-50 block">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <CartItem key={item.id} item={item} currency={currency} />
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-2 w-full border-b h-[50px] justify-between mt-2">
                  <p className="font-[400]">Subtotal</p>
                  <p>₦{cartTotal?.toFixed(2)}</p>
                </div>

                {/* <div className="flex flex-row gap-2 w-full border-b h-[50px] justify-between mt-8">
                  <p className="font-[400]">Shipping fee</p>
                  <p>₦1500.00</p>
                </div> */}

                <div className="flex flex-row gap-2 w-full border-b min-h-[50px] justify-between mt-8">
                  <div className="flex flex-row items-center gap-4 flex-wrap">
                    <p className="font-[400]">Subscription fee</p>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setsubscriptionPopup(!subscriptionPopup);
                        }}
                        className="bg-[#FEC499] rounded-md h-[36px] w-[130px] flex px-1 active:opacity-[0.7] justify-between flex-row items-center gap-1 text-[14px]"
                      >
                        {SelectedSubscription}{" "}
                        <ChevronRightIcon width={16} height={16} />
                      </button>
                      {subscriptionPopup && (
                        <div className="w-[150px] h-[80px] py-2 rounded-md bg-white absolute top-10 border p-2 flex flex-col justify-between">
                          {Subscription.map((data, index) => {
                            if (data !== SelectedSubscription)
                              return (
                                <p
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedSubscription(data);
                                    setsubscriptionPopup(false);
                                  }}
                                  className="text-[16px] text-black w-full active:opacity-[0.5] cursor-pointer"
                                >
                                  {data}
                                </p>
                              );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <p>₦{subscriptionFee.toFixed(2)}</p>
                </div>

                <p className="text-[red] text-[12px] max-w-[400px] mt-3">
                  Your items are held in our warehouse for the duration of your
                  subscription. You can’t ship items after your subscription
                  expires until renewal.
                </p>
                <br />
                <div className="form-group mt-12">
                  <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                    03. Payment Gateway
                  </h2>
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
                <br />
                <div className="flex flex-row gap-2 w-full border-b h-[50px] justify-between mt-8">
                  <b>Total</b>
                  <b>₦{parseFloat(totalCost).toFixed(2)}</b>
                </div>
                {/* Button */}
                <div className="w-full flex items-center justify-center my-10">
                  {/* <Link
                    href={`/order-status/${id}`}
                    className=" w-full max-w-[250px]"
                  > */}
                  <button className="flex w-[90%] max-w-[250px] h-[50px] rounded-[5px] font-primarySemibold p-2 bg-[#4CBD6B] items-center justify-center text-white">
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
                        Create Inventory
                      </span>
                    )}
                  </button>
                  {/* </Link> */}
                </div>
              </div>

              {/* <div className="flex flex-[50] flex-col px-3 sm:px-10 md:py-10 py-4 bg-white items-center min-h-[400px]">
                <b className="w-full">Drop-shipment Summary</b>
                <br />
                <div className="w-full min-h-[200px]">
                  <p className="mb-2">Items to be shipped</p>
                  <Select
                    isMulti
                    name="colors"
                    // options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                  <br />
                  <p className="mb-2">Quantity to be shipped</p>
                  <Select
                    isMulti
                    name="colors"
                    options={QuantityOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                <br />
                <Link
                  href={`/order-status/${id}`}
                  className=" w-full max-w-[250px]"
                >
                  <button className="flex w-[90%] max-w-[250px] h-[50px] rounded-[5px] text-[14px] p-2 bg-[#4CBD6B] items-center justify-center text-white">
                    Create Order
                  </button>
                </Link>
              </div> */}
            </form>
          </div>
        </Layout>
      )}
    </>
  );
};

export default PaymentSummary;
