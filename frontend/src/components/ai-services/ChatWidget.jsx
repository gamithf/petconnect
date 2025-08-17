import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pawliImage from '../../assets/ai-services/chat-icon.png';
import userImg from '../../assets/ai-services/user.png';
import dogImage from '../../assets/ai-services/dog.png';
import catImage from '../../assets/ai-services/cat.jpeg';
import { useChat } from '../../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL;

export default function ChatWidget() {
  const { showChat, toggleChat, closeChat } = useChat();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi I'm Pawli. Ask me anything about your pets" }
  ]);

  const chatWindowRef = useRef(null);
  const navigate = useNavigate();

  // Initial positioning
  useEffect(() => {
    if (showChat) {
      const iconRight = window.innerWidth - 80;
      const windowWidth = 360;
      const initialX = Math.max(20, iconRight - windowWidth - 20);
      const initialY = window.innerHeight - 600;
      setPosition({ x: initialX, y: initialY });
    }
  }, [showChat]);

  // Drag logic
  const handleMouseDown = (e) => {
    if (e.target.closest('input, button, img, li')) return;
    setIsDragging(true);
    const rect = chatWindowRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };
  const handleMouseUp = () => setIsDragging(false);

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

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${FLASK_API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });

      const data = await res.json();
      if (data.response) {
        setMessages(prev => [...prev, { from: "bot", text: data.response }]);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch {
      setMessages(prev => [...prev, { from: "bot", text: "⚠️ Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Icon */}
      <motion.img
        src={pawliImage}
        alt="Chat with Pawli"
        className="fixed bottom-5 right-5 w-16 h-16 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300 z-50"
        onClick={toggleChat}
        whileHover={{ rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      />

      <AnimatePresence>
        {showChat && (
          <motion.div
            ref={chatWindowRef}
            className="fixed w-90 h-[550px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 font-sans backdrop-blur-lg bg-white/90 border border-gray-200"
            style={{ left: `${position.x}px`, top: `${position.y}px`, cursor: isDragging ? "grabbing" : "default" }}
            onMouseDown={handleMouseDown}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 to-teal-700 text-white p-4 font-bold relative">
              <div className="text-lg">🐾 Pawli</div>
              <div className="text-sm font-light">Your Pet Assistant</div>
              <span
                className="absolute top-3 right-3 text-lg cursor-pointer hover:bg-white/20 rounded-full w-7 h-7 flex items-center justify-center"
                onClick={closeChat}
              >
                ×
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.from === "user" ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "bot" && (
                    <img src={pawliImage} alt="bot" className="w-8 h-8 rounded-full border shadow" />
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[70%] shadow ${
                      msg.from === "user"
                        ? "bg-gradient-to-r from-teal-500 to-emerald-400 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.from === "user" && (
                    <img src={userImg} alt="user" className="w-8 h-8 rounded-full border shadow" />
                  )}
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <img src={pawliImage} alt="bot" className="w-6 h-6 rounded-full" />
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex p-3 border-t border-gray-200 bg-gray-50 gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Talk with Pawli..."
                className="flex-1 p-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <motion.button
                onClick={sendMessage}
                disabled={loading}
                className={`px-4 py-2 rounded-xl text-sm text-white font-medium transition shadow ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-700 to-emerald-700 hover:scale-105"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {loading ? "..." : "Send"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
