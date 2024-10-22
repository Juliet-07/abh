import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Sidebar from "./sidebar";
import { IoArrowBackOutline, IoPersonSharp } from "react-icons/io5";
import { FiCheck } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import Link from "next/link";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleLogout = () => {
    localStorage.removeItem("abhUserInfo");
    window.location.href = "/";
  };

  let viewToRender;
  viewToRender = (
    <>
      <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div
              onClick={() => handleTabClick(1)}
              className={`cursor-pointer text-sm md:text-base ${
                activeTab === 1
                  ? "text-green-600 font-medium"
                  : "text-[#C1C6C5]"
              }`}
            >
              Personal Info
            </div>
            <div
              onClick={() => handleTabClick(2)}
              className={`cursor-pointer text-sm md:text-base ${
                activeTab === 2
                  ? "text-green-600 font-medium"
                  : "text-[#C1C6C5]"
              }`}
            >
              Shipping Address
            </div>
          </div>

          {/* Progress Bar just below the tabs */}
          <div className="relative w-full">
            <div className="h-1 bg-[#C1C6C5]">
              <div
                className={`h-1 ${
                  activeTab === 1 ? "w-1/2 bg-green-600" : "w-full bg-green-600"
                } transition-all duration-300`}
              ></div>
            </div>
          </div>
        </div>

        <div
          className="font-primaryMedium cursor-pointer"
          // onClick={() => setShowPreview(true)}
        >
          Edit
        </div>
      </div>

      <div className="w-full py-4 md:py-10 2xl:py-20">
        {activeTab === 1 && <PersonalInfo />}
        {activeTab === 2 && <ShippingInfo />}
      </div>
    </>
  );

  return (
    <>
      {showPreview && (
        <div className="w-full h-[100vh] bg-[#000000a8] z-[10000] fixed top-0 left-0 flex items-center justify-center font-primaryMedium">
          {/* Modal Content */}
          <div className="w-[90%] max-w-[500px] bg-white rounded-[10px] p-6 shadow-md relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 text-red-500"
            >
              <HiXMark size={20} />
            </button>

            {/* Modal Title */}
            <h2 className="font-semibold text-center mb-4">Edit Profile</h2>

            {/* Form Content */}
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 md:space-x-4">
                {/* First Name Input */}
                <div className="flex-1">
                  <label className="block text-sm mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="First Name"
                    defaultValue="Roselyn"
                  />
                </div>
                {/* Last Name Input */}
                <div className="flex-1">
                  <label className="block text-sm mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Last Name"
                    defaultValue="Klein"
                  />
                </div>
              </div>
              {/* Email Input */}
              <div>
                <label className="block text-sm mb-2">Email</label>
                <div className="flex items-center justify-between">
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Email"
                    defaultValue="johndoe@gmail.com"
                  />
                  {/* <button className="text-green-600 text-sm">Change</button> */}
                </div>
              </div>
              {/* Phone Number Input */}
              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Phone Number"
                  defaultValue="0812331221"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <button className="bg-[#4CBD6B] text-white px-6 py-2 rounded font-primaryMedium">
                  Update
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="border border-[#CFCBCB] text-black px-6 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Sidebar>
        <div className="flex-grow p-3 md:px-6">
          {/* Profile Header */}
          <div className="w-full flex justify-between items-center bg-white border border-[#CFCBCB] rounded-xl mb-6 p-3 md:p-4">
            <Link
              href="/dashboard/home"
              className="flex items-center space-x-2 text-black font-primarySemibold"
            >
              <IoArrowBackOutline size={20} />
              <span className="mx-2">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 border border-red-600 px-4 py-2 rounded-md"
            >
              Log out
            </button>
          </div>

          {/* Profile Banner */}
          <div className="bg-gray-100 h-20 md:h-36 rounded-lg relative">
            <Image
              src="/profile-bg.svg"
              alt="Profile Banner"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Profile Picture */}
          <div className="relative flex justify-center mt-[-50px]">
            <div className="w-20 md:w-[120px] h-20 md:h-[120px] bg-white rounded-full border-2 border-[#8BCB90] flex items-center justify-center">
              <IoPersonSharp size={50} color="#8BCB90" />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-white px-4 py-2 rounded-md border border-[#C1C6C5]">
              Upload Photo
            </button>
          </div>

          {/* Profile Details */}
          <div className="mt-6">
            <div>{viewToRender}</div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Profile;

const PersonalInfo = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = () => {
      axios
        .get(`${apiURL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data, "User Info");
          setUserData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getUserData();
  }, []);
  return (
    <div>
      <div className="w-full bg-white p-3 rounded-xl shadow-md space-y-4">
        <div className="flex justify-between items-center text-sm md:text-base">
          <h3 className="font-medium text-gray-900">Name</h3>
          <span className="font-semibold text-gray-700">
            {userData.firstName + " " + userData.lastName}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm md:text-base">
          <h3 className="font-medium text-gray-900">Email</h3>
          <span className="font-semibold text-gray-700 text-ellipse text-xs md:text-base">
            {userData.email}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm md:text-base">
          <h3 className="font-medium text-gray-900">Phone</h3>
          <span className="font-semibold text-gray-700">
            {userData.phoneNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = () => {
  return (
    <div>
      <div className="w-full bg-white p-4 rounded-xl shadow-md space-y-4">
        <p>7 gbolahan street, Ikeja Lagos</p>
        <hr />
      </div>
    </div>
  );
};
