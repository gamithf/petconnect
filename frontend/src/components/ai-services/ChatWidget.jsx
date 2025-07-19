import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pawliImage from '../../assets/ai-services/chat-icon.png';
import dogImage from '../../assets/ai-services/dog.png';
import catImage from '../../assets/ai-services/cat.jpeg';

export default function ChatWidget() {
  const [showChat, setShowChat] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatWindowRef = useRef(null);
  const navigate = useNavigate();

  const toggleChat = () => {
    if (!showChat) {
      // Set initial position when opening chat
      const iconRight = window.innerWidth - 80; // Approximate icon position
      const windowWidth = 320; // Approximate chat window width
      const initialX = Math.max(20, iconRight - windowWidth - 20); // Position left of icon with margin
      const initialY = window.innerHeight - 600; // Position above icon
      
      setPosition({ x: initialX, y: initialY });
    }
    setShowChat(prev => !prev);
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('input, button, img, li')) return;
    
    setIsDragging(true);
    const rect = chatWindowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Ensure chat window stays within viewport
    const rect = chatWindowRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(window.innerWidth - rect.width, position.x));
    const newY = Math.max(0, Math.min(window.innerHeight - rect.height, position.y));
    
    if (newX !== position.x || newY !== position.y) {
      setPosition({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <>
      {/* Floating Chat Icon - Fixed position */}
      <img
        src={pawliImage}
        alt="Chat with Pawli"
        className="fixed bottom-5 right-5 w-30 h-30 rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform duration-200 z-50"
        onClick={toggleChat}
      />

      {/* Chat Popup Window - Draggable */}
      {showChat && (
        <div
          ref={chatWindowRef}
          className="fixed w-80 h-[535px] bg-[#def2f1] rounded-xl shadow-xl flex flex-col overflow-hidden z-50 font-sans select-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'default'
          }}
          onMouseDown={handleMouseDown}
        >
          <div 
            className="bg-[#2b7a78] text-white p-3 font-bold relative text-left cursor-move"
            onMouseDown={handleMouseDown}
          >
            <div>Pawli</div>
            <div className="text-sm font-normal mt-1">Chat Support</div>
            <span 
              className="absolute top-3 right-3 text-lg cursor-pointer hover:bg-[#3a8a88] rounded-full w-6 h-6 flex items-center justify-center"
              onClick={toggleChat}
            >
              ×
            </span>
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
            <div 
              className="text-2xl px-4 py-2 bg-[#cce6e5] rounded-full cursor-pointer hover:bg-[#b2ebf2]"
              onClick={() => {
                toggleChat();
                navigate('/pet-form');
              }}
            >
              +
            </div>
          </div>

          <div className="flex items-center text-center my-4 mx-5 text-[#2b7a78] font-semibold text-sm relative">
            <hr className="flex-1 border-t border-[#2b7a78] mr-2" />
            <span>General Chat</span>
            <hr className="flex-1 border-t border-[#2b7a78] ml-2" />
          </div>

          <div className="bg-[#cce6e5] rounded-lg mx-5 mb-2 p-3 text-sm leading-relaxed text-left">
            Hi! I'm <strong>Pawli</strong>,<br />
            Your AI chatBot.<br />
            Let's talk about your lovely pets 🐶🐱
          </div>

          <div className="flex-1 overflow-y-auto px-3 text-sm">
            <ul className="list-none p-0 space-y-2">
              {[
                '🐾 Pet grooming tips',
                '🐾 Tips for feeding a kitten',
                '🐾 Tell me how to take care of my dog',
              ].map((text, idx) => (
                <li 
                  key={idx} 
                  className="bg-[#def2f1] border border-[#2b7a78] rounded px-3 py-2 cursor-pointer hover:bg-[#b2ebf2]"
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex p-3 border-t border-gray-200 gap-2">
            <input 
              type="text" 
              placeholder="Talk with Pawli..." 
              className="flex-1 p-2 rounded border text-sm focus:outline-none focus:ring-1 focus:ring-[#2b7a78]" 
            />
            <button className="bg-[#2b7a78] text-white px-4 py-2 rounded text-sm hover:bg-[#3a8a88] transition">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}