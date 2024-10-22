import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "../../assets/newVendor.png";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa";
import { XIcon } from "@heroicons/react/outline";
import { Settings } from "../../components/SliderSettings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Inventory = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [showPreview, setPreview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  useEffect(() => {
    const getProducts = () => {
      axios
        .get(`${apiURL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setProducts(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getProducts();
  }, [apiURL, token]);

  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setPreview(true);
  };

  const handleCancel = () => {
    setPreview(false);
  };

  const CustomSlider = ({ settings, images }) => {
    return (
      <div className="slider-container px-4">
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
  return (
    <>
      {showPreview &&
        selectedProduct &&
        (() => {
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
                    <p>{selectedProduct.id}</p>
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
                    <p>{selectedProduct?.category?.name}</p>
                    <div className="flex flex-row gap-[10px]">
                      <b>SKU</b> <p>{selectedProduct.sku}</p>
                    </div>
                    <br />
                    <p>{selectedProduct.description}</p>
                    <br />
                    <b>
                      {selectedProduct.currency + " " + selectedProduct.price}
                    </b>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Quantity</b>
                      <p>
                        {selectedProduct.quantity + " " + selectedProduct.unit}
                      </p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Total Sold</b>
                      <p>
                        {selectedProduct.quantity + " " + selectedProduct.unit}
                      </p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Shop Name</b>
                      <p>{selectedProduct?.vendor?.store}</p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Vendor</b>
                      <p>
                        {selectedProduct?.vendor?.firstName +
                          " " +
                          selectedProduct?.vendor?.lastName}
                      </p>
                    </div>
                    <br />
                  </div>
                </div>
                <br />
                <div className="flex items-center justify-between mt-10 mb-4 font-primaryRegular">
                  <div></div>
                  <button
                    onClick={handleCancel}
                    className="md:w-[141px] w-[99px] h-[46px] bg-white border border-[#CFCBCB] text-black rounded-md font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {products.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">Inventory ({products.length})</p>
          </div>
          <div className="my-10 w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="text-center p-3">ID</th>
                    <th className="text-center p-3">Product</th>
                    <th className="text-center p-3">SKU</th>
                    <th className="text-center p-3">Sold</th>
                    <th className="text-center p-3">Quantity</th>
                    <th className="text-center p-3">Price</th>
                    <th className="text-center p-3">Shop Name</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <div className="w-10 h-10">
                            <img
                              src={product.featured_image}
                              className="rounded-full"
                              alt=""
                            />
                          </div>
                          <div className="grid gap-2">
                            <p>{product.name}</p>
                            <p>{product?.category?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">{product.sku}</td>
                      <td className="p-4 text-center">{product.sku}</td>
                      <td className="p-4 text-center">
                        {product.quantity + " " + product.unit}
                      </td>
                      <td className="p-4 text-center">
                        {product.currency + " " + product.price}
                      </td>
                      <td className="p-4 text-center">
                        {product?.vendor?.store}
                      </td>
                      <td className="p-4 flex items-center justify-center">
                        <button
                          onClick={() => handleViewMore(product)}
                          className="w-8 h-8 rounded-full border border-gray-300 text-[#359E52] flex items-center justify-center"
                        >
                          <FaEye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Inventory;
