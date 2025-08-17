import React from 'react';

export default function ChatHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="bg-teal-600 rounded-2xl p-6 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Prediction History</h2>
      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4">
        {history.map((entry, index) => (
          <div key={index} className="flex flex-col">
            {/* User Input Bubble */}
            <div className="bg-teal-200 p-4 rounded-lg self-end max-w-lg">
              <p className="text-xs text-black mb-1">
                <strong>Pet:</strong> {entry.pet} | <strong>Method:</strong> {entry.method}
              </p>
              <p className="text-gray-800">
                <strong>You:</strong> {entry.input instanceof File ? entry.input.name : entry.input}
              </p>
            </div>
            {/* Pawli Response Bubble */}
            <div className="bg-teal-800 text-white p-4 rounded-lg self-start max-w-lg mt-2">
              <p><strong>Pawli:</strong> {entry.response}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}