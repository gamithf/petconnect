import React from 'react';

// API Comment: This component will need to get the list of pets for the logged-in user.
// API: GET /api/pets
// You would replace the 'pets' prop with data fetched from this API.

export default function PetSelector({ pets, selectedPetId, onSelectPet }) {
  return (
    <div className="flex justify-center items-center flex-wrap gap-4 mb-12">
      <h2 className="text-2xl font-semibold text-gray-800">My Pets:</h2>
      <div className="flex gap-3 bg-black/20 p-2 rounded-full">
        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => onSelectPet(pet.id)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedPetId === pet.id
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-transparent text-gray-200 hover:bg-white/20'
            }`}
          >
            {pet.name}
          </button>
        ))}
      </div>
    </div>
  );
}