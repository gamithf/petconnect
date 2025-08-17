import React, { useState, useEffect } from 'react';
import { apiRequest } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function PetSelector({ selectedPet, setSelectedPet, setSelectedPetType, method, setMethod }) {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await apiRequest("/pets", "GET");
        let data = response.data;
        if (data.length === 0 || !data) {
          navigate("/pet-form")
        } else setPets(data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-md font-bold text-white-800 mb-2">🐾 Select Your Pet</label>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPet}
            onChange={(e) => {
              setSelectedPet(e.target.value);
              setSelectedPetType(pets.find(pet => pet.name === e.target.value)?.type || '');
              setMethod('');
            }}
            className="w-full p-3 border border-black rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow"
          >
            <option value="" className="text-black">Choose Pet</option>
            {pets.map(pet => (
              <option key={pet._id} value={pet.name} className="w-full p-3 border border-black rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow bg-white text-black">{pet.type === 'dog' ? '🐶' : '🐱'} {pet.name}</option>
            ))}
          </select>
          <button className="px-4 py-3 bg-black text-white rounded-lg hover:bg-blue-600 transition" onClick={() => navigate("/pet-form")}>+</button>
        </div>
      </div>

      {selectedPet && (
        <div>
          <label className="block text-md font-bold text-white mb-2">🔍 Prediction Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 border border-black rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow"
          >
            <option value="" className="text-black">Choose Method</option>
            <option value="symptoms" className="text-black">💊 Enter Symptoms</option>
            <option value="image" className="text-black">🖼️ Upload Image/Video</option>
          </select>
        </div>
      )}
    </div>
  );
}