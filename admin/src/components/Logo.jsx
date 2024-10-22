import React from "react";
import LogoImage from "../assets/abh_logo.png";

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <img src={LogoImage} alt="ABH Logo" />
    </div>
  );
};

export default Logo;
