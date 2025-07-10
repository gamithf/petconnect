import React from "react";
import Button from "../../components/common/Button";
import heroImg from "../../assets/heroImg.svg"; // Replace with your hero image
import { useNavigate } from "react-router-dom";

const features = [
  "Pet adoption & lost/found support",
  "AI-powered pet care & advice",
  "Community Q&A and tips",
  "Vet booking and emergency services",
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#3AAFA9] text-white">
      {/* Top Nav with Logo */}
      <header
        className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center 
  bg-teal-500/30 backdrop-blur-md border-b border-white/10 shadow-md rounded-xl"
      >
        <h1 className="text-xl font-bold text-white mb-4 sm:mb-0">
          PetConnect
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <button
            className="bg-[#17252A] text-white px-4 py-2 rounded-md hover:opacity-90 transition text-sm cursor-pointer w-24 sm:w-24"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-[#17252A] text-white px-4 py-2 rounded-md hover:opacity-90 transition text-sm cursor-pointer w-24 sm:w-24"
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 gap-10">
        <div className="md:w-1/2">
          <img
            src={heroImg}
            alt="Pet Hero"
            className="rounded-md shadow-lg w-full"
          />
        </div>
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect Better With Your Pet
          </h2>
          <p className="mb-6 text-lg text-[#feffff] max-w-md">
            AI meets pet care. Track, manage, and enjoy everything about your
            furry friends in one app.
          </p>
          <Button text="Get Started" onClick={() => navigate("/login")} />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#2C8F8B] px-6 md:px-20 py-12">
        <h3 className="text-2xl font-semibold mb-6">What You Can Do</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feat, index) => (
            <li
              key={index}
              className="bg-[#174E4A] p-4 rounded-md shadow text-[#feffff] font-medium"
            >
              ✅ {feat}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
