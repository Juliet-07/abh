import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdCalendarMonth } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import BarchartComp from "../components/BarchartComp";
import LinechartComp from "../components/LineChartComp";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DonutComp from "../components/DonutChartComp";
import PieChartComp from "../components/PieChartComp";

const Analytics = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);

  const percentage = 66;

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
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
    const getAllVendors = () => {
      axios
        .get(`${apiURL}/vendors`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.items);
          setVendors(response.data.data.items);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllVendors();
    getCustomers();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col gap-[10px] font-primaryRegular">
        <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4">
          <p className="font-primaryBold md:text-xl">Analytics</p>
          <div className="flex items-center gap-4 text-gray-600">
            <p className="font-primaryRegular text-sm">{getCurrentDate()}</p>
            <MdCalendarMonth />
          </div>
        </div>
        <div className="w-full bg-white border border-[#CFCBCB] rounded-xl grid md:grid-cols-4 gap-6 p-4">
          <div className="min-w-[200px] h-[146px] rounded-2xl border border-l-2 border-l-[#08932E] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
            <p>Active Users</p>
            <div className="flex items-center gap-3">
              <p className="font-bold">{customers.length + vendors.length}</p>
              <p className="text-xs text-[#08932E]">+21.1%</p>
            </div>
            <Link
              to="/usersActivity/active"
              className="flex items-center gap-3 text-[#08932E]"
            >
              <p>See Activity</p>
              <IoIosArrowForward />
            </Link>
          </div>
          <div className="min-w-[200px] h-[146px] rounded-2xl border border-l-2 border-l-[#E74C3C] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
            <p>Inactive Users</p>
            <div className="flex items-center gap-3">
              <p className="font-bold">377</p>
              <p className="text-xs text-[#E74C3C]">-33.1%</p>
            </div>
            <Link
              to="/usersActivity/inactive"
              className="flex items-center gap-3 text-[#E74C3C]"
            >
              <p>See Activity</p>
              <IoIosArrowForward />
            </Link>
          </div>
          <div className="min-w-[200px] h-[146px] rounded-2xl border border-l-2 border-l-[#155793] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
            <p>Total Customers</p>
            <div className="flex items-center gap-3">
              <p className="font-bold">{customers.length}</p>
              <p className="text-xs text-[#155793]">+12.1%</p>
            </div>
            <Link
              to="/customers"
              className="flex items-center gap-3 text-[#155793]"
            >
              <p>See All</p>
              <IoIosArrowForward />
            </Link>
          </div>
          <div className="min-w-[200px] h-[146px] rounded-2xl border border-l-2 border-l-[#F58634] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
            <p>Total Vendors</p>
            <div className="flex items-center gap-3">
              <p className="font-bold">{vendors.length}</p>
              <p className="text-xs text-[#F58634]">+14.1%</p>
            </div>
            <Link
              to="/allVendors"
              className="flex items-center gap-3 text-[#F58634]"
            >
              <p>See All</p>
              <IoIosArrowForward />
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-[0.5rem] p-4 flex  md:h-[300px] flex-col border-[1px] border-[gainsboro]">
          <div className="flex md:flex-row flex-col flex-1">
            <div className="flex flex-col flex-[70]">
              <div className="flex flex-row flex-1 height-[400px] items-center gap-[10px]">
                <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="font-bold text-lg">User Engagements</p>
                    <p className="font-normal text-sm">
                      Conversion rate: 23.3%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[200px] w-full">
                <br />
                <div className="flex flex-row gap-[10px] flex-wrap">
                  <div className="flex flex-row gap-[10px]">
                    <div className="w-[60px] h-[45px] rounded-[8px] text-[14px] font-bold text-[green] text-bold flex items-center justify-center bg-green-100">
                      4.4k
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[16px]">Clicks</p>
                      <p className="text-[12px] text-grey">
                        +21.1% vs Last Month
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[10px]">
                    <div className="w-[60px] h-[45px] rounded-[8px] text-[14px] font-bold text-[green] text-bold flex items-center justify-center bg-green-100">
                      200
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[16px]">Clicks</p>
                      <p className="text-[12px] text-grey">
                        +21.1% vs Last Month
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[10px]">
                    <div className="w-[60px] h-[45px] rounded-[8px] text-[14px] font-bold text-[green] text-bold flex items-center justify-center bg-green-100">
                      6m.33s
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[16px]">Clicks</p>
                      <p className="text-[12px] text-grey">
                        +21.1% vs Last Month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[250px] flex flex-col flex-[30] px-[20px] md:border-l-[1px]">
              <p>Conversion rate by device</p>
              <br />
              <div className="w-full flex flex-row h-[150px] justify-between items-center">
                <div className="flex flex-col gap-4 items-center justify-center ">
                  <div className="flex flex-row gap-[15px]">
                    <div className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center bg-blue-100">
                      <img
                        src="/svgs/phone.svg"
                        width={15}
                        height={15}
                        alt=""
                      />
                    </div>
                    <p>Mobile</p>
                  </div>
                  <div style={{ width: 66, height: 66 }}>
                    <CircularProgressbar value={66} text="66%" />
                  </div>
                </div>
                <div className="flex flex-col  items-center justify-evenly">
                  <div className="h-[50px] w-[1px] bg-black" />
                  <p>vs</p>
                  <div className="h-[50px] w-[1px] bg-black" />
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex flex-row gap-[15px]">
                    <div className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center bg-pink-100">
                      <img
                        src="/svgs/desktop.svg"
                        width={15}
                        height={15}
                        alt=""
                      />
                    </div>
                    <p>Desktop</p>
                  </div>
                  <div style={{ width: 66, height: 66 }}>
                    <CircularProgressbar value={66} text="66%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[0.5rem] p-4 flex flex-col border-[1px] border-[gainsboro]">
          <div className="flex flex-row items-center gap-[10px]">
            <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-lg">Commission Earned</p>
            </div>
          </div>
          <LinechartComp />
        </div>

        <div className="bg-white rounded-[0.5rem] p-4 flex  md:h-[300px] flex-col border-[1px] border-[gainsboro]">
          <div className="flex md:flex-row flex-col flex-1">
            <div className="flex flex-col flex-[50]">
              <div className="flex flex-row flex-1 height-[400px] items-center gap-[10px]">
                <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="font-bold text-lg">Return and Refunds</p>
                    <p className="font-normal text-sm">
                      Conversion rate: 23.3%
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[200px] w-full">
                <br />
                {/* chart here */}
                <DonutComp />
              </div>
            </div>

            <div className="h-[250px] flex flex-col flex-[50] px-[20px] md:border-l-[1px]">
              <p className="font-bold">Product Performanace</p>
              <br />
              <PieChartComp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
