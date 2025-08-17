import React, { useState, useEffect } from 'react';

export default function PetSelector({ selectedPet, setSelectedPet, method, setMethod }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets'); // Assuming you have a proxy setup
        if (response.ok) {
          const data = await response.json();
          setPets(data);
        }
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };
    fetchPets();
  }, []);



  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-blue-800 mb-2">🐾 Select Your Pet</label>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPet}
            onChange={(e) => {
              setSelectedPet(e.target.value);
              setMethod('');
            }}
            className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-blue-50 text-blue-900 shadow-sm focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choose Pet --</option>
            {pets.map(pet => (
              <option key={pet._id} value={pet._id}>{pet.type === 'dog' ? '🐶' : '🐱'} {pet.name}</option>
            ))}
          </select>
          <button className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">+</button>
        </div>
      </div>

      {selectedPet && (
        <div>
          <label className="block text-sm font-bold text-blue-800 mb-2">🔍 Prediction Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-blue-50 text-blue-900 shadow-sm focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choose Method --</option>
            <option value="symptoms">💊 Enter Symptoms</option>
            <option value="image">🖼️ Upload Image/Video</option>
          </select>
        </div>
      )}
    </div>
  );
}