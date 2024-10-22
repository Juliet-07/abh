import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, XIcon } from "@heroicons/react/outline";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";

const Profile = () => {
  const [showPreview, setPreview] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {showPreview && (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#000000a8] fixed z-[100] top-0 left-0 flex flex-col items-center font-primaryRegular">
          <div className="w-[90%] max-w-[679px] relative bg-white rounded-[10px] p-5 my-[5vh]">
            <b className="text-[16px] w-full text-center flex justify-center">
              Edit Business Info
            </b>
            <XIcon
              width={20}
              height={20}
              className="absolute right-[20px] top-[20px] cursor-pointer active:opacity-5"
              color="red"
              onClick={() => setPreview(false)}
            />
            <div className="w-full flex flex-row flex-wrap min-h-1 gap-2 mt-4"></div>

            <p className="text-[16px] w-full">Shop Residing Country</p>
            <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
              <input
                type="text"
                name=""
                id=""
                style={{ outline: "none" }}
                className="flex w-full h-[35px] border-none"
              />
            </div>
            <br />
            <p className="text-[16px] w-full">Shop Address</p>
            <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
              <input
                type="text"
                name=""
                id=""
                style={{ outline: "none" }}
                className="flex w-full h-[35px] border-none"
              />
            </div>
            <br />
            <div className="md:flex md:flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">City</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">State</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="md:flex flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Business Phone Number</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Alternate Phone Number</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="md:flex flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Business Email</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Business Type</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">
                  National Identification Number
                </p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
            </div>

            <br />

            <div className="md:flex flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Tax Identification Number</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">CAC Registration Number</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>
            </div>

            <br />

            <div className="min-w-[235px] ">
              <p>Documents</p>
              <div className="w-[50%] h-[1px] bg-gray-600 my-[10px]" />
              <p>Upload CAC Certificate (optional) </p>
            </div>
            <br />
            <button className="bg-[#96989966] border-[#96989966] border-[1px] w-[125px] h-[40px]">
              No file
            </button>
            {/* </div> */}
            <br />
            <br />

            <div className="w-full flex items-center justify-between my-6">
              <div>
                <button
                  onClick={() => {
                    // window.open("#edit", "_parent")
                    setPreview(false);
                    pushEdit("id");
                  }}
                  className="md:w-[186px] w-[99px]  h-[46px] bg-[#4CBD6B] text-white rounded-[6px]"
                >
                  Edit
                </button>
              </div>

              <button
                onClick={() => {
                  setDelete(false);
                  setPreview(false);
                }}
                className="md:w-[186px] w-[99px]  h-[46px] bg-white text-[grey] border-[1px] rounded-[6px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="w-full flex items-center justify-between p-3 font-primaryRegular">
        <div className="flex flex-row gap-[10px] items-center ">
          <ArrowNarrowLeftIcon
            width={20}
            height={20}
            onClick={() => navigate("/dashboard/home")}
          />
          <p className="md:hidden">Profile</p>
          <p className="hidden md:block">Back</p>
        </div>
        <div className="w-[146px] h-10 bg-white border border-[#E3140F] text-[#E3140F] rounded-lg flex items-center justify-center">
          Delete account
        </div>
      </header>

      <div className="w-full flex flex-col overflow-y-scroll my-4 font-primaryRegular">
        <div className="w-full  flex flex-col gap-4">
          {/* User Bio Data */}
          <div className="w-full bg-[#8BCB901F] flex items-center justify-between rounded-[20px] p-3 md:py-4 md:px-6">
            <div className="flex items-center gap-4 md:gap-10">
              <div className="bg-[#CFCBCB] rounded-[100px] h-[100px] w-[100px] flex items-center justify-center">
                <UserIcon width={60} height={60} />
              </div>

              <div className="flex flex-col gap-3">
                <b className="text-sm md:text-base">Kayla Samson</b>
                <p className="text-sm md:text-base">kaylan@gmail.com</p>
                <p className="text-sm md:text-base">08123122311</p>
              </div>
            </div>

            <b className=" cursor-pointer " onClick={() => setPreview(true)}>
              Edit
            </b>
          </div>
          {/* User Other Details */}
          <div className="w-full rounded-[20px] bg-[#8BCB901F] p-3 md:p-8 flex flex-col md:flex-row items-start justify-evenly gap-4">
            <div className="w-full md:w-[400px] flex flex-col gap-4 md:gap-10">
              <div className="min-w-[235px] ">
                <p>Shop name</p>
                <div className="w-full h-[1px] bg-gray-600 mt-[10px]" />
                <div className="flex flex-row items-center mt-[10px] gap-[10px]">
                  <div className="bg-[#E38E0F] w-[30px] h-[30px] rounded-full text-white flex items-center justify-center">
                    <b>K</b>
                  </div>{" "}
                  <p>Kayla Ventures</p>
                </div>
              </div>
              <div className="min-w-[235px] ">
                <p>Bank Account Details</p>
                <div className="w-full h-[1px] bg-gray-600 mt-[10px]" />
                <div className="flex flex-col mt-[10px] gap-[10px]">
                  <p>No payment details</p>
                  <p className="text-red-500 mt-4 text-xs">
                    Add your payment account information
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[669px] md:px-[20px] border-l md:border-[grey] md:bg-white/20 py-3">
              <p className="text-[16px] w-full">Shop Residing Country</p>
              <div className="w-full h-10 border mt-[10px] bg-white border-[#CFCBCB] flex justify-between">
                <input
                  type="text"
                  name=""
                  id=""
                  style={{ outline: "none" }}
                  className="flex w-full h-[35px] border-none"
                />
              </div>
              <br />
              <p className="text-[16px] w-full">Shop Address</p>
              <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                <input
                  type="text"
                  name=""
                  id=""
                  style={{ outline: "none" }}
                  className="flex w-full h-[35px] border-none"
                />
              </div>
              <br />
              <div className="flex flex-row w-full gap-4">
                <div className="flex flex-col w-full">
                  <p className="text-[16px] w-full">City</p>
                  <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                    <input
                      type="text"
                      name=""
                      id=""
                      style={{ outline: "none" }}
                      className="flex w-full h-[35px] border-none"
                    />
                  </div>
                </div>
                <br />
                <div className="flex flex-col w-full">
                  <p className="text-[16px] w-full">State</p>
                  <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                    <input
                      type="text"
                      name=""
                      id=""
                      style={{ outline: "none" }}
                      className="flex w-full h-[35px] border-none"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="flex flex-row w-full gap-4">
                <div className="flex flex-col w-full">
                  <p className="text-[16px] w-full">Date of Birth</p>
                  <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                    <input
                      type="text"
                      name=""
                      id=""
                      style={{ outline: "none" }}
                      className="flex w-full h-[35px] border-none"
                    />
                  </div>
                </div>
                <br />
                <div className="flex flex-col w-full">
                  <p className="text-[16px] w-full">Business Type</p>
                  <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                    <input
                      type="text"
                      name=""
                      id=""
                      style={{ outline: "none" }}
                      className="flex w-full h-[35px] border-none"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="flex flex-row w-full gap-4">
                <div className="flex flex-col w-full">
                  <p className="text-[16px] w-full">
                    National Identification Number
                  </p>
                  <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                    <input
                      type="text"
                      name=""
                      id=""
                      style={{ outline: "none" }}
                      className="flex w-full h-[35px] border-none"
                    />
                  </div>
                </div>
                <br />
                <div className="flex flex-col w-full">
                  <p className="text-[16px] w-full">
                    Tax Identification Number
                  </p>
                  <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                    <input
                      type="text"
                      name=""
                      id=""
                      style={{ outline: "none" }}
                      className="flex w-full h-[35px] border-none"
                    />
                  </div>
                </div>
              </div>

              <br />

              <div className="flex flex-col w-[50%]">
                <p className="text-[16px] w-full">Tax Identification Number</p>
                <div className="w-full h-[40px] border-[1px] mt-[10px] bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full h-[35px] border-none"
                  />
                </div>
              </div>

              <br />

              <div className="min-w-[235px] ">
                <p>Documents</p>
                <div className="w-[50%] h-[1px] bg-gray-600 my-[10px]" />
                <p>CAC Certificate </p>
              </div>
              <br />
              <button className="bg-[#96989966] border-[#96989966] border-[1px] w-[125px] h-[40px]">
                No file
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
