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
        <label className="block text-md font-semibold text-gray-200 mb-2">🐾 Select Your Pet</label>
        <select
          value={selectedPet}
          onChange={(e) => {
            setSelectedPet(e.target.value);
            setSelectedPetType(pets.find(pet => pet.name === e.target.value)?.type || '');
            setMethod('');
          }}
          className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 outline-none transition-all duration-300"
        >
          <option value="" className="bg-teal-800 text-gray-300">Choose a pet...</option>
          {pets.map(pet => (
            <option key={pet._id} value={pet.name} className="bg-teal-800 text-white">
              {pet.type === 'dog' ? '🐶' : '🐱'} {pet.name}
            </option>
          ))}
        </select>
      </div>

      {selectedPet && (
        <div>
          <label className="block text-md font-semibold text-gray-200 mb-2">🔍 Prediction Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 outline-none transition-all duration-300"
          >
            <option value="" className="bg-teal-800 text-gray-300">Choose a method...</option>
            <option value="symptoms" className="bg-teal-800 text-white">💊 Enter Symptoms</option>
            <option value="image" className="bg-teal-800 text-white">🖼️ Upload Image/Video</option>
          </select>
        </div>
      )}
    </div>
  );
}