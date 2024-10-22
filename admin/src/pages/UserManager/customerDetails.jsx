import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import Apples from "../../assets/apples.png";

const CustomerDetails = () => {
  const location = useLocation();
  const customerDetails = location.state && location.state.customer;
  console.log("Details", customerDetails);
  const navigate = useNavigate();

  if (!customerDetails) {
    return <div>No details available</div>;
  }

  //   const getStatusStyles = (status) => {
  //     switch (status.toLowerCase()) {
  //       case "active":
  //         return {
  //           bgColor: "bg-[#088D2D]/[12%]",
  //           textColor: "text-[#088D2D]",
  //           dotColor: "bg-[#088D2D]",
  //         };
  //       case "blocked":
  //         return {
  //           bgColor: "bg-[#FB1010]/[12%]",
  //           textColor: "text-[#FB1010]",
  //           dotColor: "bg-[#FB1010]",
  //         };
  //       case "inactive":
  //         return {
  //           bgColor: "bg-[#8A8D08]/[12%]",
  //           textColor: "text-[#8A8D08]",
  //           dotColor: "bg-[#8A8D08]",
  //         };
  //       case "deactivated":
  //         return {
  //           bgColor: "bg-[#F58634]/[12%]",
  //           textColor: "text-[#F58634]",
  //           dotColor: "bg-[#F58634]",
  //         };
  //       default:
  //         return {
  //           bgColor: "bg-gray-200",
  //           textColor: "text-gray-800",
  //         };
  //     }
  //   };
  //   const { bgColor, textColor, dotColor } = getStatusStyles(
  //     customerDetails.status
  //   );
  return (
    <>
      <div className="w-full h-[57px] md:h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
        Customer Details
      </div>
      <div className="my-6 w-full grid gap-10">
        {/* Customer Info */}
        <div className="w-full bg-white rounded-xl p-4 gap-6 flex flex-col md:flex-row md:items-stretch justify-between">
          <div className="p-4 grid gap-10 font-primaryRegular border border-[#CFCBCB]">
            <div className="w-full md:w-[369px] h-[120px] rounded-2xl p-3 bg-[#8BCB90]/[12%] flex items-center justify-between gap-4">
              <div className="bg-[#455A64] w-20 md:w-[100px] h-20 md:h-[100px] rounded-full text-white md:text-2xl font-primarySemibold flex items-center justify-center">
                M
              </div>
              <div className="grid gap-2">
                <p className="font-semibold md:text-xl">
                  {customerDetails.firstName + " " + customerDetails.lastName}
                </p>
                <p>{customerDetails.email}</p>
                <p>{customerDetails.phoneNumber}</p>
              </div>
            </div>

            {/* <div>
              <div className="py-2 border-b border-b-[#CFCBCB] mb-2">
                Status
              </div>
              <div
                className={`h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
              >
                <div
                  className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                />
                <p className={`${textColor} text-xs`}>
                  {customerDetails.status}
                </p>
              </div>
            </div> */}
            <div>
              <div className="py-2 border-b border-b-[#CFCBCB] mb-2">
                Last Interaction
              </div>
              <p>2 days ago</p>
            </div>
          </div>
          <div className="w-full md:w-[70%] flex flex-col gap-14 border border-[#CFCBCB] p-4 font-primaryRegular">
            {/* 1 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>Shipping Address</p>
              <p>{customerDetails.shippingAddress}</p>
            </div>
            {/* 2 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>City</p>
              <p>{customerDetails.nationalIdentificationNumber}</p>
            </div>
            {/* 3 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>State</p>
              <p>{customerDetails.taxIdentificationNumber}</p>
            </div>
            {/* 4 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>Country</p>
              <p>{customerDetails.cacRegistrationNumber}</p>
            </div>
          </div>
        </div>
        {/* Order History */}
        <div className="bg-white border border-[#CFCBCB] p-4 rounded-xl flex flex-col gap-4 font-primaryRegular">
          <div className="w-full flex items-center justify-between">
            <p className="font-bold">Order History</p>
            <div></div>
          </div>
          <div className="flex items-center mt-10 gap-6 md:gap-10">
            <div className="text-sm md:text-base">
              <b>Order ID #312311</b>
              <p>Today 10:29 AM</p>
            </div>
            <div className="text-sm md:text-base">
              <p>Total Price</p>
              <b>$230</b>
            </div>
            <div className="text-sm md:text-base">
              <p>Order Status</p>
              <b>$230</b>
            </div>
          </div>
          <hr />
          <div className="w-full flex flex-col md:flex-row md:items-center gap-14 md:gap-20">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black">
                  <FiPackage size={20} color="white" />
                </div>
                <b>Order details</b>
              </div>
              <div className="flex items-center gap-4">
                <b>Payment:</b>
                <div>Paid</div>
              </div>
              <div className="flex items-center gap-4">
                <b>Delivery:</b>
                <div className="grid">
                  <p>Delivery before</p>
                  <p>Tuesday 10/06/2024</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black">
                  <TbTruckDelivery size={20} color="white" />
                </div>
                <b>Delivery</b>
              </div>
              <div className="flex items-center gap-4">
                <b>City:</b>
                <p>Wisconsin</p>
              </div>
              <div className="flex items-center gap-4">
                <b>State:</b>
                <p>New York</p>
              </div>
              <div className="flex items-center gap-4">
                <b>Address:</b>
                <p>{customerDetails.shippingAddress}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
              <div className="w-[173px] h-[120px] border border-[#CFCBCB] flex items-center justify-center rounded-xl">
                <img src={Apples} alt="product" />
              </div>
              <div className="flex items-center gap-10">
                <div className="grid">
                  <b>Apple</b>
                  <p>Grocery</p>
                </div>
                <div className="grid">
                  <b>Qty</b>
                  <p>10</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="my-10 w-full flex items-center justify-between">
        <Link
          to="/customers"
          className="w-[99px] md:w-[137px] h-10 md:h-[44px] border border-[#CFCBCB] font-primarySemibold rounded-lg flex items-center justify-center"
        >
          Back
        </Link>
        <div className="flex gap-4">
          <button
            button
            className="w-[123px] md:w-[186px] h-10 md:h-[46px] bg-[#E3140F] text-white font-primarySemibold rounded-lg"
          >
            Block
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
