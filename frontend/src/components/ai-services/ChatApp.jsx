import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm Pawli 🐾\nLet’s talk about your lovely pets!",
    },
  ]);
  const [input, setInput] = useState("");
  const [showPetOptions, setShowPetOptions] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated AI response
    setTimeout(() => {
      const aiMessage = {
        sender: "ai",
        text: "Thank you for your message! I'll get back to you shortly 🐶",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-full bg-white text-sm">
      {/* Pet Type Selection (Only shown at top) */}
      {showPetOptions && (
        <div className="p-3 border-b">
          <p className="font-semibold text-gray-800">Your Pets</p>
          <div className="flex items-center gap-3 mt-2">
            <img
              src="/dog.png"
              alt="Dog"
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => {
                setShowPetOptions(false);
                navigate("/ChatApp");
              }}
            />
            <img
              src="/cat.jpeg"
              alt="Cat"
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => {
                setShowPetOptions(false);
                navigate("/ChatApp");
              }}
            />
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center text-lg font-bold text-blue-600 cursor-pointer"
              onClick={() => {
                setShowPetOptions(false);
                navigate("/PetForm");
              }}
            >
              +
            </div>
          </div>
        </div>
      )}

      {/* Intro Message & Suggestions */}
      <div className="p-3 border-b bg-blue-50">
        <p className="text-gray-800 mb-2">
          Hi! I'm <strong>Pawli</strong>,<br />
          Your AI chat assistant 🐾
        </p>
        <div className="text-gray-600">Suggestions:</div>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mt-1">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => handleSuggestionClick("Pet grooming tips")}
          >
            🐾 Pet grooming tips
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => handleSuggestionClick("Tips for feeding a kitten")}
          >
            🐾 Tips for feeding a kitten
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() =>
              handleSuggestionClick("Tell me how to take care of my dog")
            }
          >
            🐾 Tell me how to take care of my dog
          </li>
        </ul>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] px-4 py-2 whitespace-pre-line rounded-xl ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t px-3 py-2 flex gap-2">
        <input
          type="text"
          placeholder="Talk with Pawli..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-full text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
