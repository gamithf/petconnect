import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pawliImage from '../../assets/ai-services/chat-icon.png';
import dogImage from '../../assets/ai-services/dog.png';
import catImage from '../../assets/ai-services/cat.jpeg';

export default function ChatWidget() {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  const toggleChat = () => setShowChat(prev => !prev);

  return (
    <>
      {/* Floating Chat Icon */}
      <img
        src={pawliImage}
        alt="Chat with Pawli"
        className="fixed bottom-5 right-5 w-36 h-36 rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform duration-200 z-50"
        onClick={toggleChat}
      />

      {/* Chat Popup Window */}
      {showChat && (
        <div className="fixed bottom-40 right-10 w-80 h-[535px] bg-[#def2f1] rounded-xl shadow-xl flex flex-col overflow-hidden z-50 font-sans">
          <div className="bg-[#2b7a78] text-white p-3 font-bold relative text-left">
            <div>Pawli</div>
            <div className="text-sm font-normal mt-1">Chat Support</div>
            <span className="absolute top-3 right-3 text-lg cursor-pointer" onClick={toggleChat}>×</span>
          </div>

          <div className="text-[#2b7a78] font-semibold text-sm ml-5 mt-3">Your Pets</div>
          <div className="flex gap-3 items-center ml-5 mt-2 flex-wrap">
           {[dogImage, catImage].map((src, i) => (
            <img 
                key={i} 
                src={src} 
                alt="Pet" 
                className="w-16 h-16 rounded-full cursor-pointer border-2 border-gray-200 hover:scale-105 hover:border-[#8ecae6] transition" 
                onClick={() => {
                toggleChat();
                navigate('/ai-services');
                }} 
            />
            ))}
            <div className="text-2xl px-4 py-2 bg-[#cce6e5] rounded-full cursor-pointer hover:bg-[#b2ebf2]" onClick={() => {
              toggleChat();
              navigate('/pet-form'); // You can adjust this
            }}>+</div>
          </div>

          <div className="flex items-center text-center my-4 mx-5 text-[#2b7a78] font-semibold text-sm relative">
            <hr className="flex-1 border-t border-[#2b7a78] mr-2" />
            <span>General Chat</span>
            <hr className="flex-1 border-t border-[#2b7a78] ml-2" />
          </div>

          <div className="bg-[#cce6e5] rounded-lg mx-5 mb-2 p-3 text-sm leading-relaxed text-left">
            Hi! I'm <strong>Pawli</strong>,<br />
            Your AI chatBot.<br />
            Let’s talk about your lovely pets 🐶🐱
          </div>

          <div className="flex-1 overflow-y-auto px-3 text-sm">
            <ul className="list-none p-0 space-y-2">
              {[
                '🐾 Pet grooming tips',
                '🐾 Tips for feeding a kitten',
                '🐾 Tell me how to take care of my dog',
              ].map((text, idx) => (
                <li key={idx} className="bg-[#def2f1] border border-[#2b7a78] rounded px-3 py-2 cursor-pointer hover:bg-[#b2ebf2]">{text}</li>
              ))}
            </ul>
          </div>

          <div className="flex p-3 border-t border-gray-200 gap-2">
            <input type="text" placeholder="Talk with Pawli..." className="flex-1 p-2 rounded border text-sm" />
            <button className="bg-[#2b7a78] text-white px-4 py-2 rounded text-sm">Send</button>
          </div>
        </div>
      )}
    </>
  );
}
