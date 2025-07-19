import { FaPaw, FaRobot, FaCalendarAlt, FaSearch, FaArrowRight } from "react-icons/fa";
import info from "../../assets/info1.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#3AAFA9] text-[#feffff] flex flex-col items-center">
      {/* Hero Section with Chatbot */}
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-center py-16 px-4 gap-8">
        {/* Hero Content and Buttons (Left Column) */}
        <div className="md:w-1/2 text-center md:text-left">
          <h5 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-[#17252A]">
            Connect Better With Your Pet ...
          </h5>
          <p className="text-lg md:text-xl mb-8 text-[#17252A]">
            PetConnect is your all-in-one, AI-powered platform designed for pet owners to easily manage their pets' care.
          </p>
          <div className="flex flex-col gap-3 mb-8 w-full max-w-xs mx-auto md:mx-0">
            <button 
              className="bg-[#17252A] text-[#feffff] px-5 py-2 rounded-full text-base font-semibold hover:bg-[#2B7A78] transition-all duration-300 flex items-center justify-center gap-2 w-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => navigate('/adoption-lost')}
            >
              Adopt / Lost & Found
              <FaArrowRight className="text-[#DEF2F1] text-sm" />
            </button>
            <button 
              className="bg-[#17252A] text-[#feffff] px-5 py-2 rounded-full text-base font-semibold hover:bg-[#2B7A78] transition-all duration-300 flex items-center justify-center gap-2 w-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => navigate('/ai-care')}
            >
              {/* <FaRobot className="text-[#DEF2F1] text-sm" /> */}
              AI Pet Care
              <FaArrowRight className="text-[#DEF2F1] text-sm" />
            </button>
            <button 
              className="bg-[#17252A] text-[#feffff] px-5 py-2 rounded-full text-base font-semibold hover:bg-[#2B7A78] transition-all duration-300 flex items-center justify-center gap-2 w-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => navigate('/services')}
            >
              {/* <FaCalendarAlt className="text-[#DEF2F1] text-sm" /> */}
              Book Services
              <FaArrowRight className="text-[#DEF2F1] text-sm" />
            </button>
          </div>
          {/* Illustration Section */}
          <div className="w-full max-w-md h-64 bg-[#2B7A78] rounded-lg flex items-center justify-center mx-auto md:mx-0 shadow-inner">
            <div className="text-center p-4">
              <FaPaw className="text-6xl text-[#DEF2F1] mx-auto mb-4" />
              <span className="text-[#feffff] text-2xl font-light">Your Pet's Happiness Starts Here</span>
            </div>
          </div>
        </div>

        {/* Chatbot Interface (Right Column) */}
        <div className="md:w-1/2 w-full">
          <div className="mx-auto max-w-md bg-[#2B7A78] p-6 rounded-lg shadow-xl h-96 flex flex-col items-center justify-center">
            <FaRobot className="text-6xl text-[#DEF2F1] mb-6" />
            <h3 className="text-2xl font-bold text-[#feffff] mb-4">Meet Your AI Pet Assistant</h3>
            <p className="text-[#DEF2F1] text-center mb-6">
              Get instant answers to all your pet care questions with our friendly AI companion.
            </p>
            <button className="bg-[#17252A] text-[#feffff] px-6 py-2 rounded-full text-base font-semibold hover:bg-[#3AAFA9] transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
              <FaPaw className="text-sm" />
              Try Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}