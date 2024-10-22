import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Apple from "../assets/apple.png";
import { LuCheckCircle } from "react-icons/lu";
import moment from "moment";

const Dropshippers = () => {
  const [activeTab, setActiveTab] = useState("Products For Dropshipping");
  const tabs = ["Products For Dropshipping", "Products To Ship"];

  let viewToRender;
  viewToRender = (
    <>
      <div className="w-full">
        {activeTab === "Products For Dropshipping" && <NewDropshipping />}
        {activeTab === "Products To Ship" && <OrderProgress />}
      </div>
    </>
  );
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // bodyClassName={"bg-[red]"}
        theme="colored"
        transition={Bounce}
      />

      <>
        <div className="w-full flex flex-col">
          <p className="w-full font-primaryBold md:hidden">All Orders</p>
          {/* <div className="w-full md:max-w-[534px] h-10 bg-white p-3 flex items-center rounded-md">
            <input
              type="text"
              className="w-full placeholder:text-xs placeholder:text-[#37343566] font-primaryRegular"
              placeholder="Search for products"
              onInput={(e) => {
                setfilterKeyword(e.target.value);
                searchForProducts(e.target.value);
              }}
            />
            <FiSearch width={16} height={16} color="#37343566" />
          </div> */}

          {/* Tab Navigation */}
          <div className="my-4 w-full overflow-x-auto font-primaryRegular">
            <div className="flex items-center gap-4">
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
          </div>

          <div className="bg-white p-4 my-4">
            <div>{viewToRender}</div>
          </div>
        </div>
      </>
    </>
  );
};

export default Dropshippers;

const NewDropshipping = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("vendorToken");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [dropshippingProducts, setAllDropshippingProducts] = useState([]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  useEffect(() => {
    const getAllOrders = () => {
      axios
        .get(`${apiURL}/vendors-dashboard/my-dropshipping`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.dropshipping, "Dropshippers");
          setAllDropshippingProducts(response.data.data.dropshipping.reverse());
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllOrders();
  }, []);

  const handleOrderDetails = (data) => {
    // Navigate to the new page and pass the data through state
    console.log("handleViewDetails called with:", data);
    navigate("/dashboard/orderDetails", { state: { data } });
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
        };
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(dropshippingProducts.length / itemsPerPage);

  const paginatedProducts = dropshippingProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {paginatedProducts.length > 0 ? (
        <div className="w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  <th className="text-center p-3">Date</th>
                  <th className="text-center p-3">Customer Name</th>
                  <th className="text-center p-3">Product</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3"> Quantity Shipped</th>
                  <th className="text-center p-3"> Quantity Left</th>
                  <th className="text-center p-3"> Status</th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((order, index) => {
                  const { dotsColor } = getOrderStatusStyles(
                    order.deliveryStatus
                  );
                  const { bgColor, textColor, dotColor } =
                    getPaymentStatusStyles(order.status);
                  return (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="p-4 text-center">{order.name}</td>
                      <td className="p-4 text-left">
                        <div className="flex gap-2">
                          <img
                            // src={`${data.featured_image}`}
                            src={Apple}
                            alt=""
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <div className="w-[100px] flex flex-col gap-2">
                            {/* <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                              {data.name}
                            </p> */}
                            <p className="text-ellipsis whitespace-nowrap">
                              {/* {data.name} */} Apples
                            </p>
                            {/* <b>{data?.categoryId?.name}</b> */}
                            <b>Grocery & Gourmet</b>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="grid gap-4">
                          <p>1 carton</p>
                          <p>24 units</p>
                        </div>
                      </td>
                      <td className="p-4 text-center">12 units</td>
                      <td className="p-4 text-center">12 units</td>
                      <td className="p-4 text-center">
                        <div className="bg-[#08932E]/[12%] text-[#08932E] p-3">
                          Active
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          // onClick={() => handleOrderDetails(order)}
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
          <div className="flex justify-end mt-4 mb-2 font-primaryMedium">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 rounded mx-1 p-2 ${
                  currentPage === index + 1
                    ? "bg-[#359E52] text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-[#F1F4F2]">
            <tr className="text-[#000000] text-sm">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Product</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Payment status</th>
              <th className="p-4">Order status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="py-8 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-[#373435] font-primaryMedium">
                    No recent orders
                  </p>
                  {/* <img
                    width={400}
                    height={400}
                    src="/assets/cart.svg"
                    alt="No orders"
                    className="mt-4"
                  /> */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

const OrderProgress = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("vendorToken");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [shippingProducts, setShippingProducts] = useState([]);

  useEffect(() => {
    const getAllOrders = () => {
      axios
        .get(`${apiURL}/vendors-dashboard/my-dropshipping`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(
            response.data.data.dropshipping,
            "Orders for dropshipping"
          );
          setShippingProducts(response.data.data.dropshipping);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllOrders();
  }, []);

  const handleOrderDetails = (data) => {
    // Navigate to the new page and pass the data through state
    console.log("handleViewDetails called with:", data);
    navigate("/dashboard/orderDetails", { state: { data } });
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
        };
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(shippingProducts.length / itemsPerPage);

  const paginatedProducts = shippingProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {paginatedProducts.length > 0 ? (
        <div className="w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  <th className="text-center p-3">Date</th>
                  <th className="text-center p-3">Customer Name</th>
                  <th className="text-center p-3">Product</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3"> Quantity Shipped</th>
                  <th className="text-center p-3"> Quantity Left</th>
                  <th className="text-center p-3"> Status</th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((order, index) => {
                  const { dotsColor } = getOrderStatusStyles(
                    order.deliveryStatus
                  );
                  const { bgColor, textColor, dotColor } =
                    getPaymentStatusStyles(order.status);
                  return (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">Jun 16, 2024</td>
                      <td className="p-4 text-center">{order.name}</td>
                      <td className="p-4 text-left">
                        <div className="flex gap-2">
                          <img
                            // src={`${data.featured_image}`}
                            src={Apple}
                            alt=""
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <div className="w-[100px] flex flex-col gap-2">
                            {/* <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                              {data.name}
                            </p> */}
                            <p className="text-ellipsis whitespace-nowrap">
                              {/* {data.name} */} Apples
                            </p>
                            {/* <b>{data?.categoryId?.name}</b> */}
                            <b>Grocery & Gourmet</b>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="grid gap-4">
                          <p>1 carton</p>
                          <p>24 units</p>
                        </div>
                      </td>
                      <td className="p-4 text-center">12 units</td>
                      <td className="p-4 text-center">12 units</td>
                      <td className="p-4 text-center">
                        <div className="bg-[#08932E]/[12%] text-[#08932E] p-3">
                          Active
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          // onClick={() => handleOrderDetails(order)}
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
          <div className="flex justify-end mt-4 mb-2 font-primaryMedium">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 rounded mx-1 p-2 ${
                  currentPage === index + 1
                    ? "bg-[#359E52] text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-[#F1F4F2]">
            <tr className="text-[#000000] text-sm">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Product</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Payment status</th>
              <th className="p-4">Order status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="py-8 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-[#373435] font-primaryMedium">
                    No recent orders
                  </p>
                  {/* <img
                    width={400}
                    height={400}
                    src="/assets/cart.svg"
                    alt="No orders"
                    className="mt-4"
                  /> */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
