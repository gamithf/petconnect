import React from 'react';
import { Phone, Hospital, Stethoscope } from 'lucide-react';

export default function EmergencyContacts({ pet, onPetUpdate }) {
    const contacts = pet.emergencyContacts;
    return (
        <div className="bg-black/20 border border-red-500/50 ... h-full">
            <header className="p-6">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-red-400">
                    <Phone /><span>Emergency Contacts</span>
                </h3>
            </header>
            <div className="p-6 pt-0 space-y-6">
                <div className="flex items-center gap-4">
                    {/* ... Vet info display, using optional chaining */}
                    <p className="text-gray-300">{contacts?.vet?.name || 'Not specified'}</p>
                    <a href={`tel:${contacts?.vet?.phone}`} className="..."><Phone size={14}/> Call</a>
                </div>
                <div className="flex items-center gap-4">
                    {/* ... Hospital info display, using optional chaining */}
                    <p className="text-gray-300">{contacts?.hospital?.name || 'Not specified'}</p>
                    <a href={`tel:${contacts?.hospital?.phone}`} className="..."><Phone size={14}/> Call Now</a>
                </div>
            </div>
        </div>
    );
}