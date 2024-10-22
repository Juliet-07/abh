import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Scrollbar from "./Scrollbar";
import { BsChevronDown, BsBarChartLineFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { GiBookmark } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { FaBell } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { SiFormstack } from "react-icons/si";
import {
  Menu,
  MenuItems,
  MenuButton,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { IoPersonSharp } from "react-icons/io5";

const MobileNavigation = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [vendors, setVendors] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const [submenuOpen, setSubmenuOpen] = useState({});

  const toggleSubmenu = (index) => {
    setSubmenuOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const Menus = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      title: "User Management",
      icon: <FaUserTie />,
      submenu: true,
      submenuItems: [
        { title: `New Vendors (${vendors.length})`, path: "/newVendors" },
        { title: "All Vendors", path: "/allVendors" },
        { title: "Customers", path: "/customers" },
      ],
    },
    {
      title: "Product Management",
      icon: <SiFormstack />,
      submenu: true,
      submenuItems: [
        { title: "Categories", path: "/categories" },
        {
          title: `New Products (${pendingProducts.length})`,
          path: "/newProducts",
        },
        { title: "All Products", path: "/allProducts" },
        // { title: "Inventory", path: "/inventory" },
        // { title: "Draft Products", path: "/forms/low-out-of-stock" },
        // { title: "Discount", path: "/forms/inventory" },
      ],
    },
    // {
    //   title: "Inventory",
    //   icon: <SiFormstack />,
    //   path: "/inventory",
    //   // submenu: true,
    //   // submenuItems: [
    //   //   { title: "All Inventory", path: "/forms/categories" },
    //   //   { title: "Restock", path: "/forms/all-products" },
    //   // ],
    // },
    {
      title: "Order Management",
      icon: <TbTruckDelivery />,
      submenu: true,
      submenuItems: [
        { title: "All Orders", path: "/allOrders" },
        // { title: "Track Orders", path: "/tracker" },
        { title: "Transactions", path: "/transactions" },
      ],
    },
    {
      title: "Drop-shippers",
      icon: <FaUserTie />,
      submenu: true,
      submenuItems: [
        { title: "All drop-shipping", path: "/dropshipping" },
        { title: "Subscribers", path: "/subscribers" },
      ],
    },

    {
      title: "Analytics",
      icon: <BsBarChartLineFill />,
      path: "/analytics",
    },
    { title: "Reports", path: "/reports", icon: <FcManager /> },
    { title: "Notifications", path: "/notifications", icon: <FaBell /> },
  ];

  const activeLink =
    "mx-4 flex justify-start items-center text-white text-xl space-x-1 font-primarySemibold bg-green-500 rounded-xl";

  const activeSubLink =
    "mx-4 flex justify-start items-center text-[#359E52] text-sm space-x-1 font-primarySemibold rounded-xl";

  const normalLink =
    "hover:bg-emerald-500 mt-3 mx-4 flex justify-start items-center space-x-1 font-primaryRegular";

  const SidebarLinks = ({ menu, index }) => {
    return (
      <>
        {menu.submenu ? (
          <div className={normalLink} onClick={() => toggleSubmenu(index)}>
            <li
              className={`flex items-center gap-x-2 cursor-pointer p-3 hover:text-[#359E52] hover:font-primaryBold rounded-md mt-2 ${
                menu.spacing ? "mt-10" : "mt-0"
              }`}
            >
              <span className="text-xl block float-left">{menu.icon}</span>
              <span className="text-sm font-medium duration-200">
                {menu.title}
              </span>
              <BsChevronDown
                className={`ml-auto transition-transform ${
                  submenuOpen[index] && "rotate-180"
                }`}
              />
            </li>
          </div>
        ) : (
          <NavLink
            to={menu.path}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            onClick={() => setNav(false)}
          >
            <li
              className={`flex items-center gap-x-2 cursor-pointer p-3 hover:text-[#359E52] hover:font-primaryBold rounded-md mt-2 ${
                menu.spacing ? "mt-10" : "mt-0"
              }`}
            >
              <span className="text-xl block float-left">{menu.icon}</span>
              <span className="text-sm font-medium duration-200">
                {menu.title}
              </span>
            </li>
          </NavLink>
        )}
        {menu.submenu && submenuOpen[index] && (
          <ul className="ml-6">
            {menu.submenuItems.map((submenuItem, subIndex) => (
              <NavLink
                key={subIndex}
                to={submenuItem.path}
                className={({ isActive }) =>
                  isActive ? activeSubLink : normalLink
                }
                onClick={() => setNav(false)}
              >
                <li className="flex items-center gap-x-2 cursor-pointer p-2 hover:text-[#359E52] hover:font-primaryRegular rounded-md">
                  <span className="text-sm font-medium">
                    {submenuItem.title}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>
        )}
      </>
    );
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const getAllVendors = () => {
      axios
        .get(`${apiURL}/vendors?filter.status=PENDING`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          // console.log(response.data.data.data);
          console.log(response.data.data.items);
          setVendors(response.data.data.items);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };
    const getAllProducts = () => {
      axios
        .get(`${apiURL}/products?filter.status=PENDING`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.data);
          setPendingProducts(response.data.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllProducts();
    getAllVendors();
  }, []);

  return (
    <div className="w-full md:hidden flex justify-between items-center h-[60px] mx-auto px-4 md:px-10 2xl:px-20 text-gray-600 fixed z-10 bg-white">
      {/* toggle and logo */}
      <div className="flex items-center">
        <div onClick={handleNav} className="mr-3">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <Logo className="w-[130px]" />
      </div>

      {/* Mobile hamburger */}
      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "fixed left-0 top-[60px] w-[414px] h-[532px] ease-in-out duration-500 bg-white z-10"
            : "fixed left-[-100%]"
        }
      >
        <div className="sidebar-scrollbar h-full w-full overflow-x-hidden">
          <Scrollbar
            className="h-full w-full"
            options={{
              scrollbars: {
                autoHide: "never",
              },
            }}
          >
            <ul>
              {Menus.map((menu, index) => (
                <SidebarLinks key={index} menu={menu} index={index} />
              ))}
            </ul>
          </Scrollbar>
        </div>
      </div>
      {/* search icon and profile */}
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="flex rounded-full text-sm focus:outline-none">
            <span className="sr-only">Open user menu</span>
            <div className="bg-gray-200 w-12 h-12 text-2xl text-black text-center p-2 rounded-full mx-4 my-2 flex items-center justify-center">
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
          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-primaryRegular">
            <MenuItem>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Your Profile
              </Link>
            </MenuItem>
            {/* <MenuItem>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Settings
                </a>
              )}
            </MenuItem> */}
            <MenuItem>
              <button
                onClick={logout}
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default MobileNavigation;
