import React from "react";
import Image from "next/image";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@component/header/PageHeader";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const AboutUs = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  // console.log("data", data, );

  return (
    <Layout title="About Us" description="This is about us page">
      {/* Hero section */}
      <div
        className="w-full h-[500px] md:h-[632px] relative bg-cover md:px-10 2xl:px-20 md:flex items-center"
        style={{
          backgroundImage: `url(${"../about-hero.png"})`,
        }}
      >
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#1C1C1C]/75 z-[2]"></div> */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between relative z-[3] p-4">
          <div>
            <p className="text-3xl md:text-5xl font-primaryBold text-white my-4 text-center md:text-left">
              About Us
            </p>
            <div className="md:w-[621px] md:h-[240px] md:text-xl font-primaryRegular leading-10 md:leading-[50px] text-white text-center md:text-left">
              ABH.com Limited is a dynamic and innovative ecommerce company
              dedicated to providing exceptional online shopping experiences.
              Established with a vision to revolutionize the way people shop,
              ABH.com Limited leverages cutting-edge technology and a
              customer-centric approach to deliver a diverse range of products
              to consumers worldwide.
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* Our Mission */}
      <div
        className="w-full relative bg-cover md:px-10 flex items-center my-10"
        style={{
          backgroundImage: `url(${"../rafiki.png"})`,
        }}
      >
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#1C1C1C]/75 z-[2]"></div> */}
        <div className="w-full flex flex-col items-center justify-center relative z-[3] p-4">
          <div className="font-primaryBold text-xl md:text-3xl mb-4">
            Our Mission
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-evenly">
            <div className="hidden md:block">
              <Image width={271} height={359} src="/about-rec.png" alt="logo" />
            </div>
            <div className="block md:hidden">
              <Image
                width={307}
                height={329}
                src="/about-rec-mobile.png"
                alt="logo"
              />
            </div>
            <div className="md:w-[550px] md:text-lg leading-10 md:leading-[50px] text-center text-[#373435] font-primaryRegular py-4">
              At ABH.com Limited, our mission is to empower customers by
              offering convenient, reliable, and personalized e-commerce
              solutions. We aim to exceed customer expectations by continuously
              enhancing our platform, expanding our product offerings, and
              delivering unparalleled service.
            </div>
            <div className="hidden md:block">
              <Image
                width={319}
                height={402}
                src="/about-rec2.png"
                alt="logo"
              />
            </div>
            <div className="block md:hidden">
              <Image
                width={348}
                height={331}
                src="/about-rec2.png"
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Offerings */}
      <div className="w-full p-4 md:py-6 md:px-10 grid md:grid-cols-2 gap-10">
        <div className="md:w-[691px] md:h-[421px] bg-[#359E52] rounded-l-[80px] md:rounded-l-[150px] flex flex-col items-center p-6 md:p-10">
          <p className="font-primaryBold text-2xl text-white">Key Offerings</p>
          <p className="font-primaryRegular text-white leading-10 md:leading-[50px]">
            ABH.com Limited offers a wide range of products across various
            categories, including electronics, fashion, beauty, home goods, and
            more. Our curated selection ensures that customers can find
            everything they need in one convenient location. Additionally, we
            partner with reputable brands and suppliers to guarantee the quality
            and authenticity of our products.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="hidden md:block relative">
            <Image width={462} height={331} src="/tech.png" alt="logo" />
            <div class="absolute top-[50%] inset-0 flex items-center justify-center text-white text-2xl font-primaryBold shadow-lg">
              Technology Infrastructure
            </div>
          </div>
          <div className="block md:hidden relative">
            <Image width={366} height={257} src="/tech.png" alt="logo" />
            <div class="absolute top-[50%] inset-0 flex items-center justify-center text-white text-xl font-primaryBold shadow-lg">
              Technology Infrastructure
            </div>
          </div>
          <div className="md:text-lg font-primaryRegular leading-8 md:leading-[50px] w-[305px] md:w-[418px] border border-[#8BCB90] bg-white p-4">
            Our state-of-the-art ecommerce platform is designed to provide a
            seamless and secure shopping experience. Leveraging advanced
            algorithms and data analytics, we personalize product
            recommendations and optimize the user interface to enhance
            engagement and conversion rates. Furthermore, we prioritize
            cybersecurity measures to safeguard customer data and maintain
            trust.
          </div>
        </div>
      </div>
      {/* Offerings section 2 */}
      <div className="w-full bg-[#F5F5F5] p-4 md:py-6 md:px-10 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center justify-center">
          <div className="hidden md:block relative">
            <Image width={462} height={331} src="/globalReach.png" alt="logo" />
            <div class="absolute top-[50%] inset-0 flex items-center justify-center text-white text-2xl font-primaryBold shadow-lg">
              Global Reach
            </div>
          </div>
          <div className="block md:hidden relative">
            <Image width={366} height={257} src="/globalReach.png" alt="logo" />
            <div class="absolute top-[50%] inset-0 flex items-center justify-center text-white text-xl font-primaryBold shadow-lg">
              Global Reach
            </div>
          </div>
          <div className="md:text-lg font-primaryRegular leading-8 md:leading-[50px] w-[305px] md:w-[418px] border border-[#8BCB90] bg-white p-4">
            While headquartered in Port Harcourt, ABH.com Limited hope to serves
            customers worldwide through our robust logistics network and
            strategic partnerships. Whether customers are shopping from the
            comfort of their homes or on the go, our platform is accessible
            across multiple devices and regions, ensuring a consistent
            experience for all.
          </div>
        </div>
        {/* 2 */}
        <div className="flex flex-col items-center justify-center">
          <div className="hidden md:block relative">
            <Image width={462} height={331} src="/future.png" alt="logo" />
            <div class="absolute top-[50%] inset-0 flex items-center justify-center text-white text-2xl font-primaryBold shadow-lg">
              Future Outlook
            </div>
          </div>
          <div className="block md:hidden relative">
            <Image width={366} height={257} src="/future.png" alt="logo" />
            <div class="absolute top-[50%] inset-0 flex items-center justify-center text-white text-xl font-primaryBold shadow-lg">
              Future Outlook
            </div>
          </div>
          <div className="md:text-lg font-primaryRegular leading-8 md:leading-[50px] w-[305px] md:w-[418px] border border-[#8BCB90] bg-white p-4">
            As ecommerce continues to thrive and evolve, ABH.com Limited is
            poised for continued growth and success. We remain dedicated to
            innovation, customer satisfaction, and operational excellence as we
            expand our product offerings, enter new markets, and solidify our
            position as a leader in the global e=commerce industry.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
