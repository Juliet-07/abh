import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Myproducts from "./myProducts";
// import DraftProducts from "./draft_products";
// import Discount from "./discount";
// import EditProduct from "./subPage/EditProduct";
// import AddProduct from "./subPage/AddProduct";
// import EditDiscount from "./subPage/EditDiscount";
// import AddDiscount from "./subPage/AddDiscount";

const Inventory = ({ currentTab }) => {
  const [subScreen, setSubScreen] = useState(false);
  const [CurrentScreen, setCurrentScreen] = useState("");

  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setSubScreen(true);
    } else {
      setSubScreen(false);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setSubScreen(true);
      } else {
        setSubScreen(false);
        setCurrentScreen("");
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleTabClick = (tab) => {};

  return (
    <>
      {CurrentScreen == "" && (
        <>
          {currentTab == "My Products" && (
            <Myproducts
              pushEdit={(id) => {
                setSubScreen(true);
                setCurrentScreen("edit");
                // router.push(`#edit`);
              }}
              pushAdd={(id) => {
                setSubScreen(true);
                setCurrentScreen("addProduct");
                // router.push(`#addProduct`);
              }}
            />
          )}
          {/* {currentTab == "Draft Products" && (
            <DraftProducts
              pushEdit={(id) => {
                setSubScreen(true);
                setCurrentScreen("edit");
                router.push(`#edit`);
              }}
              pushAdd={(id) => {
                setSubScreen(true);
                setCurrentScreen("addProduct");
                router.push(`#addProduct`);
              }}
            />
          )}
          {currentTab == "Discount" && (
            <Discount
              pushEdit={(id) => {
                setSubScreen(true);
                setCurrentScreen("editDiscount");
                router.push(`#editDiscount`);
              }}
              pushAdd={(id) => {
                setSubScreen(true);
                setCurrentScreen("addDiscount");
                router.push(`#addDiscount`);
              }}
            />
          )} */}
        </>
      )}

      {/* {CurrentScreen == "edit" && <EditProduct productId={""} />}
      {CurrentScreen == "editDiscount" && <EditDiscount productId={""} />}
      {CurrentScreen == "addDiscount" && <AddDiscount productId={""} />}
      {CurrentScreen == "addProduct" && <AddProduct productId={""} />} */}
    </>
  );
};

export default Inventory;
