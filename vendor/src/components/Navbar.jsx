import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { miniSidebarInitialValue, RESPONSIVE_WIDTH } from "../utils/constants";
import { useWindowSize } from "../utils/use-window-size";
import { FaBell } from "react-icons/fa";
import Logo from "./Logo.jsx";
import {
  Menu,
  MenuItems,
  MenuButton,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { IoPersonSharp } from "react-icons/io5";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [miniSidebar, setMiniSidebar] = useAtom(miniSidebarInitialValue);

  const handleToggleSidebar = () => {
    setMiniSidebar(!miniSidebar);
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="hidden md:flex items-center justify-between h-[72px] px-6 p-2 shadow-md bg-[#359E52]">
      {/* <div>Dashboard</div> */}
      <div></div>
      {/* <div className="w-[80%] max-w-[500px] h-[40px] bg-white p-[10px] flex items-center rounded-[6px] ">
        <input
          type="text"
          className="w-full  bg-none border-none outline-none  placeholder:text-[12px] placeholder:text-[#37343566]"
          placeholder="Search for products"
        />
        <FiSearch width={16} height={16} color="#37343566" />
      </div> */}
      <div className="flex items-center px-4">
        <Link
          to="/dashboard/notifications"
          className="text-gray-700 mx-2 focus:outline-none"
        >
          <FaBell size={24} />
        </Link>
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="flex rounded-full text-sm focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="bg-gray-200 w-14 h-14 text-2xl text-black text-center p-2 rounded-full mx-4 my-2 flex items-center justify-center">
                <IoPersonSharp size={20} />
              </div>
            </MenuButton>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-primaryRegular">
              <MenuItem>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Your Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/dashboard/help"
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Help
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Logout
                </Link>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
