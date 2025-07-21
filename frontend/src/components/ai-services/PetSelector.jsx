import React from 'react';

export default function PetSelector({ selectedPet, setSelectedPet, method, setMethod }) {
  return (
    <div className="flex flex-col space-y-6 p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border border-blue-200">
      <div>
        <label className="block text-sm font-semibold text-blue-700 mb-2">🐾 Select Your Pet</label>
        <select
          value={selectedPet}
          onChange={(e) => {
            setSelectedPet(e.target.value);
            setMethod('');
          }}
          className="w-full px-4 py-3 rounded-md border border-blue-300 bg-white text-blue-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">-- Choose Pet --</option>
          <option value="dog">🐶 Dog</option>
          <option value="cat">🐱 Cat</option>
        </select>
      </div>

      {selectedPet && (
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-2">🔍 Select Prediction Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-blue-300 bg-white text-blue-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">-- Choose Method --</option>
            <option value="symptoms">💊 Enter Symptoms</option>
            <option value="image">🖼️ Upload Image</option>
          </select>
        </div>
      )}
    </div>
  );
}
