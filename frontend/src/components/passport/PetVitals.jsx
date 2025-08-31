import React from 'react';
import { Dog, Cat } from 'lucide-react'; // Example icons

// A simple replacement for the PetTypeIcon component
const PetTypeIcon = ({ type, className }) => {
  if (type === 'dog') return <Dog className={className} />;
  if (type === 'cat') return <Cat className={className} />;
  return null;
};

const VitalStat = ({ label, value }) => (
    <div className="text-center">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-bold text-white">{value}</p>
    </div>
);

export default function PetVitals({ pet }) {
    return (
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 text-white rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Simple Avatar replacement */}
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-5xl font-bold border-4 border-[#DEF2F1]">
                    {pet.avatarUrl ? <img src={pet.avatarUrl} alt={pet.name} className="w-full h-full object-cover rounded-full" /> : pet.name.charAt(0)}
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold">{pet.name}</h2>
                    <div className="flex items-center gap-2 justify-center md:justify-start text-gray-300">
                        <PetTypeIcon type={pet.type} className="w-5 h-5" />
                        <span>{pet.breed}</span>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4 w-full ...">
                    <VitalStat label="Age" value={`${pet.age || 'N/A'} years`} />
                    <VitalStat label="Weight" value={pet.weight || '80kg'} />
                    <VitalStat label="Gender" value={pet.gender || 'MALE'} />
                </div>
            </div>
        </div>
    );
}