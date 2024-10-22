import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChevronRightIcon } from "@heroicons/react/outline";
import Dropdown from "../components/Dropdown";
import {
  TotalOrdersChart,
  RevenueChart,
  OrderStatusChart,
} from "../components/Charts";
import { FiSearch } from "react-icons/fi";
import OutOfStock from "../assets/out_of_stock.svg";
import OrdersIcon from "../assets/orders_icon.svg";
import SalesIcon from "../assets/sales_icon.svg";
import UpArrow from "../assets/uparrow.svg";
import Apple from "../assets/apple.png";
import moment from "moment";

const Dashboard = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("vendorToken");
  const [recentOrders, setRecentOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [totalSales, setTotalSales] = useState(null);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  const productsData = [
    {
      id: "1565132",
      name: "Michael Farasin",
      date: "Jan 2, 2024",
      address: "7, Kingsway, Otawa, NY",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "pending",
    },
    {
      id: "1565132",
      name: "Prince Farasin",
      date: "Feb 3, 2024",
      address: "7, Kingsway, Otawa, NY",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "processing",
    },
    {
      id: "1565132",
      name: "Tom Cat",
      date: "Mar 2, 2024",
      address: "7, Kingsway, Otawa, NY",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "Ready to ship",
    },
    {
      id: "1565132",
      name: "Victor bryte",
      date: "Aug 2, 2024",
      address: "37, ktu, Otawa, NY",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "pending",
    },
    {
      id: "1565132",
      name: "Anony Mous",
      date: "MAy 4, 2024",
      address: "84, subway, Otawa, NY",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "Shipped",
    },
    {
      id: "1565132",
      name: "John Smith",
      date: "Aug 2, 2024",
      address: "7, subway, Otawa, NY",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "processing",
    },
    {
      id: "1565132",
      name: "Moses Micheal",
      date: "Aug 2, 2024",
      address: "7, yaba, Otawa, NY",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "Shipped",
    },
    {
      id: "1565132",
      name: "David King",
      date: "Aug 2, 2024",
      address: "22, Banksway, Otawa, NY",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "Shipped",
    },
    {
      id: "1565132",
      name: "Tim Codes",
      date: "Aug 2, 2024",
      address: "27, Timsway, Ontario, CA",
      // order_status: "N/A",
      payment_status: 34,
      price: "$230",
      order_status: "processing",
    },
  ];

  const [filterKeyword, setfilterKeyword] = useState("");

  const [FilteredProducts, setFilteredProducts] = useState([]);

  const searchForProducts = (keyword) => {
    setFilteredProducts(
      productsData.filter((product, index) => {
        return (
          product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.address.toLowerCase().includes(keyword.toLowerCase()) ||
          product.date.toLowerCase().includes(keyword.toLowerCase()) ||
          product.order_status.toLowerCase().includes(keyword.toLowerCase())
        );
      })
    );

    console.log(keyword);
    console.log(FilteredProducts);
    console.log(filterKeyword);
  };

  useEffect(() => {
    const getPendingOrders = () => {
      axios
        .get(`${apiURL}/vendors-dashboard/orders?status=PENDING`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.data);
          setRecentOrders(response.data.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };
    const getTotalSales = () => {
      axios
        .get(`${apiURL}/vendors-dashboard/total-sales`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data);
          const formattedTotalSales = response.data.data.toLocaleString();
          setTotalSales(formattedTotalSales);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };
    getTotalSales();
    getPendingOrders();
  }, []);

  const extractFiveDigits = (id) => {
    return id.substring(0, 5); // Extract the first 5 characters
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(recentOrders.length / itemsPerPage);

  const paginatedProducts = recentOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <div className="w-full font-primaryRegular bg-red-00 overflow-y-scroll">
        <p className="w-full my-4 font-primaryBold md:hidden">Dashboard</p>
        {/* Summary Cards */}
        <div className="w-full bg-white rounded-xl flex flex-col md:flex-row items-center md:justify-around p-4 gap-10">
          {/* 1 */}
          <div className="w-full min-w-[220px] h-[115px] border-l-2 border-l-[#E3140F] border-[0.22px] bg-white flex flex-col gap-4 rounded-lg p-3">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-10 h-10 rounded-full bg-[#E3140F1F] flex items-center justify-center">
                <img src={OutOfStock} width={18} height={18} />
              </div>
              <p className="text-[16px]">Out of stock</p>
            </div>
            <div className=" w-full flex flex-row items-center justify-between">
              <div className="flex flex-row  gap-[10px]">
                <b className="text-[18px]">0</b>
                <p className="text-[16px]">Products</p>
              </div>

              <Link
                to="/dashboard/myProducts"
                className="w-[73px] h-[31px] bg-[#F0F0F0] border-none outline-none flex flex-row items-center justify-center gap-[9px] rounded-[8px] p-[0px]"
              >
                <p className="text-xs">See all</p>{" "}
                <ChevronRightIcon width={15} height={15} />
              </Link>
            </div>
          </div>
          {/* 2 */}
          <div className="w-full min-w-[220px] h-[115px] border-l-2 border-l-[#359E52] border-[0.22px] bg-white flex flex-col gap-4 rounded-lg p-3">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-[100px] bg-[#8BCB9033] flex items-center justify-center">
                <img src={OrdersIcon} width={18} height={18} />
              </div>{" "}
              <p className="text-[16px]">Orders</p>
            </div>
            <div className=" w-full flex flex-row items-center justify-between">
              <div className="flex flex-row  gap-[10px]">
                <b className="text-[18px]">{recentOrders.length}</b>
                <p className="text-[16px]">Pending</p>
              </div>

              <Link
                to="/dashboard/allOrders"
                className="w-[73px] h-[31px] bg-[#F0F0F0] border-none outline-none flex flex-row items-center justify-center gap-[9px] rounded-[8px] p-[0px]"
              >
                <p className="text-xs">See all</p>{" "}
                <ChevronRightIcon width={15} height={15} />
              </Link>
            </div>
          </div>
          {/* 3 */}
          <div className="w-full min-w-[220px] h-[115px] border-l-2 border-l-[#F58634] border-[0.22px] bg-white flex flex-col gap-4 rounded-lg p-3">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-[100px] bg-[#E3140F1F] flex items-center justify-center">
                <img src={SalesIcon} width={20} height={20} />
              </div>{" "}
              <p className="text-[16px]">Total Sales</p>
            </div>
            <div className=" w-full flex flex-row items-center justify-between">
              <div className="flex flex-row  gap-[10px]">
                <b className="text-[18px]">₦ {totalSales}</b>
              </div>

              <button className="w-[73px] h-[31px] bg-[#F0F0F0] text-[#0F9E36] border-none outline-none flex flex-row items-center justify-center gap-[9px] rounded-[8px] p-[0px]">
                <p className="text-xs">+10%</p> <img src={UpArrow} width={10} />
              </button>
            </div>
          </div>
        </div>
        {/* Charts */}
        <div className="w-full flex flex-col md:flex-row flex-wrap justify-between mt-10 gap-10">
          <div className="w-full md:w-[50%] h-[411px] flex flex-col bg-white rounded-xl p-4">
            <Dropdown
              title={"TOTAL ORDERS"}
              data={[
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP",
                "OCT",
                "NOV",
                "DEC",
              ]}
              onChange={(wp) => console.log(wp)}
            />
            <br />
            <TotalOrdersChart />
          </div>

          <div className="w-full md:w-[42.5%] h-[411px] bg-white rounded-xl p-4">
            <Dropdown
              title={"REVENUE"}
              data={[
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP",
                "OCT",
                "NOV",
                "DEC",
              ]}
              onChange={(wp) => console.log(wp)}
            />
            <br />
            <RevenueChart />
          </div>
        </div>
        {/* Top Products Sold */}
        <div className="w-full flex flex-row flex-wrap justify-between mt-10">
          <div className="md:w-[50%] w-full h-[411px] flex flex-col bg-white rounded-xl p-4">
            <Dropdown
              title={"ORDER STATUS"}
              data={[]}
              // data={[
              //   "JAN",
              //   "FEB",
              //   "MAR",
              //   "APR",
              //   "MAY",
              //   "JUN",
              //   "JUL",
              //   "AUG",
              //   "SEP",
              //   "OCT",
              //   "NOV",
              //   "DEC",
              // ]}
              onChange={(wp) => console.log(wp)}
            />
            <OrderStatusChart />
          </div>

          <div className="md:w-[42.5%] w-full  h-[411px] overflow-y-scroll bg-white rounded-xl p-4 mt-10 gap-10 md:mt-0 no-scrollbar">
            <Dropdown
              title={"TOP PRODUCTS SOLD"}
              data={[
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP",
                "OCT",
                "NOV",
                "DEC",
              ]}
              onChange={(wp) => console.log(wp)}
            />

            {[
              {
                img: <img src={Apple} />,
                product: "Apples",
                type: "Grocery",
                price: "",
              },
              {
                img: <img src={Apple} />,
                product: "Apples",
                type: "Grocery",
                price: "",
              },
              {
                img: <img src={Apple} />,
                product: "Apples",
                type: "Grocery",
                price: "",
              },
              {
                img: <img src={Apple} />,
                product: "Apples",
                type: "Grocery",
                price: "",
              },
              {
                img: <img src={Apple} />,
                product: "Apples",
                type: "Grocery",
                price: "",
              },
            ].map((data, index) => {
              return (
                <div className="w-full h-[68px] mt-[10px] flex flex-row items-center justify-between border-b-[1px] border-[#CFCBCB] no-scrollbar">
                  <div className="w-[60px] h-[60px] border border-[#CFCBCB] flex items-center justify-center p-1">
                    {data.img}
                  </div>

                  <div className="w-[70%] flex flex-col justify-start gap-0 px-4">
                    <p className="text-[16px] text-black  ">{data.product}</p>
                    <p className="text-sm text-[#373435] ">{data.type}</p>
                  </div>
                  <p>$250</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Table */}
        <div className="w-full  min-h-[500px] bg-white rounded-md p-4 mt-10">
          <div className="w-full h-[56px] p-3 flex flex-row items-center justify-between border-[#C1C6C5] border-[0.66px]">
            <div className="w-[300px] flex flex-row justify-between items-center">
              <p className="text-[16px] font-[600]">RECENT ORDERS</p>

              <Link
                to="/dashboard/allOrders"
                className="w-[73px] h-[31px] bg-[#F0F0F0] border-none outline-none flex flex-row items-center justify-center gap-2 rounded-md p-0"
              >
                <p className="text-xs">See all</p>{" "}
                <ChevronRightIcon width={15} height={15} />
              </Link>
            </div>

            {/* <div className="w-[80%] max-w-[500px] h-[40px] bg-white p-[10px] hidden md:flex items-center rounded-[6px] border-[#CFCBCB] border-[0.66px] ">
              <input
                type="text"
                className="w-full  bg-none border-none h-[35px] outline-none  placeholder:text-xs placeholder:text-[#37343566]"
                placeholder="Search for products"
                onInput={(e) => {
                  setfilterKeyword(e.target.value);
                  searchForProducts(e.target.value);
                }}
              />
              <FiSearch width={16} height={16} color="#37343566" />
            </div> */}
          </div>
          {/* <div className="w-full h-[40px] mt-[10px] md:hidden bg-white p-[10px] flex items-center rounded-[6px] border-[#CFCBCB] border-[0.66px] ">
            <input
              type="text"
              className="w-full  bg-none border-none h-[35px] outline-none  placeholder:text-xs placeholder:text-[#37343566]"
              placeholder="Search for products"
            />
            <FiSearch width={16} height={16} color="#37343566" />
          </div> */}

          <div className="w-[350px] md:w-full min-h-[300px] overflow-x-scroll">
            <div className="flex flex-row items-center gap-4">
              <div className=" h-[56px] mt-[10px] p-[10px] flex flex-1 flex-row items-center md:justify-between bg-[#F1F4F2] border-[#C1C6C5]">
                <b className="flex-1 md:flex-none text-sm text-black  min-w-[150px] text-center">
                  Order ID
                </b>
                <b className="flex-1 md:flex-none text-sm text-black  min-w-[150px]">
                  Date
                </b>
                {/* <b className="text-sm text-black  min-w-[150px] text-center">
                  Customer name
                </b> */}
                <b className="flex-1 md:flex-none text-sm text-black  min-w-[150px] text-center">
                  Address
                </b>
                <b className="flex-1 md:flex-none text-sm text-black  min-w-[150px] text-center">
                  Order status
                </b>
                <b className="flex-1 md:flex-none text-sm text-black  min-w-[150px] text-center">
                  Items
                </b>
              </div>
            </div>
            {/* {[filterKeyword ? FilteredProducts : productsData][0].map( */}
            {paginatedProducts.map((data, index) => {
              return (
                <div className="flex flex-row items-center gap-4">
                  <div className="h-[56px] px-[10px] flex flex-1 flex-row items-center justify-between border-[#C1C6C5] border-[0.66px] mt-[10px]">
                    <p className="flex-1 md:flex-none text-xs text-black min-w-[150px] text-center">
                      {extractFiveDigits(data._id)}
                    </p>
                    <p className="flex-1 md:flex-none text-xs text-black min-w-[150px]">
                      {formatDate(data.created_at)}
                    </p>
                    {/* <p className="text-xs text-black min-w-[150px] text-center">
                     
                      {data?.userId?.firstName + " " + data?.userId?.lastName}
                    </p> */}
                    <p className="flex-1 md:flex-none text-xs text-black min-w-[150px] text-center">
                      {data.shippingAddress.street +
                        " " +
                        data.shippingAddress.city +
                        " " +
                        data.shippingAddress.state}
                    </p>
                    <div className="flex-1 md:flex-none text-sm text-black min-w-[150px] flex flex-row justify-center items-center gap-[10px]">
                      <div className="w-[8px] h-[8px] bg-[#E3140F] rounded-[100px]" />
                      <p className="text-xs">{data.order_status} Pending</p>
                    </div>
                    <p className="flex-1 md:flex-none text-xs text-black min-w-[150px] text-center">
                      {data.products.length}
                    </p>
                  </div>
                </div>
              );
            })}
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
