import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "../../assets/newVendor.png";
import { CheckIcon } from "@heroicons/react/solid";
import { FcCancel } from "react-icons/fc";
import moment from "moment";

const NewVendors = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [showPreview, setPreview] = useState(false);
  const [showApproval, setApproval] = useState(false);
  const [showDecline, setDecline] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [pendingVendors, setPendingVendors] = useState([]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  useEffect(() => {
    const getAllVendors = () => {
      axios
        .get(`${apiURL}/vendors?filter.status=PENDING`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.items);
          setPendingVendors(response.data.data.items);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllVendors();
  }, [apiURL, token]);

  const handleViewMore = (vendor) => {
    setSelectedVendor(vendor);
    setPreview(true);
  };

  const manageVendorStatus = (vendorId, status) => {
    const url = `${apiURL}/vendors/manage-account-status/${vendorId}`;
    axios
      .put(
        url,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        console.log("Vendor status updated:", response.data);
        // Update the state to reflect the change
        setPendingVendors((prevVendors) =>
          prevVendors.filter((vendor) => vendor.id !== vendorId)
        );
      })
      .catch((error) => {
        console.error("Error updating vendor status:", error);
      });
  };

  const handleApprove = () => {
    manageVendorStatus(selectedVendor._id, "ACTIVE");
    setPreview(false);
    setApproval(true);
  };

  const handleDecline = () => {
    manageVendorStatus(selectedVendor._id, "DECLINED");
    setPreview(false);
    setDecline(true);
  };

  return (
    <>
      {showPreview && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="w-[90%] max-w-[800px] h-screen bg-white rounded-xl flex flex-col items-center justify-center overflow-y-auto">
            <div className="w-full px-6 md:px-10 font-primaryRegular">
              <div className="text-xl font-bold my-2 text-center">
                Vendor Details
              </div>
              <div className="grid">
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>Date & Time Registered</strong>
                  <p>{formatDate(selectedVendor.createdAt)}</p>
                </div>
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>Full Name</strong>
                  <p>
                    {selectedVendor.firstName + " " + selectedVendor.lastName}
                  </p>
                </div>
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>Shop Name</strong>
                  <p>{selectedVendor.store}</p>
                </div>
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>Business Email</strong>
                  <p>{selectedVendor.email}</p>
                </div>
                <div className="flex justify-between">
                  <div className="grid border-b border-b-[#C1C6C5] py-2">
                    <strong>Business Phone Number</strong>
                    <p>{selectedVendor.phoneNumber}</p>
                  </div>
                  <div className="grid border-b border-b-[#C1C6C5] py-2">
                    <strong>Alternate Phone Number</strong>
                    <p>{selectedVendor.alternatePhoneNumber}</p>
                  </div>
                </div>
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>Shop Address</strong>
                  <p>{selectedVendor.address}</p>
                </div>
                <div className="flex justify-between">
                  <div className="grid border-b border-b-[#C1C6C5] py-2">
                    <strong>Shop Residing Country</strong>
                    <p>{selectedVendor.country}</p>
                  </div>
                  <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                    <strong>City</strong>
                    <p>{selectedVendor.city}</p>
                  </div>
                  <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                    <strong>State</strong>
                    <p>{selectedVendor.state}</p>
                  </div>
                </div>
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>Business Type</strong>
                  <p>{selectedVendor.businessType}</p>
                </div>
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>National Identification Number</strong>
                  <p>{selectedVendor.nationalIdentificationNumber}</p>
                </div>
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>Tax Identification Number</strong>
                  <p>{selectedVendor.taxIdentificationNumber}</p>
                </div>
                <div className="grid border-b border-b-[#C1C6C5] py-2">
                  <strong>CAC Registration Number</strong>
                  <p>{selectedVendor.cacRegistrationNumber}</p>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="flex gap-4 my-10">
                  <button
                    onClick={handleApprove}
                    className="w-[99px] md:w-[186px] h-10 md:h-[46px] flex items-center justify-center text-white bg-[#4CBD6B] rounded-lg font-semibold"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleDecline}
                    className="w-[99px] md:w-[186px] h-10 md:h-[46px] flex items-center justify-center text-white bg-[#E3140F] rounded-lg font-semibold"
                  >
                    Reject
                  </button>
                </div>
                <button
                  onClick={() => setPreview(false)}
                  className="w-[99px] md:w-[186px] h-10 md:h-[46px] flex items-center justify-center text-black bg-slate-50 border rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showApproval && (
        <div className="w-full h-screen  bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white rounded-xl flex flex-col items-center  justify-center gap-6">
            <div className="w-[50px] h-[50px] rounded-[100px] border-[#08932E] border-2 flex flex-col items-center  justify-center">
              <CheckIcon width={30} height={30} color="#08932E" />
            </div>
            <p className="text-center">
              Vendor approved <br />
              successfully!
            </p>
            <button
              onClick={() => setApproval(false)}
              className="w-[186px] h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showDecline && (
        <div className="w-full h-screen  bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white rounded-xl flex flex-col items-center  justify-center gap-6">
            <FcCancel size={60} />
            <p className="text-center">
              Vendor application <br />
              rejected!
            </p>
            <button
              onClick={() => setDecline(false)}
              className="w-[186px] h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}
      <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
        <p className="">New Vendors</p>
        <Link
          to="/createVendors"
          className="text-white bg-[#359E52] text-sm p-2 rounded-xl"
        >
          Create Vendor
        </Link>
      </div>
      {pendingVendors.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="my-10 w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="text-center p-3">Date</th>
                    <th className="text-center p-3">Full Name</th>
                    <th className="text-center p-3">Shop Name</th>
                    <th className="text-center p-3">Business Type</th>
                    <th className="text-center p-3">Business Email</th>
                    <th className="text-center p-3">Business Phone</th>
                    <th className="text-center p-3">Shop Address</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingVendors.map((vendor, index) => (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">
                        {formatDate(vendor.createdAt)}
                      </td>
                      <td className="p-4 text-center">
                        {vendor.firstName + " " + vendor.lastName}
                      </td>
                      <td className="p-4 text-center">{vendor.store}</td>
                      <td className="p-4 text-center">{vendor.businessType}</td>
                      <td className="p-4 text-center">{vendor.email}</td>
                      <td className="p-4 text-center">{vendor.phoneNumber}</td>
                      <td className="p-4 text-center">{vendor.address}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleViewMore(vendor)}
                          className="text-[#359E52] hover:underline"
                        >
                          View more
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
          <div className="text-xl font-primaryRegular">
            No new registered vendor
          </div>
          <div className="my-10 md:p-10">
            <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default NewVendors;
