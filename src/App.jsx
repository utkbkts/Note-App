import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PageLayout from "./layout/Pagelayout";
import Important from "./pages/Important";
import Calendar from "./pages/Calendar";
import Completed from "./pages/Completed";
import Detail from "./pages/Detail";
const App = () => {
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
      </Routes>
      </PageLayout>
    </div>
  );
};

export default App;
