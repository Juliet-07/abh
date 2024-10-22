import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import MobileNavigation from "./MobileNav";
import Logo from "./Logo";
import { ChevronRightIcon } from "@heroicons/react/outline";
import DashboardIcon from "../assets/dashboard.svg";
import OrdersIcon from "../assets/orders.svg";
import InventoryIcon from "../assets/inventory.svg";
import AnalyticsIcon from "../assets/analytics.svg";
import { TfiPackage } from "react-icons/tfi";

const Layout = ({ children }) => {
  const [submenuOpen, setSubmenuOpen] = useState({});

  const toggleSubmenu = (index) => {
    setSubmenuOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const Menus = [
    {
      title: "Dashboard",
      icon: <img src={DashboardIcon} />,
      path: "/dashboard/home",
    },
    {
      title: "Inventory",
      icon: <img src={InventoryIcon} />,
      submenu: true,
      submenuItems: [
        { title: "My Products", path: "/dashboard/myProducts" },
        // { title: "Draft Products", path: "/dashboard/draftProducts" },
        // { title: "Discount", path: "/dashboard/discountProducts" },
      ],
    },
    {
      title: "Orders",
      icon: <img src={OrdersIcon} />,
      submenu: true,
      submenuItems: [
        { title: "All Orders", path: "/dashboard/allOrders" },
        // { title: "Track Orders", path: "/dashboard/trackOrders" },
      ],
    },
    {
      title: "Dropshippers",
      icon: <TfiPackage />,
      path: "/dashboard/dropshippers",
    },
    {
      title: "Analytics",
      icon: <img src={AnalyticsIcon} />,
      path: "/dashboard/analytics",
    },
  ];

  const activeLink =
    "mx-4 flex justify-start items-center text-[#373435] text-xl space-x-1 font-primaryRegular bg-[#F1FAF2] rounded-xl";

  const activeSubLink =
    "mx-4 flex justify-start items-center text-[#359E52] text-sm space-x-1 font-primarySemibold rounded-xl";

  const normalLink =
    "mt-3 mx-4 flex justify-start items-center space-x-1 font-primaryRegular text-[#373435]";

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
              <ChevronRightIcon
                className={`ml-auto transition-transform duration-[0.2s] ${
                  submenuOpen[index] && "rotate-90"
                }`}
                width={14}
                height={14}
              />
            </li>
          </div>
        ) : (
          <NavLink
            to={menu.path}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
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

  const handleToggleSidebar = () => {
    setMiniSidebar(!miniSidebar);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <MobileNavigation />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`hidden md:block w-[250px] h-screen bg-[#ffffff] duration-300 relative`}
        >
          <div className="flex items-center justify-center my-6">
            <Logo className="w-[180px]" />
          </div>
          <div className="sidebar-scrollbar h-full w-full overflow-x-hidden">
            <ul>
              {Menus.map((menu, index) => (
                <SidebarLinks key={index} menu={menu} index={index} />
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden md:block flex-1">
          <Navbar onToggleSidebar={handleToggleSidebar} />
          <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] pt-20 p-5 md:p-4 bg-gray-100 no-scrollbar">
            {children}
          </main>
        </div>
        {/* Mobile Content */}
        <main className="flex-1 md:hidden overflow-y-auto h-[calc(100vh-64px)] pt-20 p-5 md:p-4 bg-gray-100 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
