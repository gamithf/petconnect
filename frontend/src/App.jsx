import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ChatWidget from "./components/ai-services/ChatWidget";
import PetForm from "./pages/ai-service/PetForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <SideBar />
                <div className="flex-1 relative">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/pet-adoption" element={<PetAdoptionLost />} />
                    <Route path="/ai-services" element={<AI />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/vet-services" element={<VetService />} />
                    <Route path="/clinics" element={<Clinics />} />
                    <Route path="/clinics/:clinicId" element={<ClinicsInfo />} />
                    <Route path="/pet-form" element={<PetForm />} />
                  </Routes>
                  <ChatWidget />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
