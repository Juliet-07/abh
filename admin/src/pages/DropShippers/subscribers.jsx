import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const Subscribers = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [activeTab, setActiveTab] = useState("All");
  const [subscribersData, setSubscribersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  useEffect(() => {
    const getSubscribers = () => {
      axios
        .get(`${apiURL}/dashboard/subscribers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data, "Checking Subscibers");
          setSubscribersData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getSubscribers();
  }, []);

  const dailySubscribers = subscribersData.filter(
    (subscriber) => subscriber.plan === "DAILY"
  );
  const weeklySubscribers = subscribersData.filter(
    (subscriber) => subscriber.plan === "WEEKLY"
  );
  const monthlySubscribers = subscribersData.filter(
    (subscriber) => subscriber.plan === "MONTHLY"
  );

  const calculateTotalAmount = (subscribers) => {
    return subscribers.reduce(
      (total, subscriber) => total + Number(subscriber.amount),
      0
    );
  };

  const renderStatus = (status) => {
    const statusColor = status === "Active" ? "bg-green-500" : "bg-red-500";
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${statusColor} mr-2`} />
        <p>{status}</p>
      </div>
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(subscribersData.length / itemsPerPage);

  const paginatedTable = subscribersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold my-4">
        <p className=""> Subscribers</p>
        {/* <button className="bg-[#8BCB90]/[12%] text-[#359E52] p-2">
          Download
        </button> */}
      </div>
      {/* Filter Section */}
      {/* <div className="overflow-x-auto">
        <div className="flex gap-4 md:gap-10 my-4 md:my-6 font-primaryRegular min-w-[450px]">
          <button className="bg-[#F58634] text-white p-2 border border-[#969899]/[40%] text-xs md:text-sm rounded">
            Today
          </button>
          <button className="bg-gray-200 p-2 text-xs md:text-sm rounded">
            This week
          </button>
          <button className="bg-gray-200 p-2 text-xs md:text-sm rounded">
            This month
          </button>
          <button className="bg-gray-200 p-2 text-xs md:text-sm flex items-center rounded">
            <span>Customize date</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5v3M15.75 4.5v3M3 9.75h18M5.25 21h13.5a2.25 2.25 0 002.25-2.25V7.5A2.25 2.25 0 0018.75 5.25H5.25A2.25 2.25 0 003 7.5v11.25A2.25 2.25 0 005.25 21z"
              />
            </svg>
          </button>
        </div>
      </div> */}

      <div className="overflow-x-auto my-10 font-primaryRegular">
        <div className="grid grid-cols-4 gap-10 min-w-[800px]">
          <div className="w-full p-4 flex flex-col items-center justify-center gap-4 bg-white shadow border-t-2 border-t-[#359E52] text-[#359E52]">
            <p>Total Subscribers</p>
            <p className="text-xl font-semibold">
              ₦ {calculateTotalAmount(subscribersData).toFixed(2)}
            </p>
            <p>Total users: {subscribersData.length}</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4 p-4 bg-white shadow">
            <p>Daily Subscribers</p>
            <p className="text-xl font-semibold">
              ₦ {calculateTotalAmount(dailySubscribers).toFixed(2)}
            </p>
            <p>Total users: {dailySubscribers.length}</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4 p-4 bg-white shadow">
            <p>Weekly Subscribers</p>
            <p className="text-xl font-semibold">
              ₦ {calculateTotalAmount(weeklySubscribers).toFixed(2)}
            </p>
            <p>Total users: {weeklySubscribers.length}</p>
          </div>
          <div className="w-full p-4 flex flex-col items-center justify-center gap-4 bg-white shadow">
            <p>Monthly Subscribers</p>
            <p className="text-xl font-semibold">
              ₦ {calculateTotalAmount(monthlySubscribers).toFixed(2)}
            </p>
            <p>Total users: {monthlySubscribers.length}</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-3 min-w-[350px] overflow-x-auto font-primaryRegular">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F1F4F2] text-black text-sm text-left">
              <th className="p-4">Date</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Expiration date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTable.map((subscriber, index) => (
              <tr key={index} className="border-t text-xs">
                <td className="p-4">{formatDate(subscriber.created_at)}</td>
                <td className="p-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#096FA0] flex items-center justify-center text-white mr-2">
                    {subscriber?.userId?.firstName.charAt(0)}
                  </div>
                  {subscriber?.userId?.firstName +
                    " " +
                    subscriber?.userId?.lastName}
                </td>
                <td className="p-4">{subscriber.plan}</td>
                <td className="p-4">₦ {subscriber.amount}</td>
                <td className="p-4">{renderStatus(subscriber.status)}</td>
                <td className="p-4">{formatDate(subscriber.endDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </>
  );
};

export default Subscribers;
