import React from "react";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiPhone } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import { notifySuccess } from "@utils/toast";
import InputArea from "@component/form/InputArea";
import Sidebar from "./sidebar";

const Help = () => {
  return (
    <>
      <Sidebar>
        <div className="w-full p-4 md:p-0">
          <div className="w-full border border-[#CFCBCB] border-l-4 border-l-[#359E52] rounded-md p-4 font-primaryBold bg-white md:mx-3">
            Help
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-6 md:p-10 p-4">
          {/* Reach out to us */}
          <div className="md:w-[476px] md:h-[300px] bg-[#FFFFFF] flex flex-col p-6 md:p-10 rounded-t-[100px] rounded-r-0 rounded-b-0 rounded-l-[100px]">
            <div className="w-full font-primaryBold text-2xl text-black text-center">
              Reach Out To Us
            </div>
            <div className="grid gap-10 my-4 text-black font-primaryRegular">
              <div className="flex">
                <FiMail size={20} />
                <p className="mx-4">Email us</p>
                <p>@info.abhmarkets.com</p>
              </div>
              <div className="flex">
                <FiPhone size={20} />
                <p className="mx-4">Call us</p>
                <p>+2347061131509</p>
              </div>
            </div>
          </div>
          {/* content form */}
          <div className="md:w-[529px] bg-white border border-[#CFCBCB] p-4">
            <div className="w-full font-primaryBold text-2xl text-center">
              Send Us A Message
            </div>
            {/* form proper */}
            <div className="">
              <form
                // onSubmit={handleSubmit(submitHandler)}
                className="w-full mx-auto flex flex-col justify-center p-3 md:p-6 font-primaryRegular"
              >
                <div className="flex flex-col">
                  <div className="mb-4">
                    <label
                      className="block text-[#0C1415] font-bold mb-2"
                      for="name"
                    >
                      Name
                    </label>
                    <input
                      className="w-full border border-[#C1C6C5] p-3 text-[#0C1415] leading-tight"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-[#0C1415] font-bold mb-2"
                      for="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full border border-[#C1C6C5] p-3 text-[#0C1415] leading-tight"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>{" "}
                  <div className="mb-4">
                    <label
                      className="block text-[#0C1415] font-bold mb-2"
                      for="phone"
                    >
                      Phone
                    </label>
                    <input
                      className="w-full border border-[#C1C6C5] p-3 text-[#0C1415] leading-tight"
                      id="phone"
                      type="number"
                      placeholder="Enter your phone number"
                    />
                  </div>{" "}
                  <div className="mb-4">
                    <label
                      className="block text-[#0C1415] font-bold mb-2"
                      for="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="w-full border border-[#C1C6C5] p-3 text-[#0C1415] leading-tight"
                      id="message"
                      type="text"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="w-full h-[50px] bg-[#4CBD6B] text-white font-bold rounded"
                    >
                      Send message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Help;
