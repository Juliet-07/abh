import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import { FiSearch } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import { Settings } from "../../components/SliderSettings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EditPen from "../../assets/pencil.svg";
import ViewEye from "../../assets/eye.svg";
import DeleteCan from "../../assets/trash.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myproducts = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("vendorToken");
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterKeyword, setfilterKeyword] = useState("");
  const [showPreview, setPreview] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [loading, setLoading] = useState(false);

  const CustomSlider = ({ settings, images }) => {
    return (
      <div className="slider-container p-[20px] bg-none">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="flex gap-4">
              <img src={image.url} className="w-[100px] h-[100px]" />
            </div>
          ))}
        </Slider>
      </div>
    );
  };

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

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          bgColor: "bg-[#088D2D]/[12%]",
          textColor: "text-[#088D2D]",
          dotColor: "bg-[#088D2D]",
        };
      case "pending":
        return {
          bgColor: "bg-[#FB1010]/[12%]",
          textColor: "text-[#FB1010]",
          dotColor: "bg-[#FB1010]",
        };
      case "inactive":
        return {
          bgColor: "bg-[#8A8D08]/[12%]",
          textColor: "text-[#8A8D08]",
          dotColor: "bg-[#8A8D08]",
        };
      case "deactivated":
        return {
          bgColor: "bg-[#F58634]/[12%]",
          textColor: "text-[#F58634]",
          dotColor: "bg-[#F58634]",
        };
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-800",
        };
    }
  };

  const handleViewMore = (data) => {
    setSelectedProduct(data);
    setPreview(true);
  };

  const handleEditProduct = (data) => {
    if (data.status.toLowerCase() === "approved") {
      setSelectedProduct(data);
      setShowQuantityPopup(true);
    } else {
      navigate("/dashboard/editProduct", { state: { data } });
    }
  };

  const handleUpdateProduct = () => {
    setLoading(true);
    const url = `${apiURL}/products/update/${selectedProduct._id}`;
    const payload = {
      quantity: selectedProduct.quantity,
    };
    axios
      .patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(() => {
        toast.success("Product updated successfully!");
        closeQuantityPopup(true);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to update product.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteProduct = (productId) => {
    setLoading(true);
    axios
      .delete(`${apiURL}/products/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(() => {
        const updatedProducts = productsData.filter(
          (product) => product._id !== productId
        );
        setProductsData(updatedProducts);
        toast.success("Prodcut deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeQuantityPopup = () => {
    setShowQuantityPopup(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  const paginatedTable = productsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          console.log(response);
          setProductsData(response.data.data.products);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllProducts();
  }, []);
  return (
    <>
      <ToastContainer />
      {showDelete && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-screen  bg-[#000000a8] z-[1000] fixed top-0 left-0 flex flex-col items-center  justify-center font-primaryRegular"
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

      {showPreview &&
        selectedProduct &&
        (() => {
          const { bgColor, textColor, dotColor } = getStatusStyles(
            selectedProduct.status
          );
          return (
            <div className="w-full h-[100vh] overflow-y-scroll bg-[#000000a8] fixed z-50 top-0 left-0 flex flex-col items-center">
              <div className="w-[90%] max-w-[882px] relative bg-white rounded-[10px] p-[20px] md:p-[40px] my-[5vh]">
                <b className="text-[16px] w-full text-center flex justify-center font-primaryRegular">
                  Product Details
                </b>
                <XIcon
                  width={20}
                  height={20}
                  className="absolute right-[20px] top-[20px] cursor-pointer active:opacity-5"
                  color="red"
                  onClick={() => setPreview(false)}
                />
                <div className="w-full flex flex-row flex-wrap mt-[20px] min-h-1 gap-2 font-primaryRegular">
                  <div className="w-full min-w-[300px] min-h-[200px] flex flex-[45] flex-col">
                    <b>{selectedProduct.id}</b>
                    <br />
                    <div
                      className="w-full h-[198px] bg-contain"
                      style={{
                        background: `url(${selectedProduct.featured_image}) center no-repeat`,
                        backgroundSize: "contain",
                      }}
                    ></div>
                    <br />
                    <CustomSlider
                      settings={Settings}
                      images={selectedProduct.images}
                    />
                  </div>
                  <div className="w-full min-w-[300px] flex flex-[55] flex-col">
                    <br />
                    <br />
                    <b>{selectedProduct.name}</b>
                    <p>{selectedProduct?.categoryId?.name}</p>
                    <br />
                    {/* <div className="flex flex-row gap-[10px]">
                      <b>SKU</b> <p>{selectedProduct.sku}</p>
                    </div> */}
                    {/* <br /> */}
                    <p>{selectedProduct.description}</p>
                    <br />
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Product Type</b>
                      <p>{selectedProduct.productType}</p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Price</b>
                      <p>
                        {selectedProduct.currency + " " + selectedProduct.price}
                      </p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Quantity</b>
                      <p>
                        {selectedProduct.quantity -
                          selectedProduct.soldQuantity +
                          " " +
                          selectedProduct.unit}
                      </p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Size</b>
                      <p>{selectedProduct.size}</p>
                    </div>
                    <br />
                    <div className="flex items-center gap-3">
                      <b>Status</b>
                      <div
                        className={`h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                      >
                        <div
                          className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                        />
                        <p className={`${textColor} text-xs`}>
                          {selectedProduct.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-10 font-primaryRegular">
                  <div className="flex flex-row gap-[10px]">
                    <button
                      onClick={() => handleEditProduct(selectedProduct)}
                      className="md:w-[150px] w-20 h-10 bg-[#4CBD6B] text-white rounded-[6px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDelete(true);
                        setPreview(false);
                      }}
                      className="md:w-[150px] w-20 h-10 bg-[#E3140F] text-white rounded-[6px]"
                    >
                      Delete
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setDelete(false);
                      setPreview(false);
                    }}
                    className="md:w-[150px] w-20 h-10 bg-white text-[grey] border rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {showQuantityPopup && selectedProduct && (
        <div className="w-full h-screen bg-[#000000a8] z-[1000] fixed top-0 left-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[550px] relative bg-white p-6 rounded-[10px] flex flex-col">
            <XIcon
              width={20}
              height={20}
              onClick={closeQuantityPopup}
              color="red"
              className="absolute active:opacity-5 right-[20px] top-[20px] cursor-pointer"
            />
            <b className="md:text-xl text-center">Edit Stock Level</b>
            <p className="py-2 text-xs md:text-base">
              ID {selectedProduct?.categoryId?._id}
            </p>
            <div className="w-full flex flex-col md:flex-row items-center gap-4">
              <div className="w-[234px] h-[198px]">
                <img
                  src={selectedProduct?.featured_image}
                  // className="w-[234px] h-[198px]"
                />
              </div>
              <div className="grid gap-3 md:gap-6 text-left">
                <div>
                  <b>{selectedProduct?.name}</b>
                  <p>{selectedProduct?.categoryId?.name}</p>
                </div>

                <div>
                  <label className="font-primaryRegular text-sm">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full h-[46px] p-2 border rounded mt-2"
                    value={selectedProduct.quantity}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        quantity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              <button
                onClick={handleUpdateProduct}
                className="w-full h-[46px] rounded-lg bg-[#4CBD6B] text-white flex items-center justify-center"
                // disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col">
        <div className="md:hidden flex items-center mb-4 font-primaryBold">
          My Products
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="w-full md:w-[80%] max-w-[500px] h-10 bg-white p-3 flex items-center rounded-md">
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

          <div className="flex flex-row items-center gap-3 font-primaryRegular">
            <button
              onClick={() => navigate("/dashboard/bulkUpload")}
              className="h-[36px] w-[143px] rounded-md bg-[#F58634] text-sm text-white"
            >
              Bulk upload
            </button>
            <button
              onClick={() => navigate("/dashboard/addProducts")}
              className="h-[36px] w-[122px] rounded-md bg-none text-sm text-[#359E52] border-[1px] border-[#359E52]"
            >
              Add product
            </button>
          </div>
        </div>

        {/* products Table */}
        <div className="my-10 w-full bg-white p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-primaryRegular border border-[#C1C6C5]">
              <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                <tr>
                  {/* <th className="text-center p-4">ID</th> */}
                  <th className="text-left p-4">Product Name</th>
                  <th className="text-center p-4">Product Type</th>
                  <th className="text-center p-4">Price</th>
                  <th className="text-center p-4">Stock</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTable.map((data, index) => {
                  const { bgColor, textColor, dotColor } = getStatusStyles(
                    data.status
                  );
                  return (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium"
                    >
                      <td className="p-4 text-left">
                        <div className="flex gap-2">
                          <img
                            src={`${data.featured_image}`}
                            alt=""
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <div className="w-[100px] flex flex-col gap-2">
                            {/* <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                              {data.name}
                            </p> */}
                            <p className="text-ellipsis whitespace-nowrap">
                              {data.name}
                            </p>
                            <b>{data?.categoryId?.name}</b>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">{data.productType}</td>
                      <td className="p-4 text-center">
                        {data.currency + " " + data.price}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center">
                          {data.quantity - data.soldQuantity >= 20 && (
                            <div className="w-[66px] h-[35px] bg-[#E38E0F14] p-[10px] flex items-center justify-center gap-[10px]">
                              <div className="min-w-[8px] h-[8px] bg-[#E38E0F] rounded-full" />
                              <p className="text-[#E38E0F] text-[12px]">High</p>
                            </div>
                          )}
                          {data.quantity - data.soldQuantity >= 1 &&
                            data.quantity - data.soldQuantity < 10 && (
                              <div className="w-[101px] h-[35px] bg-[#E3140F1F] p-[10px] flex items-center justify-center gap-[10px]">
                                <div className="min-w-[8px] h-[8px] bg-red-500 rounded-full" />
                                <p className="text-red-500 text-[12px]">
                                  Low Stock
                                </p>
                              </div>
                            )}
                          {data.quantity - data.soldQuantity >= 10 &&
                            data.quantity - data.soldQuantity < 20 && (
                              <div className="w-[91px] h-[35px] bg-[#081E9314] p-[10px] flex items-center justify-center gap-[10px]">
                                <div className="min-w-[8px] h-[8px] bg-[#081E93] rounded-full" />
                                <p className="text-[#081E93] text-[12px]">
                                  Medium
                                </p>
                              </div>
                            )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div
                          className={`w-full h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                        >
                          <div
                            className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                          />
                          <p className={`${textColor} text-xs`}>
                            {data.status}
                          </p>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex items-center justify-evenly">
                          <div
                            onClick={() => handleEditProduct(data)}
                            className="w-[28px] h-[28px] border-[1px] cursor-pointer active:opacity-[0.2] rounded-full flex items-center justify-center"
                          >
                            <img src={EditPen} alt="" width={15} height={15} />
                          </div>
                          <div
                            onClick={() => handleViewMore(data)}
                            className="w-[28px] h-[28px] border-[1px] cursor-pointer active:opacity-[0.2] rounded-full flex items-center justify-center"
                          >
                            <img src={ViewEye} alt="" width={15} height={15} />
                          </div>
                          <div
                            onClick={() => handleDeleteProduct(data._id)}
                            className="w-[28px] h-[28px] border-[1px] cursor-pointer active:opacity-[0.2] rounded-full flex items-center justify-center"
                          >
                            <img
                              src={DeleteCan}
                              alt=""
                              width={15}
                              height={15}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
        </div>
      </div>
    </>
  );
};

export default Myproducts;
