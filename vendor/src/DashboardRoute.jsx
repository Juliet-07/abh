import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/analytics";
import Profile from "./pages/profile";
import Notifications from "./pages/notifications";
import AllOrders from "./pages/Orders/allOrders";
import TrackOrders from "./pages/Orders/trackOrders";
import OrderDetails from "./pages/Orders/orderDetails";
import MyProducts from "./pages/Inventory/myProducts";
import BulkUpload from "./pages/Inventory/bulkProducts";
import AddProduct from "./pages/Inventory/Add-Product/index";
import EditProduct from "./pages/Inventory/editProduct";
import DraftProducts from "./pages/Inventory/draftProducts";
import Discount from "./pages/Inventory/discount";
import Help from "./pages/help";
import Dropshippers from "./pages/dropshippers";

const DashboardRoute = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dropshippers" element={<Dropshippers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/help" element={<Help />} />
          <Route path="/allOrders" element={<AllOrders />} />
          <Route path="/trackOrders" element={<TrackOrders />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
          <Route path="/myProducts" element={<MyProducts />} />
          <Route path="/bulkUpload" element={<BulkUpload />} />
          <Route path="/addProducts" element={<AddProduct />} />
          <Route path="/editProduct" element={<EditProduct />} />
          <Route path="/draftProducts" element={<DraftProducts />} />
          <Route path="/discountProducts" element={<Discount />} />
        </Routes>
      </Layout>
    </>
  );
};

export default DashboardRoute;
