import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { SideBar } from "./components/common/SideBar";
import ProtectedRoute from "./routes/ProtectedRoute";

// Importing pages
import Home from "./pages/common/Home";
import PetAdoptionLost from "./pages/pet-adoption-lost/PetAdoptionLost";
import AI from "./pages/ai-service/AI";
import Community from "./pages/community/Community";
import VetService from "./pages/vet-services/VetService";
import LandingPage from "./pages/common/LandingPage";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import Clinics from "./pages/vet-services/Clinics";
import ClinicsInfo from "./pages/vet-services/ClinicsInfo";

// Layout wrapper to handle conditional styling
const AppLayout = () => {
  const location = useLocation();
  const isVetPage = location.pathname === "/vet-services" === true || location.pathname === "/clinics" || location.pathname === "/clinics/0" || location.pathname === "/clinics/1" || location.pathname === "/clinics/2" || location.pathname === "/clinics/3";

  return (
    <ProtectedRoute>
      <div className="flex">
        <SideBar />
        <div className={isVetPage ? "flex-1" : "flex-1 p-6"}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/pet-adoption" element={<PetAdoptionLost />} />
            <Route path="/ai-services" element={<AI />} />
            <Route path="/community" element={<Community />} />
            <Route path="/vet-services" element={<VetService />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/clinics/:clinicId" element={<ClinicsInfo />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout with conditional class */}
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
