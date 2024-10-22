import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { FiSearch } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Apple from "../../assets/apple.png";
import EditPen from "../../assets/pencil.svg";
import DeleteCan from "../../assets/trash.svg";

const DraftProducts = ({ pushEdit, pushAdd }) => {
  const navigate = useNavigate();
  const CustomSlider = ({ settings }) => {
    return (
      <div className="slider-container p-[20px] bg-none">
        <Slider {...settings}>
          <div
            className="max-w-[73px] border-[1px] min-h-[55px] bg-contain  mr-5 bg-[url(/vendor_assets/apple.png)]"
            style={{
              background: "url(/vendor_assets/apple.png) center no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="max-w-[73px] border-[1px] min-h-[55px] bg-contain  bg-[url(/vendor_assets/apple.png)]"
            style={{
              background: "url(/vendor_assets/apple.png) center no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="max-w-[73px] border-[1px] min-h-[55px]  bg-center bg-[url(/vendor_assets/apple.png)] "
            style={{
              background: "url(/vendor_assets/apple.png) center no-repeat ",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="max-w-[73px] border-[1px] min-h-[55px] bg-contain  bg-[url(/vendor_assets/apple.png)]"
            style={{
              background: "url(/vendor_assets/apple.png) center no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </Slider>
      </div>
    );
  };

  const productsData = [
    {
      id: "1565132",
      name: "Apples",
      type: "grocery",
      sku: "123456",
      sold: "N/A",
      units: 34,
      price: "$230",
      status: "pending",
    },
    {
      id: "1565132",
      name: "Cup",
      type: "Merch",
      sku: "123456",
      sold: "N/A",
      units: 25,
      price: "$230",
      status: "deleted",
    },
    {
      id: "1565132",
      name: "Mangoes",
      type: "grocery",
      sku: "123456",
      sold: "55 Units",
      units: 10,
      price: "$230",
      status: "live",
    },
    {
      id: "1565132",
      name: "Bread",
      type: "grocery",
      sku: "123456",
      sold: "N/A",
      units: 5,
      price: "$230",
      status: "pending",
    },
    {
      id: "1565132",
      name: "Apples",
      type: "grocery",
      sku: "123456",
      sold: "55 Units",
      units: 11,
      price: "$230",
      status: "live",
    },
    {
      id: "1565132",
      name: "Bread",
      type: "grocery",
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
      type: "grocery",
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
            <b>Product removed!</b>

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
            <p className="w-full text-center">
              By deleting this product, it will no longer beavailable in the
              marketplace.
            </p>
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
          className="w-full h-[100vh] overflow-y-scroll z-[20000000] bg-[#000000a8] fixed top-0 left-0 flex flex-col items-center "
        >
          <div className="w-[90%] max-w-[882px] relative  bg-white rounded-[10px] p-[20px] md:p-[40px] my-[5vh]">
            <b className="text-[16px] w-full text-center flex justify-center">
              Product Details
            </b>
            <XIcon
              width={20}
              height={20}
              className="absolute right-[20px] top-[20px] cursor-pointer active:opacity-5"
              color="red"
              onClick={() => setPreview(false)}
            />
            <div className="w-full flex flex-row flex-wrap mt-[20px] min-h-1 gap-2">
              <div className="w-full min-w-[300px] min-h-[200px] flex flex-[45] flex-col">
                <p>ID 123145</p>
                <br />
                <div
                  className="w-full h-[198px] bg-contain"
                  style={{
                    background:
                      "url(/vendor_assets/apple.png) center no-repeat",
                    backgroundSize: "contain",
                  }}
                ></div>
                <br />
                <CustomSlider settings={settings} />
              </div>
              <div className="w-full min-w-[300px] flex flex-[55] flex-col">
                <br />
                <br />
                <b>Mint</b>
                <p>Grocery</p>
                {/* <br className="h-[1px]" /> */}
                <div className="flex flex-row gap-[10px]">
                  <b>SKU</b> <p>2122</p>
                </div>
                <br />
                <p>
                  Most fresh vegetables are low in calories and have a water
                  content in excess of 70 percent, with only about 3.5 percent
                  protein and less than 1 percent fat. ... The root vegetables
                  include beets, carrots, radishes, sweet potatoes, and turnips.
                  Stem vegetables include asparagus and kohlrabi.
                </p>
                <br />
                <b>$289</b>
                <br />
                <div className="flex flex-row gap-[10px] ">
                  <b>Quality</b> <p>34 Units</p>
                </div>
                <br />
                <div className="text-[12px] text-black min-w-[150px] text-center flex flex-row items-center gap-2">
                  <p>34 Units</p>
                  <div className="min-w-[66px] h-[35px] bg-[#CFCBCB] p-[10px] flex flex-row items-center justify-center gap-[10px]">
                    <div className="w-[8px] h-[8px] bg-[#373435] rounded-[100px]" />
                    <p className="text-[#373435] text-[12px]">draft</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <br /> */}
            <br />
            <div className="flex flex-row h-[1pc] items-center justify-between">
              <div className="flex flex-row gap-[10px]">
                <button
                  onClick={() => {
                    setDelete(false);
                    setPreview(false);
                  }}
                  className="md:w-[150px] w-[99px]  h-[46px] bg-[#4CBD6B] text-white rounded-[6px]"
                >
                  Publish
                </button>
                <button
                  onClick={() => {
                    setDelete(true);
                    setPreview(false);
                  }}
                  className="md:w-[150px] w-[99px]  h-[46px] bg-[#E3140F] text-white rounded-[6px]"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() => {
                  // window.open("#edit", "_parent")
                  setPreview(false);
                  pushEdit("id");
                }}
                className="md:w-[100px] w-[99px] opacity-[0.8]  h-[46px] bg-white text-[#373435] border-[1px] border-[#373435] rounded-[6px]"
              >
                Edit
              </button>
            </div>
            <br />
            <br />
          </div>
        </div>
      )}

      <div className="w-full flex flex-col overflow-y-scroll">
        <div className="w-full min-h-[100vh]  flex flex-col">
          <div className="w-full h-[50px] flex flex-col md:flex-row md:items-center justify-between gap-4 font-primaryRegular">
            <div className="hidden md:w-[80%] md:max-w-[500px] h-10 bg-white p-3 md:flex items-center rounded-md">
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
                onClick={() => navigate("/dashboard/bulkUpload")}
                className="h-[36px] w-[143px] rounded-[6px] bg-[#F58634] text-[14px] text-white"
              >
                Bulk upload
              </button>
              <button
                onClick={() => navigate("/dashboard/addProducts")}
                className="h-[36px] w-[122px] rounded-[6px] bg-none text-[14px] text-[#359E52] border-[1px] border-[#359E52]"
              >
                Add product
              </button>
            </div>
          </div>

          <div className="md:hidden flex flex-row flex-wrap-reverse gap-[20px] justify-between">
            <p className="font-primaryBold text-[16px]">
              Total drafted products ({productsData.length})
            </p>
          </div>
          {/* <br className="md:hidden" /> */}

          <div className="w-full min-h-[100vh] overflow-x-scroll overflow-y-hidden px-3 bg-white my-5 font-primaryRegular">
            <br />
            {/* <div className="w-full gap-4 flex items-center flex-row">
              <input
                type="checkbox"
                color="#359E52"
                className="active:outline-[#359E52]"
                name=""
                id=""
              />
              <button className="h-[36px] w-[143px] rounded-[6px] bg-[#359E52] text-[14px] text-white">
                Publish
              </button>
            </div> */}

            <div className="flex flex-row items-center gap-4">
              <div className="md:w-full h-[56px] mt-[10px] p-[10px] flex flex-row items-center justify-between bg-[#F1F4F2] border-[#C1C6C5]">
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  ID
                </b>
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Product
                </b>

                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Quantity
                </b>
                <b className="text-[14px] text-black  min-w-[150px] text-center">
                  Price
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
                    {/* <input
                      type="checkbox"
                      color="#359E52"
                      className="active:outline-[#359E52]"
                      name=""
                      id=""
                    /> */}

                    <div className=" md:w-full  h-[56px] px-[10px] flex flex-row items-center justify-between border-[#C1C6C5] border-[0.66px] mt-[10px]">
                      <p className="text-[12px] text-black min-w-[150px] text-center">
                        120381
                      </p>
                      <div className="text-[12px] text-black min-w-[150px] text-center">
                        <div className="flex flex-row items-center gap-2">
                          <img src={Apple} alt="" width={50} height={50} />
                          <div
                            className="flex flex-col justify-start h-[40px] active:opacity-5 cursor-pointer"
                            onClick={() => setPreview(true)}
                          >
                            <b className="">{data.name}</b>
                            <p className="">{data.type}</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-[12px] text-black min-w-[150px] justify-center text-center flex flex-row items-center gap-2">
                        <p>{data.units} Units</p>
                      </div>
                      <p className="text-[12px] text-black min-w-[150px] text-center">
                        {data.price}
                      </p>
                      <div className="text-[12px] text-black min-w-[150px] flex flex-row justify-center items-center">
                        {/* {data.status == "pending" && ( */}
                        <div className="min-w-[66px] h-[35px] bg-[#CFCBCB] p-[10px] flex flex-row items-center justify-center gap-[10px]">
                          <div className="w-[8px] h-[8px] bg-[#373435] rounded-[100px]" />
                          <p className="text-[#373435] text-[12px]">Draft</p>
                        </div>
                        {/* )} */}
                      </div>
                      <div className="min-w-[150px] flex items-center justify-center gap-3">
                        <div
                          onClick={() => pushEdit("id")}
                          className="w-[28px] h-[28px] border-[1px] cursor-pointer active:opacity-[0.2] rounded-[100px] flex items-center justify-center"
                        >
                          <img src={EditPen} alt="" width={15} height={15} />
                        </div>

                        <div
                          onClick={() => {
                            setDelete(true);
                          }}
                          className="w-[28px] h-[28px] border-[1px] cursor-pointer active:opacity-[0.2] rounded-[100px] flex items-center justify-center"
                        >
                          <img src={DeleteCan} alt="" width={15} height={15} />
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
                  "w-full flex items-center judttify-center mt-[10vh] flex-1"
                }
              >
                <div
                  src=""
                  className="w-full h-[260px] bg-[url(/vendor_assets/noDiscount.png)] bg-center bg-no-repeat bg-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DraftProducts;
