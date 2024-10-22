import React from "react";
import { ArrowLeftIcon, XIcon } from "@heroicons/react/solid";
import { useNavigate, useParams } from "react-router-dom";
import SuccessPopup from "../../components/SuccessPopup";
import OTPInput from "otp-input-react";

const EditProfile = () => {
  let navigate = useNavigate();

  const [showMessage, setPopup] = React.useState(false);
  const [message, setmessage] = React.useState("Profile Updated");
  const [showEmailupdate, setEmailupdate] = React.useState(false);
  const [showOTPWindow, setOTPWindow] = React.useState(false);
  const [OTP, setOTP] = React.useState("");
  
  return (
    <div className="w-full flex flex-col items-center relative font-primaryRegular">
      <br />
      {showMessage && (
        <SuccessPopup
          message={message}
          onClose={() => setPopup(false)}
        />
      )}
      {showOTPWindow && (
        <div className="w-full flex flex-1 items-start gap-[10px] overflow-y-scroll justify-center h-[100vh] fixed top-[0px] left-[0px] bg-[#00000099] z-[1000] ">
          <div className="w-[80%] max-w-[700px] mt-[60px] relative min-h-[300px] bg-white rounded-[8px] p-4 flex flex-col items-center justify-evenly ">
            <XIcon
              className="w-[30px] h-[30px] active:opacity-[0.5] absolute right-[10px] top-[10px] cursor-pointer"
              color="red"
              onClick={() => setOTPWindow(false)}
              // onClick={() => setOTPWindow(false)}
            />
            <b className="text-black text-[18px]">Input OTP</b>
            <br />
            <div className="w-full flex flex-col">
              <p>Enter OTP</p>
              <br />
              <OTPInput value={OTP} onChange={setOTP} 
              inputClassName={"border-[1px] w-[40px] h-[40px]"}
              autoFocus OTPLength={6} otpType="number" disabled={false}  />
              <br /> 
              <p className="text-[orangered] cursor-pointer active:opacity-[0.5]">resend</p>
              <br />
              <div className="w-full flex flex-row items-center gap-[20px] justify-center flex-wrap ">
              <button onClick={()=> {
                setEmailupdate(false);
                setOTPWindow(false)
                setOTP(false)
                setPopup(true)
              }}
              className="w-[180px] h-[40px] cursor-pointer active:opacity-[0.2] bg-green-500 rounded-[4px] text-white">
                Verify
              </button>
        
            </div>
            </div>
          </div>
        </div>
      )}
      {showEmailupdate && (
        <div className="w-full flex flex-1 items-start gap-[10px] overflow-y-scroll justify-center h-[100vh] fixed top-[0px] left-[0px] bg-[#00000099] z-[1000] ">
          <div className="w-[80%] max-w-[700px] mt-[60px] relative min-h-[300px] bg-white rounded-[8px] p-4 flex flex-col items-center justify-evenly ">
            <XIcon
              className="w-[30px] h-[30px] active:opacity-[0.5] absolute right-[10px] top-[10px] cursor-pointer"
              color="red"
              onClick={() => setEmailupdate(false)}
            />
            <b className="text-black text-[18px]">Change Email Address</b>
            <br />

            <div className="bg-[#18BBCC1F] w-full min-h-[16px] rounded-[8px] p-4">
              <p>
                Please enter your email address for account verification. We
                will send a One Time Password to the email
              </p>
            </div>
            <br />
            <br />
            <div className="flex flex-col w-full">
              <p>Current Email address</p>
              <input
                type="text"
                disabled
                value={"  timcodes@gmail.com"}
                className="w-full max-w-[500px] h-[50px] bg-white border-[1px] opacity-[0.8] "
              />
              <br />
              <p>New Email address</p>
              <input
                type="text"
                className="w-full max-w-[500px] h-[50px] bg-white border-[1px] "
              />
            </div>
            <br />
            <br />
            <div className="w-full flex flex-row items-center gap-[20px] justify-center flex-wrap ">
              <button onClick={()=> {
                setEmailupdate(false);
                setOTPWindow(true)
                setOTPWindow(true)
              }}
              className="w-[180px] h-[40px] cursor-pointer active:opacity-[0.2] bg-green-500 rounded-[4px] text-white">
                Update
              </button>
              <button className="w-[100px] h-[40px] cursor-pointer active:opacity-[0.2] bg-white border-[1px] rounded-[4px] text-black">
                cancle
              </button>
            </div>
            <br />
          </div>
        </div>
      )}
      <div className="w-[90%] flex flex-col gap-[5px]  p-[40px]  max-w-[800px] bg-white rounded-[10px] min-h-[431px] flex relative">
        <header className="w-[90%] absolute top-0 flex  flex-row  items-center justify-between  h-[70px]">
          <div
            className="flex  flex-row gap-4 cursor-pointer active:opacity-[0.5]"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeftIcon width={20} height={20} /> <b>Edit Profile</b>
          </div>

          {/* <button className='bg-white border-none'>Edit</button> */}
        </header>
        <br />

        <div className="w-full flex flex-row flex-wrap  gap-[20px]">
          <div className="w-[100px]  h-[100px] rounded-[100px] bg-[url(/profileImg.png)] bg-center bg-cover"></div>
          <div className="flex flex-1 flex-col gap-4 flex-wrap ">
            <div className="w-full flex flex-row flex-wrap  gap-4">
              <div className="flex flex-col flex-1 min-w-[250px]">
                <p>First name</p>
                <input type="text" className="w-full h-[40px] border-[1px]" />
              </div>
              <div className="flex flex-col flex-1 min-w-[250px]">
                <p>Last name</p>
                <input type="text" className="w-full h-[40px] border-[1px]" />
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-[250px]">
              <div className="flex items-center justify-between">
                <p>Email</p>
                <p
                  className="text-green-400 cursor-pointer active:opacity-[0.2]"
                  onClick={() => setEmailupdate(true)}
                >
                  change
                </p>
              </div>
              <input
                type="text"
                disabled
                className="w-full h-[40px] border-[1px]"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-[250px]">
              <p>Phone Number</p>
              <input type="text" className="w-full h-[40px] border-[1px]" />
            </div>

            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => setPopup(true)}
                className="w-[200px] h-[40px] cursor-pointer active:opacity-[0.4] bg-green-400 rounded-[4px] text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
