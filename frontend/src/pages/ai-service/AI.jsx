import React, { useState } from 'react';
import PetSelector from "../../components/ai-services/PetSelector";
import PredictionForm from '../../components/ai-services/PredictionForm';
import LoadingIndicator from '../../components/ai-services/LoadingIndicator';
import ChatHistory from '../../components/ai-services/ChatHistory';
import { motion } from 'framer-motion';
const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL;

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
        response = await fetch(`${FLASK_API_URL}/analyze-symptoms`, {
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
        let endpoint = `${FLASK_API_URL}/analyze-image`;
        if (inputData.type && inputData.type.startsWith("video/")) {
          endpoint = `${FLASK_API_URL}/analyze-video`;
        }
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        resultText = response.ok
          ? `Pawli thinks your ${selectedPet} may have ${result.prediction.toUpperCase()}`
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
    <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            🐾 Pawli's Pet Predictor
          </h1>
          <p className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant AI-powered health insights for your beloved pet. Simply choose a method below to begin.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-teal-700 to-teal-700 text-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-200"
        >
          <div className="space-y-8">
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePredict}
                className="w-full py-3 text-lg font-bold text-white cursor-pointer bg-gray-800 rounded-lg hover:bg-gray-700 transition-transform duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Predict Now
              </motion.button>
            )}

            {loading && <LoadingIndicator />}
          </div>
        </motion.div>

        {/* Chat History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <ChatHistory history={history} />
        </motion.div>
      </div>
    </div>
  );
}