import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heroAnimation from "../../assets/lottie/pet-hero.json";
import { FaPaw, FaRobot, FaCalendarAlt, FaSearch, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4]">
      {/* Background SVG Paws */}
      {/* <img
        src={pawPrint}
        className="absolute top-10 left-10 w-10 opacity-10 animate-pulse"
        alt="Paw Print"
      />
      <img
        src={pawPrint}
        className="absolute bottom-10 right-10 w-12 rotate-12 opacity-10 animate-pulse"
        alt="Paw Print"
      /> */}

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 py-20 gap-12">
        {/* Text Content */}
        <motion.div
          className="text-center lg:text-left max-w-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Hello, Pet Lover
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            The ultimate hub for pet lovers. Adopt, care, connect, and support
            — all in one place. Let’s make your furry friend’s world better!
          </p>
          <div className="mt-8">
           <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2">
            Explore Features
            <FaArrowRight className="text-[#DEF2F1] text-sm" />
          </button>

          </div>
        </motion.div>

        {/* Lottie Animation */}
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <Lottie animationData={heroAnimation} loop autoplay />
        </motion.div>
      </section>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-12">
        {/* <Lottie animationData={scrollArrow} loop autoplay /> */}
      </div>
    </div>
  );
}
