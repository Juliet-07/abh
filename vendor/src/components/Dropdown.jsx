import React from "react";

const Dropdown = ({ title, data, onChange }) => {
  return (
    <div className="w-full h-[56px] p-4 flex flex-row items-center justify-between border-[#C1C6C5] border-[0.66px]">
      <p className="font-primarySemibold text-sm md:text-base">{title}</p>

      {/* <select
        name=""
        id=""
        onChange={(value) => onChange(value.target.value)}
        className="border-[#C1C6C5] border-[0.66px] w-[130px] "
      >
        {data.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select> */}
    </div>
  );
};

export default Dropdown;
