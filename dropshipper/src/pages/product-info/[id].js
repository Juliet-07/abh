import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

//internal import
import Layout from "@layout/Layout";
import Loading from "@component/preloader/Loading";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/outline";
import useAddToCart from "@hooks/useAddToCart";
import { notifyError } from "@utils/toast";

const ProductInfo = ({ params }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, setIsLoading, toggleCartDrawer } =
    useContext(SidebarContext);
  const [product, setProduct] = useState(null);
  const [buyNowModal, setbuyNowModal] = useState(false);
  const { handleAddItem, setItem, item } = useAddToCart();
  const [quantity, setquantity] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const handleAddToCart = async () => {
    if (product.quantity < 1) return notifyError("Insufficient stock!");

    const { categories, description, ...updatedProduct } = product;

    console.log("product info in modal", product);

    const newItem = {
      ...updatedProduct,
      title: product?.name,
      id: product._id,
      price: product.price,
      quantity: product.quantity,
    };

    handleAddItem(newItem);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleContinue = () => {
    if (selectedOption === "wholesale") {
      toggleCartDrawer();
      setbuyNowModal(false);
    } else if (selectedOption === "drop-shipping") {
      window.location.href = `/product-info/dropshipping`;
    }
  };

  const handleBuyNow = () => {
    router.push(`/product-info/dropshipping`);
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${apiURL}/products/list-one/${productId}`);
      const data = await response.json();
      console.log(data.data, "product details");
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          {buyNowModal && (
            <div className="w-full flex items-center justify-center bg-[#00000080] fixed top-0 left-0 z-[200000] h-[100vh]">
              <div className="w-[90%] max-w-[700px] min-h-[400px] rounded-xl bg-white p-8 flex flex-col relative px-[10vw]">
                <p className="w-full text-center font-primaryBold">Buy now</p>
                <XIcon
                  width={20}
                  height={20}
                  color="red"
                  onClick={() => setbuyNowModal(false)}
                  className="absolute top-[20px] right-[20px] active:opacity-[0.5] cursor-pointer"
                />
                <br />
                <br />
                <div className="w-full h-[50px] border-[1px] px-4 flex flex-row items-center gap-4 rounded-xl">
                  <input
                    type="radio"
                    id="wholesale-order"
                    name="buying-options"
                    value="wholesale"
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="wholesale-order">
                    Process wholesale order
                  </label>
                </div>
                <br />
                <button
                  aria-label="Total"
                  onClick={toggleCartDrawer}
                  className="relative px-5 text-white text-2xl font-bold"
                >
                  <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {totalItems}
                  </span>
                  <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
                </button>
                <div className="w-full h-[50px] border-[1px] px-4 flex flex-row items-center gap-4 rounded-xl">
                  <input
                    type="radio"
                    id="drop-shipping"
                    name="buying-options"
                    value="drop-shipping"
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="drop-shipping">Opt for drop-shipping</label>
                </div>
                <br />
                <div className="w-full flex flex-row items-center gap-[20px] justify-between">
                  {/* <Link
                    href={`payment-summary/${id}`}
                    className="flex flex-[50]"
                  > */}
                  <button
                    className="text-white text-[14px] rounded-xl bg-[#4CBD6B] flex flex-1 h-[45px] items-center justify-center max-w-[180px] active:opacity-[0.5]"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                  {/* </Link> */}
                  <button
                    className="text-[14px] rounded-xl text-black border flex flex-[50] h-[45px] items-center justify-center max-w-[180px] active:opacity-[0.5]"
                    onClick={() => setbuyNowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="min-h-screen  mx-auto max-w-screen-2xl ">
            {/* Exclusive Deals */}
            <div className="w-full h-14 flex flex-row items-center px-3 sm:px-10 gap-2 ">
              <div className="text-[14px]">Home</div>{" "}
              <ChevronRightIcon width={14} height={14} />{" "}
              <div className="text-[#10B981] text-[14px]">Product Details</div>
            </div>
            <div className="bg-white w-full min-h-[100vh] flex md:flex-row flex-col flex-wrap px-3 sm:px-10">
              {/* Image Section */}
              <div className="flex md:flex-[35] flex-col px-3 sm:px-10 py-10">
                <div
                  className={`flex flex-[40] w-full min-h-[100px]`}
                  style={{
                    backgroundImage: `url(${product.featured_image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />
                <div className="flex flex-[30] w-full px-3">
                  <Swiper
                    className="h-24 max-w-[350px] flex justify-center items-center px-4"
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation
                    draggable
                    autoplay
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide
                        key={index}
                        className="w-[62px] h-[62px] border"
                        style={{
                          backgroundImage: `url(${image.url})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    ))}
                  </Swiper>
                </div>
              </div>
              {/* Details Section */}
              <div className="flex flex-[35] flex-col px-3 sm:px-10 md:py-10 py-4 gap-y-6">
                <div>
                  <strong>{product.name}</strong>
                  <div>{product.categoryId.name}</div>
                  <p className="text-xs text-blue-600">{product.productType}</p>
                </div>
                <div>
                  <b>Brand:</b> {product.manufacturer}
                </div>
                <div>
                  <strong>Description:</strong>
                  <p>{product.description}</p>
                </div>
                <div>
                  <b>Price:</b> {product.currency + " " + product.sellingPrice}{" "}
                  {product.productType === "RETAIL" ? "per unit" : "per carton"}
                </div>
                {product.productType !== "RETAIL" && (
                  <div>
                    <p className="text-[red] text-sm">
                      Minimum order {product.maximumOrderPerCarton} of cartons
                    </p>
                  </div>
                )}
                {/* <div>
                  <b>Price:</b> {product.currency + " " + product.sellingPrice}{" "}
                  per carton
                </div>
                <div>
                  <p className="text-[red] text-sm">
                    Minimum order {product.maximumOrderPerCarton} of cartons
                  </p>
                </div> */}

                <div className="flex md:flex-row flex-col flex-wrap gap-[20px] md:items-center min-h-[60px]">
                  <div className="flex flex-row flex-wrap gap-[20px] items-center flex-[30] bg-[#4F4F4F] min-h-[54px] px-4 justify-between max-w-[200px]">
                    <MinusIcon
                      // onClick={() => setItem(item - 1)}
                      onClick={() =>
                        setItem((prevItem) => Math.max(0, prevItem - 1))
                      }
                      width={16}
                      height={16}
                      color="white"
                      className="cursor-pointer active:opacity-[0.5]"
                    />
                    <div className="flex items-center justify-center bg-white min-w-[60px] h-[30px] flex-1">
                      {" "}
                      <p>{item}</p>{" "}
                    </div>
                    <PlusIcon
                      onClick={() => setItem(item + 1)}
                      width={16}
                      height={16}
                      color="white"
                      className="cursor-pointer active:opacity-[0.5]"
                    />
                  </div>

                  <div className="flex flex-row flex-wrap gap-[20px] items-center flex-[70]">
                    <button
                      className="flex flex-[40] h-[50px] rounded-[5px] text-[14px] p-2 bg-[#4CBD6B] items-center justify-center text-white font-primaryMedium"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                    {/* <button className="flex flex-[60] h-[50px] rounded-[5px] text-[14px] p-2 bg-[#455A64] items-center justify-center text-white font-primaryMedium">
                      Add For drop-shipping
                    </button> */}
                  </div>
                </div>
                {/* <button
                  className="flex w-full max-w-[500px] h-[50px] rounded-[5px] text-[14px] p-2 bg-[#F58634] items-center justify-center text-white font-primaryBold my-4"
                  // onClick={() => setbuyNowModal(true)}
                  onClick={handleBuyNow}
                >
                  Buy now
                </button> */}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default ProductInfo;
