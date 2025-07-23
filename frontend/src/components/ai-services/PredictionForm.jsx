import React, { useState, useEffect } from 'react';

export default function PredictionForm({ method, inputData, setInputData }) {
  const [symptoms, setSymptoms] = useState(['', '', '', '', '']);

  useEffect(() => {
    if (method === 'symptoms') {
      const combined = symptoms.filter(Boolean).join(', ');
      setInputData(combined);
    }
  }, [symptoms, method, setInputData]);

  if (!method) return null;

  if (method === 'symptoms') {
    return (
      <div>
        <label className="block font-bold text-blue-800 mb-2">📝 Describe up to 5 Symptoms</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {symptoms.map((symptom, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Symptom ${index + 1}`}
              className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              value={symptom}
              onChange={(e) => {
                const updated = [...symptoms];
                updated[index] = e.target.value;
                setSymptoms(updated);
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (method === 'image') {
    return (
      <div>
        <label className="block font-bold text-blue-800 mb-2">📷 Upload Image or Video</label>
        <input
          type="file"
          accept="image/*,video/*"
          className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:border file:rounded-lg file:border-blue-600 file:text-blue-600 hover:file:bg-blue-100"
          onChange={(e) => setInputData(e.target.files[0])}
        />
        {inputData && typeof inputData === 'object' && (
          <div className="mt-4">
            <p className="text-sm text-blue-700 mb-1">Preview:</p>
            {inputData.type.startsWith("image") ? (
              <img
                src={URL.createObjectURL(inputData)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
            ) : (
              <video src={URL.createObjectURL(inputData)} controls className="w-64 rounded-lg shadow" />
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}
