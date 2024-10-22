import React from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@component/header/PageHeader";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Faq = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Layout title="FAQ" description="This is faq page">
      <PageHeader
        headerBg={storeCustomizationSetting?.faq?.header_bg}
        title="FAQs"
      />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 py-10 lg:py-12">
          <div className="grid gap-4 lg:mb-8 items-center md:grid-cols-2 xl:grid-cols-2">
            <div className="pr-16">
              <Image
                width={720}
                height={550}
                src={storeCustomizationSetting?.faq?.left_img || "/faq.svg"}
                alt="logo"
              />
            </div>
            <div className="">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>How do I start as an ABH wholesaler?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180 text-emerald-500" : ""
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
                      Create a wholesaler account, submit your business
                      credentials, and upload your product catalogue. You can
                      then set bulk order pricing for your products.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
                      <span>
                        Can I negotiate pricing with manufacturers through ABH?
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180 text-emerald-500" : ""
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
                      Yes, ABH provides a communication platform for wholesalers
                      to negotiate with manufacturers via admin@abhmarkets.com
                      ensuring mutually beneficial terms for bulk orders.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
                      <span>
                        What support does ABH offer for inventory management?
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180 text-emerald-500" : ""
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
                      ABH’s platform integrates with inventory management
                      systems, allowing wholesalers to track stock levels,
                      manage reorders, and avoid stockouts.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
                      <span>
                        How does ABH ensure the authenticity of the products
                        listed?
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180 text-emerald-500" : ""
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
                      ABH verifies the credibility of manufacturers and conducts
                      product inspections. Wholesalers are encouraged to leave
                      reviews based on product quality to help other buyers.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
                      <span>
                        How do I handle logistics and warehousing for large
                        quantities?
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180 text-emerald-500" : ""
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
                      ABH provides warehousing solutions and partners with
                      logistics providers to handle bulk deliveries efficiently,
                      ensuring smooth operations for large-scale wholesalers.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
