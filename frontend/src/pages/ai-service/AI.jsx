import React, { useState } from 'react';
import PetSelector from "../../components/ai-services/PetSelector";
import PredictionForm from '../../components/ai-services/PredictionForm';
import LoadingIndicator from '../../components/ai-services/LoadingIndicator';
import ChatHistory from '../../components/ai-services/ChatHistory';
import { motion } from 'framer-motion';

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
      let response, resultText = "";

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
        resultText = response.ok
          ? `Pawli thinks your ${selectedPet} may have **${result.message}**.`
          : result.error || "Prediction failed. Try again.";
      }

      if (method === "image") {
        const formData = new FormData();
        formData.append("file", inputData);
        response = await fetch("http://localhost:5000/predict-disease-with-image", {
          method: "POST",
          body: formData
        });
        const result = await response.json();
        resultText = response.ok
          ? `Pawli thinks your ${selectedPet} may have **${result.prediction}** (Confidence: ${(result.confidence * 100).toFixed(2)}%)`
          : result.error || "Prediction failed. Try again.";
      }

      setHistory([{ input: inputData, response: resultText, pet: selectedPet, method }, ...history]);
    } catch (error) {
      setHistory([{ input: inputData, response: "❌ Server error. Please try again later.", pet: selectedPet, method }, ...history]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] overflow-x-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl font-extrabold text-[#17252A] tracking-tight mb-4">🐾 Pawli's Pet Predictor</h1>
        <p className="text-lg text-[#000000]  max-w-xl mx-auto">Instant disease predictions for your dog or cat using AI — upload an image or enter symptoms to get started!</p>
      </motion.div>

      {/* Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl border border-white/50 p-8 space-y-6"
      >
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

        {selectedPet && method && inputData && !loading && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePredict}
            className="w-full py-3 text-lg font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition duration-300 shadow-lg"
          >
            🔍 Predict Now
          </motion.button>
        )}

        {loading && <LoadingIndicator />}
      </motion.div>

      {/* Chat History */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <ChatHistory history={history} />
      </motion.div>
    </div>
  );
}
