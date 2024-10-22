import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import NewVendors from "./pages/UserManager/newVendors";
import CreateVendor from "./pages/UserManager/createVendor";
import AllVendors from "./pages/UserManager/allVendors";
import VendorDetails from "./pages/UserManager/vendorDetails";
import Categories from "./pages/ProductManager/categories";
import NewProducts from "./pages/ProductManager/newProducts";
import AllProducts from "./pages/ProductManager/allProducts";
import CustomerDetails from "./pages/UserManager/customerDetails";
import Customers from "./pages/UserManager/customers";
import TrackOrders from "./pages/OrderManager/trackOrders";
import AllOrders from "./pages/OrderManager/allOrders";
import Transactions from "./pages/OrderManager/transactions";
import Analytics from "./pages/analytics";
import Profile from "./pages/Profile/profile";
import Notifications from "./pages/notifications";
import Inventory from "./pages/ProductManager/inventory";
import OrderDetails from "./pages/OrderManager/orderDetails";
import UsersActivity from "./pages/UserManager/UserAcitvity";
import EditProfile from "./pages/Profile/editProfile";
import Reports from "./pages/reports/reports";
import ActiveUsers from "./components/userActivity/activeUsers";
import InActiveUsers from "./components/userActivity/inactiveUsers";
import Subscribers from "./pages/DropShippers/subscribers";
import AllDropShipping from "./pages/DropShippers/all-drop-shipping";

function DashboardRoute() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newVendors" element={<NewVendors />} />
          <Route path="/createVendors" element={<CreateVendor />} />
          <Route path="/allVendors" element={<AllVendors />} />
          <Route path="/vendorDetails" element={<VendorDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/newProducts" element={<NewProducts />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customerDetails" element={<CustomerDetails />} />
          <Route path="/tracker" element={<TrackOrders />} />
          <Route path="/allOrders" element={<AllOrders />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route path="/dropshipping" element={<AllDropShipping />} />
          {/* <Route path="/usersActivity/:type" element={<UsersActivity />} /> */}
          <Route path="/usersActivity/active" element={<ActiveUsers />} />
          <Route path="/usersActivity/inactive" element={<InActiveUsers />} />
        </Routes>
      </Layout>
    </>
  );
}

export default DashboardRoute;
