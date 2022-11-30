import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./homepage";
import AdminSignUp from "./adminsignup";
import AdminLogin from "./adminlogin";
import UserLogin from "./userlogin";
import VotingControls from "./votingcontrols";
import VotingPage from "./votingpage";
import InsertFiles from "./insertfiles";
import PieChart from "./piechart";
import ThankYou from "./thankyou";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminsignup" element={<AdminSignUp />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/votingcontrols" element={<VotingControls />} />
        <Route path="/votingpage/:Email" element={<VotingPage />} />
        <Route path="/insertfiles" element={<InsertFiles />} />
        <Route path="/piechart" element={<PieChart />} />
        <Route path="/thankyou/:Email" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
