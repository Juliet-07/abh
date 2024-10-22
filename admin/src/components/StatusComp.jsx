import React from "react";

const StatusComponent = ({ status, textColor, bgColor, className }) => {
  return (
    <>
      <div style={{background: bgColor ? bgColor : "", color: textColor ? textColor : ""}} 
      className={`min-w-[100px] h-[40px] text-[16px] rounded-[10px] text-[#9e7500] bg-[#9e75001a] flex items-center justify-center ${className}`}>
        {status}
      </div>
    </>
  );
};

export default StatusComponent;
