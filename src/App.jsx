import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PageLayout from "./layout/Pagelayout";
import Important from "./pages/Important";
import Calendar from "./pages/Calendar";
import Completed from "./pages/Completed";
import Detail from "./pages/Detail";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const Item = JSON.parse(localStorage.getItem("admin"))
  return (
    <div>
      <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/important" element={<Important />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/detail/:detail" element={<Detail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={Item ? <AdminDashboard />:<Navigate to={"/"}/>} />
      </Routes>
      </PageLayout>
    </div>
  );
};

export default App;
