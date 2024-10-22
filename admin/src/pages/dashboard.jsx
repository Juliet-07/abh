import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginatedTable from "../components/paginatedTables";
import BarchartComp from "../components/BarchartComp";
import DashSlider from "../components/DashSlider";
import LowStockPaginatedTable from "../components/LowstockTable";
import ReportsPaginatedTable from "../components/ReportsTable";
import { EyeIcon } from "@heroicons/react/solid";
import StatusComponent from "../components/StatusComp";
import { FcCancel } from "react-icons/fc";
import { GrCompliance } from "react-icons/gr";

const Dashboard = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [recentOrderInput, setROI] = useState("");
  const [LowStockInput, setLSI] = useState("");
  const [TopTenInput, setTopTenInput] = useState("");
  const [OrderStatus, setOrderStatus] = useState("weekly");
  const [RecentTransactionInput, setRecentTransactionInput] = useState("");
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getAllVendors = () => {
      axios
        .get(`${apiURL}/vendors`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          // console.log(response.data.data.data);
          console.log(response.data.data.items);
          setVendors(response.data.data.items);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };
    const getCustomers = () => {
      axios
        .get(`${apiURL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setCustomers(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllVendors();
    getCustomers();
  }, []);
  return (
    <div className="w-full flex flex-col gap-10 font-primaryRegular">
      {/* App Summary */}
      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <p className="font-bold text-lg">Summary</p>
        </div>

        <div className="grid md:grid-cols-4 gap-10 mt-6 mb-2">
          <div className="min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-[teal] p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-37.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm"> Revenue</p>
              <b>₦1,800</b>
            </div>
          </div>
          <div className="min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-indigo-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-38.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm"> Orders</p>
              <b>200</b>
            </div>
          </div>
          <div className="min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-purple-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-40.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm"> Vendors</p>
              <b>{vendors.length}</b>
            </div>
          </div>
          <div className="min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-pink-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-41.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm"> Customers</p>
              <b>{customers.length}</b>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">
        <div className="flex flex-row w-full items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
            <p className="font-bold text-lg">Order status</p>
            <div className="flex flex-1 flex-row rounded-[40px] p-1 bg-[ghostwhite] h-[40px] py-4 items-center justify-between max-w-[250px]">
              {["Today", "Weekly", "Monthly", "Yearly"].map((status, index) => {
                return (
                  <div
                    onClick={() => setOrderStatus(status)}
                    style={
                      status == OrderStatus
                        ? { background: "#009f7f3d", color: "teal" }
                        : {}
                    }
                    className="flex-row rounded-[50px]  p-1 px-2 text-black text-sm cursor-pointer active:opacity-[0.5]"
                  >
                    {status}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-10 mt-6 mb-2">
          <div className="min-w-[220px] h-[120px] border rounded-lg border-b-4 border-b-red-600 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-39.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Pending Order</p>
              <b className="text-2xl">100</b>
            </div>
          </div>
          <div className="min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-blue-600 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-42.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Processing Order</p>
              <b className="text-2xl">0</b>
            </div>
          </div>
          <div className="min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-green-600 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <GrCompliance size={30} className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Completed Order</p>
              <b className="text-2xl">0</b>
            </div>
          </div>
          <div className="min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-black p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <FcCancel size={30} className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Cancelled Order</p>
              <b className="text-2xl">0</b>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-bold text-lg">Recent Orders</p>

            <div></div>
          </div>
        </div>
        <PaginatedTable
          tableHead={[
            "ID",
            "Customer",
            "Products",
            "Order Date",
            "Total",
            "Status",
            "Actions",
          ]}
          tableData={[
            { customer_name: "john doe", status: "shipped" },
            { customer_name: "micheal abel", status: "shipped" },
            { customer_name: "newton", status: "pending" },
            { customer_name: "john doe", status: "pending" },
            { customer_name: "john doe", status: "shipped" },
            { customer_name: "mary", status: "shipped" },
          ]}
          maxItems={4}
          searchText={recentOrderInput}
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-bold text-lg">Sale History</p>
          </div>
        </div>
        <BarchartComp />
      </div>
      {/* Top Products */}
      {/* <div className="w-full flex xl:flex-row xl:justify-between flex-col gap-4 ">
        <div className="bg-white rounded-[0.5rem] p-4 flex flex-col flex-[45] min-h-[500px] items-center">
          <div className="flex flex-row items-center gap-[10px] w-full">
            <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-lg">Top 10 Most Rated Products</p>
            </div>
          </div>
          <DashSlider />
        </div>

        <div className="bg-white rounded-[0.5rem] p-4 flex flex-col flex-[45] min-h-[500px]">
          <div className="flex flex-row items-center gap-[10px]">
            <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-lg">Popular Products</p>
            </div>
          </div>

          <div className="w-full flex flex-1 mt-4 overflow-y-scroll max-h-[500px]  flex-col gap-[20px] slick-scrollbar">
            {["", "", "", "", "", "", "", "", "", ""].map((product, index) => {
              return (
                <div className="w-full h-[50px] flex flex-row justify-between">
                  <div className="flex flex-row gap-4">
                    <div
                      className="w-[50px] h-[50px]
            bg-[url(/BrusselsSprouts.webp)]
            bg-no-repeat bg-center bg-contain
             border-[0.8px] border-[gainsboro] rounded-[10px]"
                    />
                    <div>
                      <b>BrusselsSprouts</b>
                      <p>Grocery</p>
                    </div>
                  </div>

                  <b>$3.00</b>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col ">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full flex-wrap">
            <p className="font-bold text-lg">Low stock products</p>

            <div className="flex flex-1 max-w-[250px] h-[40px] rounded-[4px] gap-2 border-[1px] border-[gainsboro] p-3 items-center justify-center">
              <div className="min-w-[25px] h-[25px] bg-[url(/svgs/svgexport-1.svg)] bg-no-repeat bg-center bg-contain" />
              <input
                type="text"
                placeholder="Search by name"
                onInput={(e) => setLSI(e.target.value)}
                className="flex flex-1 outline-none border-none text-[16px]"
              />
            </div>
          </div>
        </div>
        <LowStockPaginatedTable
          tableHead={[
            "ID",
            "Product",
            "SKU",
            "Group",
            "Shop",
            "Price/Unit",
            "Stock Status",
            "Quantity",
          ]}
          tableData={[
            { product_name: "Samusung SoundPal S8 Mini B", status: "shipped" },
            { product_name: "JuBL Charge 5", status: "shipped" },
            { product_name: "carrot", status: "pending" },
            { product_name: "carbage", status: "pending" },
            { product_name: "beer", status: "shipped" },
            { product_name: "rice", status: "shipped" },
          ]}
          maxItems={4}
          searchText={LowStockInput}
        />
      </div>

      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full flex-wrap">
            <p className="font-bold text-lg">
              Top 10 Category with most products
            </p>

            <div className="flex flex-1 max-w-[250px] h-[40px] rounded-[4px] gap-2 border-[1px] border-[gainsboro] p-3 items-center justify-center">
              <div className="min-w-[25px] h-[25px] bg-[url(/svgs/svgexport-1.svg)] bg-no-repeat bg-center bg-contain" />
              <input
                type="text"
                placeholder="Search by name"
                onInput={(e) => setTopTenInput(e.target.value)}
                className="flex flex-1 outline-none border-none text-[16px]"
              />
            </div>
          </div>
        </div>
        <ReportsPaginatedTable
          tableHead={["Category ID", "Category Name", "Shop", "Product Count"]}
          // the data below is inserted as
          // if this dummy data array [{}, {}]
          // have this array contains [{id: "21351", name: "sample"}, {id: "21351", name: "sample2"}]
          // when it is mapped here for the first item in the array
          // dataFromAPI.map((items, index) => {
          // return [ items.id, items.name] - this what will be rendered
          // let me know if you don't understand :)

          tableData={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map(
            (items, index) => {
              return ["#ID: 7", "Snacks", "Grocery Shop", "73"];
            }
          )}
          maxItems={10}
          searchText={TopTenInput}
        />
      </div>

      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full flex-wrap">
            <p className="font-bold text-lg">Recent Withdrawals</p>

            <div className="flex flex-1 max-w-[250px] h-[40px] rounded-[4px] gap-2 border-[1px] border-[gainsboro] p-3 items-center justify-center">
              <div className="min-w-[25px] h-[25px] bg-[url(/svgs/svgexport-1.svg)] bg-no-repeat bg-center bg-contain" />
              <input
                type="text"
                placeholder="Search by shop"
                onInput={(e) => setRecentTransactionInput(e.target.value)}
                className="flex flex-1 outline-none border-none text-[16px]"
              />
            </div>
          </div>
        </div>
        <ReportsPaginatedTable
          tableHead={[
            "Shop ID",
            "Shop",
            "Amount",
            "Created",
            "Payment Method",
            "Status",
            "Actions",
          ]}
          // the data below is inserted as
          // if this dummy data array [{}, {}]
          // have this array contains [{id: "21351", name: "sample"}, {id: "21351", name: "sample2"}]
          // when it is mapped here for the first item in the array
          // dataFromAPI.map((items, index) => {
          // return [ items.id, items.name] - this what will be rendered
          // let me know if you don't understand :)

          tableData={[{}, {}].map((items, index) => {
            return [
              "0270273",
              "12351235",
              "200",
              "$21",
              "22",
              "58",
              <div className="flex flex-row justify-center text-[13px]">
                <img
                  src="/svgs/svgexport-44.svg"
                  alt=""
                  className="w-4 h-4 active:opacity-[0.5] cursor-pointer"
                />
              </div>,
            ];
          })}
          maxItems={4}
          searchText={RecentTransactionInput}
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
