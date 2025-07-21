import React, { useState } from 'react';
import PetSelector from "../../components/ai-services/PetSelector";
import PredictionForm from '../../components/ai-services/PredictionForm';
import LoadingIndicator from '../../components/ai-services/LoadingIndicator';
import ChatHistory from '../../components/ai-services/ChatHistory';

export default function AI() {
  const [selectedPet, setSelectedPet] = useState('');
  const [method, setMethod] = useState('');
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handlePredict = async () => {
    if (!selectedPet || !method || !inputData) return;

    setLoading(true);

    try {
      let response;
      let resultText = "";

      if (method === "symptoms") {
        const symptoms = inputData.split(",").map(s => s.trim());
        const payload = {
          AnimalName: selectedPet,
          symptoms1: symptoms[0] || "",
          symptoms2: symptoms[1] || "",
          symptoms3: symptoms[2] || "",
          symptoms4: symptoms[3] || "",
          symptoms5: symptoms[4] || ""
        };

        response = await fetch("http://localhost:5000/predict-disease-with-symptoms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
          resultText = `Pawli thinks your ${selectedPet} may have ${result.message}`;
        } else {
          resultText = result.error || "Something went wrong with symptom prediction.";
        }
      } else if (method === "image") {
        const formData = new FormData();
        formData.append("file", inputData);

        response = await fetch("http://localhost:5000/predict-disease-with-image", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (response.ok) {
          resultText = `Pawli thinks your ${selectedPet} may have ${result.prediction} (Confidence: ${result.confidence * 100}%)`;
        } else {
          resultText = result.error || "Something went wrong with image prediction.";
        }
      }

      setHistory([{ input: inputData, response: resultText, pet: selectedPet, method }, ...history]);
    } catch (error) {
      setHistory([{ input: inputData, response: "Error connecting to server. Try again later.", pet: selectedPet, method }, ...history]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#3AAFA9]">
      <h1 className="text-3xl font-bold text-center mb-6 text-bg-[#17252A]">🐾 Pawli's Pet Predictor</h1>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <PetSelector
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
          method={method}
          setMethod={setMethod}
        />
        <PredictionForm
          method={method}
          inputData={inputData}
          setInputData={setInputData}
        />
        {selectedPet && method && inputData && (
          <button
            onClick={handlePredict}
            className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Predict
          </button>
        )}
        {loading && <LoadingIndicator />}
      </div>

      <ChatHistory history={history} />
    </div>
  );
}
