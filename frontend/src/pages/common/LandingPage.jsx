import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#3AAFA9] text-[#feffff]">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          {/* Replace with your logo */}
          <span className="text-[#17252A]">Pet</span>Connect
        </div>
        <div>
          <button 
            className="bg-[#17252A] text-[#feffff] px-4 py-2 rounded mr-2 hover:opacity-90 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="bg-[#17252A] text-[#feffff] px-4 py-2 rounded hover:opacity-90 transition"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto flex flex-col md:flex-row items-center justify-center py-16 px-4">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Connect Better With Your <span className="text-[#17252A]">Pet</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            PetConnect is your all-in-one, AI-powered platform designed for pet owners to easily manage their pets' care.
          </p>
          <button 
            className="bg-[#17252A] text-[#feffff] px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition"
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          {/* Placeholder for hero image */}
          <div className="w-full h-64 md:h-80 bg-[#2B7A78] rounded-lg flex items-center justify-center">
            <span className="text-[#feffff] text-2xl">Hero Image Placeholder</span>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-[#2B7A78] py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#3AAFA9] p-6 rounded-lg shadow-lg text-[#17252A]">
              <h3 className="text-xl font-semibold mb-4">Pet Adoption & Lost/Found</h3>
              <p>Verified listings with geo-location for easy pet adoption and finding lost pets.</p>
            </div>
            <div className="bg-[#3AAFA9] p-6 rounded-lg shadow-lg text-[#17252A]">
              <h3 className="text-xl font-semibold mb-4">AI-Powered Pet Care</h3>
              <p>Health diagnostics through image/video analysis and personalized care advice.</p>
            </div>
            <div className="bg-[#3AAFA9] p-6 rounded-lg shadow-lg text-[#17252A]">
              <h3 className="text-xl font-semibold mb-4">Service Booking</h3>
              <p>Seamless booking system for grooming, training, and veterinary appointments.</p>
            </div>
            <div className="bg-[#3AAFA9] p-6 rounded-lg shadow-lg text-[#17252A]">
              <h3 className="text-xl font-semibold mb-4">Community Forum</h3>
              <p>Engage with other pet owners, get breed-specific advice, and find donation opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17252A] text-[#feffff] py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 PetConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
