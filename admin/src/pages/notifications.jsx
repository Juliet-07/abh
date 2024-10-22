import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowNarrowLeftIcon, BellIcon } from "@heroicons/react/solid";
import { ImWarning } from "react-icons/im";

const Notification = () => {
  const navigate = useNavigate();
  const notifications = [
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
    {
      title: "New order by Michael Farasin",
      description: "Review and accept your order",
    },
  ];
  return (
    <>
      <div className="w-full h-[90vh] flex flex-col overflow-y-scroll font-primaryRegular">
        <div className="w-full flex flex-col justify-center  bg-white  flex-wrap md:flex-nowrap gap-[20px] xl:p-[40px] p-[20px] rounded-[15px] md:rounded-[6px] ">
          <div className="h-[10px] w-full" />

          {notifications[0] ? (
            <>
              {notifications.map((message, index) => {
                return (
                  <div className="flex flex-row w-full min-h-[60px] items-center gap-4 active:opacity-5 border-b-2 py-2 cursor-pointer">
                    <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[100px] bg-[#CFCBCB38] flex items-center justify-center">
                          <ImWarning />
                        </div>
                        <div className="flex flex-col ">
                          <b className=" text-[#373435]">{message.title}</b>
                          <p className="">{message.description}</p>
                        </div>
                      </div>

                      <p className="text-[16px]">20 mins ago</p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="w-full min-h-[500px] flex flex-col items-center justify-center">
              <p>No notifications yet</p>

              <br />
              <br />

              <div className="flex flex-col items-center justify-center w-[238px] h-[238px] border-[0.9px] rounded-full border-[#359E52]">
                <div className="flex flex-col items-center justify-center w-[158.67px] h-[158.67px] border-[0.9px] rounded-full bg-[#8BCB901F]">
                  <BellIcon width={50} height={50} color="#359E52" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
