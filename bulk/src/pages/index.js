import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import axios from "axios";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import CardTwo from "@component/cta-card/CardTwo";
import StickyCart from "@component/cart/StickyCart";
import Loading from "@component/preloader/Loading";
import ProductCard from "@component/product/ProductCard";
import FeatureCategory from "@component/category/FeatureCategory";
import CMSkeleton from "@component/preloader/CMSkeleton";
import MainCarousel from "@component/carousel/MainCarousel";
import OfferCard from "@component/offer/OfferCard";
import Banner from "@component/banner/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Home = ({ popularProducts, discountProducts, attributes }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();
  const [products, setProducts] = useState([]);

  const sampleDealsData = [
    {
      image: "/dummy_products/hair.png",
      title: "Body Wave Bundle Human hair 18 inches ",
      path: "/contact-us",
      price: 10000,
    },

    {
      image: "/dummy_products/woman_hair.png",
      title: "  Human hair 18 inches ",
      path: "/contact-us",
      price: 8000,
    },

    {
      image: "/dummy_products/woman_jacket.png",
      title: "A blue jackect ",
      path: "/contact-us",
      price: 3000,
    },
  ];

  const SampleDeals = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex + 1 < data.length ? prevIndex + 1 : 0
        );
      }, 5000);

      return () => clearInterval(interval);
    }, [data.length]);

    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center px-3 sm:px-10 py-20">
        <div className="md:w-[80%] min-h-[500px] flex md:flex-row flex-col-reverse bg-[url(/abstract_bg.png)] bg-cover bg-no-repeat bg-center p-4  sm:p-10 gap-4">
          <div className="flex flex-col flex-[45]  bg-contain bg-center bg-no-repeat min-h-[380px]">
            <div
              style={{
                background: `url(${data[currentIndex].image}) center`,
                backgroundSize: "cover",
              }}
              className="w-full h-[300px]  bg-cover bg-no-repeat bg-center rounded-t-[100px]"
            ></div>
            <div className="w-full h-[150px] text-white bg-[#5A6566] rounded-b-[100px] p-6 px-8 flex flex-col">
              <p className="text-[14px]">
                {/* */}
                {data[currentIndex].title}
              </p>
              <div className="flex flex-row gap-4 items-center text-[14px]w-full justify-between">
                <p>Sample Price</p>
                <b className="text-[28px]">₦{data[currentIndex].price}</b>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-[55] items-center justify-start pt-5 ">
            <p className="text-center text-xl md:text-4xl font-primarySemibold">
              Sample deals for you
            </p>
            <p className=" text-center text-sm md:text-lg">
              Get personalized offers on gadgets, fashion, and travel. Don’t
              miss out these exclusive deals.
            </p>
            <br />
            <button
              // onClick={() => window.open(data[currentIndex].path, "_parent")}
              className="border border-[#CFCBCB] h-10 w-[150px] md:w-[200px] rounded-md md:mt-8 bg-white"
            >
              Get Sample
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const getProducts = () => {
      axios
        .get(`${apiURL}/products/list/wholesale`)
        .then((response) => {
          console.log(response.data.data.products);
          setProducts(response.data.data.products);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getProducts();
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            {/* <StickyCart /> */}

            {/* Exclusive Deals */}
            <div className="bg-gray-50 mx-auto max-w-screen-2xl ">
              <div className="w-full flex items-center justify-between py-5 px-3 sm:px-10">
                <div className="text-sm md:text-xl font-primarySemibold">
                  Exclusive Deals Today
                </div>
                <Link href="/all-products">
                  <button className="hidden md:inline-block w-[250px] h-[44px] text-white font-primaryMedium bg-[#4CBD6B] rounded">
                    View all products
                  </button>
                </Link>
                <div className="block md:hidden">
                  <Link href="/all-products">
                    <button className="p-2 text-white font-primaryMedium bg-[#4CBD6B] rounded">
                      View all
                    </button>
                  </Link>
                </div>
              </div>
              {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 lg:gap-4 mb-4"> */}
              <div className="flex w-full px-3 sm:px-10">
                <div className="flex flex-row items-center gap-[20px] overflow-x-scroll hide-scrollbar flex-1 md:justify-between ">
                  {products.map((deal, index) => (
                    <Link href={`/product-info/${deal._id}`}>
                      <div className="min-w-[186px] md:w-[320px] h-[226px] curssor-pointer md:h-[340px] relative overflow-hidden flex flex-col border border-[#CFCBCB] rounded-md shadow-md product-card">
                        <div className="flex  bg-[#E8F1E9] p-6 flex-[50]">
                          <div
                            style={{
                              background: `url(${deal.featured_image}) center no-repeat`,
                              backgroundSize: "contain",
                            }}
                            className={`flex flex-1 bg-[#E8F1E9] bg-center bg-contain bg-no-repeat`}
                          />
                        </div>
                        <div className="w-full flex items-center justify-center p-4">
                          <div className="w-full flex flex-col justify-start">
                            <p className="text-xs md:text-base">{deal.name}</p>
                            <b>
                              {deal.currency}{" "}
                              {deal.sellingPrice.toLocaleString()}
                            </b>
                          </div>
                        </div>
                        <button className="border border-[#CFCBCB] h-[28px] w-[92px] rounded-md mt-4 bg-[#4CBD6B] text-white absolute right-4 bottom-[-80px] flybtn">
                          Preview
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <br />

              {/* Fashion Style */}
              <div className="w-full md:h-[600px] h-[370px] b-white flex flex-col items-center justify-center py-5 px-3 sm:px-10 bg-white">
                <div className="text-lg md:text-2xl font-primarySemibold">
                  Get Your Fashion Style
                </div>
                <Swiper
                  className="w-full h-full flex"
                  modules={[Navigation, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation={{
                    nextEl: null,
                    prevEl: null,
                  }}
                  autoplay={{
                    delay: 2000, // Delay between transitions in milliseconds
                    disableOnInteraction: false, // Continue autoplay after user interaction
                  }}
                  draggable
                >
                  <SwiperSlide className="flex">
                    <div className="flex flex-1 w-full flex-row md:gap-[50px] gap-[20px] mt-[50px]">
                      <div className="flex-[50] flex bg-black rounded-[20px] relative p-4  bg-[url(/men_shoes.png)] bg-center bg-cover bg-no-repeat">
                        <div className="min-w-[100px] md:w-[200px] md:h-[60px] h-[30px] p-2 bg-[#00000066] absolute left-[10px] bottom-[10px] flex items-center justify-center">
                          <p className="text-white md:text-md text-sm">
                            Men shoes
                          </p>
                        </div>
                      </div>
                      <div className="flex-[50] flex bg-black rounded-[20px] relative p-4 bg-[url(/women_shoes.png)] bg-center bg-cover bg-no-repeat">
                        <div className="min-w-[100px] md:w-[200px] md:h-[60px] h-[30px] p-2 bg-[#00000066] absolute left-[10px] bottom-[10px] flex items-center justify-center">
                          <p className="text-white md:text-md text-sm">
                            Women shoes
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="flex  ">
                    <div className="flex flex-1 w-full flex-row md:gap-[50px] gap-[20px] mt-[50px]">
                      <div className="flex-[50] flex bg-black rounded-[20px] relative p-4  bg-[url(/dummy_products/shop_bag.png)] bg-center bg-cover bg-no-repeat">
                        <div className="min-w-[100px] md:w-[200px] md:h-[60px] h-[30px] p-2 bg-[#00000066] absolute left-[10px] bottom-[10px] flex items-center justify-center">
                          <p className="text-white md:text-md text-sm">
                            Handbag
                          </p>
                        </div>
                      </div>
                      <div className="flex-[50] flex bg-black rounded-[20px] relative p-4 bg-[url(/dummy_products/woman_jacket.png)] bg-center bg-cover bg-no-repeat">
                        <div className="min-w-[100px] md:w-[200px] md:h-[60px] h-[30px] p-2 bg-[#00000066] absolute left-[10px] bottom-[10px] flex items-center justify-center">
                          <p className="text-white md:text-md text-sm">
                            Women Clothes
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="flex  ">
                    <div className="flex flex-1 w-full flex-row md:gap-[50px] gap-[20px] mt-[50px]">
                      <div className="flex-[50] flex bg-black rounded-[20px] relative p-4  bg-[url(/dummy_products/man2.png)] bg-center bg-cover bg-no-repeat">
                        <div className="min-w-[100px] md:w-[200px] md:h-[60px] h-[30px] p-2 bg-[#00000066] absolute left-[10px] bottom-[10px] flex items-center justify-center">
                          <p className="text-white md:text-md text-sm">
                            Men Clothes
                          </p>
                        </div>
                      </div>
                      <div className="flex-[50] flex bg-black rounded-[20px] relative p-4 bg-[url(/dummy_products/woman_hair.png)] bg-center bg-cover bg-no-repeat">
                        <div className="min-w-[100px] md:w-[200px] md:h-[60px] h-[30px] p-2 bg-[#00000066] absolute left-[10px] bottom-[10px] flex items-center justify-center">
                          <p className="text-white md:text-md text-sm">
                            Women Hair
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Sample Deals */}
              <SampleDeals data={sampleDealsData} />

              {/* Shop by category */}
              <div className="w-full flex items-center justify-between py-5 px-3 sm:px-10">
                <div className="text-sm md:text-xl font-primarySemibold">
                  Best Of Electronics
                </div>
              </div>

              <div className="flex w-full px-3 sm:px-10">
                <div className="flex flex-row items-center gap-[20px] overflow-x-scroll hide-scrollbar flex-1 md:justify-between ">
                  {[
                    { title: "Laptops", image: "/dummy_products/woman_pc.png" },
                    {
                      title: "Smart phones",
                      image: "/dummy_products/phone.png",
                    },
                    {
                      title: "Home Appliances",
                      image: "/dummy_products/electronics.png",
                    },
                    {
                      title: "Audio Equipment",
                      image: "/dummy_products/man.png",
                    },
                  ].map((bests, index) => (
                    <Link href="/all-products">
                      <div className="min-w-[186px] md:w-[320px] h-[226px] md:h-[340px] overflow-hidden relative flex flex-col border border-[#CFCBCB] rounded-md shadow-md cursor-pointer product-card">
                        <div className="flex  bg-[#E8F1E9] p-3 flex-[70]">
                          <div
                            style={{
                              background: `url(${bests.image}) center no-repeat`,
                              backgroundSize: "contain",
                            }}
                            className={`flex flex-1 bg-[#E8F1E9] bg-center bg-contain bg-no-repeat`}
                          />
                        </div>
                        <div className="w-full flex flex-[30] items-center justify-center p-4">
                          <div className="w-full flex flex-col justify-start">
                            <div className="md:text-[20px] text-[11px]">
                              {bests.title}
                            </div>
                            <p className="text-[#10B981] cursor-pointer active:opacity-[0.5] md:text-[20px] text-[11px]">
                              Shop Now
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex xl:flex-row gap-[20px]  md:mt-[50px] px-3 sm:px-10 py-5 items-center justify-center md:justify-between flex-col">
                <div className="flex flex-row gap-[20px] w-full flex-[60]">
                  <div className="md:min-w-[320px] flex-[50]  h-[226px] md:h-[340px] p-4 gap-4 overflow-hidden flex flex-col border border-[#CFCBCB] rounded-md shadow-md">
                    <div className="md:text-[20px] text-[9px] text-bold">
                      Kids wears
                    </div>
                    <div className="flex  bg-[#E8F1E9] flex-[90]">
                      <div
                        style={{
                          background: `url(/dummy_products/kids.png) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                        className={`flex flex-1 bg-[#E8F1E9] bg-center bg-contain bg-no-repeat`}
                      />
                    </div>
                    <Link
                      href="/all-products"
                      className="w-full flex flex-[10] items-center justify-center "
                    >
                      <div className="w-full flex flex-col ">
                        <p className="text-[#10B981] cursor-pointer active:opacity-[0.5] md:text-[20px] text-[11px]">
                          See More
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="md:min-w-[320px] flex-[50] h-[226px] md:h-[340px] p-4 gap-4 overflow-hidden flex flex-col  border border-[#CFCBCB] rounded-md shadow-md">
                    <div className="md:text-[20px] text-[9px]  text-bold">
                      Kitchen and Home Decor
                    </div>
                    <div className="flex  bg-[#E8F1E9] flex-[90]">
                      <div
                        style={{
                          background: `url(/dummy_products/decor.png) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                        className={`flex flex-1 bg-[#E8F1E9] bg-center bg-contain bg-no-repeat`}
                      />
                    </div>
                    <div className="w-full flex flex-[10] items-center justify-center ">
                      <Link
                        href="/all-products"
                        className="w-full flex flex-col "
                      >
                        <p className="text-[#10B981] cursor-pointer active:opacity-[0.5] md:text-[20px] text-[11px]">
                          See More
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* column */}
                <div className="flex md:flex-col gap-[20px] min-h-[340px] justify-between  flex-row md:flex-[40] flex-1  w-full ">
                  <div className="  h-[226px] md:min-h-[150px] p-4 gap-4 overflow-hidden flex flex-1 md:flex-row-reverse flex-col border border-[#CFCBCB] rounded-md shadow-md">
                    <div className="flex  bg-[#E8F1E9] flex-[80] md:flex-[40]">
                      <div
                        style={{
                          background: `url(/grocery.png) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                        className={`flex flex-1 bg-[#E8F1E9] bg-center bg-contain bg-no-repeat`}
                      />
                    </div>
                    <div className="w-full flex md:flex-[60] items-center justify-center ">
                      <Link
                        href="/all-products"
                        className="w-full flex flex-col "
                      >
                        <div className="md:text-[20px] text-[11px] text-bold">
                          Grocery
                        </div>
                        <p className="text-[#10B981] cursor-pointer active:opacity-[0.5] md:text-[20px] text-[11px]">
                          Shop Now
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="  h-[226px] md:min-h-[150px] p-4 gap-4 overflow-hidden flex flex-1 md:flex-row-reverse flex-col border border-[#CFCBCB] rounded-md shadow-md">
                    <div className="flex  bg-[#E8F1E9] md:flex-[40] flex-[80]">
                      <div
                        style={{
                          background: `url(/dummy_products/office.png) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                        className={`flex flex-1 bg-[#E8F1E9] bg-center bg-contain bg-no-repeat`}
                      />
                    </div>
                    <Link
                      href="/all-products"
                      className="w-full flex md:flex-[60] items-center justify-center "
                    >
                      <div className="w-full flex flex-col ">
                        <div className="md:text-[20px] text-[11px] text-bold">
                          Office Supplies
                        </div>
                        <p className="text-[#10B981] cursor-pointer active:opacity-[0.5] md:text-[20px] text-[11px]">
                          Shop Now
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                Popular Products for Daily Shopping
                <p>{deal.price}</p>
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                    See all our popular products in this week. You can choose
                    your daily needs products from this list and get some
                    special offer with free shipping.
                    <p>{deal.price}</p>
                  </p> 
                </div>
              </div> */}
              {/* <div className="flex">
                <div className="w-full">
                  {loading ? (
                    <CMSkeleton
                      count={20}
                      height={20}
                      error={error}
                      loading={loading}
                    />
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                      {popularProducts
                        ?.slice(
                          0,
                          storeCustomizationSetting?.home?.popular_product_limit
                        )
                        .map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            attributes={attributes}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div> */}
            </div>

            {/* feature category's */}
            {/* <div className="bg-gray-100 lg:py-16 py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      Featured Categories
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      Choose your necessary products from this feature
                      categories.
                    </p>
                  </div>
                </div>

                <FeatureCategory />
              </div>
            </div> */}

            {/* promotional banner card */}
            {/* <div className="block mx-auto max-w-screen-2xl">
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                <div className="lg:p-16 p-6 bg-[#359E52] shadow-sm border rounded-lg">
                  <CardTwo />
                </div>
              </div>
            </div> */}

            {/* discounted products */}
            {storeCustomizationSetting?.home?.discount_product_status &&
              discountProducts?.length > 0 && (
                <div
                  id="discount"
                  className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
                >
                  <div className="mb-10 flex justify-center">
                    <div className="text-center w-full lg:w-2/5">
                      <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                        <CMSkeleton
                          count={1}
                          height={30}
                          // error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_title
                          }
                        />
                      </h2>
                      <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={5}
                          height={20}
                          // error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_description
                          }
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full">
                      {loading ? (
                        <CMSkeleton
                          count={20}
                          height={20}
                          error={error}
                          loading={loading}
                        />
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                          {discountProducts
                            ?.slice(
                              0,
                              storeCustomizationSetting?.home
                                ?.latest_discount_product_limit
                            )
                            .map((product) => (
                              <ProductCard
                                key={product._id}
                                product={product}
                                attributes={attributes}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </Layout>
      )}
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const { cookies } = context.req;
//   const { query, _id } = context.query;

//   const [data, attributes] = await Promise.all([
//     ProductServices.getShowingStoreProducts({
//       category: _id ? _id : "",
//       title: query ? query : "",
//     }),

//     AttributeServices.getShowingAttributes(),
//   ]);

//   return {
//     props: {
//       popularProducts: data.popularProducts,
//       discountProducts: data.discountedProducts,
//       cookies: cookies,
//       attributes,
//     },
//   };
// };

export default Home;
