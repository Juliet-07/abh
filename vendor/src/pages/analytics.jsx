import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "../components/Dropdown";
import { RevenueChart, TotalOrdersChart } from "../components/Charts";
import { FiSearch } from "react-icons/fi";
import Strike from "../assets/strike.svg";
import UpArrow from "../assets/uparrow.svg";
import OrdersIcon from "../assets/orders_icon.svg";
import Cart from "../assets/cart.svg";

const Analytics = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("vendorToken");
  const [orders, setOrders] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(null);

  useEffect(() => {
    const getAllProducts = () => {
      axios
        .get(`${apiURL}/products/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          // console.log(response);
          setMyProducts(response.data.data.products);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    const getAllOrders = () => {
      axios
        .get(`${apiURL}/vendors-dashboard/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          // console.log(response.data.data.orders);
          setOrders(response.data.data.orders);
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
    getAllOrders();
    getAllProducts();
  }, []);
  return (
    <>
      <div className="w-full font-primaryRegular bg-red-00 overflow-y-scroll">
        <div className="w-full bg-white rounded-xl gap-10 flex flex-col md:flex-row items-center justify-around p-4">
          {/* 1 */}
          <div className="w-full min-w-[220px] h-[115px] border-l-2 border-l-[#1226D7] border-[0.22px] bg-white p-3 flex flex-col gap-4 rounded-lg">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-[100px] bg-[#1226D71F] flex items-center justify-center">
                <img src={Strike} width={18} height={18} />
              </div>{" "}
              <p className="text-[16px]">Total Sales</p>
            </div>
            <div className=" w-full flex flex-row items-center justify-center">
              <div className=" w-[80%] flex flex-row items-center justify-between">
                <div className="flex flex-row  gap-[10px]">
                  <b className="text-[18px]">₦ {totalSales}</b>
                </div>

                <button className="w-[73px] h-[31px] bg-none text-[#0F9E36] border-none outline-none flex flex-row items-center justify-center gap-[9px] rounded-[8px] p-[0px]">
                  <p className="text-[12px]">+10%</p>{" "}
                  <img src={UpArrow} width={10} />
                </button>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="w-full min-w-[220px] h-[115px] border-l-2 border-l-[#359E52] border-[0.22px] bg-white p-3 flex flex-col gap-4 rounded-lg">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-[100px] bg-[#1226D71F] flex items-center justify-center">
                <img src={OrdersIcon} width={18} height={18} />
              </div>{" "}
              <p className="text-[16px]">Total Orders</p>
            </div>
            <div className=" w-full flex flex-row items-center justify-center">
              <div className=" w-[80%] flex flex-row items-center justify-between">
                <div className="flex flex-row  gap-[10px]">
                  <b className="text-[18px]">{orders.length}</b>
                </div>

                <button className="w-[73px] h-[31px] bg-none text-[#0F9E36] border-none outline-none flex flex-row items-center justify-center gap-[9px] rounded-[8px] p-[0px]">
                  <p className="text-[12px]">+10%</p>{" "}
                  <img src={UpArrow} width={10} />
                </button>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="w-full min-w-[220px] h-[115px] border-l-2 border-l-[#079D9D] border-[0.22px] bg-white p-3 flex flex-col gap-4 rounded-lg">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-[100px] bg-[#079D9D1F] flex items-center justify-center">
                <img src={Cart} width={20} height={20} />
              </div>{" "}
              <p className="text-[16px]">Total Products</p>
            </div>
            <div className=" w-full flex flex-row items-center justify-center">
              <div className=" w-[80%] flex flex-row items-center justify-between">
                <div className="flex flex-row  gap-[10px]">
                  <b className="text-[18px]">{myProducts.length}</b>
                </div>

                <button className="w-[73px] h-[31px] bg-none text-[#0F9E36] border-none outline-none flex flex-row items-center justify-center gap-[9px] rounded-[8px] p-[0px]">
                  <p className="text-[12px]">+10%</p>{" "}
                  <img src={UpArrow} width={10} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="w-full flex flex-row flex-wrap justify-between mt-10">
          <div className="md:w-[50%] w-full h-[411px] flex flex-col bg-white rounded-xl p-4">
            <Dropdown
              title={"TOTAL ORDERS"}
              data={["january", "feb", "march"]}
              onChange={(wp) => console.log(wp)}
            />
            <br />
            <TotalOrdersChart />
          </div>

          <div className="md:w-[42.5%] w-full  h-[411px] bg-white rounded-xl p-4 mt-10 md:mt-0">
            <Dropdown
              title={"SALES"}
              data={["january", "feb", "march"]}
              onChange={(wp) => console.log(wp)}
            />
            <br />
            <RevenueChart />
          </div>
        </div>

        {/* Table */}
        <div className="w-[350px] md:w-full  min-h-[500px] bg-white rounded-[10px] p-4 mt-10">
          <div className="w-full h-[56px] p-[10px] flex flex-row items-center justify-between border-[#C1C6C5] border-[0.66px]">
            <div className="w-[300px] flex flex-row justify-between items-center">
              <p className="text-[16px] font-[600]">TOP SELLING PRODUCTS</p>
            </div>

            <div className="w-[80%] max-w-[500px] h-[40px] bg-white p-[10px] hidden md:flex items-center rounded-[6px] border-[#CFCBCB] border-[0.66px] ">
              <input
                type="text"
                className="w-full  bg-none border-none h-[35px] outline-none  placeholder:text-[12px] placeholder:text-[#37343566]"
                placeholder="Search for products"
              />
              <FiSearch width={16} height={16} color="#37343566" />
            </div>
          </div>
          <div className="w-full h-[40px] mt-[10px] md:hidden bg-white p-[10px] flex items-center rounded-[6px] border-[#CFCBCB] border-[0.66px] ">
            <input
              type="text"
              className="w-full  bg-none border-none h-[35px] outline-none  placeholder:text-[12px] placeholder:text-[#37343566]"
              placeholder="Search for products"
            />
            <FiSearch width={16} height={16} color="#37343566" />
          </div>
          <div className="w-full min-h-[300px] overflow-x-scroll">
            <div className="flex flex-row items-center gap-4">
              <div className=" h-[56px] mt-[10px] p-[10px] flex flex-1 flex-row items-center bg-[#F1F4F2] border-[#C1C6C5] md:justify-between">
                <b className="text-[14px] text-black  min-w-[164px] text-center">
                  Product Name
                </b>
                <b className="text-[14px] text-black  min-w-[164px] text-center">
                  Price
                </b>
                <b className="text-[14px] text-black  min-w-[164px] text-center">
                  Category
                </b>
                <b className="text-[14px] text-black  min-w-[164px] text-center">
                  Quantity
                </b>
                <b className="text-[14px] text-black  min-w-[164px] text-center">
                  Total amount
                </b>
              </div>
            </div>
            {[{}, {}, {}, {}, {}].map((data, index) => {
              return (
                <div className="flex flex-row items-center gap-4 ">
                  <div className="h-[56px] px-[10px] flex flex-row flex-1  items-center justify-between border-[#C1C6C5] border-[0.66px] mt-[10px]">
                    <p className="text-[14px] text-black min-w-[164px] text-center flex flex-row justify-center items-center gap-[10px]">
                      120381
                    </p>
                    <p className="text-[12px] text-black min-w-[164px] text-center flex flex-row justify-center items-center gap-[10px]">
                      $21
                    </p>
                    <p className="text-[12px] text-black min-w-[164px] text-center flex flex-row justify-center items-center gap-[10px]">
                      Fruits & vegetables
                    </p>
                    <p className="text-[12px] text-black min-w-[164px] text-center flex flex-row justify-center items-center gap-[10px]">
                      44
                    </p>
                    <div className="text-[14px] text-black min-w-[164px] flex flex-row justify-center items-center gap-[10px]">
                      <p className="text-[12px]">$4321</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
