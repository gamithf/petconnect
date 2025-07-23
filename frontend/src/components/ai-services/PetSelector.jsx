import React from 'react';

export default function PetSelector({ selectedPet, setSelectedPet, method, setMethod }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-blue-800 mb-2">🐾 Select Your Pet</label>
        <select
          value={selectedPet}
          onChange={(e) => {
            setSelectedPet(e.target.value);
            setMethod('');
          }}
          className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-blue-50 text-blue-900 shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Choose Pet --</option>
          <option value="dog">🐶 Rocky</option>
          <option value="cat">🐱 Whiskers</option>
        </select>
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
