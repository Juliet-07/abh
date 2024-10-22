import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import StatusComponent from "./StatusComp";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const PaginatedTable = ({ tableHead, tableData, maxItems, searchText }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  const endOffset = itemOffset + maxItems;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = tableData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(tableData.length / maxItems);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * maxItems) % tableData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div class="overflow-x-auto mt-[20px] mb-4">
        <table class="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="h-[50px]">
            <tr class="bg-gray-50">
              {tableHead.map((data, index) => {
                return <th class="px-4 py-2 text-[14px] text-black min-w-[100px]">{data}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {!searchText &&
              currentItems &&
              currentItems.map((data, index) => {
                return (
                  <tr class="border-b border-[0 solid #e5e7eb] min-h-[60px] border-dotted ">
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        123456{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center gap-[10px]">
                        <div className="w-[40px] h-[40px] rounded-[100px] bg-[#009f7f1a] flex items-center justify-center">
                          <b className="text-[20px] text-[teal]">J</b>{" "}
                        </div>
                        <div className="flex flex-col ">
                          <b className="text-[14px]">{data.customer_name} </b>
                          <p className="text-[12px] text-[grey]">john@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        Product {index}{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        2024-06-26{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        $100.00{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        <StatusComponent status={"Shipped"} className={""} />
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      {" "}
                      <div className="flex flex-row justify-center text-[13px]">
                        <img
                          src="/svgs/svgexport-44.svg"
                          alt=""
                          className="w-4 h-4 active:opacity-[0.5] cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            {searchText &&
              tableData &&
              tableData.map((data, index) => {
                if (
                  data.customer_name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                  return (
                    <tr class="border-b border-[0 solid #e5e7eb] min-h-[60px] border-dotted ">
                      <td class="px-4 py-2 min-w-[100px]">
                        <div className="flex flex-row justify-center text-[13px]">
                          123456{" "}
                        </div>
                      </td>
                      <td class="px-4 py-2 min-w-[100px]">
                        <div className="flex flex-row justify-center gap-[10px]">
                          <div className="w-[35px] h-[35px] rounded-[100px] bg-[#009f7f1a] flex items-center justify-center">
                            <b className="text-[18px] text-[teal]">J</b>{" "}
                          </div>
                          <div className="flex flex-col ">
                          <b className="text-[14px]">{data.customer_name} </b>
                          <p className="text-[12px] text-[grey]">john@gmail.com</p>
                        </div>
                        </div>
                      </td>
                      <td class="px-4 py-2 min-w-[100px]">
                        <div className="flex flex-row justify-center text-[13px]">
                          Product{" "}
                        </div>
                      </td>
                      <td class="px-4 py-2 min-w-[100px]">
                        <div className="flex flex-row justify-center text-[13px]">
                          2024-06-26{" "}
                        </div>
                      </td>
                      <td class="px-4 py-2 min-w-[100px]">
                        <div className="flex flex-row justify-center text-[13px]">
                          $100.00{" "}
                        </div>
                      </td>
                      <td class="px-4 py-2 min-w-[100px]">
                        <div className="flex flex-row justify-center text-[13px]">
                          <StatusComponent status={"Shipped"} className={"bg-pink-100 text-pink-500"} />
                        </div>
                      </td>
                      <td class="px-4 py-2 min-w-[100px]">
                        {" "}
                        <div className="flex flex-row justify-center text-[13px]">
                          <img
                            src="/svgs/svgexport-44.svg"
                            alt=""
                            className="w-4 h-4 active:opacity-[0.5] cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  );
              })}

            {!currentItems && <p>no result</p>}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<div className="flex items-center text-[14px]">next <ChevronRightIcon width={15} height={15} /> </div>}
        previousLabel={<p className="flex items-center text-[14px]"><ChevronLeftIcon width={15} height={15} /> prev</p>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="prevBtn"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="nextBtn"
        // breakLabel="..."
        breakAriaLabels={"..."}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      {/* </div> */}
    </>
  );
};
export default PaginatedTable;
