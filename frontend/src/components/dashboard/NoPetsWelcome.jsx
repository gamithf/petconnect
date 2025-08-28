import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import heroAnimation from "../../assets/lottie/pet-hero.json";
import { FaArrowRight } from 'react-icons/fa';

export default function NoPetsWelcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center mt-0">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Lottie animationData={heroAnimation} loop autoPlay />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome, Pet Lover!
        </h1>
        <p className="mt-2 text-md text-gray-800 max-w-xl mx-auto font-semibold mb-2">
          It looks like you haven't added any pets yet. Let's create a profile for your furry friend to unlock your personalized dashboard.
        </p>
        <button
          onClick={() => navigate('/pet-form')}
          className="mt-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer inline-flex items-center justify-center gap-3"
        >
          Add Your First Pet <FaArrowRight /> 
        </button>
      </motion.div>
    </div>
  );
}