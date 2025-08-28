import React, { useState, useEffect } from 'react';
import { BookHeart, Plus, Smile, Zap, Shell, Wind, Frown, Battery, BatteryMedium, BatteryLow, Utensils, Drumstick, CircleSlash } from 'lucide-react';
import {apiRequest} from '../../api/api'

const moodOptions = [
  { value: 'happy', label: 'Happy', icon: <Smile /> },
  { value: 'playful', label: 'Playful', icon: <Zap /> },
  { value: 'calm', label: 'Calm', icon: <Shell /> },
  { value: 'anxious', label: 'Anxious', icon: <Wind /> },
  { value: 'lethargic', label: 'Lethargic', icon: <Frown /> },
];
// ... (Add other options arrays: energyOptions, appetiteOptions, poopOptions)
const energyOptions = [
  { value: 'high', label: 'High', icon: <Battery className="text-green-400" /> },
  { value: 'medium', label: 'Medium', icon: <BatteryMedium className="text-yellow-400" /> },
  { value: 'low', label: 'Low', icon: <BatteryLow className="text-red-400" /> },
];
const appetiteOptions = [
  { value: 'full', label: 'Full', icon: <Utensils className="text-green-400" /> },
  { value: 'partial', label: 'Partial', icon: <Drumstick className="text-yellow-400" /> },
  { value: 'none', label: 'None', icon: <CircleSlash className="text-red-400" /> },
];
const poopOptions = [
    { value: 'normal', label: 'Normal', icon: <div className="w-4 h-4 rounded-full bg-green-500" /> },
    { value: 'diarrhea', label: 'Diarrhea', icon: <div className="w-4 h-4 rounded-full bg-yellow-600" /> },
    { value: 'constipated', label: 'Constipated', icon: <div className="w-4 h-4 rounded-full bg-red-800" /> },
];


const Card = ({ children, className = "" }) => (
  <div className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-white border border-white/10 ${className}`}>
    {children}
  </div>
);

const QuickLogButton = ({ options, selected, onSelect, title }) => (
  <div>
    <h4 className="font-semibold text-sm mb-2 text-gray-200">{title}</h4>
    <div className="flex gap-2">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`flex-1 flex flex-col items-center justify-center h-16 gap-1 rounded-lg transition-all duration-200
            ${selected === option.value ? 'bg-gray-900 text-white shadow-md' : 'bg-white/10 hover:bg-white/20'}`}
        >
          {option.icon}
          <span className="text-xs">{option.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default function DailyJournal({ pet }) {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [appetite, setAppetite] = useState(null);
  const [poop, setPoop] = useState(null);
  const [notes, setNotes] = useState('');

  const [journalEntries, setJournalEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchEntries = async () => {
          if (!pet.id) return;
          setIsLoading(true);
          try {
              const response = await apiRequest(`/journal/${pet.id}`, "GET");
              setJournalEntries(response.data);
          } catch (err) {
              console.error("Failed to fetch journal entries:", err);
          } finally {
              setIsLoading(false);
          }
      };
      fetchEntries();
  }, [pet.id]);

  const handleLogEntry = async () => {
    setError('');
    if (!mood || !energy || !appetite || !poop) {
        setError("Please select an option for each category.");
        return;
    }

    const newEntry = { mood, energy, appetite, poop, notes };
    try {
      const response = await apiRequest(`/journal/${pet.id}`, "POST", newEntry);
      setJournalEntries([response.data, ...journalEntries]);
      setMood(null); setEnergy(null); setAppetite(null); setPoop(null); setNotes('');
    } catch (error) {
      setError(err.response?.data?.message || 'Failed to submit entry.');
    }
  };

  // Check if an entry for today has already been submitted
  const hasTodaysEntry = journalEntries.some(entry => 
      new Date(entry.date).toDateString() === new Date().toDateString()
  );

  return (
    <Card>
      <header>
        <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-200">
          <BookHeart className="text-[#DEF2F1]" />
          <span>Daily Journal</span>
        </h3>
        <p className="text-gray-300 mt-1">
          Log {pet.name}'s daily wellness in 30 seconds.
        </p>
      </header>
      <div className="mt-6 space-y-4">
          {hasTodaysEntry ? (
            <div className="text-center p-6 bg-black/30 rounded-lg">
                <h4 className="font-bold text-lg text-green-400">Great Job!</h4>
                <p className="text-gray-300">You've already logged {pet.name}'s journal for today.</p>
            </div>
          ) : (
            <>
              <div className="mt-6 space-y-4">
                <QuickLogButton options={moodOptions} selected={mood} onSelect={setMood} title="Mood" />
                <QuickLogButton options={energyOptions} selected={energy} onSelect={setEnergy} title="Energy Level" />
                <QuickLogButton options={appetiteOptions} selected={appetite} onSelect={setAppetite} title="Appetite" />
                <QuickLogButton options={poopOptions} selected={poop} onSelect={setPoop} title="Bowel Movement" />

                <div>
                    <textarea
                        placeholder={`Add any extra notes about ${pet.name}'s day...`}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full min-h-[60px] p-2 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-[#DEF2F1] focus:outline-none"
                    />
                </div>
                
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button onClick={handleLogEntry} className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer">
                    <Plus size={20} /> Log Today's Entry
                </button>
              </div>
            </>
            )}

            {/* Display recent entries */}
            <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-lg mb-2 text-gray-200">Recent Entries</h4>
                {isLoading ? <p>Loading entries...</p> : journalEntries.length > 0 ? (
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                        {journalEntries.slice(0, 5).map(entry => (
                            <li key={entry._id} className="text-sm p-2 bg-white/5 rounded">
                                <span className="font-bold">{new Date(entry.date).toLocaleDateString()}:</span> Mood: {entry.mood}, Energy: {entry.energy}
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-gray-400 text-sm">No entries yet.</p>}
            </div>
        </div>
    </Card>
  );
}