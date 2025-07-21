import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import {FaArrowRight } from "react-icons/fa";

import petHeroAnimation from '../../assets/lottie/pets-world.json';
import pawLoader from '../../assets/lottie/pet-hero.json';

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Pet Adoption & Lost/Found',
      desc: 'Verified listings with geo-location for easy pet adoption and finding lost pets.',
    },
    {
      title: 'AI-Powered Pet Care',
      desc: 'Health diagnostics through image/video analysis and personalized care advice.',
    },
    {
      title: 'Service Booking',
      desc: 'Seamless booking system for grooming, training, and veterinary appointments.',
    },
    {
      title: 'Community Forum',
      desc: 'Engage with other pet owners, get breed-specific advice, and find donation opportunities.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] text-[#feffff] font-poppins relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[-80px] left-[-80px] w-[200px] h-[200px] bg-[#2B7A78] opacity-30 rounded-full z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-[#17252A] opacity-20 rounded-full z-0"></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/paw-prints.svg')] bg-no-repeat bg-center opacity-5 bg-cover"></div>

      {/* Navbar */}
      <nav className="flex justify-end items-center px-6 py-4 relative z-10">
        <div>
          <button
            className="bg-[#17252A] text-[#feffff] px-4 py-2 rounded mr-2 hover:opacity-90 transition cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-[#17252A] text-[#feffff] px-4 py-2 rounded hover:opacity-90 transition cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative container mx-auto flex flex-col md:flex-row items-center justify-center py-24 px-4 z-10">
        {/* Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center md:justify-start items-center space-x-3 mb-4">
            {/* <div className="w-30 h-30 ">
              <Lottie animationData={pawLoader} loop={true} />
            </div> */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-[#17252A]">Pet </span>
              <motion.span
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, delay: 0.5 }}
                className="inline-block"
              >
                Connect
              </motion.span>
            </h1>
          </div>

          <p className="text-lg md:text-xl mb-8 font-medium text-[#fefefe]/90">
            Helping you care, connect, and create a better life for your pets — with AI and community.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#17252A] text-[#feffff] px-6 py-3 rounded-full text-lg font-semibold transition cursor-pointer inline-flex items-center gap-2"
            onClick={() => navigate('/login')}
          >
            Get Started
            <FaArrowRight className="text-[#DEF2F1] text-sm" />
          </motion.button>
        </motion.div>

        {/* Lottie Animation */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="w-72 h-72 md:w-96 md:h-96 shadow-xl">
            <Lottie animationData={petHeroAnimation} loop={true} />
          </div>
        </motion.div>
      </header>

      {/* Scroll Down Arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-2xl z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white opacity-80">&#x2193;</span>
      </motion.div>

      {/* Features Section */}
      <section className="bg-[#2B7A78] py-20 px-4 z-10 relative">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#3AAFA9] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6 rounded-xl text-[#17252A]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17252A] text-[#feffff] py-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} PetConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
