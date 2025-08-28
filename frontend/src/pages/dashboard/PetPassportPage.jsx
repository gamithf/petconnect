// src/pages/PetPassportPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, Share2, PawPrint } from 'lucide-react';
import { apiRequest } from '../../api/api';

// Import Passport Components
import PetVitals from '../../components/passport/PetVitals';
import CareSheet from '../../components/passport/CareSheet';
import EmergencyContacts from '../../components/passport/EmergencyContacts';
import BehavioralNotes from '../../components/passport/BehavioralNotes';
import HealthRecords from '../../components/passport/HealthRecords';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] to-[#0686b4] flex items-center justify-center">
    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white"></div>
  </div>
);

export default function PetPassportPage() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPetData = async () => {
      // API Comment: Fetch all data for a single pet.
      // API: GET /api/pets/:petId
      try {
        const response = await apiRequest(`/pets/${petId}`, "GET");
        setPet(response.data);
      } catch (error) {
        console.error("Failed to fetch pet data:", error);
        // Optional: navigate to a 'not found' page or back home
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPetData();
  }, [petId, navigate]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link Copied! A shareable link to this passport is on your clipboard.");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!pet) {
    return <div>Pet not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] text-white">
      <main className="container mx-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <PawPrint className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Pet Passport</h1>
          </div>
          <nav className="flex items-center gap-2">
            <button onClick={handleShare} className="flex items-center cursor-pointer gap-2 bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer">
              <Share2 size={16} /> Share
            </button>
            <button onClick={() => navigate('/home')} className="flex items-center gap-2 bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer">
              <Home size={16} /> Dashboard
            </button>
          </nav>
        </header>

        <div className="space-y-8">
          <PetVitals pet={pet} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CareSheet pet={pet} />
            <EmergencyContacts pet={pet} />
          </div>
          <BehavioralNotes pet={pet} />
          <HealthRecords pet={pet} />
        </div>
      </main>
    </div>
  );
}