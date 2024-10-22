import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "../../assets/newVendor.png";
import { CheckIcon } from "@heroicons/react/solid";
import { FcCancel } from "react-icons/fc";
import moment from "moment";
import { FaEye, FaPen } from "react-icons/fa";
import { XIcon } from "@heroicons/react/outline";
import { Settings } from "../../components/SliderSettings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewProducts = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [showPreview, setPreview] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [confirmApproval, setConfirmApproval] = useState(false);
  const [confirmDecline, setConfirmDecline] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [comment, setComment] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  useEffect(() => {
    const getPendingProducts = () => {
      axios
        .get(`${apiURL}/products?status=PENDING`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.data);
          setPendingProducts(response.data.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getPendingProducts();
  }, [apiURL, token]);

  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setPreview(true);
  };

  const manageProductStatus = (productId, status) => {
    const url = `${apiURL}/products/manage-product-status/${productId}`;
    const payload = {
      status: status,
      comments: comment,
      sellingPrice: parseInt(sellingPrice),
    };
    axios
      .put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        console.log("Product status updated:", response.data);
        if (response.data.success === true) {
          setConfirmApproval(true);
        }
        // Update the state to reflect the change
        setPendingProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error updating vendor status:", error);
      });
  };

  const handleApprove = () => {
    setShowApproveModal(true);
    setPreview(false);
  };

  const handleDecline = () => {
    setShowRejectModal(true);
    setPreview(false);
  };

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "live":
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(pendingProducts.length / itemsPerPage);

  const paginatedProducts = pendingProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
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
                <div className="w-full flex flex-row flex-wrap mt-[10px] min-h-1 gap-10 font-primaryRegular">
                  <div className="w-full min-w-[300px] min-h-[200px] flex flex-[45] flex-col">
                    <p>{selectedProduct.id}</p>
                    <br />
                    <div
                      className="w-full h-[198px] bg-contain"
                      style={{
                        background: `url(${selectedProduct?.featured_image}) center no-repeat`,
                        backgroundSize: "contain",
                      }}
                    ></div>
                    <br />
                    <CustomSlider
                      settings={Settings}
                      images={selectedProduct?.images}
                    />
                  </div>
                  <div className="w-full min-w-[300px] flex flex-[55] flex-col">
                    <br />
                    <br />
                    <b>{selectedProduct?.name}</b>
                    <p>{selectedProduct?.categoryId?.name}</p>
                    {/* <div className="flex flex-row gap-[10px]">
                      <b>SKU</b> <p>{selectedProduct.sku}</p>
                    </div> */}
                    <br />
                    <p>{selectedProduct?.description}</p>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Product Type</b>
                      <p>{selectedProduct.productType}</p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Price</b>
                      <p>
                        {selectedProduct.currency +
                          " " +
                          selectedProduct?.price}
                      </p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Quantity</b>
                      <p>
                        {selectedProduct?.quantity +
                          " " +
                          selectedProduct?.unit}
                      </p>
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
                <br />
                <div className="flex items-center justify-between mt-10 mb-4 font-primaryRegular">
                  <button
                    onClick={handleApprove}
                    className="md:w-[186px] w-[99px] h-[46px] bg-[#4CBD6B] text-white rounded-[6px]"
                  >
                    Publish
                  </button>
                  <button
                    onClick={handleDecline}
                    className="md:w-[186px] w-[99px] h-[46px] bg-[#E3140F] text-white rounded-[6px]"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {showApproveModal && (
        <div className="w-full h-screen bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] bg-white rounded-xl p-6 flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Enter Selling Price</h2>
            <input
              type="text"
              className="border p-2 rounded"
              placeholder="Enter selling price"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowApproveModal(false)}
                className="w-full h-[46px] rounded-[6px] bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  manageProductStatus(selectedProduct._id, "APPROVED");
                  setShowApproveModal(false);
                  // setConfirmApproval(true);
                }}
                className="w-full h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="w-full h-screen bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] bg-white rounded-xl p-6 flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Reason for Rejection</h2>
            <textarea
              className="border p-2 rounded"
              placeholder="Enter reason for rejection"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="w-full h-[46px] rounded-[6px] bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  manageProductStatus(selectedProduct._id, "DECLINED");
                  setShowRejectModal(false);
                  setConfirmDecline(true);
                }}
                className="w-full h-[46px] rounded-[6px] bg-[#E3140F] text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmApproval && (
        <div className="w-full h-screen  bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white rounded-xl flex flex-col items-center  justify-center gap-6">
            <div className="w-[50px] h-[50px] rounded-[100px] border-[#08932E] border-2 flex flex-col items-center  justify-center">
              <CheckIcon width={30} height={30} color="#08932E" />
            </div>
            <p className="text-center">
              Product is <br />
              Live!
            </p>
            <button
              onClick={() => setConfirmApproval(false)}
              className="w-[186px] h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {confirmDecline && (
        <div className="w-full h-screen  bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white rounded-xl flex flex-col items-center  justify-center gap-6">
            <FcCancel size={60} />
            <p className="text-center">
              Product is <br />
              rejected!
            </p>
            <button
              onClick={() => setConfirmDecline(false)}
              className="w-[186px] h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {pendingProducts.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">New Products</p>
            {/* <Link
              to="/createVendors"
              className="text-white bg-[#359E52] text-base p-3 rounded-xl"
            >
              Create Vendor
            </Link> */}
          </div>
          <div className="my-6 w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Product</th>
                    <th className="text-left p-3">Product Type</th>
                    <th className="text-center p-3"> Price</th>
                    <th className="text-center p-3">Stock</th>
                    <th className="text-center p-3">Vendor</th>
                    <th className="text-center p-3">Store</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product, index) => (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium"
                    >
                      <td className="min-w-[100px] md:w-0 p-4 text-left">
                        {formatDate(product.created_at)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center  gap-2">
                          <div className="w-10 h-10 shadow-lg rounded border border-gray-200 flex items-center justify-center p-1">
                            <img src={product.featured_image} alt="" />
                          </div>
                          <div className="w-full grid gap-2">
                            <p className="text-ellipsis whitespace-nowrap">
                              {product.name}
                            </p>
                            <b>{product?.categoryId?.name}</b>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-left">{product.productType}</td>
                      <td className="min-w-[100px] md:w-0 p-4 text-left">
                        {product.currency + " " + product.price}
                      </td>
                      <td className="min-w-[100px] md:w-0 p-4 text-center">
                        {product.quantity + " " + product.unit}
                      </td>
                      <td className="p-4 text-center">
                        {product?.vendor?.firstName +
                          " " +
                          product?.vendor?.lastName}
                      </td>
                      <td className="p-4 text-center">
                        {product?.vendor?.store}
                      </td>
                      <td className="p-4 flex items-center justify-center">
                        <button
                          onClick={() => handleViewMore(product)}
                          className="w-8 h-8 rounded-full border border-gray-300 text-[#359E52] flex items-center justify-center"
                        >
                          <FaEye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
          <div className="text-xl font-primaryRegular">No new products</div>
          <div className="my-10 md:p-10">
            <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default NewProducts;
