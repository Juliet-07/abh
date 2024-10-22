import { XIcon } from "@heroicons/react/solid";
import React from "react"
import { useNavigate, useParams } from 'react-router-dom';

const SuccessPopup = ({message, onClose, onClick}) => {
    let router = useNavigate();
    return (
        <div className="w-full flex flex-1 items-center  justify-center h-[100vh] fixed top-[0px] left-[0px] bg-[#00000099] z-[1000] ">
            <div className="w-[80%] max-w-[500px] relative min-h-[300px] bg-white rounded-[8px] p-4 flex flex-col items-center justify-evenly ">
                <XIcon className="w-[30px] h-[30px] active:opacity-[0.5] absolute right-[10px] top-[10px] cursor-pointer"
                 color="red" onClick={()=> onClose()} />
                <img src="/svgs/clarity_success-standard-line.svg" alt="" width={50} height={50} />
                <p>{message}</p>
                <button onClick={()=> router(-1)} 
                 className="w-[180px] h-[40px] cursor-pointer active:opacity-[0.2] bg-green-500 rounded-[4px] text-white">
                Update
              </button>
            </div>
        </div>
    )
}

export default SuccessPopup;