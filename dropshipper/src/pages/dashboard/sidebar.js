import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter
import { FiBox, FiCreditCard, FiHelpCircle } from "react-icons/fi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlineInventory } from "react-icons/md";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
import Layout from "@layout/Layout";

const Sidebar = ({ title, description, children }) => {
  const { isLoading } = useContext(SidebarContext);
  const router = useRouter(); // Use the router hook

  const sideMenu = [
    {
      title: "Dashboard",
      icon: <MdOutlineDashboard />,
      href: "/dashboard/home",
    },
    {
      title: "Inventory",
      icon: <MdOutlineInventory />,
      href: "/dashboard/inventory", // Add href value for Inventory
    },
    {
      title: "Orders",
      icon: <FiBox />,
      href: "/dashboard/orders", // Add href value for Orders
    },
    // {
    //   title: "Payment",
    //   icon: <FiCreditCard />,
    //   href: "/dashboard/payment", // Add href value for Payment
    // },
    {
      title: "Subscription",
      icon: <AiOutlineDollarCircle />,
      href: "/dashboard/subscription", // Add href value for Subscription
    },
    {
      title: "My Profile",
      icon: <IoPersonCircleSharp />,
      href: "/dashboard/profile", // Add href value for Payment
    },
    {
      title: "Help",
      icon: <FiHelpCircle />,
      href: "/dashboard/help", // Add href value for Help
    },
  ];

  const activeLink =
    "mx-4 flex items-center text-[#359E52] space-x-1 font-primaryRegular bg-[#8BCB90]/[8.5%] border-l-2 border-l-[#359E52] p-2";

  const normalLink =
    "mt-3 mx-4 flex items-center space-x-1 font-primaryRegular text-[#373435]";

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout title={title ? title : "Dashboard"}>
          <div className="p-0 md:p-10 flex items-stretch">
            {/* side nav */}
            <div className="w-64 h-screen bg-white shadow-lg hidden md:block">
              <div className="mb-4 p-3">
                <h2 className="text-sm text-gray-800">My Account</h2>
              </div>
              <ul className="space-y-4">
                {sideMenu.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                      <a
                        className={
                          router.pathname === item.href
                            ? activeLink
                            : normalLink
                        }
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* content */}
            <div className="w-full">{children}</div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Sidebar;
