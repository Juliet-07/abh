import React, { useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { FiSearch } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Discount = ({ pushEdit, pushAdd }) => {
  const productsData = [
    {
      id: "1565132",
      name: "Apples",
      type: "Fixed",
      sku: "123456",
      sold: "N/A",
      units: 34,
      price: "$230",
      status: "pending",
    },
    {
      id: "1565132",
      name: "Cup",
      type: "Percentage",
      sku: "123456",
      sold: "N/A",
      units: 25,
      price: "$230",
      status: "deleted",
    },
    {
      id: "1565132",
      name: "Mangoes",
      type: "Fixed",
      sku: "123456",
      sold: "55 Units",
      units: 10,
      price: "$230",
      status: "live",
    },
    {
      id: "1565132",
      name: "Bread",
      type: "Fixed",
      sku: "123456",
      sold: "N/A",
      units: 5,
      price: "$230",
      status: "pending",
    },
    {
      id: "1565132",
      name: "Apples",
      type: "Percentage",
      sku: "123456",
      sold: "55 Units",
      units: 11,
      price: "$230",
      status: "live",
    },
    {
      id: "1565132",
      name: "Bread",
      type: "Fixed",
      sku: "123456",
      sold: "N/A",
      units: 8,
      price: "$230",
      status: "deleted",
    },
    {
      id: "1565132",
      name: "Mangoes",
      type: "grocery",
      sku: "123456",
      sold: "55 Units",
      units: 11,
      price: "$230",
      status: "live",
    },
    {
      id: "1565132",
      name: "Mangoes",
      type: "grocery",
      sku: "123456",
      sold: "55 Units",
      units: 61,
      price: "$230",
      status: "live",
    },
    {
      id: "1565132",
      name: "Apples",
      type: "Percentage",
      sku: "123456",
      sold: "N/A",
      units: 22,
      price: "$230",
      status: "pending",
    },
  ];

  const [showPreview, setPreview] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [showPublish, setPublish] = useState(false);
  const [showRemoved, setRemoved] = useState(false);

  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [filterKeyword, setfilterKeyword] = useState("");

  const searchForProducts = (keyword) => {
    setFilteredProducts(
      productsData.filter((product, index) => {
        return (
          product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.type.toLowerCase().includes(keyword.toLowerCase()) ||
          product.status.toLowerCase().includes(keyword.toLowerCase())
        );
      })
    );
  };

  return (
    <>
      {showPublish && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-[100vh]  bg-[#000000a8] z-[10000] fixed top-0 left-0 flex flex-col items-center  justify-center"
        >
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white p-[40px] rounded-[10px] flex flex-col items-center  justify-center">
            <div className="w-[50px] h-[50px] rounded-[100px] border-[#08932E] border-[1px] flex flex-col items-center  justify-center">
              <CheckIcon width={30} height={30} color="#08932E" />
            </div>
            <br />
            <b>Product received</b>
            <p className="w-full text-center">
              Your product has been received and is We’ll notify you once it’s
              live
            </p>
            <br />
            <button
              onClick={() => setPublish(false)}
              className="w-[186px] h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showRemoved && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-[100vh]  bg-[#000000a8] z-[10000] fixed top-0 left-0 flex flex-col items-center  justify-center"
        >
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white p-[40px] rounded-[10px] flex flex-col items-center  justify-center">
            <div className="w-[50px] h-[50px] rounded-[100px] border-[#08932E] border-[1px] flex flex-col items-center  justify-center">
              <CheckIcon width={30} height={30} color="#08932E" />
            </div>
            <br />
            <b>Discount removed!!</b>

            <br />
            <button
              onClick={() => setRemoved(false)}
              className="w-[186px] h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showDelete && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-[100vh]  bg-[#000000a8] z-[100000] fixed top-0 left-0 flex flex-col items-center  justify-center"
        >
          <div className="w-[90%] max-w-[498px] h-[344px] relative bg-white p-[40px] rounded-[10px] flex flex-col items-center  justify-center">
            <XIcon
              width={20}
              height={20}
              onClick={() => setDelete(false)}
              color="red"
              className="absolute active:opacity-5 right-[20px] top-[20px] cursor-pointer"
            />
            <IoWarningOutline size={50} color="red" />
            <br />
            {/* <ChatAltIcon /> */}
            <p className="w-full text-center">Confirm deletion of discount</p>
            <br />

            <div className="flex flex-row gap-[10px]">
              <button
                onClick={() => {
                  setDelete(false);
                  setPreview(false);
                  setRemoved(true);
                }}
                className="w-[186px] h-[46px] rounded-[6px] bg-[red] text-white"
              >
                Yes, Delete
              </button>
              <button
                className="md:w-[186px] w-[99px]  h-[46px] bg-white text-[grey] border-[1px] rounded-[6px]"
                onClick={() => setDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-[100vh] justify-center z-[600000000] bg-[#000000a8] fixed top-0 left-0 flex flex-col items-center "
        >
          <div className="w-[90%] max-w-[562px] relative  bg-white rounded-[10px] p-[20px] md:p-[40px] my-[5vh]">
            <b className="text-[16px] w-full text-center flex justify-center">
              Discount Details
            </b>
            <XIcon
              width={20}
              height={20}
              className="absolute right-[20px] top-[20px] cursor-pointer active:opacity-5"
              color="red"
              onClick={() => setPreview(false)}
            />

            {/* <br /> */}

            <div className="flex flex-col gap-[20px]">
              <p>ID 123145</p>
              <div className="w-full flex flex-row">
                <b className="min-w-[130px] text-[16px]">Discount type - </b>{" "}
                <p>Fixed</p>
              </div>
              <div className="w-full flex flex-row">
                <b className="min-w-[130px] text-[16px]">Value</b> <p>100</p>
              </div>
              <div className="w-full flex flex-row">
                <b className="min-w-[130px] text-[16px]">Applies to - </b>{" "}
                <p>All Products</p>
              </div>

              <div className="w-full flex flex-row">
                <b className="min-w-[130px] text-[16px]">Period - </b>{" "}
                <p>june 11,2024- July 11, 2024</p>
              </div>
              <div className="w-full flex flex-row">
                <b className="min-w-[130px] text-[16px]">Status - </b>{" "}
                <div className="min-w-[66px] h-[35px] bg-[#088D2D1F] p-[10px] flex flex-row items-center justify-center gap-[10px]">
                  <div className="w-[8px] h-[8px] bg-[#088D2D] rounded-[100px]" />
                  <p className="text-[#088D2D] text-[12px]">Active</p>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="flex flex-row h-[1pc] items-center justify-center">
              <button
                onClick={() => {
                  // window.open("#edit", "_parent")
                  setPreview(false);
                  // pushEdit("id");
                }}
                className="md:w-[100px] w-[99px] opacity-[0.8]  h-[46px] bg-white text-[#373435] border-[1px] border-[#373435] rounded-[6px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full lex flex-col overflow-y-scroll">
        <div className="w-full min-h-[100vh]  flex flex-col gap-[20px] ">
          <div className="w-full sm:hidden flex flex-row items-center h-[30px] justify-start">
            Discount
          </div>

          <div className="w-full h-[50px] flex flex-row items-center justify-between flex-wrap gap-[20px]">
            <div className="w-[80%] max-w-[500px] h-[40px] bg-white p-[10px] flex items-center rounded-[6px] ">
              <input
                type="text"
                className="w-full  bg-none border-none outline-none  placeholder:text-[12px] placeholder:text-[#37343566]"
                placeholder="Search for products"
                onInput={(e) => {
                  setfilterKeyword(e.target.value);
                  searchForProducts(e.target.value);
                }}
              />
              <FiSearch width={16} height={16} color="#37343566" />
            </div>

            <div className="flex flex-row items-center gap-[10px]">
              <button
                onClick={() => pushAdd("id")}
                className="h-[36px] w-[122px] rounded-[6px] z-[500000] bg-none text-[14px] text-[#359E52] border-[1px] border-[#359E52]"
              >
                Add discount
              </button>
            </div>
          </div>

          <div className="w-full min-h-[100vh] overflow-x-scroll overflow-y-hidden px-[10px] bg-white mt-[20px] pb-[10px]">
            <div className="flex flex-row items-center gap-4">
              <div className="md:w-full h-[56px] mt-[10px] p-[10px] flex flex-row items-center justify-between bg-[#F1F4F2] border-[#C1C6C5]">
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  ID
                </b>
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Discount Type
                </b>

                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Value
                </b>
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Applies
                </b>
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Period
                </b>
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Status
                </b>
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Action
                </b>
              </div>
            </div>

            {[filterKeyword ? FilteredProducts : productsData][0].map(
              (data, index) => {
                return (
                  <div className="flex flex-row items-center gap-4">
                    <div
                      //   onClick={() => handleTabClick("order_details")}

                      className=" md:w-full  h-[56px] px-[10px] flex flex-row items-center justify-between border-[#C1C6C5] border-[0.66px] mt-[10px]"
                    >
                      <p className="text-[12px] text-black min-w-[150px] text-center">
                        01
                      </p>
                      <div className="text-[12px] text-black min-w-[150px] text-center">
                        <p>{data.type}</p>
                      </div>

                      <div className="text-[12px] text-black min-w-[150px] justify-center text-center flex flex-row items-center gap-2">
                        <p>100</p>
                      </div>
                      <p className="text-[12px] text-black min-w-[150px] text-center">
                        All products
                      </p>
                      <p className="text-[12px] text-black min-w-[150px] text-center">
                        1 month
                      </p>
                      <div className="text-[12px] text-black min-w-[150px] flex flex-row justify-center items-center">
                        {/* {data.status == "pending" && ( */}
                        <div className="min-w-[66px] h-[35px] bg-[#088D2D1F] p-[10px] flex flex-row items-center justify-center gap-[10px]">
                          <div className="w-[8px] h-[8px] bg-[#088D2D] rounded-[100px]" />
                          <p className="text-[#088D2D] text-[12px]">Active</p>
                        </div>
                        {/* )} */}
                      </div>
                      <div className="text-[12px] text-black min-w-[150px] text-center flex flex-row items-center justify-center gap-[5px]">
                        <div
                          onClick={() => pushEdit("id")}
                          className="w-[28px] h-[28px] border-[1px] cursor-pointer active:opacity-[0.2] rounded-[100px] flex items-center justify-center"
                        >
                          {" "}
                          <img
                            src="/vendor_assets/pencil.svg"
                            alt=""
                            width={15}
                            height={15}
                          />
                        </div>
                        <div
                          onClick={() => {
                            setPreview(!showPreview);
                          }}
                          className="w-[28px] h-[28px] border-[1px] cursor-pointer active:opacity-[0.2] rounded-[100px] flex items-center justify-center"
                        >
                          {" "}
                          <img
                            src="/vendor_assets/eye.svg"
                            alt=""
                            width={15}
                            height={15}
                          />
                        </div>

                        <div
                          onClick={() => {
                            setDelete(true);
                          }}
                          className="w-[28px] h-[28px] border-[1px] cursor-pointer active:opacity-[0.2] rounded-[100px] flex items-center justify-center"
                        >
                          {" "}
                          <img
                            src="/vendor_assets/trash.svg"
                            alt=""
                            width={15}
                            height={15}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            {!productsData[0] && (
              <div
                className={
                  "w-full flex items-center judttify-center mt-[10vh] flex-col flex-1"
                }
              >
                <p>Begin by discounting your products</p>
                <div
                  src=""
                  className="w-full h-[260px] mt-[20px] bg-[url(/vendor_assets/pana.png)] bg-center bg-no-repeat bg-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discount;
