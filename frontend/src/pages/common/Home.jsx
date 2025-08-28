import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heroAnimation from "../../assets/lottie/pet-hero.json";
import { FaPaw, FaRobot, FaStethoscope, FaFileAlt, FaUsers, FaArrowRight } from "react-icons/fa";
import { useChat } from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/api";

// Import all your dashboard components
import PetSelector from "../../components/dashboard/PetSelector";
import WellnessScore from "../../components/dashboard/WellnessScore";
import DailyJournal from "../../components/dashboard/DailyJournal";
import JournalInsights from "../../components/dashboard/JournalInsights";
import AITrainingCoach from "../../components/dashboard/AITrainingCoach";
import HealthTimeline from "../../components/dashboard/HealthTimeline";
import SmartReminders from "../../components/dashboard/SmartReminders";
import ProactiveHealthDashboard from "../../components/dashboard/ProactiveHealthDashboard";
import NoPetsWelcome from "../../components/dashboard/NoPetsWelcome";

// --- Mock Data ---
// NOTE: In a real app, this data would be fetched from your API
const mockPets = [
  { 
    id: '1', 
    name: 'Buddy', 
    species: 'Dog',
    breed: 'Golden Retriever', // Added for ProactiveHealthDashboard
    healthTimeline: [
      { id: 't1', type: 'appointment', date: '2023-10-25', title: 'Annual Check-up', details: 'Vet: Dr. Smith. All clear.' },
      { id: 't2', type: 'vaccination', date: '2023-10-25', title: 'Rabies Vaccine', details: 'Next due in 1 year.' },
      { id: 't3', type: 'medication', date: '2023-09-01', title: 'Flea & Tick Prevention', details: 'Applied monthly.' },
    ],
    journal: [ /* ... journal entries would go here ... */ ]
  },
  { 
    id: '2', 
    name: 'Lucy', 
    species: 'Cat',
    breed: 'Siamese',
    healthTimeline: [
       { id: 't4', type: 'appointment', date: '2023-11-15', title: 'Dental Cleaning', details: 'Vet: Dr. Evans. Recommended softer food.' },
    ],
    journal: []
  },
];

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] to-[#0686b4] flex items-center justify-center">
    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white"></div>
  </div>
);

export default function Home() {
  const { openChat } = useChat();
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API fetch
    // setPets(mockPets);
    // if (mockPets.length > 0) {
    //   setSelectedPetId(mockPets[0].id);
    // }
    const fetchPets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- API CALL ---
        const response = await apiRequest("/pets", "GET");
        
        setPets(response.data);
        if (response.data.length > 0) {
          setSelectedPetId(response.data[0].id); 
        }
      } catch (err) {
        console.error("Failed to fetch pets:", err);
        setError("Could not load your pet data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handlePetUpdate = (updatedPet) => {
      setPets(currentPets => 
          currentPets.map(p => p.id === updatedPet.id ? updatedPet : p)
      );
  };

  const selectedPet = pets.find((p) => p.id === selectedPetId);
  const navButtonClass = "flex items-center gap-2 bg-black/20 hover:bg-black/40 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 cursor-pointer";

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] to-[#0686b4] flex items-center justify-center text-white text-2xl font-bold">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] text-white overflow-y-auto">
      <main className="container mx-auto px-4 md:px-8 py-6">
        <header className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            {/* <FaPaw className="w-8 h-8 text-gray-800" /> */}
          </div>
          {/* Only show nav links if there's a selected pet */}
          {selectedPet && (
            <nav className="hidden md:flex items-center gap-3">
              <button onClick={() => navigate('/vets')} className={navButtonClass}><FaStethoscope /> Find a Vet</button>
              <button onClick={() => navigate(`/passport/${selectedPet.id}`)} className={navButtonClass}><FaFileAlt /> Passport</button>
              <button onClick={() => navigate('/analyzer')} className={navButtonClass}><FaRobot /> AI Analyzer</button>
              <button onClick={() => navigate('/community')} className={navButtonClass}><FaUsers /> Community</button>
            </nav>
          )}
        </header>

        {/* --- CONDITIONAL CONTENT: DASHBOARD OR WELCOME SCREEN --- */}
        {pets.length > 0 && selectedPet ? (
          <section className="py-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Pet's Dashboard</h2>
              <p className="text-lg text-gray-200">
                Proactive health monitoring for {selectedPet.name}.
              </p>
            </div>

            <PetSelector pets={pets} selectedPetId={selectedPetId} onSelectPet={setSelectedPetId} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-3 space-y-8">
                <WellnessScore pet={selectedPet} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DailyJournal pet={selectedPet} onJournalUpdate={handlePetUpdate} />
                  <JournalInsights pet={selectedPet} />
                </div>
                <HealthTimeline pet={selectedPet} onTimelineUpdate={handlePetUpdate} />
                <ProactiveHealthDashboard pet={selectedPet} />
                <AITrainingCoach pet={selectedPet} />
              </div>
              <div className="lg:col-span-2">
                <SmartReminders pet={selectedPet} />
              </div>
            </div>
          </section>
        ) : (
          <NoPetsWelcome />
        )}
      </main>
    </div>
  );
}