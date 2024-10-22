import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import DashboardRoute from "./DashboardRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<DashboardRoute />} />
      </Routes>
    </>
  );
}

export default App;
