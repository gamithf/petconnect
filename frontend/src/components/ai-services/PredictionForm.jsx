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
        <label className="block font-semibold text-gray-200 mb-3">📝 Describe up to 5 Symptoms</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {symptoms.map((symptom, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Symptom ${index + 1}`}
              className="p-3 bg-white/10 border border-white/20 rounded-lg shadow-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 outline-none transition-all duration-300"
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
        <label className="block font-semibold text-gray-200 mb-3">📷 Upload Image or Video</label>
        <input
          type="file"
          accept="image/*,video/*"
          className="block w-full text-sm text-transparent file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 transition-colors cursor-pointer"
          onChange={(e) => setInputData(e.target.files[0])}
        />
        {inputData && typeof inputData === 'object' && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-200 mb-2">Preview:</p>
            {inputData.type.startsWith("image") ? (
              <img
                src={URL.createObjectURL(inputData)}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-xl shadow-lg border-2 border-white/20"
              />
            ) : (
              <video src={URL.createObjectURL(inputData)} controls className="w-full max-w-md rounded-xl shadow-lg" />
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
}