import React from "react";
import { FaCamera, FaVideo, FaShareAlt } from "react-icons/fa";
import pawliImage from '../../assets/ai-services/chat-icon.png';
import dogImage from '../../assets/ai-services/dog.png';
import catImage from '../../assets/ai-services/cat.jpeg';

export default function AI() {
  const chatHistoryItems = [
    "Image Upload – Tick Infection",
    "Video Upload – Limping Analysis",
    "Behavioral Issue – Sudden Aggression",
    "Illness Recognition – Vomiting and Lethargy",
    "Image Upload – Skin Rash",
    "Behaviour Tracking – Drinking Too Much Water",
    "Image Upload – Eye Discharge",
    "Poop Check – Upload Image",
    "Video Upload – Breathing Trouble",
    "Behavioral Issue – Eating Litter",
    "Video Upload Injury Detection – Limping After Walk",
    "Video Upload – Excessive Itching While Bathing",
  ];

  return (
    <div className="flex h-screen font-sans bg-[#edfafa]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2b7a78] text-white flex flex-col p-4">
        {/* Logo & New Chat */}
        <div className="flex flex-col items-center mb-4 border-b border-white/10 pb-4">
          <img src={pawliImage} alt="Logo" className="w-20 h-20 mb-2" />
          <button className="w-full bg-[#3aafa9] text-white font-semibold py-2 px-4 rounded mb-3 hover:bg-[#319e99] transition">
            + New Chat
          </button>
          <p className="text-white font-semibold text-sm">Chat History</p>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto pr-1">
          <ul className="space-y-2">
            {chatHistoryItems.map((item, index) => (
              <li key={index}>
                <button
                  className="w-full bg-[#2b7a78] border border-[#2b7a78] text-white text-sm text-left px-3 py-2 rounded-lg hover:bg-[#3aafa9] transition"
                  onClick={() => alert(`Opening: ${item}`)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Chat Window */}
      <main className="flex-1 flex flex-col border-l border-gray-300 bg-white">
        {/* Header */}
        <div className="flex items-center justify-end bg-[#def2f1] px-4 py-3">
          <FaShareAlt className="text-[#3aafa9] text-xl cursor-pointer" />
        </div>

        {/* Chat Body */}
        <section className="flex-1 overflow-y-auto bg-[#def2f1] px-6 py-4">
          <div className="flex justify-center">
            <img
              src={catImage}
              alt="Pet"
              className="w-24 h-24 rounded-full mt-6 mb-2"
            />
          </div>
          <h2 className="text-center text-3xl font-semibold text-[#2b7a78] mb-8">
            Every Pet Deserves the Full Circle of Care
          </h2>

          {/* Media Upload Icons */}
          <div className="flex justify-center items-center h-40">
            <div className="flex gap-20">
              <div className="w-24 h-24 bg-[#a7ded6] text-[#3aafa9] rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:bg-[#3aafa9] hover:text-[#a7ded6] transition">
                <FaCamera />
              </div>
              <div className="w-24 h-24 bg-[#a7ded6] text-[#3aafa9] rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:bg-[#3aafa9] hover:text-[#a7ded6] transition">
                <FaVideo />
              </div>
            </div>
          </div>
        </section>

        {/* Chat Input */}
        <div className="flex items-center bg-[#def2f1] px-4 py-3 border-t border-[#def2f1] gap-3">
          <input
            type="text"
            placeholder="Talk With Pawli..."
            className="flex-1 px-4 py-2 border border-[#ccc] rounded-full text-sm focus:outline-none"
          />
          <button className="px-4 py-2 bg-[#2b7a78] text-white rounded-full hover:bg-[#246f6d] transition">
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
