import React from 'react';

export default function ChatHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl p-6 shadow-md border border-blue-100">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">💬 Chat History</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {history.map((entry, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg shadow">
            <p className="text-sm text-blue-700 mb-1">
              <strong>Pet:</strong> {entry.pet} | <strong>Method:</strong> {entry.method}
            </p>
            <p><strong>You:</strong> {entry.input instanceof File ? entry.input.name : entry.input}</p>
            <p className="mt-2 text-blue-900"><strong>Pawli:</strong> {entry.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
