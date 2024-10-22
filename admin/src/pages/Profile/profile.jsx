import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center relative font-primaryRegular">
      <br />
      <div className="w-[90%] flex flex-col gap-[5px]  p-[40px]  max-w-[800px] bg-white rounded-[10px] min-h-[431px] flex relative">
        <header className="w-full  flex  flex-row  items-center justify-between  h-[70px]">
          <div
            className="flex  flex-row gap-4 cursor-pointer active:opacity-[0.5]"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeftIcon width={20} height={20} /> <b>Profile</b>
          </div>

          <Link to="/editProfile" className="bg-white border-none">
            Edit
          </Link>
        </header>
        <br />
        <div className="w-[100px]  h-[100px] rounded-[100px] bg-[url(/profileImg.png)] bg-center bg-cover"></div>
        <p className="text-[grey] text-[16px] mt-[20px]">Super Admin</p>
        <b className="text-[20px]">John Doe</b>
        <p className="text-[grey] text-[16px]">johndow@gmail.com</p>
        <p className="text-[grey] text-[16px]">+234805623233</p>
      </div>
    </div>
  );
};

export default Profile;
