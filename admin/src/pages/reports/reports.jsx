import React, { useState } from "react";
import { ArrowLeftIcon, DownloadIcon } from "@heroicons/react/outline";
import ReportsPaginatedTable from "../../components/ReportsTable";
import SalesTab from "./tabs/sales";
import InventoryTab from "./tabs/inventory";
import VendorTab from "./tabs/vendor";
import ComplianceTab from "./tabs/compliance";
import CustomersTab from "./tabs/customer";
import TransactionsTab from "./tabs/transaction";
import { CloudDownloadIcon } from "@heroicons/react/solid";

const Reports = () => {
  const [currentTab, setcurrentTab] = useState("Sales");
  const [Search, setSearchText] = useState("");
  const [Salesby, setSalesBy] = useState("category");

  return (
    <div className="font-primaryRegular">
      <br />
      <div className="flex flex-row justify-between items-center flex-wrap lg:flex-nowrap">
        <div className="w-full overflow-x-scroll remove-scrollbar py-2 ">
          <div className="flex flex-row flex-1 gap-[20px]">
            {[
              "Sales",
              "Inventory",
              "Vendor",
              "Customer",
              "Transaction",
              "Compliance",
            ].map((data, index) => {
              return (
                <div onClick={()=> setcurrentTab(data)}
                  style={
                    currentTab == data
                      ? { background: "green", color: "white" }
                      : { background: "white", color: "black" }
                  }
                  className="min-w-[100px] h-[40px] rounded-[6px] text-[14px] text-white flex items-center justify-center cursor-pointer active:opacity-[0.5]"
                >
                  <p>{data}</p>
                </div>
              );
            })}
          </div>
        </div>

        <button className="bg-green-100 ml-2 text-green-700 p-2 rounded-[8px] h-[40px] cursor-pointer items-center active:opacity-[0.5] flex flex-row gap-1 "> <CloudDownloadIcon width={20} height={20} /><p className="text-[14px]">download</p></button>
      </div>
      <br />
      {
        currentTab == "Sales" &&
        <SalesTab />
      }
      {
        currentTab == "Inventory" &&
        <InventoryTab />
      }
      {
        currentTab == "Compliance" &&
        <ComplianceTab />
      }
      {
        currentTab == "Customer" &&
        <CustomersTab />
      }
      {
        currentTab == "Vendor" &&
        <VendorTab />
      }
      {
        currentTab == "Transaction" &&
        <TransactionsTab />
      }
    </div>
  );
};

export default Reports;
