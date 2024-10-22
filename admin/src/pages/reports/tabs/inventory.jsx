import React from "react";
import ReportsPaginatedTable from "../../../components/ReportsTable";

const InventoryTab = () => {
  //   const [currentTab, setcurrentTab] = React.useState("Sales");
  const [Search, setSearchText] = React.useState("");
  const [Salesby, setSalesBy] = React.useState("category");

  return (
    <div className="font-primaryRegular">
      <br />

      <div className="w-full min-h-[103px] bg-white border gap-8 flex flex-col md:flex-row border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex md:items-center  p-4">
        <p className="font-primaryBold md:text-xl flex-[20]">Stock Movement</p>
        <div className="flex flex-[80] flex-row">
          <div className="flex flex-1 max-w-[500px] bg-[#F0F4F4] h-[40px] rounded-[4px] gap-2 border-[1px] border-[gainsboro] p-3 items-center justify-center">
            <input
              type="text"
              placeholder="Search by product ID"
              onInput={(e) => setSearchText(e.target.value)}
              className="flex flex-1 outline-none border-none bg-[#F0F4F4] text-[16px]"
            />
            <div className="min-w-[25px] h-[25px] bg-[url(/svgs/svgexport-1.svg)] bg-no-repeat bg-center bg-contain" />
          </div>
        </div>
      </div>
      <br />
      <div className="w-full flex md:flex-row flex-col gap-4  md:justify-between flex-wrap">
        <div className="flex flex-row gap-[20px] flex-wrap">
          <div className="flex flex-row items-center gap-[20px]">
            <b>From</b>
            <input
              aria-label="Date"
              type="date"
              className="h-[50px] p-4"
              onChange={(date) => alert(date.target.value)}
            />
          </div>
          <div className="flex flex-row items-center gap-[20px]">
            <b>To</b>
            <input
              aria-label="Date"
              type="date"
              className="h-[50px] p-4"
              onChange={(date) => alert(date.target.value)}
            />
          </div>
        </div>

   
      </div>
      <br />
      <div className="w-full flex flex-row flex-wrap gap-[20px]">
        <div className="bg-white w-[157px] md:w-[228px] md:h-[146px] h-[106px] rounded-[20px] border p-4">
          <p className="w-full h-[30px] border-b-[1px]">Total Sales</p>
          <div className="w-full h-full flex flex-1 flex-col items-center justify-center">
            <b>$0</b>
            <br />
          </div>
        </div>
        <div className="bg-white w-[157px] md:w-[228px] md:h-[146px] h-[106px] rounded-[20px] border p-4">
          <p className="w-full h-[30px] border-b-[1px]">Total Sales</p>
          <div className="w-full h-full flex flex-1 flex-col items-center justify-center">
            <b>$0</b>
            <br />
          </div>
        </div>
        <div className="bg-white w-[157px] md:w-[228px] md:h-[146px] h-[106px] rounded-[20px] border p-4">
          <p className="w-full h-[30px] border-b-[1px]">Total Sales</p>
          <div className="w-full h-full flex flex-1 flex-col items-center justify-center">
            <b>$0</b>
            <br />
          </div>
        </div>
      </div>
      <div className="w-full bg-white pb-4">
        <ReportsPaginatedTable
          tableHead={[
            "Date",
            "Product ID",
            "Product",
            "Category",
            "Vendor",
            "Stock-in",
            "Stock-out",
            "Current-stock",
          ]}
          searchText={Search}
          maxItems={10}
           // the data below is inserted as
            // if this dummy data array [{}, {}]
            // have this array contains [{id: "21351", name: "sample"}, {id: "21351", name: "sample2"}]
            // when it is mapped here for the first item in the array
            // dataFromAPI.map((items, index) => {
            // return [ items.id, items.name] - this what will be rendered
            // let me know if you don't understand :)

            tableData={[{}, {}].map((items, index) => {
              return [
                "0270273",
                "12351235",
                <div className="flex min-w-[200px] justify-center flex-row items-center gap-2">
                  <div className="w-[40px] h-[40px] rounded-[100px] bg-[url(/BrusselsSprouts.webp)] bg-no-repeat bg-center bg-cover" />
                  <div>
                    <b>Mint</b>
                    {/* <p className="text-[12px]">Grocery</p> */}
                  </div>
                </div>,
                "$21",
                "22",
                "58",
                "22",
                "58"
                
              ];
            })}
        />
      </div>
    </div>
  );
};

export default InventoryTab;
