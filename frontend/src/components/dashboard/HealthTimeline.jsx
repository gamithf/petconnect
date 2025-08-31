import React, {useState} from 'react';
import { Download, PlusSquare, Stethoscope, Beaker, Plus, X } from 'lucide-react';
import { apiRequest } from '../../api/api';

const eventIcons = {
  vaccination: <PlusSquare className="text-blue-400" />,
  appointment: <Stethoscope className="text-green-400" />,
  medication: <Beaker className="text-purple-400" />,
  default: <Stethoscope className="text-gray-400" />
};



// This is a sub-component used by HealthTimeline
const EventCard = ({ event, isLast }) => {
  const icon = eventIcons[event.type] || eventIcons.default;
  return (
    <div className="relative pb-8">
      {!isLast && <div className="absolute left-[11px] top-8 h-full w-0.5 bg-white/20"></div>}
      <div className="flex items-start gap-4">
        <div className="bg-gray-800 rounded-full p-2 z-10">{icon}</div>
        <div className="flex-1">
          <p className="font-bold text-lg text-white">{event.title}</p>
          <p className="text-sm text-gray-300">{new Date(event.date).toLocaleDateString()}</p>
          <p className="mt-2 text-gray-200">{event.details}</p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ children, className = "" }) => (
    <div className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-white border border-white/10 ${className}`}>
        {children}
    </div>
);

export default function HealthTimeline({ pet }) {
    // API Comment: The 'healthTimeline' array should be part of the main pet object fetched for the dashboard.
    // API: GET /api/pets/{pet.id} (This endpoint should return the pet's full profile including the timeline)
    const MOCK_PET = {
        id: 1,
        name: 'Buddy',
        healthTimeline: [
            { id: 1, type: 'appointment', title: 'Annual Check-up', date: '2023-11-15', details: 'Vet confirmed Buddy is healthy. All vitals are normal.' },
            { id: 2, type: 'vaccination', title: 'Rabies Booster Shot', date: '2023-08-20', details: 'Received the 3-year rabies vaccine.' },
            { id: 3, type: 'medication', title: 'Flea & Tick Treatment', date: '2023-12-01', details: 'Monthly application of Frontline.' },
        ]
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ type: 'appointment', date: '', title: '', details: '' });
    const [timeline, setTimeline] = useState(MOCK_PET.healthTimeline);
    const sortedTimeline = [...timeline].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await apiRequest(`/timeline/${pet.id}`, 'POST', newEvent);
            onTimelineUpdate({ ...pet, healthTimeline: response.data });
            setIsModalOpen(false);
            setNewEvent({ type: 'appointment', date: '', title: '', details: '' });
        } catch (error) {
            console.error("Failed to add timeline event:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
    }

    return (
        <>
            <Card>
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-3xl font-bold text-gray-200">{pet.name}'s Health Timeline</h3>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <Plus size={16} /> Add Event
                        </button>
                        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer">
                            <Download size={16} />
                            Export as PDF
                        </button>
                    </div>
                </header>
                <div>
                    {sortedTimeline.length > 0 ? (
                        <div>
                            {sortedTimeline.map((event, index) => (
                                <EventCard key={event.id} event={event} isLast={index === sortedTimeline.length - 1} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-300">
                            <p className="text-lg">No health events recorded for {pet.name} yet.</p>
                            <p>Add a vaccination or appointment to get started!</p>
                        </div>
                    )}
                </div>
            </Card>
            
            {/* --- Add Event Modal --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#17252a] p-8 rounded-2xl w-full max-w-md border border-white/20 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white">Add New Health Event</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X/></button>
                        </div>
                        <form onSubmit={handleAddEvent} className="space-y-4">
                             <div>
                                <label htmlFor="type" className="block text-sm font-semibold mb-1 text-gray-200">Event Type</label>
                                <select name="type" id="type" value={newEvent.type} onChange={handleInputChange} className="w-full p-2.5 bg-gray-700 rounded-md text-white border border-gray-600 focus:ring-2 focus:ring-cyan-400 outline-none">
                                    <option value="appointment">Appointment</option>
                                    <option value="vaccination">Vaccination</option>
                                    <option value="medication">Medication</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold mb-1 text-gray-200">Title</label>
                                <input id="title" name="title" type="text" value={newEvent.title} onChange={handleInputChange} required className="w-full p-2 bg-gray-700 rounded-md text-white border border-gray-600 focus:ring-2 focus:ring-cyan-400 outline-none"/>
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-semibold mb-1 text-gray-200">Date</label>
                                <input id="date" name="date" type="date" value={newEvent.date} onChange={handleInputChange} required className="w-full p-2 bg-gray-700 rounded-md text-white border border-gray-600 focus:ring-2 focus:ring-cyan-400 outline-none"/>
                            </div>
                             <div>
                                <label htmlFor="details" className="block text-sm font-semibold mb-1 text-gray-200">Details</label>
                                <textarea id="details" name="details" value={newEvent.details} onChange={handleInputChange} rows="3" className="w-full p-2 bg-gray-700 rounded-md text-white border border-gray-600 focus:ring-2 focus:ring-cyan-400 outline-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300">Save Event</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}