import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardRoute from "./DashboardRoute";
import Signin from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard/*" element={<DashboardRoute />} />
      </Routes>
    </>
  );
}

export default App;
