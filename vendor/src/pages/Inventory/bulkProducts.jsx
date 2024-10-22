import React, { useState, useCallback } from "react";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import Categories from "../../components/Categories";

const BulkUpload = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [activeTab, setActiveTab] = useState("wholesale");

  const handleCategoryInfo = useCallback((data) => {
    console.log({ data });
    setCategoryId(data.value);
  }, []);

  const [bulkArray, setbulkArray] = useState([
    {
      // id: Math.random(new Range(1, 2000)),
      productName: "",
      ProductDescription: "",
      Quantity_in_Units_or_Carton: "",
      Categories: "",
      Size: "",
      Manufacturer: "",
      Price_in_Naira_or_Dollar: "",
    },
  ]);

  const addBulk = () => {
    setbulkArray((prev) => [
      ...prev,
      {
        // id: Math.random(new Range(1, 2000)),
        productName: "",
        ProductDescription: "",
        Quantity_in_Units_or_Carton: "",
        Categories: "",
        Size: "",
        Manufacturer: "",
        Price_in_Naira_or_Dollar: "",
      },
    ]);
  };

  const InputBulk = (id, field, input) => {
    // setbulkArray((prev)=> [
    //   ...prev, {id, id, [field]: input,}
    // ]);
    // console.log(bulkArray)
  };

  const renderForm = () => {
    switch (activeTab) {
      case "wholesale":
        return <WholesaleForm />;
      case "retail":
        return <RetailForm />;
      default:
        return null;
    }
  };

  const WholesaleForm = () => (
    <>
      <div className="bg-white p-2 md:p-3 my-10">
        <div className="w-full min-h-[300px] overflow-auto">
          <div className="flex flex-row items-center gap-4">
            <div className=" h-[56px] mt-[10px] p-[10px] flex flex-1 flex-row items-center md:justify-between bg-[#F1F4F2] border-[#C1C6C5]">
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Product Name
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Category
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Sub Category
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Quantity in Carton
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Units per carton
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Size
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Color
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Brand or Manufacturer
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Product Description
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Price in Naira or Dollar
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Image
              </b>
            </div>
          </div>
          {bulkArray.map((data, index) => {
            return (
              <div className="flex flex-row items-center gap-10 ">
                <div className="h-[70px] p-3 bg-[#F1F4F2] flex flex-1 flex-row items-center justify-between border-[#F1F4F2] border mt-[10px]">
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder="Input here"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <Categories
                      onForm={handleCategoryInfo}
                      className={`w-[120px]`}
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <Categories
                      onForm={handleCategoryInfo}
                      className={`w-[120px]`}
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[14px] text-black min-w-[164px] flex flex-row justify-center items-center gap-[10px]">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" image "
                      className="border-[1px] border-[#F1F4F2] h-[60px] w-[100px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>trash can</div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-[100px] flex items-center flex-row">
          <button
            onClick={() => addBulk()}
            className="w-[103px] h-[46px] p-0 flex items-center justify-center gap-2 text-white bg-[#4CBD6B] rounded-[6px]"
          >
            <PlusIcon width={16} height={16} /> ADD
          </button>
        </div>
      </div>
    </>
  );

  const RetailForm = () => (
    <>
      <div className="bg-white p-2 md:p-3 my-10">
        <div className="w-full min-h-[300px] overflow-auto">
          <div className="flex flex-row items-center gap-4">
            <div className=" h-[56px] mt-[10px] p-[10px] flex flex-1 flex-row items-center md:justify-between bg-[#F1F4F2] border-[#C1C6C5]">
              {/* <b className="text-[14px] text-black  min-w-[164px] text-center">
                ID
              </b> */}
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Product Name
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Product Description
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Quantity in Units or Carton
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Categories
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Size
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Manufacturer
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Price in Naira or Dollar
              </b>
              <b className="text-[14px] text-black  min-w-[164px] text-center">
                Image
              </b>
            </div>
          </div>
          {bulkArray.map((data, index) => {
            return (
              <div className="flex flex-row items-center gap-4 ">
                <div className="h-[70px] px-[10px] flex flex-1 flex-row items-center justify-between border-[#F1F4F2] border mt-[10px]">
                  {/* <p className="text-[14px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="border-[1px] border-[#F1F4F2] h-[60px] w-[100px]"
                    />
                  </p> */}
                  <p className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                      className="border-[1px] border-[#F1F4F2] h-[60px] w-[100px]"
                    />
                  </p>
                  <p className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                      className="border-[1px] border-[#F1F4F2] h-[60px] w-[100px]"
                    />
                  </p>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[14px] text-black min-w-[164px] flex flex-row justify-center items-center gap-[10px]">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="border-[1px] border-[#F1F4F2] h-[60px] w-[100px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" input here"
                      className="p-2 border border-[#F1F4F2] w-[120px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </div>
                  <p className="text-[12px] text-black min-w-[164px] text-center">
                    <input
                      type="text"
                      placeholder=" image "
                      className="border-[1px] border-[#F1F4F2] h-[60px] w-[100px]"
                      onInput={(e) =>
                        InputBulk(data.id, "productName", e.target.value)
                      }
                    />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-[100px] flex items-center flex-row">
          <button
            onClick={() => addBulk()}
            className="w-[103px] h-[46px] p-0 flex items-center justify-center gap-2 text-white bg-[#4CBD6B] rounded-[6px]"
          >
            <PlusIcon width={16} height={16} /> ADD
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="font-primaryRegular bg-[#F1F4F2] min-h-[100vh]">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between px-5">
        <div className="flex items-center">
          <div
            className="flex items-center gap-4 active:opacity-5"
            onClick={() => {
              navigate("/dashboard/myProducts");
            }}
          >
            <ArrowLeftIcon width={20} height={20} /> <p>Bulk Upload</p>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4 md:my-0">
          <button className="w-[122px] md:w-[148px] h-[36px] md:h-[46px] rounded-md border border-[#CFCBCB] text-grey-400">
            Save as draft
          </button>
          <button className="w-[122px] md:w-[148px] h-[36px] md:h-[46px] rounded-md border border-[#359E52] text-[#359E52]">
            Publish
          </button>
        </div>
      </div>
      <div className="w-full my-4">
        <div className="md:w-[369px] p-3 rounded-3xl md:rounded-[100px] flex gap-4 bg-white font-primaryMedium text-sm md:text-base">
          <button
            className={`p-2 rounded-md ${
              activeTab === "wholesale"
                ? "bg-[#F0F0F0] border-[#359E52] text-[#359E52]"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("wholesale")}
          >
            Wholesale Products
          </button>
          <button
            className={`p-2 rounded-md ${
              activeTab === "retail"
                ? "bg-[#F0F0F0] border-[#359E52] text-[#359E52]"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("retail")}
          >
            Retail Products
          </button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};
export default BulkUpload;
