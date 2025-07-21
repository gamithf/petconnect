import React from 'react';

export default function ChatHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Chat History</h2>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {history.map((entry, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1"><strong>Pet:</strong> {entry.pet} | <strong>Method:</strong> {entry.method}</p>
            <p><strong>You:</strong> {entry.input instanceof File ? entry.input.name : entry.input}</p>
            <p className="mt-2"><strong>Pawli:</strong> {entry.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
