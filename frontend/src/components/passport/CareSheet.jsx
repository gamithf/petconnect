import React from 'react';
import { BookOpenCheck, Bone, Pill, SunMoon } from 'lucide-react';

export default function CareSheet({ pet }) {
    // API Comment: Future enhancement could involve an "Edit" button
    // that opens a form and sends a PUT request to /api/pets/:petId
    const sheet = pet.careSheet;
    return (
        <div className="bg-black/20 ... h-full">
            <header className="p-6">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-[#DEF2F1]">
                    <BookOpenCheck /><span>Daily Care Sheet</span>
                </h3>
            </header>
            <div className="p-6 pt-0 space-y-6">
                <div>
                    <h4 className="font-bold ..."><Bone size={20}/> Feeding Instructions</h4>
                    <p className="text-gray-300">{sheet?.feeding?.instructions || 'Not specified.'}</p>
                    <p className="text-sm ... mt-1">Schedule: {sheet?.feeding?.schedule || 'Not specified.'}</p>
                </div>
                <div>
                    <h4 className="font-bold ..."><Pill size={20}/> Medications</h4>
                    {sheet?.medications?.length > 0 ? (
                        <ul className="list-disc ...">{sheet.medications.map((med, i) => <li key={i}>{med}</li>)}</ul>
                    ) : <p className="text-gray-400">No current medications.</p>}
                </div>
                <div>
                    <h4 className="font-bold ..."><SunMoon size={20}/> Daily Routine</h4>
                    <p className="text-gray-300">{sheet?.routine || 'Not specified.'}</p>
                </div>
            </div>
        </div>
    );
}