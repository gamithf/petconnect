import React, { useState, useEffect } from 'react';

export default function PredictionForm({ method, inputData, setInputData }) {
  const [symptoms, setSymptoms] = useState(['', '', '', '', '']);

  // Sync combined symptom string with parent state
  useEffect(() => {
    if (method === 'symptoms') {
      const combined = symptoms.filter(Boolean).join(', ');
      setInputData(combined);
    }
  }, [symptoms, method, setInputData]);

  if (!method) return null;

  if (method === 'symptoms') {
    return (
      <div className="space-y-3">
        <label className="block font-semibold text-blue-700">📝 Describe up to 5 Symptoms</label>
        {symptoms.map((symptom, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Symptom ${index + 1}`}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={symptom}
            onChange={(e) => {
              const updated = [...symptoms];
              updated[index] = e.target.value;
              setSymptoms(updated);
            }}
          />
        ))}
      </div>
    );
  }

  if (method === 'image') {
    return (
      <div className="space-y-3">
        <label className="block font-semibold text-blue-700">📷 Upload an Image</label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:border file:rounded file:border-blue-600 file:text-blue-600 hover:file:bg-blue-50"
          onChange={(e) => setInputData(e.target.files[0])}
        />
        {inputData && typeof inputData === 'object' && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(inputData)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded shadow"
            />
          </div>
        )}
      </div>
    );
  }

  return null;
}
