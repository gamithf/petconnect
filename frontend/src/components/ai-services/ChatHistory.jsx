import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => (
  <>
    {/* A subtle line to separate the main response from the disclaimer */}
    <hr className="my-3 border-white/20" /> 
    <div className="flex items-start gap-2 text-xs text-amber-200/90">
      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
      <span>
        <strong>Disclaimer:</strong> This is an AI-generated analysis and not a substitute for professional veterinary advice. Please consult a licensed veterinarian for any health concerns.
      </span>
    </div>
  </>
);


export default function ChatHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">💬 Prediction History</h2>
      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
        {history.map((entry, index) => (
          <div key={index} className="flex flex-col gap-2">
            {/* User Input Bubble */}
            <div className="bg-white/20 p-4 rounded-t-2xl rounded-l-2xl self-end max-w-lg shadow-md">
              <p className="text-xs text-teal-100 mb-1">
                <strong>Pet:</strong> {entry.pet} | <strong>Method:</strong> {entry.method}
              </p>
              <p className="text-white break-words">
                {entry.input instanceof File ? `Uploaded: ${entry.input.name}` : entry.input}
              </p>
            </div>
            
            {/* Pawli Response Bubble */}
            <div className="bg-black/20 text-white p-4 rounded-t-2xl rounded-r-2xl self-start max-w-lg shadow-md">
              <p className="font-semibold text-cyan-300 mb-1">🐾 Pawli's Analysis:</p>
              <p className="text-gray-100 break-words">{entry.response}</p>
              
              {/* --- CONDITIONAL DISCLAIMER LOGIC --- */}
              {/* 
                This will render the Disclaimer component if:
                1. A response exists.
                2. The response, when converted to lowercase, does NOT include the word "healthy".
              */}
              {entry.response && !entry.response.toLowerCase().includes('healthy') && (
                <Disclaimer />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}