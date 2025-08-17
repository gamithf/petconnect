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
        <label className="block font-semibold text-white mb-3">📝 Describe up to 5 Symptoms</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {symptoms.map((symptom, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Symptom ${index + 1}`}
              className="p-3 border border-black rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow"
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
        <label className="block font-semibold text-white mb-3">📷 Upload Image or Video</label>
        <input
          type="file"
          accept="image/*,video/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
          onChange={(e) => setInputData(e.target.files[0])}
        />
        {inputData && typeof inputData === 'object' && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Preview:</p>
            {inputData.type.startsWith("image") ? (
              <img
                src={URL.createObjectURL(inputData)}
                alt="Preview"
                className="w-36 h-36 object-cover rounded-lg shadow-md border-2 border-white"
              />
            ) : (
              <video src={URL.createObjectURL(inputData)} controls className="w-full max-w-sm rounded-lg shadow-md" />
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}